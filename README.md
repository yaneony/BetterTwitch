# BetterTwitch

[![Version 2.0.0](https://img.shields.io/badge/version-2.0.0-9147ff?style=flat-square)](CHANGELOG.md)
[![License MIT](https://img.shields.io/badge/license-MIT-2ea44f?style=flat-square)](LICENSE)

A lightweight userscript that makes Twitch chat easier to follow, personalize, and manage. BetterTwitch adds contextual mentions, local search and filters, safer links, viewer context, notification sounds, moderation visibility, layout controls, and more—all from one settings panel in the chat footer.

<div align="center">

### Documentation

[![English](https://img.shields.io/badge/English-Read_docs-2ea44f?style=for-the-badge)](README.en.md)
[![Deutsch](https://img.shields.io/badge/Deutsch-Anleitung-2ea44f?style=for-the-badge)](README.de.md)
[![Русский](https://img.shields.io/badge/Русский-Документация-2ea44f?style=for-the-badge)](README.ru.md)

</div>

## Highlights

- **Contextual Mentions panel** with unread count, search, surrounding messages, and jump-to-message
- **Extended live chat dashboard** with current/peak activity, session totals, active chatters, a richer graph, avatar rankings, and top emotes
- **Viewer hovercards** with session activity, first-seen time, mentions, and favorite emote
- **Unified message actions** for Reply, Copy, and Google Translate, with keyboard access
- **Safer composer** with per-channel drafts, history, character count, duplicate protection, paste warnings, failed-send recovery, and reconnect status
- **Chat filters & search panel** opened from the footer, with quick filters, plain username/message search, result navigation, and an active-state indicator
- **Spam compression** that groups repeated messages while keeping every original expandable
- **Safer links** with visible destination domains and confirmation for suspicious-looking addresses
- **Visual highlights** for mentions, moderators, VIPs, first-time chatters, and returning chatters
- **18 distinct notification sounds** with volume control and instant preview
- **Deleted-message visibility** for individual deletions, timeouts/bans, and full chat clears
- **Layout and appearance controls** for chat width, Comfortable/Compact/Accessible profiles, avatars, badges, separators, name contrast, and accent color
- **Convenience options** for source quality, channel-point bonuses, Drops, commands, and bot messages
- **English, German, and Russian UI**, with detailed tooltips for every setting
- **Modern, consistent full-width panel headers** for Settings, Mentions, Live Stats, Chat filters & search, notification controls, dialogs, viewer cards, and notices
- **Unified footer launchers** placed before Twitch's settings cog, with matching accent styling, open-state feedback, and a small visual separator
- **Bounded long-session memory and adaptive maintenance**, including detached-observer cleanup, hidden-tab throttling, network timeouts, and notification-audio cleanup

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Open **[BetterTwitch.user.js](https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js)** and confirm the installation.
3. Open a Twitch channel and use the BetterTwitch panel buttons placed before Twitch's settings cog.

The userscript checks the same raw GitHub URL for updates through your userscript manager.

## Validation

Run `node test/validate.js` to check JavaScript syntax, version consistency, all localized UI and tooltip keys, one control per setting, runtime lifecycle guards, and the complete settings tables in every localized README.

## Privacy

BetterTwitch has no analytics or telemetry. Settings and optional unfinished drafts stay in your browser. Repeated-message groups, chat filters, search, viewer data, mentions, dashboard statistics, and sent-message history stay local and use documented memory limits. Link safety checks URL text without contacting destination sites. Optional avatars use Twitch GraphQL, and message text is sent to Google Translate only when you explicitly request a translation. Network requests time out after 15 seconds.

See the language-specific documentation for the complete settings reference and technical details.

---

Created by [YaneonY](https://yaneony.com) · [Changelog](CHANGELOG.md) · [MIT License](LICENSE)
