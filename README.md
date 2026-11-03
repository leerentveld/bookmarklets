# Bookmarklets

Persoonlijke bookmarklets van Niels Leerentveld. Kleine scripts die je als
bookmarklet in je browser kunt uitvoeren op een specifieke pagina.

Elke bookmarklet staat als los `.js`-bestand in de root van deze repo. De
bestanden beginnen met `javascript:` zodat je ze rechtstreeks als URL in je
bookmarksbalk kunt gebruiken.

## Gebruik

1. Open het `.js`-bestand en kopieer de volledige inhoud (`javascript:` …). Het
   script staat over meerdere regels: plak het in één lange regel, zodat je
   browser het als één bookmarklet-URL opslaat.
2. Maak een nieuw bookmark aan in je browser en plak de code in het URL-veld.
3. Open de pagina waarop de bookmarklet hoort en klik op je bookmark.

## Beschikbare bookmarklets

| Bestand | Werkt op | Wat het doet |
| --- | --- | --- |
| [`zwiftbikes-garage-backup.js`](zwiftbikes-garage-backup.js) | `zwiftbikes.com/garage` | Toont een overlay met je huidige fietsen, wielen, gewicht en W/kg. Exporteert die gegevens naar een JSON-back-up en kan een eerder opgeslagen back-up weer terugzetten (na diff-tot-overzicht en een veilige back-up eerst). |

## Privacy

Deze bookmarklets draaien volledig in je eigen browser. Er gaat niets naar een
externe server: data wordt alleen uit `localStorage` van de bezochte site
gelezen en lokaal gedownload of teruggeschreven.

## Licentie

MIT, zie [LICENSE](LICENSE).
