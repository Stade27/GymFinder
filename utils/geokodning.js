// Slår et postnummer op og finder koordinater.

import { POSTNUMRE } from "../data/const";

// Finder koordinater ud fra et postnummer.
// Returnerer null hvis postnummeret ikke findes, så skærmen kan vise en fejl.
export const findKoordinater = (postnummer) => {
  const renset = String(postnummer).trim();
  const fund = POSTNUMRE[renset];

  if (!fund) {
    return null;
  }

  return {
    latitude: fund.latitude,
    longitude: fund.longitude,
    byNavn: fund.navn,
  };
};

// Tjekker om postnummeret er fire cifre.
export const erGyldigtPostnummer = (postnummer) => {
  // Det her hedder et regulært udtryk. \d er et ciffer, {4} betyder fire
  // af dem, ^ og $ betyder start og slut. Altså: præcis fire cifre.
  return /^\d{4}$/.test(String(postnummer).trim());
};
