# BetterTwitch

**English** · [Deutsch](README.de.md) · [Русский](README.ru.md)

A lightweight userscript that makes Twitch chat and the player nicer to use - keep deleted messages visible, widen the chat, show avatars, auto-claim channel points, get pinged on mentions, highlight mods/VIPs, and more. Everything is configurable from a settings panel that lives right in the chat footer (next to the **Send** button), and it works in both normal chat and **Mod View**.

> Author: **YaneonY**

<!-- Add docs/screenshot.png (settings panel) and uncomment:
![BetterTwitch settings panel](docs/screenshot.png)
-->

---

## Features

### Deleted messages
- **Keep deleted messages visible** instead of letting Twitch hide them.
- Mark single deletions, timeouts/bans, and full chat clears with a strikethrough and a 🗑 icon.
- Each category can be toggled independently.

### Chat
- **Widen the chat panel** to any width up to 1200px (the video resizes to match).
- **Show user avatars** next to names.
- **Boost name contrast** so too-dark usernames stay readable.
- **Copy button on hover** to copy any message text.
- **Hide badges**, **hide the Bits leaderboard**, and add **separators between messages**.

### Player
- **Prefer source quality** automatically.

### Channel points
- **Auto-claim the bonus chest** when it appears.
- **Auto-claim Drops** when a claim button is available.

### Notifications
- **Sound on @mention** and **sound on replies to you**.
- 12 built-in ping sounds with adjustable volume and a test button.

### Highlights
- Highlight **@mentions**, **moderators**, and **VIPs**, each with a customizable color.

### Filters
- **Hide `!` commands** and **hide bot messages** (configurable bot name list).

### Other
- **Custom accent color** for the panel and button.
- Multi-language UI: **English / Deutsch / Русский** (auto-detected, or pick one).
- Export / import / reset your settings.

---

## Installation

### 1. Install a userscript manager
You need a userscript manager extension first. Any of these work:

- **[Tampermonkey](https://www.tampermonkey.net/)** (Chrome, Edge, Firefox, Safari, Opera, Yandex)
- **[Violentmonkey](https://violentmonkey.github.io/)** (Chrome, Edge, Firefox)

### 2. Install BetterTwitch
With a userscript manager installed, open this link and confirm the install:

**[Install BetterTwitch.user.js](https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js)**

The script auto-updates from the same URL.

### 3. Use it
Open any [twitch.tv](https://www.twitch.tv/) channel. A red ⚙ **BetterTwitch** icon appears in the chat footer, just to the left of the **Send** button (and in the same spot in Mod View). Click it to open the settings panel - changes are saved automatically.

---

## ⚠️ Chrome / Yandex users - extra step

Recent Chrome and Yandex versions require you to manually allow user scripts, otherwise the script will not run.

Copy the link below into your browser's address bar to open the extension's page, then turn on **"Allow user scripts"** (in Chrome the address may be `chrome://extensions/?id=...`). After that everything will work.

```
browser://extensions/?id=mfdhdgbonjidekjkjmjaneanmdmpmidf
```

---

## Settings reference

| Section | Option | Description |
| --- | --- | --- |
| Language | Language | UI language (Auto / English / Deutsch / Русский) |
| Deleted messages | Mark single deletions | Show single deleted messages with strikethrough |
| | Mark timeouts / bans | Show messages removed by a timeout/ban |
| | Mark full chat clears | Show messages removed by a full chat clear |
| Chat | Widen chat panel | Enable a wider chat column |
| | Width | Chat width in px (340–1200) |
| | Hide badges | Hide chat badges |
| | Show user avatars | Show profile pictures next to names |
| | Boost name contrast | Lighten too-dark usernames for readability |
| | Copy button on hover | Show a button to copy a message's text |
| | Separator between messages | Draw a line between messages |
| | Hide Bits leaderboard | Hide the Bits leaderboard header |
| Player | Prefer source quality | Force source/chunked video quality |
| Points | Auto-claim bonus chest | Click the channel-points bonus chest automatically |
| | Auto-claim Drops | Click the Drops claim button automatically |
| Notifications | Sound on @mention | Play a sound when your name is mentioned |
| | Sound on replies to you | Play a sound when someone replies to you |
| | Sound / Volume | Choose the ping sound and volume |
| Highlights | Highlight @mentions / mods / VIPs | Tint matching messages (with per-type color) |
| Theme | Accent color | Color of the settings button and panel accents |
| Filter | Hide `!` commands | Hide messages starting with `!` |
| | Hide bot messages | Hide messages from listed bot accounts |

Use **Export** / **Import** to move settings between browsers, or **Reset** to restore defaults.

---

## How it works

- Hooks the Twitch chat WebSocket to intercept `CLEARMSG` / `CLEARCHAT` so deleted messages can be marked instead of removed, and to detect mentions/replies for sounds.
- Observes the chat DOM to style messages, add avatars, and apply filters as messages arrive.
- Injects the settings button into the chat footer, anchored to the **Send** button so it appears in the same spot in both normal chat and Mod View.

Settings are stored in your browser's `localStorage`.

---

## Compatibility

- `https://www.twitch.tv/*` (channel pages and Mod View `/moderator/<channel>`) and the Stream Manager dashboard (`https://dashboard.twitch.tv/*`).
- Tested with Tampermonkey and Violentmonkey on Chromium-based browsers and Firefox.

---

## Privacy

- Settings are saved locally (`localStorage`, key `BetterTwitch-settings`).
- Avatars are fetched from Twitch's public GraphQL API only when **Show user avatars** is enabled.
- No telemetry and no external servers, other than the auto-update URL.

---

## License

Released under the [MIT License](LICENSE).
