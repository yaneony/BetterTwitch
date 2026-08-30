# Changelog

All notable changes to **BetterTwitch** are documented in this file.

## [Unreleased]

### Fixed

- Repeated-message groups now promote a connected message when their original row scrolls away, and remaining rows are ungrouped when fewer than three are still visible.
- Repeated-message signatures now retain Twitch emote names instead of treating image-only differences as identical text.
- Custom chat width now reaches its alternate Twitch-layout fallback and restores the exact inline styles that existed before BetterTwitch changed them.
- Settings import now rejects unknown or misspelled keys while preserving the supported legacy raid-protection migration.
- Settings export reports clipboard success only after the browser confirms the copy and gives a manual-copy hint when permission is unavailable.
- Mentions help now correctly explains that channel changes retain mentions during the same page session.

### Development

- Added dependency-free Node regression tests for settings imports, spam-group lifecycle and signatures, layout restoration, clipboard failures, localization coverage, and mention-history documentation.

## [2.1.0] - 2026-08-30

### Added

- **Return to original channel after raids** follows a raid chain for a configurable 5 to 60 minutes, then returns to the channel where the first raid began; `0` disables automatic return. Later raids keep the original deadline, and offline refresh remains disabled on raided destinations even when they go offline, resuming only on the original channel.
- **Offline refresh interval** reloads offline channel pages every 1 to 60 minutes, with `0` disabling the feature. Channel state is checked directly with Twitch and non-channel pages are excluded.
- The **Mentions panel** keeps only the 50 newest mentions and caps its unread badge at 50.

### Changed

- BetterTwitch panels, cards, controls, badges, and overlays now share a compact 5-pixel corner radius; intentionally circular avatars, indicators, and control handles remain round.

## [2.0.6] - 2026-07-31

### Fixed

- Viewer hovercards now use their measured size and pointer position, remain clamped inside the viewport, and open above the username when there is not enough room below. This fixes highlighted-message hovercards appearing mostly off-screen on the left.
- Mention jump buttons now prefer BetterTwitch’s resolved message ID and fall back to matching the visible author and message text when Twitch omits or changes DOM IDs.
- Removed a stale resize callback left behind by the removed safer-sending notice.

## [2.0.5] - 2026-07-31

### Changed

- Reduced the maximum height of the settings window from 78% to 64% of the viewport while keeping its contents scrollable.
- Moved Character counter from the Message composer section to Chat tools.

### Removed

- Removed per-channel draft preservation and sent-message history, including their settings, storage, keyboard handling, translations, and documentation. Previously stored channel drafts are cleared on upgrade.
- Removed safer message sending, including duplicate-send blocking, large-paste warnings, failed-send restoration, reconnect status, and their supporting settings and translations.

## [2.0.4] - 2026-07-31

### Removed

- Removed the first-seen timestamp from viewer hovercards and stopped tracking it in session user profiles.

## [2.0.3] - 2026-07-31

### Removed

- Removed first-time and returning-chatter highlighting, including its message metadata, DOM labels, styles, settings, and translations.

### Fixed

- Prevented first-time and returning-chatter labels from recursively triggering the chat mutation observer and consuming unbounded memory.
- Failed avatar lookups are negatively cached per chat line instead of repeatedly inserting and removing images.
- Avatar request concurrency and pending work are bounded, pending avatar updates weakly reference DOM nodes, and detached chat-search and spam-group elements are released promptly.
- BetterTwitch now isolates its own chat-row DOM updates from Twitch's chat observer to prevent future self-triggering mutation loops.

## [2.0.2] - 2026-07-31

### Added

- The unified message action bar includes Twitch's native Pin action only when Twitch exposes it to the signed-in moderator, administrator, or channel owner.
- BetterTwitch surfaces automatically follow Twitch's light or dark theme, including theme changes made while the page is open.

### Fixed

- "Hide top users slider" also recognizes Twitch's newer rotating channel-leaderboard header, including its empty gift-subscription panel.

## [2.0.1] - 2026-07-31

### Fixed

- Moderator, Lead Moderator, and VIP messages are highlighted reliably using Twitch IRC role metadata, localized current badge wrappers, and legacy badge identifiers.

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
