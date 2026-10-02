# Gastengidsen – handleiding

Dit is het systeem achter de gastengidsen van Sardegna Autentica.

- **Gasten** openen een gids via een link of QR-code, bijvoorbeeld `guide.sardegnaautentica.com/casa-marina`. Ze hoeven niets te downloaden. Wie wil, zet de gids op het beginscherm en gebruikt hem als een app, ook offline.
- **Jij** beheert alles in **Pages CMS**, een beheerscherm met formulieren. Klik je op *Save*, dan staat de wijziging na ongeveer een minuut online.
- **Kosten:** € 0. Je gebruikt een gratis GitHub-account, gratis GitHub Pages-hosting en het gratis Pages CMS.

> **Let op:** alles in dit systeem is openbaar leesbaar voor wie weet waar hij moet zoeken, ook wifi-wachtwoorden en telefoonnummers. Dat geldt voor elke online gastengids. Zet er dus nooit paspoorten, adressen van gasten, betaalgegevens of interne notities in. Houd je administratie (wie betaald heeft, tot wanneer) apart bij, bijvoorbeeld in een spreadsheet.

---

## Eenmalig instellen (ongeveer 30 minuten)

### 1. GitHub-account en repository
1. Maak een gratis account aan op **github.com**, bijvoorbeeld met je zakelijke e-mailadres.
2. Klik rechtsboven op **+** → **New repository**.
3. Naam: `gastengids`. Kies **Public** (gratis hosting werkt alleen met een openbare repository). Vink verder niets aan en klik **Create repository**.
4. Zet de bestanden erin. Er zijn twee manieren:
   - **Makkelijkst:** geef Claude de naam van je repository (bijv. `sambosma/gastengids`). Claude zet de bestanden er dan voor je in.
   - **Zelf:** pak de zip uit, klik in je lege repository op *uploading an existing file* en sleep **de inhoud** van de map erin, dus niet de map zelf. Zorg dat ook de verborgen bestanden `.pages.yml` en `.nojekyll` meegaan. Op een Mac maak je die zichtbaar in Finder met `Cmd + Shift + .`. Klik daarna **Commit changes**.

### 2. Website aanzetten (GitHub Pages)
1. Ga in de repository naar **Settings** → **Pages**.
2. Kies bij *Source* **Deploy from a branch**, branch **main**, map **/ (root)**, en klik **Save**.
3. Wacht 1 à 2 minuten. Bovenaan verschijnt je adres, bijvoorbeeld `https://sambosma.github.io/gastengids/`.
4. Test de voorbeeldgids op: `https://sambosma.github.io/gastengids/?w=casa-marina`.

### 3. Beheerscherm koppelen (Pages CMS)
1. Ga naar **app.pagescms.org** en klik **Sign in with GitHub**.
2. Geef Pages CMS toegang tot de repository `gastengids` (*Install* → *Only select repositories* → `gastengids`).
3. Open de repository in Pages CMS. Links zie je **Woningen**, **Stranden**, **Partners** en **Algemeen**.

### 4. Eigen domein (is ingesteld)
De gidsen staan op **guide.sardegnaautentica.com**. Zo is het ingesteld:
- **TransIP** → domein `sardegnaautentica.com` → DNS: record `guide`, type **CNAME**, waarde `sbosmasardegna.github.io.`
- **GitHub** → Settings → Pages → Custom domain: `guide.sardegnaautentica.com`, met **Enforce HTTPS** aan.

Verwijder het bestand `CNAME` in de repository niet, want daarmee onthoudt GitHub het domein.

---

## Een nieuwe verhuurder toevoegen (ongeveer 45 minuten)

1. Laat de verhuurder het intakeformulier invullen (zie `docs/intake-domande.md`, in het Italiaans). Zet die vragen in een Google Formulier.
2. Open Pages CMS → **Woningen** → **Add an entry**.
3. Vul in:
   - **Webadres:** kleine letters en streepjes, bijv. `villa-sole-pula`. Wijzig dit niet meer zodra de QR-code gedeeld is.
   - **Regio's:** die bepalen welke stranden en partners in de gids komen.
   - **Talen:** standaard alle vier. Laat je een taal leeg, dan valt de gids terug op Engels.
4. Klik **Save** en open na een minuut `guide.sardegnaautentica.com/<webadres>`.
5. Maak een QR-code van die link, bijvoorbeeld met een gratis QR-generator, en stuur die samen met de link naar de verhuurder.

Tip: kopieer de tekst van een bestaande woning als startpunt.

## Een partner toevoegen
Pages CMS → **Partners** → **Add an item**. Kies de soort en de regio's. De partner verschijnt meteen in alle gidsen van die regio's. Stopt een partner? Zet dan **Zichtbaar in gidsen** uit.

## Elk voorjaar (vóór mei)
- **Stranden:** controleer per strand of reserveren nog nodig is en vul de link in. Zet daarna **Gecontroleerd dit seizoen** aan.
- **Partners:** zet partners die niet verlengd hebben op onzichtbaar.
- **Woningen:** vraag verhuurders of wifi, codes of huisregels zijn veranderd.

## Voorbeeldgegevens
In het systeem staan voorbeeldgegevens: de woning *Casa Marina* en drie partners die met **VOORBEELD** beginnen. Gebruik ze om te laten zien hoe het werkt. Verwijder de voorbeeldpartners voordat je de eerste echte gids deelt, anders ziet een echte gast ze ook.

De strandinformatie is een startpunt en is nog niet gecontroleerd. Kijk vooral goed bij welke wind elk strand rustig is.

## Hoe het technisch werkt (voor later)
| Bestand | Inhoud |
|---|---|
| `content/woningen/<webadres>.json` | Eén bestand per woning |
| `content/stranden.json` | Alle stranden (gedeeld) |
| `content/partners.json` | Alle partners (gedeeld) |
| `content/algemeen.json` | Windadvies, gerechten, noodnummers (gedeeld) |
| `index.html`, `app.js`, `style.css` | De gids zelf |
| `sw.js`, `manifest.webmanifest` | Offline gebruik en "zet op beginscherm" |
| `404.html` | Stuurt korte adressen door naar de juiste gids |
| `.pages.yml` | De formulieren van het beheerscherm |

De vaste teksten van de gids (knoppen, kopjes) staan in vier talen bovenaan `app.js`.
