// Beregner priser ud fra brugerens status.

// Månedsprisen for ét center, alt efter om man er studerende, pensionist
// eller almindelig. Kender centret ikke statussen, bruger vi standardprisen.
//
// SENERE: prisen skal også afhænge af alder (flere centre har ungdomspris
// under 30). Så skal profil.alder sendes med hertil, og "priser" i const.js
// have en aldersgruppe mere. Det er kun denne funktion, der skal ændres -
// listen, sorteringen og detaljeskærmen henter alle prisen herfra.
export const beregnMaanedspris = (center, status) => {
  if (!center || !center.priser) {
    return 0;
  }
  // Firkantede parenteser slår op med en variabel: er status "studerende",
  // henter vi priser.studerende. ?? betyder "brug det efter, hvis det før mangler".
  return center.priser[status] ?? center.priser.standard;
};

// Hvad medlemskabet koster det første år, oprettelsesgebyret med.
// Et billigt center pr. måned kan sagtens være dyrest på et år.
export const beregnFoersteAarsPris = (center, status) => {
  const maanedspris = beregnMaanedspris(center, status);
  return maanedspris * 12 + (center.oprettelse ?? 0);
};

// Hvor meget brugeren sparer i forhold til standardprisen. 0 = ingen rabat.
export const beregnBesparelse = (center, status) => {
  if (!center || !center.priser) {
    return 0;
  }
  return center.priser.standard - beregnMaanedspris(center, status);
};

// Skriver prisen ens overalt i appen, fx "199 kr./md.".
export const formaterPris = (beloeb) => `${beloeb} kr./md.`;
