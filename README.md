# GymFinder

Min app til godkendelsesopgave 1 i Innovation og ny teknologi

Ideen: man skriver sin adresse, alder og om man er studerende
eller pensionist, og så får man en liste over fitnesscentre i nærheden med
den pris der gælder for én selv. Oprettelsesgebyr og binding er regnet med,
så man kan se hvad det egentlig koster det første år og ikke kun prisen pr.
måned. Man kan sortere efter pris eller afstand og filtrere på fx sauna.

## Demovideo

https://youtube.com/shorts/cIZ6SbBl6kg

## Sådan kører man den

    npm install
    npx expo start

Scan QR-koden med Expo Go. Sidder man på CBS' netværk kan telefonen tit ikke
finde computeren, så brug `npx expo start --tunnel` eller din egen hotspot.

Hvis Expo klager over versioner:

    npx expo install --fix

## Opgavekravene

| Krav | Hvor |
| --- | --- |
| Min. 3 views | Alle skærmene bruger `View`, fx `ProfileScreen.js`, `GymListScreen.js` og `GymDetailsScreen.js` |
| Min. 2 knapper, én med funktion | `ProfileScreen.js` har to knapper. "Find centre i nærheden" tjekker postnummeret, finder koordinater og navigerer videre til listen. "Ryd felter" nulstiller. Begge er lavet med `components/ButtonComponent.js` |
| Min. 3 screens | Fire i alt: `ProfileScreen`, `GymListScreen`, `GymDetailsScreen` og `AboutScreen`. Tabs i `App.js` og en stack i `components/StackComponent.js` |
| Min. 1 liste | `FlatList` med centrene i `GymListScreen.js`. Filtre og statusvalg er lavet med `map()` |
| Styling i separat fil | `styles/globalStyles.js`. Der er ikke styling andre steder |
| README med demovideo | Denne fil |

## Filerne

    App.js                      Tabs, med en stack i den midterste
    index.js                    Expo starter her

    components/
      ButtonComponent.js        Knap
      ChipComponent.js          Lille knap man kan slå til og fra
      GymListItem.js            Et center i listen
      MapComponent.js           Kortet
      StackComponent.js         Stack fra liste til detaljer

    screens/
      ProfileScreen.js          Adresse, alder og status
      AboutScreen.js            Om appen
      StackScreens/
        GymListScreen.js        Kort, filtre, sortering og liste
        GymDetailsScreen.js     Detaljer og fuld pris for et center

    context/
      ProfileContext.js         Profilen, så alle skærme kan læse den

    data/
      const.js                  Centre, postnumre, filtre
      gymService.js             Henter data (lige nu fra const.js)

    utils/
      pricing.js                Prisberegning
      distance.js               Afstand mellem to punkter
      geokodning.js             Postnummer til koordinater
      filtrering.js             Filtrering og sortering

## Om dataene

Priserne er skrevet ind i hånden i `data/const.js` og er ikke nødvendigvis
opdaterede. Appen henter ikke noget fra centrenes hjemmesider endnu. Det var
vigtigere at få selve appen til at virke først, så vi kunne vise den til
brugere og finde ud af om ideen overhovedet holder.

Alt der har med data at gøre går gennem `data/gymService.js`, så når vi
skal have rigtige data ind er det kun den fil der skal skrives om.
