// Beregner afstand i kilometer mellem to punkter.

const JORDENS_RADIUS_KM = 6371;

// Math.sin og Math.cos regner i radianer, ikke i grader.
const tilRadianer = (grader) => (grader * Math.PI) / 180;

export const beregnAfstand = (fra, til) => {
  // Mangler et af punkterne, kan vi ikke regne.
  if (!fra || !til) {
    return null;
  }

  const forskelBredde = tilRadianer(til.latitude - fra.latitude);
  const forskelLaengde = tilRadianer(til.longitude - fra.longitude);

  const a =
    Math.sin(forskelBredde / 2) * Math.sin(forskelBredde / 2) +
    Math.cos(tilRadianer(fra.latitude)) *
      Math.cos(tilRadianer(til.latitude)) *
      Math.sin(forskelLaengde / 2) *
      Math.sin(forskelLaengde / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return JORDENS_RADIUS_KM * c;
};

// Gør afstanden læsbar. Under 1 km viser vi meter
export const formaterAfstand = (km) => {
  if (km === null || km === undefined) {
    return "Afstand ukendt";
  }
  if (km < 1) {
    return `${Math.round(km * 1000)} m væk`;
  }
  return `${km.toFixed(1)} km væk`;
};
