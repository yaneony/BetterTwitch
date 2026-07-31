# BetterTwitch 2.0

<div align="center">

## 🌐 Documentation languages

[![English documentation](https://img.shields.io/badge/English-Current_language-9147ff?style=for-the-badge)](README.en.md)
[![Deutsche Dokumentation](https://img.shields.io/badge/Deutsch-Dokumentation_öffnen-007acc?style=for-the-badge)](README.de.md)
[![Русская документация](https://img.shields.io/badge/Русский-Открыть_документацию-007acc?style=for-the-badge)](README.ru.md)

</div>

BetterTwitch is a lightweight userscript focused on making Twitch chat easier to read and use. It works on channel chat, Mod View, and Stream Manager pages where Twitch exposes the supported chat interface.

> Created by [YaneonY](https://yaneony.com) · [Version history](CHANGELOG.md)

## Features

### Mentions and conversation context

- A dedicated **Mentions panel** collects messages that @mention you or directly reply to you.
- An unread badge shows how many mentions arrived while the panel was closed.
- Search mentions by their visible content, expand a result to see nearby messages, or jump to the original message while it is still in chat.
- Store from zero to three messages before and after each mention for context.
- The panel is session-based and clears when you reload the page.

### Live chat dashboard

- Track current and peak messages per minute, total messages, unique and recently active chatters, average pace, and session duration.
- Read a filled one-minute activity graph, an eight-person ranking with proportional activity bars and optional Twitch avatars, and six expanded top-emote cards.
- Statistics reset when you move to another chat room and are never uploaded or written to storage.

### Viewer context

- Hover over a username to open a **viewer hovercard** with that viewer's Twitch avatar.
- See that viewer's message count, first-seen time, number of mentions, and most-used emote for the current session.

### Message tools

- Use one top-aligned, non-shifting **message action bar** for Reply, Pin, Copy, and Translate. Every action has a larger localized tooltip and is reachable by keyboard; Reply and Pin use Twitch’s native controls, and Pin appears only when Twitch makes it available to your account.
- Copy readable message text without BetterTwitch controls, or translate it with Google into the selected - or auto-detected - BetterTwitch interface language.
- Retry a failed translation, copy the translated text, toggle between original and translation, and see localized detected/target language names.
- Hide messages beginning with `!` and messages from a configurable list of bot accounts.

### Message composer

- Preserve unfinished drafts separately for each channel and restore them when you return.
- Browse messages sent during the current page session with `↑` and `↓` at the start or end of the composer.
- Show a live character counter using Twitch's detected limit.
- Block the first rapid duplicate send and require a second attempt within three seconds to confirm it.
- Warn after a large or multiline paste, retain a submitted draft until Twitch confirms it, restore an unconfirmed message, and show a subtle reconnecting indicator.

### Conversation quality

- Collapse three or more identical messages received within twelve seconds into one expandable row without deleting the originals.
- Open one footer button to filter the current chat by mentions, moderators, questions, links, or emotes in a matching BetterTwitch panel.
- Search visible chat locally by typing any part of a username, Twitch login, or message - no prefixes or special syntax required - then move between results.
- Display real destination domains beside links and confirm shortened, numeric-IP, punycode, or misleading-looking addresses before opening them.

### Notifications and highlights

- Play a sound when another chatter @mentions you and, optionally, when someone replies to you.
- Choose from 18 short sounds: Message, Pop, Drop, Knock, Glass, Pluck, Orbit, Pixel, Bell, Spark, Chime, Double Tap, Woodblock, Marble, Quartz, Blink, Ripple, and Chord.
- Preview sounds in the settings panel and set their volume independently of Twitch; new installations and resets use Message at 35%.
- Highlight mentions, moderators, and VIPs with separate colors.

### Deleted messages

- Keep individually deleted messages visible and mark them with a strikethrough and trash icon.
- Independently preserve messages removed by a timeout/ban or a full chat clear.
- BetterTwitch can only preserve deletion events received while it is running.

### Chat appearance

- Widen the chat column from 340 to 1200 pixels and resize the video area to match.
- Show Twitch profile avatars beside chat usernames and top-chatters in the dashboard.
- Improve the contrast of usernames that are too dark for Twitch's chat background.
- Independently hide chat badges, the animated top-user slider, or the community-highlight and pinned-message stack.
- Add separators between messages and choose a custom BetterTwitch accent color.
- Choose Comfortable, Compact, or Accessible chat profiles for balanced, dense, or larger high-contrast presentation.

### Player and rewards

- Prefer Twitch's source/chunked video quality.
- Automatically claim the channel-points bonus chest.
- Automatically click visible Twitch Drops claim buttons.

### Settings experience

- Settings are grouped into General, Chat appearance, Chat tools, Message composer, Conversation quality, Highlights, Notifications, Deleted messages, Message filters, and Player & rewards.
- Settings, Mentions, Live Stats, Chat filters & search, notification controls, dialogs, viewer cards, tooltips, and notices use one responsive card-based visual system with clear focus states and reduced-motion support.
- BetterTwitch automatically follows Twitch’s current light or dark theme, including changes made without reloading the page.
- Hover or keyboard-focus the information symbol beside any setting for an explicit description.
- Every BetterTwitch label, action, accessibility label, and tooltip is available in English, German, and Russian.
- Dependent controls remain disabled until their parent feature is enabled.
- Settings, Mentions, Live chat dashboard, and Chat filters & search use matching panels, and opening one BetterTwitch panel closes the others.
- All BetterTwitch launchers share one accent/open-state design and are grouped before Twitch's settings cog with a small visual gap.
- Export, import, or reset settings from the panel. Imported data is checked against known setting names, types, and ranges.

## Installation

1. Install the recommended userscript manager, [ScriptCat](https://scriptcat.org/en).

2. Open **[Install BetterTwitch.user.js](https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js)** and confirm the installation.
3. Open a Twitch channel. BetterTwitch's panel buttons appear in the chat footer immediately before Twitch's settings cog.

Updates are delivered from the same raw GitHub URL by your userscript manager. If a Chromium-based browser blocks userscripts by default, enable user-script access for the manager on the browser's extension settings page.

## Settings reference

| Section | Option | What it does |
| --- | --- | --- |
| General | Language | Uses Auto-detect, English, Deutsch, or Русский for BetterTwitch and as the translation target. |
| General | Accent color | Sets the accent used by BetterTwitch buttons, headings, and active controls. |
| Chat appearance | Widen chat panel | Enables BetterTwitch's custom chat-column width. |
| Chat appearance | Width | Sets chat width from 340 to 1200 px; available when widening is enabled. |
| Chat appearance | Appearance profile | Switches between Comfortable, Compact, and Accessible chat presentation. |
| Chat appearance | Show user avatars | Fetches and displays Twitch profile images beside chat usernames and dashboard rankings. |
| Chat appearance | Hide badges | Hides visible broadcaster, moderator, VIP, subscriber, and other chat badges. |
| Chat appearance | Boost name contrast | Lightens username colors that are difficult to read on the dark background. |
| Chat appearance | Separator between messages | Adds a subtle horizontal divider between chat lines. |
| Chat appearance | Hide top users slider | Hides only the animated supporter ranking above chat, whether it currently shows Bits cheerers, gift-sub gifters, or another top-user category. |
| Chat appearance | Hide community highlights | Hides the separate highlight stack above messages, including pinned-message cards, without affecting the top-user slider. |
| Chat tools | Live chat dashboard | Adds current and peak rates, totals, active/unique chatter metrics, a one-minute graph, avatar rankings, and top emotes. |
| Chat tools | Viewer hovercards | Shows the viewer's Twitch avatar and locally collected session details when hovering over a username. |
| Chat tools | Copy button on hover | Adds a control for copying readable message text. |
| Chat tools | Translate on hover | Adds a Google translation control to each message. |
| Chat tools | Mentions panel | Adds the searchable Mentions button and unread badge. |
| Chat tools | Context messages | Stores 0–3 messages on each side of a mention; available with Mentions enabled. |
| Message composer | Preserve drafts per channel | Stores unfinished text locally for each channel and restores it when you return. |
| Message composer | Sent-message history | Uses Up/Down to browse messages sent during the current page session. |
| Message composer | Character counter | Shows current message length and Twitch's detected limit. |
| Message composer | Safer message sending | Guards rapid duplicates, warns about large pastes, restores unconfirmed messages, and shows reconnect status. |
| Conversation quality | Compress repeated messages | Groups three or more identical messages received within twelve seconds and keeps them expandable. |
| Conversation quality | Quick chat filters | Adds footer-panel filters for visible mentions, roles, questions, links, or emotes. |
| Conversation quality | Live chat search | Searches visible usernames, Twitch logins, and message text directly without prefixes, with previous/next result navigation. |
| Conversation quality | Safer link display | Shows destination domains and confirms suspicious-looking links. |
| Highlights | Highlight @mentions | Tints messages that mention your current Twitch username. |
| Highlights | Highlight moderators | Tints messages whose moderator status can be detected. |
| Highlights | Highlight VIPs | Tints messages whose VIP status can be detected. |
| Highlights | Color controls | Sets an independent color for each enabled highlight type. |
| Notifications | Sound on @mention | Plays the selected sound when someone else mentions your username. |
| Notifications | Sound on replies to you | Also notifies for direct replies; available when mention sounds are enabled. |
| Notifications | Sound | Selects and previews one of the 18 notification sounds; new installations and resets default to Message. |
| Notifications | Volume | Sets notification volume without changing Twitch player volume; new installations and resets default to 35%. |
| Deleted messages | Mark single deletions | Preserves and marks individually deleted messages. |
| Deleted messages | Mark timeouts / bans | Preserves and marks visible messages removed for one user. |
| Deleted messages | Mark full chat clears | Preserves and marks visible messages when the whole room is cleared. |
| Message filters | Hide `!` commands | Locally hides messages whose visible text starts with `!`. |
| Message filters | Hide bot messages | Locally hides messages from the configured bot list. |
| Message filters | Bot names | Sets a comma-separated, case-insensitive list of Twitch login names. |
| Player & rewards | Prefer source quality | Saves Twitch's source-quality preference in local storage. |
| Player & rewards | Auto-claim bonus chest | Clicks the channel-points bonus chest when Twitch displays it. |
| Player & rewards | Auto-claim Drops | Clicks visible Twitch Drops claim buttons. |

## How it works

- The script wraps Twitch chat WebSockets at page start. It reads IRC message metadata for mentions, replies, chatter notices, and deletion events.
- `CLEARMSG` and `CLEARCHAT` events can be intercepted so matching messages are marked instead of immediately removed.
- A DOM observer enhances new Twitch chat lines with styling, buttons, avatars, expandable duplicate groups, safer domains, filters, and locally collected viewer details.
- A footer button opens the local filters/search panel without modifying Twitch’s native composer suggestions.
- Twitch changes its page without full reloads, so BetterTwitch combines DOM observers with a lightweight maintenance check to reconnect its controls and layout.

## Performance and lifecycle

- The fast startup check stops as soon as chat is ready and always ends after ten seconds; maintenance then runs every two seconds in a visible tab and every ten seconds while hidden.
- DOM observers are disconnected when Twitch replaces or removes their chat, composer, top-of-chat surfaces, or layout targets. New chat mutations are deduplicated by message line before enhancement.
- The dashboard refreshes only while its panel is open and pauses rendering in hidden tabs. Reward polling runs only while at least one auto-claim option is enabled.
- Audio nodes disconnect after each notification. Translation and avatar requests time out after 15 seconds, and repeated requests share one in-flight operation.
- Long-session memory is bounded: 50 mentions, 250 context messages, 500 message-metadata records, 1,000 viewer profiles, 1,000 dashboard chatter records, 100 emotes per viewer, 1,000 dashboard emotes, 300 translations, and 500 avatar results.
- Sent-message history keeps up to 50 entries for each of the 30 most recently encountered channels. Search and filters operate only on messages currently rendered by Twitch.

## Data and privacy

- Settings are stored in browser `localStorage` under `BetterTwitch-settings`.
- Unfinished channel drafts are stored in browser `localStorage` under `BetterTwitch-chat-drafts`, with at most 30 channels retained. A Twitch-confirmed send or clearing the composer removes the corresponding draft.
- Mention and sent-message history live only in memory for the current page session and use the limits listed above. Viewer hovercards and dashboard statistics are additionally reset when the chat room changes.
- Duplicate groups, chat filters, and search results stay local to the current page. Link safety examines URL text only and does not fetch destination pages.
- If **Show user avatars** or **Viewer hovercards** is enabled, validated Twitch login names needed for chat, dashboard, or hovercard profile images are sent in batched requests to Twitch's GraphQL endpoint.
- If you click **Translate**, that message's text is sent to `translate.googleapis.com`; translations are cached in memory for the session.
- BetterTwitch contains no telemetry, analytics, advertising, or BetterTwitch-operated backend.

## Compatibility

- Matches `https://www.twitch.tv/*` and `https://dashboard.twitch.tv/*`.
- Intended for current desktop browsers supported by ScriptCat.
- Twitch frequently changes internal markup. If a control disappears, reload the page first, then report the affected Twitch page and browser.

## License

Released under the [MIT License](LICENSE).
