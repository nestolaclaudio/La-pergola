# Collegare le ore speciali di Google

Il sito GitHub Pages legge `availability.json`. L'azione GitHub aggiorna questo file ogni sei ore usando le ore speciali del Profilo dell'attività Google; le date valgono sia per le prenotazioni sia per il ritiro.

## Prerequisiti Google

1. In Google Cloud crea un progetto e richiedi/ottieni l'accesso alle Business Profile API. Google richiede l'approvazione del progetto prima di poter usare queste API.
2. Abilita **My Business Business Information API** nel progetto.
3. Crea credenziali OAuth 2.0 e autorizza l'account Google che gestisce La Pergola con lo scope `https://www.googleapis.com/auth/business.manage`.
4. Recupera il nome risorsa della sede nel formato `locations/ID`. L'API `locations.list` restituisce questo nome per le sedi dell'account.

## Segreti GitHub

Nel repository: **Settings → Secrets and variables → Actions → New repository secret**. Aggiungi questi quattro segreti, senza inserirli nei file del sito:

| Nome | Valore |
| --- | --- |
| `GBP_CLIENT_ID` | ID client OAuth Google |
| `GBP_CLIENT_SECRET` | Secret del client OAuth |
| `GBP_REFRESH_TOKEN` | Refresh token autorizzato per lo scope sopra |
| `GBP_LOCATION_NAME` | Nome risorsa, per esempio `locations/123456789` |

L'account deve avere accesso manager o proprietario alla sede. Configura GitHub Pages per pubblicare la root del branch che contiene il workflow e consenti alle GitHub Actions di scrivere contenuti nel repository (**Settings → Actions → General → Workflow permissions → Read and write permissions**).

Poi avvia **Actions → Sync Google special hours → Run workflow**. Se la chiamata riesce, `availability.json` verrà aggiornato e il sito lo pubblicherà insieme al resto del branch. Le modifiche future fatte in Google verranno sincronizzate automaticamente entro sei ore.

Per indicare una chiusura o un'apertura straordinaria, inserisci la data come ora speciale nel Profilo dell'attività Google. Il feed pubblica solo le date; gli orari di prenotazione e ritiro continuano a seguire quelli configurati nel sito.
