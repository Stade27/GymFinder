// Skærm: brugeren indtaster adresse, alder og status.

import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ButtonComponent from "../components/ButtonComponent";
import ChipComponent from "../components/ChipComponent";
import { useProfil } from "../context/ProfileContext";
import { BRUGERSTATUS } from "../data/const";
import { findKoordinater, erGyldigtPostnummer } from "../utils/geokodning";
import { globalStyles } from "../styles/globalStyles";

// navigation kommer automatisk som prop, fordi skærmen ligger i en navigator.
export default function ProfileScreen({ navigation }) {
  // Henter profilen og de to funktioner fra context. Krøllede parenteser
  // her betyder "pluk disse tre ud af det objekt, useProfil giver".
  const { profil, opdaterProfil, nulstilProfil } = useProfil();

  // useState giver en værdi og en funktion til at ændre den. Ændrer man
  // værdien med setFejl, tegner React skærmen igen automatisk.
  // Fejlbeskeden hører kun til denne skærm, så den ligger her og ikke i context.
  const [fejl, setFejl] = useState("");

  // Trykker man på "Find centre i nærheden": tjek postnummeret, slå
  // koordinater op, gem dem, og send brugeren videre til Centre-fanen.
  const soegCentre = () => {
    if (!erGyldigtPostnummer(profil.postnummer)) {
      setFejl("Postnummeret skal være fire cifre, fx 2200.");
      return;
    }

    const koordinater = findKoordinater(profil.postnummer);

    if (!koordinater) {
      setFejl(
        "Vi dækker endnu ikke det postnummer. Prøv fx 2200, 2300 eller 1700."
      );
      return;
    }

    // Alt i orden - gem koordinaterne og ryd fejlbeskeden.
    setFejl("");
    opdaterProfil({ koordinater: koordinater, erUdfyldt: true });

    // Send brugeren over på fanen med centrene.
    navigation.navigate("Centre");
  };

  const ryd = () => {
    nulstilProfil();
    setFejl("");
  };

  return (
    <View style={globalStyles.container}>
      {/* ScrollView, så tastaturet ikke dækker felterne på små skærme */}
      <ScrollView contentContainerStyle={globalStyles.indhold}>
        <Text style={globalStyles.overskrift}>Din profil</Text>
        <Text style={globalStyles.hjaelpetekst}>
          Vi bruger oplysningerne til at finde centre i nærheden og vise den
          pris, der gælder for netop dig.
        </Text>

        {/* value + onChangeText gør feltet "styret": teksten kommer fra
            profilen, og hvert tastetryk skriver den tilbage igen. */}
        <Text style={globalStyles.label}>Adresse</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Fx Nørrebrogade 155"
          value={profil.adresse}
          onChangeText={(tekst) => opdaterProfil({ adresse: tekst })}
        />

        <Text style={globalStyles.label}>Postnummer</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Fx 2200"
          keyboardType="number-pad"
          maxLength={4}
          value={profil.postnummer}
          onChangeText={(tekst) => opdaterProfil({ postnummer: tekst })}
        />

        <Text style={globalStyles.label}>Alder</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Fx 24"
          keyboardType="number-pad"
          maxLength={3}
          value={profil.alder}
          onChangeText={(tekst) => opdaterProfil({ alder: tekst })}
        />

        <Text style={globalStyles.label}>Status</Text>
        <View style={globalStyles.chipRaekke}>
          {/* En chip per status. aktiv afgør, hvilken der er markeret. */}
          {/* map() laver én chip ud af hvert element i listen.
              key skal være unik, så React kan kende chipsene fra hinanden. */}
          {BRUGERSTATUS.map((status) => (
            <ChipComponent
              key={status.id}
              label={status.navn}
              aktiv={profil.status === status.id}
              onPress={() => opdaterProfil({ status: status.id })}
            />
          ))}
        </View>

        {/* Vises kun, når der er en fejl */}
        {fejl.length > 0 && <Text style={globalStyles.fejltekst}>{fejl}</Text>}

        {/* Knap 1: validerer og navigerer videre */}
        <ButtonComponent title="Find centre i nærheden" onPress={soegCentre} />

        {/* Knap 2: rydder felterne igen */}
        <ButtonComponent title="Ryd felter" onPress={ryd} variant="sekundaer" />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
