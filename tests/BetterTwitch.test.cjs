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

function embeddedStyleSheet() {
  const marker = '    style.textContent = `';
  return section(marker, '\n    `;').slice(marker.length);
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
  assert.deepEqual(JSON.parse(JSON.stringify(hooks.DEFAULTS)), {
    language: 'auto',
    markSingleDeletes: true, markTimeouts: true, markFullClear: true,
    chatWidthPx: 600,
    hideBadges: false, showAvatars: true, msgSeparators: true,
    hideLeaderboard: false, hideCommunityHighlights: false,
    autoClaimPoints: true, autoClaimDrops: true, autoQuality: false,
    raidReturnMinutes: 0, offlineRefreshMinutes: 0,
    mentionSound: true, mentionReplyPing: true,
    pingSound: 'message', pingVolume: 1,
    mentionHighlight: true, highlightMods: true, highlightVips: true,
    mentionColor: '#e31337', modColor: '#00ad03', vipColor: '#e005b9',
    fixNameColors: true, copyButton: true,
    accentColor: '#e31337',
    hideCommands: false, hideBots: false,
    botNames: 'nightbot,streamelements,moobot,streamlabs,fossabot,wizebot,soundalerts',
    inlineTranslate: true, mentionInbox: true, mentionContextMessages: 2,
    viewerHovercards: true,
    characterCounter: true,
    spamCompression: true,
    quickChatFilters: true, liveChatSearch: true, saferLinks: true,
    dashboard: true,
  });
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
  assert.match(source, /if \(!col \|\| expanded\) \{/);
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

test('top-of-chat hiding survives Twitch rotating from leaderboards to goals', () => {
  assert.match(source, /const TOP_USERS_SURFACE_SELECTOR\s*=\s*[\s\S]*?\[class\*="goal" i\][\s\S]*?\[data-test-selector\*="goal" i\]/);
  assert.match(source, /function applyChatTopSurfaces\(\)\s*\{\s*if \(!CONFIG\.hideLeaderboard\)\s*\{[^}]*\.bt-top-users-hidden/s);
  assert.match(source, /if \(!CONFIG\.hideCommunityHighlights\)\s*\{[^}]*\.bt-community-highlights-hidden/s);
  assert.doesNotMatch(source, /function applyChatTopSurfaces\(\)\s*\{\s*document\.querySelectorAll\('\.bt-top-users-hidden'\)/);
});

test('footer and popup headers share one professional outline icon system', () => {
  const css = embeddedStyleSheet();
  assert.match(css, /\.bt-panel-header\s*\{[^}]*min-height:\s*58px[^}]*border-inline-start:\s*3px solid var\(--bt-accent\)[^}]*linear-gradient\(/s);
  assert.doesNotMatch(css, /bt-header-(?:ambient|rail)|#7c3aed|#a855f7/i);
  for (const name of ['settings', 'dashboard', 'mentions', 'chatTools']) {
    assert.ok(source.includes(`uiIcon('${name}', 'bt-header-icon')`), `Missing header icon: ${name}`);
    assert.ok(source.includes(`uiIcon('${name}', 'bt-footer-icon')`), `Missing matching footer icon: ${name}`);
  }
  assert.match(source, /function uiIcon\(name, className = ''\)[\s\S]*?stroke-width="1\.8"/);
  assert.match(css, /\.bt-header-icon\s*\{[^}]*width:\s*20px[^}]*height:\s*20px[^}]*color:\s*var\(--bt-accent\)/s);
  assert.match(css, /#bt-panel \.bt-title,[^{]*\{[^}]*margin-inline-start:\s*6px/s);
  assert.doesNotMatch(css, /\.bt-panel-header::before|mask-image:/);
  assert.doesNotMatch(css, /drop-shadow\s*\(/i);
  assert.doesNotMatch(css, /backdrop-filter\s*:/i);
  assert.doesNotMatch(css, /\bfilter\s*:/i);
  assert.doesNotMatch(source, /<linearGradient|bt-dash-gradient/);
});

test('modern UI stylesheet covers every primary surface and accessibility state', () => {
  const css = embeddedStyleSheet();
  for (const selector of [
    '#bt-panel', '.bt-pop', '#bt-dash', '#bt-inbox', '#bt-chat-controls',
    '#bt-hovercard', '#bt-modal', '.bt-message-actions', '.bt-trans', '.bt-panel-header',
  ]) {
    assert.ok(css.includes(selector), `Missing redesigned surface: ${selector}`);
  }
  assert.equal((source.match(/class="bt-pop-head bt-panel-header"/g) || []).length, 3);
  for (const header of [
    'class="bt-modal-head bt-panel-header"',
  ]) {
    assert.ok(source.includes(header), `Missing shared panel header: ${header}`);
  }
  assert.match(css, /--bt-popup-radius:\s*5px/);
  assert.doesNotMatch(css, /clip-path:\s*inset\(0 round var\(--bt-popup-radius\)\)/);
  assert.match(css, /#bt-panel, \.bt-pop, #bt-hovercard,[^{]*\{[^}]*border-radius:\s*var\(--bt-popup-radius\)[^}]*overflow:\s*hidden/s);
  assert.match(css, /#bt-panel > \.bt-body,\s*\.bt-pop > \.bt-body,/);
  assert.match(css, /#bt-panel > \.bt-panel-header,\s*\.bt-pop > \.bt-panel-header,\s*#bt-modal \.bt-modal-box > \.bt-panel-header\s*\{[^}]*width:\s*100%/s);
  assert.doesNotMatch(css, /#bt-panel::after,\s*\.bt-pop::after/);
  assert.match(css, /\.bt-body::-webkit-scrollbar-track\s*\{[^}]*margin-block:\s*var\(--bt-popup-radius\)/s);
  assert.equal((source.match(/structurePopup\((?:dashboard|p|controls|panel)\);/g) || []).length, 4);
  assert.match(source, /if \(node !== header && node !== footer\) body\.appendChild\(node\)/);
  assert.ok(source.includes('class="bt-foot bt-popup-footer"'));
  assert.ok(source.includes('class="bt-modal-foot bt-popup-footer"'));
  assert.match(css, /input\[type=color\]::?-webkit-color-swatch[^}]*border-radius:\s*50%/s);
  assert.match(css, /input\[type=color\]::?-moz-color-swatch[^}]*border-radius:\s*50%/s);
  assert.match(css, /#bt-panel,\s*\.bt-pop,\s*#bt-hovercard,\s*#bt-setting-tooltip,\s*#bt-modal \.bt-modal-box\s*\{/);
  assert.match(source, /const maxLeft = Math\.max\(boundary, viewportWidth - width - boundary\)/);
  for (const token of [
    '--bt-surface-0', '--bt-surface-1', '--bt-line-strong', '--bt-text-soft',
    'html[data-bt-theme="light"]', ':focus-visible', 'prefers-reduced-motion',
  ]) {
    assert.ok(css.includes(token), `Missing design-system requirement: ${token}`);
  }
  assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length);
});

test('performance hot paths are event-driven, indexed, delegated, and frame-budgeted', () => {
  assert.match(source, /setInterval\(tick, document\.hidden \? 60000 : 30000\)/);
  assert.match(source, /\['pushState', 'replaceState'\]/);
  assert.match(source, /const indexedChatLines = new Set\(\)/);
  assert.match(source, /const pendingChatLines = new Map\(\)/);
  assert.match(source, /processed >= 40 \|\| now - started >= 7/);
  assert.match(source, /container\.addEventListener\('click', handleDelegatedChatClick\)/);
  assert.doesNotMatch(source, /button\.addEventListener\('click', handler\)/);
  assert.match(source, /function refreshSetting\(key\)/);
  assert.doesNotMatch(source, /performanceDiagnostics|refreshPerformanceDiagnostics|schedulePerformanceDiagnostics|\bPERF\b/);
});

test('popup polish includes chat-aligned fixed panels, section resets, and states', () => {
  const css = embeddedStyleSheet();
  for (const token of [
    '.bt-body', '.bt-popup-footer',
    '.bt-section-reset', '.bt-state-offline',
  ]) assert.ok(css.includes(token), `Missing UI polish: ${token}`);
  for (const token of [
    'structurePopup', 'confirmSectionReset', 'repositionOpenPanels',
  ]) assert.ok(source.includes(token), `Missing UI behavior: ${token}`);
  assert.match(source, /const composer = findComposerInput\(\);[\s\S]*?const candidates = \[\s*composerField,/);
  assert.match(source, /composer\.closest\('\.chat-input__textarea'\)/);
  assert.match(source, /btn\.closest && btn\.closest\('\.stream-chat/);
  assert.match(source, /btn\.closest && btn\.closest\('\.chat-input'\)/);
  assert.match(source, /const boundary = chatRect \? 0 : edge/);
  assert.match(source, /const anchorLeft = chatRect \? Math\.max\(0, Math\.round\(chatRect\.left\)\) : null/);
  assert.match(source, /const anchorRight = chatRect \? Math\.min\(viewportWidth, Math\.round\(chatRect\.right\)\) : null/);
  assert.match(source, /const measuredWidth = chatRect \? Math\.max\(0, anchorRight - anchorLeft\) : fallbackWidth/);
  assert.match(css, /\.bt-footer-control\s*\{[^}]*margin-inline-start:\s*6px\s*!important/s);
  assert.match(source, /wrap\.classList\.add\('bt-footer-control'\)/);
  assert.match(source, /const verticalShift = 4/);
  assert.doesNotMatch(source, /UI_STATE_KEY|PANEL_SHORTCUTS|bt-panel-resize-handle|bt-panel-dock|bt-shortcut-hint|resizePanelWithKeyboard|beginPanelResize|beginPanelDrag|installPanelGeometry|Alt\+Shift\+/);
  assert.doesNotMatch(source, /settingsSearch|settingsPreset|bt-settings-toolbar|bt-settings-search|bt-settings-preset|bt-apply-preset|filterSettings|appearanceProfile|APPEARANCE_PROFILES|bt-profile-(?:compact|accessible)|compactFooter|bt-compact-footer|chatWidthEnabled|FIRST_RUN|firstRun|onboarding|SETTINGS_PRESETS|presetMinimal|presetBalanced|presetPower|welcomeTitle|welcomeText|welcomeSkip|bt-preset-cards/i);
  assert.doesNotMatch(source, /\bPANEL_W\b|--bt-radius(?:-sm)?\s*:|bt-profile-comfortable|bt-head bt-panel-header|bt-hover-head/);
  assert.doesNotMatch(css, /cursor:\s*(?:move|nwse-resize)/);
  assert.match(source, /chatWidthPx:\s*600/);
  assert.match(css, /#bt-panel input\[type=range\]\s*\{[^}]*flex:\s*0 0 150px[^}]*width:\s*150px[^}]*max-width:\s*150px/s);
  assert.match(css, /#bt-panel select\s*\{[^}]*flex:\s*0 0 180px[^}]*width:\s*180px[^}]*max-width:\s*180px/s);
  assert.match(css, /#bt-panel input\[type=text\],[^{]*\{[^}]*flex:\s*0 0 180px[^}]*width:\s*180px[^}]*max-width:\s*180px/s);
  assert.match(source, /const DASHBOARD_TOP_CHATTERS = 10/);
  assert.match(source, /\.slice\(0, DASHBOARD_TOP_CHATTERS\)/);
  assert.match(source, /const previousBody = dashboard\.querySelector\(':scope > \.bt-body'\);[\s\S]*?if \(body\) body\.scrollTop = previousScrollTop/);
  assert.equal((source.match(/class="bt-by bt-meta-pill"/g) || []).length, 1);
  assert.equal((source.match(/class="bt-version bt-meta-pill"/g) || []).length, 1);
  assert.match(source, /class="bt-by bt-meta-pill"[^>]*>\$\{t\('byAuthor'\)\} YaneonY<\/a>\s*<a class="bt-version bt-meta-pill"/);
  assert.match(css, /#bt-panel \.bt-meta-pill\s*\{[^}]*border:\s*1px solid color-mix\([^}]*border-radius:\s*7px/s);
  assert.doesNotMatch(source, /class="bt-pop-head bt-panel-header"[^\n]*class="bt-version/);
  assert.match(source, /setMessageAction\(bar, 'translate', CONFIG\.inlineTranslate, t\('translateMessageAction'\)/);
  assert.doesNotMatch(source, /Translate on hover|Beim Überfahren übersetzen|Перевод при наведении/);
  assert.match(css, /#bt-panel input\[type=checkbox\]::before\s*\{[^}]*top:\s*calc\(50% - 1px\)[^}]*transform:\s*translateY\(-50%\)/s);
  assert.match(css, /#bt-panel input\[type=checkbox\]:checked::before\s*\{[^}]*transform:\s*translate\(14px, -50%\)/s);
  assert.match(css, /#bt-panel \.bt-setting-item, #bt-panel \.bt-rowflex\s*\{[^}]*align-items:\s*center[^}]*min-height:\s*44px/s);
  assert.match(css, /#bt-panel label\.bt-row > input,[^{]*#bt-panel \.bt-rowflex > \.bt-val\s*\{\s*align-self:\s*center/s);
  assert.match(css, /\.bt-panel-header::after\s*\{[^}]*top:\s*14px[^}]*bottom:\s*14px[^}]*left:\s*45px[^}]*width:\s*1px/s);
  assert.match(css, /#bt-settings-btn:hover svg,[^{]*#bt-chat-control-btn:hover svg\s*\{[^}]*translateY\(-1px\)/s);
  assert.match(css, /#bt-panel input\[type=checkbox\]:focus,[^{]*:focus-visible\s*\{[^}]*outline:\s*none[^}]*border-color:\s*var\(--bt-accent\)/s);
  assert.match(css, /#bt-panel input\[type=range\]:focus,[^{]*:focus-visible\s*\{[^}]*outline:\s*none/s);
  assert.match(css, /#bt-panel input\[type=color\]:focus,[^{]*:focus-visible\s*\{[^}]*outline:\s*none[^}]*border-color:\s*var\(--bt-accent\)/s);
  assert.match(css, /#bt-panel select:focus,[^{]*#bt-modal textarea:focus,[^{]*\.bt-chat-search input:focus\s*\{[^}]*outline:\s*none[^}]*border-color:\s*var\(--bt-accent\)/s);
  assert.match(css, /@media \(max-width:\s*430px\)[\s\S]*?\.bt-panel-header\s*\{[^}]*grid-template-columns:\s*18px[^}]*padding-inline:\s*12px[^}]*\}[\s\S]*?\.bt-header-icon\s*\{[^}]*width:\s*18px[^}]*height:\s*18px/s);
});
