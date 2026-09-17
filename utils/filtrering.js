// Filtrerer og sorterer listen af centre.

import { beregnMaanedspris } from "./pricing";
import { beregnAfstand } from "./distance";

// Lægger pris og afstand på hvert center ud fra brugerens profil.
// { ...center } laver en KOPI. Ellers ville vi skrive i vores egne data,
// og tallene ville være forkerte næste gang brugeren ændrer sin profil.
// map() laver en ny liste med lige så mange elementer som den gamle.
export const berigCentre = (centre, status, brugerKoordinater) => {
  return centre.map((center) => ({
    ...center,
    beregnetPris: beregnMaanedspris(center, status),
    beregnetAfstand: beregnAfstand(brugerKoordinater, {
      latitude: center.latitude,
      longitude: center.longitude,
    }),
  }));
};

// Beholder kun centre, der har ALLE de valgte faciliteter.
// aktiveFiltre er fx ["sauna", "doegnaabent"]. Tom liste = vis alle.
export const filtrerCentre = (centre, aktiveFiltre) => {
  if (!aktiveFiltre || aktiveFiltre.length === 0) {
    return centre;
  }

  // filter() beholder de centre, hvor testen er sand.
  // every() kræver, at ALLE valgte filtre passer - ikke bare ét af dem.
  return centre.filter((center) =>
    aktiveFiltre.every((filterId) => center.faciliteter[filterId] === true)
  );
};

// Sorterer efter pris eller afstand, billigst/nærmest først.
// [...centre] kopierer listen, fordi sort() ellers ændrer originalen.
// Centre uden kendt afstand lægges bagest.
export const sorterCentre = (centre, sortering) => {
  const kopi = [...centre];

  if (sortering === "afstand") {
    return kopi.sort((a, b) => {
      if (a.beregnetAfstand === null) return 1;
      if (b.beregnetAfstand === null) return -1;
      return a.beregnetAfstand - b.beregnetAfstand;
    });
  }

  // Ellers sorterer vi efter pris.
  return kopi.sort((a, b) => a.beregnetPris - b.beregnetPris);
};

// Samler de tre trin, så skærmen kun skal kalde én funktion.
export const forberedListe = (
  centre,
  status,
  brugerKoordinater,
  aktiveFiltre,
  sortering
) => {
  const beriget = berigCentre(centre, status, brugerKoordinater);
  const filtreret = filtrerCentre(beriget, aktiveFiltre);
  return sorterCentre(filtreret, sortering);
};
