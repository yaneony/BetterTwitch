// ==UserScript==
// @name         BetterTwitch
// @namespace    https://yaneony.com
// @version      1.4.0
// @description  Keep deleted messages visible, widen chat, show avatars, auto-claim points & Drops, prefer source quality, @mention highlights/sounds, mod/VIP highlights, chat filters, plus a live stats dashboard, hype meter, emote rain, inline translation, mention inbox and first-chatter spotlight.
// @author       YaneonY
// @updateURL    https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js
// @downloadURL  https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js
// @match        https://www.twitch.tv/*
// @match        https://dashboard.twitch.tv/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';
  if (window.__BetterTwitchInstalled) return;
  window.__BetterTwitchInstalled = true;

  const I18N = {
    en: {
      secLanguage: 'Language', langAuto: 'Auto-detect',
      secDeleted: 'Deleted messages',
      markSingleDeletes: 'Mark single deletions',
      markTimeouts: 'Mark timeouts / bans',
      markFullClear: 'Mark full chat clears',
      secChat: 'Chat',
      chatWidthEnabled: 'Widen chat panel',
      width: 'Width',
      hideBadges: 'Hide badges',
      showAvatars: 'Show user avatars',
      msgSeparators: 'Separator between messages',
      hideLeaderboard: 'Hide Bits leaderboard',
      secPlayer: 'Player',
      autoQuality: 'Prefer source quality',
      secPoints: 'Points',
      autoClaimPoints: 'Auto-claim bonus chest',
      autoClaimDrops: 'Auto-claim Drops',
      secNotifications: 'Notifications',
      mentionSound: 'Sound on @mention',
      mentionReplyPing: 'Sound on replies to you',
      sound: 'Sound',
      test: 'Test',
      volume: 'Volume',
      sndChime: 'Chime', sndBeep: 'Beep', sndDing: 'Ding', sndSoft: 'Soft', sndLow: 'Low',
      sndRise: 'Rise', sndFall: 'Fall', sndDouble: 'Double', sndPop: 'Pop', sndBell: 'Bell', sndArcade: 'Arcade', sndGlass: 'Glass',
      secHighlights: 'Highlights',
      mentionHighlight: 'Highlight @mentions',
      highlightMods: 'Highlight moderators',
      highlightVips: 'Highlight VIPs',
      fixNameColors: 'Boost name contrast',
      copyButton: 'Copy button on hover',
      secTheme: 'Theme',
      accentColor: 'Accent color',
      secFilter: 'Filter',
      hideCommands: 'Hide ! commands',
      hideBots: 'Hide bot messages',
      export: 'Export', import: 'Import', reset: 'Reset',
      savedNote: 'Saved automatically.',
      settingsBtnTitle: 'BetterTwitch settings',
      alertCopied: 'Copied to clipboard.',
      alertInvalidJson: 'Invalid JSON.',
      confirmReset: 'Reset all BetterTwitch settings to defaults?',
      exportTitle: 'Export settings', importTitle: 'Import settings',
      ioCopy: 'Copy', ioApply: 'Apply', ioClose: 'Close',
      secExtras: 'Extras',
      dashboard: 'Live chat dashboard',
      inlineTranslate: 'Translate on hover', mentionInbox: 'Mentions Panel',
      dashBtnTitle: 'Live chat stats', inboxBtnTitle: 'Mentions',
      dashTitle: 'Live stats', dashPerMin: 'msgs/min', dashTopChatters: 'Top chatters',
      dashTopEmotes: 'Top emotes', dashEmpty: 'Waiting for messages…',
      inboxTitle: 'Mentions', inboxEmpty: 'No mentions yet.',
    },
    de: {
      secLanguage: 'Sprache', langAuto: 'Automatisch erkennen',
      secDeleted: 'Gelöschte Nachrichten',
      markSingleDeletes: 'Einzellöschungen markieren',
      markTimeouts: 'Timeouts / Sperren markieren',
      markFullClear: 'Komplette Chat-Löschungen markieren',
      secChat: 'Chat',
      chatWidthEnabled: 'Chat-Panel verbreitern',
      width: 'Breite',
      hideBadges: 'Abzeichen ausblenden',
      showAvatars: 'Benutzer-Avatare anzeigen',
      msgSeparators: 'Trennlinie zwischen Nachrichten',
      hideLeaderboard: 'Bits-Bestenliste ausblenden',
      secPlayer: 'Player',
      autoQuality: 'Quellqualität bevorzugen',
      secPoints: 'Punkte',
      autoClaimPoints: 'Bonus-Truhe automatisch einlösen',
      autoClaimDrops: 'Drops automatisch einlösen',
      secNotifications: 'Benachrichtigungen',
      mentionSound: 'Ton bei @Erwähnung',
      mentionReplyPing: 'Ton bei Antworten an dich',
      sound: 'Ton',
      test: 'Test',
      volume: 'Lautstärke',
      sndChime: 'Glocke', sndBeep: 'Piep', sndDing: 'Ding', sndSoft: 'Sanft', sndLow: 'Tief',
      sndRise: 'Aufsteigend', sndFall: 'Absteigend', sndDouble: 'Doppelt', sndPop: 'Pop', sndBell: 'Klingel', sndArcade: 'Arcade', sndGlass: 'Glas',
      secHighlights: 'Hervorhebungen',
      mentionHighlight: '@Erwähnungen hervorheben',
      highlightMods: 'Moderatoren hervorheben',
      highlightVips: 'VIPs hervorheben',
      fixNameColors: 'Namens-Kontrast verbessern',
      copyButton: 'Kopier-Button beim Überfahren',
      secTheme: 'Design',
      accentColor: 'Akzentfarbe',
      secFilter: 'Filter',
      hideCommands: '!-Befehle ausblenden',
      hideBots: 'Bot-Nachrichten ausblenden',
      export: 'Exportieren', import: 'Importieren', reset: 'Zurücksetzen',
      savedNote: 'Automatisch gespeichert.',
      settingsBtnTitle: 'BetterTwitch-Einstellungen',
      alertCopied: 'In die Zwischenablage kopiert.',
      alertInvalidJson: 'Ungültiges JSON.',
      confirmReset: 'Alle BetterTwitch-Einstellungen auf Standard zurücksetzen?',
      exportTitle: 'Einstellungen exportieren', importTitle: 'Einstellungen importieren',
      ioCopy: 'Kopieren', ioApply: 'Übernehmen', ioClose: 'Schließen',
      secExtras: 'Extras',
      dashboard: 'Live-Chat-Dashboard',
      inlineTranslate: 'Beim Überfahren übersetzen', mentionInbox: 'Erwähnungs-Panel',
      dashBtnTitle: 'Live-Chat-Statistik', inboxBtnTitle: 'Erwähnungen',
      dashTitle: 'Live-Statistik', dashPerMin: 'Nachr./Min', dashTopChatters: 'Top-Chatter',
      dashTopEmotes: 'Top-Emotes', dashEmpty: 'Warte auf Nachrichten…',
      inboxTitle: 'Erwähnungen', inboxEmpty: 'Noch keine Erwähnungen.',
    },
    ru: {
      secLanguage: 'Язык', langAuto: 'Автоопределение',
      secDeleted: 'Удалённые сообщения',
      markSingleDeletes: 'Отмечать удаления сообщений',
      markTimeouts: 'Отмечать таймауты / баны',
      markFullClear: 'Отмечать полную очистку чата',
      secChat: 'Чат',
      chatWidthEnabled: 'Расширить панель чата',
      width: 'Ширина',
      hideBadges: 'Скрыть значки',
      showAvatars: 'Показывать аватары',
      msgSeparators: 'Разделитель между сообщениями',
      hideLeaderboard: 'Скрыть рейтинг Bits',
      secPlayer: 'Плеер',
      autoQuality: 'Предпочитать исходное качество',
      secPoints: 'Баллы',
      autoClaimPoints: 'Авто-сбор бонусного сундука',
      autoClaimDrops: 'Авто-сбор Drops',
      secNotifications: 'Уведомления',
      mentionSound: 'Звук при @упоминании',
      mentionReplyPing: 'Звук при ответах вам',
      sound: 'Звук',
      test: 'Тест',
      volume: 'Громкость',
      sndChime: 'Перезвон', sndBeep: 'Сигнал', sndDing: 'Динь', sndSoft: 'Мягкий', sndLow: 'Низкий',
      sndRise: 'Восходящий', sndFall: 'Нисходящий', sndDouble: 'Двойной', sndPop: 'Поп', sndBell: 'Колокол', sndArcade: 'Аркада', sndGlass: 'Стекло',
      secHighlights: 'Подсветка',
      mentionHighlight: 'Подсвечивать @упоминания',
      highlightMods: 'Подсвечивать модераторов',
      highlightVips: 'Подсвечивать VIP',
      fixNameColors: 'Улучшать контраст ников',
      copyButton: 'Кнопка копирования при наведении',
      secTheme: 'Оформление',
      accentColor: 'Акцентный цвет',
      secFilter: 'Фильтр',
      hideCommands: 'Скрывать !-команды',
      hideBots: 'Скрывать сообщения ботов',
      export: 'Экспорт', import: 'Импорт', reset: 'Сброс',
      savedNote: 'Сохраняется автоматически.',
      settingsBtnTitle: 'Настройки BetterTwitch',
      alertCopied: 'Скопировано в буфер обмена.',
      alertInvalidJson: 'Неверный JSON.',
      confirmReset: 'Сбросить все настройки BetterTwitch к значениям по умолчанию?',
      exportTitle: 'Экспорт настроек', importTitle: 'Импорт настроек',
      ioCopy: 'Копировать', ioApply: 'Применить', ioClose: 'Закрыть',
      secExtras: 'Дополнительно',
      dashboard: 'Панель статистики чата',
      inlineTranslate: 'Перевод при наведении', mentionInbox: 'Панель упоминаний',
      dashBtnTitle: 'Статистика чата', inboxBtnTitle: 'Упоминания',
      dashTitle: 'Статистика', dashPerMin: 'сообщ./мин', dashTopChatters: 'Самые активные',
      dashTopEmotes: 'Топ эмоций', dashEmpty: 'Ожидание сообщений…',
      inboxTitle: 'Упоминания', inboxEmpty: 'Упоминаний пока нет.',
    },
  };

  function detectLang() {
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (const l of list) {
      const code = (l || '').slice(0, 2).toLowerCase();
      if (I18N[code]) return code;
    }
    return 'en';
  }

  function currentLang() {
    const sel = typeof CONFIG !== 'undefined' && CONFIG.language;
    return (sel && sel !== 'auto' && I18N[sel]) ? sel : detectLang();
  }

  function t(key) { const l = currentLang(); return (I18N[l] && I18N[l][key]) || I18N.en[key] || key; }

  const STORAGE_KEY = 'BetterTwitch-settings';
  const MAX_CHAT_PX = 1200;
  const DEFAULT_CHAT_PX = 340;
  const DEFAULTS = {
    language: 'auto',
    markSingleDeletes: true, markTimeouts: true, markFullClear: true,
    chatWidthEnabled: true, chatWidthPx: 400,
    hideBadges: false, showAvatars: false, msgSeparators: false, hideLeaderboard: false,
    autoClaimPoints: true, autoClaimDrops: true, autoQuality: false,
    mentionSound: true, mentionReplyPing: true,
    pingSound: 'chime', pingVolume: 0.2,
    mentionHighlight: true, highlightMods: false, highlightVips: false,
    mentionColor: '#e31337', modColor: '#00ad03', vipColor: '#e005b9',
    fixNameColors: false, copyButton: false,
    accentColor: '#e31337',
    hideCommands: false, hideBots: false,
    botNames: 'nightbot,streamelements,moobot,streamlabs,fossabot,wizebot,soundalerts',
    dashboard: true, inlineTranslate: false, mentionInbox: true,
  };

  function loadConfig() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}
    return Object.assign({}, DEFAULTS, saved);
  }

  const CONFIG = loadConfig();

  function saveConfig() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(CONFIG)); } catch (e) {} }

  function chatWidth() { return CONFIG.chatWidthEnabled ? CONFIG.chatWidthPx + 'px' : null; }

  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function isMention(text, word) {
    if (!word) return false;
    return new RegExp('(^|[^\\w])@?' + escapeRegex(word) + '($|[^\\w])').test(text);
  }

  function stripTagsAndPrefix(line) {
    let s = line;
    if (s[0] === '@') s = s.slice(s.indexOf(' ') + 1);
    if (s[0] === ':') s = s.slice(s.indexOf(' ') + 1);
    return s;
  }

  function ircCommand(line) { return stripTagsAndPrefix(line).split(' ')[0]; }

  function parseTags(line) {
    const tags = {};
    if (line[0] !== '@') return tags;
    const seg = line.slice(1, line.indexOf(' '));
    for (const kv of seg.split(';')) {
      const eq = kv.indexOf('=');
      if (eq === -1) tags[kv] = ''; else tags[kv.slice(0, eq)] = kv.slice(eq + 1);
    }
    return tags;
  }

  function trailing(line) {
    const s = stripTagsAndPrefix(line);
    const i = s.indexOf(' :');
    return i === -1 ? '' : s.slice(i + 2);
  }

  function senderLogin(line) {
    let s = line;
    if (s[0] === '@') s = s.slice(s.indexOf(' ') + 1);
    if (s[0] === ':') { const ex = s.indexOf('!'); if (ex !== -1) return s.slice(1, ex).toLowerCase(); }
    return '';
  }

  function parseClearMsg(line) {
    const t = parseTags(line);
    return { kind: 'msg', login: (t.login || '').toLowerCase(), text: trailing(line) };
  }

  function parseClearChat(line) {
    const user = trailing(line);
    return user ? { kind: 'user', login: user.toLowerCase() } : { kind: 'all' };
  }

  function filterEvent(event) {
    try {
      const data = event.data;
      if (typeof data !== 'string') return event;
      if (data.indexOf('CLEARMSG') === -1 && data.indexOf('CLEARCHAT') === -1) return event;
      const lines = data.split('\r\n');
      const keep = [];
      let changed = false;
      for (const line of lines) {
        if (!line) continue;
        const cmd = ircCommand(line);
        if (cmd === 'CLEARMSG' && CONFIG.markSingleDeletes) { enqueue(parseClearMsg(line)); changed = true; continue; }
        if (cmd === 'CLEARCHAT') {
          const task = parseClearChat(line);
          if ((task.kind === 'user' && CONFIG.markTimeouts) || (task.kind === 'all' && CONFIG.markFullClear)) {
            enqueue(task); changed = true; continue;
          }
        }
        keep.push(line);
      }
      if (!changed) return event;
      if (keep.length === 0) return null;
      return new MessageEvent('message', { data: keep.join('\r\n') + '\r\n', origin: event.origin, lastEventId: event.lastEventId });
    } catch (e) { console.warn('[BetterTwitch] filter error:', e); return event; }
  }

  function hook(ws) {
    const wrap = (listener) => function (event) {
      try { checkAlerts(event.data); } catch (e) {}
      try { ingest(event.data); } catch (e) {}
      const out = filterEvent(event);
      if (out) return listener.call(this, out);
    };
    const origAdd = ws.addEventListener.bind(ws);
    const origRemove = ws.removeEventListener.bind(ws);
    ws.addEventListener = function (type, listener, opts) {
      if (type === 'message' && typeof listener === 'function') return origAdd(type, wrap(listener), opts);
      return origAdd(type, listener, opts);
    };
    let _on = null, _wrapped = null;
    Object.defineProperty(ws, 'onmessage', {
      configurable: true,
      get() { return _on; },
      set(fn) {
        if (_wrapped) origRemove('message', _wrapped);
        _on = fn;
        if (typeof fn === 'function') { _wrapped = wrap(fn); origAdd('message', _wrapped); } else { _wrapped = null; }
      },
    });
  }

  const Native = window.WebSocket;

  function PatchedWS(...args) {
    const ws = new Native(...args);
    try { if (String(args[0]).includes('irc-ws.chat.twitch.tv')) hook(ws); } catch (e) {}
    return ws;
  }

  PatchedWS.prototype = Native.prototype;
  PatchedWS.CONNECTING = Native.CONNECTING; PatchedWS.OPEN = Native.OPEN;
  PatchedWS.CLOSING = Native.CLOSING; PatchedWS.CLOSED = Native.CLOSED;
  window.WebSocket = PatchedWS;

  let myLogin = '';

  function getMyLogin() {
    if (myLogin) return myLogin;
    const m = document.cookie.match(/(?:^|;\s*)login=([^;]+)/);
    if (m) myLogin = decodeURIComponent(m[1]).toLowerCase();
    return myLogin;
  }

  function checkAlerts(data) {
    if (typeof data !== 'string' || data.indexOf('PRIVMSG') === -1) return;
    const me = getMyLogin();
    for (const line of data.split('\r\n')) {
      if (!line || ircCommand(line) !== 'PRIVMSG') continue;
      const sender = senderLogin(line);
      if (me && sender === me) continue;
      const tags = parseTags(line);
      const text = trailing(line);
      const lower = text.toLowerCase();
      const replyToMe = me && (tags['reply-parent-user-login'] || '').toLowerCase() === me;
      const nameHit = me && isMention(lower, me);
      const soundWanted = CONFIG.mentionSound && (nameHit || (CONFIG.mentionReplyPing && replyToMe));
      if (soundWanted) playPing();
    }
  }

  const PING_SOUNDS = {
    chime: [880, 1320], beep: [988], ding: [1568], soft: [587, 784], low: [330, 247],
    rise: [523, 659, 784], fall: [784, 659, 523], double: [988, 988], pop: [1175],
    bell: [1319, 1047, 880], arcade: [660, 990, 1320], glass: [1760, 2093],
  };
  let audioCtx = null, lastPing = 0;

  function unlockAudio() {
    try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume(); } catch (e) {}
  }

  function playPing(force) {
    const now = Date.now();
    if (!force && now - lastPing < 1200) return;
    lastPing = now;
    try {
      unlockAudio(); if (!audioCtx) return;
      const freqs = PING_SOUNDS[CONFIG.pingSound] || PING_SOUNDS.chime;
      const vol = Math.max(0.0001, Math.min(1, CONFIG.pingVolume));
      const t0 = audioCtx.currentTime;
      freqs.forEach((f, i) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        const t = t0 + i * 0.12;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o.connect(g).connect(audioCtx.destination);
        o.start(t); o.stop(t + 0.2);
      });
    } catch (e) {}
  }

  ['click', 'keydown'].forEach(ev => document.addEventListener(ev, unlockAudio, { once: true, passive: true }));

  function esc(s) { return (s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  const stats = { msgTimes: [], chatters: new Map(), emotes: new Map() };
  const mentions = [];
  let mentionUnread = 0;
  let dashboardOpen = false, inboxOpen = false, liveTimer = null;

  function emoteUrl(id) { return 'https://static-cdn.jtvnw.net/emoticons/v2/' + id + '/default/dark/2.0'; }

  function parseEmotes(tags, text) {
    const raw = tags.emotes;
    if (!raw) return [];
    const chars = Array.from(text);
    const out = [];
    for (const part of raw.split('/')) {
      if (!part) continue;
      const c = part.indexOf(':'); if (c === -1) continue;
      const id = part.slice(0, c);
      const ranges = part.slice(c + 1).split(',');
      const first = ranges[0], dash = first.indexOf('-');
      const s = +first.slice(0, dash), e = +first.slice(dash + 1);
      const name = chars.slice(s, e + 1).join('');
      for (let i = 0; i < ranges.length; i++) out.push({ id, name });
    }
    return out;
  }

  function ingest(data) {
    if (typeof data !== 'string' || data.indexOf('PRIVMSG') === -1) return;
    const now = Date.now();
    const me = getMyLogin();
    for (const line of data.split('\r\n')) {
      if (!line || ircCommand(line) !== 'PRIVMSG') continue;
      const tags = parseTags(line);
      const login = senderLogin(line) || (tags['display-name'] || '').toLowerCase();
      const text = trailing(line);
      stats.msgTimes.push(now);
      if (login) stats.chatters.set(login, (stats.chatters.get(login) || 0) + 1);
      for (const em of parseEmotes(tags, text)) {
        const cur = stats.emotes.get(em.id) || { name: em.name, count: 0 };
        cur.count++; stats.emotes.set(em.id, cur);
      }
      if (me && login && login !== me) {
        const replyToMe = (tags['reply-parent-user-login'] || '').toLowerCase() === me;
        if (isMention(text.toLowerCase(), me) || replyToMe) {
          mentions.push({ t: now, user: tags['display-name'] || login, color: tags.color || '', text });
          if (mentions.length > 50) mentions.shift();
          mentionUnread++;
          updateInboxBadge();
        }
      }
    }
  }

  function msgsPerMin(now) {
    while (stats.msgTimes.length && now - stats.msgTimes[0] > 60000) stats.msgTimes.shift();
    return stats.msgTimes.length;
  }

  function ensureLive() {
    if (liveTimer) return;
    liveTimer = setInterval(() => {
      const now = Date.now();
      if (dashboardOpen) renderDashboard(msgsPerMin(now), now);
    }, 1000);
  }

  function sparkline(now) {
    const buckets = new Array(20).fill(0);
    for (const t of stats.msgTimes) {
      const idx = 19 - Math.floor((now - t) / 3000);
      if (idx >= 0 && idx < 20) buckets[idx]++;
    }
    const max = Math.max(1, ...buckets), W = 240, H = 34;
    const pts = buckets.map((v, i) => (i / 19 * W).toFixed(1) + ',' + (H - v / max * (H - 2)).toFixed(1)).join(' ');
    return '<svg class="bt-spark" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><polyline points="' + pts + '"/></svg>';
  }

  let dashPanel = null;

  function ensureDashPanel() {
    if (dashPanel) return dashPanel;
    dashPanel = document.createElement('div');
    dashPanel.id = 'bt-dash'; dashPanel.className = 'bt-pop';
    document.body.appendChild(dashPanel);
    document.addEventListener('click', (e) => {
      if (dashboardOpen && !dashPanel.contains(e.target) && !(e.target.closest && e.target.closest('#bt-dash-btn'))) { dashboardOpen = false; dashPanel.classList.remove('bt-open'); }
    });
    return dashPanel;
  }

  function renderDashboard(mpm, now) {
    const p = ensureDashPanel();
    const topChatters = [...stats.chatters.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topEmotes = [...stats.emotes.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 5);
    const idle = !stats.msgTimes.length && !topChatters.length;
    p.innerHTML =
      '<div class="bt-pop-head"><span class="bt-pop-title">' + t('dashTitle') + '</span></div>' +
      (idle ? '<div class="bt-pop-empty">' + t('dashEmpty') + '</div>' :
        '<div class="bt-dash-mpm"><span class="bt-dash-num">' + mpm + '</span><span class="bt-dash-unit">' + t('dashPerMin') + '</span></div>' +
        sparkline(now) +
        '<div class="bt-pop-sub">' + t('dashTopChatters') + '</div>' +
        '<div class="bt-dash-list">' + (topChatters.map(([n, c]) => '<div class="bt-dash-row"><span class="bt-dash-name">' + esc(n) + '</span><span class="bt-dash-c">' + c + '</span></div>').join('') || '—') + '</div>' +
        '<div class="bt-pop-sub">' + t('dashTopEmotes') + '</div>' +
        '<div class="bt-dash-emotes">' + (topEmotes.map(([id, e]) => '<span class="bt-dash-emote" title="' + esc(e.name) + '"><img src="' + emoteUrl(id) + '" alt=""><b>' + e.count + '</b></span>').join('') || '—') + '</div>');
  }

  let inboxPanel = null;

  function ensureInboxPanel() {
    if (inboxPanel) return inboxPanel;
    inboxPanel = document.createElement('div');
    inboxPanel.id = 'bt-inbox'; inboxPanel.className = 'bt-pop';
    document.body.appendChild(inboxPanel);
    document.addEventListener('click', (e) => {
      if (inboxOpen && !inboxPanel.contains(e.target) && !(e.target.closest && e.target.closest('#bt-inbox-btn'))) { inboxOpen = false; inboxPanel.classList.remove('bt-open'); }
    });
    return inboxPanel;
  }

  function renderInbox() {
    const p = ensureInboxPanel();
    const rows = mentions.map((m) => {
      const d = new Date(m.t);
      const time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      const color = m.color || 'var(--bt-accent,#e31337)';
      return '<div class="bt-inbox-row"><span class="bt-inbox-time">' + time + '</span> ' +
        '<span class="bt-inbox-user" style="color:' + esc(color) + '">' + esc(m.user) + '</span>' +
        '<span class="bt-inbox-colon">: </span><span class="bt-inbox-text">' + esc(m.text) + '</span></div>';
    }).join('');
    p.innerHTML = '<div class="bt-pop-head"><span class="bt-pop-title">' + t('inboxTitle') + '</span></div>' +
      (rows || '<div class="bt-pop-empty">' + t('inboxEmpty') + '</div>');
  }

  function updateInboxBadge() {
    const btn = document.getElementById('bt-inbox-btn');
    if (!btn) return;
    let b = btn.querySelector('.bt-badge');
    if (mentionUnread > 0) {
      if (!b) { b = document.createElement('span'); b.className = 'bt-badge'; btn.appendChild(b); }
      b.textContent = mentionUnread > 99 ? '99+' : mentionUnread;
    } else if (b) { b.remove(); }
  }

  function translateText(text, cb) {
    const tl = currentLang();
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text))
      .then((r) => r.json())
      .then((d) => cb(d && d[0] ? d[0].map((x) => x[0]).join('') : null))
      .catch(() => cb(null));
  }

  function addTranslateButton(el) {
    if (!CONFIG.inlineTranslate) { const ex = el.querySelector('.bt-translate'); if (ex) ex.remove(); return; }
    if (el.querySelector('.bt-translate')) return;
    const body = el.querySelector('[data-a-target="chat-line-message-body"]');
    if (!body) return;
    const btn = document.createElement('button');
    btn.className = 'bt-translate'; btn.type = 'button'; btn.title = 'Translate'; btn.setAttribute('aria-label', 'Translate message');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const existing = el.querySelector('.bt-trans');
      if (existing) { existing.remove(); return; }
      const out = document.createElement('div');
      out.className = 'bt-trans'; out.textContent = '…';
      body.insertAdjacentElement('afterend', out);
      translateText(lineCopyText(el), (res) => { out.textContent = res || '—'; });
    });
    body.appendChild(btn);
  }

  function ensureExtraButtons() {
    if (CONFIG.dashboard && !document.getElementById('bt-dash-btn')) {
      makeFooterButton('bt-dash-btn', t('dashBtnTitle'),
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 13h3v7H4v-7Zm6.5-9h3v16h-3V4ZM17 9h3v11h-3V9Z"/></svg>',
        (e) => { e.stopPropagation(); const btn = document.getElementById('bt-dash-btn'); dashboardOpen = !dashboardOpen; const p = ensureDashPanel(); if (dashboardOpen) { positionPanel(p, btn); renderDashboard(msgsPerMin(Date.now()), Date.now()); } p.classList.toggle('bt-open', dashboardOpen); inboxOpen = false; if (inboxPanel) inboxPanel.classList.remove('bt-open'); },
        'bt-settings-btn');
    }
    if (CONFIG.mentionInbox && !document.getElementById('bt-inbox-btn')) {
      makeFooterButton('bt-inbox-btn', t('inboxBtnTitle'),
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a6 6 0 0 0-6 6c0 3.5-1 5-2 6v1h16v-1c-1-1-2-2.5-2-6a6 6 0 0 0-6-6Zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Z"/></svg>',
        (e) => { e.stopPropagation(); const btn = document.getElementById('bt-inbox-btn'); inboxOpen = !inboxOpen; const p = ensureInboxPanel(); if (inboxOpen) { mentionUnread = 0; updateInboxBadge(); renderInbox(); positionPanel(p, btn); } p.classList.toggle('bt-open', inboxOpen); if (inboxOpen) p.scrollTop = p.scrollHeight; dashboardOpen = false; if (dashPanel) dashPanel.classList.remove('bt-open'); },
        'bt-settings-btn');
      updateInboxBadge();
    }
  }

  const pending = [];

  function enqueue(task) { task.tries = 0; pending.push(task); resolveSoon(); }

  function lineLogin(el) {
    const u = el.querySelector('[data-a-user]');
    if (u) return (u.getAttribute('data-a-user') || '').toLowerCase();
    const dn = el.querySelector('[data-a-target="chat-message-username"], .chat-author__display-name');
    return dn ? dn.textContent.trim().toLowerCase() : '';
  }

  function lineText(el) {
    const parts = el.querySelectorAll('[data-a-target="chat-message-text"], .text-fragment');
    if (!parts.length) return '';
    return Array.from(parts).map(p => p.textContent).join('').replace(/\s+/g, ' ').trim();
  }

  function lineCopyText(el) {
    const body = el.querySelector('[data-a-target="chat-line-message-body"]');
    if (!body) return lineText(el);
    const clone = body.cloneNode(true);
    clone.querySelectorAll('.bt-copy, .bt-trash').forEach(n => n.remove());
    clone.querySelectorAll('img').forEach(img => img.replaceWith(document.createTextNode(img.alt || '')));
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function mark(el) {
    if (el.hasAttribute('data-bt')) return;
    el.classList.add('bt-deleted'); el.setAttribute('data-bt', '1');
    const textEl = el.querySelector('[data-a-target="chat-message-text"]');
    const body = el.querySelector('[data-a-target="chat-line-message-body"]') || (textEl && textEl.parentElement) || el;
    const trash = document.createElement('span'); trash.className = 'bt-trash'; body.appendChild(trash);
  }

  function resolve() {
    if (!pending.length) return;
    const lines = Array.from(document.querySelectorAll('.chat-line__message'));
    for (let i = pending.length - 1; i >= 0; i--) {
      const task = pending[i]; let done = false;
      if (task.kind === 'all') { lines.forEach(mark); done = true; }
      else if (task.kind === 'user') {
        let any = false;
        for (const el of lines) if (!el.hasAttribute('data-bt') && lineLogin(el) === task.login) { mark(el); any = true; }
        if (any) done = true;
      } else {
        const want = (task.text || '').replace(/\s+/g, ' ').trim(); let best = null;
        for (const el of lines) {
          if (el.hasAttribute('data-bt')) continue;
          if (lineLogin(el) !== task.login) continue;
          if (!want || lineText(el) === want) best = el;
        }
        if (best) { mark(best); done = true; }
      }
      if (done) pending.splice(i, 1); else if (++task.tries > 40) pending.splice(i, 1);
    }
  }

  let sched = null;

  function resolveSoon() { if (sched) return; sched = setTimeout(() => { sched = null; resolve(); if (pending.length) resolveSoon(); }, 150); }

  const MOD_BADGE = '3267646d-33f0-4b17-b3df-f923a41db1d0';
  const VIP_BADGE = 'b817aba4-fad8-49e2-b88a-7cc744dfa6ec';

  function lineMentionsMe(el) {
    const me = getMyLogin();
    if (!me || lineLogin(el) === me) return false;
    return isMention(el.textContent.toLowerCase(), me);
  }

  function hasBadge(el, uuid, label) {
    return !!(
      el.querySelector('.chat-badge[src*="' + uuid + '"]') ||
      el.querySelector('.chat-badge[alt="' + label + '" i]') ||
      el.querySelector('.chat-badge[aria-label*="' + label + '" i]')
    );
  }

  function lineHasMod(el) { return hasBadge(el, MOD_BADGE, 'Moderator'); }

  function lineHasVip(el) { return hasBadge(el, VIP_BADGE, 'VIP'); }

  let botCache = null;

  function botSet() {
    if (botCache) return botCache;
    botCache = new Set((CONFIG.botNames || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean));
    return botCache;
  }

  function shouldHide(el) {
    if (CONFIG.hideCommands) {
      const body = el.querySelector('[data-a-target="chat-line-message-body"]') || el;
      if ((body.textContent || '').trim().startsWith('!')) return true;
    }
    if (CONFIG.hideBots) { const login = lineLogin(el); if (login && botSet().has(login)) return true; }
    return false;
  }

  const LOGIN_RE = /^[a-z0-9_]{1,30}$/;
  const AVATAR_BATCH = 50;
  const avatarCache = new Map();
  const avatarInflight = new Map();
  let avatarQueue = [];
  let avatarFlush = null;

  function fetchAvatar(login) {
    if (avatarCache.has(login)) return Promise.resolve(avatarCache.get(login));
    const existing = avatarInflight.get(login);
    if (existing) return existing.promise;
    let resolve;
    const promise = new Promise((r) => { resolve = r; });
    avatarInflight.set(login, { promise, resolve });
    avatarQueue.push(login);
    if (!avatarFlush) avatarFlush = setTimeout(flushAvatars, 80);
    return promise;
  }

  function settleAvatar(login, url) {
    if (avatarCache.size >= 500) avatarCache.delete(avatarCache.keys().next().value);
    avatarCache.set(login, url);
    const inf = avatarInflight.get(login);
    avatarInflight.delete(login);
    if (inf) inf.resolve(url);
  }

  function flushAvatars() {
    avatarFlush = null;
    const batch = avatarQueue.splice(0, AVATAR_BATCH);
    if (!batch.length) return;
    const query = 'query{' + batch.map((login, i) => 'u' + i + ':user(login:"' + login + '"){profileImageURL(width:70)}').join(' ') + '}';
    fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: { 'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko', 'Content-Type': 'text/plain' },
      body: JSON.stringify({ query }),
    }).then((r) => r.json()).then((d) => {
      const data = (d && d.data) || {};
      batch.forEach((login, i) => { const u = data['u' + i]; settleAvatar(login, (u && u.profileImageURL) || null); });
    }).catch(() => { batch.forEach((login) => settleAvatar(login, null)); });
    if (avatarQueue.length && !avatarFlush) avatarFlush = setTimeout(flushAvatars, 80);
  }

  function addAvatar(el) {
    if (!CONFIG.showAvatars) { const ex = el.querySelector('.bt-avatar'); if (ex) ex.remove(); return; }
    if (el.querySelector('.bt-avatar')) return;
    const login = lineLogin(el);
    if (!LOGIN_RE.test(login)) return;
    const img = document.createElement('img');
    img.className = 'bt-avatar'; img.alt = ''; img.loading = 'lazy';
    const name = el.querySelector('.chat-line__username-container')
      || el.querySelector('[data-a-target="chat-message-username"]')
      || el.querySelector('.chat-author__display-name');
    try {
      if (name && name.parentNode) name.parentNode.insertBefore(img, name);
      else el.insertBefore(img, el.firstChild);
    } catch (e) { return; }
    fetchAvatar(login).then((url) => { if (url) img.src = url; else img.remove(); });
  }

  function srgbToLin(x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }

  function relLum(r, g, b) { return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b); }

  function fixNameColor(el) {
    const nameEl = el.querySelector('.chat-author__display-name, [data-a-target="chat-message-username"]');
    if (!nameEl) return;
    if (!CONFIG.fixNameColors) {
      if (nameEl.dataset.btColor) { nameEl.style.removeProperty('color'); delete nameEl.dataset.btColor; }
      return;
    }
    if (nameEl.dataset.btColor) return;
    const c = nameEl.style.color || getComputedStyle(nameEl).color;
    const m = c.match(/\d+(?:\.\d+)?/g);
    if (!m || m.length < 3) { nameEl.dataset.btColor = 'skip'; return; }
    let r = +m[0], g = +m[1], b = +m[2];
    const MIN = 0.16;
    let L = relLum(r, g, b);
    if (L >= MIN) { nameEl.dataset.btColor = 'ok'; return; }
    let nr = r, ng = g, nb = b, f = 0;
    while (L < MIN && f < 1) {
      f += 0.08;
      nr = Math.round(r + (255 - r) * f); ng = Math.round(g + (255 - g) * f); nb = Math.round(b + (255 - b) * f);
      L = relLum(nr, ng, nb);
    }
    nameEl.style.setProperty('color', 'rgb(' + nr + ',' + ng + ',' + nb + ')', 'important');
    nameEl.dataset.btColor = 'fixed';
  }

  function addCopyButton(el) {
    if (!CONFIG.copyButton) { const ex = el.querySelector('.bt-copy'); if (ex) ex.remove(); return; }
    if (el.querySelector('.bt-copy')) return;
    const body = el.querySelector('[data-a-target="chat-line-message-body"]') || el;
    const btn = document.createElement('button');
    btn.className = 'bt-copy'; btn.type = 'button'; btn.title = 'Copy'; btn.setAttribute('aria-label', 'Copy message');
    btn.addEventListener('click', (e) => { e.stopPropagation(); try { navigator.clipboard.writeText(lineCopyText(el)); } catch (_) {} });
    body.appendChild(btn);
  }

  function processLine(el) {
    try {
      el.classList.toggle('bt-mention', CONFIG.mentionHighlight && lineMentionsMe(el));
      el.classList.toggle('bt-mod', CONFIG.highlightMods && lineHasMod(el));
      el.classList.toggle('bt-vip', CONFIG.highlightVips && lineHasVip(el));
      el.classList.toggle('bt-hidden', shouldHide(el));
      addAvatar(el);
      fixNameColor(el);
      addCopyButton(el);
      addTranslateButton(el);
    } catch (e) {}
  }

  function syncAll() { botCache = null; document.querySelectorAll('.chat-line__message').forEach(processLine); }

  let chatObserver = null, observedChat = null, sweepTimer = null;

  function ensureChatObserver() {
    const container = document.querySelector('.chat-scrollable-area__message-container');
    if (!container || container === observedChat) return;
    if (chatObserver) chatObserver.disconnect();
    chatObserver = new MutationObserver((muts) => {
      for (const m of muts) for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches && node.matches('.chat-line__message')) processLine(node);
        if (node.querySelectorAll) node.querySelectorAll('.chat-line__message').forEach(processLine);
      }
    });
    chatObserver.observe(container, { childList: true, subtree: true });
    observedChat = container;
    if (sweepTimer) clearInterval(sweepTimer);
    syncAll();
    let sweeps = 0;
    sweepTimer = setInterval(() => { syncAll(); if (++sweeps >= 15) { clearInterval(sweepTimer); sweepTimer = null; } }, 700);
  }

  function injectStyle() {
    if (document.getElementById('bt-style')) return;
    const style = document.createElement('style');
    style.id = 'bt-style';
    style.textContent = `
      .chat-line__username-container:hover { background-color: transparent !important; }

      .channel-root__right-column, .channel-root__right-column--expanded,
      .channel-root__right-column--collapsed, .right-column,
      .toggle-visibility__right-column, .toggle-visibility__right-column--expanded { transition: none !important; }

      .chat-line__message.bt-deleted [data-a-target="chat-message-text"],
      .chat-line__message.bt-deleted .text-fragment { text-decoration: line-through; }
      .chat-line__message.bt-deleted .bt-trash {
        display: inline-block; width: 13px; height: 13px; margin-left: 6px; vertical-align: -2px; text-decoration: none;
        background: no-repeat center / contain
          url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff4444' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><polyline points='3 6 5 6 21 6'/><path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/><line x1='10' y1='11' x2='10' y2='17'/><line x1='14' y1='11' x2='14' y2='17'/></svg>");
      }

      .chat-line__message.bt-mod { background-color: color-mix(in srgb, var(--bt-mod,#00ad03) 14%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-mod,#00ad03); }
      .chat-line__message.bt-vip { background-color: color-mix(in srgb, var(--bt-vip,#e005b9) 14%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-vip,#e005b9); }
      .chat-line__message.bt-mention { background-color: color-mix(in srgb, var(--bt-mention,#e31337) 16%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-mention,#e31337); }

      .chat-line__message .bt-copy {
        display: none; width: 13px; height: 13px; margin-left: 6px; vertical-align: -2px; padding: 0; border: none; cursor: pointer;
        background: no-repeat center / contain
          url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23adadb8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='9' y='9' width='13' height='13' rx='2' ry='2'/><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/></svg>");
      }
      .chat-line__message:hover .bt-copy { display: inline-block; }

      .chat-line__message.bt-hidden { display: none !important; }

      html.bt-hide-badges .chat-line__message img.chat-badge { display: none !important; }
      html.bt-hide-leaderboard .bt-lb-hidden { display: none !important; }
      html.bt-separators .chat-line__message { border-bottom: 1px solid rgba(255,255,255,.08) !important; }
      .bt-avatar { width: 18px; height: 18px; border-radius: 50%; object-fit: cover; vertical-align: middle; margin-right: 5px; display: inline-block; background: #2f2f35; }

      #bt-settings-btn { display: inline-flex; align-items: center; justify-content: center; color: var(--bt-accent,#e31337); cursor: pointer; }
      #bt-settings-btn:hover { color: #ff6b85; }
      #bt-settings-btn svg { width: 20px; height: 20px; }
      #bt-settings-btn.bt-footer-btn { background: none; border: none; padding: 4px 6px; line-height: 0; }
      .bt-float-btn { position: absolute; top: 8px; right: 8px; z-index: 1000; background: rgba(14,14,16,.7); border: none; border-radius: 4px; padding: 5px; line-height: 0; }
      #bt-dash-btn, #bt-inbox-btn { display: inline-flex; align-items: center; justify-content: center; color: var(--bt-accent,#e31337); cursor: pointer; }
      #bt-dash-btn:hover, #bt-inbox-btn:hover { color: #ff6b85; }
      #bt-dash-btn svg, #bt-inbox-btn svg { width: 20px; height: 20px; }
      #bt-dash-btn.bt-footer-btn, #bt-inbox-btn.bt-footer-btn { background: none; border: none; padding: 4px 6px; line-height: 0; }

      #bt-panel {
        position: fixed; z-index: 99999; width: 320px; max-height: 74vh; overflow-y: auto; overflow-x: hidden; box-sizing: border-box;
        background: #18181b; color: #efeff1; border: 1px solid #2f2f35; border-radius: 0;
        padding: 0 16px 14px; box-shadow: 0 8px 28px rgba(0,0,0,.55);
        font: 13px/1.45 Inter, Roobert, "Helvetica Neue", Arial, sans-serif; display: none;
      }
      #bt-panel.bt-open { display: block; }
      #bt-panel * { box-sizing: border-box; max-width: 100%; }
      #bt-panel .bt-head { display: flex; align-items: center; gap: 8px; height: 44px; box-sizing: border-box; max-width: none; margin: 0 -16px 8px; padding: 0 16px; border-bottom: 1px solid #34343b; position: sticky; top: 0; background: #18181b; z-index: 2; }
      #bt-panel .bt-title { font-size: 17px; font-weight: 800; letter-spacing: .2px; color: var(--bt-accent,#e31337); }
      #bt-panel .bt-by { margin-left: auto; font-size: 11px; color: #7d7d85; }
      #bt-panel .bt-sub { display: flex; align-items: center; gap: 6px; margin: 14px 0 4px; padding-top: 13px; border-top: 1px solid #2a2a30; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #adadb8; }
      #bt-panel .bt-sub .bt-ico { width: 13px; height: 13px; flex: 0 0 auto; }
      #bt-panel .bt-head + .bt-sub { border-top: none; padding-top: 2px; margin-top: 4px; }
      #bt-panel label.bt-row { display: flex; align-items: center; gap: 9px; padding: 5px 0; cursor: pointer; }
      #bt-panel label.bt-row input[type=checkbox] { accent-color: var(--bt-accent,#e31337); width: 15px; height: 15px; cursor: pointer; }
      #bt-panel .bt-rowflex { display: flex; align-items: center; gap: 9px; padding: 4px 0; }
      #bt-panel .bt-rowflex label { display: flex; align-items: center; gap: 9px; flex: 1; cursor: pointer; }
      #bt-panel .bt-rowflex label input[type=checkbox] { accent-color: var(--bt-accent,#e31337); width: 15px; height: 15px; }
      #bt-panel input[type=range] { flex: 1 1 auto; min-width: 0; accent-color: var(--bt-accent,#e31337); cursor: pointer; }
      #bt-panel input[type=color] { width: 26px; height: 18px; border: 1px solid #34343b; background: none; padding: 0; cursor: pointer; border-radius: 4px; }
      #bt-panel .bt-val { flex: 0 0 52px; width: 52px; text-align: right; color: #adadb8; font-variant-numeric: tabular-nums; }
      #bt-panel select { background: #0e0e10; color: #efeff1; border: 1px solid #34343b; border-radius: 4px; padding: 2px 6px; margin-left: auto; }
      #bt-panel input[type=text] { flex: 1; min-width: 0; background: #0e0e10; color: #efeff1; border: 1px solid #34343b; border-radius: 4px; padding: 3px 6px; }
      #bt-panel button.bt-btn { background: #26262c; color: #efeff1; border: 1px solid #3a3a42; border-radius: 4px; padding: 4px 9px; cursor: pointer; font-size: 12px; }
      #bt-panel button.bt-btn:hover { background: #34343b; }
      #bt-panel .bt-foot { display: flex; gap: 6px; margin-top: 12px; }
      #bt-panel .bt-note { margin-top: 10px; font-size: 11px; color: #7d7d85; }

      #bt-modal { position: fixed; inset: 0; z-index: 100000; display: none; align-items: center; justify-content: center; background: rgba(0,0,0,.6); }
      #bt-modal.bt-open { display: flex; }
      #bt-modal .bt-modal-box { width: 420px; max-width: calc(100vw - 32px); background: #18181b; color: #efeff1; border: 1px solid #2f2f35; border-radius: 6px; box-shadow: 0 8px 28px rgba(0,0,0,.55); padding: 16px; font: 13px/1.45 Inter, Roobert, "Helvetica Neue", Arial, sans-serif; box-sizing: border-box; }
      #bt-modal .bt-modal-head { display: flex; align-items: center; margin-bottom: 10px; }
      #bt-modal .bt-modal-title { font-size: 15px; font-weight: 700; color: var(--bt-accent,#e31337); }
      #bt-modal .bt-modal-x { margin-left: auto; background: none; border: none; color: #adadb8; font-size: 18px; line-height: 1; cursor: pointer; padding: 0 2px; }
      #bt-modal .bt-modal-x:hover { color: #efeff1; }
      #bt-modal textarea { width: 100%; height: 160px; resize: vertical; box-sizing: border-box; background: #0e0e10; color: #efeff1; border: 1px solid #34343b; border-radius: 4px; padding: 8px; font: 12px/1.4 ui-monospace, Menlo, Consolas, monospace; }
      #bt-modal .bt-modal-foot { display: flex; gap: 6px; margin-top: 12px; }
      #bt-modal .bt-modal-foot .bt-modal-close { margin-left: auto; }
      #bt-modal button.bt-btn { background: #26262c; color: #efeff1; border: 1px solid #3a3a42; border-radius: 4px; padding: 4px 12px; cursor: pointer; font-size: 12px; }
      #bt-modal button.bt-btn:hover { background: #34343b; }
      #bt-modal .bt-modal-note { margin-top: 8px; font-size: 11px; min-height: 14px; color: #57bb6c; }

      .chat-line__message .bt-translate {
        display: none; width: 13px; height: 13px; margin-left: 6px; vertical-align: -2px; padding: 0; border: none; cursor: pointer;
        background: no-repeat center / contain
          url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23adadb8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20'/></svg>");
      }
      .chat-line__message:hover .bt-translate { display: inline-block; }
      .chat-line__message .bt-trans { margin: 2px 0 2px 4px; padding-left: 7px; border-left: 2px solid var(--bt-accent,#e31337); color: #adadb8; font-size: .95em; font-style: italic; }

      .bt-pop {
        position: fixed; z-index: 99999; width: 300px; max-height: 70vh; overflow-y: auto; box-sizing: border-box; display: none;
        background: #18181b; color: #efeff1; border: 1px solid #2f2f35; border-radius: 6px; padding: 0 14px 14px;
        box-shadow: 0 8px 28px rgba(0,0,0,.55); font: 13px/1.45 Inter, Roobert, "Helvetica Neue", Arial, sans-serif;
      }
      .bt-pop.bt-open { display: block; }
      .bt-pop * { box-sizing: border-box; max-width: 100%; }
      .bt-pop .bt-pop-head { position: sticky; top: 0; background: #18181b; padding: 12px 0 8px; margin-bottom: 6px; border-bottom: 1px solid #34343b; }
      .bt-pop .bt-pop-title { font-size: 15px; font-weight: 800; color: var(--bt-accent,#e31337); }
      .bt-pop .bt-pop-sub { margin: 12px 0 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #adadb8; }
      .bt-pop .bt-pop-empty { padding: 16px 0; color: #7d7d85; text-align: center; }
      .bt-dash-mpm { display: flex; align-items: baseline; gap: 6px; margin-top: 6px; }
      .bt-dash-num { font-size: 30px; font-weight: 800; color: #efeff1; font-variant-numeric: tabular-nums; }
      .bt-dash-unit { font-size: 12px; color: #adadb8; }
      .bt-spark { width: 100%; height: 34px; margin-top: 4px; }
      .bt-spark polyline { fill: none; stroke: var(--bt-accent,#e31337); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
      .bt-dash-row { display: flex; align-items: center; gap: 8px; padding: 2px 0; }
      .bt-dash-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .bt-dash-c { color: #adadb8; font-variant-numeric: tabular-nums; }
      .bt-dash-emotes { display: flex; flex-wrap: wrap; gap: 8px; }
      .bt-dash-emote { display: inline-flex; align-items: center; gap: 3px; }
      .bt-dash-emote img { width: 24px; height: 24px; object-fit: contain; }
      .bt-dash-emote b { color: #adadb8; font-size: 11px; }
      .bt-inbox-row { padding: 4px 0; border-bottom: 1px solid #26262c; line-height: 1.4; word-break: break-word; }
      .bt-inbox-time { color: #7d7d85; font-size: 11px; font-variant-numeric: tabular-nums; }
      .bt-inbox-user { font-weight: 700; }
      .bt-inbox-colon { color: #efeff1; }
      .bt-inbox-text { color: #dcdce0; }
      #bt-inbox-btn { position: relative; }
      #bt-inbox-btn .bt-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; min-width: 15px; height: 15px; padding: 0 3px; border-radius: 8px; background: var(--bt-accent,#e31337); color: #fff; font-size: 9px; line-height: 1; font-weight: 700; pointer-events: none; box-shadow: 0 0 0 2px #18181b; }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function applyVars() {
    const r = document.documentElement;
    r.style.setProperty('--bt-mention', CONFIG.mentionColor);
    r.style.setProperty('--bt-mod', CONFIG.modColor);
    r.style.setProperty('--bt-vip', CONFIG.vipColor);
    r.style.setProperty('--bt-accent', CONFIG.accentColor);
    r.classList.toggle('bt-hide-badges', !!CONFIG.hideBadges);
    r.classList.toggle('bt-hide-leaderboard', !!CONFIG.hideLeaderboard);
    r.classList.toggle('bt-separators', !!CONFIG.msgSeparators);
    applyLeaderboard();
  }

  function applyLeaderboard() {
    document.querySelectorAll('.bt-lb-hidden').forEach((el) => el.classList.remove('bt-lb-hidden'));
    if (!CONFIG.hideLeaderboard) return;
    const LIST = '.chat-scrollable-area__message-container, [data-test-selector="chat-scrollable-area__message-container"]';
    document.querySelectorAll('.chat-room__content').forEach((content) => {
      const children = Array.from(content.children);
      const listIdx = children.findIndex((c) => c.matches(LIST) || c.querySelector(LIST));
      if (listIdx === -1) return; // chat not ready yet — don't risk hiding anything
      for (let i = 0; i < listIdx; i++) {
        const child = children[i];
        if (child.matches('[data-a-target="chat-alert-queue"]') || child.querySelector('[data-a-target="chat-alert-queue"]')) continue;
        if (child.querySelector('.tw-transition-group, [role="progressbar"]')) child.classList.add('bt-lb-hidden');
      }
    });
  }

  let hlObserver = null, observedRoom = null;

  function ensureHighlightObserver() {
    const room = document.querySelector('.chat-room__content');
    if (!room || room === observedRoom) return;
    if (hlObserver) hlObserver.disconnect();
    hlObserver = new MutationObserver(() => applyLeaderboard());
    hlObserver.observe(room, { childList: true });
    observedRoom = room;
    applyLeaderboard();
  }

  function applyAutoQuality() {
    if (!CONFIG.autoQuality) return;
    try { const want = '{"default":"chunked"}'; if (localStorage.getItem('video-quality') !== want) localStorage.setItem('video-quality', want); } catch (e) {}
  }

  function claimPoints() {
    const icon = document.querySelector('.claimable-bonus__icon');
    if (icon) { const b = icon.closest('button'); if (b) b.click(); }
  }

  function claimDrops() {
    let btn = document.querySelector('button[data-test-selector="DropClaimButton"], button[data-a-target="DropClaimButton"]');
    if (!btn) {
      const cands = document.querySelectorAll('[data-test-selector*="Drop"] button, [class*="drops"] button, [class*="Drops"] button');
      for (const c of cands) if (/^\s*claim/i.test(c.textContent || '')) { btn = c; break; }
    }
    if (btn) btn.click();
  }

  function runClaims() {
    if (CONFIG.autoClaimPoints) claimPoints();
    if (CONFIG.autoClaimDrops) claimDrops();
  }

  function scheduleClaim() { setTimeout(() => { runClaims(); scheduleClaim(); }, 8000 + Math.random() * 5000); }

  scheduleClaim();

  function setImp(el, prop, val) {
    if (el.style.getPropertyValue(prop) !== val || el.style.getPropertyPriority(prop) !== 'important') el.style.setProperty(prop, val, 'important');
  }

  function applyColumn(col) {
    const w = chatWidth(); if (!w) return;
    setImp(col, 'width', w); setImp(col, 'min-width', w); setImp(col, 'max-width', w); setImp(col, 'flex-basis', w);
    setImp(col, 'transition', 'none');
    if (col.classList.contains('channel-root__right-column--expanded')) setImp(col, 'transform', 'translateX(-' + w + ')');
    else if (col.style.getPropertyPriority('transform') === 'important') col.style.removeProperty('transform');
  }

  function widenChat() {
    const col = document.querySelector('.channel-root__right-column');
    if (col) { applyColumn(col); return; }
    const w = chatWidth();
    const anchor = document.querySelector('.chat-scrollable-area__message-container, .chat-input, .stream-chat');
    if (!w || !anchor) return;
    let el = anchor;
    for (let i = 0; i < 10 && el; i++, el = el.parentElement) {
      const bw = el.getBoundingClientRect().width;
      if (bw > 250 && bw < 1300) { el.style.setProperty('width', w, 'important'); el.style.setProperty('max-width', w, 'important'); }
    }
  }

  function widenVideo() {
    const delta = Math.max(0, CONFIG.chatWidthPx - DEFAULT_CHAT_PX);
    const main = document.querySelector('main.twilight-main, .twilight-main');
    if (main) { main.style.setProperty('transition', 'none', 'important'); main.style.setProperty('margin-right', delta + 'px', 'important'); }
  }

  function applyToggle() {
    const col = document.querySelector('.channel-root__right-column');
    const expanded = col && col.classList.contains('channel-root__right-column--expanded');
    const active = CONFIG.chatWidthEnabled && expanded;
    document.querySelectorAll('.toggle-visibility__right-column').forEach(t => {
      const isExpandedToggle = t.classList.contains('toggle-visibility__right-column--expanded');
      const parent = t.offsetParent;
      if (active && isExpandedToggle && parent) {
        const left = Math.round(col.getBoundingClientRect().left - parent.getBoundingClientRect().left);
        setImp(t, 'transform', 'none'); setImp(t, 'right', 'auto'); setImp(t, 'left', left + 'px');
      } else { ['transform', 'right', 'left'].forEach(p => t.style.removeProperty(p)); }
    });
  }

  function resetLayout() {
    const col = document.querySelector('.channel-root__right-column');
    if (col) {
      ['width', 'min-width', 'max-width', 'flex-basis', 'transition'].forEach(p => col.style.removeProperty(p));
      if (col.classList.contains('channel-root__right-column--expanded')) setImp(col, 'transform', 'translateX(-' + DEFAULT_CHAT_PX + 'px)');
      else col.style.removeProperty('transform');
    }
    const main = document.querySelector('main.twilight-main, .twilight-main');
    if (main) { main.style.removeProperty('margin-right'); main.style.removeProperty('transition'); }
  }

  let layoutObserver = null, observedCol = null;

  function ensureObserver(col) {
    if (col === observedCol) return;
    if (layoutObserver) layoutObserver.disconnect();
    layoutObserver = new MutationObserver(applyLayout);
    layoutObserver.observe(col, { attributes: true, attributeFilter: ['style', 'class'] });
    observedCol = col;
  }

  function applyLayout() {
    const col = document.querySelector('.channel-root__right-column');
    if (col) ensureObserver(col);
    const expanded = col && col.classList.contains('channel-root__right-column--expanded');
    if (CONFIG.chatWidthEnabled && expanded) { widenChat(); widenVideo(); } else resetLayout();
    applyToggle();
  }

  const PANEL_W = 320;
  let panel = null;

  function formatVal(k, v) {
    if (k === 'chatWidthPx') return v + 'px';
    if (k === 'pingVolume') return Math.round(v * 100) + '%';
    return '' + v;
  }

  function refresh() { applyLayout(); applyVars(); applyAutoQuality(); syncAll(); }

  const SVG = (inner) => '<svg class="bt-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  const SEC_ICONS = {
    secLanguage: SVG('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>'),
    secDeleted: SVG('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    secChat: SVG('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    secPlayer: SVG('<polygon points="6 4 20 12 6 20 6 4"/>'),
    secPoints: SVG('<polygon points="12 3 14.7 8.5 20.8 9.3 16.4 13.6 17.5 19.7 12 16.8 6.5 19.7 7.6 13.6 3.2 9.3 9.3 8.5 12 3"/>'),
    secNotifications: SVG('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
    secHighlights: SVG('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    secTheme: SVG('<path d="M12 3l5.5 5.5a7.8 7.8 0 1 1-11 0z"/>'),
    secFilter: SVG('<polygon points="22 4 2 4 10 12.5 10 19 14 21 14 12.5 22 4"/>'),
    secExtras: SVG('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
  };

  function secHead(key) { return '<div class="bt-sub">' + (SEC_ICONS[key] || '') + t(key) + '</div>'; }

  function ensurePanel() {
    if (panel) return;
    panel = document.createElement('div');
    panel.id = 'bt-panel';
    panel.innerHTML = `
      <div class="bt-head">
        <span class="bt-title">BetterTwitch</span><span class="bt-by">by YaneonY</span>
      </div>

      ${secHead('secLanguage')}
      <div class="bt-rowflex"><select data-k="language" style="flex:1;margin-left:0"><option value="auto">${t('langAuto')}</option><option value="en">English</option><option value="de">Deutsch</option><option value="ru">Русский</option></select></div>

      ${secHead('secDeleted')}
      <label class="bt-row"><input type="checkbox" data-k="markSingleDeletes"> ${t('markSingleDeletes')}</label>
      <label class="bt-row"><input type="checkbox" data-k="markTimeouts"> ${t('markTimeouts')}</label>
      <label class="bt-row"><input type="checkbox" data-k="markFullClear"> ${t('markFullClear')}</label>

      ${secHead('secChat')}
      <label class="bt-row"><input type="checkbox" data-k="chatWidthEnabled"> ${t('chatWidthEnabled')}</label>
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('width')}</span><input type="range" min="340" max="${MAX_CHAT_PX}" step="10" data-k="chatWidthPx"><span class="bt-val" data-val-for="chatWidthPx"></span></div>
      <label class="bt-row"><input type="checkbox" data-k="hideBadges"> ${t('hideBadges')}</label>
      <label class="bt-row"><input type="checkbox" data-k="showAvatars"> ${t('showAvatars')}</label>
      <label class="bt-row"><input type="checkbox" data-k="fixNameColors"> ${t('fixNameColors')}</label>
      <label class="bt-row"><input type="checkbox" data-k="copyButton"> ${t('copyButton')}</label>
      <label class="bt-row"><input type="checkbox" data-k="msgSeparators"> ${t('msgSeparators')}</label>
      <label class="bt-row"><input type="checkbox" data-k="hideLeaderboard"> ${t('hideLeaderboard')}</label>

      ${secHead('secPlayer')}
      <label class="bt-row"><input type="checkbox" data-k="autoQuality"> ${t('autoQuality')}</label>

      ${secHead('secPoints')}
      <label class="bt-row"><input type="checkbox" data-k="autoClaimPoints"> ${t('autoClaimPoints')}</label>
      <label class="bt-row"><input type="checkbox" data-k="autoClaimDrops"> ${t('autoClaimDrops')}</label>

      ${secHead('secNotifications')}
      <label class="bt-row"><input type="checkbox" data-k="mentionSound"> ${t('mentionSound')}</label>
      <label class="bt-row"><input type="checkbox" data-k="mentionReplyPing"> ${t('mentionReplyPing')}</label>
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('sound')}</span><select data-k="pingSound"><option value="chime">${t('sndChime')}</option><option value="beep">${t('sndBeep')}</option><option value="ding">${t('sndDing')}</option><option value="soft">${t('sndSoft')}</option><option value="low">${t('sndLow')}</option><option value="rise">${t('sndRise')}</option><option value="fall">${t('sndFall')}</option><option value="double">${t('sndDouble')}</option><option value="pop">${t('sndPop')}</option><option value="bell">${t('sndBell')}</option><option value="arcade">${t('sndArcade')}</option><option value="glass">${t('sndGlass')}</option></select><button class="bt-btn" id="bt-test-ping">${t('test')}</button></div>
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('volume')}</span><input type="range" min="0" max="1" step="0.05" data-k="pingVolume"><span class="bt-val" data-val-for="pingVolume"></span></div>

      ${secHead('secHighlights')}
      <div class="bt-rowflex"><label><input type="checkbox" data-k="mentionHighlight"> ${t('mentionHighlight')}</label><input type="color" data-k="mentionColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightMods"> ${t('highlightMods')}</label><input type="color" data-k="modColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightVips"> ${t('highlightVips')}</label><input type="color" data-k="vipColor"></div>

      ${secHead('secTheme')}
      <div class="bt-rowflex"><label style="flex:1">${t('accentColor')}</label><input type="color" data-k="accentColor"></div>

      ${secHead('secFilter')}
      <label class="bt-row"><input type="checkbox" data-k="hideCommands"> ${t('hideCommands')}</label>
      <label class="bt-row"><input type="checkbox" data-k="hideBots"> ${t('hideBots')}</label>
      <div class="bt-rowflex"><input type="text" data-k="botNames" placeholder="bot1,bot2,..."></div>

      ${secHead('secExtras')}
      <label class="bt-row"><input type="checkbox" data-k="dashboard"> ${t('dashboard')}</label>
      <label class="bt-row"><input type="checkbox" data-k="inlineTranslate"> ${t('inlineTranslate')}</label>
      <label class="bt-row"><input type="checkbox" data-k="mentionInbox"> ${t('mentionInbox')}</label>

      <div class="bt-foot">
        <button class="bt-btn" id="bt-export">${t('export')}</button>
        <button class="bt-btn" id="bt-import">${t('import')}</button>
        <button class="bt-btn" id="bt-reset" style="margin-left:auto">${t('reset')}</button>
      </div>
      <div class="bt-note">${t('savedNote')}</div>
    `;
    document.body.appendChild(panel);

    panel.querySelectorAll('input[data-k], select[data-k]').forEach(inp => {
      const k = inp.dataset.k, type = inp.type;
      if (type === 'checkbox') inp.checked = !!CONFIG[k]; else inp.value = CONFIG[k];
      const lbl = panel.querySelector('[data-val-for="' + k + '"]');
      if (lbl) lbl.textContent = formatVal(k, CONFIG[k]);
      const evt = (type === 'range' || type === 'color' || type === 'text' || inp.tagName === 'SELECT') ? 'input' : 'change';
      inp.addEventListener(evt, () => {
        let v;
        if (type === 'checkbox') v = inp.checked;
        else if (type === 'range') v = parseFloat(inp.value);
        else v = inp.value;
        CONFIG[k] = v;
        if (lbl) lbl.textContent = formatVal(k, v);
        saveConfig();
        if (k === 'language') { location.reload(); return; }
        refresh();
      });
    });

    panel.querySelector('#bt-test-ping').addEventListener('click', () => playPing(true));
    panel.querySelector('#bt-export').addEventListener('click', () => {
      openModal({
        title: t('exportTitle'), value: JSON.stringify(CONFIG, null, 2), readOnly: true, primary: t('ioCopy'),
        onPrimary: (ta, note) => {
          try { navigator.clipboard.writeText(ta.value); } catch (e) {}
          ta.select(); note.textContent = t('alertCopied');
        },
      });
    });
    panel.querySelector('#bt-import').addEventListener('click', () => {
      openModal({
        title: t('importTitle'), value: '', readOnly: false, primary: t('ioApply'),
        onPrimary: (ta, note) => {
          const s = ta.value.trim(); if (!s) return;
          try { JSON.parse(s); } catch (e) { note.style.color = '#ff6b6b'; note.textContent = t('alertInvalidJson'); return; }
          localStorage.setItem(STORAGE_KEY, s); location.reload();
        },
      });
    });
    panel.querySelector('#bt-reset').addEventListener('click', () => {
      if (confirm(t('confirmReset'))) { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} location.reload(); }
    });

    document.addEventListener('click', (e) => {
      if (panel.classList.contains('bt-open') && !panel.contains(e.target) && !(e.target.closest && e.target.closest('#bt-settings-btn')))
        panel.classList.remove('bt-open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('bt-open')) panel.classList.remove('bt-open');
    });
  }

  let modal = null;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'bt-modal';
    modal.innerHTML = `
      <div class="bt-modal-box">
        <div class="bt-modal-head"><span class="bt-modal-title"></span><button class="bt-modal-x" type="button" aria-label="Close">✕</button></div>
        <textarea spellcheck="false"></textarea>
        <div class="bt-modal-note"></div>
        <div class="bt-modal-foot">
          <button class="bt-btn bt-modal-primary" type="button"></button>
          <button class="bt-btn bt-modal-close" type="button"></button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => modal.classList.remove('bt-open');
    modal.querySelector('.bt-modal-x').addEventListener('click', close);
    modal.querySelector('.bt-modal-close').addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('bt-open')) close(); });
    return modal;
  }

  function openModal(opts) {
    const m = ensureModal();
    const ta = m.querySelector('textarea');
    const note = m.querySelector('.bt-modal-note');
    m.querySelector('.bt-modal-title').textContent = opts.title;
    m.querySelector('.bt-modal-close').textContent = t('ioClose');
    const primary = m.querySelector('.bt-modal-primary');
    primary.textContent = opts.primary;
    ta.value = opts.value || '';
    ta.readOnly = !!opts.readOnly;
    note.textContent = ''; note.style.color = '';
    const newPrimary = primary.cloneNode(true);
    primary.replaceWith(newPrimary);
    newPrimary.addEventListener('click', () => opts.onPrimary(ta, note));
    m.classList.add('bt-open');
    ta.focus();
    if (opts.readOnly) ta.select();
  }

  function positionPanel(p, btn) {
    const r = btn.getBoundingClientRect();
    const w = parseFloat(getComputedStyle(p).width) || PANEL_W;
    p.style.right = 'auto';
    let left = r.right - w; if (left < 8) left = 8;
    p.style.left = left + 'px';
    if (r.top > window.innerHeight - r.bottom) {
      p.style.top = 'auto';
      p.style.bottom = (window.innerHeight - r.top + 10) + 'px';
    } else {
      p.style.bottom = 'auto';
      p.style.top = (r.bottom + 10) + 'px';
    }
  }

  function togglePanel(p, btn, onOpen, other) {
    const willOpen = !p.classList.contains('bt-open');
    if (other) other.classList.remove('bt-open');
    if (willOpen) { positionPanel(p, btn); if (onOpen) onOpen(); }
    p.classList.toggle('bt-open', willOpen);
  }

  function footerInsertCtx() {
    const bars = document.querySelectorAll('.chat-input__buttons-container');
    const toolbar = bars[bars.length - 1];
    if (!toolbar) return null;
    let anchor = toolbar.lastElementChild;
    const send = toolbar.querySelector('button[data-a-target="chat-send-button"]');
    if (send) {
      anchor = send;
      while (anchor.parentElement && anchor.parentElement !== toolbar) anchor = anchor.parentElement;
    }
    const cog = toolbar.querySelector('button[data-a-target="chat-settings"]');
    let cell = cog;
    if (cog) for (let i = 0; i < 3 && cell.parentElement && cell.parentElement.children.length === 1; i++) cell = cell.parentElement;
    return { cog, cell, anchor, toolbar };
  }

  function styledButton(id, title, innerHTML, onClick, cls) {
    const btn = document.createElement('button');
    btn.id = id; btn.type = 'button'; btn.className = cls;
    btn.title = title; btn.setAttribute('aria-label', title);
    btn.innerHTML = innerHTML;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function floatFallback(id, title, innerHTML, onClick) {
    const chat = document.querySelector('.stream-chat, section[data-test-selector="chat-room-component-layout"]');
    if (!chat) return false;
    if (getComputedStyle(chat).position === 'static') chat.style.position = 'relative';
    chat.appendChild(styledButton(id, title, innerHTML, onClick, 'bt-float-btn'));
    return document.getElementById(id);
  }

  function makeFooterButton(id, title, innerHTML, onClick, beforeId) {
    if (document.getElementById(id)) return true;
    const ctx = footerInsertCtx();
    if (!ctx || !ctx.toolbar) return floatFallback(id, title, innerHTML, onClick);
    let before = (beforeId && document.getElementById(beforeId)) || ctx.anchor;
    while (before && before.parentElement && before.parentElement !== ctx.toolbar) before = before.parentElement;
    if (!before || before.parentElement !== ctx.toolbar) before = ctx.anchor;
    if (ctx.cell) {
      const wrap = ctx.cell.cloneNode(true);
      wrap.id = id + '-wrap';
      let btn = wrap.querySelector('button') || wrap;
      wrap.querySelectorAll('*').forEach((n) => { if (n !== btn && !btn.contains(n) && !n.contains(btn)) n.remove(); });
      ['data-a-target','data-a-id','aria-label','aria-haspopup','aria-expanded','aria-controls'].forEach((a) => { if (btn.removeAttribute) btn.removeAttribute(a); });
      btn.id = id; btn.type = 'button'; btn.title = title; btn.setAttribute('aria-label', title);
      btn.innerHTML = innerHTML;
      btn.addEventListener('click', onClick);
      ctx.toolbar.insertBefore(wrap, before);
      return btn;
    }
    ctx.toolbar.insertBefore(styledButton(id, title, innerHTML, onClick, 'bt-footer-btn'), before);
    return document.getElementById(id);
  }

  function ensureSettingsButton() {
    makeFooterButton('bt-settings-btn', t('settingsBtnTitle'),
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"/></svg>',
      (e) => { e.stopPropagation(); togglePanel(panel, document.getElementById('bt-settings-btn'), null); });
  }

  let lastSyncedLogin = '';

  function reSyncOnLogin() {
    const me = getMyLogin();
    if (me && me !== lastSyncedLogin) { lastSyncedLogin = me; syncAll(); }
  }

  function ensureUI() { injectStyle(); applyVars(); ensurePanel(); ensureSettingsButton(); ensureExtraButtons(); ensureChatObserver(); ensureHighlightObserver(); ensureLive(); applyAutoQuality(); }

  function tick() { ensureUI(); applyLayout(); reSyncOnLogin(); }

  if (document.body) tick(); else document.addEventListener('DOMContentLoaded', tick);

  let fast = setInterval(() => {
    tick();
    if (document.getElementById('bt-settings-btn') &&
        (document.querySelector('.channel-root__right-column') || document.querySelector('.chat-input, .stream-chat'))) {
      clearInterval(fast); setInterval(tick, 2000);
    }
  }, 200);

  window.addEventListener('resize', () => {
    applyLayout();
    if (panel && panel.classList.contains('bt-open')) { const b = document.getElementById('bt-settings-btn'); if (b) positionPanel(panel, b); }
  });
})();
