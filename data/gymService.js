// Henter centerdata. Det eneste sted appen ved, hvor data kommer fra.

import { CENTRE } from "./const";

// Henter alle centre.
// Den er async, selvom data ligger lokalt. Et rigtigt datakald tager tid, og
// skriver vi koden sådan allerede nu, slipper vi for at bygge om senere.
// De 600 ms efterligner et netværkskald, så vi kan se spinneren virke.
// async/await gør at funktionen kan vente på noget langsomt uden at appen
// fryser. Husk at den der kalder den også skal bruge await.
export const hentCentre = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return CENTRE;
};

// Henter ét center ud fra id. Bruges af detaljeskærmen.
export const hentCenterVedId = async (id) => {
  const centre = await hentCentre();
  return centre.find((center) => center.id === id);
};

/*
 * Sådan kommer det til at se ud når vi henter rigtige data.
 * Udkommenteret fordi endpointet ikke findes endnu.
 *
 * export const hentCentre = async () => {
 *   try {
 *     const svar = await fetch("https://vores-api.dk/centre");
 *     const data = await svar.json();
 *     return data.centre;
 *   } catch (fejl) {
 *     console.log("Kunne ikke hente centre:", fejl);
 *     return [];   // appen må ikke crashe, hvis nettet er nede
 *   }
 * };
 */
