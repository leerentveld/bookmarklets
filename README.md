# Bookmarklets

Persoonlijke bookmarklets van Niels Leerentveld. Kleine scripts die je als
bookmarklet in je browser kunt uitvoeren op een specifieke pagina.

Elke bookmarklet staat als los `.js`-bestand in de root van deze repo.

## Gebruik

Met [Bookmarkleter](https://chriszarate.github.io/bookmarkleter/) maak je van
elk `.js`-bestand een bookmarklet:

1. Open het `.js`-bestand op GitHub en kopieer de code.
2. Open <https://chriszarate.github.io/bookmarkleter/>.
3. Vul bij **Bookmarklet name** een duidelijke titel in, bijvoorbeeld
   `ZwiftBikes Garage`.
4. Plak de JavaScript in het tekstveld. Het werkt ook als de `javascript:` aan
   het begin blijft staan, maar haal die prefix er voor de zekerheid weg:
   Bookmarkleter zet er zelf een op, en zonder dubbele prefix blijft het
   resultaat een schone IIFE.
5. Sleep de link rechts uit de **Bookmarklet**-sectie naar je bookmarksbalk.
6. Open de pagina waarop de bookmarklet hoort en klik op je bookmark.

## Beschikbare bookmarklets

| Bestand | Titel in de bookmarksbalk | Werkt op | Wat het doet |
| --- | --- | --- | --- |
| [`zwiftbikes-garage-backup.js`](zwiftbikes-garage-backup.js) | ZwiftBikes Garage | `zwiftbikes.com/garage` | Toont een overlay met je huidige fietsen, wielen, gewicht en W/kg. Exporteert die gegevens naar een JSON-back-up en kan een eerder opgeslagen back-up weer terugzetten (na diff-tot-overzicht en een veilige back-up eerst). |

## Privacy

Deze bookmarklets draaien volledig in je eigen browser. Er gaat niets naar een
externe server: data wordt alleen uit `localStorage` van de bezochte site
gelezen en lokaal gedownload of teruggeschreven.

## Licentie

MIT, zie [LICENSE](LICENSE).
