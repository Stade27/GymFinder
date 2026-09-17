// Gemmer brugerens profil, så alle skærme kan læse den.

import React, { createContext, useContext, useState } from "react";

// En tom profil. Samlet her, så "Ryd felter" kan nulstille til den.
const TOM_PROFIL = {
  adresse: "",
  postnummer: "",
  alder: "",
  status: "standard", // matcher et id i BRUGERSTATUS i const.js
  koordinater: null, // sættes når postnummeret er slået op
  erUdfyldt: false, // bruges til at vise en hjælpebesked på listeskærmen
};

// Selve beholderen. Bruges ikke direkte i skærmene - se useProfil nederst.
const ProfileContext = createContext(null);

// Pakker hele appen ind (se App.js) og holder på profilen.
// children er alt det, der står inde i <ProfileProvider>...</ProfileProvider>
// i App.js - altså hele resten af appen.
export const ProfileProvider = ({ children }) => {
  const [profil, setProfil] = useState(TOM_PROFIL);

  // Opdaterer ét felt uden at slette resten, fx opdaterProfil({ alder: "24" }).
  const opdaterProfil = (aendringer) => {
    // ...forrige kopierer alle gamle felter, ...aendringer lægger de nye
    // ovenpå. Sådan ændrer vi ét felt uden at slette resten.
    setProfil((forrige) => ({ ...forrige, ...aendringer }));
  };

  const nulstilProfil = () => {
    setProfil(TOM_PROFIL);
  };

  return (
    <ProfileContext.Provider value={{ profil, opdaterProfil, nulstilProfil }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Det skærmene bruger: const { profil, opdaterProfil } = useProfil();
// Fejlbeskeden er med, fordi man ellers får en kryptisk fejl langt fra årsagen,
// hvis man glemmer ProfileProvider i App.js.
export const useProfil = () => {
  const vaerdi = useContext(ProfileContext);

  if (!vaerdi) {
    throw new Error("useProfil skal bruges inde i en ProfileProvider");
  }

  return vaerdi;
};
