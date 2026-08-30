# BetterTwitch

[![Version 2.0.6](https://img.shields.io/badge/version-2.0.6-9147ff?style=flat-square)](CHANGELOG.md)
[![License MIT](https://img.shields.io/badge/license-MIT-2ea44f?style=flat-square)](LICENSE)

<div align="center">

## 🌐 Choose your documentation language

[![English documentation](https://img.shields.io/badge/English-Open_documentation-007acc?style=for-the-badge)](README.en.md)
[![Deutsche Dokumentation](https://img.shields.io/badge/Deutsch-Dokumentation_öffnen-dd8b00?style=for-the-badge)](README.de.md)
[![Русская документация](https://img.shields.io/badge/Русский-Открыть_документацию-d13c58?style=for-the-badge)](README.ru.md)

**Complete feature guides and settings references are available in all three languages.**

</div>

A lightweight userscript that makes Twitch chat easier to follow, personalize, and manage. BetterTwitch adds contextual mentions, local search and filters, safer links, viewer context, notification sounds, moderation visibility, layout controls, and more - all from one settings panel in the chat footer.

## Highlights

- **Contextual Mentions panel** with unread count, search, surrounding messages, and jump-to-message
- **Extended live chat dashboard** with current/peak activity, session totals, active chatters, a richer graph, avatar rankings, and top emotes
- **Viewer hovercards** with Twitch avatars, session message count, mentions, and favorite emote
- **Unified message actions** for Reply, permission-aware Pin, Copy, and Google Translate, with keyboard access
- **Live character counter** using Twitch's detected message limit
- **Chat filters & search panel** opened from the footer, with quick filters, plain username/message search, result navigation, and an active-state indicator
- **Spam compression** that groups repeated messages while keeping every original expandable
- **Safer links** with visible destination domains and confirmation for suspicious-looking addresses
- **Visual highlights** for mentions, moderators, and VIPs
- **18 distinct notification sounds** with volume control and instant preview
- **Deleted-message visibility** for individual deletions, timeouts/bans, and full chat clears
- **Layout and appearance controls** for chat width, Comfortable/Compact/Accessible profiles, avatars, badges, separators, name contrast, accent color, the top-user slider, and community/pinned highlights
- **Convenience options** for source quality, raid opt-out, offline-channel refresh, channel-point bonuses, Drops, commands, and bot messages
- **English, German, and Russian UI**, with detailed tooltips for every setting
- **Modern, consistent full-width panel headers** for Settings, Mentions, Live Stats, Chat filters & search, notification controls, dialogs, viewer cards, and notices
- **Automatic light and dark themes** that follow Twitch’s current appearance setting
- **Unified footer launchers** placed before Twitch's settings cog, with matching accent styling, open-state feedback, even inter-button spacing, and a larger visual separator before Twitch's controls
- **Bounded long-session memory and adaptive maintenance**, including detached-observer cleanup, hidden-tab throttling, network timeouts, and notification-audio cleanup

## Install

1. Install the recommended userscript manager, [ScriptCat](https://scriptcat.org/en).
2. Open **[BetterTwitch.user.js](https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js)** and confirm the installation.
3. Open a Twitch channel and use the BetterTwitch panel buttons placed before Twitch's settings cog.

The userscript checks the same raw GitHub URL for updates through your userscript manager.

## Privacy

BetterTwitch has no analytics or telemetry. Settings stay in your browser. Repeated-message groups, chat filters, search, viewer data, mentions, and dashboard statistics stay local and use documented memory limits. Link safety checks URL text without contacting destination sites. Chat, dashboard, and hovercard avatars use Twitch GraphQL, and message text is sent to Google Translate only when you explicitly request a translation. Network requests time out after 15 seconds.

See the language-specific documentation for the complete settings reference and technical details.

---

Created by [YaneonY](https://yaneony.com) · [Changelog](CHANGELOG.md) · [MIT License](LICENSE)
