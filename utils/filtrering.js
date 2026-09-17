// Filtrerer og sorterer listen af centre.

import { beregnMaanedspris } from "./pricing";
import { beregnAfstand } from "./distance";

// Lægger pris og afstand på hvert center ud fra brugerens profil.
// { ...center } laver en kopi. Hvis vi skrev direkte i center ville vi
// ændre i vores egne data, og så passer tallene ikke næste gang brugeren
// skifter profil. map() giver en ny liste med lige så mange elementer.
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

// Beholder kun de centre der har alle de valgte faciliteter.
// aktiveFiltre er fx ["sauna", "doegnaabent"]. Er den tom vises alle.
export const filtrerCentre = (centre, aktiveFiltre) => {
  if (!aktiveFiltre || aktiveFiltre.length === 0) {
    return centre;
  }

  // filter() beholder de centre hvor testen er sand.
  // every() betyder at alle filtrene skal passe, ikke bare ét af dem.
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
