# BetterTwitch 2.0

<div align="center">

## 🌐 Dokumentationssprachen

[![English documentation](https://img.shields.io/badge/English-Open_documentation-007acc?style=for-the-badge)](README.en.md)
[![Deutsche Dokumentation](https://img.shields.io/badge/Deutsch-Aktuelle_Sprache-9147ff?style=for-the-badge)](README.de.md)
[![Русская документация](https://img.shields.io/badge/Русский-Открыть_документацию-007acc?style=for-the-badge)](README.ru.md)

</div>

BetterTwitch ist ein schlankes Userscript, mit dem sich der Twitch-Chat leichter lesen und bedienen lässt. Es funktioniert im Kanal-Chat, in der Moderatoransicht und auf Stream-Manager-Seiten, auf denen Twitch die unterstützte Chat-Oberfläche bereitstellt.

> Erstellt von [YaneonY](https://yaneony.com) · [Versionsverlauf](CHANGELOG.md)

## Funktionen

### Erwähnungen und Gesprächskontext

- Ein eigenes **Erwähnungs-Panel** behält die 50 neuesten Nachrichten, die dich mit @ erwähnen oder direkt auf dich antworten.
- Ein auf 50 begrenzter Zähler zeigt neue, noch gespeicherte Erwähnungen an, die bei geschlossenem Panel eingegangen sind.
- Durchsuche Erwähnungen, klappe den umgebenden Gesprächsverlauf aus oder springe zur ursprünglichen Nachricht, solange sie noch im Chat sichtbar ist.
- Speichere null bis drei Nachrichten vor und nach jeder Erwähnung als Kontext.
- Die Daten gelten nur für die aktuelle Sitzung und werden beim Neuladen der Seite gelöscht.

### Live-Chat-Dashboard

- Verfolge aktuelle und höchste Nachrichtenrate, Gesamtzahl, eindeutige und kürzlich aktive Chatter, Durchschnittstempo und Sitzungsdauer.
- Nutze ein gefülltes Ein-Minuten-Diagramm, eine Rangliste mit acht Chattern samt Aktivitätsbalken und optionalen Twitch-Avataren sowie sechs erweiterte Top-Emote-Karten.
- Die Statistik wird beim Wechsel in einen anderen Chatraum zurückgesetzt und weder hochgeladen noch gespeichert.

### Zuschauer-Kontext

- Fahre über einen Benutzernamen, um eine **Zuschauer-Hovercard** mit dessen Twitch-Avatar zu öffnen.
- Sie zeigt für die aktuelle Sitzung Nachrichtenanzahl, Erwähnungen und das meistgenutzte Emote.

### Nachrichtenwerkzeuge

- Eine oben ausgerichtete, platzsparende **Nachrichten-Aktionsleiste** bietet Antworten, Anheften, Kopieren und Übersetzen. Jede Aktion besitzt einen größeren lokalisierten Tooltip und ist per Tastatur erreichbar; Antworten und Anheften verwenden Twitchs eigene Bedienelemente, und Anheften erscheint nur, wenn Twitch es für dein Konto anbietet.
- Kopiere lesbaren Nachrichtentext ohne BetterTwitch-Bedienelemente oder übersetze ihn mit Google automatisch in die ausgewählte beziehungsweise erkannte BetterTwitch-Sprache.
- Fehlgeschlagene Übersetzungen lassen sich wiederholen, Ergebnisse kopieren und Original/Übersetzung umschalten; erkannte und gewählte Sprachen werden lokalisiert angezeigt.
- Blende Nachrichten aus, die mit `!` beginnen, sowie Nachrichten aus einer konfigurierbaren Bot-Liste.
- Zeige einen laufenden Zeichenzähler mit Twitchs ermitteltem Limit.

### Gesprächsqualität

- Fasse drei oder mehr identische Nachrichten, die innerhalb von zwölf Sekunden eintreffen, in einer aufklappbaren Zeile zusammen, ohne die Originale zu löschen.
- Öffne über einen Button in der Chat-Fußleiste ein passendes BetterTwitch-Panel und filtere dort nach Erwähnungen, Moderatoren, Fragen, Links oder Emotes.
- Durchsuche den sichtbaren Chat lokal, indem du einen Teil eines Benutzernamens, Twitch-Logins oder Nachrichtentexts direkt eingibst - ohne Präfixe oder besondere Syntax - und springe zwischen Treffern.
- Zeige bei Links die tatsächliche Ziel-Domain und verlange vor dem Öffnen verkürzter, numerischer, Punycode- oder irreführend wirkender Adressen eine Bestätigung.

### Benachrichtigungen und Hervorhebungen

- Spiele einen Ton ab, wenn dich jemand mit @ erwähnt und optional, wenn jemand direkt auf dich antwortet.
- Wähle aus 18 kurzen Tönen: Nachricht, Pop, Tropfen, Klopfen, Glas, Zupfen, Orbit, Pixel, Glocke, Funke, Klang, Doppeltipp, Holzblock, Murmel, Quarz, Blinken, Welle und Akkord.
- Teste Töne direkt im Einstellungs-Panel und stelle ihre Lautstärke unabhängig vom Twitch-Player ein; Neuinstallationen und Zurücksetzen verwenden Nachricht mit 35 %.
- Hebe Erwähnungen, Moderatoren und VIPs mit eigenen Farben hervor.

### Gelöschte Nachrichten

- Halte einzeln gelöschte Nachrichten sichtbar und markiere sie durchgestrichen mit einem Papierkorb-Symbol.
- Behalte unabhängig davon Nachrichten bei Timeouts/Sperren oder einer vollständigen Chat-Löschung.
- BetterTwitch kann nur Löschereignisse erhalten, die während der laufenden Sitzung eintreffen.

### Chat-Darstellung

- Verbreitere die Chat-Spalte auf 340 bis 1200 Pixel; der Videobereich passt sich entsprechend an.
- Zeige Twitch-Profilbilder neben Chat-Namen und Top-Chattern im Dashboard.
- Verbessere den Kontrast von Namen, die für den dunklen Chat-Hintergrund zu dunkel sind.
- Blende Chat-Abzeichen, das animierte Top-Nutzer-Karussell oder den Community-Highlight- und Anheftungsstapel unabhängig voneinander aus.
- Füge Trennlinien zwischen Nachrichten hinzu und wähle eine eigene BetterTwitch-Akzentfarbe.
- Wähle zwischen den Profilen Komfortabel, Kompakt und Barrierearm für eine ausgewogene, dichtere oder größere kontrastreiche Chat-Darstellung.

### Player und Belohnungen

- Bevorzuge automatisch Twitchs Quell-/Chunked-Videoqualität.
- Folge Twitch-Raid-Ketten für einstellbare 5–60 Minuten und kehre dann zum Ausgangskanal zurück; 0 deaktiviert die automatische Rückkehr.
- Lade Offline-Kanäle in einem einstellbaren Intervall von 1–60 Minuten neu oder deaktiviere das Neuladen mit 0.
- Löse die Kanalpunkte-Bonustruhe automatisch ein.
- Klicke sichtbare Einlösen-Buttons für Twitch Drops automatisch an.

### Einstellungen

- Einstellungen sind logisch in Allgemein, Chat-Darstellung, Chat-Werkzeuge, Gesprächsqualität, Hervorhebungen, Benachrichtigungen, Gelöschte Nachrichten, Nachrichtenfilter sowie Player & Belohnungen gegliedert.
- Einstellungen, Erwähnungen, Live-Statistik, Chat-Filter & Suche, Benachrichtigungsregler, Dialoge, Zuschauerkarten, Tooltips und Hinweise verwenden ein einheitliches responsives Karten-Design mit deutlichem Fokus und reduzierter Bewegung.
- BetterTwitch folgt automatisch dem aktuell gewählten hellen oder dunklen Twitch-Design, auch wenn es ohne Neuladen der Seite geändert wird.
- Nur beim Überfahren oder Tastaturfokus des Informationssymbols neben einer Einstellung erscheint eine ausführliche Beschreibung.
- Alle BetterTwitch-Beschriftungen, Aktionen, barrierefreien Bezeichnungen und Tooltips sind auf Englisch, Deutsch und Russisch verfügbar.
- Abhängige Bedienelemente bleiben deaktiviert, bis ihre übergeordnete Funktion eingeschaltet ist.
- Einstellungen, Erwähnungen, Live-Chat-Dashboard sowie Chat-Filter & Suche verwenden gleich breite Panels; das Öffnen eines BetterTwitch-Panels schließt die anderen.
- Alle BetterTwitch-Buttons verwenden dasselbe Akzent- und Offen-Design und stehen mit einem kleinen sichtbaren Abstand vor Twitchs Einstellungs-Zahnrad.
- Einstellungen lassen sich exportieren, importieren oder zurücksetzen. Importierte Daten werden anhand bekannter Namen, Typen und Wertebereiche geprüft.

## Installation

1. Installiere den empfohlenen Userscript-Manager [ScriptCat](https://scriptcat.org/de).

2. Öffne **[BetterTwitch.user.js installieren](https://raw.githubusercontent.com/yaneony/BetterTwitch/main/BetterTwitch.user.js)** und bestätige die Installation.
3. Öffne einen Twitch-Kanal. Die BetterTwitch-Panel-Buttons erscheinen in der Chat-Fußleiste vor Twitchs Einstellungs-Zahnrad.

Aktualisierungen werden durch den Userscript-Manager über dieselbe GitHub-Raw-URL eingespielt. Falls ein Chromium-basierter Browser Userscripts standardmäßig blockiert, erlaube den Userscript-Zugriff für den Manager auf der Erweiterungsseite des Browsers.

## Einstellungsübersicht

| Bereich | Option | Funktion |
| --- | --- | --- |
| Allgemein | Sprache | Verwendet Automatisch, English, Deutsch oder Русский für BetterTwitch und als Übersetzungsziel. |
| Allgemein | Akzentfarbe | Legt die Farbe für BetterTwitch-Buttons, Überschriften und aktive Bedienelemente fest. |
| Chat-Darstellung | Chat-Panel verbreitern | Aktiviert die benutzerdefinierte Breite der Chat-Spalte. |
| Chat-Darstellung | Breite | Legt 340–1200 px fest; verfügbar, wenn die Verbreiterung aktiviert ist. |
| Chat-Darstellung | Darstellungsprofil | Wechselt zwischen der komfortablen, kompakten und barrierearmen Chat-Darstellung. |
| Chat-Darstellung | Benutzer-Avatare anzeigen | Lädt Twitch-Profilbilder für Chat-Namen und die Dashboard-Rangliste. |
| Chat-Darstellung | Abzeichen ausblenden | Blendet sichtbare Chat-Abzeichen aus. |
| Chat-Darstellung | Namens-Kontrast verbessern | Hellt auf dunklem Hintergrund schwer lesbare Benutzernamen auf. |
| Chat-Darstellung | Trennlinie zwischen Nachrichten | Fügt zwischen Chat-Zeilen eine dezente horizontale Linie ein. |
| Chat-Darstellung | Top-Nutzer-Karussell ausblenden | Blendet nur die animierte Unterstützer-Rangliste über dem Chat aus, unabhängig davon, ob sie Bits-Spender, Geschenkabo-Spender oder eine andere Top-Nutzer-Kategorie zeigt. |
| Chat-Darstellung | Community-Highlights ausblenden | Blendet den separaten Highlight-Stapel einschließlich angehefteter Nachrichten aus, ohne das Top-Nutzer-Karussell zu verändern. |
| Chat-Werkzeuge | Live-Chat-Dashboard | Zeigt aktuelle und höchste Rate, Summen, aktive/eindeutige Chatter, Ein-Minuten-Diagramm, Avatar-Rangliste und Top-Emotes. |
| Chat-Werkzeuge | Zuschauer-Hovercards | Zeigt beim Überfahren den Twitch-Avatar und lokal erfasste Sitzungsdaten eines Zuschauers. |
| Chat-Werkzeuge | Kopier-Button beim Überfahren | Fügt einen Button zum Kopieren des lesbaren Nachrichtentexts hinzu. |
| Chat-Werkzeuge | Beim Überfahren übersetzen | Fügt jeder Nachricht eine Google-Übersetzung hinzu. |
| Chat-Werkzeuge | Erwähnungs-Panel | Behält die 50 neuesten Erwähnungen in einem durchsuchbaren Panel mit einem auf 50 begrenzten Ungelesen-Zähler. |
| Chat-Werkzeuge | Kontextnachrichten | Speichert 0–3 Nachrichten auf jeder Seite einer Erwähnung. |
| Chat-Werkzeuge | Zeichenzähler | Zeigt Nachrichtenlänge und Twitchs ermitteltes Limit. |
| Gesprächsqualität | Wiederholte Nachrichten zusammenfassen | Gruppiert drei oder mehr identische Nachrichten innerhalb von zwölf Sekunden und lässt die Originale aufklappbar. |
| Gesprächsqualität | Schnelle Chat-Filter | Fügt dem Fußleisten-Panel Filter für sichtbare Erwähnungen, Rollen, Fragen, Links oder Emotes hinzu. |
| Gesprächsqualität | Live-Chat-Suche | Durchsucht sichtbare Benutzernamen, Twitch-Logins und Nachrichtentext direkt ohne Präfixe und bietet Vorheriger-/Nächster-Navigation. |
| Gesprächsqualität | Sicherere Linkanzeige | Zeigt Ziel-Domains an und verlangt bei verdächtig wirkenden Links eine Bestätigung. |
| Hervorhebungen | @Erwähnungen hervorheben | Färbt Nachrichten ein, die deinen aktuellen Twitch-Namen erwähnen. |
| Hervorhebungen | Moderatoren hervorheben | Färbt erkannte Moderatoren-Nachrichten ein. |
| Hervorhebungen | VIPs hervorheben | Färbt erkannte VIP-Nachrichten ein. |
| Hervorhebungen | Farbauswahl | Legt für jede aktivierte Hervorhebung eine eigene Farbe fest. |
| Benachrichtigungen | Ton bei @Erwähnung | Spielt den gewählten Ton ab, wenn dich jemand anderes erwähnt. |
| Benachrichtigungen | Ton bei Antworten an dich | Meldet zusätzlich direkte Antworten; abhängig vom Erwähnungston. |
| Benachrichtigungen | Ton | Wählt und testet einen der 18 Benachrichtigungstöne; Neuinstallationen und Zurücksetzen verwenden standardmäßig Nachricht. |
| Benachrichtigungen | Lautstärke | Regelt den Benachrichtigungston unabhängig vom Twitch-Player; Neuinstallationen und Zurücksetzen verwenden standardmäßig 35 %. |
| Gelöschte Nachrichten | Einzellöschungen markieren | Erhält und markiert einzeln gelöschte Nachrichten. |
| Gelöschte Nachrichten | Timeouts / Sperren markieren | Erhält sichtbare Nachrichten, die für einen Benutzer entfernt werden. |
| Gelöschte Nachrichten | Komplette Chat-Löschungen markieren | Erhält sichtbare Nachrichten, wenn der gesamte Raum geleert wird. |
| Nachrichtenfilter | `!`-Befehle ausblenden | Blendet lokal Nachrichten aus, deren sichtbarer Text mit `!` beginnt. |
| Nachrichtenfilter | Bot-Nachrichten ausblenden | Blendet lokal Nachrichten aus der konfigurierten Bot-Liste aus. |
| Nachrichtenfilter | Bot-Namen | Kommagetrennte, nicht von Groß-/Kleinschreibung abhängige Twitch-Login-Namen. |
| Player & Belohnungen | Quellqualität bevorzugen | Speichert Twitchs Quellqualitäts-Einstellung im lokalen Speicher. |
| Player & Belohnungen | Nach Raids zum Ausgangskanal zurückkehren | Legt die Rückkehrzeit in Fünf-Minuten-Schritten auf 5–60 Minuten fest; 0 deaktiviert die automatische Rückkehr. Weitere Raids verlängern die Frist nicht und Raid-Zielkanäle lösen nie das Offline-Neuladen aus. |
| Player & Belohnungen | Neuladeintervall bei Offline-Kanälen | Lädt einen Offline-Kanal alle 1–60 Minuten neu; 0 deaktiviert die Funktion. |
| Player & Belohnungen | Bonus-Truhe automatisch einlösen | Klickt die Kanalpunkte-Bonustruhe an, wenn Twitch sie anzeigt. |
| Player & Belohnungen | Drops automatisch einlösen | Klickt sichtbare Einlösen-Buttons für Twitch Drops an. |

## Funktionsweise

- Das Skript umschließt Twitchs Chat-WebSockets bereits beim Seitenstart und liest IRC-Metadaten für Erwähnungen, Antworten, Chatter-Hinweise und Löschereignisse.
- `CLEARMSG`- und `CLEARCHAT`-Ereignisse können abgefangen werden, damit passende Nachrichten markiert statt sofort entfernt werden.
- Ein DOM-Beobachter ergänzt neue Chat-Zeilen um Darstellung, Buttons, Avatare, aufklappbare Wiederholungsgruppen, Link-Domains, Filter und lokal erfasste Zuschauerinformationen.
- Ein Button in der Fußleiste öffnet das lokale Filter-/Such-Panel, ohne Twitchs eigene Eingabevorschläge zu verändern.
- Da Twitch Seitenbereiche ohne vollständiges Neuladen austauscht, verbindet BetterTwitch DOM-Beobachter mit einer sparsamen Wartungsprüfung für Bedienelemente und Layout.

## Leistung und Lebenszyklus

- Die schnelle Startprüfung endet, sobald der Chat bereit ist, spätestens jedoch nach zehn Sekunden. Danach läuft die Wartung alle zwei Sekunden im sichtbaren und alle zehn Sekunden im ausgeblendeten Tab.
- DOM-Beobachter werden getrennt, wenn Twitch Chat, Eingabefeld, Oberflächen über dem Chat oder Layout-Ziel ersetzt oder entfernt. Neue DOM-Änderungen werden vor der Verarbeitung je Nachrichtenzeile zusammengeführt.
- Das Dashboard aktualisiert sich nur bei geöffnetem Panel und pausiert die Darstellung in ausgeblendeten Tabs. Die Belohnungsprüfung läuft nur, solange mindestens eine Auto-Einlösen-Option aktiv ist.
- Audio-Knoten werden nach jedem Hinweiston getrennt. Übersetzungs- und Avatar-Anfragen brechen nach 15 Sekunden ab; identische laufende Anfragen werden gemeinsam verwendet.
- Der Speicher langer Sitzungen ist begrenzt: 50 Erwähnungen, 250 Kontextnachrichten, 500 Nachrichten-Metadatensätze, 1.000 Zuschauerprofile, 1.000 Dashboard-Chatter, 100 Emotes je Zuschauer, 1.000 Dashboard-Emotes, 300 Übersetzungen und 500 Avatar-Ergebnisse.
- Suche und Filter berücksichtigen nur die von Twitch aktuell dargestellten Nachrichten.

## Daten und Datenschutz

- Einstellungen werden im `localStorage` des Browsers unter `BetterTwitch-settings` gespeichert.
- Erwähnungen bleiben nur im Arbeitsspeicher der aktuellen Seitensitzung und verwenden die oben genannten Grenzen. Hovercard- und Dashboard-Statistiken werden zusätzlich beim Wechsel des Chatraums zurückgesetzt.
- Wiederholungsgruppen, Chat-Filter und Suchergebnisse bleiben lokal auf der aktuellen Seite. Die Link-Prüfung untersucht nur den URL-Text und ruft die Zielseite nicht ab.
- Wenn **Benutzer-Avatare anzeigen** oder **Zuschauer-Hovercards** aktiviert ist, werden geprüfte Twitch-Login-Namen für Profilbilder in Chat, Dashboard oder Hovercard gebündelt an Twitchs GraphQL-Endpunkt gesendet.
- Wenn das **Neuladeintervall bei Offline-Kanälen** auf einer Kanalseite aktiviert ist, wird der geprüfte Login dieses Kanals an Twitchs GraphQL-Endpunkt gesendet, um den Offline-Status zu bestätigen.
- Nur nach einem Klick auf **Übersetzen** wird der Text dieser Nachricht an `translate.googleapis.com` gesendet; Ergebnisse werden für die Sitzung zwischengespeichert.
- BetterTwitch enthält keine Telemetrie, Analyse, Werbung oder ein von BetterTwitch betriebenes Backend.

## Kompatibilität

- Gilt für `https://www.twitch.tv/*` und `https://dashboard.twitch.tv/*`.
- Vorgesehen für aktuelle Desktop-Browser mit ScriptCat.
- Twitch ändert häufig internes Markup. Falls ein Bedienelement verschwindet, lade zuerst die Seite neu und melde anschließend Twitch-Seite und Browser.

## Lizenz

Veröffentlicht unter der [MIT-Lizenz](LICENSE).
