# Changelog

All notable changes to **BetterTwitch** are documented in this file.

## [1.3.0] - 2026-06-20

### Added
- **Auto-claim Drops** alongside the channel-points bonus chest (toggleable under Points).
- Import/export now use an in-panel textarea dialog instead of the browser's `prompt`/`alert`, so long settings JSON is no longer truncated.

### Changed
- Avatar lookups are batched into a single GraphQL request per ~80 ms window instead of one request per user.
- Moderator/VIP badge detection now falls back to `alt`/`aria-label` text so it degrades gracefully if Twitch rotates the badge IDs.

### Fixed
- **Hide Bits leaderboard** now reliably hides the leaderboard / sub-goal carousel at the top of chat. Twitch renders it with hashed class names and localized labels and cycles between slides, so it's now located by its `.tw-transition-group` wrapper (present on every slide) and hidden the moment it mounts via a `.chat-room__content` observer. This also hides the sibling goal panels in the same carousel.

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
- **Keep deleted messages visible** — mark single deletions, timeouts/bans, and full chat clears (each toggleable).
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
