// ==UserScript==
// @name         BetterTwitch
// @namespace    https://yaneony.com
// @version      3.0.0
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
      secConversation: 'Conversation quality',
      width: 'Width',
      hideBadges: 'Hide badges',
      showAvatars: 'Show user avatars',
      msgSeparators: 'Separator between messages',
      hideLeaderboard: 'Hide leaderboard / Goals slider',
      hideCommunityHighlights: 'Hide community highlights',
      secPlayerRewards: 'Player & rewards',
      autoQuality: 'Prefer source quality',
      raidReturnMinutes: 'Return to original channel after raids',
      offlineRefreshMinutes: 'Offline refresh interval',
      disabledValue: 'Off', minuteShortSetting: 'min',
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
      settingsBtnTitle: 'BetterTwitch settings',
      resetSection: 'Reset section', confirmSectionReset: 'Reset this section to its defaults?',
      activeTools: '{count} active',
      alertCopied: 'Copied to clipboard.',
      alertCopyFailed: 'Copy failed. Press Ctrl/Cmd+C to copy the selected text.',
      copyMessage: 'Copy message', translateMessageAction: 'Click to translate',
      alertInvalidSettings: 'Invalid settings data.',
      confirmReset: 'Reset all BetterTwitch settings to defaults?',
      exportTitle: 'Export settings', importTitle: 'Import settings',
      ioCopy: 'Copy', ioApply: 'Apply', ioClose: 'Close',
      mentionInbox: 'Mentions panel', mentionContextMessages: 'Context messages',
      inlineTranslate: 'Translation button',
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
      dashOffline: 'Channel is offline', dashOfflineHint: 'Live statistics will begin when chat activity resumes.',
      dashLive: 'LIVE', dashCurrentRate: 'Current rate', dashPeakRate: 'Session peak',
      dashTotalMessages: 'Messages', dashUniqueChatters: 'Chatters',
      dashActivity: 'Chat activity', dashLastMinute: 'Last 60 seconds',
      dashActiveNow: 'active now', dashAverageRate: 'average/min', dashSessionTime: 'session',
      dashMessageCount: '{count} messages', dashEmoteUses: '{count} uses',
      dashHourShort: 'h', dashMinuteShort: 'm', dashSecondShort: 's',
      inboxBtnTitle: 'Mentions',
      inboxTitle: 'Mentions', inboxEmpty: 'No mentions yet.', inboxSearch: 'Search mentions…',
      inboxJump: 'Jump to message', inboxMissing: 'Message is no longer visible.',
      transFailed: 'Translation failed', transLoading: 'Translating…',
      retryTranslation: 'Retry', copyTranslation: 'Copy translation', translationCopied: 'Copied',
      showOriginal: 'Show original', showTranslation: 'Show translation',
      detectedLanguage: 'Detected language', translationTarget: 'Translation', unknownLanguage: 'Unknown',
      viewerHovercards: 'Viewer hovercards',
      hoverMessages: 'Messages', hoverMentions: 'Mentions', hoverTopEmote: 'Top emote',
      characterCounterTitle: 'Message length',
      settingHelpTitle: 'Explain this setting', byAuthor: 'by', botNamesLabel: 'Bot usernames', botNamesPlaceholder: 'bot1, bot2, …',
      messageActions: 'Message actions',
      replyMessageAction: 'Reply to message',
      pinMessageAction: 'Pin message',
      replyUnavailable: 'Reply is not available for this message.',
      filterAll: 'All', filterMentions: 'Mentions', filterMods: 'Mods', filterQuestions: 'Questions',
      filterLinks: 'Links', filterEmotes: 'Emotes',
      searchPlaceholder: 'Search username or message',
      searchPrevious: 'Previous result', searchNext: 'Next result',
      searchResultCount: '{current}/{total}', searchNoResults: 'No matches',
      spamCollapsed: 'Repeated ×{count}', spamExpand: 'Show repeated messages', spamCollapse: 'Hide repeated messages',
      unsafeLinkLabel: 'CAUTION',
      unsafeLinkConfirm: 'This link uses the domain "{domain}", which may be shortened or misleading. Open it anyway?',
    },
    de: {
      secGeneral: 'Allgemein', language: 'Sprache', langAuto: 'Automatisch erkennen',
      secDeleted: 'Gelöschte Nachrichten',
      markSingleDeletes: 'Einzellöschungen markieren',
      markTimeouts: 'Timeouts / Sperren markieren',
      markFullClear: 'Komplette Chat-Löschungen markieren',
      secChatAppearance: 'Chat-Darstellung',
      secChatTools: 'Chat-Werkzeuge',
      secConversation: 'Gesprächsqualität',
      width: 'Breite',
      hideBadges: 'Abzeichen ausblenden',
      showAvatars: 'Benutzer-Avatare anzeigen',
      msgSeparators: 'Trennlinie zwischen Nachrichten',
      hideLeaderboard: 'Ranglisten- / Ziele-Karussell ausblenden',
      hideCommunityHighlights: 'Community-Highlights ausblenden',
      secPlayerRewards: 'Player & Belohnungen',
      autoQuality: 'Quellqualität bevorzugen',
      raidReturnMinutes: 'Nach Raids zum Ausgangskanal zurückkehren',
      offlineRefreshMinutes: 'Neuladeintervall bei Offline-Kanälen',
      disabledValue: 'Aus', minuteShortSetting: 'Min.',
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
      settingsBtnTitle: 'BetterTwitch-Einstellungen',
      resetSection: 'Abschnitt zurücksetzen', confirmSectionReset: 'Diesen Abschnitt auf Standardwerte zurücksetzen?',
      activeTools: '{count} aktiv',
      alertCopied: 'In die Zwischenablage kopiert.',
      alertCopyFailed: 'Kopieren fehlgeschlagen. Drücke Strg/Cmd+C, um den markierten Text zu kopieren.',
      copyMessage: 'Nachricht kopieren', translateMessageAction: 'Zum Übersetzen klicken',
      alertInvalidSettings: 'Ungültige Einstellungsdaten.',
      confirmReset: 'Alle BetterTwitch-Einstellungen auf Standard zurücksetzen?',
      exportTitle: 'Einstellungen exportieren', importTitle: 'Einstellungen importieren',
      ioCopy: 'Kopieren', ioApply: 'Übernehmen', ioClose: 'Schließen',
      mentionInbox: 'Erwähnungs-Panel', mentionContextMessages: 'Kontextnachrichten',
      inlineTranslate: 'Übersetzungs-Button',
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
      dashOffline: 'Kanal ist offline', dashOfflineHint: 'Die Live-Statistik beginnt, sobald wieder Chat-Aktivität vorhanden ist.',
      dashLive: 'LIVE', dashCurrentRate: 'Aktuelle Rate', dashPeakRate: 'Sitzungsmaximum',
      dashTotalMessages: 'Nachrichten', dashUniqueChatters: 'Chatter',
      dashActivity: 'Chat-Aktivität', dashLastMinute: 'Letzte 60 Sekunden',
      dashActiveNow: 'jetzt aktiv', dashAverageRate: 'Durchschnitt/Min', dashSessionTime: 'Sitzung',
      dashMessageCount: '{count} Nachrichten', dashEmoteUses: '{count} Nutzungen',
      dashHourShort: 'Std.', dashMinuteShort: 'Min.', dashSecondShort: 'Sek.',
      inboxBtnTitle: 'Erwähnungen',
      inboxTitle: 'Erwähnungen', inboxEmpty: 'Noch keine Erwähnungen.', inboxSearch: 'Erwähnungen suchen…',
      inboxJump: 'Zur Nachricht springen', inboxMissing: 'Nachricht ist nicht mehr sichtbar.',
      transFailed: 'Übersetzung fehlgeschlagen', transLoading: 'Wird übersetzt…',
      retryTranslation: 'Erneut versuchen', copyTranslation: 'Übersetzung kopieren', translationCopied: 'Kopiert',
      showOriginal: 'Original anzeigen', showTranslation: 'Übersetzung anzeigen',
      detectedLanguage: 'Erkannte Sprache', translationTarget: 'Übersetzung', unknownLanguage: 'Unbekannt',
      viewerHovercards: 'Zuschauer-Hovercards',
      hoverMessages: 'Nachrichten', hoverMentions: 'Erwähnungen', hoverTopEmote: 'Top-Emote',
      characterCounterTitle: 'Nachrichtenlänge',
      settingHelpTitle: 'Diese Einstellung erklären', byAuthor: 'von', botNamesLabel: 'Bot-Benutzernamen', botNamesPlaceholder: 'bot1, bot2, …',
      messageActions: 'Nachrichtenaktionen',
      replyMessageAction: 'Auf Nachricht antworten',
      pinMessageAction: 'Nachricht anheften',
      replyUnavailable: 'Für diese Nachricht ist keine Antwortfunktion verfügbar.',
      filterAll: 'Alle', filterMentions: 'Erwähnungen', filterMods: 'Mods', filterQuestions: 'Fragen',
      filterLinks: 'Links', filterEmotes: 'Emotes',
      searchPlaceholder: 'Benutzername oder Nachricht suchen',
      searchPrevious: 'Vorheriger Treffer', searchNext: 'Nächster Treffer',
      searchResultCount: '{current}/{total}', searchNoResults: 'Keine Treffer',
      spamCollapsed: 'Wiederholt ×{count}', spamExpand: 'Wiederholungen anzeigen', spamCollapse: 'Wiederholungen ausblenden',
      unsafeLinkLabel: 'VORSICHT',
      unsafeLinkConfirm: 'Dieser Link verwendet die Domain „{domain}", die verkürzt oder irreführend sein könnte. Trotzdem öffnen?',
    },
    ru: {
      secGeneral: 'Общие', language: 'Язык', langAuto: 'Автоопределение',
      secDeleted: 'Удалённые сообщения',
      markSingleDeletes: 'Отмечать удаления сообщений',
      markTimeouts: 'Отмечать таймауты / баны',
      markFullClear: 'Отмечать полную очистку чата',
      secChatAppearance: 'Вид чата',
      secChatTools: 'Инструменты чата',
      secConversation: 'Качество общения',
      width: 'Ширина',
      hideBadges: 'Скрыть значки',
      showAvatars: 'Показывать аватары',
      msgSeparators: 'Разделитель между сообщениями',
      hideLeaderboard: 'Скрыть карусель рейтинга / целей',
      hideCommunityHighlights: 'Скрыть важные сообщения',
      secPlayerRewards: 'Плеер и награды',
      autoQuality: 'Предпочитать исходное качество',
      raidReturnMinutes: 'Возвращаться на исходный канал после рейдов',
      offlineRefreshMinutes: 'Обновление канала не в сети',
      disabledValue: 'Выкл.', minuteShortSetting: 'мин',
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
      settingsBtnTitle: 'Настройки BetterTwitch',
      resetSection: 'Сбросить раздел', confirmSectionReset: 'Сбросить этот раздел к значениям по умолчанию?',
      activeTools: 'Активно: {count}',
      alertCopied: 'Скопировано в буфер обмена.',
      alertCopyFailed: 'Не удалось скопировать. Нажмите Ctrl/Cmd+C, чтобы скопировать выделенный текст.',
      copyMessage: 'Копировать сообщение', translateMessageAction: 'Нажмите, чтобы перевести',
      alertInvalidSettings: 'Некорректные данные настроек.',
      confirmReset: 'Сбросить все настройки BetterTwitch к значениям по умолчанию?',
      exportTitle: 'Экспорт настроек', importTitle: 'Импорт настроек',
      ioCopy: 'Копировать', ioApply: 'Применить', ioClose: 'Закрыть',
      mentionInbox: 'Панель упоминаний', mentionContextMessages: 'Сообщения контекста',
      inlineTranslate: 'Кнопка перевода',
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
      dashOffline: 'Канал не в сети', dashOfflineHint: 'Статистика начнёт собираться после возобновления активности чата.',
      dashLive: 'ЭФИР', dashCurrentRate: 'Текущий темп', dashPeakRate: 'Пик сеанса',
      dashTotalMessages: 'Сообщения', dashUniqueChatters: 'Участники',
      dashActivity: 'Активность чата', dashLastMinute: 'Последние 60 секунд',
      dashActiveNow: 'активны сейчас', dashAverageRate: 'в среднем/мин', dashSessionTime: 'сеанс',
      dashMessageCount: '{count} сообщений', dashEmoteUses: '{count} использований',
      dashHourShort: 'ч', dashMinuteShort: 'мин', dashSecondShort: 'с',
      inboxBtnTitle: 'Упоминания',
      inboxTitle: 'Упоминания', inboxEmpty: 'Упоминаний пока нет.', inboxSearch: 'Поиск упоминаний…',
      inboxJump: 'Перейти к сообщению', inboxMissing: 'Сообщение больше не отображается.',
      transFailed: 'Ошибка перевода', transLoading: 'Перевод…',
      retryTranslation: 'Повторить', copyTranslation: 'Копировать перевод', translationCopied: 'Скопировано',
      showOriginal: 'Показать оригинал', showTranslation: 'Показать перевод',
      detectedLanguage: 'Определённый язык', translationTarget: 'Перевод', unknownLanguage: 'Неизвестно',
      viewerHovercards: 'Карточки зрителей',
      hoverMessages: 'Сообщения', hoverMentions: 'Упоминания', hoverTopEmote: 'Лучшая эмоция',
      characterCounterTitle: 'Длина сообщения',
      settingHelpTitle: 'Описание этой настройки', byAuthor: 'от', botNamesLabel: 'Имена ботов', botNamesPlaceholder: 'bot1, bot2, …',
      messageActions: 'Действия с сообщением',
      replyMessageAction: 'Ответить на сообщение',
      pinMessageAction: 'Закрепить сообщение',
      replyUnavailable: 'Для этого сообщения ответ недоступен.',
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
      language: 'Controls the language used by every BetterTwitch label, button, message, and tooltip. "Auto-detect" uses the first supported language reported by your browser; English is used if none match. Translation results also use this language as their target. Changing it reloads the page so the whole interface updates consistently.',
      markSingleDeletes: 'When Twitch reports that one specific message was deleted, BetterTwitch keeps that message visible and marks it with a strike-through and trash icon. Turn this off if you want Twitch’s normal behavior, where the deleted text disappears. It only works for deletion events received after BetterTwitch loaded; it cannot recover older or previously removed messages.',
      markTimeouts: 'When a user is timed out or banned, BetterTwitch keeps that user’s messages currently visible in chat and marks them as deleted. This is separate from single-message deletions and full-room clears. It cannot restore messages that disappeared before the script loaded or messages no longer present in the page.',
      markFullClear: 'When a moderator clears the entire chat, BetterTwitch leaves the messages currently on screen visible and marks every one as deleted. Turn this off to let Twitch clear the visible chat normally. Messages from before BetterTwitch loaded, or messages already removed from the page, cannot be recovered.',
      chatWidthPx: 'Sets the chat column to a precise width from 340 to 1200 pixels and resizes the video area to fit beside it. A larger number gives messages more room but leaves less horizontal space for the video; use a smaller value if the player becomes cramped.',
      hideBadges: 'Removes the small subscriber, moderator, VIP, broadcaster, founder, and similar badge images shown beside usernames. This is a visual change in your browser only: it does not remove anyone’s role or badge on Twitch. BetterTwitch can still use badge metadata for moderator and VIP highlighting when Twitch provides it.',
      showAvatars: 'Shows each chatter’s Twitch profile picture before their username in chat and beside their name in the dashboard ranking. BetterTwitch obtains missing avatars through batched requests directly to Twitch’s GraphQL service and caches the results for the page session; no BetterTwitch server receives the usernames. Turn this off for a denser chat and no avatar lookups.',
      msgSeparators: 'Adds a subtle horizontal divider between neighboring chat messages. This only changes appearance and can make fast or densely packed chat easier to follow. Turn it off to return to Twitch’s normal uninterrupted message list.',
      hideLeaderboard: 'Hides Twitch’s rotating leaderboard and Goals slider above chat. Depending on the channel, it can show goals, top clips, Bits cheerers, gift-sub gifters, or other rankings. It does not hide pinned messages, community highlights, chat notices, or the composer. The slider is hidden only in your browser.',
      hideCommunityHighlights: 'Hides Twitch’s community-highlight stack above the message list, including pinned messages and any other cards Twitch places in that same stack. It does not unpin or delete anything, and other viewers still see it. The top-user slider has a separate setting and is not affected.',
      autoQuality: 'Stores Twitch’s "source/chunked" quality preference so the player tries to select the highest quality offered by the current stream. It cannot create a source-quality option when the streamer does not provide one, and Twitch may still change quality because of player or connection conditions. Higher quality can use more bandwidth.',
      raidReturnMinutes: 'Sets when BetterTwitch returns to the channel where a raid chain began. Choose 5 to 60 minutes in five-minute steps, or 0 (Off) to never return automatically. The timer starts with the first raid and later raids do not restart it. Offline refresh stays disabled on every raided destination and resumes only on the original channel.',
      offlineRefreshMinutes: 'Reloads a channel page at the selected interval while Twitch reports that channel as offline. Choose 1 to 60 minutes in one-minute steps, or 0 (Off) to disable it. Reloading stops after Twitch reports the channel live or when you navigate away, and directories, videos, settings, dashboards, and chat popouts are never refreshed.',
      autoClaimPoints: 'Automatically clicks the bonus channel-points chest when Twitch makes that chest available in chat. It only collects the free bonus: it never spends points, chooses rewards, follows channels, or performs predictions. If Twitch does not display a claimable chest, there is nothing for BetterTwitch to click.',
      autoClaimDrops: 'Automatically clicks a visible Twitch Drops "Claim" button when one appears on a supported Twitch page. It cannot complete eligibility requirements, link external accounts, visit another website, or claim a reward that Twitch still considers locked. Check Twitch’s Drops inventory if a campaign requires extra manual steps.',
      mentionSound: 'Plays the selected BetterTwitch sound when a message from another user mentions your currently logged-in Twitch username. Your own messages are ignored, and rapid alerts are rate-limited so a burst of mentions does not play continuously. Most browsers require you to click or interact with the page once before they allow notification audio.',
      mentionReplyPing: 'Also plays the mention notification sound when Twitch identifies a message as a direct reply to one of your messages, even if the reply text does not contain your username. This option only works while "Sound on @mention" is enabled; disabling the main sound also disables reply sounds. It uses the same selected sound and volume.',
      pingSound: 'Chooses which of the 18 built-in short sounds BetterTwitch uses for mention and direct-reply notifications. New installations and resets use Message by default; an existing saved choice is preserved. Use the Test button to hear the current sound. It uses a stable pitch, is generated locally, and does not change any Twitch audio.',
      pingVolume: 'Controls only the volume of BetterTwitch mention and reply sounds, from 0% (completely silent) to 100% (full notification volume). New installations and resets start at 35%; an existing saved level is preserved. Use the Test button to check a comfortable level. This does not change the stream, Twitch ads, browser volume, or operating-system volume.',
      mentionHighlight: 'Adds a colored background and side marker to messages that mention your currently logged-in Twitch username. Your own messages are not treated as incoming mentions. Turn this off to remove the visual marker; the Mentions panel and notification sound have their own separate settings.',
      highlightMods: 'Adds a colored background and side marker to messages from channel moderators. BetterTwitch relies on the role or badge data attached to each Twitch message, so a message cannot be highlighted when Twitch does not provide recognizable moderator metadata. This changes appearance only and grants no moderation permissions.',
      highlightVips: 'Adds a colored background and side marker to messages from channel VIPs. BetterTwitch relies on the role or badge data attached to each Twitch message, so a message cannot be highlighted when Twitch does not provide recognizable VIP metadata. This changes appearance only and does not alter the user’s Twitch status.',
      mentionColor: 'Selects the background, border, and marker color used for messages that mention you. This picker has no visible effect until "Highlight @mentions" is enabled. Choose a color that remains readable against your Twitch theme; it does not affect moderator or VIP colors.',
      modColor: 'Selects the background, border, and marker color used for moderator messages. This picker has no visible effect until "Highlight moderators" is enabled. It changes only the local highlight and does not change Twitch’s username color or moderator badge.',
      vipColor: 'Selects the background, border, and marker color used for VIP messages. This picker has no visible effect until "Highlight VIPs" is enabled. It changes only the local highlight and does not change Twitch’s username color or VIP badge.',
      fixNameColors: 'Checks Twitch username colors against the currently selected light or dark Twitch theme and adjusts only colors that would otherwise be difficult to read. Names that already have enough contrast are left unchanged. This is a local readability adjustment: it does not change the user’s saved Twitch color, role, badge, or identity.',
      copyButton: 'Adds a Copy action to BetterTwitch’s message toolbar, which appears when you hover over or focus a chat message. Clicking it copies the readable author/message content without the toolbar buttons or BetterTwitch translation controls. Turn this off to remove only the Copy action; Twitch’s chat message remains unchanged.',
      accentColor: 'Sets the main color used by BetterTwitch for enabled switches, active buttons, headings, borders, focus rings, and other interface accents. The change is applied immediately across BetterTwitch panels. It does not recolor Twitch itself, usernames, message highlights, or the video player.',
      hideCommands: 'Locally hides messages whose visible message text begins with an exclamation mark, such as "!song" or "!commands". It does not stop you or anyone else from sending commands, delete them from Twitch, or hide commands that do not start with a visible ! character. Turn it off to show matching messages again.',
      hideBots: 'Locally hides messages sent by usernames listed in the bot field below. Matching ignores uppercase/lowercase differences, but the username still needs to be spelled correctly. Nothing is blocked, reported, timed out, or deleted on Twitch; other viewers continue to see those messages.',
      botNames: 'Enter the Twitch login names that "Hide bot messages" should match, separated by commas - for example: nightbot, streamelements. Do not include @ symbols, display-name decorations, or profile links. This field has no effect until "Hide bot messages" is enabled, and a misspelled name will not match.',
      inlineTranslate: 'Adds a Translate action to each message toolbar. Translation is requested only when you click it; the clicked message text is sent directly to Google’s public translation endpoint and translated into the selected or auto-detected BetterTwitch language. Results are cached for this page session and can be copied, retried, or switched back to the original; no BetterTwitch server is involved.',
      mentionInbox: 'Adds a Mentions panel that collects incoming messages which mention your username or directly reply to you. It keeps only the 50 newest mentions, and its unread count is also capped at 50. The panel provides search, optional nearby context, and a button to jump to a message that is still visible. It records only messages received while this page is open; reloading or closing clears the list, while channel changes keep mentions from the same page session.',
      mentionContextMessages: 'Chooses how many ordinary chat messages are saved before and after each item in the Mentions panel: 0, 1, 2, or 3 on each side. This control has no effect until the Mentions panel is enabled. A larger value provides more conversation context but displays and keeps more lines in memory; it does not send them to a server.',
      viewerHovercards: 'Shows a BetterTwitch information card with the viewer’s Twitch avatar when you hover over a username in chat. It summarizes only what BetterTwitch observed during the current page session, including message count, mentions, and most-used emote. The avatar is requested directly from Twitch and cached for the page session; this is not Twitch account history, and reloading or changing the room resets the observed statistics.',
      characterCounter: 'Shows the message’s current character count immediately before Twitch’s chat-settings button, using a slightly larger readable label. It compares the count with the limit detected from Twitch and falls back to 500 characters when no limit is available. The counter is guidance only: it does not shorten text or prevent Twitch from rejecting a message.',
      spamCompression: 'Detects three or more identical messages arriving within 12 seconds and collapses the repeats into one message with a count. Click the count to reveal or hide every original repeated message; nothing is deleted or discarded. Groups exist only in the current visible chat and reset when the room changes, the page reloads, or this option is disabled.',
      quickChatFilters: 'Adds All, Mentions, Moderators, Questions, Links, and Emotes filters to the Chat filters & search panel opened from the chat footer. Selecting a filter temporarily hides non-matching rows in your browser; closing the panel does not cancel the active filter, and nothing is deleted or changed for other viewers. Choose All to restore the complete visible chat.',
      liveChatSearch: 'Adds a simple local search with Previous and Next result navigation to the Chat filters & search panel opened from the chat footer. Type any part of a visible username, Twitch login, or message directly - no prefixes or special search syntax are required. Matching ignores letter case. Closing the panel keeps the current search active; only messages still present on this page are searched, and no query is sent to Twitch or BetterTwitch.',
      saferLinks: 'Shows the actual destination domain beside external chat links and marks shortened, numeric-IP, punycode, or otherwise misleading-looking hosts with a caution label. Clicking a marked link asks for confirmation before opening it. This is a local warning based on the URL text; it does not download, scan, or guarantee the safety of the destination.',
      dashboard: 'Adds a live dashboard for activity observed after BetterTwitch loads in the current chat room. It shows current and peak messages per minute, total messages, unique and recently active chatters, average rate, session duration, a 60-second graph, the top ten chatters with optional avatars, and the top six Twitch emotes. These are local session statistics - not historical Twitch analytics - and they reset on reload or room change.',
    },
    de: {
      language: 'Legt die Sprache für alle BetterTwitch-Beschriftungen, Buttons, Meldungen und Hilfetexte fest. „Automatisch erkennen" verwendet die erste unterstützte Sprache, die dein Browser meldet; passt keine, wird Englisch verwendet. Auch Übersetzungen werden in diese Sprache übertragen. Nach einer Änderung wird die Seite neu geladen, damit die gesamte Oberfläche einheitlich aktualisiert wird.',
      markSingleDeletes: 'Wenn Twitch meldet, dass genau eine Nachricht gelöscht wurde, lässt BetterTwitch sie sichtbar und markiert sie durchgestrichen mit einem Papierkorb-Symbol. Ausschalten stellt Twitchs normales Verhalten wieder her, bei dem der gelöschte Text verschwindet. Es funktioniert nur für Löschereignisse nach dem Laden von BetterTwitch; ältere oder bereits entfernte Nachrichten können nicht wiederhergestellt werden.',
      markTimeouts: 'Wenn ein Benutzer einen Timeout oder eine Sperre erhält, lässt BetterTwitch dessen aktuell sichtbare Nachrichten stehen und markiert sie als gelöscht. Diese Einstellung ist unabhängig von Einzellöschungen und kompletten Chat-Löschungen. Nachrichten, die vor dem Laden des Skripts verschwunden sind oder nicht mehr auf der Seite stehen, können nicht wiederhergestellt werden.',
      markFullClear: 'Wenn ein Moderator den gesamten Chat leert, lässt BetterTwitch die aktuell angezeigten Nachrichten stehen und markiert jede als gelöscht. Ausschalten erlaubt Twitch, den sichtbaren Chat wie gewohnt vollständig zu leeren. Nachrichten von vor dem Laden von BetterTwitch oder bereits von der Seite entfernte Nachrichten können nicht zurückgeholt werden.',
      chatWidthPx: 'Stellt die Chatspalte exakt auf 340 bis 1200 Pixel ein und verkleinert den Videobereich passend. Eine größere Zahl gibt Nachrichten mehr Platz, lässt aber weniger Breite für das Video; wähle einen kleineren Wert, wenn der Player zu eng wird.',
      hideBadges: 'Entfernt die kleinen Abonnenten-, Moderator-, VIP-, Broadcaster-, Gründer- und ähnlichen Abzeichen neben Benutzernamen. Das ist nur eine optische Änderung in deinem Browser: Rollen und Abzeichen auf Twitch bleiben bestehen. BetterTwitch kann von Twitch gelieferte Abzeichen-Metadaten weiterhin für Moderator- und VIP-Hervorhebungen verwenden.',
      showAvatars: 'Zeigt das Twitch-Profilbild jedes Chatters vor dem Namen im Chat und neben dem Namen in der Dashboard-Rangliste. Fehlende Avatare ruft BetterTwitch gebündelt direkt über Twitchs GraphQL-Dienst ab und speichert sie für die Seitensitzung zwischen; kein BetterTwitch-Server erhält die Benutzernamen. Ausschalten sorgt für einen kompakteren Chat und beendet Avatar-Abfragen.',
      msgSeparators: 'Fügt zwischen benachbarten Chat-Nachrichten eine dezente horizontale Trennlinie ein. Das ändert nur die Darstellung und kann einen schnellen oder dicht gefüllten Chat leichter lesbar machen. Ausschalten stellt Twitchs normale, durchgehende Nachrichtenliste wieder her.',
      hideLeaderboard: 'Blendet Twitchs wechselndes Ranglisten- und Ziele-Karussell über dem Chat aus. Je nach Kanal zeigt es Ziele, Top-Clips, führende Bits-Spender, Geschenkabo-Spender oder andere Ranglisten. Angeheftete Nachrichten, Community-Highlights, Chat-Hinweise und Eingabefeld bleiben sichtbar. Das Karussell wird nur in deinem Browser ausgeblendet.',
      hideCommunityHighlights: 'Blendet Twitchs Community-Highlight-Stapel über der Nachrichtenliste aus, einschließlich angehefteter Nachrichten und weiterer Karten, die Twitch in diesem Stapel anzeigt. Nichts wird gelöst oder gelöscht und andere Zuschauer sehen alles weiterhin. Das Top-Nutzer-Karussell besitzt eine eigene Einstellung und bleibt unverändert.',
      autoQuality: 'Speichert bei Twitch die Qualitätspräferenz „Quelle/Chunked", damit der Player die höchste vom aktuellen Stream angebotene Qualität versucht. Die Einstellung kann keine Quellqualität erzeugen, wenn der Streamer sie nicht anbietet, und Twitch kann die Qualität wegen Player- oder Verbindungsbedingungen weiterhin ändern. Höhere Qualität kann mehr Datenvolumen verbrauchen.',
      raidReturnMinutes: 'Legt fest, wann BetterTwitch zu dem Kanal zurückkehrt, auf dem eine Raid-Kette begann. Wähle 5 bis 60 Minuten in Fünf-Minuten-Schritten oder 0 (Aus), um nie automatisch zurückzukehren. Der Timer beginnt mit dem ersten Raid und wird durch weitere Raids nicht neu gestartet. Das Offline-Neuladen bleibt auf allen Raid-Zielkanälen deaktiviert und läuft nur auf dem Ausgangskanal weiter.',
      offlineRefreshMinutes: 'Lädt eine Kanalseite im gewählten Abstand neu, solange Twitch den Kanal als offline meldet. Wähle 1 bis 60 Minuten in Minutenschritten oder 0 (Aus), um die Funktion zu deaktivieren. Das Neuladen endet, nachdem Twitch den Kanal als live meldet oder du die Seite wechselst; Verzeichnisse, Videos, Einstellungen, Dashboards und Chat-Popouts werden nie neu geladen.',
      autoClaimPoints: 'Klickt automatisch auf die Kanalpunkte-Bonustruhe, sobald Twitch sie im Chat anbietet. Es wird ausschließlich der kostenlose Bonus eingesammelt: BetterTwitch gibt keine Punkte aus, wählt keine Belohnungen, folgt keinem Kanal und nimmt nicht an Vorhersagen teil. Zeigt Twitch keine einlösbare Truhe an, gibt es nichts anzuklicken.',
      autoClaimDrops: 'Klickt automatisch auf einen sichtbaren „Einlösen"-Button für Twitch Drops, wenn er auf einer unterstützten Twitch-Seite erscheint. BetterTwitch kann keine Teilnahmebedingungen erfüllen, externe Konten verknüpfen, andere Webseiten besuchen oder noch gesperrte Belohnungen einlösen. Prüfe Twitchs Drops-Inventar, wenn eine Kampagne zusätzliche manuelle Schritte verlangt.',
      mentionSound: 'Spielt den gewählten BetterTwitch-Ton ab, wenn ein anderer Benutzer deinen aktuell angemeldeten Twitch-Namen erwähnt. Eigene Nachrichten werden ignoriert und schnelle Meldungen werden begrenzt, damit bei vielen Erwähnungen kein Dauerton entsteht. Die meisten Browser erlauben Benachrichtigungstöne erst, nachdem du einmal auf der Seite geklickt oder mit ihr interagiert hast.',
      mentionReplyPing: 'Spielt den Erwähnungston auch dann ab, wenn Twitch eine Nachricht als direkte Antwort auf eine deiner Nachrichten erkennt, selbst wenn dein Name nicht im Antworttext steht. Diese Option funktioniert nur mit aktiviertem „Ton bei @Erwähnung"; wird der Hauptton ausgeschaltet, sind auch Antworttöne aus. Verwendet werden derselbe ausgewählte Ton und dieselbe Lautstärke.',
      pingSound: 'Wählt einen der 18 eingebauten kurzen Töne für Erwähnungen und direkte Antworten. Neuinstallationen und Zurücksetzen verwenden standardmäßig Nachricht; eine vorhandene gespeicherte Auswahl bleibt erhalten. Mit dem Test-Button hörst du den aktuellen Ton. Er hat eine stabile Tonhöhe, wird lokal erzeugt und verändert kein Twitch-Audio.',
      pingVolume: 'Regelt ausschließlich die Lautstärke der BetterTwitch-Töne für Erwähnungen und Antworten von 0 % bis 100 %. Neuinstallationen und Zurücksetzen beginnen bei 35 %; ein vorhandener gespeicherter Wert bleibt erhalten. Prüfe die Lautstärke mit dem Test-Button. Stream, Twitch-Werbung, Browser- und Systemlautstärke werden nicht verändert.',
      mentionHighlight: 'Gibt Nachrichten, die deinen aktuell angemeldeten Twitch-Namen erwähnen, einen farbigen Hintergrund und Seitenmarker. Eigene Nachrichten zählen nicht als eingehende Erwähnungen. Ausschalten entfernt nur diese optische Markierung; das Erwähnungs-Panel und der Benachrichtigungston besitzen eigene Einstellungen.',
      highlightMods: 'Gibt Nachrichten von Kanalmoderatoren einen farbigen Hintergrund und Seitenmarker. BetterTwitch benötigt dafür die Rollen- oder Abzeichen-Daten der jeweiligen Twitch-Nachricht; ohne erkennbare Moderator-Metadaten ist keine Hervorhebung möglich. Es ändert nur die Darstellung und verleiht keinerlei Moderationsrechte.',
      highlightVips: 'Gibt Nachrichten von Kanal-VIPs einen farbigen Hintergrund und Seitenmarker. BetterTwitch benötigt dafür die Rollen- oder Abzeichen-Daten der jeweiligen Twitch-Nachricht; ohne erkennbare VIP-Metadaten ist keine Hervorhebung möglich. Es ändert nur die Darstellung und nicht den Twitch-Status des Benutzers.',
      mentionColor: 'Wählt Hintergrund-, Rahmen- und Markerfarbe für Nachrichten, in denen du erwähnt wirst. Die Farbauswahl hat keine sichtbare Wirkung, solange „@Erwähnungen hervorheben" ausgeschaltet ist. Wähle eine Farbe, die in deinem Twitch-Design lesbar bleibt; Moderator- und VIP-Farben ändern sich nicht.',
      modColor: 'Wählt Hintergrund-, Rahmen- und Markerfarbe für Moderator-Nachrichten. Die Farbauswahl hat keine sichtbare Wirkung, solange „Moderatoren hervorheben" ausgeschaltet ist. Nur die lokale Hervorhebung ändert sich, nicht Twitchs Namensfarbe oder Moderator-Abzeichen.',
      vipColor: 'Wählt Hintergrund-, Rahmen- und Markerfarbe für VIP-Nachrichten. Die Farbauswahl hat keine sichtbare Wirkung, solange „VIPs hervorheben" ausgeschaltet ist. Nur die lokale Hervorhebung ändert sich, nicht Twitchs Namensfarbe oder VIP-Abzeichen.',
      fixNameColors: 'Prüft Twitch-Namensfarben im aktuell gewählten hellen oder dunklen Twitch-Design und passt nur Farben an, die sonst schwer lesbar wären. Namen mit ausreichendem Kontrast bleiben unverändert. Diese lokale Lesbarkeitshilfe ändert weder die bei Twitch gespeicherte Farbe noch Rolle, Abzeichen oder Identität des Benutzers.',
      copyButton: 'Fügt der BetterTwitch-Nachrichtenleiste eine Kopieraktion hinzu; die Leiste erscheint beim Überfahren oder Fokussieren einer Chat-Nachricht. Ein Klick kopiert den lesbaren Autor-/Nachrichteninhalt ohne Leisten-Buttons oder BetterTwitch-Übersetzungselemente. Ausschalten entfernt nur die Kopieraktion und verändert die Twitch-Nachricht nicht.',
      accentColor: 'Bestimmt die Hauptfarbe für aktivierte BetterTwitch-Schalter, aktive Buttons, Überschriften, Rahmen, Fokusmarkierungen und weitere Oberflächenakzente. Die Änderung wird sofort in allen BetterTwitch-Panels angewendet. Twitch selbst, Benutzernamen, Nachrichten-Hervorhebungen und Videoplayer werden nicht umgefärbt.',
      hideCommands: 'Blendet lokal Nachrichten aus, deren sichtbarer Text mit einem Ausrufezeichen beginnt, zum Beispiel „!song" oder „!commands". Es verhindert weder das Senden von Befehlen noch löscht es sie bei Twitch; Befehle ohne sichtbares ! am Anfang werden nicht erkannt. Ausschalten zeigt passende Nachrichten wieder an.',
      hideBots: 'Blendet lokal Nachrichten von Benutzernamen aus, die im Bot-Feld darunter stehen. Beim Vergleich ist Groß-/Kleinschreibung egal, der Name muss aber richtig geschrieben sein. Bei Twitch wird nichts blockiert, gemeldet, gesperrt oder gelöscht; andere Zuschauer sehen diese Nachrichten weiterhin.',
      botNames: 'Trage die Twitch-Login-Namen ein, die „Bot-Nachrichten ausblenden" erkennen soll, durch Kommas getrennt, zum Beispiel: nightbot, streamelements. Verwende keine @-Zeichen, Zusätze im Anzeigenamen oder Profillinks. Das Feld wirkt nur bei aktivierter Bot-Ausblendung; ein falsch geschriebener Name wird nicht erkannt.',
      inlineTranslate: 'Fügt jeder Nachrichtenleiste eine Übersetzungsaktion hinzu. Erst beim Anklicken wird der Text dieser einen Nachricht direkt an Googles öffentlichen Übersetzungsdienst gesendet und in die gewählte oder automatisch erkannte BetterTwitch-Sprache übersetzt. Ergebnisse werden für diese Seitensitzung zwischengespeichert und lassen sich kopieren, wiederholen oder gegen das Original umschalten; ein BetterTwitch-Server ist nicht beteiligt.',
      mentionInbox: 'Fügt ein Erwähnungs-Panel hinzu, das eingehende Nachrichten mit deinem Benutzernamen oder direkte Antworten auf dich sammelt. Es behält nur die 50 neuesten Erwähnungen; auch der Ungelesen-Zähler ist auf 50 begrenzt. Das Panel bietet Suche, optionalen Kontext und einen Sprung-Button, solange die Nachricht noch sichtbar ist. Gespeichert werden nur Nachrichten der geöffneten Seite; Neuladen oder Schließen löscht die Liste, Kanalwechsel behalten Erwähnungen derselben Seitensitzung.',
      mentionContextMessages: 'Legt fest, wie viele normale Chat-Nachrichten vor und nach jedem Eintrag im Erwähnungs-Panel gespeichert werden: 0, 1, 2 oder 3 je Seite. Der Wert hat keine Wirkung, solange das Erwähnungs-Panel ausgeschaltet ist. Mehr Kontext zeigt und behält mehr Zeilen im Arbeitsspeicher, sendet sie aber an keinen Server.',
      viewerHovercards: 'Zeigt beim Überfahren eines Chat-Namens eine BetterTwitch-Infokarte mit dem Twitch-Avatar des Zuschauers. Sie fasst ausschließlich zusammen, was BetterTwitch in der aktuellen Seitensitzung gesehen hat: Nachrichtenanzahl, Erwähnungen und meistgenutztes Emote. Der Avatar wird direkt von Twitch abgerufen und für die Seitensitzung zwischengespeichert; dies ist kein Kontoverlauf, und Neuladen oder Raumwechsel setzt die beobachteten Statistiken zurück.',
      characterCounter: 'Zeigt die aktuelle Zeichenzahl direkt vor Twitchs Chat-Einstellungsbutton in einer etwas größeren, gut lesbaren Anzeige. Sie vergleicht den Wert mit dem von Twitch erkannten Limit und verwendet 500 Zeichen, falls kein Limit gefunden wird. Der Zähler dient nur als Orientierung: Er kürzt keinen Text und verhindert keine Ablehnung durch Twitch.',
      spamCompression: 'Erkennt drei oder mehr identische Nachrichten innerhalb von 12 Sekunden und bündelt die Wiederholungen in einer Nachricht mit Zähler. Ein Klick auf den Zähler blendet alle ursprünglichen Wiederholungen ein oder wieder aus; nichts wird gelöscht oder verworfen. Gruppen gelten nur für den aktuell sichtbaren Chat und werden bei Raumwechsel, Neuladen oder Ausschalten zurückgesetzt.',
      quickChatFilters: 'Fügt dem über die Chat-Fußleiste geöffneten Panel „Chat-Filter & Suche" die Filter Alle, Erwähnungen, Moderatoren, Fragen, Links und Emotes hinzu. Ein Filter blendet nicht passende Zeilen nur vorübergehend in deinem Browser aus; beim Schließen des Panels bleibt er aktiv, nichts wird gelöscht und andere Zuschauer sehen keine Änderung. Mit Alle stellst du den vollständigen sichtbaren Chat wieder her.',
      liveChatSearch: 'Fügt dem über die Chat-Fußleiste geöffneten Panel „Chat-Filter & Suche" eine einfache lokale Suche mit Vorheriger-/Nächster-Navigation hinzu. Gib einen beliebigen Teil des sichtbaren Benutzernamens, Twitch-Logins oder Nachrichtentexts direkt ein; Präfixe oder besondere Suchsyntax sind nicht nötig. Groß-/Kleinschreibung wird ignoriert. Beim Schließen bleibt die Suche aktiv; sie erfasst nur Nachrichten der aktuellen Seite und sendet keine Anfrage an Twitch oder BetterTwitch.',
      saferLinks: 'Zeigt neben externen Chat-Links die tatsächliche Zieldomain und markiert verkürzte, numerische IP-, Punycode- oder anderweitig irreführend wirkende Hosts mit einem Warnhinweis. Beim Anklicken eines markierten Links wird vor dem Öffnen nachgefragt. Die lokale Prüfung betrachtet nur den URL-Text; sie lädt das Ziel nicht herunter und garantiert dessen Sicherheit nicht.',
      dashboard: 'Fügt ein Live-Dashboard für Aktivitäten hinzu, die BetterTwitch nach dem Laden im aktuellen Chatraum beobachtet. Es zeigt aktuelle und höchste Nachrichten pro Minute, Gesamtzahl, eindeutige und kürzlich aktive Chatter, Durchschnitt, Sitzungsdauer, ein 60-Sekunden-Diagramm, die zehn aktivsten Chatter mit optionalen Avataren und die sechs häufigsten Twitch-Emotes. Das sind lokale Sitzungsdaten, keine historischen Twitch-Analysen; Neuladen oder Raumwechsel setzt alles zurück.',
    },
    ru: {
      language: 'Определяет язык всех надписей, кнопок, сообщений и подсказок BetterTwitch. Вариант «Автоопределение» использует первый поддерживаемый язык из настроек браузера; если подходящего языка нет, включается английский. На этот же язык переводятся сообщения чата. После изменения страница перезагружается, чтобы весь интерфейс обновился одинаково.',
      markSingleDeletes: 'Когда Twitch сообщает об удалении одного конкретного сообщения, BetterTwitch оставляет его видимым и помечает зачёркиванием и значком корзины. Отключите настройку, чтобы вернуть обычное поведение Twitch, при котором удалённый текст исчезает. Работает только с удалениями, полученными после загрузки BetterTwitch; старые или уже исчезнувшие сообщения восстановить невозможно.',
      markTimeouts: 'Когда пользователь получает таймаут или бан, BetterTwitch оставляет его сообщения, которые сейчас видны в чате, и помечает их удалёнными. Эта настройка действует отдельно от удаления одного сообщения и полной очистки комнаты. Она не может вернуть сообщения, исчезнувшие до загрузки скрипта или уже удалённые со страницы.',
      markFullClear: 'Когда модератор полностью очищает чат, BetterTwitch оставляет сообщения, которые сейчас находятся на экране, и помечает каждое удалённым. Отключите настройку, чтобы Twitch очищал видимый чат обычным способом. Сообщения до загрузки BetterTwitch и уже удалённые со страницы сообщения восстановить невозможно.',
      chatWidthPx: 'Точно задаёт ширину колонки чата от 340 до 1200 пикселей и уменьшает область видео. Чем больше значение, тем больше места у сообщений и тем меньше ширины остаётся видео; уменьшите значение, если плеер стал слишком узким.',
      hideBadges: 'Убирает маленькие значки подписчика, модератора, VIP, владельца канала, основателя и другие значки рядом с именами. Это только визуальное изменение в вашем браузере: роли и значки пользователей на Twitch остаются прежними. BetterTwitch по-прежнему может использовать предоставленные Twitch метаданные значков для подсветки модераторов и VIP.',
      showAvatars: 'Показывает изображение профиля Twitch перед именем участника в чате и рядом с именем в рейтинге панели статистики. Недостающие аватары BetterTwitch запрашивает пакетами напрямую у GraphQL-сервиса Twitch и кеширует на время сеанса страницы; имена не передаются на сервер BetterTwitch. Отключите настройку для более компактного чата без запросов аватаров.',
      msgSeparators: 'Добавляет тонкую горизонтальную линию между соседними сообщениями чата. Меняется только внешний вид; разделители помогают следить за быстрым или плотно заполненным чатом. Отключение возвращает обычный непрерывный список сообщений Twitch.',
      hideLeaderboard: 'Скрывает над чатом меняющуюся карусель рейтингов и целей Twitch. В зависимости от канала в ней могут показываться цели, лучшие клипы, лидеры по Bits, подарочным подпискам и другие рейтинги. Закреплённые сообщения, важные карточки, уведомления чата и поле ввода остаются видимыми. Карусель скрывается только в вашем браузере.',
      hideCommunityHighlights: 'Скрывает блок важных карточек Twitch над списком сообщений, включая закреплённые сообщения и другие карточки в том же блоке. Ничего не открепляется и не удаляется, остальные зрители продолжают всё видеть. Карусель лидеров настраивается отдельно и не затрагивается.',
      autoQuality: 'Сохраняет в Twitch предпочтение качества «Исходное/Chunked», чтобы плеер пытался выбрать самое высокое качество, доступное у текущей трансляции. Настройка не может создать исходное качество, если стример его не предоставляет, а Twitch всё равно может менять качество из-за состояния плеера или соединения. Более высокое качество может расходовать больше трафика.',
      raidReturnMinutes: 'Задаёт время возвращения BetterTwitch на канал, где началась цепочка рейдов. Выберите от 5 до 60 минут с шагом 5 минут или 0 (Выкл.), чтобы не возвращаться автоматически. Таймер запускается с первым рейдом и не перезапускается последующими. Обновление офлайн-канала отключено на всех каналах назначения рейда и возобновляется только на исходном канале.',
      offlineRefreshMinutes: 'Перезагружает страницу канала с выбранным интервалом, пока Twitch сообщает, что канал не в сети. Выберите от 1 до 60 минут с шагом в одну минуту или 0 (Выкл.), чтобы отключить функцию. Обновление прекращается после того, как Twitch сообщает о начале эфира, или при переходе на другую страницу; каталоги, видео, настройки, панели и отдельный чат не обновляются.',
      autoClaimPoints: 'Автоматически нажимает на бонусный сундук баллов канала, когда Twitch показывает его в чате. Получается только бесплатный бонус: BetterTwitch не тратит баллы, не выбирает награды, не подписывается на каналы и не участвует в прогнозах. Если Twitch не показывает доступный сундук, нажимать нечего.',
      autoClaimDrops: 'Автоматически нажимает видимую кнопку «Получить» для Twitch Drops, когда она появляется на поддерживаемой странице Twitch. BetterTwitch не может выполнить условия участия, привязать сторонние аккаунты, открыть другой сайт или получить награду, которую Twitch ещё считает заблокированной. Если кампания требует дополнительных действий, проверьте инвентарь Drops на Twitch.',
      mentionSound: 'Воспроизводит выбранный звук BetterTwitch, когда другой пользователь упоминает имя вашей текущей учётной записи Twitch. Собственные сообщения игнорируются, а частые сигналы ограничиваются, чтобы серия упоминаний не создавала непрерывный шум. Большинство браузеров разрешает звук уведомлений только после первого клика или другого взаимодействия со страницей.',
      mentionReplyPing: 'Также воспроизводит звук упоминания, когда Twitch определяет сообщение как прямой ответ на одно из ваших сообщений, даже если в тексте ответа нет вашего имени. Работает только при включённом параметре «Звук при @упоминании»; отключение основного звука отключает и сигналы ответов. Используются тот же звук и та же громкость.',
      pingSound: 'Выбирает один из 18 встроенных коротких звуков для упоминаний и прямых ответов. Для новой установки и после сброса по умолчанию используется «Сообщение»; сохранённый выбор не изменяется. Кнопка «Тест» воспроизводит текущий вариант. Звук создаётся локально с постоянной высотой тона и не меняет аудио Twitch.',
      pingVolume: 'Регулирует только громкость звуков BetterTwitch для упоминаний и ответов от 0 % до 100 %. Для новой установки и после сброса используется 35 %; сохранённый уровень не изменяется. Используйте кнопку «Тест» для проверки. Громкость трансляции, рекламы Twitch, браузера и операционной системы не меняется.',
      mentionHighlight: 'Добавляет цветной фон и боковую метку к сообщениям, в которых упомянуто имя вашей текущей учётной записи Twitch. Собственные сообщения не считаются входящими упоминаниями. Отключение убирает только визуальную подсветку; у панели упоминаний и звукового уведомления есть отдельные настройки.',
      highlightMods: 'Добавляет цветной фон и боковую метку к сообщениям модераторов канала. BetterTwitch использует данные роли или значка, прикреплённые Twitch к сообщению; если распознаваемых метаданных модератора нет, подсветить сообщение невозможно. Меняется только внешний вид, никаких прав модератора настройка не предоставляет.',
      highlightVips: 'Добавляет цветной фон и боковую метку к сообщениям VIP канала. BetterTwitch использует данные роли или значка, прикреплённые Twitch к сообщению; если распознаваемых метаданных VIP нет, подсветить сообщение невозможно. Меняется только внешний вид, статус пользователя на Twitch не изменяется.',
      mentionColor: 'Выбирает цвет фона, рамки и боковой метки для сообщений, в которых вас упоминают. Выбор цвета ничего не меняет, пока не включена настройка «Подсвечивать @упоминания». Используйте цвет, который хорошо читается в вашей теме Twitch; цвета модераторов и VIP не меняются.',
      modColor: 'Выбирает цвет фона, рамки и боковой метки для сообщений модераторов. Выбор цвета ничего не меняет, пока не включена настройка «Подсвечивать модераторов». Меняется только локальная подсветка, а не цвет имени или значок модератора на Twitch.',
      vipColor: 'Выбирает цвет фона, рамки и боковой метки для сообщений VIP. Выбор цвета ничего не меняет, пока не включена настройка «Подсвечивать VIP». Меняется только локальная подсветка, а не цвет имени или значок VIP на Twitch.',
      fixNameColors: 'Проверяет контраст цветов имён в выбранной светлой или тёмной теме Twitch и корректирует только те цвета, которые иначе трудно читать. Имена с достаточным контрастом остаются без изменений. Эта локальная коррекция читаемости не меняет сохранённый на Twitch цвет, роль, значок или личность пользователя.',
      copyButton: 'Добавляет действие копирования в панель BetterTwitch, которая появляется при наведении или фокусе на сообщении чата. Нажатие копирует читаемое содержимое автора и сообщения без кнопок панели и элементов перевода BetterTwitch. Отключение удаляет только действие копирования и не изменяет сообщение Twitch.',
      accentColor: 'Задаёт основной цвет включённых переключателей, активных кнопок, заголовков, рамок, индикаторов фокуса и других элементов BetterTwitch. Изменение сразу применяется ко всем панелям BetterTwitch. Сама страница Twitch, имена пользователей, подсветка сообщений и видеоплеер не перекрашиваются.',
      hideCommands: 'Локально скрывает сообщения, видимый текст которых начинается с восклицательного знака, например «!song» или «!commands». Настройка не запрещает отправку команд, не удаляет их на Twitch и не распознаёт команды без видимого символа ! в начале. После отключения подходящие сообщения снова отображаются.',
      hideBots: 'Локально скрывает сообщения от имён, указанных в поле списка ботов ниже. Регистр букв не учитывается, но имя должно быть написано правильно. На Twitch ничего не блокируется, не отправляется в жалобы, не выдаётся таймаут и не удаляется; остальные зрители продолжают видеть эти сообщения.',
      botNames: 'Введите логины Twitch, которые должна распознавать настройка «Скрывать сообщения ботов», разделяя их запятыми, например: nightbot, streamelements. Не добавляйте символы @, украшения отображаемого имени или ссылки на профиль. Поле работает только при включённом скрытии ботов; имя с ошибкой не совпадёт.',
      inlineTranslate: 'Добавляет действие перевода в панель каждого сообщения. Текст конкретного сообщения отправляется напрямую в публичный сервис перевода Google только после нажатия кнопки и переводится на выбранный или автоматически определённый язык BetterTwitch. Результат кешируется на время сеанса страницы; его можно скопировать, запросить повторно или переключить на оригинал. Сервер BetterTwitch не используется.',
      mentionInbox: 'Добавляет панель упоминаний, которая собирает входящие сообщения с вашим именем и прямые ответы на ваши сообщения. Она хранит только 50 последних упоминаний; счётчик непрочитанных также ограничен значением 50. В панели есть поиск, необязательный контекст и кнопка перехода, пока исходное сообщение ещё видно. Записываются только сообщения открытой страницы; перезагрузка или закрытие очищает список, а смена канала сохраняет упоминания той же сессии страницы.',
      mentionContextMessages: 'Определяет, сколько обычных сообщений сохраняется до и после каждого элемента панели упоминаний: 0, 1, 2 или 3 с каждой стороны. Значение ничего не меняет, пока панель упоминаний отключена. Чем больше число, тем больше строк показывается и хранится в памяти; на сервер они не отправляются.',
      viewerHovercards: 'Показывает при наведении на имя в чате информационную карточку BetterTwitch с аватаром зрителя Twitch. Карточка содержит только данные текущего сеанса страницы: количество сообщений, упоминания и самую частую эмоцию. Аватар запрашивается напрямую у Twitch и кешируется на время страницы; это не история аккаунта, а перезагрузка или смена комнаты сбрасывает собранную статистику.',
      characterCounter: 'Показывает текущее количество символов прямо перед кнопкой настроек чата Twitch более крупным и читаемым текстом. Счётчик сравнивает длину с лимитом, обнаруженным у Twitch, и использует запасное значение 500 символов, если лимит найти не удалось. Это только подсказка: текст не обрезается, и отказ Twitch в отправке не предотвращается.',
      spamCompression: 'Находит три и более одинаковых сообщения, пришедших за 12 секунд, и сворачивает повторы в одну строку со счётчиком. Нажмите на счётчик, чтобы показать или снова скрыть все исходные сообщения; ничего не удаляется и не теряется. Группы существуют только в текущем видимом чате и сбрасываются при смене комнаты, перезагрузке или отключении функции.',
      quickChatFilters: 'Добавляет в открываемую из нижней части чата панель «Фильтры и поиск» варианты Все, Упоминания, Модераторы, Вопросы, Ссылки и Эмоции. Фильтр временно скрывает неподходящие строки только в вашем браузере; закрытие панели не отменяет его, сообщения не удаляются, а другие зрители не видят изменений. Нажмите Все, чтобы вернуть полный видимый чат.',
      liveChatSearch: 'Добавляет в открываемую из нижней части чата панель «Фильтры и поиск» простой локальный поиск с переходами к предыдущему и следующему совпадению. Введите любую часть видимого имени, логина Twitch или текста сообщения напрямую - префиксы и специальный синтаксис не нужны. Регистр букв не учитывается. После закрытия панели поиск остаётся активным; запросы никуда не отправляются, а поиск охватывает только сообщения текущей страницы.',
      saferLinks: 'Показывает настоящий домен назначения рядом с внешними ссылками и помечает сокращённые, числовые IP-, Punycode- и другие подозрительно выглядящие адреса предупреждением. Перед открытием отмеченной ссылки запрашивается подтверждение. Локальная проверка анализирует только текст URL, не загружает содержимое сайта и не гарантирует его безопасность.',
      dashboard: 'Добавляет панель текущей активности, которую BetterTwitch наблюдает после загрузки в этой комнате чата. Она показывает текущий и пиковый темп сообщений в минуту, общее число, уникальных и недавно активных участников, средний темп, длительность сеанса, график за 60 секунд, десять самых активных участников с необязательными аватарами и шесть популярных эмоций Twitch. Это локальная статистика сеанса, а не историческая аналитика Twitch; перезагрузка или смена комнаты сбрасывает её.',
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

  const VERSION = '3.0.0';
  const PROJECT_URL = 'https://github.com/yaneony/BetterTwitch';
  const AUTHOR_URL = 'https://yaneony.com';
  const STORAGE_KEY = 'BetterTwitch-settings';
  const MAX_CHAT_PX = 1200;
  const DEFAULT_CHAT_PX = 340;
  const DEFAULT_MESSAGE_LIMIT = 500;
  const SPAM_WINDOW_MS = 12000;
  const SPAM_MIN_MATCHES = 3;
  const LOGIN_RE = /^[a-z0-9_]{1,30}$/;
  const PING_SOUND_NAMES = new Set([
    'message', 'pop', 'drop', 'knock', 'glass', 'pluck', 'orbit', 'pixel', 'bell', 'spark',
    'chime', 'doubletap', 'woodblock', 'marble', 'quartz', 'blink', 'ripple', 'chord',
  ]);
  const PING_GAIN_BOOST = 1.15;
  const PING_MASTER_GAIN = 1;
  const DASHBOARD_TOP_CHATTERS = 10;
  const COLOR_RE = /^#[0-9a-f]{6}$/i;
  const DEFAULTS = {
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
  };

  const BOOLEAN_SETTINGS = new Set([
    'markSingleDeletes', 'markTimeouts', 'markFullClear',
    'hideBadges', 'showAvatars', 'msgSeparators',
    'hideLeaderboard', 'hideCommunityHighlights',
    'autoClaimPoints', 'autoClaimDrops', 'autoQuality',
    'mentionSound', 'mentionReplyPing', 'mentionHighlight', 'highlightMods', 'highlightVips',
    'fixNameColors', 'copyButton', 'hideCommands', 'hideBots',
    'inlineTranslate', 'mentionInbox', 'viewerHovercards',
    'characterCounter',
    'spamCompression',
    'quickChatFilters', 'liveChatSearch', 'saferLinks',
    'dashboard',
  ]);
  const COLOR_SETTINGS = new Set([
    'mentionColor', 'modColor', 'vipColor', 'accentColor',
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
    if (key === 'raidReturnMinutes') return Number.isInteger(value) && value >= 0 && value <= 60 && value % 5 === 0;
    if (key === 'offlineRefreshMinutes') return Number.isInteger(value) && value >= 0 && value <= 60;
    if (key === 'botNames') return typeof value === 'string' && value.length <= 2000;
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
    if (!Object.prototype.hasOwnProperty.call(value, 'raidReturnMinutes') && value.preventRaidRedirects === true) {
      normalized.raidReturnMinutes = 5;
    }
    return normalized;
  }

  function parseSettingsJSON(text) {
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { return null; }
    if (!isPlainObject(parsed)) return null;
    for (const key of Object.keys(parsed)) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
        if (!validSettingValue(key, parsed[key])) return null;
        continue;
      }
      // Keep the one supported legacy import migration, but reject misspelled or
      // otherwise unknown keys instead of silently replacing them with defaults.
      if (key === 'preventRaidRedirects' && typeof parsed[key] === 'boolean') continue;
      return null;
    }
    return normalizeConfig(parsed);
  }

  function loadConfig() {
    let saved = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || '';
      saved = JSON.parse(raw || '{}');
    } catch (e) {}
    return normalizeConfig(saved);
  }

  const CONFIG = loadConfig();
  try { localStorage.removeItem('BetterTwitch-chat-drafts'); } catch (e) {}

  function saveConfig() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(CONFIG)); } catch (e) {} }

  const LAST_CHANNEL_URL_KEY = 'BetterTwitch-last-channel-url';
  const RAID_RETURN_STATE_KEY = 'BetterTwitch-raid-return-state';
  const MINUTE_MS = 60 * 1000;
  const MAX_RAID_RETURN_MINUTES = 60;
  const OFFLINE_CHANNEL_SELECTORS = [
    '[data-a-target="offline-channel-main-content"]',
    '[data-test-selector="offline-channel-main-content"]',
    '[data-a-target="home-offline-hero-image"]',
    '[data-test-selector="home-offline-hero-image"]',
    'main [data-a-target*="offline-channel"]',
    'main [data-test-selector*="offline-channel"]',
  ].join(',');
  const RESERVED_CHANNEL_ROUTES = new Set([
    'browse', 'creatorcamp', 'directory', 'downloads', 'drops', 'following', 'inventory', 'jobs',
    'moderator', 'p', 'payments', 'popout', 'prime', 'products', 'search', 'settings', 'store',
    'subscriptions', 'team', 'turbo', 'twitchcon', 'videos', 'wallet',
  ]);
  let raidReturnTimer = null;
  let raidReturnDeadlineScheduled = 0;
  let offlineRefreshTimer = null;
  let offlineRefreshRoute = '';
  let offlineRefreshMinutesScheduled = 0;
  let offlineStatusLogin = '';
  let offlineStatus = null;
  let offlineStatusRequest = null;
  let offlineStatusCheckedAt = 0;

  function channelLoginFromUrl(value) {
    if (!value) return '';
    let url;
    try { url = value instanceof URL ? value : new URL(value, location.href); } catch (e) { return ''; }
    if (url.hostname !== 'www.twitch.tv') return '';
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 1) return '';
    const login = parts[0].toLowerCase();
    return LOGIN_RE.test(login) && !RESERVED_CHANNEL_ROUTES.has(login) ? login : '';
  }

  function normalizedChannelUrl(value) {
    if (!value) return '';
    const login = channelLoginFromUrl(value);
    return login ? 'https://www.twitch.tv/' + login : '';
  }

  function isRaidDestinationUrl(value) {
    let url;
    try { url = value instanceof URL ? value : new URL(value, location.href); } catch (e) { return false; }
    const referrer = (url.searchParams.get('referrer') || '').toLowerCase();
    return referrer === 'raid' || referrer.startsWith('raid_') || referrer.endsWith('_raid');
  }

  function readRaidReturnState() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(RAID_RETURN_STATE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return null;
      const originUrl = normalizedChannelUrl(parsed.originUrl);
      const currentChannelUrl = normalizedChannelUrl(parsed.currentChannelUrl);
      let startedAt = Number(parsed.startedAt);
      const deadline = Number(parsed.deadline);
      if (!Number.isFinite(startedAt) || startedAt <= 0) startedAt = deadline - 5 * MINUTE_MS;
      if (!originUrl || !currentChannelUrl || originUrl === currentChannelUrl || !Number.isFinite(startedAt) || startedAt <= 0 || !Number.isFinite(deadline) || deadline < 0) {
        sessionStorage.removeItem(RAID_RETURN_STATE_KEY);
        return null;
      }
      return { originUrl, currentChannelUrl, startedAt, deadline };
    } catch (e) {
      try { sessionStorage.removeItem(RAID_RETURN_STATE_KEY); } catch (ignored) {}
      return null;
    }
  }

  function writeRaidReturnState(state) {
    try { sessionStorage.setItem(RAID_RETURN_STATE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function clearRaidReturnTimer() {
    if (raidReturnTimer) clearTimeout(raidReturnTimer);
    raidReturnTimer = null;
    raidReturnDeadlineScheduled = 0;
  }

  function clearRaidReturnState() {
    clearRaidReturnTimer();
    try { sessionStorage.removeItem(RAID_RETURN_STATE_KEY); } catch (e) {}
  }

  function scheduleRaidReturn(deadline) {
    if (raidReturnTimer && raidReturnDeadlineScheduled === deadline) return;
    clearRaidReturnTimer();
    raidReturnDeadlineScheduled = deadline;
    raidReturnTimer = setTimeout(() => {
      raidReturnTimer = null;
      raidReturnDeadlineScheduled = 0;
      syncNavigationFeatures();
    }, Math.max(0, Math.min(MAX_RAID_RETURN_MINUTES * MINUTE_MS, deadline - Date.now())));
  }

  function rememberLastChannel(currentChannelUrl) {
    if (!currentChannelUrl) return;
    try { sessionStorage.setItem(LAST_CHANNEL_URL_KEY, currentChannelUrl); } catch (e) {}
  }

  function syncRaidReturn() {
    const currentUrl = new URL(location.href);
    const currentChannelUrl = normalizedChannelUrl(currentUrl);
    const raidDestination = currentChannelUrl && isRaidDestinationUrl(currentUrl);
    let state = readRaidReturnState();

    if (raidDestination) {
      if (!state) {
        let originUrl = '';
        try { originUrl = normalizedChannelUrl(sessionStorage.getItem(LAST_CHANNEL_URL_KEY) || ''); } catch (e) {}
        if (!originUrl) originUrl = normalizedChannelUrl(document.referrer || '');
        if (originUrl && originUrl !== currentChannelUrl) {
          const startedAt = Date.now();
          const deadline = CONFIG.raidReturnMinutes ? startedAt + CONFIG.raidReturnMinutes * MINUTE_MS : 0;
          state = { originUrl, currentChannelUrl, startedAt, deadline };
          writeRaidReturnState(state);
        }
      } else if (state.originUrl === currentChannelUrl) {
        const originUrl = state.originUrl;
        clearRaidReturnState();
        location.replace(originUrl);
        return true;
      } else if (state.currentChannelUrl !== currentChannelUrl) {
        state.currentChannelUrl = currentChannelUrl;
        writeRaidReturnState(state);
      }
    }

    if (state) {
      const stillInRaidChain = currentChannelUrl && (raidDestination || currentChannelUrl === state.currentChannelUrl);
      if (!stillInRaidChain) {
        clearRaidReturnState();
        state = null;
      } else {
        const deadline = CONFIG.raidReturnMinutes ? state.startedAt + CONFIG.raidReturnMinutes * MINUTE_MS : 0;
        if (state.deadline !== deadline) {
          state.deadline = deadline;
          writeRaidReturnState(state);
        }
        if (deadline && Date.now() >= deadline) {
          const originUrl = state.originUrl;
          clearRaidReturnState();
          if (currentChannelUrl !== originUrl) {
            location.replace(originUrl);
            return true;
          }
          state = null;
        } else if (deadline) {
          scheduleRaidReturn(deadline);
        } else {
          clearRaidReturnTimer();
        }
      }
    }

    if (!state) {
      clearRaidReturnTimer();
      if (currentChannelUrl && !raidDestination) rememberLastChannel(currentChannelUrl);
    }
    return false;
  }

  function visibleElement(element) {
    return !!(element && element.isConnected && element.getClientRects().length);
  }

  function resetOfflineStatus(login) {
    if (login === offlineStatusLogin) return;
    offlineStatusLogin = login;
    offlineStatus = null;
    offlineStatusRequest = null;
    offlineStatusCheckedAt = 0;
  }

  function requestOfflineStatus(login) {
    resetOfflineStatus(login);
    if (!login || offlineStatus !== null || offlineStatusRequest || Date.now() - offlineStatusCheckedAt < 60000) return;
    offlineStatusCheckedAt = Date.now();
    const query = 'query{user(login:"' + login + '"){stream{id}}}';
    offlineStatusRequest = fetchWithTimeout('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: { 'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko', 'Content-Type': 'text/plain' },
      body: JSON.stringify({ query }),
    }, NETWORK_TIMEOUT_MS).then((response) => {
      if (!response.ok) throw new Error('Twitch channel status request failed');
      return response.json();
    }).then((payload) => {
      const user = payload && payload.data && payload.data.user;
      if (offlineStatusLogin === login) offlineStatus = user ? !user.stream : false;
    }).catch(() => {
      if (offlineStatusLogin === login) offlineStatus = null;
    }).finally(() => {
      if (offlineStatusLogin === login) offlineStatusRequest = null;
      syncOfflineRefresh();
    });
  }

  function twitchShowsChannelOffline(login) {
    if (!login) return false;
    const marker = Array.from(document.querySelectorAll(OFFLINE_CHANNEL_SELECTORS)).find(visibleElement);
    return !!marker || (offlineStatusLogin === login && offlineStatus === true);
  }

  function clearOfflineRefresh() {
    if (offlineRefreshTimer) clearTimeout(offlineRefreshTimer);
    offlineRefreshTimer = null;
    offlineRefreshRoute = '';
    offlineRefreshMinutesScheduled = 0;
  }

  function syncOfflineRefresh() {
    const minutes = CONFIG.offlineRefreshMinutes;
    const login = channelLoginFromUrl(location.href);
    const route = normalizedChannelUrl(location.href);
    if (!minutes || !login || isRaidDestinationUrl(location.href) || readRaidReturnState()) {
      clearOfflineRefresh();
      resetOfflineStatus('');
      return;
    }
    requestOfflineStatus(login);
    if (!twitchShowsChannelOffline(login)) {
      clearOfflineRefresh();
      return;
    }
    if (offlineRefreshTimer && offlineRefreshRoute === route && offlineRefreshMinutesScheduled === minutes) return;
    clearOfflineRefresh();
    offlineRefreshRoute = route;
    offlineRefreshMinutesScheduled = minutes;
    offlineRefreshTimer = setTimeout(() => {
      offlineRefreshTimer = null;
      if (CONFIG.offlineRefreshMinutes && normalizedChannelUrl(location.href) === route && twitchShowsChannelOffline(login)) {
        location.reload();
      } else {
        syncOfflineRefresh();
      }
    }, minutes * 60 * 1000);
  }

  function syncNavigationFeatures() {
    if (syncRaidReturn()) return true;
    syncOfflineRefresh();
    return false;
  }

  syncRaidReturn();

  function chatWidth() { return CONFIG.chatWidthPx + 'px'; }

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
    if (typeof AbortController !== 'function') {
      return fetch(url, options || undefined);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs || NETWORK_TIMEOUT_MS);
    try {
      return await fetch(url, Object.assign({}, options || {}, { signal: controller.signal }));
    } finally {
      clearTimeout(timer);
    }
  }

  function writeClipboardText(text) {
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
      return Promise.reject(new Error('Clipboard API unavailable'));
    }
    try {
      return Promise.resolve(navigator.clipboard.writeText(String(text || '')));
    } catch (error) {
      return Promise.reject(error);
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

  function hook(ws) {
    const origAdd = ws.addEventListener.bind(ws);
    const origRemove = ws.removeEventListener.bind(ws);
    const eventCache = new WeakMap();
    const listenerWrappers = new WeakMap();

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
  const MAX_MENTIONS = 50;
  const MAX_USER_PROFILES = 1000;
  const MAX_PROFILE_EMOTES = 100;
  const MAX_DASHBOARD_EMOTES = 1000;
  const MAX_DELETE_TASKS = 500;
  const CHAT_HYDRATION_SWEEPS = 6;
  const NETWORK_TIMEOUT_MS = 15000;
  const MOD_BADGE_UUIDS = new Set([
    '3267646d-33f0-4b17-b3df-f923a41db1d0',
    '0822047b-65e0-46f2-94a9-d1091d685d33',
  ]);
  const VIP_BADGE_UUIDS = new Set(['b817aba4-fad8-49e2-b88a-7cc744dfa6ec']);
  const MOD_BADGE_NAMES = new Set([
    'moderator', 'lead_moderator', 'lead-moderator', 'global_mod', 'admin', 'staff',
  ]);
  const VIP_BADGE_NAMES = new Set(['vip']);
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
  let chatSearchCurrent = null;
  const indexedChatLines = new Set();
  let lineSearchIndex = new WeakMap();

  function emoteUrl(id) { return 'https://static-cdn.jtvnw.net/emoticons/v2/' + id + '/default/dark/2.0'; }
  function chatterColor(value) { return COLOR_RE.test(value || '') ? value : 'var(--bt-accent,#e31337)'; }

  function badgeListHasRole(value, roleNames) {
    return String(value || '').split(',').some((badge) => {
      const slash = badge.indexOf('/');
      const name = (slash === -1 ? badge : badge.slice(0, slash)).trim().toLowerCase();
      return roleNames.has(name);
    });
  }

  function tagsIdentifyModerator(tags) {
    return tags.mod === '1' || badgeListHasRole(tags.badges, MOD_BADGE_NAMES);
  }

  function tagsIdentifyVip(tags) {
    return badgeListHasRole(tags.badges, VIP_BADGE_NAMES);
  }

  function descriptionHasBadgeRole(value, badgeUuids, roleNames) {
    const description = String(value || '').toLowerCase();
    for (const uuid of badgeUuids) if (description.includes(uuid)) return true;
    for (const name of roleNames) if (description.includes(name)) return true;
    return false;
  }

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
        login: record.login, user: record.user, color: record.color,
        messages: 0, mentions: 0, emotes: new Map(), badges: tags.badges || '',
        moderator: tagsIdentifyModerator(tags), vip: tagsIdentifyVip(tags),
      };
      userProfiles.set(record.login, profile);
    }
    profile.user = record.user || profile.user;
    profile.color = record.color || profile.color;
    profile.badges = tags.badges || '';
    profile.moderator = tagsIdentifyModerator(tags);
    profile.vip = tagsIdentifyVip(tags);
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
      const contextChanged = addContextAfter(record);
      const contextCount = CONFIG.mentionContextMessages;
      const before = contextCount ? chatHistory.slice(-contextCount) : [];
      chatHistory.push(record);
      if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.splice(0, chatHistory.length - MAX_CHAT_HISTORY);
      rememberMessageMeta({
        id: record.id,
        login,
        text,
        moderator: tagsIdentifyModerator(tags),
        vip: tagsIdentifyVip(tags),
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
        while (mentions.length > MAX_MENTIONS) mentions.shift();
        if (!inboxOpen) mentionUnread = Math.min(mentionUnread + 1, MAX_MENTIONS);
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
      '" preserveAspectRatio="none" aria-hidden="true">' +
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
      const getSlot = weakElementGetter(slot);
      fetchAvatar(login).then((url) => {
        const currentSlot = getSlot();
        if (!url || !currentSlot || !currentSlot.isConnected || currentSlot.dataset.btDashAvatar !== login) return;
        const img = document.createElement('img');
        img.src = url;
        img.alt = '';
        img.loading = 'lazy';
        currentSlot.textContent = '';
        currentSlot.appendChild(img);
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
    const previousBody = dashboard.querySelector(':scope > .bt-body');
    const previousScrollTop = previousBody ? previousBody.scrollTop : 0;
    const now = Date.now();
    const currentMpm = messagesPerMinute(now);
    const topChatters = [...dashboardStats.chatters.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, DASHBOARD_TOP_CHATTERS);
    const topEmotes = [...dashboardStats.emotes.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 6);
    const idle = dashboardStats.totalMessages === 0;
    const offline = idle && twitchShowsChannelOffline(channelLoginFromUrl(location.href));
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
      '<div class="bt-pop-head bt-panel-header">' +
      uiIcon('dashboard', 'bt-header-icon') +
      '<span class="bt-pop-title">' + t('dashTitle') +
      '</span>' + (!idle ? '<span class="bt-dash-live"><i></i>' + t('dashLive') + '</span>' : '') + '</div>' +
      (idle ? '<div class="bt-dash-empty bt-state ' + (offline ? 'bt-state-offline' : 'bt-state-empty') + '"><span class="bt-dash-empty-icon" aria-hidden="true">▥</span><b>' +
        t(offline ? 'dashOffline' : 'dashEmpty') + '</b><span>' + t(offline ? 'dashOfflineHint' : 'dashEmptyHint') + '</span></div>' :
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
    const body = structurePopup(dashboard);
    if (body) body.scrollTop = previousScrollTop;
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
        if (!mention || !jumpToMessage(mention)) {
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

  function jumpToMessage(mention) {
    if (!mention) return false;
    const lines = Array.from(document.querySelectorAll('.chat-line__message'));
    let line = mention.id ? lines.find((el) => lineMessageId(el) === mention.id) : null;
    if (!line && mention.id) {
      line = lines.find((el) => {
        const meta = lineMeta.get(el);
        return !!(meta && meta.id === mention.id);
      });
    }
    if (!line) {
      const login = String(mention.login || '').toLowerCase();
      const text = String(mention.text || '').replace(/\s+/g, ' ').trim();
      for (let i = lines.length - 1; i >= 0; i--) {
        const candidate = lines[i];
        if (login && lineLogin(candidate) !== login) continue;
        if (lineCopyText(candidate).replace(/\s+/g, ' ').trim() !== text) continue;
        line = candidate;
        break;
      }
    }
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
    p.innerHTML = '<div class="bt-pop-head bt-panel-header">' +
      uiIcon('mentions', 'bt-header-icon') +
      '<span class="bt-pop-title">' + t('inboxTitle') +
      '</span><span class="bt-inbox-total" title="' + esc(t('inboxTitle')) + '">' + dashboardNumber(mentions.length) +
      '</span></div>' +
      '<input class="bt-inbox-search" type="search" value="' + esc(inboxQuery) + '" placeholder="' +
      esc(t('inboxSearch')) + '" aria-label="' + esc(t('inboxSearch')) + '">' +
      (inboxNotice ? '<div class="bt-inbox-notice">' + esc(inboxNotice) + '</div>' : '') +
      (rows || '<div class="bt-pop-empty bt-state bt-state-empty">' + t('inboxEmpty') + '</div>');
    structurePopup(p);
    filterInboxRows();
  }

  function updateInboxBadge() {
    const btn = document.getElementById('bt-inbox-btn');
    if (!btn) return;
    let b = btn.querySelector('.bt-badge');
    if (mentionUnread > 0) {
      if (!b) { b = document.createElement('span'); b.className = 'bt-badge'; btn.appendChild(b); }
      b.textContent = mentionUnread;
    } else if (b) { b.remove(); }
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
    const getSlot = weakElementGetter(slot);
    fetchAvatar(login).then((url) => {
      const currentSlot = getSlot();
      if (!url || !currentSlot || !currentSlot.isConnected || currentSlot.dataset.btHoverAvatar !== login) return;
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      img.loading = 'lazy';
      currentSlot.textContent = '';
      currentSlot.appendChild(img);
    });
  }

  function positionViewerHovercard(anchor, pointerEvent) {
    if (!hovercard || !anchor) return;
    const margin = 8, gap = 6;
    const anchorRect = anchor.getBoundingClientRect();
    const pointerX = pointerEvent && Number.isFinite(pointerEvent.clientX) && pointerEvent.clientX > 0
      ? pointerEvent.clientX : null;
    const pointerY = pointerEvent && Number.isFinite(pointerEvent.clientY) && pointerEvent.clientY > 0
      ? pointerEvent.clientY : null;
    const cardRect = hovercard.getBoundingClientRect();
    const cardWidth = hovercard.offsetWidth || cardRect.width;
    const cardHeight = hovercard.offsetHeight || cardRect.height;
    const maxLeft = Math.max(margin, window.innerWidth - cardWidth - margin);
    const desiredLeft = pointerX === null ? anchorRect.left : pointerX - 16;
    const left = Math.max(margin, Math.min(desiredLeft, maxLeft));
    const anchorTop = anchorRect.height > 0 ? anchorRect.top : (pointerY === null ? margin : pointerY);
    const anchorBottom = anchorRect.height > 0 ? anchorRect.bottom : anchorTop;
    const below = anchorBottom + gap;
    const above = anchorTop - gap - cardHeight;
    const desiredTop = below + cardHeight <= window.innerHeight - margin || above < margin ? below : above;
    const maxTop = Math.max(margin, window.innerHeight - cardHeight - margin);
    const top = Math.max(margin, Math.min(desiredTop, maxTop));
    hovercard.style.left = Math.round(left) + 'px';
    hovercard.style.top = Math.round(top) + 'px';
  }

  function showViewerHovercard(line, anchor, pointerEvent) {
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
    hovercard.innerHTML = '<div class="bt-panel-header">' + viewerHovercardAvatar(login, profile.user) +
      '<div class="bt-hover-name" style="color:' + esc(chatterColor(profile.color)) + '">' + esc(profile.user) + '</div></div>' +
      '<div class="bt-body"><div class="bt-hover-grid"><span><b>' + profile.messages + '</b>' + t('hoverMessages') + '</span>' +
      '<span><b>' + profile.mentions + '</b>' + t('hoverMentions') + '</span></div>' +
      (top ? '<div class="bt-hover-emote"><small>' + t('hoverTopEmote') + '</small><img src="' + emoteUrl(top[0]) + '" alt=""><span>' + esc(top[1].name) + ' ×' + top[1].count + '</span></div>' : '') + '</div>';
    hydrateViewerHovercardAvatar(hovercard, login);
    hovercard.classList.add('bt-open');
    positionViewerHovercard(anchor, pointerEvent);
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
      out.classList.add('bt-trans-error', 'bt-state-error');
      out.classList.remove('bt-state-loading');
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
    out.classList.remove('bt-trans-error', 'bt-state-error', 'bt-state-loading');
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
      writeClipboardText(result.text).then(() => {
        copy.textContent = t('translationCopied');
        setTimeout(() => { if (copy.isConnected) copy.textContent = normalLabel; }, 1200);
      }).catch(() => {});
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
    out.classList.remove('bt-trans-error', 'bt-state-error');
    out.classList.add('bt-state-loading');
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

  let composerInput = null;
  let characterCounterEl = null;
  let characterCounterFrame = null;
  let pendingCounterInput = null;
  let composerDocumentEventsBound = false;
  let observedComposerInput = null, composerObserver = null;

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
          syncComposerObserver(current);
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
        syncComposerObserver(input);
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

  function ensureComposerTools() {
    bindComposerDocumentEvents();
    const input = findComposerInput();
    composerInput = input;
    if (!input) {
      syncComposerObserver(null);
      removeCharacterCounter();
      return;
    }
    syncComposerObserver(input);
    ensureCharacterCounter(input);
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
        uiIcon('dashboard', 'bt-footer-icon'),
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
        uiIcon('mentions', 'bt-footer-icon'),
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
            const scroller = p.querySelector('.bt-body') || p;
            scroller.scrollTop = scroller.scrollHeight;
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
        uiIcon('chatTools', 'bt-footer-icon'),
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
    const attrs = ['data-bt-message-id', 'data-message-id', 'data-a-message-id', 'data-id'];
    for (const attr of attrs) {
      const value = el.getAttribute && el.getAttribute(attr);
      if (value) return value;
    }
    const nested = el.querySelector && el.querySelector(
      '[data-a-target="chat-line-message"][data-bt-message-id], ' +
      '[data-a-target="chat-line-message"][data-message-id], ' +
      '[data-a-target="chat-line-message"][data-a-message-id], ' +
      '[data-a-target="chat-line-message"][data-id]'
    );
    if (!nested) return '';
    return nested.getAttribute('data-bt-message-id') || nested.getAttribute('data-message-id') ||
      nested.getAttribute('data-a-message-id') || nested.getAttribute('data-id') || '';
  }

  function clearSpamLineVisuals(line) {
    if (!line) return;
    line.classList.remove('bt-spam-root', 'bt-spam-duplicate', 'bt-spam-show');
    const button = line.querySelector('.bt-spam-toggle');
    if (button) button.remove();
  }

  function clearSpamGroupVisuals(group) {
    if (!group) return;
    const lines = new Set(group.lines || []);
    if (group.root) lines.add(group.root);
    lines.forEach(clearSpamLineVisuals);
    group.button = null;
  }

  function reconcileSpamGroup(group) {
    if (!group) return false;
    group.lines = group.lines.filter((line) => line.isConnected);
    if (!group.lines.length) {
      group.root = null;
      group.button = null;
      return false;
    }
    if (!group.root || !group.root.isConnected || !group.lines.includes(group.root)) {
      clearSpamGroupVisuals(group);
      group.root = group.lines[0];
    }
    if (group.button && (!group.button.isConnected || !group.root.contains(group.button))) {
      if (group.button.isConnected) group.button.remove();
      group.button = null;
    }
    return true;
  }

  function updateSpamGroup(group) {
    if (!reconcileSpamGroup(group)) return false;
    const count = group.lines.length;
    if (count < SPAM_MIN_MATCHES) {
      clearSpamGroupVisuals(group);
      return true;
    }
    group.root.classList.remove('bt-spam-duplicate', 'bt-spam-show');
    group.root.classList.add('bt-spam-root');
    group.lines.slice(1).forEach((line) => {
      if (!line.isConnected) return;
      line.classList.remove('bt-spam-root');
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
    return true;
  }

  function discardSpamGroup(signature) {
    const group = spamGroupsBySignature.get(signature);
    if (group) clearSpamGroupVisuals(group);
    spamGroupsBySignature.delete(signature);
  }

  function resetSpamCompression() {
    spamGroupsBySignature.forEach(clearSpamGroupVisuals);
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
      if (!updateSpamGroup(group)) spamGroupsBySignature.delete(signature);
    }
  }

  function applySpamCompression(el) {
    if (!CONFIG.spamCompression || el.dataset.btSpamProcessed) return;
    pruneSpamGroups();
    el.dataset.btSpamProcessed = '1';
    const meta = metadataForLine(el);
    const messageText = meta && meta.record ? meta.record.text : lineCopyText(el);
    const normalized = String(messageText || '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (normalized.length < 3) return;
    const timestamp = meta && meta.record ? meta.record.t : Date.now();
    let group = spamGroupsBySignature.get(normalized);
    if (group && !reconcileSpamGroup(group)) {
      spamGroupsBySignature.delete(normalized);
      group = null;
    }
    if (!group || timestamp - group.lastAt > SPAM_WINDOW_MS) {
      if (group) clearSpamGroupVisuals(group);
      group = { root: el, lines: [el], firstAt: timestamp, lastAt: timestamp, expanded: false, button: null };
      spamGroupsBySignature.set(normalized, group);
      if (spamGroupsBySignature.size > 120) discardSpamGroup(spamGroupsBySignature.keys().next().value);
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
    const index = lineSearchIndex.get(el) || indexChatLine(el);
    return index.login.includes(usernameNeedle) || index.displayName.includes(usernameNeedle) || index.message.includes(needle);
  }

  function indexChatLine(el) {
    const index = {
      login: lineLogin(el),
      displayName: lineDisplayName(el),
      message: lineCopyText(el).toLowerCase(),
    };
    indexedChatLines.add(el);
    lineSearchIndex.set(el, index);
    return index;
  }

  function currentChatLines() {
    const lines = [];
    indexedChatLines.forEach((line) => {
      if (line.isConnected) lines.push(line);
      else indexedChatLines.delete(line);
    });
    return lines;
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
    if (chatSearchCurrent && chatSearchCurrent.isConnected) chatSearchCurrent.classList.remove('bt-search-current');
    const current = chatSearchMatches[chatSearchIndex];
    chatSearchCurrent = current || null;
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
    const lines = currentChatLines();
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
    updateChatControlHeaderState();
  }

  function updateChatControlHeaderState() {
    const status = chatControlPanel && chatControlPanel.querySelector('.bt-header-status');
    if (!status) return;
    const count = (CONFIG.quickChatFilters && activeChatFilter !== 'all' ? 1 : 0) +
      (CONFIG.liveChatSearch && !!chatSearchQuery ? 1 : 0);
    status.hidden = !count;
    status.textContent = count ? tf('activeTools', { count }) : '';
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
        currentChatLines().forEach(applyChatFilterToLine);
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
    controls.innerHTML = '<div class="bt-pop-head bt-panel-header">' +
      uiIcon('chatTools', 'bt-header-icon') +
      '<span class="bt-pop-title">' +
      esc(t('chatControlTitle')) + '</span><span class="bt-header-status" hidden></span></div>';
    const body = document.createElement('div');
    body.className = 'bt-chat-control-body bt-body';
    if (CONFIG.quickChatFilters) appendChatFilterControls(body);
    if (CONFIG.liveChatSearch) appendChatSearchControls(body);
    controls.appendChild(body);
    structurePopup(controls);
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
    if (meta.id && id !== meta.id) el.setAttribute('data-bt-message-id', meta.id);
    return meta;
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

  function lineMentionsMe(el) {
    const me = getMyLogin();
    if (!me || lineLogin(el) === me) return false;
    return isMention(lineCopyText(el), me);
  }

  function lineHasBadge(el, badgeUuids, roleNames) {
    const badgeRoots = el.querySelectorAll(
      '.chat-badge, [data-a-target="chat-badge"], [data-test-selector*="badge" i], [class*="chat-badge"]'
    );
    for (const root of badgeRoots) {
      const candidates = [root, ...root.querySelectorAll('img, [alt], [aria-label], [title], [data-badge], [data-badge-type]')];
      for (const candidate of candidates) {
        const values = [
          candidate.getAttribute('src'),
          candidate.getAttribute('srcset'),
          candidate.getAttribute('alt'),
          candidate.getAttribute('aria-label'),
          candidate.getAttribute('title'),
          candidate.getAttribute('data-badge'),
          candidate.getAttribute('data-badge-type'),
          candidate.getAttribute('data-test-selector'),
        ];
        if (descriptionHasBadgeRole(values.filter(Boolean).join(' '), badgeUuids, roleNames)) {
          return true;
        }
      }
    }
    return false;
  }

  function lineHasMod(el) {
    const meta = metadataForLine(el);
    if (meta && meta.moderator) return true;
    if (lineHasBadge(el, MOD_BADGE_UUIDS, MOD_BADGE_NAMES)) return true;
    const profile = userProfiles.get(lineLogin(el));
    return !!(profile && profile.moderator);
  }

  function lineHasVip(el) {
    const meta = metadataForLine(el);
    if (meta && meta.vip) return true;
    if (lineHasBadge(el, VIP_BADGE_UUIDS, VIP_BADGE_NAMES)) return true;
    const profile = userProfiles.get(lineLogin(el));
    return !!(profile && profile.vip);
  }

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

  const AVATAR_BATCH = 50;
  const MAX_AVATAR_CACHE = 500;
  const MAX_AVATAR_PENDING = 250;
  const MAX_AVATAR_BATCH_REQUESTS = 2;
  const avatarCache = new Map();
  const avatarInflight = new Map();
  let avatarQueue = [];
  let avatarFlush = null;
  let avatarBatchRequests = 0;

  function weakElementGetter(element) {
    if (typeof WeakRef !== 'function') return () => element;
    const reference = new WeakRef(element);
    element = null;
    return () => reference.deref();
  }

  function scheduleAvatarFlush() {
    if (!avatarFlush && avatarQueue.length && avatarBatchRequests < MAX_AVATAR_BATCH_REQUESTS) {
      avatarFlush = setTimeout(flushAvatars, 80);
    }
  }

  function fetchAvatar(login) {
    if (avatarCache.has(login)) return Promise.resolve(avatarCache.get(login));
    const existing = avatarInflight.get(login);
    if (existing) return existing.promise;
    if (avatarInflight.size >= MAX_AVATAR_PENDING) return Promise.resolve(null);
    let resolve;
    const promise = new Promise((r) => { resolve = r; });
    avatarInflight.set(login, { promise, resolve });
    avatarQueue.push(login);
    scheduleAvatarFlush();
    return promise;
  }

  function settleAvatar(login, url) {
    if (avatarCache.size >= MAX_AVATAR_CACHE) avatarCache.delete(avatarCache.keys().next().value);
    avatarCache.set(login, url);
    const inf = avatarInflight.get(login);
    avatarInflight.delete(login);
    if (inf) inf.resolve(url);
  }

  function flushAvatars() {
    avatarFlush = null;
    if (avatarBatchRequests >= MAX_AVATAR_BATCH_REQUESTS) return;
    const batch = avatarQueue.splice(0, AVATAR_BATCH);
    if (!batch.length) return;
    avatarBatchRequests++;
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
    }).catch(() => {
      batch.forEach((login) => settleAvatar(login, null));
    }).finally(() => {
      avatarBatchRequests--;
      scheduleAvatarFlush();
    });
    scheduleAvatarFlush();
  }

  function clearLineAvatar(el) {
    const existing = el.querySelector('.bt-avatar');
    if (existing) existing.remove();
    delete el.dataset.btAvatarLogin;
    delete el.dataset.btAvatarState;
  }

  function insertLineAvatar(el, login, url) {
    if (!url || !el.isConnected || el.dataset.btAvatarLogin !== login || el.querySelector('.bt-avatar')) return;
    const img = document.createElement('img');
    img.className = 'bt-avatar';
    img.alt = '';
    img.loading = 'lazy';
    img.src = url;
    const name = el.querySelector('.chat-line__username-container')
      || el.querySelector('[data-a-target="chat-message-username"]')
      || el.querySelector('.chat-author__display-name');
    try {
      if (name && name.parentNode) name.parentNode.insertBefore(img, name);
      else el.insertBefore(img, el.firstChild);
      el.dataset.btAvatarState = 'ready';
    } catch (e) {
      el.dataset.btAvatarState = 'missing';
    }
  }

  function addAvatar(el) {
    if (!CONFIG.showAvatars) { clearLineAvatar(el); return; }
    const login = lineLogin(el);
    if (!LOGIN_RE.test(login)) { clearLineAvatar(el); return; }
    if (el.dataset.btAvatarLogin !== login) {
      clearLineAvatar(el);
      el.dataset.btAvatarLogin = login;
    }
    if (el.querySelector('.bt-avatar')) {
      el.dataset.btAvatarState = 'ready';
      return;
    }
    if (el.dataset.btAvatarState === 'pending' || el.dataset.btAvatarState === 'missing') return;
    if (avatarCache.has(login)) {
      const cached = avatarCache.get(login);
      if (cached) insertLineAvatar(el, login, cached);
      else el.dataset.btAvatarState = 'missing';
      return;
    }
    el.dataset.btAvatarState = 'pending';
    const getLine = weakElementGetter(el);
    fetchAvatar(login).then((url) => {
      const line = getLine();
      if (!line || line.dataset.btAvatarLogin !== login) return;
      if (!url) {
        line.dataset.btAvatarState = 'missing';
        return;
      }
      insertLineAvatar(line, login, url);
    });
  }

  function srgbToLin(x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }

  function relLum(r, g, b) { return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b); }

  function fixNameColor(el) {
    const nameEl = el.querySelector('.chat-author__display-name, [data-a-target="chat-message-username"]');
    if (!nameEl) return;
    const theme = document.documentElement.dataset.btTheme || 'dark';
    if (!CONFIG.fixNameColors) {
      if (nameEl.dataset.btColor === 'fixed') {
        const original = nameEl.dataset.btOriginalColor || '';
        const priority = nameEl.dataset.btOriginalColorPriority || '';
        if (original) nameEl.style.setProperty('color', original, priority);
        else nameEl.style.removeProperty('color');
      }
      if (nameEl.dataset.btColor) delete nameEl.dataset.btColor;
      delete nameEl.dataset.btColorTheme;
      delete nameEl.dataset.btOriginalColor;
      delete nameEl.dataset.btOriginalColorPriority;
      return;
    }
    if (nameEl.dataset.btColor && nameEl.dataset.btColorTheme === theme) return;
    if (nameEl.dataset.btColor === 'fixed') {
      const original = nameEl.dataset.btOriginalColor || '';
      const priority = nameEl.dataset.btOriginalColorPriority || '';
      if (original) nameEl.style.setProperty('color', original, priority);
      else nameEl.style.removeProperty('color');
    }
    delete nameEl.dataset.btColor;
    delete nameEl.dataset.btOriginalColor;
    delete nameEl.dataset.btOriginalColorPriority;
    const c = nameEl.style.color || getComputedStyle(nameEl).color;
    const m = c.match(/\d+(?:\.\d+)?/g);
    if (!m || m.length < 3) {
      nameEl.dataset.btColor = 'skip';
      nameEl.dataset.btColorTheme = theme;
      return;
    }
    let r = +m[0], g = +m[1], b = +m[2];
    const backgroundLuminance = theme === 'light' ? 1 : 0.01;
    const contrast = (luminance) =>
      (Math.max(luminance, backgroundLuminance) + 0.05) /
      (Math.min(luminance, backgroundLuminance) + 0.05);
    let L = relLum(r, g, b);
    if (contrast(L) >= 4.5) {
      nameEl.dataset.btColor = 'ok';
      nameEl.dataset.btColorTheme = theme;
      return;
    }
    let nr = r, ng = g, nb = b, f = 0;
    const target = theme === 'light' ? 0 : 255;
    while (contrast(L) < 4.5 && f < 1) {
      f += 0.08;
      nr = Math.round(r + (target - r) * f);
      ng = Math.round(g + (target - g) * f);
      nb = Math.round(b + (target - b) * f);
      L = relLum(nr, ng, nb);
    }
    nameEl.dataset.btOriginalColor = nameEl.style.getPropertyValue('color') || '';
    nameEl.dataset.btOriginalColorPriority = nameEl.style.getPropertyPriority('color') || '';
    nameEl.style.setProperty('color', 'rgb(' + nr + ',' + ng + ',' + nb + ')', 'important');
    nameEl.dataset.btColor = 'fixed';
    nameEl.dataset.btColorTheme = theme;
  }

  const MESSAGE_ACTION_ICONS = {
    reply: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7 4 12l5 5v-3h4c3.5 0 5.8 1.2 7 4-.2-6-3.2-9-7-9H9V7Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8M10 3v6l-3 3v3h10v-3l-3-3V3M12 15v6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1"/></svg>',
    translate: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  };

  function setMessageAction(bar, action, enabled, title, icon) {
    let button = bar.querySelector('[data-bt-message-action="' + action + '"]');
    if (!enabled) { if (button) button.remove(); return null; }
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'bt-action-btn bt-action-' + action;
      if (action === 'copy') button.classList.add('bt-copy');
      if (action === 'translate') button.classList.add('bt-translate');
      button.dataset.btMessageAction = action;
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

  function findNativePinButton(line) {
    const button = line.querySelector(
      '.chat-line__pin-icon button, .chat-line__pin-icon [role="button"]'
    );
    if (!button || button.disabled || button.getAttribute('aria-disabled') === 'true') return null;
    return button;
  }

  function triggerMessagePin(line) {
    const nativeButton = findNativePinButton(line);
    if (!nativeButton) {
      ensureMessageActionBar(line);
      return;
    }
    nativeButton.click();
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
      el.appendChild(bar);
    }
    el.classList.add('bt-actions-ready');
    bar.setAttribute('aria-label', t('messageActions'));
    setMessageAction(bar, 'reply', true, t('replyMessageAction'), MESSAGE_ACTION_ICONS.reply);
    const nativePinButton = findNativePinButton(el);
    el.classList.toggle('bt-pin-action-ready', !!nativePinButton);
    setMessageAction(bar, 'pin', !!nativePinButton, t('pinMessageAction'), MESSAGE_ACTION_ICONS.pin);
    setMessageAction(bar, 'copy', CONFIG.copyButton, t('copyMessage'), MESSAGE_ACTION_ICONS.copy);
    setMessageAction(bar, 'translate', CONFIG.inlineTranslate, t('translateMessageAction'), MESSAGE_ACTION_ICONS.translate);
  }

  function addViewerHovercard(el) {
    const anchor = el.querySelector('[data-a-target="chat-message-username"], .chat-author__display-name');
    if (!anchor || anchor.dataset.btHovercard) return;
    anchor.dataset.btHovercard = '1';
  }

  function handleDelegatedChatClick(event) {
    const button = event.target.closest && event.target.closest('[data-bt-message-action]');
    if (!button) return;
    const line = button.closest('.chat-line__message');
    if (!line) return;
    event.preventDefault();
    event.stopPropagation();
    const action = button.dataset.btMessageAction;
    if (action === 'reply') triggerMessageReply(line);
    else if (action === 'pin') triggerMessagePin(line);
    else if (action === 'copy') writeClipboardText(lineCopyText(line)).catch(() => {});
    else if (action === 'translate') {
      const existing = line.querySelector('.bt-trans');
      if (existing) existing.remove(); else translateLine(line);
    }
  }

  function handleDelegatedChatPointer(event) {
    const anchor = event.target.closest && event.target.closest('[data-bt-hovercard="1"]');
    if (event.type === 'mouseover' && anchor && (!event.relatedTarget || !anchor.contains(event.relatedTarget))) {
      const line = anchor.closest('.chat-line__message');
      if (line) showViewerHovercard(line, anchor, event);
    }
    const bar = event.target.closest && event.target.closest('.bt-message-actions');
    if (bar && event.type === 'mouseout' && (!event.relatedTarget || !bar.contains(event.relatedTarget))) {
      const focusedAction = bar.querySelector('.bt-action-btn:focus');
      if (focusedAction) focusedAction.blur();
    }
  }

  function installDelegatedChatEvents(container) {
    if (!container || container.dataset.btDelegatedEvents) return;
    container.dataset.btDelegatedEvents = '1';
    container.addEventListener('click', handleDelegatedChatClick);
    container.addEventListener('mouseover', handleDelegatedChatPointer);
    container.addEventListener('mouseout', (event) => {
      handleDelegatedChatPointer(event);
      const anchor = event.target.closest && event.target.closest('[data-bt-hovercard="1"]');
      if (anchor && (!event.relatedTarget || !anchor.contains(event.relatedTarget))) hideViewerHovercard();
    });
  }

  function processLine(el, isNew) {
    try {
      indexChatLine(el);
      el.classList.toggle('bt-mention', CONFIG.mentionHighlight && lineMentionsMe(el));
      el.classList.toggle('bt-mod', CONFIG.highlightMods && lineHasMod(el));
      el.classList.toggle('bt-vip', CONFIG.highlightVips && lineHasVip(el));
      el.classList.toggle('bt-hidden', shouldHide(el));
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

  const pendingChatLines = new Map();
  let chatProcessFrame = null;

  function scheduleChatProcessing() {
    if (chatProcessFrame) return;
    const schedule = window.requestAnimationFrame || ((callback) => setTimeout(() => callback(Date.now()), 16));
    chatProcessFrame = schedule(flushChatProcessing);
  }

  function queueChatLines(lines, isNew) {
    for (const line of lines || []) {
      if (!line || !line.classList || !line.classList.contains('chat-line__message')) continue;
      pendingChatLines.set(line, !!isNew || pendingChatLines.get(line) === true);
    }
    if (pendingChatLines.size) scheduleChatProcessing();
  }

  function flushChatProcessing() {
    chatProcessFrame = null;
    const started = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
    let processed = 0;
    if (chatObserver) chatObserver.disconnect();
    try {
      for (const [line, isNew] of pendingChatLines) {
        pendingChatLines.delete(line);
        if (line.isConnected) processLine(line, isNew);
        processed++;
        const now = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
        if (processed >= 40 || now - started >= 7) break;
      }
    } finally {
      if (observedChat) observeChatContainer(observedChat);
    }
    if (pendingChatLines.size) scheduleChatProcessing();
  }

  function syncAll() {
    botCache = null;
    queueChatLines(document.querySelectorAll('.chat-line__message'), false);
  }

  let chatObserver = null, observedChat = null, sweepTimer = null;

  function observeChatContainer(container) {
    if (chatObserver && container && container.isConnected && observedChat === container) {
      chatObserver.observe(container, { childList: true, subtree: true });
    }
  }

  function pruneDisconnectedChatState() {
    for (const [signature, group] of spamGroupsBySignature) {
      if (!updateSpamGroup(group)) {
        spamGroupsBySignature.delete(signature);
      }
    }
    if (chatSearchMatches.length) {
      chatSearchMatches = chatSearchMatches.filter((line) => line.isConnected);
      if (!chatSearchMatches.length) chatSearchIndex = -1;
      else chatSearchIndex = Math.min(Math.max(0, chatSearchIndex), chatSearchMatches.length - 1);
    }
  }

  function disconnectChatObserver() {
    if (chatObserver) chatObserver.disconnect();
    chatObserver = null;
    observedChat = null;
    if (chatProcessFrame) {
      try { cancelAnimationFrame(chatProcessFrame); } catch (e) { clearTimeout(chatProcessFrame); }
      chatProcessFrame = null;
    }
    pendingChatLines.clear();
    if (sweepTimer) clearInterval(sweepTimer);
    sweepTimer = null;
    indexedChatLines.clear();
    lineSearchIndex = new WeakMap();
    chatSearchCurrent = null;
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
    installDelegatedChatEvents(container);
    chatObserver = new MutationObserver((muts) => {
      const lines = new Set();
      let contentRemoved = false;
      for (const m of muts) {
        const changedLine = m.target.closest && m.target.closest('.chat-line__message');
        if (changedLine) lines.add(changedLine);
        if (m.removedNodes.length) contentRemoved = true;
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches('.chat-line__message')) lines.add(node);
          const parentLine = node.closest && node.closest('.chat-line__message');
          if (parentLine) lines.add(parentLine);
          if (node.querySelectorAll) node.querySelectorAll('.chat-line__message').forEach((line) => lines.add(line));
        }
      }
      // BetterTwitch adds controls inside chat rows. Process while disconnected so
      // those additions cannot recursively invoke this observer.
      chatObserver.disconnect();
      try {
        queueChatLines(lines, true);
        if (contentRemoved) pruneDisconnectedChatState();
      } finally {
        observeChatContainer(container);
      }
      if (chatSearchQuery && (lines.size || contentRemoved)) scheduleChatSearch();
    });
    observedChat = container;
    syncAll();
    observeChatContainer(container);
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
      :root {
        --bt-popup-radius: 5px;
        --bt-font: Inter, Roobert, "Helvetica Neue", Arial, sans-serif;
        --bt-bg: #101216;
        --bt-surface-0: #15181e;
        --bt-surface-1: #1b1f27;
        --bt-surface-2: #232832;
        --bt-surface-3: #2b313d;
        --bt-line: #303744;
        --bt-line-strong: #424b5b;
        --bt-text: #f5f7fa;
        --bt-text-soft: #c8ced8;
        --bt-muted: #8f98a8;
        --bt-danger: #ef5b67;
        --bt-warning: #e7a84b;
        --bt-success: #45b97c;
        --bt-accent: #e31337;
        --bt-setting-font-size: 12px;
      }

      html[data-bt-theme="light"] {
        --bt-bg: #f3f5f8;
        --bt-surface-0: #ffffff;
        --bt-surface-1: #f8f9fb;
        --bt-surface-2: #eef1f5;
        --bt-surface-3: #e5e9ef;
        --bt-line: #d9dee7;
        --bt-line-strong: #bcc4d0;
        --bt-text: #171a21;
        --bt-text-soft: #454c59;
        --bt-muted: #707a89;
        --bt-danger: #c83f4d;
        --bt-warning: #a86612;
        --bt-success: #22895a;
      }

      .chat-line__username-container:hover { background-color: transparent !important; }
      .toggle-visibility__right-column, .toggle-visibility__right-column--expanded { transition: none !important; }

      .chat-line__message {
        position: relative;
        border-inline-start: 3px solid transparent;
        transition: background-color .14s ease, border-color .14s ease;
      }
      .chat-line__message.bt-deleted [data-a-target="chat-message-text"],
      .chat-line__message.bt-deleted .text-fragment {
        color: var(--bt-muted) !important;
        text-decoration: line-through;
        text-decoration-thickness: 1px;
      }
      .chat-line__message.bt-deleted .bt-trash {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-inline-start: 6px;
        vertical-align: -2px;
        background: no-repeat center / contain
          url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ef5b67' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5'/></svg>");
      }
      .chat-line__message.bt-mod {
        border-inline-start-color: var(--bt-mod, #00ad03);
        background-color: color-mix(in srgb, var(--bt-mod, #00ad03) 9%, transparent) !important;
      }
      .chat-line__message.bt-vip {
        border-inline-start-color: var(--bt-vip, #e005b9);
        background-color: color-mix(in srgb, var(--bt-vip, #e005b9) 9%, transparent) !important;
      }
      .chat-line__message.bt-mention {
        border-inline-start-color: var(--bt-mention, #e31337);
        background-color: color-mix(in srgb, var(--bt-mention, #e31337) 11%, transparent) !important;
      }
      .chat-line__message.bt-focus-pulse {
        outline: 2px solid transparent;
        outline-offset: -2px;
        animation: bt-attention 1.8s ease-out;
      }
      @keyframes bt-attention {
        0%, 32% {
          outline-color: var(--bt-accent);
          background-color: color-mix(in srgb, var(--bt-accent) 18%, transparent);
        }
        100% { outline-color: transparent; }
      }

      .chat-line__message.bt-actions-ready .chat-line__reply-icon,
      .chat-line__message.bt-pin-action-ready .chat-line__pin-icon { display: none !important; }
      .chat-line__message .bt-message-actions {
        position: absolute;
        z-index: 6;
        top: 3px;
        right: 6px;
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 3px;
        border: 1px solid var(--bt-line-strong);
        border-radius: 10px;
        background: var(--bt-surface-1);
        color: var(--bt-text-soft);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-2px);
        transition: opacity .12s ease, transform .12s ease, visibility .12s;
      }
      .chat-line__message:hover .bt-message-actions,
      .chat-line__message .bt-message-actions:focus-within {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: none;
      }
      .chat-line__message .bt-action-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        margin: 0;
        padding: 6px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: var(--bt-text-soft);
        cursor: pointer;
        transition: background-color .12s ease, color .12s ease;
      }
      .chat-line__message .bt-action-btn:hover {
        background: var(--bt-surface-3);
        color: var(--bt-text);
      }
      .chat-line__message .bt-action-btn:focus-visible {
        outline: 2px solid var(--bt-accent);
        outline-offset: -2px;
        background: var(--bt-surface-3);
        color: var(--bt-text);
      }
      .chat-line__message .bt-action-btn svg {
        width: 16px;
        height: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.9;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: none;
      }
      .chat-line__message .bt-action-btn::after {
        content: attr(data-bt-tooltip);
        position: absolute;
        z-index: 10;
        top: calc(100% + 8px);
        right: 0;
        width: max-content;
        max-width: 220px;
        padding: 7px 9px;
        border: 1px solid var(--bt-line-strong);
        border-radius: 7px;
        background: var(--bt-surface-0);
        color: var(--bt-text);
        font: 600 11px/1.35 var(--bt-font);
        white-space: normal;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-3px);
        transition: opacity .1s ease, transform .1s ease, visibility .1s;
      }
      .chat-line__message .bt-action-btn:hover::after,
      .chat-line__message .bt-action-btn:focus-visible::after {
        opacity: 1;
        visibility: visible;
        transform: none;
        transition-delay: .25s;
      }
      @media (hover: none) {
        .chat-line__message .bt-message-actions {
          opacity: .92;
          visibility: visible;
          pointer-events: auto;
          transform: none;
        }
      }

      .chat-line__message.bt-hidden,
      html.bt-hide-badges .chat-line__message img.chat-badge,
      html.bt-hide-badges .chat-line__message [data-a-target="chat-badge"],
      html.bt-hide-leaderboard .bt-top-users-hidden,
      html.bt-hide-community-highlights .bt-community-highlights-hidden {
        display: none !important;
      }
      html.bt-separators .chat-line__message { border-bottom: 1px solid var(--bt-line) !important; }

      .bt-avatar {
        width: 22px;
        height: 22px;
        margin: 0 7px 0 1px;
        border: 1px solid var(--bt-line-strong);
        border-radius: 7px;
        object-fit: cover;
        vertical-align: middle;
      }
      .bt-spam-toggle {
        margin-inline-start: 7px;
        padding: 2px 8px;
        border: 1px solid var(--bt-line-strong);
        border-radius: 6px;
        background: var(--bt-surface-2);
        color: var(--bt-text-soft);
        font: 700 10px/1.5 var(--bt-font);
        cursor: pointer;
        transition: border-color .12s ease, background-color .12s ease, color .12s ease;
      }
      .bt-spam-toggle:hover {
        border-color: var(--bt-accent);
        background: color-mix(in srgb, var(--bt-accent) 12%, var(--bt-surface-2));
        color: var(--bt-text);
      }
      .bt-spam-toggle:focus-visible {
        outline: 2px solid var(--bt-accent);
        outline-offset: 2px;
      }
      .chat-line__message.bt-spam-duplicate:not(.bt-spam-show),
      .chat-line__message.bt-filter-hidden,
      .chat-line__message.bt-search-hidden { display: none !important; }
      .chat-line__message.bt-spam-show { opacity: .68; }
      .chat-line__message.bt-search-current {
        border-inline-start-color: var(--bt-accent);
        background-color: color-mix(in srgb, var(--bt-accent) 14%, transparent) !important;
        outline: 1px solid color-mix(in srgb, var(--bt-accent) 55%, transparent);
        outline-offset: -1px;
      }

      .bt-safe-link { text-decoration-thickness: 1px; text-underline-offset: 2px; }
      .bt-risky-link {
        color: var(--bt-warning) !important;
        text-decoration-style: dotted !important;
      }
      .bt-link-domain {
        display: inline-flex;
        align-items: center;
        max-width: 160px;
        margin: 0 4px;
        padding: 1px 6px;
        overflow: hidden;
        border: 1px solid var(--bt-line);
        border-radius: 6px;
        background: var(--bt-surface-1);
        color: var(--bt-muted);
        font: 600 9px/1.5 var(--bt-font);
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: 1px;
      }
      .bt-link-domain.bt-link-risk {
        border-color: color-mix(in srgb, var(--bt-warning) 55%, var(--bt-line));
        background: color-mix(in srgb, var(--bt-warning) 9%, var(--bt-surface-1));
        color: var(--bt-warning);
      }

      #bt-settings-btn, #bt-inbox-btn, #bt-dash-btn, #bt-chat-control-btn {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 32px !important;
        min-width: 32px !important;
        height: 32px !important;
        margin: 0 !important;
        padding: 7px !important;
        border: 1px solid transparent !important;
        border-radius: 10px !important;
        background: transparent !important;
        color: inherit !important;
        cursor: pointer;
        transition: background-color .12s ease, border-color .12s ease, color .12s ease, transform .08s ease;
      }
      #bt-settings-btn:hover, #bt-inbox-btn:hover, #bt-dash-btn:hover, #bt-chat-control-btn:hover {
        border-color: var(--bt-line) !important;
        background: var(--bt-surface-2) !important;
        color: var(--bt-text) !important;
      }
      #bt-settings-btn:active, #bt-inbox-btn:active, #bt-dash-btn:active, #bt-chat-control-btn:active { transform: translateY(1px); }
      #bt-settings-btn:focus-visible, #bt-inbox-btn:focus-visible, #bt-dash-btn:focus-visible, #bt-chat-control-btn:focus-visible {
        outline: 2px solid var(--bt-accent) !important;
        outline-offset: 2px !important;
      }
      #bt-settings-btn.bt-open-state, #bt-inbox-btn.bt-open-state,
      #bt-dash-btn.bt-open-state, #bt-chat-control-btn.bt-open-state {
        border-color: var(--bt-accent) !important;
        background: var(--bt-accent) !important;
        color: #fff !important;
      }
      #bt-settings-btn svg, #bt-inbox-btn svg, #bt-dash-btn svg, #bt-chat-control-btn svg {
        width: 18px !important;
        height: 18px !important;
        overflow: visible;
        pointer-events: none;
        transition: transform .12s ease;
      }
      #bt-settings-btn:hover svg, #bt-inbox-btn:hover svg,
      #bt-dash-btn:hover svg, #bt-chat-control-btn:hover svg { transform: translateY(-1px); }
      .bt-footer-control { margin-inline-start: 6px !important; }
      .bt-float-btn {
        position: absolute !important;
        z-index: 10000;
        right: 12px;
        bottom: 12px;
        border: 1px solid var(--bt-line-strong) !important;
        background: var(--bt-surface-1) !important;
        color: var(--bt-text) !important;
      }
      #bt-inbox-btn.bt-float-btn { right: 50px; }
      #bt-dash-btn.bt-float-btn { right: 88px; }
      #bt-chat-control-btn.bt-float-btn { right: 126px; }
      #bt-chat-control-btn.bt-state-active:not(.bt-open-state) {
        border-color: color-mix(in srgb, var(--bt-accent) 65%, var(--bt-line)) !important;
        color: var(--bt-accent) !important;
      }
      #bt-chat-control-btn.bt-state-active::after {
        content: "";
        position: absolute;
        top: 4px;
        right: 4px;
        width: 6px;
        height: 6px;
        border: 2px solid var(--bt-surface-0);
        border-radius: 50%;
        background: var(--bt-accent);
      }
      #bt-inbox-btn .bt-badge {
        position: absolute;
        top: -4px;
        right: -5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 17px;
        height: 17px;
        padding: 0 4px;
        border: 2px solid var(--bt-surface-0);
        border-radius: 999px;
        background: var(--bt-danger);
        color: #fff;
        font: 800 9px/1 var(--bt-font);
        pointer-events: none;
      }
      .bt-character-counter {
        min-width: 48px;
        margin-inline-start: 6px;
        padding: 3px 7px;
        border: 1px solid var(--bt-line);
        border-radius: 7px;
        background: var(--bt-surface-1);
        color: var(--bt-muted);
        font: 700 10px/1.4 var(--bt-font);
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
      .bt-character-counter.bt-near-limit { border-color: var(--bt-warning); color: var(--bt-warning); }
      .bt-character-counter.bt-over-limit { border-color: var(--bt-danger); color: var(--bt-danger); }

      #bt-panel, .bt-pop, #bt-hovercard, #bt-setting-tooltip, #bt-modal .bt-modal-box {
        box-sizing: border-box;
        border: 1px solid var(--bt-line-strong);
        border-radius: var(--bt-popup-radius);
        background: var(--bt-surface-0);
        overflow: hidden;
        color: var(--bt-text);
        font-family: var(--bt-font);
      }
      #bt-panel *, .bt-pop *, #bt-hovercard *, #bt-setting-tooltip *, #bt-modal * { box-sizing: border-box; }
      #bt-panel, .bt-pop {
        position: fixed;
        z-index: 100000;
        display: none;
        flex-direction: column;
        width: 416px;
        min-width: 0;
        min-height: 180px;
        max-width: calc(100vw - 20px);
        max-height: min(74vh, 720px);
        overflow: hidden;
      }
      #bt-panel > .bt-body, .bt-pop > .bt-body,
      #bt-hovercard > .bt-body, #bt-modal .bt-modal-box > .bt-body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: var(--bt-line-strong) transparent;
      }
      .bt-body::-webkit-scrollbar { width: 8px; }
      .bt-body::-webkit-scrollbar-track { margin-block: var(--bt-popup-radius); background: transparent; }
      .bt-body::-webkit-scrollbar-thumb {
        border: 2px solid var(--bt-surface-0);
        border-radius: 999px;
        background: var(--bt-line-strong);
      }
      .bt-popup-footer { flex: 0 0 auto; }
      #bt-panel.bt-open, .bt-pop.bt-open { display: flex; animation: bt-surface-enter .14s ease-out; }
      @keyframes bt-surface-enter {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: none; }
      }

      .bt-panel-header {
        position: relative;
        z-index: 2;
        top: auto;
        display: grid;
        grid-template-columns: 20px minmax(0, 1fr) auto auto;
        grid-template-rows: minmax(18px, auto) minmax(13px, auto);
        align-items: center;
        column-gap: 12px;
        min-height: 58px;
        padding: 9px 12px 9px 16px;
        border: 0;
        border-inline-start: 3px solid var(--bt-accent);
        border-bottom: 1px solid var(--bt-line-strong);
        background: linear-gradient(90deg,
          color-mix(in srgb, var(--bt-accent) 8%, var(--bt-surface-1)) 0%,
          var(--bt-surface-1) 44%,
          var(--bt-surface-0) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .035);
      }
      #bt-panel > .bt-panel-header, .bt-pop > .bt-panel-header,
      #bt-modal .bt-modal-box > .bt-panel-header {
        flex: 0 0 auto;
        width: 100%;
      }
      .bt-panel-header a, .bt-panel-header button { cursor: pointer; }
      .bt-panel-header::after {
        content: "";
        position: absolute;
        top: 14px;
        bottom: 14px;
        left: 45px;
        width: 1px;
        background: color-mix(in srgb, var(--bt-accent) 28%, var(--bt-line));
        pointer-events: none;
      }
      .bt-header-icon {
        display: block;
        grid-column: 1;
        grid-row: 1 / 3;
        width: 20px;
        height: 20px;
        flex: 0 0 20px;
        color: var(--bt-accent);
      }
      #bt-panel .bt-title, .bt-pop .bt-pop-title, #bt-modal .bt-modal-title {
        grid-column: 2;
        grid-row: 1 / 3;
        min-width: 0;
        margin-inline-start: 6px;
        overflow: hidden;
        background: none;
        color: var(--bt-text);
        -webkit-text-fill-color: currentColor;
        font-size: 15px;
        font-weight: 760;
        letter-spacing: -.01em;
        line-height: 1.2;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      #bt-panel .bt-title { align-self: center; }
      #bt-panel .bt-meta-pill {
        display: inline-flex;
        grid-row: 1 / 3;
        align-items: center;
        justify-content: center;
        min-height: 24px;
        padding: 3px 8px;
        border: 1px solid color-mix(in srgb, var(--bt-accent) 34%, var(--bt-line));
        border-radius: 7px;
        background: var(--bt-surface-0);
        color: var(--bt-text-soft);
        font: 700 9px/1 var(--bt-font);
        letter-spacing: .04em;
        text-decoration: none;
        transition: border-color .14s ease, background-color .14s ease, color .14s ease;
        white-space: nowrap;
      }
      #bt-panel .bt-by { grid-column: 3; }
      #bt-panel .bt-version { grid-column: 4; }
      .bt-header-status {
        grid-column: 3;
        grid-row: 1 / 3;
        padding: 3px 7px;
        border: 1px solid color-mix(in srgb, var(--bt-accent) 48%, var(--bt-line));
        border-radius: 6px;
        background: color-mix(in srgb, var(--bt-accent) 7%, var(--bt-surface-0));
        color: var(--bt-accent);
        font-size: 8px;
        font-weight: 800;
        letter-spacing: .05em;
        white-space: nowrap;
      }
      #bt-panel .bt-meta-pill:hover {
        border-color: var(--bt-accent);
        background: color-mix(in srgb, var(--bt-accent) 10%, var(--bt-surface-1));
        color: var(--bt-text);
      }
      #bt-panel .bt-meta-pill:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 2px; }

      #bt-panel .bt-settings-section {
        margin: 10px 12px 0;
        overflow: hidden;
        border: 1px solid var(--bt-line);
        border-radius: 11px;
        background: var(--bt-surface-0);
      }
      #bt-panel .bt-settings-section:last-of-type { margin-bottom: 10px; }
      #bt-panel .bt-settings-section .bt-sub {
        display: flex;
        align-items: center;
        gap: 9px;
        min-height: 38px;
        padding: 8px 10px;
        border-bottom: 1px solid var(--bt-line);
        background: var(--bt-surface-1);
        color: var(--bt-text-soft);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      #bt-panel .bt-settings-section .bt-sub > span { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
      #bt-panel .bt-section-reset {
        display: grid;
        margin-inline-start: auto;
        place-items: center;
        width: 24px;
        height: 24px;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 6px;
        background: transparent;
        color: var(--bt-muted);
        cursor: pointer;
      }
      #bt-panel .bt-section-reset:hover { border-color: var(--bt-line-strong); background: var(--bt-surface-2); color: var(--bt-accent); }
      #bt-panel .bt-section-reset:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 1px; }
      #bt-panel .bt-sub .bt-ico {
        width: 17px;
        height: 17px;
        padding: 2px;
        color: var(--bt-accent);
        stroke-width: 1.8;
      }
      #bt-panel .bt-setting-item, #bt-panel .bt-rowflex {
        display: flex;
        align-items: center;
        gap: 9px;
        min-height: 44px;
        margin: 0;
        padding: 8px 10px;
        border-bottom: 1px solid var(--bt-line);
        background: var(--bt-surface-0);
        color: var(--bt-text-soft);
        transition: background-color .12s ease;
      }
      #bt-panel .bt-settings-section > :last-child { border-bottom: 0; }
      #bt-panel .bt-setting-item:hover, #bt-panel .bt-rowflex:hover { background: var(--bt-surface-1); }
      #bt-panel .bt-setting-item:has(input:disabled),
      #bt-panel .bt-rowflex:has(input:disabled),
      #bt-panel .bt-rowflex:has(select:disabled),
      #bt-panel .bt-rowflex:has(textarea:disabled) { opacity: .5; }
      #bt-panel label.bt-row {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-width: 0;
        margin: 0;
        color: inherit;
        font-size: var(--bt-setting-font-size);
        line-height: 1.35;
        cursor: pointer;
      }
      #bt-panel .bt-rowflex > label {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        min-width: 0;
        color: inherit;
        font-size: var(--bt-setting-font-size);
      }
      #bt-panel .bt-rowflex > span:not(.bt-val) {
        flex: 1 1 110px !important;
        min-width: 70px;
        color: inherit;
        font-size: var(--bt-setting-font-size);
        line-height: 1.35;
      }
      #bt-panel label.bt-row > input,
      #bt-panel .bt-rowflex > input,
      #bt-panel .bt-rowflex > select,
      #bt-panel .bt-rowflex > button,
      #bt-panel .bt-rowflex > .bt-val { align-self: center; }
      #bt-panel .bt-help {
        order: -1;
        flex: 0 0 20px;
        width: 20px;
        height: 20px;
        margin: 0;
        padding: 0;
        border: 1px solid var(--bt-line);
        border-radius: 6px;
        background: transparent;
        color: var(--bt-muted);
        font: 800 10px/18px var(--bt-font);
        text-align: center;
        cursor: help;
        transition: border-color .12s ease, background-color .12s ease, color .12s ease;
      }
      #bt-panel .bt-help:hover, #bt-panel .bt-help[aria-expanded="true"] {
        border-color: var(--bt-accent);
        background: color-mix(in srgb, var(--bt-accent) 10%, var(--bt-surface-1));
        color: var(--bt-accent);
      }
      #bt-panel .bt-help:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 2px; }

      #bt-panel input[type=checkbox] {
        position: relative;
        appearance: none;
        flex: 0 0 34px;
        width: 34px;
        height: 20px;
        margin: 0;
        border: 1px solid var(--bt-line-strong);
        border-radius: 999px;
        background: var(--bt-surface-3);
        cursor: pointer;
        transition: border-color .14s ease, background-color .14s ease;
      }
      #bt-panel label input[type=checkbox] {
        order: 2;
        margin-inline-start: auto;
      }
      #bt-panel input[type=checkbox]::before {
        content: "";
        position: absolute;
        top: calc(50% - 1px);
        left: 3px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--bt-muted);
        transform: translateY(-50%);
        transition: transform .14s ease, background-color .14s ease;
      }
      #bt-panel input[type=checkbox]:checked {
        border-color: var(--bt-accent);
        background: var(--bt-accent);
      }
      #bt-panel input[type=checkbox]:checked::before {
        transform: translate(14px, -50%);
        background: #fff;
      }
      #bt-panel input[type=checkbox]:focus,
      #bt-panel input[type=checkbox]:focus-visible { outline: none; border-color: var(--bt-accent); }
      #bt-panel input[type=range] {
        appearance: none;
        flex: 0 0 150px;
        width: 150px;
        min-width: 150px;
        max-width: 150px;
        height: 4px;
        margin: 0;
        border: 0;
        border-radius: 999px;
        background: var(--bt-line-strong);
        accent-color: var(--bt-accent);
        cursor: pointer;
      }
      #bt-panel input[type=range]::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border: 3px solid var(--bt-surface-0);
        border-radius: 50%;
        background: var(--bt-accent);
      }
      #bt-panel input[type=range]::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border: 3px solid var(--bt-surface-0);
        border-radius: 50%;
        background: var(--bt-accent);
      }
      #bt-panel input[type=range]:focus,
      #bt-panel input[type=range]:focus-visible {
        outline: none;
        background: color-mix(in srgb, var(--bt-accent) 35%, var(--bt-line-strong));
      }
      #bt-panel input[type=color] {
        appearance: none;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        padding: 3px;
        overflow: hidden;
        border: 1px solid var(--bt-line-strong);
        border-radius: 50%;
        background: var(--bt-surface-1);
        cursor: pointer;
        transition: border-color .12s ease, background-color .12s ease;
      }
      #bt-panel input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
      #bt-panel input[type=color]::-webkit-color-swatch { border: 0; border-radius: 50%; }
      #bt-panel input[type=color]::-moz-color-swatch { border: 0; border-radius: 50%; }
      #bt-panel input[type=color]:hover { border-color: var(--bt-accent); background: var(--bt-surface-2); }
      #bt-panel input[type=color]:focus,
      #bt-panel input[type=color]:focus-visible { outline: none; border-color: var(--bt-accent); background: var(--bt-surface-2); }
      #bt-panel select, #bt-panel input[type=text], #bt-panel input[type=url],
      #bt-panel input[type=password], #bt-panel textarea, #bt-modal textarea,
      .bt-inbox-search, .bt-chat-search input {
        min-height: 32px;
        border: 1px solid var(--bt-line-strong);
        border-radius: 8px;
        background: var(--bt-bg);
        color: var(--bt-text);
        font: 500 11px/1.35 var(--bt-font);
        transition: border-color .12s ease, background-color .12s ease;
      }
      #bt-panel select {
        flex: 0 0 180px;
        width: 180px;
        min-width: 180px;
        max-width: 180px;
        padding: 5px 28px 5px 9px;
      }
      #bt-panel input[type=text], #bt-panel input[type=url], #bt-panel input[type=password] {
        flex: 0 0 180px;
        width: 180px;
        min-width: 180px;
        max-width: 180px;
        padding: 6px 9px;
      }
      #bt-panel select:focus, #bt-panel input[type=text]:focus, #bt-panel input[type=url]:focus,
      #bt-panel input[type=password]:focus, #bt-panel textarea:focus, #bt-modal textarea:focus,
      .bt-inbox-search:focus, .bt-chat-search input:focus {
        outline: none;
        border-color: var(--bt-accent);
        background: var(--bt-surface-0);
      }
      #bt-panel input:disabled, #bt-panel select:disabled { cursor: not-allowed; }
      #bt-panel .bt-val {
        flex: 0 0 auto;
        min-width: 42px;
        padding: 3px 6px;
        border-radius: 6px;
        background: var(--bt-surface-2);
        color: var(--bt-text-soft);
        font-size: 10px;
        font-weight: 750;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }

      #bt-panel button.bt-btn, #bt-modal button.bt-btn {
        min-height: 32px;
        padding: 6px 11px;
        border: 1px solid var(--bt-line-strong);
        border-radius: 8px;
        background: var(--bt-surface-2);
        color: var(--bt-text);
        font: 700 11px/1 var(--bt-font);
        cursor: pointer;
        transition: border-color .12s ease, background-color .12s ease, transform .08s ease;
      }
      #bt-panel button.bt-btn:hover, #bt-modal button.bt-btn:hover {
        border-color: var(--bt-muted);
        background: var(--bt-surface-3);
      }
      #bt-panel button.bt-btn:active, #bt-modal button.bt-btn:active { transform: translateY(1px); }
      #bt-panel button.bt-btn:focus-visible, #bt-modal button.bt-btn:focus-visible {
        outline: 2px solid var(--bt-accent);
        outline-offset: 2px;
      }
      #bt-panel #bt-test-ping, #bt-modal .bt-modal-primary {
        border-color: var(--bt-accent);
        background: var(--bt-accent);
        color: #fff;
      }
      #bt-panel #bt-reset {
        border-color: color-mix(in srgb, var(--bt-danger) 55%, var(--bt-line));
        background: color-mix(in srgb, var(--bt-danger) 8%, var(--bt-surface-1));
        color: var(--bt-danger);
      }
      #bt-panel .bt-foot {
        display: flex;
        gap: 7px;
        margin: 0;
        padding: 11px 12px;
        border-top: 1px solid var(--bt-line);
        background: var(--bt-surface-1);
      }

      #bt-setting-tooltip {
        position: fixed;
        z-index: 100002;
        display: none;
        width: 300px;
        max-width: calc(100vw - 20px);
        padding: 10px 11px;
        color: var(--bt-text-soft);
        font: 500 11px/1.5 var(--bt-font);
        pointer-events: none;
      }
      #bt-setting-tooltip.bt-open { display: block; animation: bt-tooltip-enter .1s ease-out; }
      @keyframes bt-tooltip-enter {
        from { opacity: 0; transform: translateY(3px); }
        to { opacity: 1; transform: none; }
      }

      .bt-pop .bt-pop-sub {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 34px;
        padding: 9px 14px 7px;
        border-top: 1px solid var(--bt-line);
        color: var(--bt-muted);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .bt-pop .bt-pop-empty {
        padding: 28px 18px;
        color: var(--bt-muted);
        font-size: 12px;
        text-align: center;
      }
      .bt-state { color: var(--bt-muted); }
      .bt-state-loading { border-color: color-mix(in srgb, var(--bt-accent) 42%, var(--bt-line)) !important; }
      .bt-state-error { border-color: color-mix(in srgb, var(--bt-danger) 55%, var(--bt-line)) !important; color: var(--bt-danger) !important; }
      .bt-state-offline { border-color: color-mix(in srgb, var(--bt-warning) 55%, var(--bt-line)) !important; color: var(--bt-warning) !important; }

      .bt-chat-control-body { padding: 10px; }
      .bt-chat-control-section {
        padding: 10px;
        border: 1px solid var(--bt-line);
        border-radius: 10px;
        background: var(--bt-surface-1);
      }
      .bt-chat-control-section + .bt-chat-control-section { margin-top: 8px; }
      .bt-chat-control-label {
        margin-bottom: 8px;
        color: var(--bt-muted);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .07em;
        text-transform: uppercase;
      }
      .bt-filter-bar {
        display: flex;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .bt-filter-bar::-webkit-scrollbar { display: none; }
      .bt-filter-bar button {
        flex: 0 0 auto;
        min-height: 29px;
        padding: 5px 9px;
        border: 1px solid var(--bt-line);
        border-radius: 7px;
        background: var(--bt-surface-0);
        color: var(--bt-text-soft);
        font: 700 10px/1 var(--bt-font);
        cursor: pointer;
        transition: border-color .12s ease, background-color .12s ease, color .12s ease;
      }
      .bt-filter-bar button:hover { border-color: var(--bt-line-strong); background: var(--bt-surface-2); }
      .bt-filter-bar button:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 1px; }
      .bt-filter-bar button.bt-active {
        border-color: var(--bt-accent);
        background: var(--bt-accent);
        color: #fff;
      }
      .bt-chat-search {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 30px auto 30px;
        gap: 5px;
        align-items: center;
      }
      .bt-chat-search input { width: 100%; padding: 6px 9px; }
      .bt-chat-search button {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        padding: 0;
        border: 1px solid var(--bt-line);
        border-radius: 7px;
        background: var(--bt-surface-0);
        color: var(--bt-text-soft);
        font-size: 18px;
        cursor: pointer;
      }
      .bt-chat-search button:hover:not(:disabled) { border-color: var(--bt-accent); color: var(--bt-accent); }
      .bt-chat-search button:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 1px; }
      .bt-chat-search button:disabled { opacity: .35; cursor: default; }
      .bt-search-count {
        min-width: 40px;
        color: var(--bt-muted);
        font-size: 10px;
        font-weight: 750;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }

      #bt-dash { max-height: min(78vh, 760px); }
      .bt-dash-live {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 7px;
        border: 1px solid color-mix(in srgb, var(--bt-success) 50%, var(--bt-line));
        border-radius: 6px;
        color: var(--bt-success);
        font-size: 8px;
        font-weight: 850;
        letter-spacing: .08em;
      }
      .bt-panel-header .bt-dash-live {
        grid-column: 3;
        grid-row: 1 / 3;
      }
      .bt-dash-live i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--bt-success);
        animation: bt-live-indicator 1.6s ease-in-out infinite;
      }
      @keyframes bt-live-indicator { 50% { opacity: .35; } }
      .bt-dash-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 38px 22px;
        color: var(--bt-muted);
        text-align: center;
      }
      .bt-dash-empty-icon {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        margin-bottom: 12px;
        border: 1px solid var(--bt-line);
        border-radius: 10px;
        background: var(--bt-surface-1);
        color: var(--bt-accent);
        font-size: 21px;
      }
      .bt-dash-empty b { color: var(--bt-text); font-size: 13px; }
      .bt-dash-empty > span:last-child { max-width: 260px; margin-top: 4px; font-size: 11px; line-height: 1.45; }
      .bt-dash-metrics {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 7px;
        padding: 10px;
      }
      .bt-dash-metric {
        min-height: 70px;
        padding: 10px;
        border: 1px solid var(--bt-line);
        border-radius: 10px;
        background: var(--bt-surface-1);
      }
      .bt-dash-metric-accent {
        border-color: color-mix(in srgb, var(--bt-accent) 58%, var(--bt-line));
        background: color-mix(in srgb, var(--bt-accent) 11%, var(--bt-surface-1));
      }
      .bt-dash-metric > b {
        display: block;
        overflow: hidden;
        color: var(--bt-text);
        font-size: 22px;
        line-height: 1.05;
        letter-spacing: -.04em;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      .bt-dash-metric-accent > b { color: var(--bt-accent); }
      .bt-dash-metric > span {
        display: block;
        margin-top: 7px;
        color: var(--bt-text-soft);
        font-size: 9px;
        font-weight: 750;
        text-transform: uppercase;
        letter-spacing: .05em;
      }
      .bt-dash-metric > small { display: block; margin-top: 2px; color: var(--bt-muted); font-size: 9px; }
      .bt-dash-chart {
        margin: 0 10px 9px;
        padding: 10px;
        border: 1px solid var(--bt-line);
        border-radius: 10px;
        background: var(--bt-surface-1);
      }
      .bt-dash-chart-head { display: flex; justify-content: space-between; margin-bottom: 8px; }
      .bt-dash-chart-head span { display: flex; flex-direction: column; }
      .bt-dash-chart-head b { color: var(--bt-text-soft); font-size: 10px; }
      .bt-dash-chart-head small { margin-top: 1px; color: var(--bt-muted); font-size: 9px; }
      .bt-spark { display: block; width: 100%; height: 48px; overflow: visible; }
      .bt-spark-grid { stroke: var(--bt-line); stroke-width: 1; vector-effect: non-scaling-stroke; }
      .bt-spark-area { fill: color-mix(in srgb, var(--bt-accent) 12%, transparent); }
      .bt-spark-line {
        fill: none;
        stroke: var(--bt-accent);
        stroke-width: 2;
        stroke-linecap: square;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }
      .bt-dash-session {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: 0 10px 10px;
        overflow: hidden;
        border: 1px solid var(--bt-line);
        border-radius: 10px;
        background: var(--bt-surface-1);
      }
      .bt-dash-session > span { padding: 9px 6px; text-align: center; }
      .bt-dash-session > span + span { border-inline-start: 1px solid var(--bt-line); }
      .bt-dash-session b { display: block; color: var(--bt-text); font-size: 13px; font-variant-numeric: tabular-nums; }
      .bt-dash-session small {
        display: block;
        margin-top: 2px;
        color: var(--bt-muted);
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .04em;
      }
      .bt-dash-list { padding: 0 10px 10px; }
      .bt-dash-row {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 43px;
        padding: 6px 8px;
        border-bottom: 1px solid var(--bt-line);
        transition: background-color .12s ease;
      }
      .bt-dash-row:first-child { border-top: 1px solid var(--bt-line); }
      .bt-dash-row:hover { background: var(--bt-surface-1); }
      .bt-dash-rank {
        flex: 0 0 22px;
        color: var(--bt-muted);
        font-size: 10px;
        font-weight: 800;
        text-align: center;
      }
      .bt-dash-avatar {
        display: grid;
        flex: 0 0 28px;
        place-items: center;
        width: 28px;
        height: 28px;
        overflow: hidden;
        border: 1px solid var(--bt-line);
        border-radius: 8px;
        background: var(--bt-surface-2);
        color: var(--bt-text-soft);
        font-size: 10px;
        font-weight: 800;
      }
      .bt-dash-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .bt-dash-person { min-width: 0; flex: 1; }
      .bt-dash-person-line { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .bt-dash-name { overflow: hidden; font-size: 11px; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }
      .bt-dash-count { color: var(--bt-text-soft); font-size: 10px; font-variant-numeric: tabular-nums; }
      .bt-dash-share {
        display: block;
        height: 3px;
        margin-top: 5px;
        overflow: hidden;
        border-radius: 999px;
        background: var(--bt-surface-3);
      }
      .bt-dash-share i { display: block; height: 100%; border-radius: inherit; background: var(--bt-accent); }
      .bt-dash-emotes {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px;
        padding: 0 10px 12px;
      }
      .bt-dash-emote {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        padding: 8px;
        border: 1px solid var(--bt-line);
        border-radius: 9px;
        background: var(--bt-surface-1);
        transition: border-color .12s ease, background-color .12s ease;
      }
      .bt-dash-emote:hover { border-color: var(--bt-line-strong); background: var(--bt-surface-2); }
      .bt-dash-emote img { flex: 0 0 28px; width: 28px; height: 28px; object-fit: contain; }
      .bt-dash-emote > span { min-width: 0; }
      .bt-dash-emote b {
        display: block;
        overflow: hidden;
        color: var(--bt-text);
        font-size: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bt-dash-emote small { color: var(--bt-muted); font-size: 9px; }

      .bt-inbox-search {
        display: block;
        width: calc(100% - 20px);
        margin: 10px;
        padding: 7px 10px;
      }
      .bt-inbox-total {
        padding: 3px 7px;
        border-radius: 6px;
        background: var(--bt-surface-2);
        color: var(--bt-text-soft);
        font-size: 9px;
        font-weight: 800;
      }
      .bt-panel-header .bt-inbox-total {
        grid-column: 3;
        grid-row: 1 / 3;
      }
      .bt-inbox-notice {
        margin: 0 10px 8px;
        padding: 8px 9px;
        border: 1px solid color-mix(in srgb, var(--bt-warning) 48%, var(--bt-line));
        border-radius: 8px;
        background: color-mix(in srgb, var(--bt-warning) 8%, var(--bt-surface-1));
        color: var(--bt-warning);
        font-size: 10px;
      }
      .bt-inbox-row {
        margin: 0 10px;
        padding: 10px 2px;
        border-bottom: 1px solid var(--bt-line);
        cursor: pointer;
        transition: background-color .12s ease;
      }
      .bt-inbox-row:first-of-type { border-top: 1px solid var(--bt-line); }
      .bt-inbox-row:hover { background: var(--bt-surface-1); }
      .bt-inbox-row.bt-expanded { margin: 0; padding: 10px 12px; background: var(--bt-surface-1); }
      .bt-inbox-main {
        display: flex;
        gap: 5px;
        align-items: center;
        min-width: 0;
      }
      .bt-inbox-kind {
        display: grid;
        place-items: center;
        width: 20px;
        height: 20px;
        border-radius: 6px;
        background: color-mix(in srgb, var(--bt-accent) 12%, var(--bt-surface-2));
        color: var(--bt-accent);
        font-size: 10px;
        font-weight: 850;
      }
      .bt-inbox-time { color: var(--bt-muted); font-size: 9px; font-variant-numeric: tabular-nums; }
      .bt-inbox-channel {
        max-width: 84px;
        overflow: hidden;
        color: var(--bt-muted);
        font-size: 9px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bt-inbox-user { font-size: 10px; font-weight: 800; }
      .bt-inbox-colon { display: none; }
      .bt-inbox-text {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        color: var(--bt-text-soft);
        font-size: 11px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bt-inbox-jump {
        display: grid;
        place-items: center;
        width: 26px;
        height: 26px;
        padding: 0;
        border: 1px solid var(--bt-line);
        border-radius: 7px;
        background: transparent;
        color: var(--bt-muted);
        cursor: pointer;
      }
      .bt-inbox-jump:hover { border-color: var(--bt-accent); color: var(--bt-accent); }
      .bt-inbox-jump:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 1px; }
      .bt-inbox-jump:disabled { opacity: .3; cursor: default; }
      .bt-inbox-context { display: none; margin-top: 9px; padding-top: 8px; border-top: 1px solid var(--bt-line); }
      .bt-inbox-row.bt-expanded .bt-inbox-context { display: block; }
      .bt-context-line {
        display: flex;
        gap: 4px;
        padding: 4px 6px;
        border-radius: 6px;
        color: var(--bt-muted);
        font-size: 10px;
        line-height: 1.4;
      }
      .bt-context-line > span:first-child { flex: 0 0 auto; font-weight: 750; }
      .bt-context-line.bt-context-focus {
        background: color-mix(in srgb, var(--bt-accent) 9%, var(--bt-surface-2));
        color: var(--bt-text-soft);
      }

      #bt-hovercard {
        position: fixed;
        z-index: 100001;
        display: none;
        flex-direction: column;
        width: 270px;
        max-width: calc(100vw - 20px);
        max-height: calc(100vh - 20px);
        padding: 12px;
        overflow: hidden;
      }
      #bt-hovercard.bt-open { display: flex; animation: bt-tooltip-enter .12s ease-out; }
      #bt-hovercard .bt-panel-header {
        position: relative;
        top: auto;
        grid-template-columns: 38px minmax(0, 1fr);
        margin: -12px -12px 10px;
        padding: 9px 12px;
      }
      #bt-hovercard .bt-panel-header::after { left: 59px; }
      .bt-hover-avatar {
        display: grid;
        grid-column: 1;
        grid-row: 1 / 3;
        flex: 0 0 38px;
        place-items: center;
        width: 38px;
        height: 38px;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--bt-accent) 42%, var(--bt-line));
        border-radius: 10px;
        background: color-mix(in srgb, var(--bt-accent) 9%, var(--bt-surface-2));
        color: var(--bt-text);
        font-size: 13px;
        font-weight: 800;
      }
      .bt-hover-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .bt-hover-name {
        grid-column: 2;
        grid-row: 1 / 3;
        min-width: 0;
        overflow: hidden;
        font-size: 14px;
        font-weight: 800;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bt-hover-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 10px; }
      .bt-hover-grid span {
        display: flex;
        flex-direction: column;
        padding: 8px;
        border: 1px solid var(--bt-line);
        border-radius: 8px;
        background: var(--bt-surface-1);
        color: var(--bt-muted);
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: .05em;
      }
      .bt-hover-grid b { margin-bottom: 2px; color: var(--bt-text); font-size: 16px; letter-spacing: -.02em; }
      .bt-hover-emote {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 0 8px;
        align-items: center;
        margin-top: 8px;
        padding: 8px;
        border: 1px solid var(--bt-line);
        border-radius: 8px;
        background: var(--bt-surface-1);
        color: var(--bt-text-soft);
        font-size: 10px;
      }
      .bt-hover-emote small { grid-column: 1 / -1; margin-bottom: 5px; color: var(--bt-muted); font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }
      .bt-hover-emote img { width: 28px; height: 28px; object-fit: contain; }

      .chat-line__message .bt-trans {
        margin: 7px 0 3px;
        padding: 9px 10px;
        border: 1px solid var(--bt-line);
        border-inline-start: 3px solid var(--bt-accent);
        border-radius: 8px;
        background: var(--bt-surface-1);
        color: var(--bt-text-soft);
        font: 500 11px/1.45 var(--bt-font);
      }
      .chat-line__message .bt-trans-meta {
        margin-bottom: 5px;
        color: var(--bt-muted);
        font-size: 9px;
        font-weight: 750;
        letter-spacing: .03em;
        text-transform: uppercase;
      }
      .chat-line__message .bt-trans-text { color: var(--bt-text); white-space: pre-wrap; overflow-wrap: anywhere; }
      .chat-line__message .bt-trans-error { border-inline-start-color: var(--bt-danger); color: var(--bt-danger); }
      .chat-line__message .bt-trans-actions { display: flex; gap: 5px; margin-top: 8px; }
      .chat-line__message .bt-trans-action {
        min-height: 25px;
        padding: 4px 7px;
        border: 1px solid var(--bt-line);
        border-radius: 6px;
        background: var(--bt-surface-0);
        color: var(--bt-text-soft);
        font: 700 9px/1 var(--bt-font);
        cursor: pointer;
      }
      .chat-line__message .bt-trans-action:hover { border-color: var(--bt-accent); color: var(--bt-accent); }
      .chat-line__message .bt-trans-action:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 1px; }

      #bt-modal {
        position: fixed;
        z-index: 100003;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(6, 8, 12, .72);
      }
      #bt-modal.bt-open { display: flex; }
      #bt-modal .bt-modal-box {
        display: flex;
        flex-direction: column;
        width: 440px;
        max-width: 100%;
        max-height: calc(100vh - 32px);
        padding: 0;
        overflow: hidden;
        animation: bt-modal-enter .14s ease-out;
      }
      @keyframes bt-modal-enter {
        from { opacity: 0; transform: translateY(8px) scale(.985); }
        to { opacity: 1; transform: none; }
      }
      #bt-modal .bt-modal-head { position: relative; top: auto; }
      #bt-modal .bt-modal-x {
        display: grid;
        grid-column: 4;
        grid-row: 1 / 3;
        place-items: center;
        width: 29px;
        height: 29px;
        padding: 0;
        border: 1px solid var(--bt-line);
        border-radius: 7px;
        background: transparent;
        color: var(--bt-muted);
        cursor: pointer;
      }
      #bt-modal .bt-modal-x:hover { border-color: var(--bt-line-strong); background: var(--bt-surface-2); color: var(--bt-text); }
      #bt-modal .bt-modal-x:focus-visible { outline: 2px solid var(--bt-accent); outline-offset: 1px; }
      #bt-modal textarea {
        display: block;
        width: calc(100% - 24px);
        height: 210px;
        margin: 12px;
        padding: 10px;
        resize: vertical;
      }
      #bt-modal .bt-modal-note { min-height: 18px; padding: 0 12px 8px; color: var(--bt-muted); font-size: 10px; }
      #bt-modal .bt-modal-foot {
        display: flex;
        justify-content: flex-end;
        gap: 7px;
        padding: 10px 12px;
        border-top: 1px solid var(--bt-line);
        background: var(--bt-surface-1);
      }

      @media (max-width: 430px) {
        #bt-panel, #bt-inbox, #bt-dash, #bt-chat-controls {
          min-width: 0;
          max-width: calc(100vw - 12px);
        }
        #bt-panel .bt-title { grid-row: 1 / 3; align-self: center; }
        .bt-panel-header {
          grid-template-columns: 18px minmax(0, 1fr) auto auto;
          column-gap: 10px;
          padding-inline: 12px;
        }
        .bt-header-icon { width: 18px; height: 18px; flex-basis: 18px; }
        .bt-panel-header::after { left: 39px; }
        #bt-hovercard .bt-panel-header::after { left: 59px; }
        #bt-panel .bt-setting-item, #bt-panel .bt-rowflex { flex-wrap: wrap; }
        #bt-panel .bt-rowflex > span:not(.bt-val) { flex-basis: calc(100% - 29px) !important; }
        #bt-panel input[type=range] { min-width: 150px; }
        .bt-dash-emotes { grid-template-columns: 1fr; }
        .bt-inbox-channel { display: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        #bt-panel.bt-open, .bt-pop.bt-open, #bt-hovercard.bt-open,
        #bt-setting-tooltip.bt-open, #bt-modal .bt-modal-box,
        .chat-line__message.bt-focus-pulse, .bt-dash-live i {
          animation: none !important;
        }
        #bt-panel *, .bt-pop *, #bt-hovercard *, #bt-modal *,
        .chat-line__message, .chat-line__message .bt-message-actions {
          scroll-behavior: auto !important;
          transition-duration: 0s !important;
        }
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  let appliedVarsSignature = '';

  let twitchThemeObserver = null;
  const observedThemeHosts = new WeakSet();

  function cssColorIsLight(value) {
    const text = String(value || '').trim();
    if (!text || text === 'transparent') return null;
    let rgb = null;
    const functional = text.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (functional) {
      const parts = text.match(/[\d.]+/g) || [];
      if (parts.length > 3 && Number(parts[3]) === 0) return null;
      rgb = functional.slice(1, 4).map(Number);
    }
    const hex = text.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
    if (!rgb && hex) {
      const raw = hex[1].length === 3
        ? hex[1].split('').map((part) => part + part).join('')
        : hex[1];
      rgb = [0, 2, 4].map((offset) => parseInt(raw.slice(offset, offset + 2), 16));
    }
    if (!rgb || rgb.some((part) => !Number.isFinite(part))) return null;
    return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) > 150;
  }

  function detectTwitchTheme() {
    const rootHosts = [document.documentElement, document.body].filter(Boolean);
    for (const host of rootHosts) {
      const classes = typeof host.className === 'string' ? host.className : '';
      if (/(?:^|\s)tw-root--theme-light(?:\s|$)/.test(classes)) return 'light';
      if (/(?:^|\s)tw-root--theme-dark(?:\s|$)/.test(classes)) return 'dark';
    }
    const lightHost = document.querySelector('.tw-root--theme-light');
    const darkHost = document.querySelector('.tw-root--theme-dark');
    if (lightHost && !darkHost) return 'light';
    if (darkHost && !lightHost) return 'dark';
    const hosts = rootHosts.concat([lightHost, darkHost].filter(Boolean));
    for (const host of hosts) {
      const style = getComputedStyle(host);
      let light = cssColorIsLight(style.getPropertyValue('--color-background-base'));
      if (light === null) light = cssColorIsLight(style.backgroundColor);
      if (light !== null) return light ? 'light' : 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function syncTwitchTheme() {
    const theme = detectTwitchTheme();
    const previous = document.documentElement.dataset.btTheme;
    if (previous === theme) return;
    document.documentElement.dataset.btTheme = theme;
    if (previous) syncAll();
  }

  function ensureTwitchTheme() {
    syncTwitchTheme();
    if (!twitchThemeObserver) twitchThemeObserver = new MutationObserver(syncTwitchTheme);
    const hosts = [
      document.documentElement,
      document.body,
      document.querySelector('.tw-root--theme-light, .tw-root--theme-dark'),
    ].filter(Boolean);
    hosts.forEach((host) => {
      if (observedThemeHosts.has(host)) return;
      observedThemeHosts.add(host);
      twitchThemeObserver.observe(host, { attributes: true, attributeFilter: ['class', 'style'] });
    });
  }

  function applyVars() {
    const signature = [
      CONFIG.mentionColor, CONFIG.modColor, CONFIG.vipColor, CONFIG.accentColor, CONFIG.hideBadges,
      CONFIG.hideLeaderboard, CONFIG.hideCommunityHighlights, CONFIG.msgSeparators,
    ].join('|');
    if (signature === appliedVarsSignature) return;
    appliedVarsSignature = signature;
    const r = document.documentElement;
    r.style.setProperty('--bt-mention', CONFIG.mentionColor);
    r.style.setProperty('--bt-mod', CONFIG.modColor);
    r.style.setProperty('--bt-vip', CONFIG.vipColor);
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
    '[data-testid="leaderboard-top-three-entry"], [class*="bitsLeaderboard"], ' +
    '[class*="channelLeaderboardHeader"], [class*="goal" i], ' +
    '[data-test-selector*="goal" i], [data-a-target*="goal" i]';
  const COMMUNITY_HIGHLIGHT_SURFACE_SELECTOR =
    '[class*="community-highlight-stack__"], .community-highlight, .pinned-chat__highlight-card';
  const CHAT_TOP_SURFACE_OBSERVER_IGNORE =
    '.chat-list--default, .chat-input, .chat-room__notifications, .chat-room__viewer-card';

  function containsChatSurface(element, selector) {
    return !!(element && (element.matches(selector) || element.querySelector(selector)));
  }

  function applyChatTopSurfaces() {
    if (!CONFIG.hideLeaderboard) {
      document.querySelectorAll('.bt-top-users-hidden').forEach((el) => el.classList.remove('bt-top-users-hidden'));
    }
    if (!CONFIG.hideCommunityHighlights) {
      document.querySelectorAll('.bt-community-highlights-hidden').forEach((el) => el.classList.remove('bt-community-highlights-hidden'));
    }
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

  const layoutStyleSnapshots = new Map();
  let activeLayoutTarget = null, activeVideoTarget = null;

  function setImp(el, prop, val) {
    let snapshots = layoutStyleSnapshots.get(el);
    if (!snapshots) {
      snapshots = new Map();
      layoutStyleSnapshots.set(el, snapshots);
    }
    if (!snapshots.has(prop)) {
      snapshots.set(prop, {
        value: el.style.getPropertyValue(prop),
        priority: el.style.getPropertyPriority(prop),
      });
    }
    if (el.style.getPropertyValue(prop) !== val || el.style.getPropertyPriority(prop) !== 'important') el.style.setProperty(prop, val, 'important');
  }

  function removeInlineStyle(el, prop) {
    const snapshots = el && layoutStyleSnapshots.get(el);
    if (!snapshots || !snapshots.has(prop)) return;
    const original = snapshots.get(prop);
    if (original.value) el.style.setProperty(prop, original.value, original.priority);
    else el.style.removeProperty(prop);
    snapshots.delete(prop);
    if (!snapshots.size) layoutStyleSnapshots.delete(el);
  }

  function restoreElementLayout(el) {
    const snapshots = el && layoutStyleSnapshots.get(el);
    if (!snapshots) return;
    Array.from(snapshots.keys()).forEach((property) => removeInlineStyle(el, property));
  }

  function restoreAllLayoutStyles() {
    Array.from(layoutStyleSnapshots.keys()).forEach(restoreElementLayout);
    activeLayoutTarget = null;
    activeVideoTarget = null;
  }

  function pruneDetachedLayoutSnapshots() {
    for (const element of Array.from(layoutStyleSnapshots.keys())) {
      if (!element.isConnected) restoreElementLayout(element);
    }
  }

  function applyColumn(col) {
    const w = chatWidth(); if (!w) return;
    setImp(col, 'width', w); setImp(col, 'min-width', w); setImp(col, 'max-width', w); setImp(col, 'flex-basis', w);
    setImp(col, 'transition', 'none');
    if (col.classList.contains('channel-root__right-column--expanded')) setImp(col, 'transform', 'translateX(-' + w + ')');
    else removeInlineStyle(col, 'transform');
  }

  function fallbackChatColumn() {
    const anchor = document.querySelector('.chat-scrollable-area__message-container, .chat-input, .stream-chat');
    if (!anchor) return null;
    const explicit = anchor.closest(
      '.stream-chat, section[data-test-selector="chat-room-component-layout"], [data-a-target="right-column-chat-bar"]'
    );
    if (explicit) return explicit;
    let candidate = null, element = anchor;
    for (let i = 0; i < 10 && element; i++, element = element.parentElement) {
      const width = element.getBoundingClientRect().width;
      if (width > 250 && width < 700) candidate = element;
      else if (candidate) break;
    }
    return candidate;
  }

  function widenChat(col) {
    const w = chatWidth();
    const target = col || fallbackChatColumn();
    if (!w || !target) return null;
    if (activeLayoutTarget && activeLayoutTarget !== target) restoreAllLayoutStyles();
    activeLayoutTarget = target;
    if (col) {
      applyColumn(col);
    } else {
      setImp(target, 'width', w);
      setImp(target, 'min-width', w);
      setImp(target, 'max-width', w);
      setImp(target, 'flex-basis', w);
      setImp(target, 'transition', 'none');
    }
    return target;
  }

  function widenVideo() {
    const delta = Math.max(0, CONFIG.chatWidthPx - DEFAULT_CHAT_PX);
    const main = document.querySelector('main.twilight-main, .twilight-main');
    if (activeVideoTarget && activeVideoTarget !== main) restoreElementLayout(activeVideoTarget);
    activeVideoTarget = null;
    if (main && delta) {
      activeVideoTarget = main;
      setImp(main, 'transition', 'none');
      setImp(main, 'margin-right', delta + 'px');
    } else if (main) {
      removeInlineStyle(main, 'margin-right');
      removeInlineStyle(main, 'transition');
    }
  }

  function applyToggle() {
    const col = document.querySelector('.channel-root__right-column');
    const expanded = col && col.classList.contains('channel-root__right-column--expanded');
    const active = expanded;
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
    restoreAllLayoutStyles();
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
    const expanded = col && col.classList.contains('channel-root__right-column--expanded');
    let target = null;
    if (!col || expanded) {
      target = widenChat(col);
      if (target) widenVideo();
    }
    if (target) ensureObserver(target);
    else {
      if (observedCol) disconnectLayoutObserver();
      resetLayout();
    }
    applyToggle();
    pruneDetachedLayoutSnapshots();
  }

  let panel = null;

  function formatVal(k, v) {
    if (k === 'chatWidthPx') return v + 'px';
    if (k === 'pingVolume') return Math.round(v * 100) + '%';
    if (k === 'raidReturnMinutes' || k === 'offlineRefreshMinutes') return v ? v + ' ' + t('minuteShortSetting') : t('disabledValue');
    return '' + v;
  }

  let featureSurfaceSignature = '';

  function syncFeatureSurfaces() {
    const signature = [
      CONFIG.viewerHovercards, CONFIG.characterCounter,
      CONFIG.spamCompression, CONFIG.quickChatFilters, CONFIG.liveChatSearch,
      CONFIG.autoClaimPoints,
      CONFIG.autoClaimDrops, currentLang(),
    ].join('|');
    if (signature !== featureSurfaceSignature) {
      featureSurfaceSignature = signature;
      if (!CONFIG.viewerHovercards && hovercard) hovercard.classList.remove('bt-open');
      if (!CONFIG.characterCounter) removeCharacterCounter();
      if (spamCompressionActive !== CONFIG.spamCompression) {
        resetSpamCompression();
        spamCompressionActive = CONFIG.spamCompression;
      }
      syncChatControlAvailability();
      syncClaimSchedule();
    }
    ensureComposerTools();
  }

  function refresh() { applyLayout(); applyVars(); applyAutoQuality(true); ensureExtraButtons(); syncFeatureSurfaces(); syncNavigationFeatures(); syncAll(); }

  const MESSAGE_REFRESH_SETTINGS = new Set([
    'mentionHighlight', 'highlightMods', 'highlightVips', 'showAvatars', 'fixNameColors',
    'copyButton', 'inlineTranslate', 'viewerHovercards', 'hideCommands', 'hideBots', 'botNames',
    'spamCompression', 'quickChatFilters', 'liveChatSearch', 'saferLinks',
  ]);
  const PANEL_REFRESH_SETTINGS = new Set([
    'dashboard', 'mentionInbox', 'mentionContextMessages', 'quickChatFilters', 'liveChatSearch',
  ]);

  function refreshSetting(key) {
    if (['accentColor', 'mentionColor', 'modColor', 'vipColor', 'hideBadges',
      'hideLeaderboard', 'hideCommunityHighlights', 'msgSeparators'].includes(key)) applyVars();
    if (key === 'chatWidthPx') {
      applyLayout();
      const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 16));
      schedule(repositionOpenPanels);
    }
    if (key === 'autoQuality') applyAutoQuality(true);
    if (key === 'autoClaimPoints' || key === 'autoClaimDrops') syncClaimSchedule();
    if (key === 'raidReturnMinutes' || key === 'offlineRefreshMinutes') syncNavigationFeatures();
    if (key === 'characterCounter') ensureComposerTools();
    if (PANEL_REFRESH_SETTINGS.has(key)) {
      ensureExtraButtons();
      syncFeatureSurfaces();
    }
    if (MESSAGE_REFRESH_SETTINGS.has(key)) syncAll();
  }

  function settingDisabled(key) {
    const parents = {
      mentionContextMessages: 'mentionInbox',
      mentionReplyPing: 'mentionSound',
      botNames: 'hideBots',
      mentionColor: 'mentionHighlight',
      modColor: 'highlightMods',
      vipColor: 'highlightVips',
    };
    return parents[key] ? !CONFIG[parents[key]] : false;
  }

  function updatePanelDependencies() {
    if (!panel) return;
    panel.querySelectorAll('[data-k]').forEach((input) => {
      input.disabled = settingDisabled(input.dataset.k);
    });
  }

  function syncPanelControls() {
    if (!panel) return;
    panel.querySelectorAll('input[data-k], select[data-k], textarea[data-k]').forEach((input) => {
      const key = input.dataset.k;
      if (input.type === 'checkbox') input.checked = !!CONFIG[key];
      else input.value = CONFIG[key];
      const value = panel.querySelector('[data-val-for="' + key + '"]');
      if (value) value.textContent = formatVal(key, CONFIG[key]);
    });
    updatePanelDependencies();
  }

  function applySettingsValues(values) {
    const previousLanguage = CONFIG.language;
    Object.entries(values || {}).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key) && validSettingValue(key, value)) CONFIG[key] = value;
    });
    saveConfig();
    if (CONFIG.language !== previousLanguage) {
      location.reload();
      return;
    }
    syncPanelControls();
    refresh();
  }

  const SVG = (inner) => '<svg class="bt-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  const SEC_ICONS = {
    secGeneral: SVG('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/>'),
    secDeleted: SVG('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    secChatAppearance: SVG('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16M6 8h6M6 12h6"/>'),
    secChatTools: SVG('<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>'),
    secConversation: SVG('<path d="M3 5h18v12H7l-4 4V5Z"/><path d="m8 11 2 2 5-5M17 9h1M17 13h1"/>'),
    secPlayerRewards: SVG('<polygon points="5 3 19 12 5 21 5 3"/><path d="M17 3l1 2 2 .3-1.5 1.5.4 2.2L17 8l-1.9 1 .4-2.2L14 5.3l2-.3z"/>'),
    secNotifications: SVG('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
    secHighlights: SVG('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    secFilter: SVG('<polygon points="22 4 2 4 10 12.5 10 19 14 21 14 12.5 22 4"/>'),
  };

  function secHead(key) {
    return '<div class="bt-sub" data-bt-section="' + key + '">' + (SEC_ICONS[key] || '') +
      '<span>' + t(key) + '</span><button class="bt-section-reset" type="button" title="' +
      esc(t('resetSection')) + '" aria-label="' + esc(t('resetSection')) + '">↺</button></div>';
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
             !section.nextElementSibling.classList.contains('bt-foot')) {
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
      <div class="bt-panel-header">
        ${uiIcon('settings', 'bt-header-icon')}
        <span class="bt-title">BetterTwitch</span>
        <a class="bt-by bt-meta-pill" href="${AUTHOR_URL}" target="_blank" rel="noopener noreferrer">${t('byAuthor')} YaneonY</a>
        <a class="bt-version bt-meta-pill" href="${PROJECT_URL}" target="_blank" rel="noopener noreferrer">v${VERSION}</a>
      </div>

      ${secHead('secGeneral')}
      <div class="bt-rowflex"><span style="flex:1">${t('language')}</span><select data-k="language"><option value="auto">${t('langAuto')}</option><option value="en">English</option><option value="de">Deutsch</option><option value="ru">Русский</option></select></div>
      <div class="bt-rowflex"><label style="flex:1">${t('accentColor')}</label><input type="color" data-k="accentColor"></div>
      ${secHead('secChatAppearance')}
      <div class="bt-rowflex"><span style="flex:0 0 64px">${t('width')}</span><input type="range" min="340" max="${MAX_CHAT_PX}" step="10" data-k="chatWidthPx"><span class="bt-val" data-val-for="chatWidthPx"></span></div>
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
      <label class="bt-row"><input type="checkbox" data-k="characterCounter"> ${t('characterCounter')}</label>

      ${secHead('secConversation')}
      <label class="bt-row"><input type="checkbox" data-k="spamCompression"> ${t('spamCompression')}</label>
      <label class="bt-row"><input type="checkbox" data-k="quickChatFilters"> ${t('quickChatFilters')}</label>
      <label class="bt-row"><input type="checkbox" data-k="liveChatSearch"> ${t('liveChatSearch')}</label>
      <label class="bt-row"><input type="checkbox" data-k="saferLinks"> ${t('saferLinks')}</label>

      ${secHead('secHighlights')}
      <div class="bt-rowflex"><label><input type="checkbox" data-k="mentionHighlight"> ${t('mentionHighlight')}</label><input type="color" data-k="mentionColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightMods"> ${t('highlightMods')}</label><input type="color" data-k="modColor"></div>
      <div class="bt-rowflex"><label><input type="checkbox" data-k="highlightVips"> ${t('highlightVips')}</label><input type="color" data-k="vipColor"></div>

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
      <div class="bt-rowflex"><span style="flex:1">${t('raidReturnMinutes')}</span><input type="range" min="0" max="60" step="5" data-k="raidReturnMinutes"><span class="bt-val" data-val-for="raidReturnMinutes"></span></div>
      <div class="bt-rowflex"><span style="flex:1">${t('offlineRefreshMinutes')}</span><input type="range" min="0" max="60" step="1" data-k="offlineRefreshMinutes"><span class="bt-val" data-val-for="offlineRefreshMinutes"></span></div>
      <label class="bt-row"><input type="checkbox" data-k="autoClaimPoints"> ${t('autoClaimPoints')}</label>
      <label class="bt-row"><input type="checkbox" data-k="autoClaimDrops"> ${t('autoClaimDrops')}</label>

      <div class="bt-foot bt-popup-footer">
        <button class="bt-btn" id="bt-export">${t('export')}</button>
        <button class="bt-btn" id="bt-import">${t('import')}</button>
        <button class="bt-btn" id="bt-reset" style="margin-left:auto">${t('reset')}</button>
      </div>
    `;
    groupSettingSections(panel);
    structurePopup(panel);
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
        refreshSetting(k);
      });
    });
    updatePanelDependencies();

    panel.addEventListener('click', (event) => {
      const reset = event.target.closest && event.target.closest('.bt-section-reset');
      if (!reset) return;
      event.stopPropagation();
      const section = reset.closest('.bt-settings-section');
      if (!section || !confirm(t('confirmSectionReset'))) return;
      const values = {};
      section.querySelectorAll('[data-k]').forEach((input) => { values[input.dataset.k] = DEFAULTS[input.dataset.k]; });
      applySettingsValues(values);
    });

    panel.querySelector('#bt-test-ping').addEventListener('click', () => playPing(true));
    panel.querySelector('#bt-export').addEventListener('click', () => {
      openModal({
        title: t('exportTitle'), value: JSON.stringify(CONFIG, null, 2), readOnly: true, primary: t('ioCopy'),
        onPrimary: async (ta, note) => {
          ta.select();
          note.textContent = '';
          note.style.color = '';
          try {
            await writeClipboardText(ta.value);
            note.textContent = t('alertCopied');
          } catch (e) {
            note.style.color = '#ff6b6b';
            note.textContent = t('alertCopyFailed');
          }
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
        <div class="bt-modal-head bt-panel-header">
          ${uiIcon('document', 'bt-header-icon')}
          <span class="bt-modal-title" id="bt-modal-title"></span>
          <button class="bt-modal-x" type="button" aria-label="${t('ioClose')}">✕</button>
        </div>
        <div class="bt-body"><textarea spellcheck="false"></textarea>
        <div class="bt-modal-note"></div></div>
        <div class="bt-modal-foot bt-popup-footer">
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
    const edge = 8;
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const r = btn.getBoundingClientRect();
    const composer = findComposerInput();
    const composerField = composer && (
      composer.closest('.chat-input__textarea') ||
      composer.closest('[data-a-target="chat-input"]') ||
      composer
    );
    const candidates = [
      composerField,
      btn.closest && btn.closest('.chat-input'),
      document.querySelector('.chat-input'),
      document.querySelector('.chat-list--default'),
      document.querySelector('.chat-scrollable-area__message-container'),
      btn.closest && btn.closest('.stream-chat, [data-test-selector="chat-room-component-layout"]'),
      document.querySelector('.stream-chat'),
      document.querySelector('[data-test-selector="chat-room-component-layout"]'),
      document.querySelector('.channel-root__right-column'),
    ];
    let chatRect = null;
    for (const candidate of candidates) {
      if (!candidate) continue;
      const rect = candidate.getBoundingClientRect();
      if (rect.width >= 160 && rect.height > 0) { chatRect = rect; break; }
    }
    const fallbackWidth = CONFIG.chatWidthPx;
    const boundary = chatRect ? 0 : edge;
    const availableWidth = viewportWidth - boundary * 2;
    const anchorLeft = chatRect ? Math.max(0, Math.round(chatRect.left)) : null;
    const anchorRight = chatRect ? Math.min(viewportWidth, Math.round(chatRect.right)) : null;
    const measuredWidth = chatRect ? Math.max(0, anchorRight - anchorLeft) : fallbackWidth;
    const width = Math.min(availableWidth, measuredWidth);
    const maxLeft = Math.max(boundary, viewportWidth - width - boundary);
    const left = chatRect ? Math.min(anchorLeft, maxLeft) :
      Math.min(Math.max(edge, r.right - width), maxLeft);
    p.style.width = width + 'px';
    p.style.height = '';
    p.style.right = 'auto';
    p.style.left = left + 'px';
    const verticalShift = 4;
    if (r.top > window.innerHeight - r.bottom) {
      p.style.top = 'auto';
      p.style.bottom = (window.innerHeight - r.top + 10 - verticalShift) + 'px';
    } else {
      p.style.bottom = 'auto';
      p.style.top = (r.bottom + 10 + verticalShift) + 'px';
    }
  }

  function repositionOpenPanels() {
    [
      [panel, 'bt-settings-btn'],
      [dashPanel, 'bt-dash-btn'],
      [inboxPanel, 'bt-inbox-btn'],
      [chatControlPanel, 'bt-chat-control-btn'],
    ].forEach(([surface, buttonId]) => {
      const button = document.getElementById(buttonId);
      if (surface && button && surface.classList.contains('bt-open')) positionPanel(surface, button);
    });
  }

  function structurePopup(surface) {
    if (!surface) return null;
    const children = Array.from(surface.children);
    const existing = children.find((child) => child.classList.contains('bt-body'));
    if (existing) return existing;
    const header = children.find((child) => child.classList.contains('bt-panel-header')) || null;
    const footer = children.find((child) => child.classList.contains('bt-popup-footer')) || null;
    const body = document.createElement('div');
    body.className = 'bt-body';
    Array.from(surface.childNodes).forEach((node) => {
      if (node !== header && node !== footer) body.appendChild(node);
    });
    if (footer) surface.insertBefore(body, footer);
    else surface.appendChild(body);
    return body;
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

  const UI_ICON_SHAPES = Object.freeze({
    settings: [
      '<path d="M4 7h4m4 0h8M4 17h8m4 0h4"/>',
      '<circle cx="10" cy="7" r="2"/>',
      '<circle cx="14" cy="17" r="2"/>',
    ].join(''),
    dashboard: [
      '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/>',
      '<path d="M7.5 15.5v-4m4.5 4v-8m4.5 8v-6"/>',
    ].join(''),
    mentions: [
      '<path d="M5 5.5h14v10.5H9l-4 3V5.5Z"/>',
      '<path d="M8.5 9.5h7m-7 3h4.5"/>',
    ].join(''),
    chatTools: [
      '<path d="M4 6h9M4 11h6M4 16h5"/>',
      '<circle cx="15.5" cy="14.5" r="4"/>',
      '<path d="m18.5 17.5 2.5 2.5"/>',
    ].join(''),
    document: [
      '<path d="M6 3.5h8.5l3.5 3.5v13.5H6v-17Z"/>',
      '<path d="M14 3.5V8h4M9 12h6m-6 4h6"/>',
    ].join(''),
  });

  function uiIcon(name, className = '') {
    const classAttr = className ? ' class="' + className + '"' : '';
    const shape = UI_ICON_SHAPES[name] || UI_ICON_SHAPES.settings;
    return [
      '<svg',
      classAttr,
      ' viewBox="0 0 24 24" fill="none" stroke="currentColor"',
      ' stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"',
      ' aria-hidden="true">',
      shape,
      '</svg>',
    ].join('');
  }

  function makeFooterButton(id, title, innerHTML, onClick, beforeId) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.classList.add('bt-footer-btn');
      const existingWrap = document.getElementById(id + '-wrap');
      (existingWrap || existing).classList.add('bt-footer-control');
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
      wrap.classList.add('bt-footer-control');
      wrap.querySelectorAll('*').forEach((n) => { if (n !== btn && !btn.contains(n) && !n.contains(btn)) n.remove(); });
      ['data-a-target','data-a-id','aria-label','aria-haspopup','aria-expanded','aria-controls'].forEach((a) => { if (btn.removeAttribute) btn.removeAttribute(a); });
      btn.id = id; btn.type = 'button'; btn.title = title; btn.setAttribute('aria-label', title);
      btn.classList.add('bt-footer-btn');
      btn.innerHTML = innerHTML;
      btn.addEventListener('click', onClick);
      ctx.toolbar.insertBefore(wrap, before);
      return btn;
    }
    ctx.toolbar.insertBefore(styledButton(id, title, innerHTML, onClick, 'bt-footer-btn bt-footer-control'), before);
    return document.getElementById(id);
  }

  function ensureSettingsButton() {
    makeFooterButton('bt-settings-btn', t('settingsBtnTitle'),
      uiIcon('settings', 'bt-footer-icon'),
      (e) => {
        e.stopPropagation();
        if (!panel.classList.contains('bt-open')) closeFeaturePanels('settings');
        togglePanel(panel, document.getElementById('bt-settings-btn'));
        if (!panel.classList.contains('bt-open')) hideSettingTooltip(null);
      });
    updateFooterPanelButton('bt-settings-btn', panel && panel.classList.contains('bt-open'));
  }

  let lastSyncedLogin = '';

  function reSyncOnLogin() {
    const me = getMyLogin();
    if (me !== lastSyncedLogin) { lastSyncedLogin = me; syncAll(); }
  }

  let uiHealthObserver = null;
  function ensureUIHealthObserver() {
    if (uiHealthObserver || !document.body || !window.MutationObserver) return;
    uiHealthObserver = new MutationObserver((records) => {
      const relevant = records.some((record) => {
        const target = record.target && record.target.nodeType === 1 ? record.target : null;
        if (target && target.closest('.chat-scrollable-area__message-container, #bt-panel, .bt-pop, #bt-modal')) return false;
        return Array.from(record.removedNodes).some((node) => node.nodeType === 1 &&
          (node.matches('#bt-settings-btn, #bt-settings-btn-wrap') || node.querySelector('#bt-settings-btn'))) ||
          Array.from(record.addedNodes).some((node) => node.nodeType === 1 &&
            (node.matches('.chat-input__buttons-container, .stream-chat') || node.querySelector('.chat-input__buttons-container')));
      });
      if (relevant) scheduleTick();
    });
    uiHealthObserver.observe(document.body, { childList: true, subtree: true });
  }

  function ensureUI() { ensureTwitchTheme(); injectStyle(); applyVars(); ensurePanel(); ensureSettingsButton(); ensureExtraButtons(); ensureChatObserver(); ensureChatTopSurfaceObserver(); ensureUIHealthObserver(); applyAutoQuality(); syncFeatureSurfaces(); }

  function tick() { if (syncNavigationFeatures()) return; ensureUI(); applyLayout(); reSyncOnLogin(); }

  let tickFrame = null;
  function scheduleTick() {
    if (tickFrame) return;
    const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 16));
    tickFrame = schedule(() => {
      tickFrame = null;
      tick();
    });
  }

  function installNavigationHooks() {
    if (history.__btNavigationHooks) return;
    try { Object.defineProperty(history, '__btNavigationHooks', { value: true }); } catch (e) { return; }
    ['pushState', 'replaceState'].forEach((method) => {
      const native = history[method];
      if (typeof native !== 'function') return;
      history[method] = function () {
        const before = location.href;
        const result = native.apply(this, arguments);
        if (location.href !== before) scheduleTick();
        return result;
      };
    });
    window.addEventListener('popstate', scheduleTick);
    window.addEventListener('hashchange', scheduleTick);
  }

  installNavigationHooks();

  if (document.body) tick(); else document.addEventListener('DOMContentLoaded', tick);

  let bootstrapAttempts = 0, bootstrapTimer = null, maintenanceTimer = null;

  function startMaintenanceTimer() {
    if (maintenanceTimer) clearInterval(maintenanceTimer);
    maintenanceTimer = setInterval(tick, document.hidden ? 60000 : 30000);
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

  let resizeFrame = null;
  window.addEventListener('resize', () => {
    if (resizeFrame) return;
    const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 16));
    resizeFrame = schedule(() => {
      resizeFrame = null;
      applyLayout();
      repositionOpenPanels();
      if (activeHelp) positionSettingTooltip(activeHelp);
    });
  });
})();
