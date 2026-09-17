// Al styling og alle farver i appen.

import { StyleSheet } from "react-native";

export const farver = {
  primaer: "#1B5E20", // mørkegrøn - knapper og overskrifter
  primaerLys: "#E8F5E9", // meget lys grøn - markerede felter
  accent: "#FF6F00", // orange - kampagner og tilbud
  tekst: "#1C1C1E",
  tekstSvag: "#6E6E73",
  baggrund: "#F7F7F8",
  kort: "#FFFFFF",
  kant: "#E0E0E0",
  fejl: "#C62828",
  hvid: "#FFFFFF",
};

export const afstande = {
  lille: 8,
  mellem: 16,
  stor: 24,
};

export const globalStyles = StyleSheet.create({
  // ---------- Navigation (headere og faneblade) ----------
  header: {
    backgroundColor: farver.primaer,
  },
  headerTitel: {
    fontWeight: "bold",
  },

  // ---------- Layout ----------
  container: {
    flex: 1,
    backgroundColor: farver.baggrund,
  },
  indhold: {
    padding: afstande.mellem,
  },
  centreret: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: afstande.stor,
  },
  raekkeMellemrum: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // ---------- Tekst ----------
  overskrift: {
    fontSize: 24,
    fontWeight: "bold",
    color: farver.primaer,
    marginBottom: afstande.lille,
  },
  underoverskrift: {
    fontSize: 17,
    fontWeight: "600",
    color: farver.tekst,
    marginTop: afstande.mellem,
    marginBottom: afstande.lille,
  },
  broedtekst: {
    fontSize: 15,
    color: farver.tekst,
    lineHeight: 22,
  },
  hjaelpetekst: {
    fontSize: 13,
    color: farver.tekstSvag,
    lineHeight: 19,
  },
  fejltekst: {
    fontSize: 13,
    color: farver.fejl,
    marginTop: afstande.lille,
  },
  kampagnetekst: {
    fontSize: 13,
    color: farver.accent,
    fontWeight: "600",
    marginTop: 4,
  },

  // ---------- Formularfelter ----------
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: farver.tekst,
    marginBottom: 4,
    marginTop: afstande.mellem,
  },
  input: {
    borderWidth: 1,
    borderColor: farver.kant,
    borderRadius: 8,
    backgroundColor: farver.kort,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: farver.tekst,
  },

  // ---------- Knapper ----------
  knap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: farver.primaer,
    marginTop: afstande.mellem,
  },
  knapTekst: {
    fontSize: 16,
    fontWeight: "bold",
    color: farver.hvid,
    letterSpacing: 0.3,
  },
  knapSekundaer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: farver.primaer,
  },
  knapSekundaerTekst: {
    color: farver.primaer,
  },

  // ---------- Chips (filtre, status, sortering) ----------
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: farver.kant,
    backgroundColor: farver.kort,
    marginRight: afstande.lille,
    marginBottom: afstande.lille,
  },
  chipAktiv: {
    backgroundColor: farver.primaerLys,
    borderColor: farver.primaer,
  },
  chipTekst: {
    fontSize: 14,
    color: farver.tekstSvag,
  },
  chipTekstAktiv: {
    color: farver.primaer,
    fontWeight: "600",
  },
  chipRaekke: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // ---------- Kort i listen ----------
  listeElement: {
    backgroundColor: farver.kort,
    borderRadius: 10,
    padding: afstande.mellem,
    marginBottom: afstande.lille,
    borderWidth: 1,
    borderColor: farver.kant,
  },
  listeNavn: {
    fontSize: 16,
    fontWeight: "600",
    color: farver.tekst,
    flex: 1,
    marginRight: afstande.lille,
  },
  listePris: {
    fontSize: 16,
    fontWeight: "bold",
    color: farver.primaer,
  },

  // ---------- Kortvisning ----------
  kortContainer: {
    height: 220,
    width: "100%",
    backgroundColor: farver.kant,
  },
  kort: {
    flex: 1,
  },

  // ---------- Detaljeskærm ----------
  infoBoks: {
    backgroundColor: farver.kort,
    borderRadius: 10,
    padding: afstande.mellem,
    borderWidth: 1,
    borderColor: farver.kant,
    marginBottom: afstande.mellem,
  },
  infoRaekke: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoNoegle: {
    fontSize: 14,
    color: farver.tekstSvag,
  },
  infoVaerdi: {
    fontSize: 14,
    color: farver.tekst,
    fontWeight: "500",
  },
});

// Indstillinger til navigatorerne. Det er ikke almindelige styles, men
// "options" som React Navigation forstår - derfor kan de ikke ligge inde i
// StyleSheet.create. De hører stadig til her, så headeren kun defineres ét sted.
export const navigationsStil = {
  headerStyle: globalStyles.header,
  headerTintColor: farver.hvid,
  headerTitleStyle: globalStyles.headerTitel,
};

// Fanebjælken nederst bruger det samme plus farver på fanerne.
// ... betyder "tag alt fra navigationsStil med".
export const tabNavigationsStil = {
  ...navigationsStil,
  tabBarActiveTintColor: farver.primaer,
  tabBarInactiveTintColor: farver.tekstSvag,
};
