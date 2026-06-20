# BetterTwitch

[English](README.en.md) · **Deutsch** · [Русский](README.ru.md)

Ein schlankes Userscript, das den Twitch-Chat und den Player angenehmer macht - gelöschte Nachrichten sichtbar halten, den Chat verbreitern, Avatare anzeigen, Kanalpunkte automatisch einlösen, bei Erwähnungen benachrichtigt werden, Moderatoren/VIPs hervorheben und mehr. Alles ist über ein Einstellungs-Panel konfigurierbar, das direkt in der Chat-Fußleiste sitzt (neben dem **Senden**-Button), und es funktioniert sowohl im normalen Chat als auch in der **Moderatoransicht**.

> Autor: **YaneonY**

<!-- docs/screenshot.png (Einstellungs-Panel) hinzufügen und auskommentieren:
![BetterTwitch Einstellungs-Panel](docs/screenshot.png)
-->

---

## Funktionen

### Gelöschte Nachrichten
- **Gelöschte Nachrichten sichtbar halten**, statt sie von Twitch ausblenden zu lassen.
- Einzellöschungen, Timeouts/Banns und komplette Chat-Löschungen mit Durchstreichung und einem 🗑-Symbol markieren.
- Jede Kategorie lässt sich einzeln ein-/ausschalten.

### Chat
- **Chat-Panel verbreitern** auf bis zu 1200px (das Video passt sich an).
- **Benutzer-Avatare** neben den Namen anzeigen.
- **Namens-Kontrast verbessern**, damit zu dunkle Namen lesbar bleiben.
- **Kopier-Button beim Überfahren** zum Kopieren von Nachrichtentext.
- **Abzeichen ausblenden**, **Bits-Bestenliste ausblenden** und **Trennlinien zwischen Nachrichten** hinzufügen.

### Player
- **Quellqualität automatisch bevorzugen.**

### Kanalpunkte
- **Bonus-Truhe automatisch einlösen**, sobald sie erscheint.
- **Drops automatisch einlösen**, sobald ein Einlösen-Button verfügbar ist.

### Benachrichtigungen
- **Ton bei @Erwähnung** und **Ton bei Antworten an dich.**
- 12 integrierte Töne mit einstellbarer Lautstärke und Test-Button.

### Hervorhebungen
- **@Erwähnungen**, **Moderatoren** und **VIPs** hervorheben, jeweils mit anpassbarer Farbe.

### Filter
- **`!`-Befehle ausblenden** und **Bot-Nachrichten ausblenden** (konfigurierbare Bot-Namensliste).

### Extras
- **Live-Chat-Dashboard** — Nachrichten/Min, Live-Sparkline, Top-Chatter und Top-Emotes.
- **Beim Überfahren übersetzen** — fremdsprachige Nachrichten direkt übersetzen.
- **Erwähnungs-Postfach** — Liste aller Erwähnungen/Antworten an dich mit Ungelesen-Zähler.

### Sonstiges
- **Eigene Akzentfarbe** für Panel und Button.
- Mehrsprachige Oberfläche: **English / Deutsch / Русский** (automatisch erkannt oder manuell wählbar).
- Einstellungen exportieren / importieren / zurücksetzen.

---

## Installation

### 1. Userscript-Manager installieren
Du brauchst zuerst eine Userscript-Manager-Erweiterung. Eine davon genügt:

- **[Tampermonkey](https://www.tampermonkey.net/)** (Chrome, Edge, Firefox, Safari, Opera, Yandex)
- **[Violentmonkey](https://violentmonkey.github.io/)** (Chrome, Edge, Firefox)

### 2. BetterTwitch installieren
Mit installiertem Userscript-Manager diesen Link öffnen und die Installation bestätigen:

**[BetterTwitch.user.js installieren](https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js)**

Das Skript aktualisiert sich automatisch über dieselbe URL.

### 3. Verwenden
Öffne einen beliebigen [twitch.tv](https://www.twitch.tv/)-Kanal. Ein rotes ⚙ **BetterTwitch**-Symbol erscheint in der Chat-Fußleiste, direkt links vom **Senden**-Button (und an derselben Stelle in der Moderatoransicht). Klicke darauf, um das Einstellungs-Panel zu öffnen - Änderungen werden automatisch gespeichert.

---

## ⚠️ Chrome- / Yandex-Nutzer - zusätzlicher Schritt

Aktuelle Chrome- und Yandex-Versionen verlangen, dass du Userscripts manuell erlaubst, sonst wird das Skript nicht ausgeführt.

Kopiere den Link unten in die Adressleiste deines Browsers, um die Seite der Erweiterung zu öffnen, und aktiviere dann **„Benutzerskripte zulassen“** (in Chrome lautet die Adresse evtl. `chrome://extensions/?id=...`). Danach funktioniert alles.

```
browser://extensions/?id=mfdhdgbonjidekjkjmjaneanmdmpmidf
```

---

## Einstellungsübersicht

| Bereich | Option | Beschreibung |
| --- | --- | --- |
| Sprache | Sprache | Oberflächensprache (Auto / English / Deutsch / Русский) |
| Gelöschte Nachrichten | Einzellöschungen markieren | Einzeln gelöschte Nachrichten durchgestrichen anzeigen |
| | Timeouts / Banns markieren | Durch Timeout/Bann entfernte Nachrichten anzeigen |
| | Komplette Chat-Löschungen markieren | Durch komplette Chat-Löschung entfernte Nachrichten anzeigen |
| Chat | Chat-Panel verbreitern | Breitere Chat-Spalte aktivieren |
| | Breite | Chat-Breite in px (340–1200) |
| | Abzeichen ausblenden | Chat-Abzeichen ausblenden |
| | Benutzer-Avatare anzeigen | Profilbilder neben den Namen anzeigen |
| | Namens-Kontrast verbessern | Zu dunkle Namen für die Lesbarkeit aufhellen |
| | Kopier-Button beim Überfahren | Button zum Kopieren des Nachrichtentexts anzeigen |
| | Trennlinie zwischen Nachrichten | Linie zwischen Nachrichten zeichnen |
| | Bits-Bestenliste ausblenden | Bits-Bestenlisten-Kopf ausblenden |
| Player | Quellqualität bevorzugen | Quell-/Chunked-Videoqualität erzwingen |
| Punkte | Bonus-Truhe automatisch einlösen | Kanalpunkt-Bonus-Truhe automatisch anklicken |
| | Drops automatisch einlösen | Drops-Einlösen-Button automatisch anklicken |
| Benachrichtigungen | Ton bei @Erwähnung | Ton abspielen, wenn dein Name erwähnt wird |
| | Ton bei Antworten an dich | Ton abspielen, wenn dir jemand antwortet |
| | Ton / Lautstärke | Ton und Lautstärke wählen |
| Hervorhebungen | @Erwähnungen / Mods / VIPs hervorheben | Passende Nachrichten einfärben (mit eigener Farbe je Typ) |
| Design | Akzentfarbe | Farbe des Einstellungs-Buttons und der Panel-Akzente |
| Filter | `!`-Befehle ausblenden | Mit `!` beginnende Nachrichten ausblenden |
| | Bot-Nachrichten ausblenden | Nachrichten gelisteter Bot-Konten ausblenden |

Mit **Exportieren** / **Importieren** kannst du Einstellungen zwischen Browsern übertragen, mit **Zurücksetzen** auf Standard zurücksetzen.

---

## Funktionsweise

- Hängt sich in den Twitch-Chat-WebSocket ein, um `CLEARMSG` / `CLEARCHAT` abzufangen, damit gelöschte Nachrichten markiert statt entfernt werden, und um Erwähnungen/Antworten für Töne zu erkennen.
- Beobachtet das Chat-DOM, um Nachrichten zu stylen, Avatare hinzuzufügen und Filter anzuwenden, sobald Nachrichten eintreffen.
- Fügt den Einstellungs-Button in die Chat-Fußleiste ein, verankert am **Senden**-Button, damit er im normalen Chat und in der Moderatoransicht an derselben Stelle erscheint.

Einstellungen werden im `localStorage` deines Browsers gespeichert.

---

## Kompatibilität

- `https://www.twitch.tv/*` (Kanalseiten und Moderatoransicht `/moderator/<kanal>`) sowie das Stream-Manager-Dashboard (`https://dashboard.twitch.tv/*`).
- Getestet mit Tampermonkey und Violentmonkey auf Chromium-basierten Browsern und Firefox.

---

## Datenschutz

- Einstellungen werden lokal gespeichert (`localStorage`, Schlüssel `BetterTwitch-settings`).
- Avatare werden nur dann über die öffentliche GraphQL-API von Twitch geladen, wenn **Benutzer-Avatare anzeigen** aktiviert ist.
- Keine Telemetrie und keine externen Server, außer der Auto-Update-URL.

---

## Lizenz

Veröffentlicht unter der [MIT-Lizenz](LICENSE).
