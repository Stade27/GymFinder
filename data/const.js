// Alle faste data: centre, postnumre, filtre og statusser.

// Brugerens status. id skal matche nøglerne i "priser" på hvert center.
export const BRUGERSTATUS = [
  { id: "standard", navn: "Almindelig" },
  { id: "studerende", navn: "Studerende" },
  { id: "pensionist", navn: "Pensionist" },
];

// Filtre. id skal matche et felt i "faciliteter" på hvert center.
export const FILTRE = [
  { id: "sauna", navn: "Sauna" },
  { id: "holdtraening", navn: "Holdtræning" },
  { id: "doegnaabent", navn: "Døgnåbent" },
  { id: "svoemning", navn: "Svømning" },
  { id: "parkering", navn: "Parkering" },
];

// Det brugeren kan sortere efter.
export const SORTERINGER = [
  { id: "pris", navn: "Pris" },
  { id: "afstand", navn: "Afstand" },
];

// Postnumre med koordinater. At oversætte en adresse til et punkt på kortet
// hedder geokodning. Rigtige apps bruger en webservice - se utils/geokodning.js.
export const POSTNUMRE = {
  1700: { navn: "København V", latitude: 55.6683, longitude: 12.5515 },
  2100: { navn: "København Ø", latitude: 55.7051, longitude: 12.5766 },
  2200: { navn: "København N", latitude: 55.6960, longitude: 12.5479 },
  2300: { navn: "København S", latitude: 55.6561, longitude: 12.5983 },
  2400: { navn: "København NV", latitude: 55.7080, longitude: 12.5320 },
  2800: { navn: "Kongens Lyngby", latitude: 55.7700, longitude: 12.5030 },
};

// Fitnesscentrene. Alle centre skal have de samme felter, for kortet, listen,
// filtrene og detaljeskærmen regner med dem. Skal der et nyt center ind, så
// kopier et af de andre og ret værdierne.
//
//   priser      månedspris for hver status
//   oprettelse  engangsgebyr (0 = gratis)
//   binding     antal måneders binding
//   kampagne    tekst hvis der er et tilbud, ellers null
//   faciliteter true/false for hvert filter i FILTRE
export const CENTRE = [
  {
    id: "1",
    navn: "Fitness World Nørrebro",
    adresse: "Nørrebrogade 155, 2200 København N",
    latitude: 55.6987,
    longitude: 12.5442,
    priser: { standard: 249, studerende: 199, pensionist: 189 },
    oprettelse: 199,
    binding: 6,
    kampagne: "Første måned gratis ved online tilmelding",
    aabningstider: "Man-søn 05.00-23.00",
    faciliteter: {
      sauna: true,
      holdtraening: true,
      doegnaabent: false,
      svoemning: false,
      parkering: false,
    },
  },
  {
    id: "2",
    navn: "PureGym Vesterbro",
    adresse: "Ingerslevsgade 44, 1705 København V",
    latitude: 55.6684,
    longitude: 12.5541,
    priser: { standard: 179, studerende: 159, pensionist: 159 },
    oprettelse: 0,
    binding: 0,
    kampagne: "Ingen binding og intet oprettelsesgebyr",
    aabningstider: "Døgnåbent",
    faciliteter: {
      sauna: false,
      holdtraening: true,
      doegnaabent: true,
      svoemning: false,
      parkering: false,
    },
  },
  {
    id: "3",
    navn: "Loop Fitness Østerbro",
    adresse: "Østerbrogade 105, 2100 København Ø",
    latitude: 55.7085,
    longitude: 12.5790,
    priser: { standard: 219, studerende: 189, pensionist: 169 },
    oprettelse: 149,
    binding: 3,
    kampagne: "Studierabat hele semestret",
    aabningstider: "Man-søn 06.00-22.00",
    faciliteter: {
      sauna: false,
      holdtraening: false,
      doegnaabent: false,
      svoemning: false,
      parkering: true,
    },
  },
  {
    id: "4",
    navn: "DGI-byen Træningscenter",
    adresse: "Tietgensgade 65, 1704 København V",
    latitude: 55.6710,
    longitude: 12.5640,
    priser: { standard: 399, studerende: 299, pensionist: 279 },
    oprettelse: 0,
    binding: 1,
    kampagne: "Svømmehal inkluderet i medlemskabet",
    aabningstider: "Man-fre 06.30-22.00, lør-søn 09.00-18.00",
    faciliteter: {
      sauna: true,
      holdtraening: true,
      doegnaabent: false,
      svoemning: true,
      parkering: true,
    },
  },
  {
    id: "5",
    navn: "Repeat Fitness Nordvest",
    adresse: "Frederikssundsvej 60, 2400 København NV",
    latitude: 55.7060,
    longitude: 12.5330,
    priser: { standard: 149, studerende: 129, pensionist: 129 },
    oprettelse: 99,
    binding: 0,
    kampagne: "Billigste medlemskab i området",
    aabningstider: "Døgnåbent",
    faciliteter: {
      sauna: false,
      holdtraening: false,
      doegnaabent: true,
      svoemning: false,
      parkering: true,
    },
  },
  {
    id: "6",
    navn: "SATS Lyngby",
    adresse: "Lyngby Hovedgade 63, 2800 Kongens Lyngby",
    latitude: 55.7710,
    longitude: 12.5040,
    priser: { standard: 399, studerende: 329, pensionist: 329 },
    oprettelse: 0,
    binding: 12,
    kampagne: null,
    aabningstider: "Man-fre 06.00-22.00, lør-søn 08.00-20.00",
    faciliteter: {
      sauna: true,
      holdtraening: true,
      doegnaabent: false,
      svoemning: false,
      parkering: true,
    },
  },
];
