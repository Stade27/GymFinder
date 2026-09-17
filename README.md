# GymFinder

Prototype til faget Innovation og Teknologi (INNT), CBS – efterår 2026.
Obligatorisk opgave 1: individuel programmeringsopgave.

GymFinder samler priser og tilbud fra fitnesscentre ét sted. Brugeren
indtaster adresse, alder og status (almindelig, studerende eller pensionist),
og appen viser centre i nærheden med den pris, der gælder for netop ham –
inklusive oprettelsesgebyr, binding og aktuelle kampagner.

## Demovideo

**[Link til demovideo indsættes her]**

> Husk at udskifte linjen ovenfor, før du afleverer. Videoen kan ligge på
> YouTube (sat til "ikke-listet") eller uploades direkte til dette repository.

## Sådan kører du appen

Projektet er bygget med Expo.

```
npm install
npx expo start
```

Scan QR-koden med Expo Go-appen på din telefon. Er du på eduroam eller et
andet netværk med restriktioner, brug `npx expo start --tunnel` i stedet.

Skulle versionerne drille, kan de rettes automatisk med:

```
npx expo install --fix
```

## Opfyldelse af opgavekravene

| Krav | Hvor det er opfyldt |
| --- | --- |
| Minimum 3 views | `View`-komponenter bruges på alle skærme, bl.a. `ProfileScreen.js`, `GymListScreen.js` og `GymDetailsScreen.js` |
| Minimum 2 knapper, hvor den ene har en funktion | `ProfileScreen.js`: "Find centre i nærheden" validerer postnummeret, slår koordinater op og navigerer til en anden fane. "Ryd felter" nulstiller profilen. Begge bygger på `components/ButtonComponent.js` |
| Minimum 3 screens | `ProfileScreen`, `GymListScreen`, `GymDetailsScreen` og `AboutScreen` – sat op med bottom tabs og en stack navigator i `App.js` og `components/StackComponent.js` |
| Minimum 1 liste | `FlatList` over fitnesscentre i `GymListScreen.js`. Derudover `map()` over filtre, statusvalg og faciliteter |
| Styling i en separat fil | `styles/globalStyles.js` – al styling og alle farver i appen |
| README med link til demovideo | Denne fil |

## Mappestruktur

```
App.js                      Navigation: tabs med en stack i midterste fane
index.js                    Expo-startpunkt

components/
  ButtonComponent.js        Genbrugelig knap (title + onPress som props)
  ChipComponent.js          Lille knap der kan være slået til/fra
  GymListItem.js            Ét center, som det ser ud i listen
  MapComponent.js           Kort med markører
  StackComponent.js         Stack navigator til liste -> detaljer

screens/
  ProfileScreen.js          Indtastning af adresse, alder og status
  AboutScreen.js            Om appen og om datagrundlaget
  StackScreens/
    GymListScreen.js        Kort, filtre, sortering og liste
    GymDetailsScreen.js     Fuld pris og faciliteter for ét center

context/
  ProfileContext.js         Deler brugerens profil mellem faner

data/
  const.js                  Centre, postnumre, filtre
  gymService.js             Leverer data til skærmene

utils/
  pricing.js                Prisberegning ud fra brugerens status
  distance.js               Afstand mellem to punkter
  geokodning.js             Postnummer -> koordinater
  filtrering.js             Filtrering og sortering af listen

styles/
  globalStyles.js           Al styling
```

## Om dataene

Priserne i `data/const.js` er indsamlet manuelt og er vejledende. De hentes
ikke automatisk fra centrenes hjemmesider, og de kan være ændret, siden de
blev noteret.

Det er et bevidst valg i denne version. Formålet med en MVP er at teste, om
brugerne vil have produktet – ikke at bygge den tekniske dataindsamling,
før man ved det. Al datahåndtering er samlet i `data/gymService.js`, så
netop den del kan skiftes ud uden at røre resten af appen.

## Videre arbejde

Appen afleveres i etaper hen over semestret. Følgende er bevidst holdt ude
af denne version og er markeret med kommentarer i koden der, hvor det skal
sættes ind:

- Rigtig dataindsamling af priser (`data/gymService.js`)
- Geokodning af fulde adresser via DAWA i stedet for opslag på postnummer
  (`utils/geokodning.js`)
- Gemt profil, så oplysningerne overlever at appen lukkes
  (`context/ProfileContext.js`)
