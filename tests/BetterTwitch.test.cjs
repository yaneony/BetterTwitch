const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'BetterTwitch.user.js'), 'utf8');

function section(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `Missing source marker: ${startMarker}`);
  assert.notEqual(end, -1, `Missing source marker: ${endMarker}`);
  return source.slice(start, end);
}

function objectLiteral(startMarker, endMarker) {
  const body = section(startMarker, endMarker)
    .slice(startMarker.length)
    .trim()
    .replace(/;$/, '');
  return vm.runInNewContext(`(${body})`);
}

function evaluate(code, prelude, exportedNames, context = {}) {
  const sandbox = { console, ...context };
  vm.createContext(sandbox);
  vm.runInContext(
    `${prelude || ''}\n${code}\nglobalThis.__hooks = { ${exportedNames.join(', ')} };`,
    sandbox
  );
  return sandbox.__hooks;
}

class FakeClassList {
  constructor(...names) { this.names = new Set(names); }
  add(...names) { names.forEach((name) => this.names.add(name)); }
  remove(...names) { names.forEach((name) => this.names.delete(name)); }
  contains(name) { return this.names.has(name); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.names.has(name) : !!force;
    if (enabled) this.names.add(name); else this.names.delete(name);
    return enabled;
  }
}

class FakeButton {
  constructor() {
    this.attributes = new Map();
    this.className = '';
    this.isConnected = false;
    this.parent = null;
  }
  addEventListener() {}
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  remove() {
    this.isConnected = false;
    if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this);
    this.parent = null;
  }
}

class FakeLine {
  constructor({ connected = true, text = '', timestamp = 0 } = {}) {
    this.isConnected = connected;
    this.classList = new FakeClassList();
    this.dataset = {};
    this.children = [];
    this.meta = { record: { text, t: timestamp } };
  }
  appendChild(child) {
    child.parent = this;
    child.isConnected = this.isConnected;
    this.children.push(child);
  }
  contains(child) { return child.parent === this && child.isConnected; }
  querySelector(selector) {
    if (selector === '.bt-spam-toggle') {
      return this.children.find((child) => child.isConnected && child.className === 'bt-spam-toggle') || null;
    }
    if (selector.includes('chat-line-message-body')) return this;
    return null;
  }
}

class FakeStyle {
  constructor() { this.properties = new Map(); }
  getPropertyValue(name) { return (this.properties.get(name) || {}).value || ''; }
  getPropertyPriority(name) { return (this.properties.get(name) || {}).priority || ''; }
  setProperty(name, value, priority = '') { this.properties.set(name, { value, priority }); }
  removeProperty(name) { this.properties.delete(name); }
}

test('localized labels and help use the same keys', () => {
  const labels = objectLiteral('  const I18N =', '  const SETTING_HELP =');
  const help = objectLiteral('  const SETTING_HELP =', '  function settingHelp');
  for (const language of ['de', 'ru']) {
    assert.deepEqual(Object.keys(labels[language]).sort(), Object.keys(labels.en).sort());
    assert.deepEqual(Object.keys(help[language]).sort(), Object.keys(help.en).sort());
  }
});

test('settings imports reject unknown keys and preserve the supported legacy migration', () => {
  const code = section('  const DEFAULTS =', '  function loadConfig()');
  const prelude = `
    const DEFAULT_CHAT_PX = 340;
    const MAX_CHAT_PX = 1200;
    const COLOR_RE = /^#[0-9a-f]{6}$/i;
    const APPEARANCE_PROFILES = new Set(['comfortable', 'compact', 'accessible']);
    const PING_SOUND_NAMES = new Set([
      'message', 'pop', 'drop', 'knock', 'glass', 'pluck', 'orbit', 'pixel', 'bell', 'spark',
      'chime', 'doubletap', 'woodblock', 'marble', 'quartz', 'blink', 'ripple', 'chord'
    ]);
  `;
  const hooks = evaluate(code, prelude, ['DEFAULTS', 'parseSettingsJSON']);

  assert.equal(hooks.parseSettingsJSON('{"mentionSond":false}'), null);
  assert.equal(hooks.parseSettingsJSON('{"mentionSound":"no"}'), null);
  assert.equal(hooks.parseSettingsJSON('{"preventRaidRedirects":"yes"}'), null);
  assert.equal(hooks.parseSettingsJSON('{"preventRaidRedirects":true}').raidReturnMinutes, 5);
  assert.equal(hooks.parseSettingsJSON('{"mentionSound":false}').mentionSound, false);
});

function spamHooks() {
  const code = section('  function clearSpamLineVisuals', '  const SHORT_LINK_HOSTS');
  const prelude = `
    const SPAM_MIN_MATCHES = 3;
    const SPAM_WINDOW_MS = 12000;
    const CONFIG = { spamCompression: true };
    const spamGroupsBySignature = new Map();
    let spamPruneCounter = 0;
    const tf = (key, values) => 'Repeated ×' + values.count;
    const t = (key) => key;
    const metadataForLine = (line) => line.meta;
    const lineCopyText = (line) => line.copyText || '';
  `;
  return evaluate(
    code,
    prelude,
    ['spamGroupsBySignature', 'reconcileSpamGroup', 'updateSpamGroup', 'applySpamCompression'],
    { document: { createElement: () => new FakeButton(), querySelectorAll: () => [] } }
  );
}

test('spam groups promote a connected root and never orphan hidden duplicates', () => {
  const hooks = spamHooks();
  const oldRoot = new FakeLine({ connected: false });
  const remaining = [new FakeLine(), new FakeLine(), new FakeLine()];
  remaining.forEach((line) => line.classList.add('bt-spam-duplicate'));
  const group = {
    root: oldRoot,
    lines: [oldRoot, ...remaining],
    expanded: false,
    button: null,
  };

  assert.equal(hooks.updateSpamGroup(group), true);
  assert.equal(group.root, remaining[0]);
  assert.equal(remaining[0].classList.contains('bt-spam-root'), true);
  assert.equal(remaining[0].classList.contains('bt-spam-duplicate'), false);
  assert.equal(remaining[1].classList.contains('bt-spam-duplicate'), true);
  assert.equal(remaining[2].classList.contains('bt-spam-duplicate'), true);
  assert.ok(group.button && group.button.isConnected);

  remaining[2].isConnected = false;
  assert.equal(hooks.updateSpamGroup(group), true);
  assert.equal(remaining[0].classList.contains('bt-spam-root'), false);
  assert.equal(remaining[1].classList.contains('bt-spam-duplicate'), false);
  assert.equal(group.button, null);
});

test('spam signatures retain emote names from IRC metadata', () => {
  const hooks = spamHooks();
  const kappa = new FakeLine({ text: 'hello Kappa', timestamp: 100 });
  const lul = new FakeLine({ text: 'hello LUL', timestamp: 101 });
  kappa.copyText = 'hello';
  lul.copyText = 'hello';

  hooks.applySpamCompression(kappa);
  hooks.applySpamCompression(lul);

  assert.deepEqual([...hooks.spamGroupsBySignature.keys()], ['hello kappa', 'hello lul']);
});

test('layout styles restore the exact original value and priority', () => {
  const code = section('  const layoutStyleSnapshots', '  function applyColumn');
  const hooks = evaluate(
    code,
    '',
    ['layoutStyleSnapshots', 'setImp', 'removeInlineStyle', 'restoreAllLayoutStyles']
  );
  const element = { isConnected: true, style: new FakeStyle() };
  element.style.setProperty('width', '333px', '');

  hooks.setImp(element, 'width', '500px');
  hooks.setImp(element, 'max-width', '500px');
  assert.equal(element.style.getPropertyValue('width'), '500px');
  assert.equal(element.style.getPropertyPriority('width'), 'important');

  hooks.restoreAllLayoutStyles();
  assert.equal(element.style.getPropertyValue('width'), '333px');
  assert.equal(element.style.getPropertyPriority('width'), '');
  assert.equal(element.style.getPropertyValue('max-width'), '');
  assert.equal(hooks.layoutStyleSnapshots.size, 0);
});

test('layout fallback is reachable and no hard-coded default transform remains', () => {
  assert.match(source, /CONFIG\.chatWidthEnabled && \(!col \|\| expanded\)/);
  assert.match(source, /target = widenChat\(col\)/);
  assert.doesNotMatch(source, /translateX\(-['"]? \+ DEFAULT_CHAT_PX/);
});

test('clipboard helper resolves and rejects with the browser API result', async () => {
  const code = section('  function writeClipboardText', '  function stripTagsAndPrefix');
  let written = '';
  const success = evaluate(code, '', ['writeClipboardText'], {
    navigator: { clipboard: { writeText: async (text) => { written = text; } } },
  });
  await success.writeClipboardText('settings');
  assert.equal(written, 'settings');

  const failure = evaluate(code, '', ['writeClipboardText'], { navigator: {} });
  await assert.rejects(failure.writeClipboardText('settings'), /Clipboard API unavailable/);
  assert.match(source, /await writeClipboardText\(ta\.value\);/);
});

test('mention help describes page-session retention consistently', () => {
  assert.doesNotMatch(source, /changing the room clears the session list/);
  assert.doesNotMatch(source, /Raumwechsel löscht die Sitzungsliste/);
  assert.doesNotMatch(source, /смена комнаты очищает список сеанса/);
  assert.match(source, /channel changes keep mentions from the same page session/);
});
