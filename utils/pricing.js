// Beregner priser ud fra brugerens status.

// Månedsprisen for ét center alt efter om man er studerende, pensionist
// eller almindelig. Kender centret ikke statussen bruger vi standardprisen.
//
// Todo: prisen skal også afhænge af alder, flere centre har ungdomspris
// under 30. Så skal profil.alder med herind og priser i const.js skal have
// en aldersgruppe mere. Det er kun den her funktion der skal ændres, resten
// af appen henter prisen herfra.
export const beregnMaanedspris = (center, status) => {
  if (!center || !center.priser) {
    return 0;
  }
  // priser[status] slår op med en variabel, så er status "studerende" får vi
  // priser.studerende. ?? falder tilbage til standard hvis der ikke er noget.
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
