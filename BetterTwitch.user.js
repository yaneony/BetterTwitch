// ==UserScript==
// @name         BetterTwitch
// @namespace    https://yaneony.com
// @version      2.0.0
// @description  A Twitch chat enhancement suite with live statistics, viewer hovercards, translation, notifications, filters, and layout controls.
// @description:de Eine Twitch-Chat-Erweiterung mit Live-Statistik, Zuschauer-Hovercards, Übersetzung, Benachrichtigungen, Filtern und Layout-Steuerung.
// @description:ru Расширение чата Twitch со статистикой, карточками зрителей, переводом, уведомлениями, фильтрами и настройкой интерфейса.
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
      secGeneral: 'General', language: 'Language', langAuto: 'Auto-detect',
      secDeleted: 'Deleted messages',
      markSingleDeletes: 'Mark single deletions',
      markTimeouts: 'Mark timeouts / bans',
      markFullClear: 'Mark full chat clears',
      secChatAppearance: 'Chat appearance',
      secChatTools: 'Chat tools',
      secComposer: 'Message composer',
      secConversation: 'Conversation quality',
      chatWidthEnabled: 'Widen chat panel',
      width: 'Width',
      appearanceProfile: 'Appearance profile',
      profileComfortable: 'Comfortable',
      profileCompact: 'Compact',
      profileAccessible: 'Accessible',
      hideBadges: 'Hide badges',
      showAvatars: 'Show user avatars',
      msgSeparators: 'Separator between messages',
      hideLeaderboard: 'Hide top users slider',
      hideCommunityHighlights: 'Hide community highlights',
      secPlayerRewards: 'Player & rewards',
      autoQuality: 'Prefer source quality',
      autoClaimPoints: 'Auto-claim bonus chest',
      autoClaimDrops: 'Auto-claim Drops',
      secNotifications: 'Notifications',
      mentionSound: 'Sound on @mention',
      mentionReplyPing: 'Sound on replies to you',
      sound: 'Sound',
      test: 'Test',
      volume: 'Volume',
      sndMessage: 'Message', sndPop: 'Pop', sndDrop: 'Drop', sndKnock: 'Knock', sndGlass: 'Glass',
      sndPluck: 'Pluck', sndOrbit: 'Orbit', sndPixel: 'Pixel', sndBell: 'Bell', sndSpark: 'Spark',
      sndChime: 'Chime', sndDoubleTap: 'Double Tap', sndWoodblock: 'Woodblock', sndMarble: 'Marble',
      sndQuartz: 'Quartz', sndBlink: 'Blink', sndRipple: 'Ripple', sndChord: 'Chord',
      secHighlights: 'Highlights',
      mentionHighlight: 'Highlight @mentions',
      highlightMods: 'Highlight moderators',
      highlightVips: 'Highlight VIPs',
      fixNameColors: 'Boost name contrast',
      copyButton: 'Copy button on hover',
      accentColor: 'Accent color',
      secFilter: 'Message filters',
      hideCommands: 'Hide ! commands',
      hideBots: 'Hide bot messages',
      export: 'Export', import: 'Import', reset: 'Reset',
      savedNote: 'Saved automatically.',
      settingsBtnTitle: 'BetterTwitch settings',
      alertCopied: 'Copied to clipboard.',
      copyMessage: 'Copy message',
      alertInvalidSettings: 'Invalid settings data.',
      confirmReset: 'Reset all BetterTwitch settings to defaults?',
      exportTitle: 'Export settings', importTitle: 'Import settings',
      ioCopy: 'Copy', ioApply: 'Apply', ioClose: 'Close',
      mentionInbox: 'Mentions panel', mentionContextMessages: 'Context messages',
      highlightFirstChatters: 'Highlight first-time chatters', highlightReturningChatters: 'Highlight returning chatters',
      inlineTranslate: 'Translate on hover',
      preserveDrafts: 'Preserve drafts per channel', sentMessageHistory: 'Sent-message history',
      characterCounter: 'Character counter',
      spamCompression: 'Compress repeated messages',
      quickChatFilters: 'Quick chat filters',
      liveChatSearch: 'Live chat search',
      chatControlBtnTitle: 'Chat filters and search',
      chatControlTitle: 'Chat filters & search',
      saferLinks: 'Safer link display',
      dashboard: 'Live chat dashboard', dashBtnTitle: 'Live chat statistics',
      dashTitle: 'Live chat dashboard', dashPerMin: 'messages/min',
      dashTopChatters: 'Top chatters', dashTopEmotes: 'Top emotes', dashEmpty: 'Waiting for messages…',
      dashEmptyHint: 'Session statistics will appear as chat messages arrive.',
      dashLive: 'LIVE', dashCurrentRate: 'Current rate', dashPeakRate: 'Session peak',
      dashTotalMessages: 'Messages', dashUniqueChatters: 'Chatters',
      dashActivity: 'Chat activity', dashLastMinute: 'Last 60 seconds',
      dashActiveNow: 'active now', dashAverageRate: 'average/min', dashSessionTime: 'session',
      dashMessageCount: '{count} messages', dashEmoteUses: '{count} uses',
      dashHourShort: 'h', dashMinuteShort: 'm', dashSecondShort: 's',
      inboxBtnTitle: 'Mentions',
      inboxTitle: 'Mentions', inboxEmpty: 'No mentions yet.', inboxSearch: 'Search mentions…',
      inboxJump: 'Jump to message', inboxMissing: 'Message is no longer visible.',
      firstChatterLabel: 'FIRST', returningChatterLabel: 'RETURNING',
      transFailed: 'Translation failed', transLoading: 'Translating…',
      retryTranslation: 'Retry', copyTranslation: 'Copy translation', translationCopied: 'Copied',
      showOriginal: 'Show original', showTranslation: 'Show translation',
      detectedLanguage: 'Detected language', translationTarget: 'Translation', unknownLanguage: 'Unknown',
      viewerHovercards: 'Viewer hovercards',
      hoverMessages: 'Messages', hoverFirstSeen: 'First seen', hoverMentions: 'Mentions', hoverTopEmote: 'Top emote',
      characterCounterTitle: 'Message length',
      settingHelpTitle: 'Explain this setting', byAuthor: 'by', botNamesLabel: 'Bot usernames', botNamesPlaceholder: 'bot1, bot2, …',
      saferSending: 'Safer message sending', messageActions: 'Message actions',
      replyMessageAction: 'Reply to message',
      replyUnavailable: 'Reply is not available for this message.',
      sendAlreadyPending: 'That message is already being sent.',
      duplicateBlocked: 'Duplicate message blocked. Send it again within 3 seconds to confirm.',
      largePasteWarning: 'Large paste: {chars} characters across {lines} lines.',
      sendFailedRestored: 'Sending was not confirmed. Your message was restored as a draft.',
      chatReconnecting: 'Chat reconnecting…',
      filterAll: 'All', filterMentions: 'Mentions', filterMods: 'Mods', filterQuestions: 'Questions',
      filterLinks: 'Links', filterEmotes: 'Emotes',
      searchPlaceholder: 'Search username or message',
      searchPrevious: 'Previous result', searchNext: 'Next result',
      searchResultCount: '{current}/{total}', searchNoResults: 'No matches',
      spamCollapsed: 'Repeated ×{count}', spamExpand: 'Show repeated messages', spamCollapse: 'Hide repeated messages',
      unsafeLinkLabel: 'CAUTION',
      unsafeLinkConfirm: 'This link uses the domain “{domain}”, which may be shortened or misleading. Open it anyway?',
    },
    de: {
      secGeneral: 'Allgemein', language: 'Sprache', langAuto: 'Automatisch erkennen',
      secDeleted: 'Gelöschte Nachrichten',
      markSingleDeletes: 'Einzellöschungen markieren',
      markTimeouts: 'Timeouts / Sperren markieren',
      markFullClear: 'Komplette Chat-Löschungen markieren',
      secChatAppearance: 'Chat-Darstellung',
      secChatTools: 'Chat-Werkzeuge',
      secComposer: 'Nachrichteneingabe',
      secConversation: 'Gesprächsqualität',
      chatWidthEnabled: 'Chat-Panel verbreitern',
      width: 'Breite',
      appearanceProfile: 'Darstellungsprofil',
      profileComfortable: 'Komfortabel',
      profileCompact: 'Kompakt',
      profileAccessible: 'Barrierearm',
      hideBadges: 'Abzeichen ausblenden',
      showAvatars: 'Benutzer-Avatare anzeigen',
      msgSeparators: 'Trennlinie zwischen Nachrichten',
      hideLeaderboard: 'Top-Nutzer-Karussell ausblenden',
      hideCommunityHighlights: 'Community-Highlights ausblenden',
      secPlayerRewards: 'Player & Belohnungen',
      autoQuality: 'Quellqualität bevorzugen',
      autoClaimPoints: 'Bonus-Truhe automatisch einlösen',
      autoClaimDrops: 'Drops automatisch einlösen',
      secNotifications: 'Benachrichtigungen',
      mentionSound: 'Ton bei @Erwähnung',
      mentionReplyPing: 'Ton bei Antworten an dich',
      sound: 'Ton',
      test: 'Test',
      volume: 'Lautstärke',
      sndMessage: 'Nachricht', sndPop: 'Pop', sndDrop: 'Tropfen', sndKnock: 'Klopfen', sndGlass: 'Glas',
      sndPluck: 'Zupfen', sndOrbit: 'Orbit', sndPixel: 'Pixel', sndBell: 'Glocke', sndSpark: 'Funke',
      sndChime: 'Klang', sndDoubleTap: 'Doppeltipp', sndWoodblock: 'Holzblock', sndMarble: 'Murmel',
      sndQuartz: 'Quarz', sndBlink: 'Blinken', sndRipple: 'Welle', sndChord: 'Akkord',
      secHighlights: 'Hervorhebungen',
      mentionHighlight: '@Erwähnungen hervorheben',
      highlightMods: 'Moderatoren hervorheben',
      highlightVips: 'VIPs hervorheben',
      fixNameColors: 'Namens-Kontrast verbessern',
      copyButton: 'Kopier-Button beim Überfahren',
      accentColor: 'Akzentfarbe',
      secFilter: 'Nachrichtenfilter',
      hideCommands: '!-Befehle ausblenden',
      hideBots: 'Bot-Nachrichten ausblenden',
      export: 'Exportieren', import: 'Importieren', reset: 'Zurücksetzen',
      savedNote: 'Automatisch gespeichert.',
      settingsBtnTitle: 'BetterTwitch-Einstellungen',
      alertCopied: 'In die Zwischenablage kopiert.',
      copyMessage: 'Nachricht kopieren',
      alertInvalidSettings: 'Ungültige Einstellungsdaten.',
      confirmReset: 'Alle BetterTwitch-Einstellungen auf Standard zurücksetzen?',
      exportTitle: 'Einstellungen exportieren', importTitle: 'Einstellungen importieren',
      ioCopy: 'Kopieren', ioApply: 'Übernehmen', ioClose: 'Schließen',
      mentionInbox: 'Erwähnungs-Panel', mentionContextMessages: 'Kontextnachrichten',
      highlightFirstChatters: 'Erstmalige Chatter hervorheben', highlightReturningChatters: 'Wiederkehrende Chatter hervorheben',
      inlineTranslate: 'Beim Überfahren übersetzen',
      preserveDrafts: 'Entwürfe pro Kanal behalten', sentMessageHistory: 'Verlauf gesendeter Nachrichten',
      characterCounter: 'Zeichenzähler',
      spamCompression: 'Wiederholte Nachrichten bündeln',
      quickChatFilters: 'Schnelle Chat-Filter',
      liveChatSearch: 'Live-Chat-Suche',
      chatControlBtnTitle: 'Chat-Filter und Suche',
      chatControlTitle: 'Chat-Filter & Suche',
      saferLinks: 'Sicherere Link-Anzeige',
      dashboard: 'Live-Chat-Dashboard', dashBtnTitle: 'Live-Chat-Statistik',
      dashTitle: 'Live-Chat-Dashboard', dashPerMin: 'Nachrichten/Min',
      dashTopChatters: 'Top-Chatter', dashTopEmotes: 'Top-Emotes', dashEmpty: 'Warte auf Nachrichten…',
      dashEmptyHint: 'Die Sitzungsstatistik erscheint, sobald Chat-Nachrichten eintreffen.',
      dashLive: 'LIVE', dashCurrentRate: 'Aktuelle Rate', dashPeakRate: 'Sitzungsmaximum',
      dashTotalMessages: 'Nachrichten', dashUniqueChatters: 'Chatter',
      dashActivity: 'Chat-Aktivität', dashLastMinute: 'Letzte 60 Sekunden',
      dashActiveNow: 'jetzt aktiv', dashAverageRate: 'Durchschnitt/Min', dashSessionTime: 'Sitzung',
      dashMessageCount: '{count} Nachrichten', dashEmoteUses: '{count} Nutzungen',
      dashHourShort: 'Std.', dashMinuteShort: 'Min.', dashSecondShort: 'Sek.',
      inboxBtnTitle: 'Erwähnungen',
      inboxTitle: 'Erwähnungen', inboxEmpty: 'Noch keine Erwähnungen.', inboxSearch: 'Erwähnungen suchen…',
      inboxJump: 'Zur Nachricht springen', inboxMissing: 'Nachricht ist nicht mehr sichtbar.',
      firstChatterLabel: 'NEU', returningChatterLabel: 'WIEDER DA',
      transFailed: 'Übersetzung fehlgeschlagen', transLoading: 'Wird übersetzt…',
      retryTranslation: 'Erneut versuchen', copyTranslation: 'Übersetzung kopieren', translationCopied: 'Kopiert',
      showOriginal: 'Original anzeigen', showTranslation: 'Übersetzung anzeigen',
      detectedLanguage: 'Erkannte Sprache', translationTarget: 'Übersetzung', unknownLanguage: 'Unbekannt',
      viewerHovercards: 'Zuschauer-Hovercards',
      hoverMessages: 'Nachrichten', hoverFirstSeen: 'Zuerst gesehen', hoverMentions: 'Erwähnungen', hoverTopEmote: 'Top-Emote',
      characterCounterTitle: 'Nachrichtenlänge',
      settingHelpTitle: 'Diese Einstellung erklären', byAuthor: 'von', botNamesLabel: 'Bot-Benutzernamen', botNamesPlaceholder: 'bot1, bot2, …',
      saferSending: 'Sicheres Senden', messageActions: 'Nachrichtenaktionen',
      replyMessageAction: 'Auf Nachricht antworten',
      replyUnavailable: 'Für diese Nachricht ist keine Antwortfunktion verfügbar.',
      sendAlreadyPending: 'Diese Nachricht wird bereits gesendet.',
      duplicateBlocked: 'Doppelte Nachricht blockiert. Innerhalb von 3 Sekunden erneut senden, um sie zu bestätigen.',
      largePasteWarning: 'Große Einfügung: {chars} Zeichen in {lines} Zeilen.',
      sendFailedRestored: 'Das Senden wurde nicht bestätigt. Die Nachricht wurde als Entwurf wiederhergestellt.',
      chatReconnecting: 'Chat wird neu verbunden…',
      filterAll: 'Alle', filterMentions: 'Erwähnungen', filterMods: 'Mods', filterQuestions: 'Fragen',
      filterLinks: 'Links', filterEmotes: 'Emotes',
      searchPlaceholder: 'Benutzername oder Nachricht suchen',
      searchPrevious: 'Vorheriger Treffer', searchNext: 'Nächster Treffer',
      searchResultCount: '{current}/{total}', searchNoResults: 'Keine Treffer',
      spamCollapsed: 'Wiederholt ×{count}', spamExpand: 'Wiederholungen anzeigen', spamCollapse: 'Wiederholungen ausblenden',
      unsafeLinkLabel: 'VORSICHT',
      unsafeLinkConfirm: 'Dieser Link verwendet die Domain „{domain}“, die verkürzt oder irreführend sein könnte. Trotzdem öffnen?',
    },
    ru: {
      secGeneral: 'Общие', language: 'Язык', langAuto: 'Автоопределение',
      secDeleted: 'Удалённые сообщения',
      markSingleDeletes: 'Отмечать удаления сообщений',
      markTimeouts: 'Отмечать таймауты / баны',
      markFullClear: 'Отмечать полную очистку чата',
      secChatAppearance: 'Вид чата',
      secChatTools: 'Инструменты чата',
      secComposer: 'Поле сообщения',
      secConversation: 'Качество общения',
      chatWidthEnabled: 'Расширить панель чата',
      width: 'Ширина',
      appearanceProfile: 'Профиль отображения',
      profileComfortable: 'Комфортный',
      profileCompact: 'Компактный',
      profileAccessible: 'Доступный',
      hideBadges: 'Скрыть значки',
      showAvatars: 'Показывать аватары',
      msgSeparators: 'Разделитель между сообщениями',
      hideLeaderboard: 'Скрыть карусель лидеров',
      hideCommunityHighlights: 'Скрыть важные сообщения',
      secPlayerRewards: 'Плеер и награды',
      autoQuality: 'Предпочитать исходное качество',
      autoClaimPoints: 'Авто-сбор бонусного сундука',
      autoClaimDrops: 'Авто-сбор Drops',
      secNotifications: 'Уведомления',
      mentionSound: 'Звук при @упоминании',
      mentionReplyPing: 'Звук при ответах вам',
      sound: 'Звук',
      test: 'Тест',
      volume: 'Громкость',
      sndMessage: 'Сообщение', sndPop: 'Поп', sndDrop: 'Капля', sndKnock: 'Стук', sndGlass: 'Стекло',
      sndPluck: 'Струна', sndOrbit: 'Орбита', sndPixel: 'Пиксель', sndBell: 'Колокольчик', sndSpark: 'Искра',
      sndChime: 'Перезвон', sndDoubleTap: 'Двойной', sndWoodblock: 'Дерево', sndMarble: 'Шарик',
      sndQuartz: 'Кварц', sndBlink: 'Блик', sndRipple: 'Волна', sndChord: 'Аккорд',
      secHighlights: 'Подсветка',
      mentionHighlight: 'Подсвечивать @упоминания',
      highlightMods: 'Подсвечивать модераторов',
      highlightVips: 'Подсвечивать VIP',
      fixNameColors: 'Улучшать контраст ников',
      copyButton: 'Кнопка копирования при наведении',
      accentColor: 'Акцентный цвет',
      secFilter: 'Фильтры сообщений',
      hideCommands: 'Скрывать !-команды',
      hideBots: 'Скрывать сообщения ботов',
      export: 'Экспорт', import: 'Импорт', reset: 'Сброс',
      savedNote: 'Сохраняется автоматически.',
      settingsBtnTitle: 'Настройки BetterTwitch',
      alertCopied: 'Скопировано в буфер обмена.',
      copyMessage: 'Копировать сообщение',
      alertInvalidSettings: 'Некорректные данные настроек.',
      confirmReset: 'Сбросить все настройки BetterTwitch к значениям по умолчанию?',
      exportTitle: 'Экспорт настроек', importTitle: 'Импорт настроек',
      ioCopy: 'Копировать', ioApply: 'Применить', ioClose: 'Закрыть',
      mentionInbox: 'Панель упоминаний', mentionContextMessages: 'Сообщения контекста',
      highlightFirstChatters: 'Выделять новых участников', highlightReturningChatters: 'Выделять вернувшихся участников',
      inlineTranslate: 'Перевод при наведении',
      preserveDrafts: 'Сохранять черновики по каналам', sentMessageHistory: 'История отправленных сообщений',
      characterCounter: 'Счётчик символов',
      spamCompression: 'Сворачивать повторяющиеся сообщения',
      quickChatFilters: 'Быстрые фильтры чата',
      liveChatSearch: 'Поиск по живому чату',
      chatControlBtnTitle: 'Фильтры и поиск по чату',
      chatControlTitle: 'Фильтры и поиск',
      saferLinks: 'Безопасное отображение ссылок',
      dashboard: 'Панель статистики чата', dashBtnTitle: 'Статистика чата',
      dashTitle: 'Статистика чата', dashPerMin: 'сообщений/мин',
      dashTopChatters: 'Самые активные', dashTopEmotes: 'Популярные эмоции', dashEmpty: 'Ожидание сообщений…',
      dashEmptyHint: 'Статистика сеанса появится после новых сообщений в чате.',
      dashLive: 'ЭФИР', dashCurrentRate: 'Текущий темп', dashPeakRate: 'Пик сеанса',
      dashTotalMessages: 'Сообщения', dashUniqueChatters: 'Участники',
      dashActivity: 'Активность чата', dashLastMinute: 'Последние 60 секунд',
      dashActiveNow: 'активны сейчас', dashAverageRate: 'в среднем/мин', dashSessionTime: 'сеанс',
      dashMessageCount: '{count} сообщений', dashEmoteUses: '{count} использований',
      dashHourShort: 'ч', dashMinuteShort: 'мин', dashSecondShort: 'с',
      inboxBtnTitle: 'Упоминания',
      inboxTitle: 'Упоминания', inboxEmpty: 'Упоминаний пока нет.', inboxSearch: 'Поиск упоминаний…',
      inboxJump: 'Перейти к сообщению', inboxMissing: 'Сообщение больше не отображается.',
      firstChatterLabel: 'ВПЕРВЫЕ', returningChatterLabel: 'ВЕРНУЛСЯ',
      transFailed: 'Ошибка перевода', transLoading: 'Перевод…',
      retryTranslation: 'Повторить', copyTranslation: 'Копировать перевод', translationCopied: 'Скопировано',
      showOriginal: 'Показать оригинал', showTranslation: 'Показать перевод',
      detectedLanguage: 'Определённый язык', translationTarget: 'Перевод', unknownLanguage: 'Неизвестно',
      viewerHovercards: 'Карточки зрителей',
      hoverMessages: 'Сообщения', hoverFirstSeen: 'Впервые замечен', hoverMentions: 'Упоминания', hoverTopEmote: 'Лучшая эмоция',
      characterCounterTitle: 'Длина сообщения',
      settingHelpTitle: 'Описание этой настройки', byAuthor: 'от', botNamesLabel: 'Имена ботов', botNamesPlaceholder: 'bot1, bot2, …',
      saferSending: 'Безопасная отправка', messageActions: 'Действия с сообщением',
      replyMessageAction: 'Ответить на сообщение',
      replyUnavailable: 'Для этого сообщения ответ недоступен.',
      sendAlreadyPending: 'Это сообщение уже отправляется.',
      duplicateBlocked: 'Повторное сообщение заблокировано. Отправьте его ещё раз в течение 3 секунд для подтверждения.',
      largePasteWarning: 'Большая вставка: {chars} символов, строк: {lines}.',
      sendFailedRestored: 'Отправка не подтверждена. Сообщение восстановлено как черновик.',
      chatReconnecting: 'Переподключение к чату…',
      filterAll: 'Все', filterMentions: 'Упоминания', filterMods: 'Модераторы', filterQuestions: 'Вопросы',
      filterLinks: 'Ссылки', filterEmotes: 'Эмоции',
      searchPlaceholder: 'Поиск по имени или сообщению',
      searchPrevious: 'Предыдущий результат', searchNext: 'Следующий результат',
      searchResultCount: '{current}/{total}', searchNoResults: 'Совпадений нет',
      spamCollapsed: 'Повторено ×{count}', spamExpand: 'Показать повторы', spamCollapse: 'Скрыть повторы',
      unsafeLinkLabel: 'ОСТОРОЖНО',
      unsafeLinkConfirm: 'Ссылка использует домен «{domain}», который может быть сокращённым или вводящим в заблуждение. Всё равно открыть?',
    },
  };

  const SETTING_HELP = {
    en: {
      language: 'Controls the language used by every BetterTwitch label, button, message, and tooltip. “Auto-detect” uses the first supported language reported by your browser; English is used if none match. Translation results also use this language as their target. Changing it reloads the page so the whole interface updates consistently.',
      markSingleDeletes: 'When Twitch reports that one specific message was deleted, BetterTwitch keeps that message visible and marks it with a strike-through and trash icon. Turn this off if you want Twitch’s normal behavior, where the deleted text disappears. It only works for deletion events received after BetterTwitch loaded; it cannot recover older or previously removed messages.',
      markTimeouts: 'When a user is timed out or banned, BetterTwitch keeps that user’s messages currently visible in chat and marks them as deleted. This is separate from single-message deletions and full-room clears. It cannot restore messages that disappeared before the script loaded or messages no longer present in the page.',
      markFullClear: 'When a moderator clears the entire chat, BetterTwitch leaves the messages currently on screen visible and marks every one as deleted. Turn this off to let Twitch clear the visible chat normally. Messages from before BetterTwitch loaded, or messages already removed from the page, cannot be recovered.',
      chatWidthEnabled: 'Turns on BetterTwitch’s custom chat width. While enabled, the chat column uses the width selected below and the video area is resized to fit beside it. Turn it off to restore Twitch’s normal responsive layout. This changes only the page layout; it does not change text size or stream resolution.',
      chatWidthPx: 'Sets the custom chat column to a precise width from 340 to 1200 pixels. This control has no effect until “Widen chat panel” is enabled. A larger number gives messages more room but leaves less horizontal space for the video; use a smaller value if the player becomes cramped.',
      hideBadges: 'Removes the small subscriber, moderator, VIP, broadcaster, founder, and similar badge images shown beside usernames. This is a visual change in your browser only: it does not remove anyone’s role or badge on Twitch. BetterTwitch can still use badge metadata for moderator and VIP highlighting when Twitch provides it.',
      showAvatars: 'Shows each chatter’s Twitch profile picture before their username in chat and beside their name in the dashboard ranking. BetterTwitch obtains missing avatars through batched requests directly to Twitch’s GraphQL service and caches the results for the page session; no BetterTwitch server receives the usernames. Turn this off for a denser chat and no avatar lookups.',
      msgSeparators: 'Adds a subtle horizontal divider between neighboring chat messages. This only changes appearance and can make fast or densely packed chat easier to follow. Turn it off to return to Twitch’s normal uninterrupted message list.',
      hideLeaderboard: 'Hides only Twitch’s animated top-user slider above chat. Depending on the channel, this strip can rank Bits cheerers, gift-sub gifters, or other leading supporters. It does not hide pinned messages, community highlights, chat notices, or the composer. The slider is hidden only in your browser.',
      hideCommunityHighlights: 'Hides Twitch’s community-highlight stack above the message list, including pinned messages and any other cards Twitch places in that same stack. It does not unpin or delete anything, and other viewers still see it. The top-user slider has a separate setting and is not affected.',
      autoQuality: 'Stores Twitch’s “source/chunked” quality preference so the player tries to select the highest quality offered by the current stream. It cannot create a source-quality option when the streamer does not provide one, and Twitch may still change quality because of player or connection conditions. Higher quality can use more bandwidth.',
      autoClaimPoints: 'Automatically clicks the bonus channel-points chest when Twitch makes that chest available in chat. It only collects the free bonus: it never spends points, chooses rewards, follows channels, or performs predictions. If Twitch does not display a claimable chest, there is nothing for BetterTwitch to click.',
      autoClaimDrops: 'Automatically clicks a visible Twitch Drops “Claim” button when one appears on a supported Twitch page. It cannot complete eligibility requirements, link external accounts, visit another website, or claim a reward that Twitch still considers locked. Check Twitch’s Drops inventory if a campaign requires extra manual steps.',
      mentionSound: 'Plays the selected BetterTwitch sound when a message from another user mentions your currently logged-in Twitch username. Your own messages are ignored, and rapid alerts are rate-limited so a burst of mentions does not play continuously. Most browsers require you to click or interact with the page once before they allow notification audio.',
      mentionReplyPing: 'Also plays the mention notification sound when Twitch identifies a message as a direct reply to one of your messages, even if the reply text does not contain your username. This option only works while “Sound on @mention” is enabled; disabling the main sound also disables reply sounds. It uses the same selected sound and volume.',
      pingSound: 'Chooses which of the 18 built-in short sounds BetterTwitch uses for mention and direct-reply notifications. New installations and resets use Message by default; an existing saved choice is preserved. Use the Test button to hear the current sound. It uses a stable pitch, is generated locally, and does not change any Twitch audio.',
      pingVolume: 'Controls only the volume of BetterTwitch mention and reply sounds, from 0% (completely silent) to 100% (full notification volume). New installations and resets start at 35%; an existing saved level is preserved. Use the Test button to check a comfortable level. This does not change the stream, Twitch ads, browser volume, or operating-system volume.',
      mentionHighlight: 'Adds a colored background and side marker to messages that mention your currently logged-in Twitch username. Your own messages are not treated as incoming mentions. Turn this off to remove the visual marker; the Mentions panel and notification sound have their own separate settings.',
      highlightMods: 'Adds a colored background and side marker to messages from channel moderators. BetterTwitch relies on the role or badge data attached to each Twitch message, so a message cannot be highlighted when Twitch does not provide recognizable moderator metadata. This changes appearance only and grants no moderation permissions.',
      highlightVips: 'Adds a colored background and side marker to messages from channel VIPs. BetterTwitch relies on the role or badge data attached to each Twitch message, so a message cannot be highlighted when Twitch does not provide recognizable VIP metadata. This changes appearance only and does not alter the user’s Twitch status.',
      mentionColor: 'Selects the background, border, and marker color used for messages that mention you. This picker has no visible effect until “Highlight @mentions” is enabled. Choose a color that remains readable against your Twitch theme; it does not affect moderator, VIP, first-time, or returning-chatter colors.',
      modColor: 'Selects the background, border, and marker color used for moderator messages. This picker has no visible effect until “Highlight moderators” is enabled. It changes only the local highlight and does not change Twitch’s username color or moderator badge.',
      vipColor: 'Selects the background, border, and marker color used for VIP messages. This picker has no visible effect until “Highlight VIPs” is enabled. It changes only the local highlight and does not change Twitch’s username color or VIP badge.',
      highlightFirstChatters: 'Highlights a message and adds a FIRST label when Twitch marks it as that user’s first message in the channel. BetterTwitch cannot infer this status from chat history, so it works only when Twitch includes the first-message metadata. The label is translated into the selected BetterTwitch language.',
      highlightReturningChatters: 'Highlights a message and adds a RETURNING label when Twitch marks the sender as a returning chatter. BetterTwitch cannot calculate this status by itself, so it works only when Twitch includes the returning-chatter metadata. The label is translated into the selected BetterTwitch language.',
      firstChatterColor: 'Selects the background, border, and FIRST-label color used for first-time chatters. This picker has no visible effect until “Highlight first-time chatters” is enabled and Twitch identifies a message as a first message. It does not change the user’s Twitch name color.',
      returningChatterColor: 'Selects the background, border, and RETURNING-label color used for returning chatters. This picker has no visible effect until “Highlight returning chatters” is enabled and Twitch identifies the sender as returning. It does not change the user’s Twitch name color.',
      fixNameColors: 'Checks Twitch username colors against the dark chat background and lightens only colors that would otherwise be difficult to read. Names that already have enough contrast are left unchanged. This is a local readability adjustment: it does not change the user’s saved Twitch color, role, badge, or identity.',
      copyButton: 'Adds a Copy action to BetterTwitch’s message toolbar, which appears when you hover over or focus a chat message. Clicking it copies the readable author/message content without the toolbar buttons or BetterTwitch translation controls. Turn this off to remove only the Copy action; Twitch’s chat message remains unchanged.',
      accentColor: 'Sets the main color used by BetterTwitch for enabled switches, active buttons, headings, borders, focus rings, and other interface accents. The change is applied immediately across BetterTwitch panels. It does not recolor Twitch itself, usernames, message highlights, or the video player.',
      hideCommands: 'Locally hides messages whose visible message text begins with an exclamation mark, such as “!song” or “!commands”. It does not stop you or anyone else from sending commands, delete them from Twitch, or hide commands that do not start with a visible ! character. Turn it off to show matching messages again.',
      hideBots: 'Locally hides messages sent by usernames listed in the bot field below. Matching ignores uppercase/lowercase differences, but the username still needs to be spelled correctly. Nothing is blocked, reported, timed out, or deleted on Twitch; other viewers continue to see those messages.',
      botNames: 'Enter the Twitch login names that “Hide bot messages” should match, separated by commas - for example: nightbot, streamelements. Do not include @ symbols, display-name decorations, or profile links. This field has no effect until “Hide bot messages” is enabled, and a misspelled name will not match.',
      inlineTranslate: 'Adds a Translate action to each message toolbar. Translation is requested only when you click it; the clicked message text is sent directly to Google’s public translation endpoint and translated into the selected or auto-detected BetterTwitch language. Results are cached for this page session and can be copied, retried, or switched back to the original; no BetterTwitch server is involved.',
      mentionInbox: 'Adds a Mentions panel that collects incoming messages which mention your username or directly reply to you. The panel provides an unread count, search, optional nearby context, and a button to jump to a message that is still visible. It records only messages received while this page is open; reloading, closing, or changing the room clears the session list.',
      mentionContextMessages: 'Chooses how many ordinary chat messages are saved before and after each item in the Mentions panel: 0, 1, 2, or 3 on each side. This control has no effect until the Mentions panel is enabled. A larger value provides more conversation context but displays and keeps more lines in memory; it does not send them to a server.',
      viewerHovercards: 'Shows a BetterTwitch information card with the viewer’s Twitch avatar when you hover over a username in chat. It summarizes only what BetterTwitch observed during the current page session, including message count, first-seen time, mentions, and most-used emote. The avatar is requested directly from Twitch and cached for the page session; this is not Twitch account history, and reloading or changing the room resets the observed statistics.',
      preserveDrafts: 'Saves unfinished composer text separately for each Twitch channel in this browser and restores it when you return to that channel. Up to 30 channel drafts are kept locally, each limited to 5,000 characters; a confirmed send or manually clearing the composer removes that draft. Nothing is uploaded to BetterTwitch, and disabling this option clears the saved channel drafts.',
      sentMessageHistory: 'Keeps up to 50 messages you send during the current page session and lets you recall them with the Up and Down arrow keys. History navigation starts only when the text cursor is at the beginning or end of the composer, so normal cursor movement still works. The history is memory-only and is cleared when the page reloads.',
      characterCounter: 'Shows the message’s current character count immediately before Twitch’s chat-settings button, using a slightly larger readable label. It compares the count with the limit detected from Twitch and falls back to 500 characters when no limit is available. The counter is guidance only: it does not shorten text or prevent Twitch from rejecting a message.',
      appearanceProfile: 'Chooses one complete readability layout for chat. Comfortable keeps balanced spacing, Compact fits more messages on screen, and Accessible uses larger text, taller lines, larger avatars, stronger contrast, and larger message actions. The profile changes BetterTwitch’s local presentation only and can be switched immediately without reloading.',
      spamCompression: 'Detects three or more identical messages arriving within 12 seconds and collapses the repeats into one message with a count. Click the count to reveal or hide every original repeated message; nothing is deleted or discarded. Groups exist only in the current visible chat and reset when the room changes, the page reloads, or this option is disabled.',
      quickChatFilters: 'Adds All, Mentions, Moderators, Questions, Links, and Emotes filters to the Chat filters & search panel opened from the chat footer. Selecting a filter temporarily hides non-matching rows in your browser; closing the panel does not cancel the active filter, and nothing is deleted or changed for other viewers. Choose All to restore the complete visible chat.',
      liveChatSearch: 'Adds a simple local search with Previous and Next result navigation to the Chat filters & search panel opened from the chat footer. Type any part of a visible username, Twitch login, or message directly - no prefixes or special search syntax are required. Matching ignores letter case. Closing the panel keeps the current search active; only messages still present on this page are searched, and no query is sent to Twitch or BetterTwitch.',
      saferLinks: 'Shows the actual destination domain beside external chat links and marks shortened, numeric-IP, punycode, or otherwise misleading-looking hosts with a caution label. Clicking a marked link asks for confirmation before opening it. This is a local warning based on the URL text; it does not download, scan, or guarantee the safety of the destination.',
      dashboard: 'Adds a live dashboard for activity observed after BetterTwitch loads in the current chat room. It shows current and peak messages per minute, total messages, unique and recently active chatters, average rate, session duration, a 60-second graph, the top eight chatters with optional avatars, and the top six Twitch emotes. These are local session statistics - not historical Twitch analytics - and they reset on reload or room change.',
      saferSending: 'Adds safeguards around the Twitch composer: the first identical message repeated within 8 seconds is blocked, and sending it again within 3 seconds confirms that you really want the duplicate. It warns before pasting 280+ characters or 4+ lines, tracks reconnecting state, waits up to 12 seconds for your own Twitch chat echo, and restores text when sending is not confirmed. Persistent draft recovery uses “Preserve drafts per channel”; Twitch can still reject, moderate, or remove a message after these checks.',
    },
    de: {
      language: 'Legt die Sprache für alle BetterTwitch-Beschriftungen, Buttons, Meldungen und Hilfetexte fest. „Automatisch erkennen“ verwendet die erste unterstützte Sprache, die dein Browser meldet; passt keine, wird Englisch verwendet. Auch Übersetzungen werden in diese Sprache übertragen. Nach einer Änderung wird die Seite neu geladen, damit die gesamte Oberfläche einheitlich aktualisiert wird.',
      markSingleDeletes: 'Wenn Twitch meldet, dass genau eine Nachricht gelöscht wurde, lässt BetterTwitch sie sichtbar und markiert sie durchgestrichen mit einem Papierkorb-Symbol. Ausschalten stellt Twitchs normales Verhalten wieder her, bei dem der gelöschte Text verschwindet. Es funktioniert nur für Löschereignisse nach dem Laden von BetterTwitch; ältere oder bereits entfernte Nachrichten können nicht wiederhergestellt werden.',
      markTimeouts: 'Wenn ein Benutzer einen Timeout oder eine Sperre erhält, lässt BetterTwitch dessen aktuell sichtbare Nachrichten stehen und markiert sie als gelöscht. Diese Einstellung ist unabhängig von Einzellöschungen und kompletten Chat-Löschungen. Nachrichten, die vor dem Laden des Skripts verschwunden sind oder nicht mehr auf der Seite stehen, können nicht wiederhergestellt werden.',
      markFullClear: 'Wenn ein Moderator den gesamten Chat leert, lässt BetterTwitch die aktuell angezeigten Nachrichten stehen und markiert jede als gelöscht. Ausschalten erlaubt Twitch, den sichtbaren Chat wie gewohnt vollständig zu leeren. Nachrichten von vor dem Laden von BetterTwitch oder bereits von der Seite entfernte Nachrichten können nicht zurückgeholt werden.',
      chatWidthEnabled: 'Aktiviert die benutzerdefinierte BetterTwitch-Chatbreite. Solange die Einstellung aktiv ist, verwendet die Chatspalte den unten gewählten Wert und der Videobereich wird passend verkleinert. Ausschalten stellt Twitchs normales, responsives Layout wieder her. Nur die Seitenaufteilung ändert sich, nicht Textgröße oder Stream-Auflösung.',
      chatWidthPx: 'Stellt die benutzerdefinierte Chatspalte exakt auf 340 bis 1200 Pixel ein. Der Regler hat keine Wirkung, solange „Chat-Panel verbreitern“ ausgeschaltet ist. Eine größere Zahl gibt Nachrichten mehr Platz, lässt aber weniger Breite für das Video; wähle einen kleineren Wert, wenn der Player zu eng wird.',
      hideBadges: 'Entfernt die kleinen Abonnenten-, Moderator-, VIP-, Broadcaster-, Gründer- und ähnlichen Abzeichen neben Benutzernamen. Das ist nur eine optische Änderung in deinem Browser: Rollen und Abzeichen auf Twitch bleiben bestehen. BetterTwitch kann von Twitch gelieferte Abzeichen-Metadaten weiterhin für Moderator- und VIP-Hervorhebungen verwenden.',
      showAvatars: 'Zeigt das Twitch-Profilbild jedes Chatters vor dem Namen im Chat und neben dem Namen in der Dashboard-Rangliste. Fehlende Avatare ruft BetterTwitch gebündelt direkt über Twitchs GraphQL-Dienst ab und speichert sie für die Seitensitzung zwischen; kein BetterTwitch-Server erhält die Benutzernamen. Ausschalten sorgt für einen kompakteren Chat und beendet Avatar-Abfragen.',
      msgSeparators: 'Fügt zwischen benachbarten Chat-Nachrichten eine dezente horizontale Trennlinie ein. Das ändert nur die Darstellung und kann einen schnellen oder dicht gefüllten Chat leichter lesbar machen. Ausschalten stellt Twitchs normale, durchgehende Nachrichtenliste wieder her.',
      hideLeaderboard: 'Blendet ausschließlich Twitchs animiertes Top-Nutzer-Karussell über dem Chat aus. Je nach Kanal zeigt dieser Streifen führende Bits-Spender, Geschenkabo-Spender oder andere Unterstützer. Angeheftete Nachrichten, Community-Highlights, Chat-Hinweise und Eingabefeld bleiben sichtbar. Das Karussell wird nur in deinem Browser ausgeblendet.',
      hideCommunityHighlights: 'Blendet Twitchs Community-Highlight-Stapel über der Nachrichtenliste aus, einschließlich angehefteter Nachrichten und weiterer Karten, die Twitch in diesem Stapel anzeigt. Nichts wird gelöst oder gelöscht und andere Zuschauer sehen alles weiterhin. Das Top-Nutzer-Karussell besitzt eine eigene Einstellung und bleibt unverändert.',
      autoQuality: 'Speichert bei Twitch die Qualitätspräferenz „Quelle/Chunked“, damit der Player die höchste vom aktuellen Stream angebotene Qualität versucht. Die Einstellung kann keine Quellqualität erzeugen, wenn der Streamer sie nicht anbietet, und Twitch kann die Qualität wegen Player- oder Verbindungsbedingungen weiterhin ändern. Höhere Qualität kann mehr Datenvolumen verbrauchen.',
      autoClaimPoints: 'Klickt automatisch auf die Kanalpunkte-Bonustruhe, sobald Twitch sie im Chat anbietet. Es wird ausschließlich der kostenlose Bonus eingesammelt: BetterTwitch gibt keine Punkte aus, wählt keine Belohnungen, folgt keinem Kanal und nimmt nicht an Vorhersagen teil. Zeigt Twitch keine einlösbare Truhe an, gibt es nichts anzuklicken.',
      autoClaimDrops: 'Klickt automatisch auf einen sichtbaren „Einlösen“-Button für Twitch Drops, wenn er auf einer unterstützten Twitch-Seite erscheint. BetterTwitch kann keine Teilnahmebedingungen erfüllen, externe Konten verknüpfen, andere Webseiten besuchen oder noch gesperrte Belohnungen einlösen. Prüfe Twitchs Drops-Inventar, wenn eine Kampagne zusätzliche manuelle Schritte verlangt.',
      mentionSound: 'Spielt den gewählten BetterTwitch-Ton ab, wenn ein anderer Benutzer deinen aktuell angemeldeten Twitch-Namen erwähnt. Eigene Nachrichten werden ignoriert und schnelle Meldungen werden begrenzt, damit bei vielen Erwähnungen kein Dauerton entsteht. Die meisten Browser erlauben Benachrichtigungstöne erst, nachdem du einmal auf der Seite geklickt oder mit ihr interagiert hast.',
      mentionReplyPing: 'Spielt den Erwähnungston auch dann ab, wenn Twitch eine Nachricht als direkte Antwort auf eine deiner Nachrichten erkennt, selbst wenn dein Name nicht im Antworttext steht. Diese Option funktioniert nur mit aktiviertem „Ton bei @Erwähnung“; wird der Hauptton ausgeschaltet, sind auch Antworttöne aus. Verwendet werden derselbe ausgewählte Ton und dieselbe Lautstärke.',
      pingSound: 'Wählt einen der 18 eingebauten kurzen Töne für Erwähnungen und direkte Antworten. Neuinstallationen und Zurücksetzen verwenden standardmäßig Nachricht; eine vorhandene gespeicherte Auswahl bleibt erhalten. Mit dem Test-Button hörst du den aktuellen Ton. Er hat eine stabile Tonhöhe, wird lokal erzeugt und verändert kein Twitch-Audio.',
      pingVolume: 'Regelt ausschließlich die Lautstärke der BetterTwitch-Töne für Erwähnungen und Antworten von 0 % bis 100 %. Neuinstallationen und Zurücksetzen beginnen bei 35 %; ein vorhandener gespeicherter Wert bleibt erhalten. Prüfe die Lautstärke mit dem Test-Button. Stream, Twitch-Werbung, Browser- und Systemlautstärke werden nicht verändert.',
      mentionHighlight: 'Gibt Nachrichten, die deinen aktuell angemeldeten Twitch-Namen erwähnen, einen farbigen Hintergrund und Seitenmarker. Eigene Nachrichten zählen nicht als eingehende Erwähnungen. Ausschalten entfernt nur diese optische Markierung; das Erwähnungs-Panel und der Benachrichtigungston besitzen eigene Einstellungen.',
      highlightMods: 'Gibt Nachrichten von Kanalmoderatoren einen farbigen Hintergrund und Seitenmarker. BetterTwitch benötigt dafür die Rollen- oder Abzeichen-Daten der jeweiligen Twitch-Nachricht; ohne erkennbare Moderator-Metadaten ist keine Hervorhebung möglich. Es ändert nur die Darstellung und verleiht keinerlei Moderationsrechte.',
      highlightVips: 'Gibt Nachrichten von Kanal-VIPs einen farbigen Hintergrund und Seitenmarker. BetterTwitch benötigt dafür die Rollen- oder Abzeichen-Daten der jeweiligen Twitch-Nachricht; ohne erkennbare VIP-Metadaten ist keine Hervorhebung möglich. Es ändert nur die Darstellung und nicht den Twitch-Status des Benutzers.',
      mentionColor: 'Wählt Hintergrund-, Rahmen- und Markerfarbe für Nachrichten, in denen du erwähnt wirst. Die Farbauswahl hat keine sichtbare Wirkung, solange „@Erwähnungen hervorheben“ ausgeschaltet ist. Wähle eine Farbe, die in deinem Twitch-Design lesbar bleibt; Moderator-, VIP-, Erstmalig- und Wiederkehrer-Farben ändern sich nicht.',
      modColor: 'Wählt Hintergrund-, Rahmen- und Markerfarbe für Moderator-Nachrichten. Die Farbauswahl hat keine sichtbare Wirkung, solange „Moderatoren hervorheben“ ausgeschaltet ist. Nur die lokale Hervorhebung ändert sich, nicht Twitchs Namensfarbe oder Moderator-Abzeichen.',
      vipColor: 'Wählt Hintergrund-, Rahmen- und Markerfarbe für VIP-Nachrichten. Die Farbauswahl hat keine sichtbare Wirkung, solange „VIPs hervorheben“ ausgeschaltet ist. Nur die lokale Hervorhebung ändert sich, nicht Twitchs Namensfarbe oder VIP-Abzeichen.',
      highlightFirstChatters: 'Hebt eine Nachricht hervor und ergänzt das Label NEU, wenn Twitch sie als erste Nachricht dieses Benutzers im Kanal kennzeichnet. BetterTwitch kann diesen Status nicht aus dem Chatverlauf erraten und ist deshalb auf Twitchs Erstnachrichten-Metadaten angewiesen. Das Label erscheint in der gewählten BetterTwitch-Sprache.',
      highlightReturningChatters: 'Hebt eine Nachricht hervor und ergänzt das Label WIEDER DA, wenn Twitch den Absender als wiederkehrenden Chatter kennzeichnet. BetterTwitch kann diesen Status nicht selbst berechnen und ist deshalb auf Twitchs Wiederkehrer-Metadaten angewiesen. Das Label erscheint in der gewählten BetterTwitch-Sprache.',
      firstChatterColor: 'Wählt Hintergrund-, Rahmen- und NEU-Label-Farbe für erstmalige Chatter. Die Farbauswahl wirkt nur, wenn „Erstmalige Chatter hervorheben“ aktiv ist und Twitch eine Nachricht als erste Nachricht erkennt. Die Twitch-Namensfarbe des Benutzers bleibt unverändert.',
      returningChatterColor: 'Wählt Hintergrund-, Rahmen- und WIEDER-DA-Label-Farbe für wiederkehrende Chatter. Die Farbauswahl wirkt nur, wenn „Wiederkehrende Chatter hervorheben“ aktiv ist und Twitch den Absender als wiederkehrend erkennt. Die Twitch-Namensfarbe des Benutzers bleibt unverändert.',
      fixNameColors: 'Prüft Twitch-Namensfarben auf dem dunklen Chat-Hintergrund und hellt nur Farben auf, die sonst schwer lesbar wären. Namen mit ausreichendem Kontrast bleiben unverändert. Diese lokale Lesbarkeitshilfe ändert weder die bei Twitch gespeicherte Farbe noch Rolle, Abzeichen oder Identität des Benutzers.',
      copyButton: 'Fügt der BetterTwitch-Nachrichtenleiste eine Kopieraktion hinzu; die Leiste erscheint beim Überfahren oder Fokussieren einer Chat-Nachricht. Ein Klick kopiert den lesbaren Autor-/Nachrichteninhalt ohne Leisten-Buttons oder BetterTwitch-Übersetzungselemente. Ausschalten entfernt nur die Kopieraktion und verändert die Twitch-Nachricht nicht.',
      accentColor: 'Bestimmt die Hauptfarbe für aktivierte BetterTwitch-Schalter, aktive Buttons, Überschriften, Rahmen, Fokusmarkierungen und weitere Oberflächenakzente. Die Änderung wird sofort in allen BetterTwitch-Panels angewendet. Twitch selbst, Benutzernamen, Nachrichten-Hervorhebungen und Videoplayer werden nicht umgefärbt.',
      hideCommands: 'Blendet lokal Nachrichten aus, deren sichtbarer Text mit einem Ausrufezeichen beginnt, zum Beispiel „!song“ oder „!commands“. Es verhindert weder das Senden von Befehlen noch löscht es sie bei Twitch; Befehle ohne sichtbares ! am Anfang werden nicht erkannt. Ausschalten zeigt passende Nachrichten wieder an.',
      hideBots: 'Blendet lokal Nachrichten von Benutzernamen aus, die im Bot-Feld darunter stehen. Beim Vergleich ist Groß-/Kleinschreibung egal, der Name muss aber richtig geschrieben sein. Bei Twitch wird nichts blockiert, gemeldet, gesperrt oder gelöscht; andere Zuschauer sehen diese Nachrichten weiterhin.',
      botNames: 'Trage die Twitch-Login-Namen ein, die „Bot-Nachrichten ausblenden“ erkennen soll, durch Kommas getrennt, zum Beispiel: nightbot, streamelements. Verwende keine @-Zeichen, Zusätze im Anzeigenamen oder Profillinks. Das Feld wirkt nur bei aktivierter Bot-Ausblendung; ein falsch geschriebener Name wird nicht erkannt.',
      inlineTranslate: 'Fügt jeder Nachrichtenleiste eine Übersetzungsaktion hinzu. Erst beim Anklicken wird der Text dieser einen Nachricht direkt an Googles öffentlichen Übersetzungsdienst gesendet und in die gewählte oder automatisch erkannte BetterTwitch-Sprache übersetzt. Ergebnisse werden für diese Seitensitzung zwischengespeichert und lassen sich kopieren, wiederholen oder gegen das Original umschalten; ein BetterTwitch-Server ist nicht beteiligt.',
      mentionInbox: 'Fügt ein Erwähnungs-Panel hinzu, das eingehende Nachrichten mit deinem Benutzernamen oder direkte Antworten auf dich sammelt. Es bietet einen Ungelesen-Zähler, Suche, optionalen Kontext und einen Sprung-Button, solange die Nachricht noch sichtbar ist. Gespeichert werden nur Nachrichten, die bei geöffneter Seite eintreffen; Neuladen, Schließen oder Raumwechsel löscht die Sitzungsliste.',
      mentionContextMessages: 'Legt fest, wie viele normale Chat-Nachrichten vor und nach jedem Eintrag im Erwähnungs-Panel gespeichert werden: 0, 1, 2 oder 3 je Seite. Der Wert hat keine Wirkung, solange das Erwähnungs-Panel ausgeschaltet ist. Mehr Kontext zeigt und behält mehr Zeilen im Arbeitsspeicher, sendet sie aber an keinen Server.',
      viewerHovercards: 'Zeigt beim Überfahren eines Chat-Namens eine BetterTwitch-Infokarte mit dem Twitch-Avatar des Zuschauers. Sie fasst ausschließlich zusammen, was BetterTwitch in der aktuellen Seitensitzung gesehen hat: Nachrichtenanzahl, erste Sichtung, Erwähnungen und meistgenutztes Emote. Der Avatar wird direkt von Twitch abgerufen und für die Seitensitzung zwischengespeichert; dies ist kein Kontoverlauf, und Neuladen oder Raumwechsel setzt die beobachteten Statistiken zurück.',
      preserveDrafts: 'Speichert unfertigen Text für jeden Twitch-Kanal getrennt in diesem Browser und stellt ihn bei deiner Rückkehr wieder her. Lokal bleiben bis zu 30 Kanalentwürfe mit jeweils höchstens 5.000 Zeichen erhalten; bestätigtes Senden oder manuelles Leeren des Eingabefelds entfernt den Entwurf. Nichts wird an BetterTwitch hochgeladen, und das Ausschalten löscht die gespeicherten Kanalentwürfe.',
      sentMessageHistory: 'Behält bis zu 50 Nachrichten, die du in der aktuellen Seitensitzung sendest, und ruft sie mit Pfeil hoch und Pfeil runter wieder auf. Die Navigation beginnt nur, wenn der Textcursor am Anfang oder Ende des Eingabefelds steht, damit normale Cursorbewegung weiter funktioniert. Der Verlauf liegt nur im Arbeitsspeicher und verschwindet beim Neuladen.',
      characterCounter: 'Zeigt die aktuelle Zeichenzahl direkt vor Twitchs Chat-Einstellungsbutton in einer etwas größeren, gut lesbaren Anzeige. Sie vergleicht den Wert mit dem von Twitch erkannten Limit und verwendet 500 Zeichen, falls kein Limit gefunden wird. Der Zähler dient nur als Orientierung: Er kürzt keinen Text und verhindert keine Ablehnung durch Twitch.',
      appearanceProfile: 'Wählt ein vollständiges Lesbarkeitsprofil für den Chat. Komfortabel verwendet ausgewogene Abstände, Kompakt zeigt mehr Nachrichten gleichzeitig und Barrierearm nutzt größere Schrift, höhere Zeilen, größere Avatare, stärkeren Kontrast und größere Nachrichtenaktionen. Nur die lokale BetterTwitch-Darstellung ändert sich; ein Profilwechsel wirkt sofort und benötigt kein Neuladen.',
      spamCompression: 'Erkennt drei oder mehr identische Nachrichten innerhalb von 12 Sekunden und bündelt die Wiederholungen in einer Nachricht mit Zähler. Ein Klick auf den Zähler blendet alle ursprünglichen Wiederholungen ein oder wieder aus; nichts wird gelöscht oder verworfen. Gruppen gelten nur für den aktuell sichtbaren Chat und werden bei Raumwechsel, Neuladen oder Ausschalten zurückgesetzt.',
      quickChatFilters: 'Fügt dem über die Chat-Fußleiste geöffneten Panel „Chat-Filter & Suche“ die Filter Alle, Erwähnungen, Moderatoren, Fragen, Links und Emotes hinzu. Ein Filter blendet nicht passende Zeilen nur vorübergehend in deinem Browser aus; beim Schließen des Panels bleibt er aktiv, nichts wird gelöscht und andere Zuschauer sehen keine Änderung. Mit Alle stellst du den vollständigen sichtbaren Chat wieder her.',
      liveChatSearch: 'Fügt dem über die Chat-Fußleiste geöffneten Panel „Chat-Filter & Suche“ eine einfache lokale Suche mit Vorheriger-/Nächster-Navigation hinzu. Gib einen beliebigen Teil des sichtbaren Benutzernamens, Twitch-Logins oder Nachrichtentexts direkt ein; Präfixe oder besondere Suchsyntax sind nicht nötig. Groß-/Kleinschreibung wird ignoriert. Beim Schließen bleibt die Suche aktiv; sie erfasst nur Nachrichten der aktuellen Seite und sendet keine Anfrage an Twitch oder BetterTwitch.',
      saferLinks: 'Zeigt neben externen Chat-Links die tatsächliche Zieldomain und markiert verkürzte, numerische IP-, Punycode- oder anderweitig irreführend wirkende Hosts mit einem Warnhinweis. Beim Anklicken eines markierten Links wird vor dem Öffnen nachgefragt. Die lokale Prüfung betrachtet nur den URL-Text; sie lädt das Ziel nicht herunter und garantiert dessen Sicherheit nicht.',
      dashboard: 'Fügt ein Live-Dashboard für Aktivitäten hinzu, die BetterTwitch nach dem Laden im aktuellen Chatraum beobachtet. Es zeigt aktuelle und höchste Nachrichten pro Minute, Gesamtzahl, eindeutige und kürzlich aktive Chatter, Durchschnitt, Sitzungsdauer, ein 60-Sekunden-Diagramm, die acht aktivsten Chatter mit optionalen Avataren und die sechs häufigsten Twitch-Emotes. Das sind lokale Sitzungsdaten, keine historischen Twitch-Analysen; Neuladen oder Raumwechsel setzt alles zurück.',
      saferSending: 'Ergänzt Schutzmechanismen im Twitch-Eingabefeld: Die erste identische Nachricht innerhalb von 8 Sekunden wird blockiert; erneutes Senden innerhalb von 3 Sekunden bestätigt das beabsichtigte Duplikat. Vor Einfügungen ab 280 Zeichen oder 4 Zeilen wird gewarnt, Verbindungsstatus wird verfolgt, bis zu 12 Sekunden auf dein eigenes Twitch-Chat-Echo gewartet und unbestätigter Text wiederhergestellt. Dauerhafte Wiederherstellung benötigt „Entwürfe pro Kanal behalten“; Twitch kann Nachrichten trotz dieser Prüfungen ablehnen, moderieren oder nachträglich entfernen.',
    },
    ru: {
      language: 'Определяет язык всех надписей, кнопок, сообщений и подсказок BetterTwitch. Вариант «Автоопределение» использует первый поддерживаемый язык из настроек браузера; если подходящего языка нет, включается английский. На этот же язык переводятся сообщения чата. После изменения страница перезагружается, чтобы весь интерфейс обновился одинаково.',
      markSingleDeletes: 'Когда Twitch сообщает об удалении одного конкретного сообщения, BetterTwitch оставляет его видимым и помечает зачёркиванием и значком корзины. Отключите настройку, чтобы вернуть обычное поведение Twitch, при котором удалённый текст исчезает. Работает только с удалениями, полученными после загрузки BetterTwitch; старые или уже исчезнувшие сообщения восстановить невозможно.',
      markTimeouts: 'Когда пользователь получает таймаут или бан, BetterTwitch оставляет его сообщения, которые сейчас видны в чате, и помечает их удалёнными. Эта настройка действует отдельно от удаления одного сообщения и полной очистки комнаты. Она не может вернуть сообщения, исчезнувшие до загрузки скрипта или уже удалённые со страницы.',
      markFullClear: 'Когда модератор полностью очищает чат, BetterTwitch оставляет сообщения, которые сейчас находятся на экране, и помечает каждое удалённым. Отключите настройку, чтобы Twitch очищал видимый чат обычным способом. Сообщения до загрузки BetterTwitch и уже удалённые со страницы сообщения восстановить невозможно.',
      chatWidthEnabled: 'Включает пользовательскую ширину чата BetterTwitch. Пока настройка активна, колонка чата использует указанную ниже ширину, а область видео уменьшается, чтобы освободить место. Отключение возвращает стандартную адаптивную компоновку Twitch. Меняется только расположение элементов, а не размер текста или разрешение трансляции.',
      chatWidthPx: 'Точно задаёт ширину колонки чата от 340 до 1200 пикселей. Ползунок ничего не меняет, пока не включена настройка «Расширить панель чата». Чем больше значение, тем больше места у сообщений и тем меньше ширины остаётся видео; уменьшите значение, если плеер стал слишком узким.',
      hideBadges: 'Убирает маленькие значки подписчика, модератора, VIP, владельца канала, основателя и другие значки рядом с именами. Это только визуальное изменение в вашем браузере: роли и значки пользователей на Twitch остаются прежними. BetterTwitch по-прежнему может использовать предоставленные Twitch метаданные значков для подсветки модераторов и VIP.',
      showAvatars: 'Показывает изображение профиля Twitch перед именем участника в чате и рядом с именем в рейтинге панели статистики. Недостающие аватары BetterTwitch запрашивает пакетами напрямую у GraphQL-сервиса Twitch и кеширует на время сеанса страницы; имена не передаются на сервер BetterTwitch. Отключите настройку для более компактного чата без запросов аватаров.',
      msgSeparators: 'Добавляет тонкую горизонтальную линию между соседними сообщениями чата. Меняется только внешний вид; разделители помогают следить за быстрым или плотно заполненным чатом. Отключение возвращает обычный непрерывный список сообщений Twitch.',
      hideLeaderboard: 'Скрывает только анимированную карусель лидеров над чатом. В зависимости от канала в ней показываются лидеры по Bits, подарочным подпискам или другой поддержке. Закреплённые сообщения, важные карточки, уведомления чата и поле ввода остаются видимыми. Карусель скрывается только в вашем браузере.',
      hideCommunityHighlights: 'Скрывает блок важных карточек Twitch над списком сообщений, включая закреплённые сообщения и другие карточки в том же блоке. Ничего не открепляется и не удаляется, остальные зрители продолжают всё видеть. Карусель лидеров настраивается отдельно и не затрагивается.',
      autoQuality: 'Сохраняет в Twitch предпочтение качества «Исходное/Chunked», чтобы плеер пытался выбрать самое высокое качество, доступное у текущей трансляции. Настройка не может создать исходное качество, если стример его не предоставляет, а Twitch всё равно может менять качество из-за состояния плеера или соединения. Более высокое качество может расходовать больше трафика.',
      autoClaimPoints: 'Автоматически нажимает на бонусный сундук баллов канала, когда Twitch показывает его в чате. Получается только бесплатный бонус: BetterTwitch не тратит баллы, не выбирает награды, не подписывается на каналы и не участвует в прогнозах. Если Twitch не показывает доступный сундук, нажимать нечего.',
      autoClaimDrops: 'Автоматически нажимает видимую кнопку «Получить» для Twitch Drops, когда она появляется на поддерживаемой странице Twitch. BetterTwitch не может выполнить условия участия, привязать сторонние аккаунты, открыть другой сайт или получить награду, которую Twitch ещё считает заблокированной. Если кампания требует дополнительных действий, проверьте инвентарь Drops на Twitch.',
      mentionSound: 'Воспроизводит выбранный звук BetterTwitch, когда другой пользователь упоминает имя вашей текущей учётной записи Twitch. Собственные сообщения игнорируются, а частые сигналы ограничиваются, чтобы серия упоминаний не создавала непрерывный шум. Большинство браузеров разрешает звук уведомлений только после первого клика или другого взаимодействия со страницей.',
      mentionReplyPing: 'Также воспроизводит звук упоминания, когда Twitch определяет сообщение как прямой ответ на одно из ваших сообщений, даже если в тексте ответа нет вашего имени. Работает только при включённом параметре «Звук при @упоминании»; отключение основного звука отключает и сигналы ответов. Используются тот же звук и та же громкость.',
      pingSound: 'Выбирает один из 18 встроенных коротких звуков для упоминаний и прямых ответов. Для новой установки и после сброса по умолчанию используется «Сообщение»; сохранённый выбор не изменяется. Кнопка «Тест» воспроизводит текущий вариант. Звук создаётся локально с постоянной высотой тона и не меняет аудио Twitch.',
      pingVolume: 'Регулирует только громкость звуков BetterTwitch для упоминаний и ответов от 0 % до 100 %. Для новой установки и после сброса используется 35 %; сохранённый уровень не изменяется. Используйте кнопку «Тест» для проверки. Громкость трансляции, рекламы Twitch, браузера и операционной системы не меняется.',
      mentionHighlight: 'Добавляет цветной фон и боковую метку к сообщениям, в которых упомянуто имя вашей текущей учётной записи Twitch. Собственные сообщения не считаются входящими упоминаниями. Отключение убирает только визуальную подсветку; у панели упоминаний и звукового уведомления есть отдельные настройки.',
      highlightMods: 'Добавляет цветной фон и боковую метку к сообщениям модераторов канала. BetterTwitch использует данные роли или значка, прикреплённые Twitch к сообщению; если распознаваемых метаданных модератора нет, подсветить сообщение невозможно. Меняется только внешний вид, никаких прав модератора настройка не предоставляет.',
      highlightVips: 'Добавляет цветной фон и боковую метку к сообщениям VIP канала. BetterTwitch использует данные роли или значка, прикреплённые Twitch к сообщению; если распознаваемых метаданных VIP нет, подсветить сообщение невозможно. Меняется только внешний вид, статус пользователя на Twitch не изменяется.',
      mentionColor: 'Выбирает цвет фона, рамки и боковой метки для сообщений, в которых вас упоминают. Выбор цвета ничего не меняет, пока не включена настройка «Подсвечивать @упоминания». Используйте цвет, который хорошо читается в вашей теме Twitch; цвета модераторов, VIP, новых и вернувшихся участников не меняются.',
      modColor: 'Выбирает цвет фона, рамки и боковой метки для сообщений модераторов. Выбор цвета ничего не меняет, пока не включена настройка «Подсвечивать модераторов». Меняется только локальная подсветка, а не цвет имени или значок модератора на Twitch.',
      vipColor: 'Выбирает цвет фона, рамки и боковой метки для сообщений VIP. Выбор цвета ничего не меняет, пока не включена настройка «Подсвечивать VIP». Меняется только локальная подсветка, а не цвет имени или значок VIP на Twitch.',
      highlightFirstChatters: 'Подсвечивает сообщение и добавляет метку ВПЕРВЫЕ, когда Twitch отмечает его как первое сообщение этого пользователя на канале. BetterTwitch не может определить такой статус по истории чата, поэтому функция работает только при наличии метаданных первого сообщения от Twitch. Метка отображается на выбранном языке BetterTwitch.',
      highlightReturningChatters: 'Подсвечивает сообщение и добавляет метку ВЕРНУЛСЯ, когда Twitch отмечает автора как вернувшегося участника. BetterTwitch не может вычислить этот статус самостоятельно, поэтому функция работает только при наличии соответствующих метаданных Twitch. Метка отображается на выбранном языке BetterTwitch.',
      firstChatterColor: 'Выбирает цвет фона, рамки и метки ВПЕРВЫЕ для новых участников. Цвет применяется только при включённой настройке «Подсвечивать новых участников» и только когда Twitch определяет сообщение как первое. Цвет имени пользователя на Twitch не меняется.',
      returningChatterColor: 'Выбирает цвет фона, рамки и метки ВЕРНУЛСЯ для вернувшихся участников. Цвет применяется только при включённой настройке «Подсвечивать вернувшихся участников» и только когда Twitch определяет автора как вернувшегося. Цвет имени пользователя на Twitch не меняется.',
      fixNameColors: 'Проверяет контраст цветов имён на тёмном фоне чата и осветляет только те цвета, которые иначе трудно читать. Имена с достаточным контрастом остаются без изменений. Эта локальная коррекция читаемости не меняет сохранённый на Twitch цвет, роль, значок или личность пользователя.',
      copyButton: 'Добавляет действие копирования в панель BetterTwitch, которая появляется при наведении или фокусе на сообщении чата. Нажатие копирует читаемое содержимое автора и сообщения без кнопок панели и элементов перевода BetterTwitch. Отключение удаляет только действие копирования и не изменяет сообщение Twitch.',
      accentColor: 'Задаёт основной цвет включённых переключателей, активных кнопок, заголовков, рамок, индикаторов фокуса и других элементов BetterTwitch. Изменение сразу применяется ко всем панелям BetterTwitch. Сама страница Twitch, имена пользователей, подсветка сообщений и видеоплеер не перекрашиваются.',
      hideCommands: 'Локально скрывает сообщения, видимый текст которых начинается с восклицательного знака, например «!song» или «!commands». Настройка не запрещает отправку команд, не удаляет их на Twitch и не распознаёт команды без видимого символа ! в начале. После отключения подходящие сообщения снова отображаются.',
      hideBots: 'Локально скрывает сообщения от имён, указанных в поле списка ботов ниже. Регистр букв не учитывается, но имя должно быть написано правильно. На Twitch ничего не блокируется, не отправляется в жалобы, не выдаётся таймаут и не удаляется; остальные зрители продолжают видеть эти сообщения.',
      botNames: 'Введите логины Twitch, которые должна распознавать настройка «Скрывать сообщения ботов», разделяя их запятыми, например: nightbot, streamelements. Не добавляйте символы @, украшения отображаемого имени или ссылки на профиль. Поле работает только при включённом скрытии ботов; имя с ошибкой не совпадёт.',
      inlineTranslate: 'Добавляет действие перевода в панель каждого сообщения. Текст конкретного сообщения отправляется напрямую в публичный сервис перевода Google только после нажатия кнопки и переводится на выбранный или автоматически определённый язык BetterTwitch. Результат кешируется на время сеанса страницы; его можно скопировать, запросить повторно или переключить на оригинал. Сервер BetterTwitch не используется.',
      mentionInbox: 'Добавляет панель упоминаний, которая собирает входящие сообщения с вашим именем и прямые ответы на ваши сообщения. В панели есть счётчик непрочитанных, поиск, необязательный контекст и кнопка перехода, пока исходное сообщение ещё видно. Записываются только сообщения, полученные при открытой странице; перезагрузка, закрытие или смена комнаты очищает список сеанса.',
      mentionContextMessages: 'Определяет, сколько обычных сообщений сохраняется до и после каждого элемента панели упоминаний: 0, 1, 2 или 3 с каждой стороны. Значение ничего не меняет, пока панель упоминаний отключена. Чем больше число, тем больше строк показывается и хранится в памяти; на сервер они не отправляются.',
      viewerHovercards: 'Показывает при наведении на имя в чате информационную карточку BetterTwitch с аватаром зрителя Twitch. Карточка содержит только данные текущего сеанса страницы: количество сообщений, время первого появления, упоминания и самую частую эмоцию. Аватар запрашивается напрямую у Twitch и кешируется на время страницы; это не история аккаунта, а перезагрузка или смена комнаты сбрасывает собранную статистику.',
      preserveDrafts: 'Сохраняет незавершённый текст отдельно для каждого канала Twitch в этом браузере и восстанавливает его при возвращении. Локально хранится до 30 черновиков каналов, каждый не длиннее 5 000 символов; подтверждённая отправка или ручная очистка поля удаляет черновик. Ничего не загружается на BetterTwitch, а отключение настройки очищает сохранённые черновики каналов.',
      sentMessageHistory: 'Хранит до 50 сообщений, отправленных вами в текущем сеансе страницы, и позволяет вызывать их стрелками вверх и вниз. Просмотр истории начинается только когда текстовый курсор находится в начале или конце поля ввода, поэтому обычное перемещение курсора продолжает работать. История хранится только в памяти и очищается при перезагрузке.',
      characterCounter: 'Показывает текущее количество символов прямо перед кнопкой настроек чата Twitch более крупным и читаемым текстом. Счётчик сравнивает длину с лимитом, обнаруженным у Twitch, и использует запасное значение 500 символов, если лимит найти не удалось. Это только подсказка: текст не обрезается, и отказ Twitch в отправке не предотвращается.',
      appearanceProfile: 'Выбирает готовый профиль читаемости чата. Комфортный использует сбалансированные интервалы, Компактный показывает больше сообщений, а Доступный увеличивает текст, высоту строк, аватары и кнопки действий и усиливает контраст. Меняется только локальное оформление BetterTwitch; профиль переключается сразу и не требует перезагрузки.',
      spamCompression: 'Находит три и более одинаковых сообщения, пришедших за 12 секунд, и сворачивает повторы в одну строку со счётчиком. Нажмите на счётчик, чтобы показать или снова скрыть все исходные сообщения; ничего не удаляется и не теряется. Группы существуют только в текущем видимом чате и сбрасываются при смене комнаты, перезагрузке или отключении функции.',
      quickChatFilters: 'Добавляет в открываемую из нижней части чата панель «Фильтры и поиск» варианты Все, Упоминания, Модераторы, Вопросы, Ссылки и Эмоции. Фильтр временно скрывает неподходящие строки только в вашем браузере; закрытие панели не отменяет его, сообщения не удаляются, а другие зрители не видят изменений. Нажмите Все, чтобы вернуть полный видимый чат.',
      liveChatSearch: 'Добавляет в открываемую из нижней части чата панель «Фильтры и поиск» простой локальный поиск с переходами к предыдущему и следующему совпадению. Введите любую часть видимого имени, логина Twitch или текста сообщения напрямую - префиксы и специальный синтаксис не нужны. Регистр букв не учитывается. После закрытия панели поиск остаётся активным; запросы никуда не отправляются, а поиск охватывает только сообщения текущей страницы.',
      saferLinks: 'Показывает настоящий домен назначения рядом с внешними ссылками и помечает сокращённые, числовые IP-, Punycode- и другие подозрительно выглядящие адреса предупреждением. Перед открытием отмеченной ссылки запрашивается подтверждение. Локальная проверка анализирует только текст URL, не загружает содержимое сайта и не гарантирует его безопасность.',
      dashboard: 'Добавляет панель текущей активности, которую BetterTwitch наблюдает после загрузки в этой комнате чата. Она показывает текущий и пиковый темп сообщений в минуту, общее число, уникальных и недавно активных участников, средний темп, длительность сеанса, график за 60 секунд, восемь самых активных участников с необязательными аватарами и шесть популярных эмоций Twitch. Это локальная статистика сеанса, а не историческая аналитика Twitch; перезагрузка или смена комнаты сбрасывает её.',
      saferSending: 'Добавляет защиту к полю ввода Twitch: первая идентичная отправка в течение 8 секунд блокируется, а повторная попытка в следующие 3 секунды подтверждает, что дубликат нужен. BetterTwitch предупреждает перед вставкой 280+ символов или 4+ строк, следит за переподключением, до 12 секунд ждёт появления собственного сообщения в чате Twitch и восстанавливает неподтверждённый текст. Для постоянного восстановления нужна настройка «Сохранять черновики по каналам»; Twitch всё равно может отклонить, модерировать или позже удалить сообщение.',
    },
  };

  function settingHelp(key) {
    const lang = currentLang();
    return (SETTING_HELP[lang] && SETTING_HELP[lang][key]) || SETTING_HELP.en[key] || '';
  }

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

  function tf(key, values) {
    return t(key).replace(/\{([a-z]+)\}/gi, (match, name) =>
      Object.prototype.hasOwnProperty.call(values || {}, name) ? values[name] : match
    );
  }

  const VERSION = '2.0.0';
  const PROJECT_URL = 'https://github.com/yaneony/BetterTwitch';
  const AUTHOR_URL = 'https://yaneony.com';
  const STORAGE_KEY = 'BetterTwitch-settings';
  const DRAFTS_STORAGE_KEY = 'BetterTwitch-chat-drafts';
  const MAX_CHAT_PX = 1200;
  const DEFAULT_CHAT_PX = 340;
  const DEFAULT_MESSAGE_LIMIT = 500;
  const MAX_DRAFT_CHANNELS = 30;
  const MAX_SENT_HISTORY = 50;
  const DUPLICATE_WINDOW_MS = 8000;
  const DUPLICATE_CONFIRM_MS = 3000;
  const SEND_CONFIRM_TIMEOUT_MS = 12000;
  const SEND_ECHO_GRACE_MS = 5000;
  const LARGE_PASTE_CHARS = 280;
  const LARGE_PASTE_LINES = 4;
  const SPAM_WINDOW_MS = 12000;
  const SPAM_MIN_MATCHES = 3;
  const APPEARANCE_PROFILES = new Set(['comfortable', 'compact', 'accessible']);
  const PING_SOUND_NAMES = new Set([
    'message', 'pop', 'drop', 'knock', 'glass', 'pluck', 'orbit', 'pixel', 'bell', 'spark',
    'chime', 'doubletap', 'woodblock', 'marble', 'quartz', 'blink', 'ripple', 'chord',
  ]);
  const PING_GAIN_BOOST = 1.15;
  const PING_MASTER_GAIN = 1;
  const COLOR_RE = /^#[0-9a-f]{6}$/i;
  const DEFAULTS = {
    language: 'auto',
    markSingleDeletes: true, markTimeouts: true, markFullClear: true,
    chatWidthEnabled: true, chatWidthPx: 400,
    hideBadges: false, showAvatars: false, msgSeparators: false,
    hideLeaderboard: false, hideCommunityHighlights: false,
    autoClaimPoints: true, autoClaimDrops: true, autoQuality: false,
    mentionSound: true, mentionReplyPing: true,
    pingSound: 'message', pingVolume: 0.35,
    mentionHighlight: true, highlightMods: false, highlightVips: false,
    mentionColor: '#e31337', modColor: '#00ad03', vipColor: '#e005b9',
    highlightFirstChatters: true, highlightReturningChatters: true,
    firstChatterColor: '#9147ff', returningChatterColor: '#3cc8ff',
    fixNameColors: false, copyButton: false,
    accentColor: '#e31337',
    hideCommands: false, hideBots: false,
    botNames: 'nightbot,streamelements,moobot,streamlabs,fossabot,wizebot,soundalerts',
    inlineTranslate: false, mentionInbox: true, mentionContextMessages: 2,
    viewerHovercards: true,
    preserveDrafts: true, sentMessageHistory: true, characterCounter: true,
    spamCompression: true,
    quickChatFilters: true, liveChatSearch: true, saferLinks: true,
    appearanceProfile: 'comfortable',
    dashboard: true,
    saferSending: true,
  };

  const BOOLEAN_SETTINGS = new Set([
    'markSingleDeletes', 'markTimeouts', 'markFullClear',
    'chatWidthEnabled', 'hideBadges', 'showAvatars', 'msgSeparators',
    'hideLeaderboard', 'hideCommunityHighlights',
    'autoClaimPoints', 'autoClaimDrops', 'autoQuality',
    'mentionSound', 'mentionReplyPing', 'mentionHighlight', 'highlightMods', 'highlightVips',
    'highlightFirstChatters', 'highlightReturningChatters',
    'fixNameColors', 'copyButton', 'hideCommands', 'hideBots',
    'inlineTranslate', 'mentionInbox', 'viewerHovercards',
    'preserveDrafts', 'sentMessageHistory', 'characterCounter',
    'spamCompression',
    'quickChatFilters', 'liveChatSearch', 'saferLinks',
    'dashboard',
    'saferSending',
  ]);
  const COLOR_SETTINGS = new Set([
    'mentionColor', 'modColor', 'vipColor', 'firstChatterColor', 'returningChatterColor', 'accentColor',
  ]);

  function isPlainObject(value) {
    if (!value || Object.prototype.toString.call(value) !== '[object Object]') return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  function validSettingValue(key, value) {
    if (BOOLEAN_SETTINGS.has(key)) return typeof value === 'boolean';
    if (COLOR_SETTINGS.has(key)) return typeof value === 'string' && COLOR_RE.test(value);
    if (key === 'language') return value === 'auto' || value === 'en' || value === 'de' || value === 'ru';
    if (key === 'pingSound') return typeof value === 'string' && PING_SOUND_NAMES.has(value);
    if (key === 'chatWidthPx') return typeof value === 'number' && Number.isFinite(value) && value >= DEFAULT_CHAT_PX && value <= MAX_CHAT_PX;
    if (key === 'pingVolume') return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
    if (key === 'mentionContextMessages') return Number.isInteger(value) && value >= 0 && value <= 3;
    if (key === 'botNames') return typeof value === 'string' && value.length <= 2000;
    if (key === 'appearanceProfile') return typeof value === 'string' && APPEARANCE_PROFILES.has(value);
    return false;
  }

  function normalizeConfig(value) {
    const normalized = Object.assign({}, DEFAULTS);
    if (!isPlainObject(value)) return normalized;
    for (const key of Object.keys(DEFAULTS)) {
      if (!Object.prototype.hasOwnProperty.call(value, key) || !validSettingValue(key, value[key])) continue;
      if (key === 'chatWidthPx') normalized[key] = Math.round(value[key] / 10) * 10;
      else normalized[key] = value[key];
    }
    return normalized;
  }

  function parseSettingsJSON(text) {
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { return null; }
    if (!isPlainObject(parsed)) return null;
    for (const key of Object.keys(parsed)) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key) && !validSettingValue(key, parsed[key])) return null;
    }
    return normalizeConfig(parsed);
  }

  function loadConfig() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}
    return normalizeConfig(saved);
  }

  const CONFIG = loadConfig();

  function saveConfig() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(CONFIG)); } catch (e) {} }

  function chatWidth() { return CONFIG.chatWidthEnabled ? CONFIG.chatWidthPx + 'px' : null; }

  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  let mentionPatternWord = '', mentionPattern = null;

  function isMention(text, word) {
    if (!word) return false;
    const normalizedWord = String(word).toLowerCase();
    if (normalizedWord !== mentionPatternWord || !mentionPattern) {
      mentionPatternWord = normalizedWord;
      mentionPattern = new RegExp('(^|[^\\w])@?' + escapeRegex(normalizedWord) + '($|[^\\w])', 'i');
    }
    return mentionPattern.test(String(text || ''));
  }

  async function fetchWithTimeout(url, options, timeoutMs) {
    if (typeof AbortController !== 'function') return fetch(url, options || undefined);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs || NETWORK_TIMEOUT_MS);
    try {
      return await fetch(url, Object.assign({}, options || {}, { signal: controller.signal }));
    } finally {
      clearTimeout(timer);
    }
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
    const tags = parseTags(line);
    return {
      kind: 'msg',
      id: tags['target-msg-id'] || '',
      roomKey: tags['room-id'] || '',
      login: (tags.login || '').toLowerCase(),
      text: trailing(line),
    };
  }

  function parseClearChat(line) {
    const tags = parseTags(line);
    const user = trailing(line);
    return user
      ? { kind: 'user', roomKey: tags['room-id'] || '', login: user.toLowerCase() }
      : { kind: 'all', roomKey: tags['room-id'] || '' };
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
        if (cmd === 'CLEARMSG' && CONFIG.markSingleDeletes) {
          const task = parseClearMsg(line);
          enqueue(task); changed = true; continue;
        }
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
      const filteredData = keep.join('\r\n') + '\r\n';
      return new Proxy(event, {
        get(target, prop) {
          if (prop === 'data') return filteredData;
          const value = Reflect.get(target, prop, target);
          return typeof value === 'function' ? value.bind(target) : value;
        },
      });
    } catch (e) { console.warn('[BetterTwitch] filter error:', e); return event; }
  }

  let currentChatSocket = null;
  let chatConnectedOnce = false;
  let chatConnectionState = 'connecting';

  function trackChatSocket(ws, addListener) {
    currentChatSocket = ws;
    addListener('open', () => {
      if (currentChatSocket !== ws) return;
      chatConnectedOnce = true;
      setChatConnectionState('connected');
    });
    addListener('close', () => {
      if (currentChatSocket === ws && chatConnectedOnce) setChatConnectionState('reconnecting');
    });
    addListener('error', () => {
      if (currentChatSocket === ws && chatConnectedOnce) setChatConnectionState('reconnecting');
    });
  }

  function hook(ws) {
    const origAdd = ws.addEventListener.bind(ws);
    const origRemove = ws.removeEventListener.bind(ws);
    const eventCache = new WeakMap();
    const listenerWrappers = new WeakMap();
    trackChatSocket(ws, origAdd);

    const captureOf = (opts) => {
      try { return typeof opts === 'boolean' ? opts : !!(opts && opts.capture); } catch (e) { return false; }
    };
    const processEvent = (event) => {
      if (eventCache.has(event)) return eventCache.get(event);
      try { ingest(event.data); } catch (e) {}
      const out = filterEvent(event);
      eventCache.set(event, out);
      return out;
    };
    const wrapperFor = (listener, capture) => {
      let byCapture = listenerWrappers.get(listener);
      if (!byCapture) { byCapture = new Map(); listenerWrappers.set(listener, byCapture); }
      if (byCapture.has(capture)) return byCapture.get(capture);
      const wrapped = function (event) {
        const out = processEvent(event);
        if (!out) return;
        if (typeof listener === 'function') return listener.call(this, out);
        if (listener && typeof listener.handleEvent === 'function') return listener.handleEvent(out);
      };
      byCapture.set(capture, wrapped);
      return wrapped;
    };

    ws.addEventListener = function (type, listener, opts) {
      if (type === 'message' && listener && (typeof listener === 'function' || typeof listener === 'object')) {
        return origAdd(type, wrapperFor(listener, captureOf(opts)), opts);
      }
      return origAdd(type, listener, opts);
    };
    ws.removeEventListener = function (type, listener, opts) {
      if (type === 'message' && listener && (typeof listener === 'function' || typeof listener === 'object')) {
        const byCapture = listenerWrappers.get(listener);
        const wrapped = byCapture && byCapture.get(captureOf(opts));
        return origRemove(type, wrapped || listener, opts);
      }
      return origRemove(type, listener, opts);
    };
    let _on = null, _wrapped = null;
    Object.defineProperty(ws, 'onmessage', {
      configurable: true,
      get() { return _on; },
      set(fn) {
        if (_wrapped) origRemove('message', _wrapped);
        _on = fn;
        if (typeof fn === 'function') {
          _wrapped = function (event) {
            const out = processEvent(event);
            if (out) return fn.call(this, out);
          };
          origAdd('message', _wrapped);
        } else { _wrapped = null; }
      },
    });
  }

  const Native = window.WebSocket;

  function PatchedWS(...args) {
    if (!new.target) return Native(...args);
    const ws = Reflect.construct(Native, args, new.target);
    try { if (String(args[0]).includes('irc-ws.chat.twitch.tv')) hook(ws); } catch (e) {}
    return ws;
  }

  PatchedWS.prototype = Native.prototype;
  PatchedWS.CONNECTING = Native.CONNECTING; PatchedWS.OPEN = Native.OPEN;
  PatchedWS.CLOSING = Native.CLOSING; PatchedWS.CLOSED = Native.CLOSED;
  Object.setPrototypeOf(PatchedWS, Native);
  window.WebSocket = PatchedWS;

  let myLogin = '', myLoginCookie = null;

  function getMyLogin() {
    const m = document.cookie.match(/(?:^|;\s*)login=([^;]+)/);
    const raw = m ? m[1] : '';
    if (raw === myLoginCookie) return myLogin;
    myLoginCookie = raw;
    try { myLogin = raw ? decodeURIComponent(raw).toLowerCase() : ''; } catch (e) { myLogin = ''; }
    return myLogin;
  }

  // Notes are [frequency, delay, duration, level, optional wave, optional stereo pan].
  const PING_SOUNDS = {
    message: { wave: 'triangle', filter: ['highpass', 420, 700], notes: [[784, 0, .15, .64, 'triangle', -.25], [1047, .11, .24, .7, 'sine', .25], [1568, .125, .18, .28, 'sine', 0]] },
    pop: { wave: 'sine', filter: ['highpass', 300, 620], notes: [[520, 0, .13, .7, 'sine', -.2], [1040, .045, .15, .42, 'triangle', .3]] },
    drop: { wave: 'sine', filter: ['lowpass', 2400, 1100], notes: [[980, 0, .2, .67, 'sine', -.25], [1470, .025, .16, .31, 'triangle', .25]] },
    knock: { wave: 'triangle', filter: ['lowpass', 1300, 700], notes: [[280, 0, .1, .68, 'triangle', -.2], [720, .005, .07, .3, 'sine', .2], [260, .16, .12, .64, 'triangle', .2]] },
    glass: { wave: 'sine', filter: ['highpass', 650, 1100], notes: [[1319, 0, .3, .62, 'sine', -.45], [1760, .025, .34, .48, 'triangle', .45], [2637, .06, .28, .26, 'sine', 0]] },
    pluck: { wave: 'triangle', filter: ['highpass', 360, 650], notes: [[659, 0, .11, .58, 'triangle', -.45], [831, .085, .12, .62, 'triangle', 0], [988, .17, .16, .66, 'sine', .45]] },
    orbit: { wave: 'sine', filter: ['bandpass', 520, 1800], notes: [[700, 0, .22, .6, 'sine', -.65], [1080, .075, .24, .64, 'triangle', .65], [1620, .145, .18, .27, 'sine', 0]] },
    pixel: { wave: 'square', filter: ['lowpass', 2100, 1500], notes: [[659, 0, .07, .48, 'square', -.35], [988, .075, .08, .54, 'square', .35], [1319, .16, .13, .58, 'triangle', 0]] },
    bell: { wave: 'triangle', filter: ['highpass', 340, 620], notes: [[880, 0, .34, .66, 'triangle', -.3], [1320, .015, .38, .38, 'sine', .3], [660, .24, .3, .58, 'triangle', 0]] },
    spark: { wave: 'triangle', filter: ['highpass', 760, 1500], notes: [[1175, 0, .09, .56, 'triangle', -.5], [1568, .065, .12, .64, 'sine', .5], [2093, .14, .18, .52, 'triangle', 0]] },
    chime: { wave: 'triangle', filter: ['highpass', 430, 780], notes: [[988, 0, .28, .64, 'triangle', -.35], [1319, .09, .3, .6, 'sine', .35], [1976, .11, .18, .24, 'sine', 0]] },
    doubletap: { wave: 'triangle', filter: ['highpass', 380, 720], notes: [[880, 0, .1, .66, 'triangle', -.35], [1320, .015, .08, .3, 'sine', .35], [880, .2, .12, .68, 'triangle', .35], [1320, .215, .1, .32, 'sine', -.35]] },
    woodblock: { wave: 'triangle', filter: ['lowpass', 1500, 850], notes: [[360, 0, .09, .68, 'triangle', -.25], [720, .003, .055, .32, 'sine', .25], [480, .14, .1, .6, 'triangle', 0]] },
    marble: { wave: 'sine', filter: ['bandpass', 420, 1600], notes: [[620, 0, .14, .64, 'sine', -.45], [930, .055, .16, .6, 'triangle', .45], [1240, .12, .14, .34, 'sine', 0]] },
    quartz: { wave: 'sine', filter: ['highpass', 820, 1450], notes: [[1480, 0, .22, .58, 'sine', -.5], [1865, .035, .25, .64, 'triangle', .5], [2489, .08, .18, .3, 'sine', 0]] },
    blink: { wave: 'triangle', filter: ['highpass', 560, 980], notes: [[1047, 0, .075, .62, 'triangle', -.4], [1568, .08, .095, .66, 'sine', .4]] },
    ripple: { wave: 'sine', filter: ['highpass', 390, 760], notes: [[659, 0, .11, .56, 'sine', -.55], [784, .075, .12, .6, 'triangle', 0], [988, .155, .15, .64, 'sine', .55]] },
    chord: { wave: 'triangle', filter: ['highpass', 320, 620], notes: [[659, 0, .28, .55, 'triangle', -.5], [831, .008, .3, .58, 'sine', 0], [988, .016, .3, .62, 'triangle', .5]] },
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
      const preset = PING_SOUNDS[CONFIG.pingSound] || PING_SOUNDS.message;
      const vol = Math.max(0.0001, Math.min(1, CONFIG.pingVolume));
      const t0 = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.gain.setValueAtTime(PING_MASTER_GAIN, t0);
      let masterOutput = master;
      let compressor = null;
      if (audioCtx.createDynamicsCompressor) {
        compressor = audioCtx.createDynamicsCompressor();
        compressor.threshold.value = -4;
        compressor.knee.value = 2;
        compressor.ratio.value = 3;
        compressor.attack.value = .003;
        compressor.release.value = .18;
        master.connect(compressor);
        masterOutput = compressor;
      }
      masterOutput.connect(audioCtx.destination);
      preset.notes.forEach(([frequency, delay, duration, level, wave, pan]) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = wave || preset.wave || 'sine';
        const t = t0 + delay;
        const peak = Math.max(0.0001, Math.min(.95, vol * level * PING_GAIN_BOOST));
        const attack = Math.min(.006, duration * .18);
        if (o.frequency.setValueAtTime) o.frequency.setValueAtTime(frequency, t);
        else o.frequency.value = frequency;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + attack);
        g.gain.exponentialRampToValueAtTime(Math.max(.0001, peak * .16), Math.max(t + attack, t + duration * .55));
        g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        let output = g;
        if (preset.filter && audioCtx.createBiquadFilter) {
          const filter = audioCtx.createBiquadFilter();
          filter.type = preset.filter[0];
          filter.frequency.setValueAtTime(preset.filter[1], t);
          filter.frequency.exponentialRampToValueAtTime(preset.filter[2], t + duration);
          output = output.connect(filter);
        }
        if (Number.isFinite(pan) && audioCtx.createStereoPanner) {
          const panner = audioCtx.createStereoPanner();
          panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), t);
          output = output.connect(panner);
        }
        o.connect(g);
        output.connect(master);
        o.start(t); o.stop(t + duration + .02);
      });
      const lastNoteEnd = preset.notes.reduce((end, note) => Math.max(end, note[1] + note[2]), 0);
      setTimeout(() => {
        try { master.disconnect(); } catch (e) {}
        try { if (compressor) compressor.disconnect(); } catch (e) {}
      }, Math.ceil((lastNoteEnd + .25) * 1000));
    } catch (e) {}
  }

  ['click', 'keydown'].forEach(ev => document.addEventListener(ev, unlockAudio, { once: true, passive: true }));

  function esc(s) { return (s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  const MAX_MESSAGE_META = 500;
  const MAX_CHAT_HISTORY = 250;
  const MAX_USER_PROFILES = 1000;
  const MAX_PROFILE_EMOTES = 100;
  const MAX_DASHBOARD_EMOTES = 1000;
  const MAX_HISTORY_CHANNELS = 30;
  const MAX_DELETE_TASKS = 500;
  const CHAT_HYDRATION_SWEEPS = 6;
  const NETWORK_TIMEOUT_MS = 15000;
  const RESERVED_TWITCH_ROUTES = new Set([
    'directory', 'downloads', 'drops', 'inventory', 'jobs', 'login', 'p', 'search',
    'settings', 'signup', 'subscriptions', 'turbo', 'wallet',
  ]);
  const mentions = [];
  const chatHistory = [];
  const recentMessageMeta = [];
  const messageMetaById = new Map();
  const lineMeta = new WeakMap();
  const userProfiles = new Map();
  const dashboardStats = {
    msgTimes: [],
    msgHead: 0,
    chatters: new Map(),
    emotes: new Map(),
    startedAt: 0,
    totalMessages: 0,
    totalEmotes: 0,
    peakMpm: 0,
  };
  let mentionUnread = 0;
  let inboxOpen = false, inboxQuery = '', inboxNotice = '';
  let dashboardOpen = false, dashboardTimer = null, dashPanel = null;
  let activeRoomKey = '';
  const spamGroupsBySignature = new Map();
  let spamPruneCounter = 0;
  let spamCompressionActive = CONFIG.spamCompression;
  let chatControlPanel = null, chatControlOpen = false, chatControlSignature = '';
  let activeChatFilter = 'all';
  let chatSearchQuery = '', chatSearchMatches = [], chatSearchIndex = -1, chatSearchTimer = null;

  function emoteUrl(id) { return 'https://static-cdn.jtvnw.net/emoticons/v2/' + id + '/default/dark/2.0'; }
  function chatterColor(value) { return COLOR_RE.test(value || '') ? value : 'var(--bt-accent,#e31337)'; }

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

  function ircChannel(line) {
    const match = stripTagsAndPrefix(line).match(/^[A-Z0-9]+ #([^\s:]+)/i);
    return match ? match[1].toLowerCase() : '';
  }

  function topMapEntry(map, countOf) {
    let best = null, bestCount = 0;
    for (const [key, value] of map) {
      const count = countOf ? countOf(value) : value;
      if (count > bestCount) { best = [key, value]; bestCount = count; }
    }
    return best;
  }

  function resetRoomCaches() {
    resetSpamCompression();
    chatHistory.length = 0;
    recentMessageMeta.length = 0;
    messageMetaById.clear();
    userProfiles.clear();
    clearTimeout(chatSearchTimer);
    chatSearchTimer = null;
    chatSearchMatches = [];
    chatSearchIndex = -1;
    dashboardStats.msgTimes.length = 0;
    dashboardStats.msgHead = 0;
    dashboardStats.chatters.clear();
    dashboardStats.emotes.clear();
    dashboardStats.startedAt = 0;
    dashboardStats.totalMessages = 0;
    dashboardStats.totalEmotes = 0;
    dashboardStats.peakMpm = 0;
    if (dashboardOpen) renderDashboard();
  }

  function ensureRoom(roomKey) {
    if (roomKey && activeRoomKey && roomKey !== activeRoomKey) {
      resetRoomCaches();
      activeRoomKey = roomKey;
    } else if (roomKey && !activeRoomKey) {
      activeRoomKey = roomKey;
    }
  }

  function rememberMessageMeta(meta) {
    recentMessageMeta.push(meta);
    if (meta.id) messageMetaById.set(meta.id, meta);
    while (recentMessageMeta.length > MAX_MESSAGE_META) {
      const removed = recentMessageMeta.shift();
      if (removed.id && messageMetaById.get(removed.id) === removed) messageMetaById.delete(removed.id);
    }
  }

  function addContextAfter(record) {
    let changed = false;
    const wanted = CONFIG.mentionContextMessages;
    if (!wanted) return false;
    for (const mention of mentions) {
      if (mention.roomKey !== record.roomKey || mention.id === record.id || mention.after.length >= wanted) continue;
      mention.after.push(record);
      changed = true;
    }
    return changed;
  }

  function recordUserProfile(record, tags, emotes, mentionedMe) {
    if (!record.login) return;
    let profile = userProfiles.get(record.login);
    if (!profile) {
      if (userProfiles.size >= MAX_USER_PROFILES) userProfiles.delete(userProfiles.keys().next().value);
      profile = {
        login: record.login, user: record.user, color: record.color, firstSeen: record.t, lastSeen: record.t,
        messages: 0, mentions: 0, emotes: new Map(), badges: tags.badges || '',
      };
      userProfiles.set(record.login, profile);
    }
    profile.user = record.user || profile.user;
    profile.color = record.color || profile.color;
    profile.lastSeen = record.t;
    profile.messages++;
    if (mentionedMe) profile.mentions++;
    for (const emote of emotes) {
      if (!profile.emotes.has(emote.id) && profile.emotes.size >= MAX_PROFILE_EMOTES) {
        profile.emotes.delete(profile.emotes.keys().next().value);
      }
      profile.emotes.set(emote.id, {
        name: emote.name,
        count: ((profile.emotes.get(emote.id) || {}).count || 0) + 1,
      });
    }
  }

  function recordDashboardMessage(record) {
    const cutoff = record.t - 60000;
    if (!dashboardStats.startedAt) dashboardStats.startedAt = record.t;
    dashboardStats.totalMessages++;
    dashboardStats.totalEmotes += record.emotes.length;
    dashboardStats.msgTimes.push(record.t);
    dashboardStats.peakMpm = Math.max(dashboardStats.peakMpm, pruneMessageTimes(cutoff));
    if (record.login) {
      if (!dashboardStats.chatters.has(record.login) && dashboardStats.chatters.size >= MAX_USER_PROFILES) {
        dashboardStats.chatters.delete(dashboardStats.chatters.keys().next().value);
      }
      const chatter = dashboardStats.chatters.get(record.login) || {
        name: record.user || record.login,
        color: record.color || '',
        count: 0,
        lastSeen: record.t,
      };
      chatter.name = record.user || chatter.name;
      chatter.color = record.color || chatter.color;
      chatter.count++;
      chatter.lastSeen = record.t;
      dashboardStats.chatters.set(record.login, chatter);
    }
    for (const emote of record.emotes) {
      if (!dashboardStats.emotes.has(emote.id) && dashboardStats.emotes.size >= MAX_DASHBOARD_EMOTES) {
        dashboardStats.emotes.delete(dashboardStats.emotes.keys().next().value);
      }
      const current = dashboardStats.emotes.get(emote.id) || { name: emote.name, count: 0 };
      current.name = emote.name || current.name;
      current.count++;
      dashboardStats.emotes.set(emote.id, current);
    }
  }

  function ingest(data) {
    if (typeof data !== 'string' || data.indexOf('PRIVMSG') === -1) return;
    const now = Date.now();
    const me = getMyLogin();
    for (const line of data.split('\r\n')) {
      if (!line) continue;
      const command = ircCommand(line);
      if (command !== 'PRIVMSG') continue;
      const tags = parseTags(line);
      const login = senderLogin(line) || (tags['display-name'] || '').toLowerCase();
      const text = trailing(line);
      const channel = ircChannel(line);
      const roomKey = tags['room-id'] || channel;
      const emotes = parseEmotes(tags, text);
      ensureRoom(roomKey);

      const record = {
        id: tags.id || '',
        t: now,
        roomKey,
        channel,
        login,
        user: tags['display-name'] || login,
        color: tags.color || '',
        text,
        emotes,
      };
      const replyToMe = me && (tags['reply-parent-user-login'] || '').toLowerCase() === me;
      const nameHit = !!(me && isMention(text, me));
      const mentionedMe = !!(me && login && login !== me && (nameHit || replyToMe));
      if (mentionedMe && CONFIG.mentionSound && (nameHit || (CONFIG.mentionReplyPing && replyToMe))) playPing();
      recordUserProfile(record, tags, emotes, mentionedMe);
      recordDashboardMessage(record);
      if (me && login === me) confirmSentMessage(channel || currentChannelKey(), text);
      const contextChanged = addContextAfter(record);
      const contextCount = CONFIG.mentionContextMessages;
      const before = contextCount ? chatHistory.slice(-contextCount) : [];
      chatHistory.push(record);
      if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.splice(0, chatHistory.length - MAX_CHAT_HISTORY);
      rememberMessageMeta({
        id: record.id,
        login,
        text,
        first: tags['first-msg'] === '1',
        returning: tags['returning-chatter'] === '1',
        record,
        assigned: false,
      });

      let newMention = false;
      if (mentionedMe) {
        mentions.push({
          ...record,
          kind: replyToMe ? 'reply' : 'mention',
          before,
          after: [],
        });
        if (mentions.length > 50) mentions.shift();
        if (!inboxOpen) mentionUnread++;
        updateInboxBadge();
        newMention = true;
      }
      if ((newMention || contextChanged) && inboxOpen) renderInbox();
    }
  }

  function eventInside(event, element) {
    try {
      const path = event.composedPath && event.composedPath();
      if (path && path.includes(element)) return true;
    } catch (e) {}
    return !!(element && element.contains(event.target));
  }

  function setSurfaceOpen(element, open) {
    if (!element) return;
    element.classList.toggle('bt-open', !!open);
    element.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function messagesPerMinute(now) {
    return pruneMessageTimes(now - 60000);
  }

  function pruneMessageTimes(cutoff) {
    const times = dashboardStats.msgTimes;
    while (dashboardStats.msgHead < times.length && times[dashboardStats.msgHead] < cutoff) {
      dashboardStats.msgHead++;
    }
    if (dashboardStats.msgHead > 1000 && dashboardStats.msgHead * 2 > times.length) {
      times.splice(0, dashboardStats.msgHead);
      dashboardStats.msgHead = 0;
    }
    return times.length - dashboardStats.msgHead;
  }

  const dashboardNumberFormatters = new Map();

  function dashboardNumber(value, maximumFractionDigits) {
    const digits = maximumFractionDigits || 0;
    const key = currentLang() + ':' + digits;
    try {
      let formatter = dashboardNumberFormatters.get(key);
      if (!formatter) {
        formatter = new Intl.NumberFormat(currentLang(), { maximumFractionDigits: digits });
        dashboardNumberFormatters.set(key, formatter);
      }
      return formatter.format(Number(value) || 0);
    } catch (e) {
      return digits ? (Number(value) || 0).toFixed(digits) : String(Math.round(Number(value) || 0));
    }
  }

  function dashboardDuration(milliseconds) {
    let seconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (hours) return hours + t('dashHourShort') + ' ' + minutes + t('dashMinuteShort');
    if (minutes) return minutes + t('dashMinuteShort') + ' ' + seconds + t('dashSecondShort');
    return seconds + t('dashSecondShort');
  }

  function dashboardSparkline(now) {
    const buckets = new Array(20).fill(0);
    for (let offset = dashboardStats.msgHead; offset < dashboardStats.msgTimes.length; offset++) {
      const timestamp = dashboardStats.msgTimes[offset];
      const index = 19 - Math.floor((now - timestamp) / 3000);
      if (index >= 0 && index < buckets.length) buckets[index]++;
    }
    const max = Math.max(1, ...buckets);
    const width = 320, height = 42;
    const points = buckets.map((value, index) =>
      (index / (buckets.length - 1) * width).toFixed(1) + ',' +
      (height - value / max * (height - 3)).toFixed(1)
    ).join(' ');
    return '<svg class="bt-spark" viewBox="0 0 ' + width + ' ' + height +
      '" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="bt-dash-gradient" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="var(--bt-accent,#e31337)" stop-opacity=".38"/>' +
      '<stop offset="100%" stop-color="var(--bt-accent,#e31337)" stop-opacity=".015"/></linearGradient></defs>' +
      '<line class="bt-spark-grid" x1="0" y1="14" x2="' + width + '" y2="14"/>' +
      '<line class="bt-spark-grid" x1="0" y1="28" x2="' + width + '" y2="28"/>' +
      '<polygon class="bt-spark-area" points="0,' + height + ' ' + points + ' ' + width + ',' + height + '"/>' +
      '<polyline class="bt-spark-line" points="' + points + '"/></svg>';
  }

  function dashboardAvatarMarkup(login, name) {
    if (!CONFIG.showAvatars || !LOGIN_RE.test(login)) return '';
    const url = avatarCache.get(login);
    const initial = Array.from(name || login || '?')[0] || '?';
    return '<span class="bt-dash-avatar" data-bt-dash-avatar="' + esc(login) + '">' +
      (url ? '<img src="' + esc(url) + '" alt="" loading="lazy">' :
        '<span aria-hidden="true">' + esc(initial.toUpperCase()) + '</span>') + '</span>';
  }

  function hydrateDashboardAvatars(dashboard) {
    if (!CONFIG.showAvatars) return;
    dashboard.querySelectorAll('[data-bt-dash-avatar]').forEach((slot) => {
      if (slot.querySelector('img')) return;
      const login = slot.dataset.btDashAvatar || '';
      if (!LOGIN_RE.test(login)) return;
      fetchAvatar(login).then((url) => {
        if (!url || !slot.isConnected || slot.dataset.btDashAvatar !== login) return;
        const img = document.createElement('img');
        img.src = url;
        img.alt = '';
        img.loading = 'lazy';
        slot.textContent = '';
        slot.appendChild(img);
      });
    });
  }

  function dashboardMetric(value, label, detail, accent) {
    return '<div class="bt-dash-metric' + (accent ? ' bt-dash-metric-accent' : '') +
      '"><b>' + value + '</b><span>' + label + '</span>' +
      (detail ? '<small>' + detail + '</small>' : '') + '</div>';
  }

  function ensureDashPanel() {
    if (dashPanel) return dashPanel;
    dashPanel = document.createElement('div');
    dashPanel.id = 'bt-dash';
    dashPanel.className = 'bt-pop';
    dashPanel.setAttribute('role', 'dialog');
    dashPanel.setAttribute('aria-label', t('dashTitle'));
    dashPanel.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dashPanel);
    document.addEventListener('click', (event) => {
      if (dashboardOpen && !eventInside(event, dashPanel) && !(event.target.closest && event.target.closest('#bt-dash-btn'))) {
        setDashboardOpen(false);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && dashboardOpen) setDashboardOpen(false);
    });
    return dashPanel;
  }

  function renderDashboard() {
    const dashboard = ensureDashPanel();
    const now = Date.now();
    const currentMpm = messagesPerMinute(now);
    const topChatters = [...dashboardStats.chatters.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 8);
    const topEmotes = [...dashboardStats.emotes.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 6);
    const idle = dashboardStats.totalMessages === 0;
    const uniqueChatters = dashboardStats.chatters.size;
    const activeChatters = [...dashboardStats.chatters.values()].filter((chatter) => now - chatter.lastSeen <= 60000).length;
    const sessionDuration = dashboardStats.startedAt ? now - dashboardStats.startedAt : 0;
    const averageMpm = dashboardStats.totalMessages / (Math.max(60000, sessionDuration) / 60000);
    const topCount = topChatters.length ? topChatters[0][1].count : 1;
    const chatterRows = topChatters.map(([login, chatter], index) => {
      const name = chatter.name || login;
      const color = chatterColor(chatter.color);
      const count = dashboardNumber(chatter.count);
      const share = Math.max(5, Math.round(chatter.count / topCount * 100));
      return '<div class="bt-dash-row" title="' + esc(tf('dashMessageCount', { count })) + '">' +
        '<span class="bt-dash-rank">' + (index + 1) + '</span>' +
        dashboardAvatarMarkup(login, name) +
        '<span class="bt-dash-person"><span class="bt-dash-person-line"><span class="bt-dash-name" style="color:' +
        esc(color) + '">' + esc(name) + '</span><b class="bt-dash-count">' + count +
        '</b></span><span class="bt-dash-share"><i style="width:' + share + '%"></i></span></span></div>';
    }).join('');
    const emoteRows = topEmotes.map(([id, emote]) =>
      '<span class="bt-dash-emote" title="' + esc(tf('dashEmoteUses', { count: dashboardNumber(emote.count) })) +
      '"><img src="' + emoteUrl(id) + '" alt="' + esc(emote.name) + '"><span><b>' +
      esc(emote.name) + '</b><small>×' + dashboardNumber(emote.count) + '</small></span></span>'
    ).join('');
    dashboard.innerHTML =
      '<div class="bt-pop-head"><span class="bt-pop-title">' + t('dashTitle') +
      '</span>' + (!idle ? '<span class="bt-dash-live"><i></i>' + t('dashLive') + '</span>' : '') +
      '<a class="bt-version" href="' + PROJECT_URL +
      '" target="_blank" rel="noopener noreferrer">v' + VERSION + '</a></div>' +
      (idle ? '<div class="bt-dash-empty"><span class="bt-dash-empty-icon" aria-hidden="true">▥</span><b>' +
        t('dashEmpty') + '</b><span>' + t('dashEmptyHint') + '</span></div>' :
        '<div class="bt-dash-metrics">' +
        dashboardMetric(dashboardNumber(currentMpm), t('dashCurrentRate'), t('dashPerMin'), true) +
        dashboardMetric(dashboardNumber(dashboardStats.peakMpm), t('dashPeakRate'), t('dashPerMin')) +
        dashboardMetric(dashboardNumber(dashboardStats.totalMessages), t('dashTotalMessages')) +
        dashboardMetric(dashboardNumber(uniqueChatters), t('dashUniqueChatters')) + '</div>' +
        '<div class="bt-dash-chart"><div class="bt-dash-chart-head"><span><b>' + t('dashActivity') +
        '</b><small>' + t('dashLastMinute') + '</small></span></div>' + dashboardSparkline(now) + '</div>' +
        '<div class="bt-dash-session"><span><b>' + dashboardNumber(activeChatters) + '</b><small>' +
        t('dashActiveNow') + '</small></span><span><b>' + dashboardNumber(averageMpm, 1) + '</b><small>' +
        t('dashAverageRate') + '</small></span><span><b>' + dashboardDuration(sessionDuration) + '</b><small>' +
        t('dashSessionTime') + '</small></span></div>' +
        '<div class="bt-pop-sub"><span>' + t('dashTopChatters') + '</span><b title="' +
        esc(t('dashUniqueChatters')) + '">' + dashboardNumber(uniqueChatters) + '</b></div>' +
        '<div class="bt-dash-list">' + (chatterRows || '-') + '</div>' +
        '<div class="bt-pop-sub"><span>' + t('dashTopEmotes') + '</span><b title="' +
        esc(tf('dashEmoteUses', { count: dashboardNumber(dashboardStats.totalEmotes) })) + '">' +
        dashboardNumber(dashboardStats.totalEmotes) + '</b></div>' +
        '<div class="bt-dash-emotes">' + (emoteRows || '-') + '</div>');
    hydrateDashboardAvatars(dashboard);
  }

  function setDashboardOpen(open) {
    dashboardOpen = !!(open && CONFIG.dashboard);
    const dashboard = (dashboardOpen || dashPanel) ? ensureDashPanel() : null;
    if (dashboard) setSurfaceOpen(dashboard, dashboardOpen);
    if (dashboardOpen) {
      renderDashboard();
      if (!dashboardTimer) dashboardTimer = setInterval(() => {
        if (dashboardOpen && !document.hidden) renderDashboard();
      }, 1000);
    } else if (dashboardTimer) {
      clearInterval(dashboardTimer);
      dashboardTimer = null;
    }
    updateFooterPanelButton('bt-dash-btn', dashboardOpen);
  }

  let inboxPanel = null;

  function setInboxOpen(open) {
    inboxOpen = !!(open && CONFIG.mentionInbox);
    if (inboxPanel) setSurfaceOpen(inboxPanel, inboxOpen);
    updateFooterPanelButton('bt-inbox-btn', inboxOpen);
  }

  function ensureInboxPanel() {
    if (inboxPanel) return inboxPanel;
    inboxPanel = document.createElement('div');
    inboxPanel.id = 'bt-inbox'; inboxPanel.className = 'bt-pop';
    inboxPanel.setAttribute('role', 'dialog');
    inboxPanel.setAttribute('aria-label', t('inboxTitle'));
    inboxPanel.setAttribute('aria-hidden', 'true');
    document.body.appendChild(inboxPanel);
    inboxPanel.addEventListener('input', (e) => {
      if (!e.target.classList.contains('bt-inbox-search')) return;
      inboxQuery = e.target.value.toLowerCase().trim();
      filterInboxRows();
    });
    inboxPanel.addEventListener('click', (e) => {
      const jump = e.target.closest && e.target.closest('[data-bt-jump]');
      if (jump) {
        e.stopPropagation();
        const index = +jump.getAttribute('data-bt-jump');
        const mention = mentions[index];
        if (!mention || !jumpToMessage(mention.id)) {
          inboxNotice = t('inboxMissing');
          renderInbox();
        } else {
          inboxNotice = '';
        }
        return;
      }
      const row = e.target.closest && e.target.closest('.bt-inbox-row');
      if (row) row.classList.toggle('bt-expanded');
    });
    document.addEventListener('click', (e) => {
      if (inboxOpen && !eventInside(e, inboxPanel) && !(e.target.closest && e.target.closest('#bt-inbox-btn'))) {
        setInboxOpen(false);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && inboxOpen) setInboxOpen(false);
    });
    return inboxPanel;
  }

  function contextMessageHtml(record, focus) {
    return '<div class="bt-context-line' + (focus ? ' bt-context-focus' : '') + '">' +
      '<span style="color:' + esc(chatterColor(record.color)) + '">' + esc(record.user || record.login) + '</span>' +
      '<span>: ' + esc(record.text) + '</span></div>';
  }

  function filterInboxRows() {
    if (!inboxPanel) return;
    inboxPanel.querySelectorAll('.bt-inbox-row').forEach((row) => {
      row.hidden = !!inboxQuery && !(row.dataset.search || '').includes(inboxQuery);
    });
  }

  function jumpToMessage(id) {
    if (!id) return false;
    const line = Array.from(document.querySelectorAll('.chat-line__message')).find((el) => lineMessageId(el) === id);
    if (!line) return false;
    try { line.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { line.scrollIntoView(); }
    line.classList.add('bt-focus-pulse');
    setTimeout(() => line.classList.remove('bt-focus-pulse'), 2200);
    return true;
  }

  function renderInbox() {
    const p = ensureInboxPanel();
    const rows = mentions.map((m, index) => {
      const d = new Date(m.t);
      const time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      const color = chatterColor(m.color);
      const search = (m.user + ' ' + m.login + ' ' + m.text + ' ' + m.channel).toLowerCase();
      const context = (m.before || []).map((record) => contextMessageHtml(record, false)).join('') +
        contextMessageHtml(m, true) +
        (m.after || []).map((record) => contextMessageHtml(record, false)).join('');
      return '<div class="bt-inbox-row" data-search="' + esc(search) + '">' +
        '<div class="bt-inbox-main"><span class="bt-inbox-kind">' + (m.kind === 'reply' ? '↩' : '@') + '</span>' +
        '<span class="bt-inbox-time">' + time + '</span> ' +
        (m.channel ? '<span class="bt-inbox-channel">#' + esc(m.channel) + '</span>' : '') +
        '<span class="bt-inbox-user" style="color:' + esc(color) + '">' + esc(m.user) + '</span>' +
        '<span class="bt-inbox-colon">: </span><span class="bt-inbox-text">' + esc(m.text) + '</span>' +
        '<button type="button" class="bt-inbox-jump" data-bt-jump="' + index + '" title="' + esc(t('inboxJump')) + '"' + (m.id ? '' : ' disabled') + '>↗</button></div>' +
        '<div class="bt-inbox-context">' + context + '</div></div>';
    }).join('');
    p.innerHTML = '<div class="bt-pop-head"><span class="bt-pop-title">' + t('inboxTitle') +
      '</span><span class="bt-inbox-total" title="' + esc(t('inboxTitle')) + '">' + dashboardNumber(mentions.length) +
      '</span><a class="bt-version" href="' + PROJECT_URL + '" target="_blank" rel="noopener noreferrer">v' + VERSION + '</a></div>' +
      '<input class="bt-inbox-search" type="search" value="' + esc(inboxQuery) + '" placeholder="' +
      esc(t('inboxSearch')) + '" aria-label="' + esc(t('inboxSearch')) + '">' +
      (inboxNotice ? '<div class="bt-inbox-notice">' + esc(inboxNotice) + '</div>' : '') +
      (rows || '<div class="bt-pop-empty">' + t('inboxEmpty') + '</div>');
    filterInboxRows();
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

  function formatClock(timestamp) {
    const date = new Date(timestamp);
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
  }

  let hovercard = null, hoverHideTimer = null;

  function topProfileEmote(profile) {
    return topMapEntry(profile.emotes, (value) => value.count);
  }

  function viewerHovercardAvatar(login, name) {
    const avatarUrl = LOGIN_RE.test(login) ? avatarCache.get(login) : '';
    const initial = Array.from(name || login || '?')[0] || '?';
    return '<span class="bt-hover-avatar" data-bt-hover-avatar="' + esc(login) + '" aria-hidden="true">' +
      (avatarUrl ? '<img src="' + esc(avatarUrl) + '" alt="" loading="lazy">' :
        '<span>' + esc(initial.toUpperCase()) + '</span>') + '</span>';
  }

  function hydrateViewerHovercardAvatar(card, login) {
    if (!card || !LOGIN_RE.test(login)) return;
    const slot = card.querySelector('[data-bt-hover-avatar]');
    if (!slot || slot.dataset.btHoverAvatar !== login || slot.querySelector('img')) return;
    fetchAvatar(login).then((url) => {
      if (!url || !slot.isConnected || slot.dataset.btHoverAvatar !== login) return;
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      img.loading = 'lazy';
      slot.textContent = '';
      slot.appendChild(img);
    });
  }

  function showViewerHovercard(line, anchor) {
    if (!CONFIG.viewerHovercards) return;
    const login = lineLogin(line);
    const profile = userProfiles.get(login);
    if (!profile || !document.body) return;
    clearTimeout(hoverHideTimer);
    if (!hovercard) {
      hovercard = document.createElement('div');
      hovercard.id = 'bt-hovercard';
      hovercard.addEventListener('mouseenter', () => clearTimeout(hoverHideTimer));
      hovercard.addEventListener('mouseleave', hideViewerHovercard);
      document.body.appendChild(hovercard);
    }
    const top = topProfileEmote(profile);
    hovercard.innerHTML = '<div class="bt-hover-head">' + viewerHovercardAvatar(login, profile.user) +
      '<div class="bt-hover-name" style="color:' + esc(chatterColor(profile.color)) + '">' + esc(profile.user) + '</div></div>' +
      '<div class="bt-hover-grid"><span><b>' + profile.messages + '</b>' + t('hoverMessages') + '</span>' +
      '<span><b>' + profile.mentions + '</b>' + t('hoverMentions') + '</span>' +
      '<span><b>' + formatClock(profile.firstSeen) + '</b>' + t('hoverFirstSeen') + '</span></div>' +
      (top ? '<div class="bt-hover-emote"><small>' + t('hoverTopEmote') + '</small><img src="' + emoteUrl(top[0]) + '" alt=""><span>' + esc(top[1].name) + ' ×' + top[1].count + '</span></div>' : '');
    hydrateViewerHovercardAvatar(hovercard, login);
    const rect = anchor.getBoundingClientRect();
    hovercard.style.left = Math.min(window.innerWidth - 260, Math.max(8, rect.left)) + 'px';
    hovercard.style.top = Math.min(window.innerHeight - 150, rect.bottom + 6) + 'px';
    hovercard.classList.add('bt-open');
  }

  function hideViewerHovercard() {
    clearTimeout(hoverHideTimer);
    hoverHideTimer = setTimeout(() => { if (hovercard) hovercard.classList.remove('bt-open'); }, 180);
  }

  const translationCache = new Map();
  const translationInflight = new Map();
  const languageDisplayNames = new Map();

  async function translateText(text) {
    const target = currentLang();
    const key = target + '\0' + text;
    if (translationCache.has(key)) return translationCache.get(key);
    if (translationInflight.has(key)) return translationInflight.get(key);
    const request = (async () => {
      try {
        const response = await fetchWithTimeout(
          'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' +
          target + '&dt=t&q=' + encodeURIComponent(text),
          null,
          NETWORK_TIMEOUT_MS
        );
        if (!response.ok) throw new Error('Google translation request failed');
        const data = await response.json();
        const result = data && data[0] ? {
          text: data[0].map((part) => part[0]).join(''),
          source: data[2] || '',
          target,
        } : null;
        if (result) {
          if (translationCache.size >= 300) translationCache.delete(translationCache.keys().next().value);
          translationCache.set(key, result);
        }
        return result;
      } catch (e) {
        return null;
      }
    })();
    translationInflight.set(key, request);
    request.finally(() => translationInflight.delete(key));
    return request;
  }

  function languageName(code) {
    if (!code || code === 'auto') return t('unknownLanguage');
    try {
      if (Intl.DisplayNames) {
        const locale = currentLang();
        let names = languageDisplayNames.get(locale);
        if (!names) {
          names = new Intl.DisplayNames([locale], { type: 'language' });
          languageDisplayNames.set(locale, names);
        }
        const name = names.of(code);
        if (name) return name;
      }
    } catch (e) {}
    return String(code).toUpperCase();
  }

  function updateTranslationDisplay(out) {
    const state = out && out._btTranslation;
    if (!state || !state.result) return;
    const text = out.querySelector('.bt-trans-text');
    const toggle = out.querySelector('[data-bt-trans-action="toggle"]');
    if (text) text.textContent = state.showOriginal ? state.original : state.result.text;
    if (toggle) toggle.textContent = state.showOriginal ? t('showTranslation') : t('showOriginal');
  }

  function renderTranslation(out, result, original) {
    out.textContent = '';
    if (!result) {
      out.classList.add('bt-trans-error');
      const status = document.createElement('span');
      status.textContent = t('transFailed');
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'bt-trans-action';
      retry.textContent = t('retryTranslation');
      retry.addEventListener('click', (event) => {
        event.stopPropagation();
        requestTranslation(out, original);
      });
      out.appendChild(status);
      out.appendChild(retry);
      return;
    }
    out.classList.remove('bt-trans-error');
    out._btTranslation = { result, original, showOriginal: false };
    const meta = document.createElement('div');
    meta.className = 'bt-trans-meta';
    meta.textContent = t('detectedLanguage') + ': ' + languageName(result.source) + ' · ' +
      t('translationTarget') + ': ' + languageName(result.target);
    const text = document.createElement('div');
    text.className = 'bt-trans-text';
    text.textContent = result.text;
    const actions = document.createElement('div');
    actions.className = 'bt-trans-actions';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'bt-trans-action';
    toggle.dataset.btTransAction = 'toggle';
    toggle.textContent = t('showOriginal');
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      out._btTranslation.showOriginal = !out._btTranslation.showOriginal;
      updateTranslationDisplay(out);
    });
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'bt-trans-action';
    copy.textContent = t('copyTranslation');
    copy.addEventListener('click', (event) => {
      event.stopPropagation();
      const normalLabel = t('copyTranslation');
      try {
        const copied = navigator.clipboard.writeText(result.text);
        Promise.resolve(copied).then(() => {
          copy.textContent = t('translationCopied');
          setTimeout(() => { if (copy.isConnected) copy.textContent = normalLabel; }, 1200);
        }).catch(() => {});
      } catch (e) {}
    });
    out.appendChild(meta);
    out.appendChild(text);
    actions.appendChild(toggle);
    actions.appendChild(copy);
    out.appendChild(actions);
  }

  function requestTranslation(out, original) {
    const requestId = Date.now() + ':' + Math.random();
    out.dataset.btTranslationRequest = requestId;
    out.classList.remove('bt-trans-error');
    out.textContent = t('transLoading');
    translateText(original).then((result) => {
      if (!out.isConnected || out.dataset.btTranslationRequest !== requestId) return;
      renderTranslation(out, result, original);
    });
  }

  function translateLine(el) {
    const body = el.querySelector('[data-a-target="chat-line-message-body"]');
    if (!body || el.querySelector('.bt-trans')) return;
    const original = lineCopyText(el);
    const out = document.createElement('div');
    out.className = 'bt-trans';
    const messageContainer = body.closest('.chat-line__message-container') || body.parentElement || el;
    messageContainer.appendChild(out);
    requestTranslation(out, original);
  }

  const composerBindings = new WeakSet();
  const composerForms = new WeakSet();
  const programmaticComposerInputs = new WeakSet();
  const pendingComposerSends = new WeakMap();
  const sentHistoryByChannel = new Map();
  const lastSentByChannel = new Map();
  const pendingSendConfirmations = [];
  const recentOwnEchoes = new Map();
  let composerInput = null;
  let composerChannel = '';
  let historyCursor = -1;
  let historyScratch = '';
  let draftStore = null;
  let draftStorageDisabledCleared = false;
  let draftSaveTimer = null;
  let characterCounterEl = null;
  let characterCounterFrame = null;
  let pendingCounterInput = null;
  let duplicateConfirmation = null;
  let composerNoticeEl = null, composerNoticeTimer = null;
  let connectionStatusEl = null;
  let composerDocumentEventsBound = false;
  let observedComposerInput = null, composerObserver = null;

  function currentChannelKey() {
    try {
      const parts = location.pathname.split('/').filter(Boolean).map((part) => decodeURIComponent(part).toLowerCase());
      if (location.hostname === 'dashboard.twitch.tv' && parts[0] === 'u' && parts[1]) return parts[1];
      if ((parts[0] === 'moderator' || parts[0] === 'popout') && parts[1]) return parts[1];
      if (parts[0] && !RESERVED_TWITCH_ROUTES.has(parts[0])) return parts[0];
      return (location.hostname + location.pathname).toLowerCase().slice(0, 240);
    } catch (e) {
      return location.hostname || 'twitch';
    }
  }

  function loadDraftStore() {
    if (draftStore) return draftStore;
    draftStore = {};
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
      if (!isPlainObject(saved)) return draftStore;
      for (const [channel, entry] of Object.entries(saved)) {
        if (typeof channel !== 'string' || channel.length > 240 || !isPlainObject(entry)) continue;
        if (typeof entry.text !== 'string' || entry.text.length > 5000 || !Number.isFinite(entry.updated)) continue;
        draftStore[channel] = { text: entry.text, updated: entry.updated };
      }
    } catch (e) {}
    return draftStore;
  }

  function saveDraftNow(channel, text) {
    if (!CONFIG.preserveDrafts || !channel) return;
    const store = loadDraftStore();
    if (text) store[channel] = { text: text.slice(0, 5000), updated: Date.now() };
    else delete store[channel];
    const entries = Object.entries(store).sort((a, b) => b[1].updated - a[1].updated);
    for (const [oldChannel] of entries.slice(MAX_DRAFT_CHANNELS)) delete store[oldChannel];
    try { localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  function scheduleDraftSave(channel, text) {
    clearTimeout(draftSaveTimer);
    draftSaveTimer = setTimeout(() => saveDraftNow(channel, text), 220);
  }

  function storedDraft(channel) {
    const entry = channel && loadDraftStore()[channel];
    return entry && typeof entry.text === 'string' ? entry.text : '';
  }

  function clearStoredDrafts() {
    clearTimeout(draftSaveTimer);
    draftStore = {};
    try { localStorage.removeItem(DRAFTS_STORAGE_KEY); } catch (e) {}
  }

  function findComposerInput() {
    const selectors = [
      'textarea[data-a-target="chat-input"]',
      '[data-a-target="chat-input"] textarea',
      '[data-a-target="chat-input"][contenteditable="true"]',
      '.chat-input textarea',
      '.chat-input [contenteditable="true"]',
    ];
    const candidates = Array.from(document.querySelectorAll(selectors.join(',')));
    return candidates.reverse().find((element) => element.getClientRects().length) || candidates[0] || null;
  }

  function composerFromEventTarget(target) {
    if (!target || target.nodeType !== 1) return composerInput;
    const selector = [
      'textarea[data-a-target="chat-input"]',
      '[data-a-target="chat-input"][contenteditable="true"]',
      '.chat-input textarea',
      '.chat-input [contenteditable="true"]',
    ].join(',');
    if (target.matches && target.matches(selector)) return target;
    const closest = target.closest && target.closest(selector);
    if (closest) return closest;
    return composerInput && composerInput.contains(target) ? composerInput : null;
  }

  function composerValue(input) {
    if (!input) return '';
    if ('value' in input) return input.value || '';
    const value = input.textContent || '';
    // Rich-text editors keep whitespace or an invisible placeholder when visually empty.
    return input.isContentEditable && /^[\s\u200B\u2060\uFEFF]*$/.test(value) ? '' : value;
  }

  function setComposerValue(input, value) {
    if (!input) return;
    programmaticComposerInputs.add(input);
    try {
      if ('value' in input) {
        const proto = input.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(proto, 'value');
        if (descriptor && descriptor.set) descriptor.set.call(input, value);
        else input.value = value;
      } else {
        input.textContent = value;
      }
      let event;
      try { event = new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value }); }
      catch (e) { event = new Event('input', { bubbles: true }); }
      input.dispatchEvent(event);
      input.focus();
      if (typeof input.setSelectionRange === 'function') input.setSelectionRange(value.length, value.length);
      else {
        const range = document.createRange(), selection = window.getSelection();
        range.selectNodeContents(input); range.collapse(false);
        selection.removeAllRanges(); selection.addRange(range);
      }
    } catch (e) {}
    setTimeout(() => programmaticComposerInputs.delete(input), 0);
    updateCharacterCounter(input);
  }

  function composerLimit(input) {
    const limit = Number(input && (input.maxLength || input.getAttribute('maxlength')));
    return Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_MESSAGE_LIMIT;
  }

  function removeCharacterCounter() {
    if (characterCounterEl) characterCounterEl.remove();
    characterCounterEl = null;
  }

  function ensureCharacterCounter(input) {
    if (!CONFIG.characterCounter || !input) { removeCharacterCounter(); return; }
    const ctx = footerInsertCtx();
    if (!ctx || !ctx.toolbar) return;
    if (!characterCounterEl || !characterCounterEl.isConnected) {
      characterCounterEl = document.createElement('span');
      characterCounterEl.id = 'bt-character-counter';
      characterCounterEl.className = 'bt-character-counter';
    }
    let before = ctx.cell || document.getElementById('bt-dash-btn') ||
      document.getElementById('bt-inbox-btn') || document.getElementById('bt-settings-btn') || ctx.anchor;
    while (before && before.parentElement && before.parentElement !== ctx.toolbar) before = before.parentElement;
    if (!before || before.parentElement !== ctx.toolbar) before = ctx.anchor;
    if (characterCounterEl.parentElement !== ctx.toolbar || characterCounterEl.nextSibling !== before) {
      ctx.toolbar.insertBefore(characterCounterEl, before);
    }
    characterCounterEl.title = t('characterCounterTitle');
    characterCounterEl.setAttribute('aria-label', t('characterCounterTitle'));
    updateCharacterCounter(input);
  }

  function scheduleCharacterCounterUpdate(input) {
    if (!input) return;
    pendingCounterInput = input;
    if (characterCounterFrame) return;
    const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
    characterCounterFrame = schedule(() => {
      characterCounterFrame = null;
      const current = pendingCounterInput;
      pendingCounterInput = null;
      if (current) {
        if (current !== composerInput) {
          composerInput = current;
          bindComposer(current);
        }
        ensureCharacterCounter(current);
        updateCharacterCounter(current);
      }
    });
  }

  function updateCharacterCounter(input) {
    if (!characterCounterEl || !CONFIG.characterCounter) return;
    const length = composerValue(input).length;
    const limit = composerLimit(input);
    characterCounterEl.textContent = length + '/' + limit;
    characterCounterEl.setAttribute('aria-label', t('characterCounterTitle') + ': ' + length + '/' + limit);
    characterCounterEl.classList.toggle('bt-near-limit', length >= limit * .9 && length <= limit);
    characterCounterEl.classList.toggle('bt-over-limit', length > limit);
  }

  function positionComposerNotice() {
    if (!composerNoticeEl || !composerInput) return;
    const rect = composerInput.getBoundingClientRect();
    if (!rect.width) return;
    const bottom = Math.max(8, window.innerHeight - rect.top + 6);
    composerNoticeEl.style.left = Math.max(8, rect.left) + 'px';
    composerNoticeEl.style.width = Math.min(rect.width, window.innerWidth - Math.max(8, rect.left) - 8) + 'px';
    composerNoticeEl.style.bottom = bottom + 'px';
  }

  function hideComposerNotice() {
    clearTimeout(composerNoticeTimer);
    if (composerNoticeEl) composerNoticeEl.remove();
    composerNoticeEl = null;
  }

  function showComposerNotice(message, kind, duration) {
    if (!message || !document.body) return;
    if (!composerNoticeEl) {
      composerNoticeEl = document.createElement('div');
      composerNoticeEl.id = 'bt-composer-notice';
      composerNoticeEl.setAttribute('role', 'status');
      composerNoticeEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(composerNoticeEl);
    }
    composerNoticeEl.className = 'bt-' + (kind || 'info');
    composerNoticeEl.textContent = message;
    positionComposerNotice();
    clearTimeout(composerNoticeTimer);
    composerNoticeTimer = setTimeout(hideComposerNotice, duration || 3200);
  }

  function removeConnectionStatus() {
    if (connectionStatusEl) connectionStatusEl.remove();
    connectionStatusEl = null;
  }

  function ensureConnectionStatus() {
    if (!CONFIG.saferSending || chatConnectionState !== 'reconnecting') {
      removeConnectionStatus();
      return;
    }
    const ctx = footerInsertCtx();
    if (!ctx || !ctx.toolbar) return;
    if (!connectionStatusEl || !connectionStatusEl.isConnected) {
      connectionStatusEl = document.createElement('span');
      connectionStatusEl.id = 'bt-connection-status';
      connectionStatusEl.className = 'bt-connection-status';
      connectionStatusEl.setAttribute('role', 'status');
      connectionStatusEl.setAttribute('aria-live', 'polite');
    }
    connectionStatusEl.textContent = t('chatReconnecting');
    let before = characterCounterEl && characterCounterEl.isConnected ? characterCounterEl : ctx.cell;
    while (before && before.parentElement && before.parentElement !== ctx.toolbar) before = before.parentElement;
    if (!before || before.parentElement !== ctx.toolbar) before = ctx.anchor;
    if (connectionStatusEl.parentElement !== ctx.toolbar || connectionStatusEl.nextSibling !== before) {
      ctx.toolbar.insertBefore(connectionStatusEl, before);
    }
  }

  function setChatConnectionState(state) {
    chatConnectionState = state;
    if (document.body) ensureConnectionStatus();
  }

  function normalizedOutgoingText(text) {
    return String(text || '').trim().replace(/\s+/g, ' ');
  }

  function allowSendAttempt(input) {
    if (!CONFIG.saferSending) return true;
    const text = normalizedOutgoingText(composerValue(input));
    const channel = currentChannelKey();
    if (!text) return true;
    const now = Date.now();
    const pending = pendingComposerSends.get(input);
    if (pending && normalizedOutgoingText(pending.text) === text && now - pending.created < 2000) {
      duplicateConfirmation = null;
      showComposerNotice(t('sendAlreadyPending'), 'warning', 2200);
      return false;
    }
    if (duplicateConfirmation && duplicateConfirmation.channel === channel &&
        duplicateConfirmation.text === text && now <= duplicateConfirmation.until) {
      duplicateConfirmation = null;
      return true;
    }
    const last = lastSentByChannel.get(channel);
    if (last && last.text === text && now - last.time <= DUPLICATE_WINDOW_MS) {
      duplicateConfirmation = { channel, text, until: now + DUPLICATE_CONFIRM_MS };
      showComposerNotice(t('duplicateBlocked'), 'warning', DUPLICATE_CONFIRM_MS);
      return false;
    }
    duplicateConfirmation = null;
    return true;
  }

  function rememberSentMessage(channel, text, sentAt) {
    const clean = String(text || '').trim();
    if (!channel || !clean) return;
    let history = sentHistoryByChannel.get(channel);
    if (!history) {
      if (sentHistoryByChannel.size >= MAX_HISTORY_CHANNELS) {
        sentHistoryByChannel.delete(sentHistoryByChannel.keys().next().value);
      }
      history = [];
      sentHistoryByChannel.set(channel, history);
    }
    if (history[history.length - 1] !== clean) history.push(clean);
    if (history.length > MAX_SENT_HISTORY) history.splice(0, history.length - MAX_SENT_HISTORY);
    if (!lastSentByChannel.has(channel) && lastSentByChannel.size >= MAX_HISTORY_CHANNELS) {
      lastSentByChannel.delete(lastSentByChannel.keys().next().value);
    }
    lastSentByChannel.set(channel, { text: normalizedOutgoingText(clean), time: sentAt || Date.now() });
    historyCursor = -1;
    historyScratch = '';
  }

  function completeSendConfirmation(confirmation, confirmed) {
    const index = pendingSendConfirmations.indexOf(confirmation);
    if (index === -1) return;
    pendingSendConfirmations.splice(index, 1);
    const stored = storedDraft(confirmation.channel);
    if (confirmed) {
      if (!stored || normalizedOutgoingText(stored) === normalizedOutgoingText(confirmation.text)) {
        clearTimeout(draftSaveTimer);
        saveDraftNow(confirmation.channel, '');
      }
      return;
    }
    if (!CONFIG.saferSending) return;
    const last = lastSentByChannel.get(confirmation.channel);
    if (last && last.time === confirmation.created &&
        last.text === normalizedOutgoingText(confirmation.text)) {
      lastSentByChannel.delete(confirmation.channel);
    }
    const currentText = confirmation.channel === currentChannelKey() ? composerValue(composerInput) : '';
    if (!currentText && confirmation.channel === currentChannelKey() && composerInput) {
      setComposerValue(composerInput, confirmation.text);
    }
    if (!stored || normalizedOutgoingText(stored) === normalizedOutgoingText(confirmation.text)) {
      saveDraftNow(confirmation.channel, confirmation.text);
    }
    if (confirmation.channel === currentChannelKey()) {
      showComposerNotice(t('sendFailedRestored'), 'error', 5200);
    }
  }

  function confirmSentMessage(channel, text) {
    const normalized = normalizedOutgoingText(text);
    const confirmation = pendingSendConfirmations.find((item) =>
      item.channel === channel && normalizedOutgoingText(item.text) === normalized
    );
    if (confirmation) {
      completeSendConfirmation(confirmation, true);
      return;
    }
    if (!channel || !normalized) return;
    const key = channel + '\n' + normalized;
    const received = Date.now();
    recentOwnEchoes.set(key, received);
    setTimeout(() => {
      if (recentOwnEchoes.get(key) === received) recentOwnEchoes.delete(key);
    }, SEND_ECHO_GRACE_MS);
  }

  function commitPendingSend(input) {
    const pending = pendingComposerSends.get(input);
    if (!pending) return;
    pendingComposerSends.delete(input);
    const sentAt = Date.now();
    rememberSentMessage(pending.channel, pending.text, sentAt);
    if (CONFIG.saferSending) {
      const echoKey = pending.channel + '\n' + normalizedOutgoingText(pending.text);
      const echoAt = recentOwnEchoes.get(echoKey);
      if (echoAt && sentAt - echoAt <= SEND_ECHO_GRACE_MS) {
        recentOwnEchoes.delete(echoKey);
        clearTimeout(draftSaveTimer);
        saveDraftNow(pending.channel, '');
      } else {
        const confirmation = { channel: pending.channel, text: pending.text, created: sentAt };
        pendingSendConfirmations.push(confirmation);
        if (pendingSendConfirmations.length > 20) pendingSendConfirmations.splice(0, pendingSendConfirmations.length - 20);
        setTimeout(() => completeSendConfirmation(confirmation, false), SEND_CONFIRM_TIMEOUT_MS);
      }
    } else {
      saveDraftNow(pending.channel, '');
    }
  }

  function schedulePendingSend(input) {
    const text = composerValue(input);
    if (!text.trim()) return;
    const channel = currentChannelKey();
    if (CONFIG.preserveDrafts) {
      clearTimeout(draftSaveTimer);
      saveDraftNow(channel, text);
    }
    const pending = { channel, text, created: Date.now() };
    pendingComposerSends.set(input, pending);
    setTimeout(() => {
      const current = pendingComposerSends.get(input);
      if (current === pending && !composerValue(input)) commitPendingSend(input);
    }, 180);
  }

  function historyBoundary(input, direction) {
    const value = composerValue(input);
    if (historyCursor >= 0 || !value) return true;
    if (typeof input.selectionStart !== 'number' || typeof input.selectionEnd !== 'number') return false;
    return direction < 0
      ? input.selectionStart === 0 && input.selectionEnd === 0
      : input.selectionStart === value.length && input.selectionEnd === value.length;
  }

  function nativeComposerSuggestionsOpen(input) {
    if (!input) return false;
    if (input.getAttribute('aria-expanded') === 'true') return true;
    const controlledId = input.getAttribute('aria-controls');
    if (controlledId) {
      const controlled = document.getElementById(controlledId);
      if (controlled && controlled.getClientRects().length) return true;
    }
    const composer = input.closest('.chat-input, [data-a-target="chat-input"]') || input.parentElement;
    return !!(composer && composer.querySelector(
      '[role="listbox"], [data-a-target*="suggest"], [data-a-target*="autocomplete"], ' +
      '[data-test-selector*="suggest"], [data-test-selector*="autocomplete"], [class*="autocomplete"]'
    ));
  }

  function navigateSentHistory(input, direction) {
    const history = sentHistoryByChannel.get(currentChannelKey()) || [];
    if (!history.length || !historyBoundary(input, direction)) return false;
    if (direction < 0) {
      if (historyCursor < 0) historyScratch = composerValue(input);
      if (historyCursor >= history.length - 1) return false;
      historyCursor++;
      setComposerValue(input, history[history.length - 1 - historyCursor]);
    } else {
      if (historyCursor < 0) return false;
      historyCursor--;
      setComposerValue(input, historyCursor < 0 ? historyScratch : history[history.length - 1 - historyCursor]);
    }
    return true;
  }

  function replyActionToken(button) {
    if (!button) return '';
    const replyContainer = button.closest && button.closest('.chat-line__reply-icon');
    return [
      button.id,
      button.className,
      button.getAttribute && button.getAttribute('data-a-target'),
      button.getAttribute && button.getAttribute('data-test-selector'),
      button.getAttribute && button.getAttribute('data-a-tooltip'),
      button.getAttribute && button.getAttribute('aria-label'),
      replyContainer && replyContainer.className,
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function bindComposerDocumentEvents() {
    if (composerDocumentEventsBound) return;
    composerDocumentEventsBound = true;
    document.addEventListener('input', (event) => {
      const input = composerFromEventTarget(event.target);
      if (!input) return;
      if (input !== composerInput) {
        composerInput = input;
        bindComposer(input);
      }
      ensureCharacterCounter(input);
      updateCharacterCounter(input);
    }, true);
    ['beforeinput', 'keyup', 'paste', 'cut', 'compositionend'].forEach((type) => {
      document.addEventListener(type, (event) => {
        const input = composerFromEventTarget(event.target);
        if (input) scheduleCharacterCounterUpdate(input);
      }, true);
    });
    document.addEventListener('paste', (event) => {
      if (!CONFIG.saferSending) return;
      const input = composerFromEventTarget(event.target);
      if (!input) return;
      const pasted = event.clipboardData && event.clipboardData.getData('text/plain');
      if (!pasted) return;
      const lines = pasted.split(/\r\n|\r|\n/).length;
      if (pasted.length >= LARGE_PASTE_CHARS || lines >= LARGE_PASTE_LINES) {
        showComposerNotice(tf('largePasteWarning', { chars: pasted.length, lines }), 'warning', 4600);
      }
    }, true);
    document.addEventListener('click', (event) => {
      const button = event.target.closest && event.target.closest('button,[role="button"]');
      if (!button) return;
      if (button.matches && button.matches('button[data-a-target="chat-send-button"]')) {
        if (composerInput && !allowSendAttempt(composerInput)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        if (composerInput) schedulePendingSend(composerInput);
        return;
      }
    }, true);
    document.addEventListener('keydown', (event) => {
      const input = composerFromEventTarget(event.target);
      const sendKey = input && event.key === 'Enter' && !event.isComposing &&
        !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey;
      if (sendKey) {
        if (!allowSendAttempt(input)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        schedulePendingSend(input);
      }
    }, true);
    window.addEventListener('beforeunload', () => {
      if (CONFIG.preserveDrafts && composerInput) saveDraftNow(composerChannel || currentChannelKey(), composerValue(composerInput));
    });
  }

  function syncComposerObserver(input) {
    if (input === observedComposerInput) return;
    if (composerObserver) composerObserver.disconnect();
    composerObserver = null;
    observedComposerInput = null;
    if (!input || !input.isContentEditable || !window.MutationObserver) return;
    observedComposerInput = input;
    composerObserver = new MutationObserver(() => {
      if (input.isConnected) scheduleCharacterCounterUpdate(input);
    });
    composerObserver.observe(input, { childList: true, characterData: true, subtree: true });
  }

  function bindComposer(input) {
    syncComposerObserver(input);
    if (composerBindings.has(input)) return;
    composerBindings.add(input);
    input.addEventListener('input', () => {
      const value = composerValue(input);
      updateCharacterCounter(input);
      let sentTransition = false;
      const pending = pendingComposerSends.get(input);
      if (pending) {
        if (Date.now() - pending.created >= 2000 || (value && value !== pending.text)) pendingComposerSends.delete(input);
        else if (!value) {
          commitPendingSend(input);
          sentTransition = true;
        }
      }
      if (programmaticComposerInputs.has(input)) return;
      historyCursor = -1;
      historyScratch = '';
      if (CONFIG.preserveDrafts && !sentTransition) scheduleDraftSave(currentChannelKey(), value);
    });
    input.addEventListener('keydown', (event) => {
      if (event.isComposing) return;
      if (CONFIG.sentMessageHistory && !nativeComposerSuggestionsOpen(input) &&
          !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        if (event.key === 'ArrowUp' && navigateSentHistory(input, -1)) { event.preventDefault(); event.stopPropagation(); return; }
        if (event.key === 'ArrowDown' && navigateSentHistory(input, 1)) { event.preventDefault(); event.stopPropagation(); return; }
      }
    }, true);
    const form = input.closest('form');
    if (form && !composerForms.has(form)) {
      composerForms.add(form);
      form.addEventListener('submit', () => {
        const current = findComposerInput();
        if (current) schedulePendingSend(current);
      }, true);
    }
  }

  function ensureComposerTools() {
    bindComposerDocumentEvents();
    const input = findComposerInput();
    const channel = currentChannelKey();
    const inputChanged = input && input !== composerInput;
    const channelChanged = channel !== composerChannel;
    if (channelChanged && composerInput && composerChannel && CONFIG.preserveDrafts) {
      saveDraftNow(composerChannel, composerValue(composerInput));
    }
    if (channelChanged) {
      composerChannel = channel;
      historyCursor = -1;
      historyScratch = '';
    }
    composerInput = input;
    if (!input) {
      syncComposerObserver(null);
      removeCharacterCounter();
      removeConnectionStatus();
      return;
    }
    bindComposer(input);
    if ((inputChanged || channelChanged) && CONFIG.preserveDrafts && !composerValue(input)) {
      const draft = storedDraft(channel);
      if (draft) setComposerValue(input, draft);
    }
    ensureCharacterCounter(input);
    ensureConnectionStatus();
  }

  function removeFooterButton(id) {
    const wrap = document.getElementById(id + '-wrap');
    const btn = document.getElementById(id);
    if (wrap) wrap.remove();
    else if (btn) btn.remove();
  }

  function ensureExtraButtons() {
    if (!CONFIG.dashboard) {
      setDashboardOpen(false);
      removeFooterButton('bt-dash-btn');
    }
    if (CONFIG.dashboard && !document.getElementById('bt-dash-btn')) {
      makeFooterButton('bt-dash-btn', t('dashBtnTitle'),
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 13h3v7H4v-7Zm6.5-9h3v16h-3V4ZM17 9h3v11h-3V9Z"/></svg>',
        (event) => {
          event.stopPropagation();
          const willOpen = !dashboardOpen;
          if (willOpen) closeFeaturePanels('dashboard');
          setDashboardOpen(willOpen);
          if (dashboardOpen) {
            const button = document.getElementById('bt-dash-btn');
            if (button) positionPanel(ensureDashPanel(), button);
          }
        },
        document.getElementById('bt-inbox-btn') ? 'bt-inbox-btn' : 'bt-settings-btn');
    }
    if (!CONFIG.mentionInbox) {
      setInboxOpen(false);
      removeFooterButton('bt-inbox-btn');
    }
    if (CONFIG.mentionInbox && !document.getElementById('bt-inbox-btn')) {
      makeFooterButton('bt-inbox-btn', t('inboxBtnTitle'),
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a6 6 0 0 0-6 6c0 3.5-1 5-2 6v1h16v-1c-1-1-2-2.5-2-6a6 6 0 0 0-6-6Zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Z"/></svg>',
        (e) => {
          e.stopPropagation();
          const btn = document.getElementById('bt-inbox-btn');
          const willOpen = !inboxOpen;
          if (willOpen) closeFeaturePanels('inbox');
          const p = ensureInboxPanel();
          setInboxOpen(willOpen);
          if (inboxOpen) {
            mentionUnread = 0;
            updateInboxBadge();
            renderInbox();
            positionPanel(p, btn);
            p.scrollTop = p.scrollHeight;
          }
        },
        'bt-settings-btn');
      updateInboxBadge();
    }
    updateFooterPanelButton('bt-inbox-btn', inboxOpen);
    updateFooterPanelButton('bt-dash-btn', dashboardOpen);
    const chatControlsEnabled = CONFIG.quickChatFilters || CONFIG.liveChatSearch;
    if (!chatControlsEnabled) {
      setChatControlOpen(false);
      removeFooterButton('bt-chat-control-btn');
    }
    if (chatControlsEnabled && !document.getElementById('bt-chat-control-btn')) {
      const beforeId = document.getElementById('bt-dash-btn') ? 'bt-dash-btn'
        : (document.getElementById('bt-inbox-btn') ? 'bt-inbox-btn' : 'bt-settings-btn');
      makeFooterButton('bt-chat-control-btn', t('chatControlBtnTitle'),
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5h11v2H3V5Zm0 6h8v2H3v-2Zm0 6h5v2H3v-2Zm13.5-7a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/><path d="m19.8 18.4 2.7 2.7-1.4 1.4-2.7-2.7 1.4-1.4Z"/></svg>',
        (event) => {
          event.stopPropagation();
          const willOpen = !chatControlOpen;
          if (willOpen) closeFeaturePanels('chatControls');
          setChatControlOpen(willOpen);
          if (chatControlOpen) {
            const button = document.getElementById('bt-chat-control-btn');
            if (button) positionPanel(ensureChatControlPanel(), button);
          }
        },
        beforeId);
    }
    updateChatControlButton();
  }

  const pending = [];

  function enqueue(task) {
    task.tries = 0;
    if (pending.length >= MAX_DELETE_TASKS) pending.splice(0, pending.length - MAX_DELETE_TASKS + 1);
    pending.push(task);
    resolveSoon();
  }

  function lineLogin(el) {
    const u = el.querySelector('[data-a-user]');
    if (u) return (u.getAttribute('data-a-user') || '').toLowerCase();
    const dn = el.querySelector('[data-a-target="chat-message-username"], .chat-author__display-name');
    return dn ? dn.textContent.trim().toLowerCase() : '';
  }

  function lineDisplayName(el) {
    const name = el.querySelector('[data-a-target="chat-message-username"], .chat-author__display-name');
    return name ? name.textContent.trim().toLowerCase() : '';
  }

  function lineText(el) {
    let parts = el.querySelectorAll('[data-a-target="chat-message-text"]');
    if (!parts.length) parts = el.querySelectorAll('.text-fragment');
    if (!parts.length) return '';
    return Array.from(parts).map(p => p.textContent).join('').replace(/\s+/g, ' ').trim();
  }

  function lineCopyText(el) {
    const body = el.querySelector('[data-a-target="chat-line-message-body"]');
    if (!body) return lineText(el);
    const clone = body.cloneNode(true);
    clone.querySelectorAll('.bt-copy, .bt-trash, .bt-translate, .bt-spam-toggle, .bt-link-domain').forEach(n => n.remove());
    clone.querySelectorAll('img').forEach(img => img.replaceWith(document.createTextNode(img.alt || '')));
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function lineMessageId(el) {
    const attrs = ['data-id', 'data-message-id', 'data-a-message-id', 'data-bt-message-id'];
    for (const attr of attrs) {
      const value = el.getAttribute && el.getAttribute(attr);
      if (value) return value;
    }
    const nested = el.querySelector && el.querySelector(
      '[data-a-target="chat-line-message"][data-id], [data-a-target="chat-line-message"][data-message-id]'
    );
    if (!nested) return '';
    return nested.getAttribute('data-id') || nested.getAttribute('data-message-id') || '';
  }

  function updateSpamGroup(group) {
    if (!group || !group.root || !group.root.isConnected) return;
    group.lines = group.lines.filter((line) => line.isConnected);
    const count = group.lines.length;
    if (count < SPAM_MIN_MATCHES) return;
    group.root.classList.add('bt-spam-root');
    group.lines.slice(1).forEach((line) => {
      if (!line.isConnected) return;
      line.classList.add('bt-spam-duplicate');
      line.classList.toggle('bt-spam-show', group.expanded);
    });
    if (!group.button || !group.button.isConnected) {
      group.button = document.createElement('button');
      group.button.type = 'button';
      group.button.className = 'bt-spam-toggle';
      group.button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        group.expanded = !group.expanded;
        updateSpamGroup(group);
      });
      const body = group.root.querySelector('[data-a-target="chat-line-message-body"]') || group.root;
      body.appendChild(group.button);
    }
    group.button.textContent = tf('spamCollapsed', { count });
    group.button.title = group.expanded ? t('spamCollapse') : t('spamExpand');
    group.button.setAttribute('aria-label', group.button.title + ': ' + count);
    group.button.setAttribute('aria-expanded', group.expanded ? 'true' : 'false');
  }

  function resetSpamCompression() {
    spamGroupsBySignature.clear();
    document.querySelectorAll('.chat-line__message[data-bt-spam-processed]').forEach((line) => {
      line.classList.remove('bt-spam-root', 'bt-spam-duplicate', 'bt-spam-show');
      delete line.dataset.btSpamProcessed;
      const button = line.querySelector('.bt-spam-toggle');
      if (button) button.remove();
    });
  }

  function pruneSpamGroups() {
    if (++spamPruneCounter % 25) return;
    for (const [signature, group] of spamGroupsBySignature) {
      if (!group.root || !group.root.isConnected) spamGroupsBySignature.delete(signature);
    }
  }

  function applySpamCompression(el) {
    if (!CONFIG.spamCompression || el.dataset.btSpamProcessed) return;
    pruneSpamGroups();
    el.dataset.btSpamProcessed = '1';
    const normalized = lineText(el).toLowerCase().replace(/\s+/g, ' ').trim();
    if (normalized.length < 3) return;
    const meta = metadataForLine(el);
    const timestamp = meta && meta.record ? meta.record.t : Date.now();
    let group = spamGroupsBySignature.get(normalized);
    if (!group || !group.root.isConnected || timestamp - group.lastAt > SPAM_WINDOW_MS) {
      group = { root: el, lines: [el], firstAt: timestamp, lastAt: timestamp, expanded: false, button: null };
      spamGroupsBySignature.set(normalized, group);
      if (spamGroupsBySignature.size > 120) spamGroupsBySignature.delete(spamGroupsBySignature.keys().next().value);
      return;
    }
    group.lines.push(el);
    group.lastAt = timestamp;
    updateSpamGroup(group);
  }

  const SHORT_LINK_HOSTS = new Set([
    'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'buff.ly', 'cutt.ly', 'is.gd',
    'rebrand.ly', 'shorturl.at', 'tiny.one', 'rb.gy',
  ]);

  function linkRisk(host) {
    const value = String(host || '').toLowerCase().replace(/\.$/, '');
    if (!value) return '';
    if (SHORT_LINK_HOSTS.has(value)) return 'short';
    if (value.includes('xn--')) return 'punycode';
    if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value) || value.startsWith('[')) return 'ip';
    if (value.split('.').some((part) => part.length > 40) || value.length > 90) return 'long';
    return '';
  }

  function clearSaferLinks(el) {
    el.querySelectorAll('.bt-link-domain').forEach((pill) => pill.remove());
    el.querySelectorAll('a.bt-safe-link').forEach((anchor) => {
      anchor.classList.remove('bt-safe-link', 'bt-risky-link');
      delete anchor.dataset.btLinkRisk;
    });
    delete el.dataset.btSaferLinks;
  }

  function applySaferLinks(el) {
    const desired = CONFIG.saferLinks ? '1' : '0';
    if (el.dataset.btSaferLinks === desired) return;
    clearSaferLinks(el);
    el.dataset.btSaferLinks = desired;
    if (!CONFIG.saferLinks) return;
    const body = el.querySelector('[data-a-target="chat-line-message-body"]') || el;
    body.querySelectorAll('a[href]').forEach((anchor) => {
      let url;
      try { url = new URL(anchor.href, location.href); } catch (e) { return; }
      if (!/^https?:$/.test(url.protocol) || url.hostname === location.hostname) return;
      const host = url.hostname.replace(/^www\./i, '').toLowerCase();
      const risk = linkRisk(host);
      anchor.classList.add('bt-safe-link');
      anchor.dataset.btLinkRisk = risk;
      if (risk) anchor.classList.add('bt-risky-link');
      if (!anchor.dataset.btSafeLinkBound) {
        anchor.dataset.btSafeLinkBound = '1';
        anchor.addEventListener('click', (event) => {
          if (!CONFIG.saferLinks || !anchor.dataset.btLinkRisk) return;
          let targetHost = '';
          try { targetHost = new URL(anchor.href, location.href).hostname.replace(/^www\./i, ''); } catch (e) {}
          if (!confirm(tf('unsafeLinkConfirm', { domain: targetHost || anchor.href }))) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        }, true);
      }
      const pill = document.createElement('span');
      pill.className = 'bt-link-domain' + (risk ? ' bt-link-risk' : '');
      pill.textContent = (risk ? '⚠ ' : '↗ ') + host;
      pill.title = risk ? t('unsafeLinkLabel') : host;
      anchor.insertAdjacentElement('afterend', pill);
    });
  }

  function lineHasEmote(el) {
    const meta = metadataForLine(el);
    return !!((meta && meta.record && meta.record.emotes && meta.record.emotes.length) ||
      el.querySelector('img[data-a-target*="emote"], img.chat-image, [data-test-selector*="emote"] img'));
  }

  function lineHasLink(el) {
    if (el.querySelector('a[href]')) return true;
    return /(?:https?:\/\/|www\.)\S+/i.test(lineCopyText(el));
  }

  function chatFilterMatches(el, filter) {
    if (!filter || filter === 'all') return true;
    if (filter === 'mentions') return lineMentionsMe(el);
    if (filter === 'mods') return lineHasMod(el);
    if (filter === 'questions') return /[?？]/.test(lineCopyText(el));
    if (filter === 'links') return lineHasLink(el);
    if (filter === 'emotes') return lineHasEmote(el);
    return true;
  }

  function applyChatFilterToLine(el) {
    el.classList.toggle('bt-filter-hidden', CONFIG.quickChatFilters && !chatFilterMatches(el, activeChatFilter));
  }

  function matchesChatSearch(el, query) {
    const needle = String(query || '').trim().toLowerCase();
    if (!needle) return true;
    const usernameNeedle = needle.startsWith('@') && needle.length > 1 ? needle.slice(1) : needle;
    const login = lineLogin(el);
    const displayName = lineDisplayName(el);
    const message = lineCopyText(el).toLowerCase();
    return login.includes(usernameNeedle) || displayName.includes(usernameNeedle) || message.includes(needle);
  }

  function updateSearchControls() {
    const count = chatControlPanel && chatControlPanel.querySelector('.bt-search-count');
    const previous = chatControlPanel && chatControlPanel.querySelector('[data-bt-search-nav="-1"]');
    const next = chatControlPanel && chatControlPanel.querySelector('[data-bt-search-nav="1"]');
    const total = chatSearchMatches.length;
    if (count) count.textContent = total
      ? tf('searchResultCount', { current: chatSearchIndex + 1, total })
      : (chatSearchQuery ? t('searchNoResults') : '0/0');
    if (previous) previous.disabled = !total;
    if (next) next.disabled = !total;
    updateChatControlButton();
  }

  function focusSearchResult(scroll) {
    document.querySelectorAll('.chat-line__message.bt-search-current').forEach((line) => line.classList.remove('bt-search-current'));
    const current = chatSearchMatches[chatSearchIndex];
    if (!current) { updateSearchControls(); return; }
    current.classList.add('bt-search-current');
    if (scroll) {
      try { current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { current.scrollIntoView(); }
    }
    updateSearchControls();
  }

  function runChatSearch(keepIndex) {
    clearTimeout(chatSearchTimer);
    chatSearchTimer = null;
    const lines = Array.from(document.querySelectorAll('.chat-line__message'));
    chatSearchMatches = [];
    lines.forEach((line) => {
      const match = !CONFIG.liveChatSearch || !chatSearchQuery || matchesChatSearch(line, chatSearchQuery);
      line.classList.toggle('bt-search-hidden', !match);
      line.classList.remove('bt-search-current');
      if (chatSearchQuery && match) chatSearchMatches.push(line);
    });
    if (!chatSearchMatches.length) chatSearchIndex = -1;
    else if (!keepIndex || chatSearchIndex < 0) chatSearchIndex = 0;
    else chatSearchIndex = Math.min(chatSearchIndex, chatSearchMatches.length - 1);
    focusSearchResult(false);
  }

  function scheduleChatSearch() {
    if (!CONFIG.liveChatSearch || !chatSearchQuery || chatSearchTimer) return;
    chatSearchTimer = setTimeout(() => runChatSearch(true), 80);
  }

  function navigateChatSearch(direction) {
    if (!chatSearchMatches.length) return;
    chatSearchIndex = (chatSearchIndex + direction + chatSearchMatches.length) % chatSearchMatches.length;
    focusSearchResult(true);
  }

  function updateFilterButtons() {
    if (chatControlPanel) chatControlPanel.querySelectorAll('[data-bt-filter]').forEach((button) => {
      const active = button.dataset.btFilter === activeChatFilter;
      button.classList.toggle('bt-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    updateChatControlButton();
  }

  function updateChatControlButton() {
    const button = document.getElementById('bt-chat-control-btn');
    if (!button) return;
    const filtering = CONFIG.quickChatFilters && activeChatFilter !== 'all';
    const searching = CONFIG.liveChatSearch && !!chatSearchQuery;
    button.classList.toggle('bt-state-active', filtering || searching);
    updateFooterPanelButton('bt-chat-control-btn', chatControlOpen);
  }

  function ensureChatControlPanel() {
    if (chatControlPanel) return chatControlPanel;
    chatControlPanel = document.createElement('div');
    chatControlPanel.id = 'bt-chat-controls';
    chatControlPanel.className = 'bt-pop';
    chatControlPanel.setAttribute('role', 'dialog');
    chatControlPanel.setAttribute('aria-label', t('chatControlTitle'));
    chatControlPanel.setAttribute('aria-hidden', 'true');
    document.body.appendChild(chatControlPanel);
    document.addEventListener('click', (event) => {
      if (chatControlOpen && !eventInside(event, chatControlPanel) &&
          !(event.target.closest && event.target.closest('#bt-chat-control-btn'))) {
        setChatControlOpen(false);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && chatControlOpen) setChatControlOpen(false);
    });
    return chatControlPanel;
  }

  function appendChatFilterControls(root) {
    const filters = [
      ['all', 'filterAll'], ['mentions', 'filterMentions'], ['mods', 'filterMods'],
      ['questions', 'filterQuestions'], ['links', 'filterLinks'], ['emotes', 'filterEmotes'],
    ];
    const section = document.createElement('section');
    section.className = 'bt-chat-control-section';
    const title = document.createElement('div');
    title.className = 'bt-chat-control-label';
    title.textContent = t('quickChatFilters');
    const bar = document.createElement('div');
    bar.className = 'bt-filter-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', t('quickChatFilters'));
    filters.forEach(([value, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.btFilter = value;
      button.textContent = t(label);
      button.addEventListener('click', () => {
        activeChatFilter = value;
        updateFilterButtons();
        document.querySelectorAll('.chat-line__message').forEach(applyChatFilterToLine);
      });
      bar.appendChild(button);
    });
    section.appendChild(title);
    section.appendChild(bar);
    root.appendChild(section);
  }

  function appendChatSearchControls(root) {
    const section = document.createElement('section');
    section.className = 'bt-chat-control-section';
    const title = document.createElement('div');
    title.className = 'bt-chat-control-label';
    title.textContent = t('liveChatSearch');
    const search = document.createElement('div');
    search.className = 'bt-chat-search';
    const input = document.createElement('input');
    input.type = 'search';
    input.value = chatSearchQuery;
    input.placeholder = t('searchPlaceholder');
    input.setAttribute('aria-label', t('searchPlaceholder'));
    input.addEventListener('input', () => {
      chatSearchQuery = input.value.trim();
      chatSearchIndex = -1;
      runChatSearch(false);
    });
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.dataset.btSearchNav = '-1';
    previous.textContent = '‹';
    previous.title = t('searchPrevious');
    previous.setAttribute('aria-label', t('searchPrevious'));
    previous.addEventListener('click', () => navigateChatSearch(-1));
    const count = document.createElement('span');
    count.className = 'bt-search-count';
    const next = document.createElement('button');
    next.type = 'button';
    next.dataset.btSearchNav = '1';
    next.textContent = '›';
    next.title = t('searchNext');
    next.setAttribute('aria-label', t('searchNext'));
    next.addEventListener('click', () => navigateChatSearch(1));
    search.appendChild(input);
    search.appendChild(previous);
    search.appendChild(count);
    search.appendChild(next);
    section.appendChild(title);
    section.appendChild(search);
    root.appendChild(section);
  }

  function renderChatControlPanel() {
    const controls = ensureChatControlPanel();
    controls.innerHTML = '<div class="bt-pop-head"><span class="bt-pop-title">' +
      esc(t('chatControlTitle')) + '</span><a class="bt-version" href="' + PROJECT_URL +
      '" target="_blank" rel="noopener noreferrer">v' + VERSION + '</a></div>';
    const body = document.createElement('div');
    body.className = 'bt-chat-control-body';
    if (CONFIG.quickChatFilters) appendChatFilterControls(body);
    if (CONFIG.liveChatSearch) appendChatSearchControls(body);
    controls.appendChild(body);
    chatControlSignature = [currentLang(), CONFIG.quickChatFilters, CONFIG.liveChatSearch].join('|');
    updateFilterButtons();
    updateSearchControls();
  }

  function setChatControlOpen(open) {
    chatControlOpen = !!(open && (CONFIG.quickChatFilters || CONFIG.liveChatSearch));
    const controls = (chatControlOpen || chatControlPanel) ? ensureChatControlPanel() : null;
    if (controls) {
      if (chatControlOpen) renderChatControlPanel();
      setSurfaceOpen(controls, chatControlOpen);
    }
    updateChatControlButton();
  }

  function syncChatControlAvailability() {
    if (!CONFIG.quickChatFilters && activeChatFilter !== 'all') {
      activeChatFilter = 'all';
      document.querySelectorAll('.chat-line__message.bt-filter-hidden').forEach((line) => line.classList.remove('bt-filter-hidden'));
    }
    if (!CONFIG.liveChatSearch &&
        (chatSearchQuery || chatSearchMatches.length || document.querySelector('.chat-line__message.bt-search-hidden, .chat-line__message.bt-search-current'))) {
      chatSearchQuery = '';
      chatSearchMatches = [];
      chatSearchIndex = -1;
      clearTimeout(chatSearchTimer);
      chatSearchTimer = null;
      document.querySelectorAll('.chat-line__message.bt-search-hidden, .chat-line__message.bt-search-current').forEach((line) => {
        line.classList.remove('bt-search-hidden', 'bt-search-current');
      });
    }
    if (!CONFIG.quickChatFilters && !CONFIG.liveChatSearch) setChatControlOpen(false);
    else if (chatControlOpen) {
      const signature = [currentLang(), CONFIG.quickChatFilters, CONFIG.liveChatSearch].join('|');
      if (signature !== chatControlSignature) renderChatControlPanel();
    }
    updateFilterButtons();
    updateSearchControls();
  }

  function metadataForLine(el) {
    if (lineMeta.has(el)) return lineMeta.get(el);
    const id = lineMessageId(el);
    let meta = id ? messageMetaById.get(id) : null;
    if (!meta) {
      const login = lineLogin(el);
      const text = lineCopyText(el);
      for (let i = recentMessageMeta.length - 1; i >= 0; i--) {
        const candidate = recentMessageMeta[i];
        if (!candidate.assigned && candidate.login === login && candidate.text.replace(/\s+/g, ' ').trim() === text) {
          meta = candidate;
          break;
        }
      }
    }
    if (!meta) return null;
    meta.assigned = true;
    lineMeta.set(el, meta);
    if (!id && meta.id) el.setAttribute('data-bt-message-id', meta.id);
    return meta;
  }

  function applyChatterSpotlight(el) {
    const meta = metadataForLine(el);
    const first = !!(meta && meta.first && CONFIG.highlightFirstChatters);
    const returning = !!(meta && !first && meta.returning && CONFIG.highlightReturningChatters);
    el.classList.toggle('bt-first-chatter', first);
    el.classList.toggle('bt-returning-chatter', returning);
    let chip = el.querySelector('.bt-chatter-chip');
    if (!first && !returning) {
      if (chip) chip.remove();
      return;
    }
    if (!chip) {
      chip = document.createElement('span');
      chip.className = 'bt-chatter-chip';
      const name = el.querySelector('.chat-line__username-container')
        || el.querySelector('[data-a-target="chat-message-username"]')
        || el.querySelector('.chat-author__display-name');
      if (name && name.parentNode) name.parentNode.insertBefore(chip, name.nextSibling);
      else el.insertBefore(chip, el.firstChild);
    }
    chip.classList.toggle('bt-first-chip', first);
    chip.classList.toggle('bt-returning-chip', returning);
    chip.textContent = first ? t('firstChatterLabel') : t('returningChatterLabel');
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
    const domExposesMessageIds = lines.some((el) => !!lineMessageId(el));
    for (let i = pending.length - 1; i >= 0; i--) {
      const task = pending[i]; let done = false;
      if (task.kind === 'all') { lines.forEach(mark); done = true; }
      else if (task.kind === 'user') {
        let any = false;
        for (const el of lines) if (!el.hasAttribute('data-bt') && lineLogin(el) === task.login) { mark(el); any = true; }
        if (any) done = true;
      } else {
        if (task.id) {
          const exact = lines.find((el) => lineMessageId(el) === task.id);
          if (exact) { mark(exact); done = true; }
        }
        if (!done && (!task.id || !domExposesMessageIds)) {
          const want = (task.text || '').replace(/\s+/g, ' ').trim(); let best = null;
          for (const el of lines) {
            if (el.hasAttribute('data-bt')) continue;
            if (lineLogin(el) !== task.login) continue;
            if (!want || lineCopyText(el) === want) best = el;
          }
          if (best) { mark(best); done = true; }
        }
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
    return isMention(lineCopyText(el), me);
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
    fetchWithTimeout('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: { 'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko', 'Content-Type': 'text/plain' },
      body: JSON.stringify({ query }),
    }, NETWORK_TIMEOUT_MS).then((r) => {
      if (!r.ok) throw new Error('Twitch avatar request failed');
      return r.json();
    }).then((d) => {
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
      if (nameEl.dataset.btColor === 'fixed') {
        const original = nameEl.dataset.btOriginalColor || '';
        const priority = nameEl.dataset.btOriginalColorPriority || '';
        if (original) nameEl.style.setProperty('color', original, priority);
        else nameEl.style.removeProperty('color');
      }
      if (nameEl.dataset.btColor) delete nameEl.dataset.btColor;
      delete nameEl.dataset.btOriginalColor;
      delete nameEl.dataset.btOriginalColorPriority;
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
    nameEl.dataset.btOriginalColor = nameEl.style.getPropertyValue('color') || '';
    nameEl.dataset.btOriginalColorPriority = nameEl.style.getPropertyPriority('color') || '';
    nameEl.style.setProperty('color', 'rgb(' + nr + ',' + ng + ',' + nb + ')', 'important');
    nameEl.dataset.btColor = 'fixed';
  }

  const MESSAGE_ACTION_ICONS = {
    reply: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7 4 12l5 5v-3h4c3.5 0 5.8 1.2 7 4-.2-6-3.2-9-7-9H9V7Z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1"/></svg>',
    translate: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  };

  function setMessageAction(bar, action, enabled, title, icon, handler) {
    let button = bar.querySelector('[data-bt-message-action="' + action + '"]');
    if (!enabled) { if (button) button.remove(); return null; }
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'bt-action-btn bt-action-' + action;
      if (action === 'copy') button.classList.add('bt-copy');
      if (action === 'translate') button.classList.add('bt-translate');
      button.dataset.btMessageAction = action;
      button.addEventListener('click', handler);
      bar.appendChild(button);
    }
    if (button.dataset.btTooltip !== title) {
      button.dataset.btTooltip = title;
      button.setAttribute('aria-label', title);
    }
    if (button.dataset.btIcon !== action) {
      button.dataset.btIcon = action;
      button.innerHTML = icon;
    }
    return button;
  }

  function findNativeReplyButton(line) {
    const replyContainerButton = line.querySelector(
      '.chat-line__reply-icon button, .chat-line__reply-icon [role="button"]'
    );
    if (replyContainerButton) return replyContainerButton;
    return Array.from(line.querySelectorAll('button,[role="button"]')).find((button) =>
      !button.closest('.bt-message-actions') && replyActionToken(button).includes('reply')
    ) || null;
  }

  function triggerMessageReply(line) {
    const activate = () => {
      const nativeButton = findNativeReplyButton(line);
      if (!nativeButton) return false;
      delete line.dataset.btReplyPending;
      nativeButton.click();
      return true;
    };
    if (activate()) return;
    if (line.dataset.btReplyPending) return;
    line.dataset.btReplyPending = '1';
    try {
      if (typeof PointerEvent === 'function') {
        line.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      }
    } catch (e) {}
    try { line.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); } catch (e) {}
    try { line.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false })); } catch (e) {}
    let attempts = 0;
    const retry = () => {
      if (activate()) return;
      if (++attempts < 6) {
        setTimeout(retry, 50);
        return;
      }
      delete line.dataset.btReplyPending;
      showComposerNotice(t('replyUnavailable'), 'warning', 2600);
    };
    setTimeout(retry, 50);
  }

  function ensureMessageActionBar(el) {
    el.querySelectorAll('.bt-copy, .bt-translate').forEach((button) => {
      if (!button.closest('.bt-message-actions')) button.remove();
    });
    if (!CONFIG.inlineTranslate) {
      const output = el.querySelector('.bt-trans');
      if (output) output.remove();
    }
    let bar = el.querySelector('.bt-message-actions');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'bt-message-actions';
      bar.setAttribute('role', 'toolbar');
      bar.addEventListener('mouseleave', () => {
        const focusedAction = bar.querySelector('.bt-action-btn:focus');
        if (focusedAction) focusedAction.blur();
      });
      el.appendChild(bar);
    }
    el.classList.add('bt-actions-ready');
    bar.setAttribute('aria-label', t('messageActions'));
    setMessageAction(bar, 'reply', true, t('replyMessageAction'), MESSAGE_ACTION_ICONS.reply, (event) => {
      event.preventDefault(); event.stopPropagation(); triggerMessageReply(el);
    });
    setMessageAction(bar, 'copy', CONFIG.copyButton, t('copyMessage'), MESSAGE_ACTION_ICONS.copy, (event) => {
      event.preventDefault(); event.stopPropagation();
      try { navigator.clipboard.writeText(lineCopyText(el)); } catch (e) {}
    });
    setMessageAction(bar, 'translate', CONFIG.inlineTranslate, t('inlineTranslate'), MESSAGE_ACTION_ICONS.translate, (event) => {
      event.preventDefault(); event.stopPropagation();
      const existing = el.querySelector('.bt-trans');
      if (existing) existing.remove(); else translateLine(el);
    });
  }

  function addViewerHovercard(el) {
    const anchor = el.querySelector('[data-a-target="chat-message-username"], .chat-author__display-name');
    if (!anchor || anchor.dataset.btHovercard) return;
    anchor.dataset.btHovercard = '1';
    anchor.addEventListener('mouseenter', () => showViewerHovercard(el, anchor));
    anchor.addEventListener('mouseleave', hideViewerHovercard);
  }

  function processLine(el, isNew) {
    try {
      el.classList.toggle('bt-mention', CONFIG.mentionHighlight && lineMentionsMe(el));
      el.classList.toggle('bt-mod', CONFIG.highlightMods && lineHasMod(el));
      el.classList.toggle('bt-vip', CONFIG.highlightVips && lineHasVip(el));
      el.classList.toggle('bt-hidden', shouldHide(el));
      applyChatterSpotlight(el);
      addAvatar(el);
      fixNameColor(el);
      ensureMessageActionBar(el);
      addViewerHovercard(el);
      applySaferLinks(el);
      applySpamCompression(el);
      applyChatFilterToLine(el);
      if (isNew && !el.dataset.btNewHandled) {
        el.dataset.btNewHandled = '1';
        scheduleChatSearch();
      }
    } catch (e) {}
  }

  function syncAll() { botCache = null; document.querySelectorAll('.chat-line__message').forEach(processLine); }

  let chatObserver = null, observedChat = null, sweepTimer = null;

  function disconnectChatObserver() {
    if (chatObserver) chatObserver.disconnect();
    chatObserver = null;
    observedChat = null;
    if (sweepTimer) clearInterval(sweepTimer);
    sweepTimer = null;
  }

  function ensureChatObserver() {
    const container = document.querySelector('.chat-scrollable-area__message-container');
    if (!container) {
      if (observedChat && !observedChat.isConnected) {
        disconnectChatObserver();
        resetSpamCompression();
        chatSearchMatches = [];
        chatSearchIndex = -1;
      }
      return;
    }
    if (container === observedChat) return;
    disconnectChatObserver();
    resetSpamCompression();
    chatSearchMatches = [];
    chatSearchIndex = -1;
    chatObserver = new MutationObserver((muts) => {
      const lines = new Set();
      for (const m of muts) for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches && node.matches('.chat-line__message')) lines.add(node);
        const parentLine = node.closest && node.closest('.chat-line__message');
        if (parentLine) lines.add(parentLine);
        if (node.querySelectorAll) node.querySelectorAll('.chat-line__message').forEach((line) => lines.add(line));
      }
      lines.forEach((line) => processLine(line, true));
    });
    chatObserver.observe(container, { childList: true, subtree: true });
    observedChat = container;
    syncAll();
    if (chatSearchQuery) runChatSearch(false);
    let sweeps = 0;
    sweepTimer = setInterval(() => {
      syncAll();
      if (++sweeps >= CHAT_HYDRATION_SWEEPS) {
        clearInterval(sweepTimer);
        sweepTimer = null;
      }
    }, 700);
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

      .chat-line__message.bt-first-chatter { background-color: color-mix(in srgb, var(--bt-first,#9147ff) 13%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-first,#9147ff); }
      .chat-line__message.bt-returning-chatter { background-color: color-mix(in srgb, var(--bt-returning,#3cc8ff) 10%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-returning,#3cc8ff); }
      .chat-line__message.bt-mod { background-color: color-mix(in srgb, var(--bt-mod,#00ad03) 14%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-mod,#00ad03); }
      .chat-line__message.bt-vip { background-color: color-mix(in srgb, var(--bt-vip,#e005b9) 14%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-vip,#e005b9); }
      .chat-line__message.bt-mention { background-color: color-mix(in srgb, var(--bt-mention,#e31337) 16%, transparent) !important; box-shadow: inset 3px 0 0 var(--bt-mention,#e31337); }
      .bt-chatter-chip { display: inline-block; margin: 0 5px; padding: 1px 4px; border-radius: 3px; color: #fff; font-size: 8px; font-weight: 800; line-height: 1.4; vertical-align: 2px; letter-spacing: .04em; }
      .bt-chatter-chip.bt-first-chip { background: var(--bt-first,#9147ff); }
      .bt-chatter-chip.bt-returning-chip { background: var(--bt-returning,#3cc8ff); color: #111; }
      .chat-line__message.bt-focus-pulse { animation: bt-focus-pulse 2.2s ease-out; }
      @keyframes bt-focus-pulse { 0%,35% { background: color-mix(in srgb, var(--bt-accent,#e31337) 45%, transparent); box-shadow: inset 4px 0 var(--bt-accent,#e31337), 0 0 18px color-mix(in srgb, var(--bt-accent,#e31337) 45%, transparent); } 100% { box-shadow: none; } }

      .chat-line__message { position: relative; }
      .chat-line__message.bt-actions-ready .chat-line__reply-icon { display: none !important; }
      .chat-line__message .bt-message-actions { position: absolute; z-index: 5; top: 0; right: 4px; display: flex; align-items: center; gap: 2px; padding: 2px; border: 1px solid #3a3a42; border-radius: 5px; background: rgba(24,24,27,.96); box-shadow: 0 3px 12px rgba(0,0,0,.4); opacity: 0; pointer-events: none; transition: opacity .1s ease; }
      .chat-line__message:hover .bt-message-actions, .chat-line__message .bt-message-actions:focus-within { opacity: 1; pointer-events: auto; }
      .chat-line__message .bt-action-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 27px; height: 27px; margin: 0; padding: 5px; border: 0; border-radius: 4px; background: transparent; color: #b7b7c2; cursor: pointer; }
      .chat-line__message .bt-action-btn:hover, .chat-line__message .bt-action-btn:focus { background: #34343b; color: #fff; outline: 2px solid color-mix(in srgb,var(--bt-accent,#e31337) 58%,transparent); outline-offset: -1px; }
      .chat-line__message .bt-action-btn svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; }
      .chat-line__message .bt-action-btn::after { content: attr(data-bt-tooltip); position: absolute; z-index: 8; top: calc(100% + 7px); right: 0; width: max-content; max-width: 220px; padding: 6px 9px; border: 1px solid #46464f; border-radius: 5px; background: #0e0e10; color: #efeff1; box-shadow: 0 4px 14px rgba(0,0,0,.48); font: 600 12px/1.35 Inter,Roobert,"Helvetica Neue",Arial,sans-serif; white-space: normal; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-2px); transition: opacity .1s ease,transform .1s ease,visibility 0s linear .1s; }
      .chat-line__message .bt-action-btn:hover::after, .chat-line__message .bt-action-btn:focus::after { opacity: 1; visibility: visible; transform: none; transition-delay: .28s; }
      @media (hover: none) { .chat-line__message .bt-message-actions { opacity: .88; pointer-events: auto; } }

      .chat-line__message.bt-hidden { display: none !important; }

      html.bt-hide-badges .chat-line__message img.chat-badge { display: none !important; }
      html.bt-hide-leaderboard .bt-top-users-hidden,
      html.bt-hide-community-highlights .bt-community-highlights-hidden { display: none !important; }
      html.bt-separators .chat-line__message { border-bottom: 1px solid rgba(255,255,255,.08) !important; }
      .bt-avatar { width: 18px; height: 18px; border-radius: 50%; object-fit: cover; vertical-align: middle; margin-right: 5px; display: inline-block; background: #2f2f35; }

      .bt-spam-toggle { display: inline-flex; align-items: center; margin-left: 7px; padding: 2px 7px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 38%,#414149); border-radius: 99px; background: color-mix(in srgb,var(--bt-accent,#e31337) 9%,#202025); color: #c7c7ce; font: 750 9px/1.4 Inter,Roobert,Arial,sans-serif; cursor: pointer; vertical-align: 1px; }
      .bt-spam-toggle:hover, .bt-spam-toggle:focus-visible { border-color: var(--bt-accent,#e31337); color: #fff; outline: none; }
      .chat-line__message.bt-spam-duplicate:not(.bt-spam-show), .chat-line__message.bt-filter-hidden, .chat-line__message.bt-search-hidden { display: none !important; }
      .chat-line__message.bt-spam-show { opacity: .76; border-left: 2px dashed color-mix(in srgb,var(--bt-accent,#e31337) 35%,transparent); }
      .chat-line__message.bt-search-current { background-color: color-mix(in srgb,var(--bt-accent,#e31337) 25%,transparent) !important; box-shadow: inset 4px 0 var(--bt-accent,#e31337),0 0 16px color-mix(in srgb,var(--bt-accent,#e31337) 18%,transparent); }
      .bt-safe-link { text-decoration-style: dotted !important; text-underline-offset: 2px; }
      .bt-risky-link { color: #ffbe72 !important; }
      .bt-link-domain { display: inline-flex; align-items: center; max-width: 150px; margin: 0 4px; padding: 1px 5px; overflow: hidden; border: 1px solid rgba(255,255,255,.11); border-radius: 99px; background: rgba(255,255,255,.045); color: #9999a3; font: 650 8px/1.45 ui-monospace,Menlo,Consolas,monospace; text-overflow: ellipsis; white-space: nowrap; vertical-align: 2px; }
      .bt-link-domain.bt-link-risk { border-color: rgba(255,184,107,.34); background: rgba(255,184,107,.09); color: #ffc27b; }

      .bt-filter-bar { display: flex; flex-wrap: wrap; gap: 5px; overflow: visible; padding: 0; scrollbar-width: none; }
      .bt-filter-bar::-webkit-scrollbar { display: none; }
      .bt-filter-bar button { flex: 0 0 auto; min-height: 25px; padding: 3px 8px; border: 1px solid #393941; border-radius: 99px; background: #222228; color: #a5a5ae; font: inherit; cursor: pointer; }
      .bt-filter-bar button:hover, .bt-filter-bar button:focus-visible { border-color: #565660; color: #fff; outline: none; }
      .bt-filter-bar button.bt-active { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 62%,#fff); background: color-mix(in srgb,var(--bt-accent,#e31337) 19%,#24242a); color: #fff; box-shadow: 0 0 0 2px color-mix(in srgb,var(--bt-accent,#e31337) 10%,transparent); }
      .bt-chat-search { display: grid; grid-template-columns: minmax(0,1fr) 27px auto 27px; align-items: center; gap: 4px; padding-top: 3px; }
      .bt-chat-search input { min-width: 0; height: 29px; padding: 5px 9px; border: 1px solid #3b3b44; border-radius: 8px; background: #101014; color: #eeeef1; font: inherit; }
      .bt-chat-search input:focus { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 64%,#fff); outline: none; box-shadow: 0 0 0 2px color-mix(in srgb,var(--bt-accent,#e31337) 14%,transparent); }
      .bt-chat-search button { display: grid; place-items: center; width: 27px; height: 27px; padding: 0; border: 1px solid #3b3b44; border-radius: 7px; background: #24242a; color: #b4b4bd; font: 800 17px/1 Inter,Roobert,Arial,sans-serif; cursor: pointer; }
      .bt-chat-search button:hover:not(:disabled), .bt-chat-search button:focus-visible { border-color: var(--bt-accent,#e31337); color: #fff; outline: none; }
      .bt-chat-search button:disabled { opacity: .35; cursor: default; }
      .bt-search-count { min-width: 34px; color: #888891; font: 700 9px/1 ui-monospace,Menlo,Consolas,monospace; text-align: center; }

      html.bt-profile-compact .chat-line__message { padding-top: 1px !important; padding-bottom: 1px !important; font-size: 12px !important; line-height: 1.28 !important; }
      html.bt-profile-compact .bt-avatar { width: 15px; height: 15px; }
      html.bt-profile-compact .chat-line__message .bt-action-btn { width: 24px; height: 24px; padding: 4px; }
      html.bt-profile-accessible .chat-line__message { padding-top: 5px !important; padding-bottom: 5px !important; font-size: 16px !important; line-height: 1.58 !important; }
      html.bt-profile-accessible .bt-avatar { width: 27px; height: 27px; margin-right: 7px; }
      html.bt-profile-accessible .chat-line__message .bt-action-btn { width: 33px; height: 33px; padding: 7px; }
      html.bt-profile-accessible .chat-line__message .chat-line__timestamp { color: #b7b7bf !important; }

      #bt-settings-btn, #bt-inbox-btn, #bt-dash-btn, #bt-chat-control-btn {
        display: inline-flex; align-items: center; justify-content: center; color: var(--bt-accent,#e31337); cursor: pointer;
      }
      #bt-settings-btn:hover, #bt-inbox-btn:hover, #bt-dash-btn:hover, #bt-chat-control-btn:hover { color: #ff6b85; }
      #bt-settings-btn svg, #bt-inbox-btn svg, #bt-dash-btn svg, #bt-chat-control-btn svg { width: 20px; height: 20px; }
      #bt-settings-btn.bt-footer-btn, #bt-inbox-btn.bt-footer-btn, #bt-dash-btn.bt-footer-btn, #bt-chat-control-btn.bt-footer-btn {
        padding: 4px 6px; border: none; background: none; line-height: 0;
      }
      .bt-float-btn { position: absolute; top: 8px; right: 8px; z-index: 1000; background: rgba(14,14,16,.7); border: none; border-radius: 4px; padding: 5px; line-height: 0; }
      #bt-inbox-btn, #bt-chat-control-btn { position: relative; }
      #bt-chat-control-btn.bt-state-active:not(.bt-open-state) { color: var(--bt-accent,#e31337); }
      #bt-chat-control-btn.bt-state-active::after { content: ""; position: absolute; right: 3px; top: 3px; width: 6px; height: 6px; border: 1px solid #18181b; border-radius: 50%; background: var(--bt-accent,#e31337); box-shadow: 0 0 7px color-mix(in srgb,var(--bt-accent,#e31337) 60%,transparent); }
      .bt-character-counter { display: inline-flex; align-items: center; align-self: center; justify-content: center; min-width: 58px; padding: 3px 6px; color: #adadb8; font: 600 12px/1.25 ui-monospace,Menlo,Consolas,monospace; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .bt-character-counter.bt-near-limit { color: #ffb86b; }
      .bt-character-counter.bt-over-limit { color: #ff6b6b; font-weight: 800; }
      .bt-connection-status { display: inline-flex; align-items: center; align-self: center; margin: 0 3px; color: #ffb86b; font: 700 11px/1.25 Inter,Roobert,"Helvetica Neue",Arial,sans-serif; white-space: nowrap; }
      .bt-connection-status::before { content: ""; width: 7px; height: 7px; margin-right: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 0 rgba(255,184,107,.45); animation: bt-reconnect-pulse 1.25s ease-out infinite; }
      @keyframes bt-reconnect-pulse { 70%,100% { box-shadow: 0 0 0 6px rgba(255,184,107,0); } }
      #bt-composer-notice { position: fixed; z-index: 100000; box-sizing: border-box; min-height: 34px; padding: 8px 11px; border: 1px solid #46464f; border-radius: 5px; background: #18181b; color: #efeff1; box-shadow: 0 5px 18px rgba(0,0,0,.5); font: 600 12px/1.4 Inter,Roobert,"Helvetica Neue",Arial,sans-serif; }
      #bt-composer-notice.bt-warning { border-color: #a76d22; background: #2b2115; color: #ffd39a; }
      #bt-composer-notice.bt-error { border-color: #b43a4f; background: #30171c; color: #ffb7c3; }

      #bt-panel {
        position: fixed; z-index: 99999; width: 390px; max-width: calc(100vw - 16px); max-height: 74vh; overflow-y: auto; overflow-x: hidden; box-sizing: border-box;
        background: #18181b; color: #efeff1; border: 1px solid #2f2f35; border-radius: 0;
        padding: 0 16px 14px; box-shadow: 0 8px 28px rgba(0,0,0,.55);
        --bt-setting-font-size: 13px; font: var(--bt-setting-font-size)/1.45 Inter, Roobert, "Helvetica Neue", Arial, sans-serif; display: none;
      }
      #bt-panel.bt-open { display: block; }
      #bt-panel * { box-sizing: border-box; max-width: 100%; }
      #bt-panel [hidden] { display: none !important; }
      #bt-panel .bt-head { display: flex; align-items: center; gap: 8px; height: 44px; box-sizing: border-box; max-width: none; margin: 0 -16px 8px; padding: 0 16px; border-bottom: 1px solid #34343b; position: sticky; top: 0; background: #18181b; z-index: 2; }
      #bt-panel .bt-title { font-size: 17px; font-weight: 800; letter-spacing: .2px; color: var(--bt-accent,#e31337); }
      #bt-panel .bt-by { margin-left: auto; font-size: 11px; color: #7d7d85; }
      .bt-version { display: inline-flex; align-items: center; margin-left: 2px; padding: 1px 6px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 50%,#34343b); border-radius: 999px; background: color-mix(in srgb,var(--bt-accent,#e31337) 12%,transparent); color: #c9c9d1; font-size: 10px; font-weight: 700; line-height: 1.4; letter-spacing: .03em; text-decoration: none; cursor: pointer; }
      .bt-version:hover, .bt-version:focus { border-color: var(--bt-accent,#e31337); color: #fff; outline: none; }
      #bt-panel .bt-by a { color: inherit; text-decoration: none; }
      #bt-panel .bt-by a:hover, #bt-panel .bt-by a:focus { color: #efeff1; text-decoration: underline; outline: none; }
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
      #bt-panel input[type=text], #bt-panel input[type=url], #bt-panel input[type=password] { flex: 1; min-width: 0; background: #0e0e10; color: #efeff1; border: 1px solid #34343b; border-radius: 4px; padding: 3px 6px; }
      #bt-panel input:disabled, #bt-panel select:disabled { opacity: .42; cursor: not-allowed; }
      #bt-panel button.bt-btn { background: #26262c; color: #efeff1; border: 1px solid #3a3a42; border-radius: 4px; padding: 4px 9px; cursor: pointer; font-size: 12px; }
      #bt-panel button.bt-btn:hover { background: #34343b; }
      #bt-panel .bt-foot { display: flex; gap: 6px; margin-top: 12px; }
      #bt-panel .bt-note { margin-top: 10px; font-size: 11px; color: #7d7d85; }
      #bt-panel .bt-help { flex: 0 0 16px; width: 16px; height: 16px; margin-left: 3px; padding: 0; border: 1px solid #575761; border-radius: 50%; background: #26262c; color: #b7b7c2; font: 700 10px/14px Inter,Roobert,Arial,sans-serif; text-align: center; cursor: help; }
      #bt-panel label.bt-row > .bt-help { margin-left: auto; }
      #bt-panel .bt-help:hover, #bt-panel .bt-help:focus, #bt-panel .bt-help[aria-expanded="true"] { border-color: var(--bt-accent,#e31337); color: #fff; outline: none; box-shadow: 0 0 0 2px color-mix(in srgb,var(--bt-accent,#e31337) 24%,transparent); }
      #bt-setting-tooltip { position: fixed; z-index: 100001; display: none; width: 290px; max-width: calc(100vw - 16px); box-sizing: border-box; padding: 9px 11px; border: 1px solid #4a4a54; border-left: 3px solid var(--bt-accent,#e31337); border-radius: 5px; background: #202024; color: #efeff1; box-shadow: 0 8px 24px rgba(0,0,0,.55); font: 12px/1.45 Inter,Roobert,"Helvetica Neue",Arial,sans-serif; pointer-events: none; }
      #bt-setting-tooltip.bt-open { display: block; animation: bt-tooltip-in .12s ease-out; }
      @keyframes bt-tooltip-in { from { opacity: 0; transform: translateY(3px); } }

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

      .chat-line__message .bt-trans { display: block; flex: 1 0 100%; align-self: stretch; width: 100%; max-width: 100%; min-width: 0; margin: 4px 0 3px; padding: 6px 8px; overflow-wrap: anywhere; box-sizing: border-box; border-left: 2px solid var(--bt-accent,#e31337); background: rgba(255,255,255,.025); color: #d8d8dc; font-size: 100%; }
      .chat-line__message .bt-trans-meta { color: #7d7d85; font-size: 9px; font-weight: 800; letter-spacing: .06em; }
      .chat-line__message .bt-trans-text { max-width: 100%; margin-top: 1px; overflow-wrap: anywhere; white-space: pre-wrap; }
      .chat-line__message .bt-trans-error { color: #ff6b6b; }
      .chat-line__message .bt-trans-actions { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
      .chat-line__message .bt-trans-action { border: 1px solid #3a3a42; border-radius: 3px; background: #26262c; color: #c9c9d1; padding: 2px 6px; font: 10px/1.3 Inter,Roobert,Arial,sans-serif; cursor: pointer; }
      .chat-line__message .bt-trans-action:hover, .chat-line__message .bt-trans-action:focus { border-color: var(--bt-accent,#e31337); color: #fff; outline: none; }
      .chat-line__message .bt-trans-error > .bt-trans-action { margin-left: 7px; }
      .bt-pop {
        position: fixed; z-index: 99999; width: 300px; max-height: 70vh; overflow-y: auto; box-sizing: border-box; display: none;
        background: #18181b; color: #efeff1; border: 1px solid #2f2f35; border-radius: 6px; padding: 0 14px 14px;
        box-shadow: 0 8px 28px rgba(0,0,0,.55); font: 13px/1.45 Inter, Roobert, "Helvetica Neue", Arial, sans-serif;
      }
      .bt-pop.bt-open { display: block; }
      .bt-pop * { box-sizing: border-box; max-width: 100%; }
      #bt-inbox, #bt-dash, #bt-chat-controls { width: 390px; max-width: calc(100vw - 16px); }
      .bt-pop .bt-pop-head { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; background: #18181b; padding: 12px 0 8px; margin-bottom: 6px; border-bottom: 1px solid #34343b; }
      .bt-pop .bt-pop-title { font-size: 15px; font-weight: 800; color: var(--bt-accent,#e31337); }
      .bt-pop .bt-version { margin-left: auto; }
      .bt-pop .bt-pop-sub { margin: 12px 0 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #adadb8; }
      .bt-pop .bt-pop-empty { padding: 16px 0; color: #7d7d85; text-align: center; }
      .bt-chat-control-body { display: grid; gap: 9px; padding-top: 2px; }
      .bt-chat-control-section { padding: 10px; border: 1px solid rgba(255,255,255,.075); border-radius: 9px; background: rgba(255,255,255,.022); }
      .bt-chat-control-label { margin-bottom: 8px; color: #a9a9b3; font-size: 10px; font-weight: 800; letter-spacing: .045em; text-transform: uppercase; }
      #bt-dash { max-height: 78vh; background: radial-gradient(circle at 92% 0,color-mix(in srgb,var(--bt-accent,#e31337) 13%,transparent),transparent 32%),#18181b; }
      #bt-dash .bt-pop-head { background: linear-gradient(90deg,#18181b 68%,color-mix(in srgb,var(--bt-accent,#e31337) 8%,#18181b)); }
      #bt-dash .bt-pop-sub { display: flex; align-items: center; justify-content: space-between; margin-top: 15px; }
      #bt-dash .bt-pop-sub > b { min-width: 25px; padding: 1px 7px; border: 1px solid #3a3a42; border-radius: 999px; background: #242429; color: #c9c9d1; font-size: 10px; text-align: center; font-variant-numeric: tabular-nums; }
      .bt-dash-live { display: inline-flex; align-items: center; gap: 5px; margin-left: 8px; padding: 2px 7px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 52%,#34343b); border-radius: 999px; color: #d6d6dc; font-size: 8px; font-weight: 800; letter-spacing: .08em; }
      .bt-dash-live i { width: 6px; height: 6px; border-radius: 50%; background: var(--bt-accent,#e31337); box-shadow: 0 0 0 0 color-mix(in srgb,var(--bt-accent,#e31337) 42%,transparent); animation: bt-dash-live 1.5s ease-out infinite; }
      @keyframes bt-dash-live { 70%,100% { box-shadow: 0 0 0 6px transparent; } }
      .bt-dash-empty { display: flex; flex-direction: column; align-items: center; padding: 28px 14px 22px; color: #8f8f99; text-align: center; }
      .bt-dash-empty-icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 10px; border: 1px solid #3a3a42; border-radius: 13px; background: linear-gradient(145deg,#29292f,#19191d); color: var(--bt-accent,#e31337); font-size: 25px; }
      .bt-dash-empty b { color: #dedee3; font-size: 13px; }
      .bt-dash-empty > span:last-child { max-width: 250px; margin-top: 4px; font-size: 11px; }
      .bt-dash-metrics { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 7px; margin-top: 10px; }
      .bt-dash-metric { position: relative; min-height: 72px; overflow: hidden; padding: 9px 10px; border: 1px solid #34343b; border-radius: 8px; background: linear-gradient(145deg,#242429,#1b1b1f); }
      .bt-dash-metric::after { content: ""; position: absolute; right: -19px; bottom: -24px; width: 62px; height: 62px; border-radius: 50%; background: color-mix(in srgb,var(--bt-accent,#e31337) 8%,transparent); }
      .bt-dash-metric-accent { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 60%,#34343b); background: linear-gradient(145deg,color-mix(in srgb,var(--bt-accent,#e31337) 17%,#242429),#1b1b1f); }
      .bt-dash-metric > b { position: relative; z-index: 1; display: block; color: #f4f4f5; font-size: 24px; line-height: 1; font-weight: 850; font-variant-numeric: tabular-nums; }
      .bt-dash-metric > span { position: relative; z-index: 1; display: block; margin-top: 6px; color: #b8b8c1; font-size: 10px; font-weight: 700; }
      .bt-dash-metric > small { position: relative; z-index: 1; display: block; margin-top: 1px; color: #71717a; font-size: 8px; }
      .bt-dash-chart { margin-top: 8px; padding: 9px 10px 6px; border: 1px solid #303036; border-radius: 8px; background: rgba(10,10,12,.44); }
      .bt-dash-chart-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 3px; }
      .bt-dash-chart-head span { display: flex; flex-direction: column; }
      .bt-dash-chart-head b { color: #d9d9df; font-size: 11px; }
      .bt-dash-chart-head small { color: #707079; font-size: 8px; }
      .bt-spark { width: 100%; height: 68px; margin-top: 2px; overflow: visible; }
      .bt-spark-grid { stroke: rgba(255,255,255,.055); stroke-width: 1; vector-effect: non-scaling-stroke; }
      .bt-spark-area { fill: url(#bt-dash-gradient); }
      .bt-spark-line { fill: none; stroke: var(--bt-accent,#e31337); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; filter: drop-shadow(0 0 3px color-mix(in srgb,var(--bt-accent,#e31337) 45%,transparent)); }
      .bt-dash-session { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); margin-top: 8px; border: 1px solid #303036; border-radius: 8px; background: rgba(255,255,255,.018); }
      .bt-dash-session > span { min-width: 0; padding: 7px 5px; text-align: center; }
      .bt-dash-session > span + span { border-left: 1px solid #303036; }
      .bt-dash-session b { display: block; overflow: hidden; color: #e8e8ec; font-size: 12px; font-variant-numeric: tabular-nums; text-overflow: ellipsis; white-space: nowrap; }
      .bt-dash-session small { display: block; overflow: hidden; margin-top: 1px; color: #74747d; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }
      .bt-dash-list { display: grid; gap: 4px; }
      .bt-dash-row { display: flex; align-items: center; gap: 7px; min-height: 37px; padding: 4px 6px; border: 1px solid transparent; border-radius: 7px; background: rgba(255,255,255,.018); transition: border-color .12s ease,background .12s ease; }
      .bt-dash-row:hover { border-color: #34343b; background: rgba(255,255,255,.035); }
      .bt-dash-rank { flex: 0 0 16px; color: #666670; font: 700 9px/1 ui-monospace,Menlo,Consolas,monospace; text-align: center; }
      .bt-dash-avatar { flex: 0 0 27px; display: grid; place-items: center; width: 27px; height: 27px; overflow: hidden; border: 1px solid #3d3d45; border-radius: 50%; background: #2a2a30; color: #a9a9b2; font-size: 9px; font-weight: 800; }
      .bt-dash-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .bt-dash-person { flex: 1; min-width: 0; }
      .bt-dash-person-line { display: flex; align-items: center; gap: 8px; }
      .bt-dash-name { flex: 1; min-width: 0; overflow: hidden; font-size: 11px; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }
      .bt-dash-count { flex: 0 0 auto; color: #a7a7b0; font-size: 10px; font-variant-numeric: tabular-nums; }
      .bt-dash-share { display: block; height: 3px; margin-top: 4px; overflow: hidden; border-radius: 2px; background: #303036; }
      .bt-dash-share i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg,var(--bt-accent,#e31337),color-mix(in srgb,var(--bt-accent,#e31337) 52%,#9147ff)); }
      .bt-dash-emotes { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 6px; min-height: 34px; }
      .bt-dash-emote { display: flex; align-items: center; gap: 7px; min-width: 0; padding: 7px; border: 1px solid #303036; border-radius: 7px; background: rgba(255,255,255,.018); }
      .bt-dash-emote img { flex: 0 0 29px; width: 29px; height: 29px; object-fit: contain; }
      .bt-dash-emote > span { min-width: 0; }
      .bt-dash-emote b { display: block; overflow: hidden; color: #d5d5da; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
      .bt-dash-emote small { display: block; color: #85858e; font-size: 9px; font-variant-numeric: tabular-nums; }
      .bt-inbox-search { position: sticky; top: 45px; z-index: 2; width: 100%; margin: 0 0 6px; padding: 6px 8px; border: 1px solid #34343b; border-radius: 4px; background: #0e0e10; color: #efeff1; }
      .bt-inbox-notice { margin: 4px 0; color: #ffb86b; font-size: 11px; }
      .bt-inbox-row { padding: 5px 0; border-bottom: 1px solid #26262c; line-height: 1.4; word-break: break-word; cursor: pointer; }
      .bt-inbox-main { display: flex; align-items: baseline; gap: 3px; }
      .bt-inbox-kind { flex: 0 0 14px; color: var(--bt-accent,#e31337); font-weight: 800; }
      .bt-inbox-time { color: #7d7d85; font-size: 11px; font-variant-numeric: tabular-nums; }
      .bt-inbox-channel { color: #8c7ad8; font-size: 10px; }
      .bt-inbox-user { font-weight: 700; }
      .bt-inbox-colon { color: #efeff1; }
      .bt-inbox-text { flex: 1; min-width: 0; color: #dcdce0; }
      .bt-inbox-jump { flex: 0 0 auto; border: 0; background: none; color: #adadb8; cursor: pointer; }
      .bt-inbox-jump:disabled { opacity: .3; cursor: default; }
      .bt-inbox-context { display: none; margin: 5px 0 2px 16px; padding-left: 7px; border-left: 2px solid #34343b; }
      .bt-inbox-row.bt-expanded .bt-inbox-context { display: block; }
      .bt-context-line { padding: 2px 0; color: #adadb8; font-size: 11px; }
      .bt-context-line > span:first-child { font-weight: 700; }
      .bt-context-line.bt-context-focus { color: #efeff1; background: rgba(255,255,255,.04); }
      #bt-inbox-btn { position: relative; }
      #bt-inbox-btn .bt-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; min-width: 15px; height: 15px; padding: 0 3px; border-radius: 8px; background: var(--bt-accent,#e31337); color: #fff; font-size: 9px; line-height: 1; font-weight: 700; pointer-events: none; box-shadow: 0 0 0 2px #18181b; }

      #bt-hovercard { position: fixed; z-index: 100001; display: none; width: 250px; padding: 10px; border: 1px solid #3a3a42; border-radius: 7px; background: #18181b; color: #efeff1; box-shadow: 0 8px 24px rgba(0,0,0,.55); font: 12px/1.4 Inter,Roobert,Arial,sans-serif; }
      #bt-hovercard.bt-open { display: block; }
      .bt-hover-head { display: flex; align-items: center; gap: 9px; }
      .bt-hover-avatar { display: grid; flex: 0 0 36px; width: 36px; height: 36px; place-items: center; overflow: hidden; border: 1px solid #3d3d46; border-radius: 50%; background: #292930; color: #d7d7dc; font-size: 14px; font-weight: 800; }
      .bt-hover-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .bt-hover-name { min-width: 0; overflow: hidden; font-size: 15px; font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
      .bt-hover-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; margin-top: 8px; }
      .bt-hover-grid span { color: #7d7d85; font-size: 9px; text-align: center; }
      .bt-hover-grid b { display: block; color: #efeff1; font-size: 13px; }
      .bt-hover-emote { display: flex; align-items: center; gap: 6px; margin-top: 8px; padding-top: 7px; border-top: 1px solid #34343b; }
      .bt-hover-emote small { margin-right: auto; color: #7d7d85; }
      .bt-hover-emote img { width: 24px; height: 24px; object-fit: contain; }

      /* Shared modern surfaces */
      #bt-panel, .bt-pop, #bt-modal .bt-modal-box, #bt-hovercard, #bt-setting-tooltip, #bt-composer-notice {
        --bt-surface-0: #121216;
        --bt-surface-1: #18181d;
        --bt-surface-2: #222228;
        --bt-surface-3: #2b2b32;
        --bt-line: rgba(255,255,255,.095);
        --bt-muted: #8c8c97;
        --bt-text: #f1f1f3;
      }
      #bt-panel, .bt-pop {
        scrollbar-width: thin;
        scrollbar-color: color-mix(in srgb,var(--bt-accent,#e31337) 42%,#4a4a52) transparent;
      }
      #bt-panel::-webkit-scrollbar, .bt-pop::-webkit-scrollbar { width: 7px; }
      #bt-panel::-webkit-scrollbar-thumb, .bt-pop::-webkit-scrollbar-thumb { border: 2px solid transparent; border-radius: 99px; background: color-mix(in srgb,var(--bt-accent,#e31337) 42%,#4a4a52); background-clip: padding-box; }
      @keyframes bt-surface-in { from { opacity: 0; transform: translateY(6px) scale(.985); } to { opacity: 1; transform: none; } }
      @keyframes bt-modal-in { from { opacity: 0; transform: translateY(10px) scale(.975); } to { opacity: 1; transform: none; } }
      #bt-panel.bt-open, .bt-pop.bt-open { animation: bt-surface-in .16s cubic-bezier(.2,.8,.2,1); transform-origin: bottom right; }

      /* Footer launchers */
      #bt-settings-btn.bt-footer-btn, #bt-inbox-btn.bt-footer-btn, #bt-dash-btn.bt-footer-btn, #bt-chat-control-btn.bt-footer-btn {
        min-width: 30px; min-height: 30px; padding: 5px !important; border: 1px solid transparent; border-radius: 8px;
        background: color-mix(in srgb,var(--bt-accent,#e31337) 7%,transparent); color: var(--bt-accent,#e31337) !important; line-height: 0;
        transition: background .14s ease,border-color .14s ease,box-shadow .14s ease,color .14s ease,transform .14s ease;
      }
      #bt-settings-btn.bt-footer-btn svg, #bt-inbox-btn.bt-footer-btn svg, #bt-dash-btn.bt-footer-btn svg, #bt-chat-control-btn.bt-footer-btn svg {
        width: 20px; height: 20px;
      }
      #bt-settings-btn-wrap { margin-inline-end: 6px; }
      #bt-settings-btn.bt-footer-btn { margin-inline-end: 6px; }
      #bt-settings-btn-wrap #bt-settings-btn.bt-footer-btn { margin-inline-end: 0; }
      :is(#bt-chat-control-btn-wrap,#bt-dash-btn-wrap,#bt-inbox-btn-wrap,#bt-settings-btn-wrap) + :is(#bt-chat-control-btn-wrap,#bt-dash-btn-wrap,#bt-inbox-btn-wrap,#bt-settings-btn-wrap),
      .bt-footer-btn + .bt-footer-btn { margin-inline-start: 4px; }
      #bt-settings-btn.bt-footer-btn:hover, #bt-inbox-btn.bt-footer-btn:hover, #bt-dash-btn.bt-footer-btn:hover, #bt-chat-control-btn.bt-footer-btn:hover,
      #bt-settings-btn.bt-footer-btn:focus-visible, #bt-inbox-btn.bt-footer-btn:focus-visible, #bt-dash-btn.bt-footer-btn:focus-visible, #bt-chat-control-btn.bt-footer-btn:focus-visible {
        border-color: color-mix(in srgb,var(--bt-accent,#e31337) 35%,transparent); background: color-mix(in srgb,var(--bt-accent,#e31337) 17%,transparent); color: #fff !important; outline: none; transform: translateY(-1px);
      }
      #bt-settings-btn.bt-footer-btn.bt-open-state, #bt-inbox-btn.bt-footer-btn.bt-open-state,
      #bt-dash-btn.bt-footer-btn.bt-open-state, #bt-chat-control-btn.bt-footer-btn.bt-open-state {
        border-color: color-mix(in srgb,var(--bt-accent,#e31337) 72%,#fff) !important;
        background: linear-gradient(135deg,color-mix(in srgb,var(--bt-accent,#e31337) 42%,#28282e),color-mix(in srgb,var(--bt-accent,#e31337) 24%,#18181d)) !important;
        color: #fff !important; box-shadow: 0 0 0 1px color-mix(in srgb,var(--bt-accent,#e31337) 18%,transparent),0 4px 13px color-mix(in srgb,var(--bt-accent,#e31337) 28%,transparent);
        transform: translateY(-1px);
      }

      /* Settings */
      #bt-panel {
        width: 390px; max-height: 78vh; padding: 0 10px 12px; overflow-x: hidden;
        border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 24%,var(--bt-line)); border-radius: 13px;
        background: radial-gradient(circle at 90% 0,color-mix(in srgb,var(--bt-accent,#e31337) 11%,transparent),transparent 27%),linear-gradient(180deg,#19191e,#141418);
        box-shadow: 0 18px 54px rgba(0,0,0,.62),0 0 0 1px rgba(255,255,255,.025) inset; backdrop-filter: blur(16px);
      }
      #bt-panel .bt-head {
        width: calc(100% + 20px); height: 54px; max-width: none; margin: 0 -10px 10px; padding: 0 13px;
        border-bottom: 1px solid var(--bt-line); background: linear-gradient(90deg,rgba(24,24,29,.97) 60%,color-mix(in srgb,var(--bt-accent,#e31337) 9%,rgba(24,24,29,.97)));
        box-shadow: 0 5px 18px rgba(0,0,0,.18); backdrop-filter: blur(16px);
      }
      #bt-panel .bt-title { display: inline-flex; align-items: center; gap: 9px; color: var(--bt-text); font-size: 16px; letter-spacing: -.01em; }
      #bt-panel .bt-title::before { content: ""; width: 10px; height: 22px; border-radius: 5px; background: linear-gradient(180deg,var(--bt-accent,#e31337),color-mix(in srgb,var(--bt-accent,#e31337) 55%,#9147ff)); box-shadow: 0 0 14px color-mix(in srgb,var(--bt-accent,#e31337) 35%,transparent); }
      #bt-panel .bt-by { color: #777781; font-size: 10px; }
      #bt-panel .bt-by a { color: #a9a9b2; }
      .bt-version { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 36%,#3b3b43); background: color-mix(in srgb,var(--bt-accent,#e31337) 10%,#1b1b20); box-shadow: 0 2px 8px rgba(0,0,0,.22); }
      .bt-settings-section {
        margin: 8px 0; padding: 0 7px 7px; overflow: visible; border: 1px solid var(--bt-line); border-radius: 10px;
        background: linear-gradient(145deg,rgba(255,255,255,.028),rgba(255,255,255,.012)); box-shadow: 0 5px 18px rgba(0,0,0,.12);
        transition: border-color .14s ease,background .14s ease;
      }
      .bt-settings-section:hover { border-color: rgba(255,255,255,.14); background: linear-gradient(145deg,rgba(255,255,255,.038),rgba(255,255,255,.015)); }
      #bt-panel .bt-settings-section .bt-sub {
        min-height: 35px; margin: 0 -7px 3px; padding: 8px 9px; border: 0; border-bottom: 1px solid rgba(255,255,255,.065);
        color: #a9a9b3; font-size: 9px; letter-spacing: .075em;
      }
      #bt-panel .bt-settings-section .bt-sub .bt-ico { width: 15px; height: 15px; color: color-mix(in srgb,var(--bt-accent,#e31337) 72%,#d5d5dc); }
      #bt-panel .bt-settings-secNotifications {
        border-color: color-mix(in srgb,var(--bt-accent,#e31337) 27%,var(--bt-line));
        background: radial-gradient(circle at 100% 0,color-mix(in srgb,var(--bt-accent,#e31337) 11%,transparent),transparent 45%),linear-gradient(145deg,rgba(255,255,255,.03),rgba(255,255,255,.012));
      }
      #bt-panel .bt-setting-item, #bt-panel .bt-rowflex { display: flex; align-items: center; gap: 9px; min-height: 34px; margin: 2px 0; padding: 6px 7px; border-radius: 7px; font-size: var(--bt-setting-font-size); font-weight: 400; line-height: 1.45; transition: background .12s ease; }
      #bt-panel .bt-setting-item:hover, #bt-panel .bt-rowflex:hover { background: rgba(255,255,255,.038); }
      #bt-panel .bt-setting-item:has(input:disabled), #bt-panel .bt-rowflex:has(input:disabled), #bt-panel .bt-rowflex:has(select:disabled), #bt-panel .bt-rowflex:has(textarea:disabled) { opacity: .52; }
      #bt-panel .bt-setting-item > label.bt-row { flex: 1; min-width: 0; min-height: 0; margin: 0; padding: 0; border-radius: 0; background: none; }
      #bt-panel .bt-setting-item > label.bt-row:hover { background: none; }
      #bt-panel .bt-setting-item > label.bt-row, #bt-panel .bt-rowflex > label, #bt-panel .bt-rowflex > span:not(.bt-val) { font-size: inherit; font-weight: inherit; line-height: inherit; }
      #bt-panel label.bt-row input[type=checkbox], #bt-panel .bt-rowflex label input[type=checkbox] {
        appearance: none; position: relative; order: 2; flex: 0 0 31px; width: 31px !important; height: 18px !important; margin: 0 0 0 auto;
        border: 1px solid #4a4a53; border-radius: 99px; background: #2c2c33; box-shadow: 0 1px 3px rgba(0,0,0,.32) inset; transition: border-color .15s ease,background .15s ease;
      }
      #bt-panel input[type=checkbox]::before { content: ""; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: #b6b6bf; box-shadow: 0 1px 3px rgba(0,0,0,.45); transition: transform .16s cubic-bezier(.2,.8,.2,1),background .15s ease; }
      #bt-panel input[type=checkbox]:checked { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 72%,#fff) !important; background: var(--bt-accent,#e31337) !important; box-shadow: 0 0 0 1px color-mix(in srgb,var(--bt-accent,#e31337) 28%,transparent),0 0 10px color-mix(in srgb,var(--bt-accent,#e31337) 24%,transparent) !important; }
      #bt-panel input[type=checkbox]:checked::before { transform: translateX(13px); background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.52); }
      #bt-panel input[type=checkbox]:focus-visible { outline: 2px solid color-mix(in srgb,var(--bt-accent,#e31337) 58%,transparent); outline-offset: 2px; }
      #bt-panel input[type=range] { appearance: none; height: 4px; border-radius: 99px; background: linear-gradient(90deg,color-mix(in srgb,var(--bt-accent,#e31337) 72%,#9147ff),#3a3a42); }
      #bt-panel input[type=range]::-webkit-slider-thumb { appearance: none; width: 15px; height: 15px; border: 2px solid #f3f3f5; border-radius: 50%; background: var(--bt-accent,#e31337); box-shadow: 0 2px 7px rgba(0,0,0,.48); }
      #bt-panel input[type=range]::-moz-range-thumb { width: 12px; height: 12px; border: 2px solid #f3f3f5; border-radius: 50%; background: var(--bt-accent,#e31337); box-shadow: 0 2px 7px rgba(0,0,0,.48); }
      #bt-panel input[type=range]:focus-visible { outline: 2px solid color-mix(in srgb,var(--bt-accent,#e31337) 52%,transparent); outline-offset: 4px; }
      #bt-panel input[type=color] { width: 31px; height: 24px; overflow: hidden; border: 1px solid #50505a; border-radius: 7px; background: #202025; box-shadow: 0 2px 7px rgba(0,0,0,.25); }
      #bt-panel input[type=color]::-webkit-color-swatch-wrapper { padding: 2px; }
      #bt-panel input[type=color]::-webkit-color-swatch { border: 0; border-radius: 4px; }
      #bt-panel select, #bt-panel input[type=text], #bt-panel input[type=url], #bt-panel input[type=password], #bt-panel textarea {
        min-height: 30px; border: 1px solid #3e3e47; border-radius: 7px; background: #111115; color: #ececf0; box-shadow: 0 1px 4px rgba(0,0,0,.25) inset;
        font: inherit;
      }
      #bt-panel select { padding: 4px 26px 4px 8px; }
      #bt-panel input[type=text], #bt-panel input[type=url], #bt-panel input[type=password] { padding: 5px 8px; }
      #bt-panel textarea { flex: 1; min-width: 0; min-height: 68px; padding: 7px 8px; resize: vertical; font-family: ui-monospace,Menlo,Consolas,monospace; }
      #bt-panel select:focus, #bt-panel input[type=text]:focus, #bt-panel input[type=url]:focus, #bt-panel input[type=password]:focus, #bt-panel textarea:focus {
        border-color: color-mix(in srgb,var(--bt-accent,#e31337) 65%,#fff); outline: none; box-shadow: 0 0 0 3px color-mix(in srgb,var(--bt-accent,#e31337) 16%,transparent);
      }
      #bt-panel .bt-val { flex-basis: 47px; width: 47px; color: #90909a; font: 700 var(--bt-setting-font-size)/1 ui-monospace,Menlo,Consolas,monospace; }
      #bt-panel .bt-help { width: 18px; height: 18px; flex-basis: 18px; border-color: #4a4a54; background: #24242a; color: #9f9fa9; font-size: 9px; line-height: 16px; box-shadow: 0 2px 6px rgba(0,0,0,.22); }
      #bt-panel .bt-setting-item > .bt-help, #bt-panel .bt-rowflex > .bt-help { order: -1; flex: 0 0 18px; margin: 0 1px 0 0; }
      #bt-panel button.bt-btn, #bt-modal button.bt-btn {
        min-height: 30px; padding: 5px 11px; border: 1px solid #41414a; border-radius: 7px; background: linear-gradient(180deg,#2c2c33,#232329); color: #e9e9ed;
        box-shadow: 0 2px 7px rgba(0,0,0,.25); font-size: 11px; font-weight: 700; transition: border-color .13s ease,background .13s ease,transform .13s ease;
      }
      #bt-panel button.bt-btn { font-size: var(--bt-setting-font-size); }
      #bt-panel button.bt-btn:hover, #bt-modal button.bt-btn:hover { border-color: #575762; background: linear-gradient(180deg,#37373f,#292930); transform: translateY(-1px); }
      #bt-panel button.bt-btn:focus-visible, #bt-modal button.bt-btn:focus-visible { outline: 2px solid color-mix(in srgb,var(--bt-accent,#e31337) 55%,transparent); outline-offset: 2px; }
      #bt-panel #bt-test-ping, #bt-modal .bt-modal-primary {
        border-color: color-mix(in srgb,var(--bt-accent,#e31337) 66%,#fff); background: linear-gradient(135deg,var(--bt-accent,#e31337),color-mix(in srgb,var(--bt-accent,#e31337) 64%,#9147ff)); color: #fff;
        box-shadow: 0 4px 13px color-mix(in srgb,var(--bt-accent,#e31337) 22%,transparent);
      }
      #bt-panel .bt-settings-secNotifications .bt-rowflex > span:first-child { color: #efeff1; font-size: inherit; font-weight: inherit; }
      #bt-panel .bt-settings-secNotifications select[data-k=pingSound] { flex: 1; min-width: 0; margin-left: 0; }
      #bt-panel #bt-test-ping { flex: 0 0 auto; min-width: 56px; }
      #bt-panel #bt-test-ping:active { transform: translateY(0) scale(.97); }
      #bt-panel #bt-reset { border-color: rgba(255,107,107,.28); color: #ffb2b2; }
      #bt-panel .bt-foot { gap: 7px; margin-top: 10px; padding: 10px 3px 2px; border-top: 1px solid rgba(255,255,255,.07); }
      #bt-panel .bt-note { margin: 7px 4px 0; color: #71717b; font-size: 9px; text-align: center; }

      /* Tooltips and transient notifications */
      #bt-setting-tooltip {
        width: 305px; padding: 10px 12px 10px 14px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 30%,#484852); border-left: 3px solid var(--bt-accent,#e31337); border-radius: 9px;
        background: linear-gradient(145deg,rgba(35,35,41,.98),rgba(22,22,27,.98)); box-shadow: 0 14px 38px rgba(0,0,0,.58); backdrop-filter: blur(14px); color: #e8e8ec;
      }
      #bt-composer-notice {
        min-height: 40px; padding: 10px 13px 10px 30px; border-color: #45454f; border-radius: 10px; background: linear-gradient(145deg,rgba(33,33,39,.98),rgba(20,20,24,.98));
        box-shadow: 0 14px 36px rgba(0,0,0,.58),0 0 0 1px rgba(255,255,255,.025) inset; backdrop-filter: blur(14px);
      }
      #bt-composer-notice::before { content: ""; position: absolute; left: 13px; top: 50%; width: 7px; height: 7px; border-radius: 50%; background: var(--bt-accent,#e31337); transform: translateY(-50%); box-shadow: 0 0 0 4px color-mix(in srgb,var(--bt-accent,#e31337) 16%,transparent); }
      #bt-composer-notice.bt-warning { border-color: rgba(255,184,107,.38); background: linear-gradient(145deg,rgba(50,38,23,.98),rgba(29,23,17,.98)); color: #ffdaa8; }
      #bt-composer-notice.bt-warning::before { background: #ffb86b; box-shadow: 0 0 0 4px rgba(255,184,107,.14); }
      #bt-composer-notice.bt-error { border-color: rgba(255,107,128,.42); background: linear-gradient(145deg,rgba(53,25,31,.98),rgba(30,18,21,.98)); color: #ffc0cb; }
      #bt-composer-notice.bt-error::before { background: #ff6b80; box-shadow: 0 0 0 4px rgba(255,107,128,.14); }
      .bt-connection-status { padding: 4px 7px; border: 1px solid rgba(255,184,107,.22); border-radius: 99px; background: rgba(255,184,107,.07); }

      /* Shared popovers, Mentions and Stats */
      .bt-pop {
        max-height: 78vh; padding: 0 12px 13px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 20%,var(--bt-line)); border-radius: 13px;
        background: radial-gradient(circle at 92% 0,color-mix(in srgb,var(--bt-accent,#e31337) 10%,transparent),transparent 29%),linear-gradient(180deg,#19191e,#141418);
        box-shadow: 0 18px 54px rgba(0,0,0,.62),0 0 0 1px rgba(255,255,255,.025) inset; backdrop-filter: blur(16px);
      }
      .bt-pop .bt-pop-head {
        width: calc(100% + 24px); max-width: none; min-height: 53px; margin: 0 -12px 9px; padding: 0 13px; border-bottom: 1px solid var(--bt-line);
        background: linear-gradient(90deg,rgba(24,24,29,.97) 62%,color-mix(in srgb,var(--bt-accent,#e31337) 8%,rgba(24,24,29,.97))); box-shadow: 0 5px 18px rgba(0,0,0,.16); backdrop-filter: blur(16px);
      }
      .bt-pop .bt-pop-title { display: inline-flex; align-items: center; color: var(--bt-text); font-size: 15px; letter-spacing: -.01em; }
      .bt-pop .bt-pop-title::before { content: ""; width: 7px; height: 19px; margin-right: 8px; border-radius: 4px; background: linear-gradient(180deg,var(--bt-accent,#e31337),color-mix(in srgb,var(--bt-accent,#e31337) 55%,#9147ff)); }
      .bt-pop .bt-pop-empty { margin: 9px 0; padding: 25px 14px; border: 1px dashed #383840; border-radius: 10px; background: rgba(255,255,255,.014); color: #7f7f89; }
      #bt-chat-controls .bt-chat-control-section { border-color: rgba(255,255,255,.085); background: linear-gradient(145deg,rgba(255,255,255,.032),rgba(255,255,255,.014)); box-shadow: 0 4px 13px rgba(0,0,0,.1); }
      #bt-chat-controls .bt-filter-bar button { min-height: 29px; padding: 4px 10px; }
      #bt-chat-controls .bt-chat-search { padding-top: 0; }
      #bt-dash .bt-pop-head { background: linear-gradient(90deg,rgba(24,24,29,.98) 60%,color-mix(in srgb,var(--bt-accent,#e31337) 9%,rgba(24,24,29,.98))); }
      #bt-dash .bt-dash-metric, #bt-dash .bt-dash-chart, #bt-dash .bt-dash-session, #bt-dash .bt-dash-row, #bt-dash .bt-dash-emote { box-shadow: 0 4px 13px rgba(0,0,0,.11); }
      #bt-dash .bt-dash-metric, #bt-dash .bt-dash-emote { transition: border-color .14s ease,transform .14s ease,background .14s ease; }
      #bt-dash .bt-dash-metric:hover, #bt-dash .bt-dash-emote:hover { border-color: rgba(255,255,255,.16); transform: translateY(-1px); }
      .bt-inbox-total { min-width: 25px; margin-left: 8px; padding: 2px 7px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 28%,#393941); border-radius: 99px; background: color-mix(in srgb,var(--bt-accent,#e31337) 9%,#202025); color: #bdbdc5; font-size: 9px; font-weight: 800; text-align: center; font-variant-numeric: tabular-nums; }
      #bt-inbox { background: radial-gradient(circle at 92% 0,color-mix(in srgb,var(--bt-accent,#e31337) 10%,transparent),transparent 29%),linear-gradient(180deg,#19191e,#141418); }
      .bt-inbox-search {
        top: 53px; height: 36px; margin: 3px 0 9px; padding: 7px 10px; border: 1px solid #3d3d46; border-radius: 9px; background: rgba(14,14,18,.94); color: #efeff2;
        box-shadow: 0 3px 10px rgba(0,0,0,.2); backdrop-filter: blur(12px); transition: border-color .13s ease,box-shadow .13s ease;
      }
      .bt-inbox-search:focus { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 64%,#fff); outline: none; box-shadow: 0 0 0 3px color-mix(in srgb,var(--bt-accent,#e31337) 15%,transparent),0 4px 12px rgba(0,0,0,.28); }
      .bt-inbox-notice { margin: 5px 0 8px; padding: 7px 9px; border: 1px solid rgba(255,184,107,.24); border-radius: 7px; background: rgba(255,184,107,.07); color: #ffc986; }
      .bt-inbox-row { margin: 5px 0; padding: 8px; border: 1px solid rgba(255,255,255,.07); border-radius: 9px; background: linear-gradient(145deg,rgba(255,255,255,.026),rgba(255,255,255,.012)); box-shadow: 0 4px 13px rgba(0,0,0,.1); transition: border-color .13s ease,background .13s ease,transform .13s ease; }
      .bt-inbox-row:hover { border-color: rgba(255,255,255,.14); background: linear-gradient(145deg,rgba(255,255,255,.042),rgba(255,255,255,.017)); transform: translateY(-1px); }
      .bt-inbox-row.bt-expanded { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 28%,#3a3a42); background: color-mix(in srgb,var(--bt-accent,#e31337) 4%,#1d1d22); }
      .bt-inbox-main { align-items: center; gap: 5px; }
      .bt-inbox-kind { display: grid; place-items: center; flex: 0 0 22px; width: 22px; height: 22px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 32%,#404048); border-radius: 7px; background: color-mix(in srgb,var(--bt-accent,#e31337) 10%,#222228); font-size: 10px; }
      .bt-inbox-time { padding: 2px 5px; border-radius: 4px; background: rgba(255,255,255,.035); color: #777781; font-size: 9px; }
      .bt-inbox-channel { color: color-mix(in srgb,var(--bt-accent,#e31337) 38%,#a89bea); font-size: 9px; }
      .bt-inbox-user { font-size: 11px; }
      .bt-inbox-text { overflow: hidden; color: #d6d6dc; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
      .bt-inbox-jump { display: grid; place-items: center; width: 25px; height: 25px; padding: 0; border: 1px solid #3b3b44; border-radius: 7px; background: #24242a; color: #a8a8b1; transition: border-color .12s ease,color .12s ease,background .12s ease; }
      .bt-inbox-jump:hover, .bt-inbox-jump:focus-visible { border-color: var(--bt-accent,#e31337); background: color-mix(in srgb,var(--bt-accent,#e31337) 11%,#24242a); color: #fff; outline: none; }
      .bt-inbox-context { margin: 8px 0 1px 28px; padding: 6px 8px; border: 0; border-radius: 7px; background: rgba(7,7,9,.35); }
      .bt-context-line { padding: 3px 4px; border-radius: 4px; font-size: 10px; }
      .bt-context-line.bt-context-focus { background: color-mix(in srgb,var(--bt-accent,#e31337) 8%,rgba(255,255,255,.035)); box-shadow: inset 2px 0 var(--bt-accent,#e31337); }
      #bt-inbox-btn .bt-badge { min-width: 16px; height: 16px; border: 1px solid rgba(255,255,255,.34); box-shadow: 0 3px 9px rgba(0,0,0,.45); }

      /* Viewer card */
      #bt-hovercard {
        width: 260px; padding: 12px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 22%,var(--bt-line)); border-radius: 12px;
        background: radial-gradient(circle at 95% 0,color-mix(in srgb,var(--bt-accent,#e31337) 13%,transparent),transparent 38%),linear-gradient(145deg,rgba(31,31,37,.98),rgba(18,18,22,.98));
        box-shadow: 0 16px 42px rgba(0,0,0,.62),0 0 0 1px rgba(255,255,255,.025) inset; backdrop-filter: blur(15px);
      }
      #bt-hovercard.bt-open { animation: bt-surface-in .14s cubic-bezier(.2,.8,.2,1); transform-origin: top left; }
      .bt-hover-head { padding-bottom: 9px; border-bottom: 1px solid rgba(255,255,255,.075); }
      .bt-hover-avatar { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 28%,rgba(255,255,255,.12)); background: color-mix(in srgb,var(--bt-accent,#e31337) 10%,#292930); box-shadow: 0 3px 11px rgba(0,0,0,.34); }
      .bt-hover-name { font-size: 15px; letter-spacing: -.01em; }
      .bt-hover-grid { gap: 6px; margin-top: 9px; }
      .bt-hover-grid span { min-width: 0; padding: 7px 4px; border: 1px solid rgba(255,255,255,.065); border-radius: 7px; background: rgba(255,255,255,.022); color: #777781; font-size: 8px; }
      .bt-hover-grid b { overflow: hidden; margin-bottom: 2px; color: #ededf0; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
      .bt-hover-emote { margin-top: 9px; padding: 8px; border: 1px solid rgba(255,255,255,.065); border-radius: 7px; background: rgba(255,255,255,.022); }
      .bt-hover-emote small { color: #81818a; }
      .bt-hover-emote img { width: 27px; height: 27px; }

      /* Import/export dialog */
      #bt-modal { background: rgba(5,5,7,.72); backdrop-filter: blur(8px); }
      #bt-modal.bt-open .bt-modal-box { animation: bt-modal-in .18s cubic-bezier(.2,.8,.2,1); }
      #bt-modal .bt-modal-box {
        width: 440px; padding: 15px; border: 1px solid color-mix(in srgb,var(--bt-accent,#e31337) 22%,var(--bt-line)); border-radius: 14px;
        background: radial-gradient(circle at 94% 0,color-mix(in srgb,var(--bt-accent,#e31337) 11%,transparent),transparent 34%),linear-gradient(145deg,#1d1d23,#141418);
        box-shadow: 0 24px 70px rgba(0,0,0,.68),0 0 0 1px rgba(255,255,255,.025) inset;
      }
      #bt-modal .bt-modal-head { min-height: 36px; margin-bottom: 11px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,.075); }
      #bt-modal .bt-modal-title { display: inline-flex; align-items: center; gap: 8px; color: #f0f0f2; font-size: 15px; }
      #bt-modal .bt-modal-title::before { content: ""; width: 7px; height: 18px; border-radius: 4px; background: var(--bt-accent,#e31337); }
      #bt-modal .bt-modal-x { display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 1px solid transparent; border-radius: 8px; background: rgba(255,255,255,.025); color: #8e8e98; transition: border-color .12s ease,background .12s ease,color .12s ease; }
      #bt-modal .bt-modal-x:hover, #bt-modal .bt-modal-x:focus-visible { border-color: #494952; background: rgba(255,255,255,.06); color: #fff; outline: none; }
      #bt-modal textarea { height: 190px; padding: 10px 11px; border: 1px solid #3c3c45; border-radius: 9px; background: rgba(8,8,11,.78); color: #ededf0; box-shadow: 0 3px 10px rgba(0,0,0,.24) inset; }
      #bt-modal textarea:focus { border-color: color-mix(in srgb,var(--bt-accent,#e31337) 65%,#fff); outline: none; box-shadow: 0 0 0 3px color-mix(in srgb,var(--bt-accent,#e31337) 15%,transparent),0 3px 10px rgba(0,0,0,.24) inset; }
      #bt-modal .bt-modal-note { margin-top: 8px; padding: 0 3px; color: #74d68a; font-size: 10px; }
      #bt-modal .bt-modal-foot { gap: 7px; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,.07); }

      @media (max-width: 430px) {
        #bt-panel, #bt-inbox, #bt-dash, #bt-chat-controls { width: calc(100vw - 16px); }
        #bt-panel .bt-by { display: none; }
        .bt-dash-emotes { grid-template-columns: repeat(2,minmax(0,1fr)); }
        .bt-inbox-main { flex-wrap: wrap; }
        .bt-inbox-text { flex-basis: calc(100% - 34px); margin-left: 27px; white-space: normal; }
      }
      @media (prefers-reduced-motion: reduce) {
        .chat-line__message.bt-focus-pulse, #bt-setting-tooltip, .bt-dash-live i, #bt-panel.bt-open, .bt-pop.bt-open, #bt-hovercard.bt-open, #bt-modal.bt-open .bt-modal-box { animation: none; }
        #bt-panel button.bt-btn, #bt-modal button.bt-btn, .bt-inbox-row, #bt-dash .bt-dash-metric, #bt-dash .bt-dash-emote { transition: none; transform: none; }
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  let appliedVarsSignature = '';

  function applyVars() {
    const signature = [
      CONFIG.mentionColor, CONFIG.modColor, CONFIG.vipColor, CONFIG.firstChatterColor,
      CONFIG.returningChatterColor, CONFIG.accentColor, CONFIG.hideBadges,
      CONFIG.hideLeaderboard, CONFIG.hideCommunityHighlights, CONFIG.msgSeparators,
    ].join('|');
    if (signature === appliedVarsSignature) return;
    appliedVarsSignature = signature;
    const r = document.documentElement;
    r.style.setProperty('--bt-mention', CONFIG.mentionColor);
    r.style.setProperty('--bt-mod', CONFIG.modColor);
    r.style.setProperty('--bt-vip', CONFIG.vipColor);
    r.style.setProperty('--bt-first', CONFIG.firstChatterColor);
    r.style.setProperty('--bt-returning', CONFIG.returningChatterColor);
    r.style.setProperty('--bt-accent', CONFIG.accentColor);
    r.classList.toggle('bt-hide-badges', !!CONFIG.hideBadges);
    r.classList.toggle('bt-hide-leaderboard', !!CONFIG.hideLeaderboard);
    r.classList.toggle('bt-hide-community-highlights', !!CONFIG.hideCommunityHighlights);
    r.classList.toggle('bt-separators', !!CONFIG.msgSeparators);
    applyChatTopSurfaces();
  }

  const CHAT_MESSAGE_LIST_SELECTOR =
    '.chat-list--default, .chat-scrollable-area__message-container, [data-test-selector="chat-scrollable-area__message-container"]';
  const TOP_USERS_SURFACE_SELECTOR =
    '[data-testid="leaderboard-top-three-entry"], [class*="bitsLeaderboard"]';
  const COMMUNITY_HIGHLIGHT_SURFACE_SELECTOR =
    '[class*="community-highlight-stack__"], .community-highlight, .pinned-chat__highlight-card';
  const CHAT_TOP_SURFACE_OBSERVER_IGNORE =
    '.chat-list--default, .chat-input, .chat-room__notifications, .chat-room__viewer-card';

  function containsChatSurface(element, selector) {
    return !!(element && (element.matches(selector) || element.querySelector(selector)));
  }

  function applyChatTopSurfaces() {
    document.querySelectorAll('.bt-top-users-hidden').forEach((el) => el.classList.remove('bt-top-users-hidden'));
    document.querySelectorAll('.bt-community-highlights-hidden').forEach((el) => el.classList.remove('bt-community-highlights-hidden'));
    if (!CONFIG.hideLeaderboard && !CONFIG.hideCommunityHighlights) return;
    document.querySelectorAll('.chat-room__content').forEach((content) => {
      const children = Array.from(content.children);
      const listIdx = children.findIndex((child) => containsChatSurface(child, CHAT_MESSAGE_LIST_SELECTOR));
      if (listIdx === -1) return; // chat not ready yet - don't risk hiding anything
      for (let i = 0; i < listIdx; i++) {
        const child = children[i];
        if (child.matches('[data-a-target="chat-alert-queue"]') || child.querySelector('[data-a-target="chat-alert-queue"]')) continue;
        if (CONFIG.hideLeaderboard && containsChatSurface(child, TOP_USERS_SURFACE_SELECTOR)) {
          child.classList.add('bt-top-users-hidden');
        }
        if (CONFIG.hideCommunityHighlights && containsChatSurface(child, COMMUNITY_HIGHLIGHT_SURFACE_SELECTOR)) {
          child.classList.add('bt-community-highlights-hidden');
        }
      }
    });
  }

  let chatTopSurfaceObserver = null, observedChatTopSurfaceRoom = null, chatTopSurfaceFrame = null;

  function scheduleChatTopSurfaces() {
    if (chatTopSurfaceFrame) return;
    const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
    chatTopSurfaceFrame = schedule(() => {
      chatTopSurfaceFrame = null;
      applyChatTopSurfaces();
    });
  }

  function ensureChatTopSurfaceObserver() {
    if (!CONFIG.hideLeaderboard && !CONFIG.hideCommunityHighlights) {
      if (chatTopSurfaceObserver) chatTopSurfaceObserver.disconnect();
      chatTopSurfaceObserver = null;
      observedChatTopSurfaceRoom = null;
      return;
    }
    const room = document.querySelector('.chat-room__content');
    if (!room) {
      if (observedChatTopSurfaceRoom && !observedChatTopSurfaceRoom.isConnected) {
        if (chatTopSurfaceObserver) chatTopSurfaceObserver.disconnect();
        chatTopSurfaceObserver = null;
        observedChatTopSurfaceRoom = null;
      }
      return;
    }
    if (room === observedChatTopSurfaceRoom) return;
    if (chatTopSurfaceObserver) chatTopSurfaceObserver.disconnect();
    chatTopSurfaceObserver = new MutationObserver((records) => {
      const relevant = records.some((record) => {
        const target = record.target.nodeType === 1 ? record.target : record.target.parentElement;
        return !target || !target.closest(CHAT_TOP_SURFACE_OBSERVER_IGNORE);
      });
      if (relevant) scheduleChatTopSurfaces();
    });
    chatTopSurfaceObserver.observe(room, { childList: true, subtree: true });
    observedChatTopSurfaceRoom = room;
    applyChatTopSurfaces();
  }

  let lastAutoQualityCheck = 0;

  function applyAutoQuality(force) {
    if (!CONFIG.autoQuality) { lastAutoQualityCheck = 0; return; }
    const now = Date.now();
    if (!force && now - lastAutoQualityCheck < 30000) return;
    lastAutoQualityCheck = now;
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

  let claimTimer = null;

  function scheduleClaim() {
    if (claimTimer || (!CONFIG.autoClaimPoints && !CONFIG.autoClaimDrops)) return;
    claimTimer = setTimeout(() => {
      claimTimer = null;
      runClaims();
      scheduleClaim();
    }, 8000 + Math.random() * 5000);
  }

  function syncClaimSchedule() {
    if (!CONFIG.autoClaimPoints && !CONFIG.autoClaimDrops) {
      clearTimeout(claimTimer);
      claimTimer = null;
      return;
    }
    scheduleClaim();
  }

  syncClaimSchedule();

  function setImp(el, prop, val) {
    if (el.style.getPropertyValue(prop) !== val || el.style.getPropertyPriority(prop) !== 'important') el.style.setProperty(prop, val, 'important');
  }

  function removeInlineStyle(el, prop) {
    if (el && (el.style.getPropertyValue(prop) || el.style.getPropertyPriority(prop))) el.style.removeProperty(prop);
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
      if (bw > 250 && bw < 1300) { setImp(el, 'width', w); setImp(el, 'max-width', w); }
    }
  }

  function widenVideo() {
    const delta = Math.max(0, CONFIG.chatWidthPx - DEFAULT_CHAT_PX);
    const main = document.querySelector('main.twilight-main, .twilight-main');
    if (main) { setImp(main, 'transition', 'none'); setImp(main, 'margin-right', delta + 'px'); }
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
      } else { ['transform', 'right', 'left'].forEach((property) => removeInlineStyle(t, property)); }
    });
  }

  function resetLayout() {
    const col = document.querySelector('.channel-root__right-column');
    if (col) {
      ['width', 'min-width', 'max-width', 'flex-basis', 'transition'].forEach((property) => removeInlineStyle(col, property));
      if (col.classList.contains('channel-root__right-column--expanded')) setImp(col, 'transform', 'translateX(-' + DEFAULT_CHAT_PX + 'px)');
      else removeInlineStyle(col, 'transform');
    }
    const main = document.querySelector('main.twilight-main, .twilight-main');
    if (main) { removeInlineStyle(main, 'margin-right'); removeInlineStyle(main, 'transition'); }
  }

  let layoutObserver = null, observedCol = null, layoutFrame = null;

  function scheduleLayout() {
    if (layoutFrame) return;
    const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
    layoutFrame = schedule(() => {
      layoutFrame = null;
      applyLayout();
    });
  }

  function disconnectLayoutObserver() {
    if (layoutObserver) layoutObserver.disconnect();
    layoutObserver = null;
    observedCol = null;
  }

  function ensureObserver(col) {
    if (col === observedCol) return;
    disconnectLayoutObserver();
    layoutObserver = new MutationObserver(scheduleLayout);
    layoutObserver.observe(col, { attributes: true, attributeFilter: ['style', 'class'] });
    observedCol = col;
  }

  function applyLayout() {
    const col = document.querySelector('.channel-root__right-column');
    if (col && CONFIG.chatWidthEnabled) ensureObserver(col);
    else if (observedCol) disconnectLayoutObserver();
    const expanded = col && col.classList.contains('channel-root__right-column--expanded');
    if (CONFIG.chatWidthEnabled && expanded) { widenChat(); widenVideo(); } else resetLayout();
    applyToggle();
  }

  const PANEL_W = 390;
  let panel = null;

  function formatVal(k, v) {
    if (k === 'chatWidthPx') return v + 'px';
    if (k === 'pingVolume') return Math.round(v * 100) + '%';
    return '' + v;
  }

  function applyAppearanceProfile() {
    const root = document.documentElement;
    if (!root) return;
    const className = 'bt-profile-' +
      (APPEARANCE_PROFILES.has(CONFIG.appearanceProfile) ? CONFIG.appearanceProfile : 'comfortable');
    if (root.classList.contains(className)) return;
    root.classList.remove('bt-profile-comfortable', 'bt-profile-compact', 'bt-profile-accessible');
    root.classList.add(className);
  }

  let featureSurfaceSignature = '';

  function syncFeatureSurfaces() {
    const signature = [
      CONFIG.viewerHovercards, CONFIG.preserveDrafts, CONFIG.characterCounter,
      CONFIG.spamCompression, CONFIG.quickChatFilters, CONFIG.liveChatSearch,
      CONFIG.appearanceProfile, CONFIG.saferSending, CONFIG.autoClaimPoints,
      CONFIG.autoClaimDrops, currentLang(),
    ].join('|');
    if (signature !== featureSurfaceSignature) {
      featureSurfaceSignature = signature;
      if (!CONFIG.viewerHovercards && hovercard) hovercard.classList.remove('bt-open');
      if (!CONFIG.preserveDrafts && !draftStorageDisabledCleared) {
        clearStoredDrafts();
        draftStorageDisabledCleared = true;
      } else if (CONFIG.preserveDrafts) {
        draftStorageDisabledCleared = false;
      }
      if (!CONFIG.characterCounter) removeCharacterCounter();
      if (spamCompressionActive !== CONFIG.spamCompression) {
        resetSpamCompression();
        spamCompressionActive = CONFIG.spamCompression;
      }
      syncChatControlAvailability();
      applyAppearanceProfile();
      syncClaimSchedule();
      if (!CONFIG.saferSending) {
        duplicateConfirmation = null;
        hideComposerNotice();
        removeConnectionStatus();
      }
    }
    ensureComposerTools();
  }

  function refresh() { applyLayout(); applyVars(); applyAutoQuality(true); ensureExtraButtons(); syncFeatureSurfaces(); syncAll(); }

  function settingDisabled(key) {
    const parents = {
      chatWidthPx: 'chatWidthEnabled',
      mentionContextMessages: 'mentionInbox',
      mentionReplyPing: 'mentionSound',
      botNames: 'hideBots',
      mentionColor: 'mentionHighlight',
      modColor: 'highlightMods',
      vipColor: 'highlightVips',
      firstChatterColor: 'highlightFirstChatters',
      returningChatterColor: 'highlightReturningChatters',
    };
    return parents[key] ? !CONFIG[parents[key]] : false;
  }

  function updatePanelDependencies() {
    if (!panel) return;
    panel.querySelectorAll('[data-k]').forEach((input) => {
      input.disabled = settingDisabled(input.dataset.k);
    });
  }

  const SVG = (inner) => '<svg class="bt-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  const SEC_ICONS = {
    secGeneral: SVG('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/>'),
    secDeleted: SVG('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    secChatAppearance: SVG('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16M6 8h6M6 12h6"/>'),
    secChatTools: SVG('<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>'),
    secComposer: SVG('<path d="M4 4h16v12H8l-4 4V4Z"/><path d="M8 8h8M8 12h5"/>'),
    secConversation: SVG('<path d="M3 5h18v12H7l-4 4V5Z"/><path d="m8 11 2 2 5-5M17 9h1M17 13h1"/>'),
    secPlayerRewards: SVG('<polygon points="5 3 19 12 5 21 5 3"/><path d="M17 3l1 2 2 .3-1.5 1.5.4 2.2L17 8l-1.9 1 .4-2.2L14 5.3l2-.3z"/>'),
    secNotifications: SVG('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
    secHighlights: SVG('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    secFilter: SVG('<polygon points="22 4 2 4 10 12.5 10 19 14 21 14 12.5 22 4"/>'),
  };

  function secHead(key) {
    return '<div class="bt-sub" data-bt-section="' + key + '">' + (SEC_ICONS[key] || '') + t(key) + '</div>';
  }

  function groupSettingSections(root) {
    const headings = Array.from(root.children).filter((element) => element.classList.contains('bt-sub'));
    headings.forEach((heading) => {
      const key = heading.dataset.btSection || '';
      const section = document.createElement('section');
      section.className = 'bt-settings-section' + (key ? ' bt-settings-' + key : '');
      if (key) {
        heading.id = 'bt-settings-heading-' + key;
        section.setAttribute('aria-labelledby', heading.id);
      }
      root.insertBefore(section, heading);
      section.appendChild(heading);
      while (section.nextElementSibling &&
             !section.nextElementSibling.classList.contains('bt-sub') &&
             !section.nextElementSibling.classList.contains('bt-foot') &&
             !section.nextElementSibling.classList.contains('bt-note')) {
        section.appendChild(section.nextElementSibling);
      }
    });
  }

  let settingTooltip = null, activeHelp = null;

  function ensureSettingTooltip() {
    if (settingTooltip) return settingTooltip;
    settingTooltip = document.createElement('div');
    settingTooltip.id = 'bt-setting-tooltip';
    settingTooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(settingTooltip);
    return settingTooltip;
  }

  function positionSettingTooltip(anchor) {
    if (!settingTooltip || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    const tipRect = settingTooltip.getBoundingClientRect();
    const margin = 8;
    let left = Math.max(margin, Math.min(window.innerWidth - tipRect.width - margin, rect.right - tipRect.width));
    let top = rect.top - tipRect.height - 8;
    if (top < margin) top = Math.min(window.innerHeight - tipRect.height - margin, rect.bottom + 8);
    settingTooltip.style.left = Math.round(left) + 'px';
    settingTooltip.style.top = Math.round(Math.max(margin, top)) + 'px';
  }

  function showSettingTooltip(anchor) {
    const description = (anchor && anchor.dataset.btHelpDescription) || settingHelp(anchor && anchor.dataset.btHelp);
    if (!description) return;
    if (activeHelp && activeHelp !== anchor) {
      activeHelp.setAttribute('aria-expanded', 'false');
    }
    activeHelp = anchor;
    const tip = ensureSettingTooltip();
    tip.textContent = description;
    tip.classList.add('bt-open');
    anchor.setAttribute('aria-expanded', 'true');
    positionSettingTooltip(anchor);
  }

  function hideSettingTooltip(anchor) {
    if (!settingTooltip || (anchor && activeHelp !== anchor)) return;
    if (activeHelp) activeHelp.setAttribute('aria-expanded', 'false');
    settingTooltip.classList.remove('bt-open');
    activeHelp = null;
  }

  function addSettingTooltips() {
    ensureSettingTooltip();
    panel.querySelectorAll('label.bt-row').forEach((label) => {
      if (label.parentElement && label.parentElement.classList.contains('bt-setting-item')) return;
      const item = document.createElement('div');
      item.className = 'bt-setting-item';
      label.parentNode.insertBefore(item, label);
      item.appendChild(label);
    });
    const settingItems = Array.from(panel.querySelectorAll('.bt-setting-item, .bt-rowflex')).filter((item) =>
      item.querySelector('[data-k]')
    );
    settingItems.forEach((item) => {
      const controls = Array.from(item.querySelectorAll('input[data-k], select[data-k], textarea[data-k]'));
      const primary = controls.find((control) => control.type === 'checkbox') || controls[0];
      if (!primary) return;
      const descriptions = controls.map((control) => settingHelp(control.dataset.k)).filter(Boolean);
      const description = Array.from(new Set(descriptions)).join(' ');
      if (!description) return;
      const key = primary.dataset.k;
      item.dataset.btHelpDescription = description;
      item.setAttribute('aria-description', description);
      controls.forEach((control) => {
        control.setAttribute('data-bt-help-description', description);
        control.setAttribute('aria-description', description);
      });
      if (item.querySelector(':scope > .bt-help')) return;
      const help = document.createElement('button');
      help.type = 'button';
      help.className = 'bt-help';
      help.dataset.btHelp = key;
      help.dataset.btHelpDescription = description;
      help.textContent = 'i';
      help.title = '';
      help.setAttribute('aria-label', t('settingHelpTitle') + ': ' + description);
      help.setAttribute('aria-expanded', 'false');
      help.setAttribute('aria-describedby', 'bt-setting-tooltip');
      help.addEventListener('pointerenter', () => showSettingTooltip(help));
      help.addEventListener('pointerleave', () => hideSettingTooltip(help));
      help.addEventListener('focus', () => showSettingTooltip(help));
      help.addEventListener('blur', () => setTimeout(() => hideSettingTooltip(help), 0));
      help.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      item.insertBefore(help, item.firstChild);
    });
    panel.addEventListener('scroll', () => hideSettingTooltip(null), { passive: true });
  }

  function ensurePanel() {
    if (panel) return;
    panel = document.createElement('div');
    panel.id = 'bt-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', t('settingsBtnTitle'));
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="bt-head">
        <span class="bt-title">BetterTwitch</span><a class="bt-version" href="${PROJECT_URL}" target="_blank" rel="noopener noreferrer">v${VERSION}</a><span class="bt-by">${t('byAuthor')} <a href="${AUTHOR_URL}" target="_blank" rel="noopener noreferrer">YaneonY</a></span>
      </div>

      ${secHead('secGeneral')}
      <div class="bt-rowflex"><span style="flex:1">${t('language')}</span><select data-k="language"><option value="auto">${t('langAuto')}</option><option value="en">English</option><option value="de">Deutsch</option><option value="ru">Русский</option></select></div>
      <div class="bt-rowflex"><label style="flex:1">${t('accentColor')}</label><input type="color" data-k="accentColor"></div>

      ${secHead('secChatAppearance')}
      <label class="bt-row"><input type="checkbox" data-k="chatWidthEnabled"> ${t('chatWidthEnabled')}</label>
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('width')}</span><input type="range" min="340" max="${MAX_CHAT_PX}" step="10" data-k="chatWidthPx"><span class="bt-val" data-val-for="chatWidthPx"></span></div>
      <div class="bt-rowflex"><span style="flex:1">${t('appearanceProfile')}</span><select data-k="appearanceProfile"><option value="comfortable">${t('profileComfortable')}</option><option value="compact">${t('profileCompact')}</option><option value="accessible">${t('profileAccessible')}</option></select></div>
      <label class="bt-row"><input type="checkbox" data-k="showAvatars"> ${t('showAvatars')}</label>
      <label class="bt-row"><input type="checkbox" data-k="hideBadges"> ${t('hideBadges')}</label>
      <label class="bt-row"><input type="checkbox" data-k="fixNameColors"> ${t('fixNameColors')}</label>
      <label class="bt-row"><input type="checkbox" data-k="msgSeparators"> ${t('msgSeparators')}</label>
      <label class="bt-row"><input type="checkbox" data-k="hideLeaderboard"> ${t('hideLeaderboard')}</label>
      <label class="bt-row"><input type="checkbox" data-k="hideCommunityHighlights"> ${t('hideCommunityHighlights')}</label>

      ${secHead('secChatTools')}
      <label class="bt-row"><input type="checkbox" data-k="dashboard"> ${t('dashboard')}</label>
      <label class="bt-row"><input type="checkbox" data-k="viewerHovercards"> ${t('viewerHovercards')}</label>
      <label class="bt-row"><input type="checkbox" data-k="copyButton"> ${t('copyButton')}</label>
      <label class="bt-row"><input type="checkbox" data-k="inlineTranslate"> ${t('inlineTranslate')}</label>
      <label class="bt-row"><input type="checkbox" data-k="mentionInbox"> ${t('mentionInbox')}</label>
      <div class="bt-rowflex"><span style="flex:0 0 130px">${t('mentionContextMessages')}</span><input type="range" min="0" max="3" step="1" data-k="mentionContextMessages"><span class="bt-val" data-val-for="mentionContextMessages"></span></div>

      ${secHead('secComposer')}
      <label class="bt-row"><input type="checkbox" data-k="preserveDrafts"> ${t('preserveDrafts')}</label>
      <label class="bt-row"><input type="checkbox" data-k="sentMessageHistory"> ${t('sentMessageHistory')}</label>
      <label class="bt-row"><input type="checkbox" data-k="characterCounter"> ${t('characterCounter')}</label>
      <label class="bt-row"><input type="checkbox" data-k="saferSending"> ${t('saferSending')}</label>

      ${secHead('secConversation')}
      <label class="bt-row"><input type="checkbox" data-k="spamCompression"> ${t('spamCompression')}</label>
      <label class="bt-row"><input type="checkbox" data-k="quickChatFilters"> ${t('quickChatFilters')}</label>
      <label class="bt-row"><input type="checkbox" data-k="liveChatSearch"> ${t('liveChatSearch')}</label>
      <label class="bt-row"><input type="checkbox" data-k="saferLinks"> ${t('saferLinks')}</label>

      ${secHead('secHighlights')}
      <div class="bt-rowflex"><label><input type="checkbox" data-k="mentionHighlight"> ${t('mentionHighlight')}</label><input type="color" data-k="mentionColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightMods"> ${t('highlightMods')}</label><input type="color" data-k="modColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightVips"> ${t('highlightVips')}</label><input type="color" data-k="vipColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightFirstChatters"> ${t('highlightFirstChatters')}</label><input type="color" data-k="firstChatterColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightReturningChatters"> ${t('highlightReturningChatters')}</label><input type="color" data-k="returningChatterColor"></div>

      ${secHead('secNotifications')}
      <label class="bt-row"><input type="checkbox" data-k="mentionSound"> ${t('mentionSound')}</label>
      <label class="bt-row"><input type="checkbox" data-k="mentionReplyPing"> ${t('mentionReplyPing')}</label>
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('sound')}</span><select data-k="pingSound"><option value="message">${t('sndMessage')}</option><option value="pop">${t('sndPop')}</option><option value="drop">${t('sndDrop')}</option><option value="knock">${t('sndKnock')}</option><option value="glass">${t('sndGlass')}</option><option value="pluck">${t('sndPluck')}</option><option value="orbit">${t('sndOrbit')}</option><option value="pixel">${t('sndPixel')}</option><option value="bell">${t('sndBell')}</option><option value="spark">${t('sndSpark')}</option><option value="chime">${t('sndChime')}</option><option value="doubletap">${t('sndDoubleTap')}</option><option value="woodblock">${t('sndWoodblock')}</option><option value="marble">${t('sndMarble')}</option><option value="quartz">${t('sndQuartz')}</option><option value="blink">${t('sndBlink')}</option><option value="ripple">${t('sndRipple')}</option><option value="chord">${t('sndChord')}</option></select><button class="bt-btn" id="bt-test-ping">${t('test')}</button></div>
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('volume')}</span><input type="range" min="0" max="1" step="0.05" data-k="pingVolume"><span class="bt-val" data-val-for="pingVolume"></span></div>

      ${secHead('secDeleted')}
      <label class="bt-row"><input type="checkbox" data-k="markSingleDeletes"> ${t('markSingleDeletes')}</label>
      <label class="bt-row"><input type="checkbox" data-k="markTimeouts"> ${t('markTimeouts')}</label>
      <label class="bt-row"><input type="checkbox" data-k="markFullClear"> ${t('markFullClear')}</label>

      ${secHead('secFilter')}
      <label class="bt-row"><input type="checkbox" data-k="hideCommands"> ${t('hideCommands')}</label>
      <label class="bt-row"><input type="checkbox" data-k="hideBots"> ${t('hideBots')}</label>
      <div class="bt-rowflex"><span style="flex:0 1 112px">${t('botNamesLabel')}</span><input type="text" data-k="botNames" maxlength="2000" placeholder="${t('botNamesPlaceholder')}"></div>

      ${secHead('secPlayerRewards')}
      <label class="bt-row"><input type="checkbox" data-k="autoQuality"> ${t('autoQuality')}</label>
      <label class="bt-row"><input type="checkbox" data-k="autoClaimPoints"> ${t('autoClaimPoints')}</label>
      <label class="bt-row"><input type="checkbox" data-k="autoClaimDrops"> ${t('autoClaimDrops')}</label>

      <div class="bt-foot">
        <button class="bt-btn" id="bt-export">${t('export')}</button>
        <button class="bt-btn" id="bt-import">${t('import')}</button>
        <button class="bt-btn" id="bt-reset" style="margin-left:auto">${t('reset')}</button>
      </div>
      <div class="bt-note">${t('savedNote')}</div>
    `;
    groupSettingSections(panel);
    document.body.appendChild(panel);
    addSettingTooltips();

    panel.querySelectorAll('input[data-k], select[data-k], textarea[data-k]').forEach(inp => {
      const k = inp.dataset.k, type = inp.type;
      if (type === 'checkbox') inp.checked = !!CONFIG[k]; else inp.value = CONFIG[k];
      const lbl = panel.querySelector('[data-val-for="' + k + '"]');
      if (lbl) lbl.textContent = formatVal(k, CONFIG[k]);
      const evt = (type === 'range' || type === 'color' || type === 'text' || inp.tagName === 'SELECT' || inp.tagName === 'TEXTAREA') ? 'input' : 'change';
      inp.addEventListener(evt, () => {
        let v;
        if (type === 'checkbox') v = inp.checked;
        else if (type === 'range') v = parseFloat(inp.value);
        else v = inp.value;
        if (!validSettingValue(k, v)) { inp.value = CONFIG[k]; return; }
        CONFIG[k] = v;
        if (lbl) lbl.textContent = formatVal(k, v);
        saveConfig();
        updatePanelDependencies();
        if (k === 'language') { location.reload(); return; }
        refresh();
      });
    });
    updatePanelDependencies();

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
          const imported = parseSettingsJSON(s);
          if (!imported) { note.style.color = '#ff6b6b'; note.textContent = t('alertInvalidSettings'); return; }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
            location.reload();
          } catch (e) {
            note.style.color = '#ff6b6b';
            note.textContent = t('alertInvalidSettings');
          }
        },
      });
    });
    panel.querySelector('#bt-reset').addEventListener('click', () => {
      if (confirm(t('confirmReset'))) { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} location.reload(); }
    });

    document.addEventListener('click', (e) => {
      const clickedHelp = e.target.closest && e.target.closest('.bt-help');
      if (!clickedHelp) hideSettingTooltip(null);
      if (panel.classList.contains('bt-open') && !eventInside(e, panel) && !(e.target.closest && e.target.closest('#bt-settings-btn'))) {
        setSurfaceOpen(panel, false);
        updateFooterPanelButton('bt-settings-btn', false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('bt-open')) {
        setSurfaceOpen(panel, false);
        hideSettingTooltip(null);
        updateFooterPanelButton('bt-settings-btn', false);
      }
    });
  }

  let modal = null;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'bt-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'bt-modal-title');
    modal.innerHTML = `
      <div class="bt-modal-box">
        <div class="bt-modal-head"><span class="bt-modal-title" id="bt-modal-title"></span><button class="bt-modal-x" type="button" aria-label="${t('ioClose')}">✕</button></div>
        <textarea spellcheck="false"></textarea>
        <div class="bt-modal-note"></div>
        <div class="bt-modal-foot">
          <button class="bt-btn bt-modal-primary" type="button"></button>
          <button class="bt-btn bt-modal-close" type="button"></button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => setSurfaceOpen(modal, false);
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
    setSurfaceOpen(m, true);
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

  function closeFeaturePanels(except) {
    if (except !== 'settings' && panel) {
      setSurfaceOpen(panel, false);
      hideSettingTooltip(null);
      updateFooterPanelButton('bt-settings-btn', false);
    }
    if (except !== 'inbox') {
      setInboxOpen(false);
    }
    if (except !== 'dashboard') setDashboardOpen(false);
    if (except !== 'chatControls') setChatControlOpen(false);
  }

  function togglePanel(p, btn, onOpen) {
    const willOpen = !p.classList.contains('bt-open');
    if (willOpen) { positionPanel(p, btn); if (onOpen) onOpen(); }
    setSurfaceOpen(p, willOpen);
    if (p.id === 'bt-panel') updateFooterPanelButton('bt-settings-btn', willOpen);
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

  function setAttributeValue(element, name, value) {
    if (element.getAttribute(name) !== value) element.setAttribute(name, value);
  }

  function updateFooterPanelButton(id, open) {
    const button = document.getElementById(id);
    if (!button) return;
    const controls = {
      'bt-settings-btn': 'bt-panel',
      'bt-inbox-btn': 'bt-inbox',
      'bt-dash-btn': 'bt-dash',
      'bt-chat-control-btn': 'bt-chat-controls',
    };
    button.classList.add('bt-footer-btn');
    button.classList.toggle('bt-open-state', !!open);
    setAttributeValue(button, 'aria-expanded', open ? 'true' : 'false');
    setAttributeValue(button, 'aria-pressed', open ? 'true' : 'false');
    setAttributeValue(button, 'aria-haspopup', 'dialog');
    if (controls[id]) setAttributeValue(button, 'aria-controls', controls[id]);
  }

  function floatFallback(id, title, innerHTML, onClick) {
    const chat = document.querySelector('.stream-chat, section[data-test-selector="chat-room-component-layout"]');
    if (!chat) return false;
    if (getComputedStyle(chat).position === 'static') chat.style.position = 'relative';
    chat.appendChild(styledButton(id, title, innerHTML, onClick, 'bt-float-btn'));
    return document.getElementById(id);
  }

  function makeFooterButton(id, title, innerHTML, onClick, beforeId) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.classList.add('bt-footer-btn');
      return existing;
    }
    const ctx = footerInsertCtx();
    if (!ctx || !ctx.toolbar) return floatFallback(id, title, innerHTML, onClick);
    let before = (beforeId && document.getElementById(beforeId)) || ctx.cell || ctx.anchor;
    while (before && before.parentElement && before.parentElement !== ctx.toolbar) before = before.parentElement;
    if (!before || before.parentElement !== ctx.toolbar) before = ctx.anchor;
    if (ctx.cell) {
      const wrap = ctx.cell.cloneNode(true);
      let btn = (wrap.matches && wrap.matches('button')) ? wrap : (wrap.querySelector('button') || wrap);
      if (wrap !== btn) wrap.id = id + '-wrap';
      wrap.querySelectorAll('*').forEach((n) => { if (n !== btn && !btn.contains(n) && !n.contains(btn)) n.remove(); });
      ['data-a-target','data-a-id','aria-label','aria-haspopup','aria-expanded','aria-controls'].forEach((a) => { if (btn.removeAttribute) btn.removeAttribute(a); });
      btn.id = id; btn.type = 'button'; btn.title = title; btn.setAttribute('aria-label', title);
      btn.classList.add('bt-footer-btn');
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
      (e) => {
        e.stopPropagation();
        if (!panel.classList.contains('bt-open')) closeFeaturePanels('settings');
        togglePanel(panel, document.getElementById('bt-settings-btn'), null);
        if (!panel.classList.contains('bt-open')) hideSettingTooltip(null);
      });
    updateFooterPanelButton('bt-settings-btn', panel && panel.classList.contains('bt-open'));
  }

  let lastSyncedLogin = '';

  function reSyncOnLogin() {
    const me = getMyLogin();
    if (me !== lastSyncedLogin) { lastSyncedLogin = me; syncAll(); }
  }

  function ensureUI() { injectStyle(); applyVars(); ensurePanel(); ensureSettingsButton(); ensureExtraButtons(); ensureChatObserver(); ensureChatTopSurfaceObserver(); applyAutoQuality(); syncFeatureSurfaces(); }

  function tick() { ensureUI(); applyLayout(); reSyncOnLogin(); }

  if (document.body) tick(); else document.addEventListener('DOMContentLoaded', tick);

  let bootstrapAttempts = 0, bootstrapTimer = null, maintenanceTimer = null;

  function startMaintenanceTimer() {
    if (maintenanceTimer) clearInterval(maintenanceTimer);
    maintenanceTimer = setInterval(tick, document.hidden ? 10000 : 2000);
  }

  bootstrapTimer = setInterval(() => {
    if (!document.body) return;
    tick();
    const ready = document.getElementById('bt-settings-btn') &&
      (document.querySelector('.channel-root__right-column') || document.querySelector('.chat-input, .stream-chat'));
    if (ready || ++bootstrapAttempts >= 50) {
      clearInterval(bootstrapTimer);
      bootstrapTimer = null;
      startMaintenanceTimer();
    }
  }, 200);

  document.addEventListener('visibilitychange', () => {
    if (maintenanceTimer) startMaintenanceTimer();
  });

  window.addEventListener('resize', () => {
    applyLayout();
    if (panel && panel.classList.contains('bt-open')) { const b = document.getElementById('bt-settings-btn'); if (b) positionPanel(panel, b); }
    if (dashboardOpen && dashPanel) { const b = document.getElementById('bt-dash-btn'); if (b) positionPanel(dashPanel, b); }
    if (inboxOpen && inboxPanel) { const b = document.getElementById('bt-inbox-btn'); if (b) positionPanel(inboxPanel, b); }
    if (chatControlOpen && chatControlPanel) { const b = document.getElementById('bt-chat-control-btn'); if (b) positionPanel(chatControlPanel, b); }
    if (activeHelp) positionSettingTooltip(activeHelp);
    positionComposerNotice();
  });
})();
