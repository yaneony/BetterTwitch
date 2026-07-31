# Changelog

All notable changes to **BetterTwitch** are documented in this file.

## [2.0.1] - 2026-07-31

### Fixed

- Moderator and VIP messages are highlighted reliably using Twitch IRC role metadata, current badge wrappers, and legacy badge identifiers.

## [2.0.0] - 2026-07-31

### Added

- **Contextual Mentions panel** with an unread counter, search, expandable surrounding messages, and jump-to-message actions.
- An extended **Live chat dashboard** with current and peak message rates, session totals, active and unique chatters, average pace, session duration, a filled one-minute activity graph, ranked chatters with optional avatars and activity bars, and expanded top-emote cards.
- **Viewer hovercards** with Twitch avatars, session-based message count, first-seen time, mentions, and most-used emote.
- Highlights and labels for Twitch's **first-time chatter** and **returning chatter** notices, each with a custom color.
- **Composer tools** with per-channel persistent drafts, session sent-message history, and an immediately updating character counter placed before Twitch's settings control with an accurate `0/500` empty state.
- A top-aligned, auto-hiding **unified message action bar** for Reply, Copy, and Translate, with localized tooltips, keyboard access, and no chat-line layout shift.
- **Safer message sending** with rapid-duplicate confirmation, large/multiline paste warnings, draft retention until Twitch confirms delivery, failed-send restoration, and reconnect status.
- **18 notification sounds** designed for chat alerts, with constant note pitch, stereo placement, volume control, and an in-panel test button.
- One detailed localized help control per visible setting row, shown only while its leading information symbol is hovered or keyboard-focused, combining related toggle/color explanations and covering exact behavior, dependencies, limits, storage, network use, and what each option does not change.
- Translation caching and request de-duplication for repeated messages.
- Translation actions for retrying failures, copying results, toggling original/translated text, and showing localized source/target language names.
- Expandable **repeated-message compression** that groups three or more identical messages received within twelve seconds without discarding the originals.
- A footer-launched **Chat filters & search panel** with quick filters, plain username/message search, and result navigation.
- **Safer link display** with visible destination domains and confirmation for shortened, numeric-IP, punycode, and misleading-looking hosts.
- Comfortable, Compact, and Accessible **chat appearance profiles**.
- Independent controls for hiding Twitch’s animated top-user slider and its separate community-highlight stack containing pinned messages.

### Changed

- Reorganized settings into General, Chat appearance, Chat tools, Message composer, Conversation quality, Highlights, Notifications, Deleted messages, Message filters, and Player & rewards.
- All setting-row labels, selector text, text inputs, values, and action buttons now use one consistent font size, including the Sound and Volume rows.
- Every settings row now follows one predictable left-to-right layout: information symbol, localized title, then the switch, selector, slider, color, or text field; enabled switches use the selected accent color.
- Settings, Mentions, Live Stats, and Chat filters & search headers now explicitly span the complete panel width.
- Google inline translation now follows the selected or auto-detected BetterTwitch interface language.
- New installations and settings resets now use the Message notification sound at 35% volume; existing saved sound and volume choices remain unchanged.
- Live chat search matches any part of a visible username, Twitch login, or message directly, without special search syntax.
- Message actions now share one consistent hover/focus toolbar instead of separate controls.
- BetterTwitch’s Reply action now uses Twitch’s native reply panel, and Twitch’s duplicate visible reply button is hidden.
- Settings, Mentions, Live Stats, notification controls, viewer cards, tooltips, transient notices, and import/export dialogs now share a modern card-based visual system with consistent focus states and reduced-motion support.
- Every BetterTwitch interface label, action, accessibility label, and setting tooltip is localized in English, German, and Russian.
- Settings that depend on another option are disabled until their parent option is enabled.
- Settings, Mentions, Live chat dashboard, and Chat filters & search panels now use the same width and only one BetterTwitch panel can be open at a time.
- Settings, Mentions, Live Stats, and Chat filters & search footer buttons now share the same accent styling and clearly indicate which panel is open.
- BetterTwitch footer buttons are now grouped before Twitch’s native settings cog, with small, even spacing between launchers and a larger visual gap separating them from Twitch’s controls.
- The panel header now shows the version linked to the BetterTwitch repository and the author linked to yaneony.com.
- Settings imports now accept only known keys with valid value types and ranges.
- Mention and deletion processing now uses room and message IDs more reliably.
- WebSocket listeners are wrapped once per event and can be removed correctly, preventing duplicate processing.
- Avatar requests remain batched and now use stricter Twitch-login validation and bounded caches.
- Mention notifications and session statistics now share one IRC parsing pass instead of processing every message twice.
- One-minute message-rate tracking now uses a compacting queue instead of shifting the full timestamp array for every expired message.
- Long-session collections are explicitly bounded, including mentions, context history, message metadata, viewer statistics, emotes, translations, avatars, deletion tasks, and per-channel sent history.
- Startup and maintenance work is adaptive: the fast bootstrap always ends, hidden tabs use a slower maintenance interval, dashboard rendering pauses while hidden, and reward polling stops when both auto-claim options are disabled.
- Chat, composer, top-of-chat surface, and layout observers now disconnect from detached Twitch nodes; chat mutation batches deduplicate affected message lines before enhancement.
- Translation and avatar requests now use 15-second timeouts, and generated notification-audio graphs disconnect after playback.
- All BetterTwitch panels now expose consistent dialog/accessibility states; Dashboard and Mentions also support Escape-to-close.

### Fixed

- Changing Twitch accounts during a session now refreshes the cached login used for mentions and replies.
- Dashboard session data resets when moving to a different chat room.
- Translation failures and repeated clicks are handled without leaving stale controls behind.
- Settings, Mentions, and Dashboard panel clicks no longer close the panel being used.
- Disabling username contrast restoration now preserves Twitch's original inline username color.
- Inline translations now fill the available message width and wrap safely.
- The interface-language selector now has the same visible row label treatment as other settings.
- Hiding the animated top-user slider no longer also hides Twitch’s separate community-highlight and pinned-message stack, and nested slider/highlight mounts are detected without processing ordinary chat-message mutations.

## [1.4.0] - 2026-06-20

### Added
- **Live chat dashboard** - a footer button opens a panel with messages/min, a live sparkline, top chatters, and a most-used-emote leaderboard, all computed from the chat WebSocket.
- **Inline translation** - a 🌐 button on message hover translates foreign-language messages in place (off by default).
- **Mention inbox** - a 🔔 footer button with an unread badge lists every message that @mentioned or replied to you this session.
- New **Extras** section in the settings panel for all of the above.

## [1.3.0] - 2026-06-20

### Added
- **Auto-claim Drops** alongside the channel-points bonus chest (toggleable under Points).
- Import/export now use an in-panel textarea dialog instead of the browser's `prompt`/`alert`, so long settings JSON is no longer truncated.

### Changed
- Avatar lookups are batched into a single GraphQL request per ~80 ms window instead of one request per user.
- Moderator/VIP badge detection now falls back to `alt`/`aria-label` text so it degrades gracefully if Twitch rotates the badge IDs.

### Fixed
- **Hide Bits leaderboard** now reliably hides the leaderboard / sub-goal carousel at the top of chat. Twitch renders it with hashed class names and localized labels and cycles between slides, so it's located positionally (carousel blocks above the message list, identified by their `.tw-transition-group`/progress-bar content) and hidden the moment it mounts via a `.chat-room__content` observer. The chat input and raid/host alerts are explicitly excluded so they're never hidden.

## [1.2.1] - 2026-06-20

### Added
- Message copy support via a `lineCopyText` helper for more reliable copying of message text.

## [1.2.0]

### Added
- **Boost name contrast** to lighten too-dark usernames for readability.
- **Copy button on hover** to copy any message's text.
- **Custom accent color** for the settings button and panel accents.
- Name-contrast, copy-button, and accent-color rows in the settings reference tables.

### Removed
- Keyword highlights and keyboard shortcuts (reverted after initial introduction).

## [1.1.0]

### Added
- **Stream Manager dashboard** support (`https://dashboard.twitch.tv/*`).
- **Esc-to-close** for the settings panel.
- Multilingual documentation (English / Deutsch / Русский) and the MIT license.

### Fixed
- Settings cog no longer goes missing in **Mod View**.

## [1.0.0]

### Added
- Initial release.
- **Keep deleted messages visible** - mark single deletions, timeouts/bans, and full chat clears (each toggleable).
- **Widen the chat panel** up to 1200px with the video resizing to match.
- **Show user avatars** next to names.
- **Hide badges**, **hide the Bits leaderboard**, and **separators between messages**.
- **Prefer source quality** automatically in the player.
- **Auto-claim the bonus chest** for channel points.
- **Sound on @mention** and **sound on replies to you**, with 12 built-in ping sounds, adjustable volume, and a test button.
- Highlight **@mentions**, **moderators**, and **VIPs** with per-type colors.
- **Filters**: hide `!` commands and hide bot messages (configurable bot list).
- Multi-language UI (English / Deutsch / Русский) with auto-detection.
- Export / import / reset settings, stored in `localStorage`.
