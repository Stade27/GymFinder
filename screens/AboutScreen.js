// Skærm: hvad appen kan, og hvor tallene kommer fra.

import React from "react";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { CENTRE } from "../data/const";
import { globalStyles } from "../styles/globalStyles";

// En skærm er bare en funktion, der returnerer JSX (det der ligner HTML).
export default function AboutScreen() {
  return (
    <View style={globalStyles.container}>
      {/* ScrollView kan rulle, hvis teksten er længere end skærmen.
          contentContainerStyle styler INDHOLDET, style ville style rammen. */}
      <ScrollView contentContainerStyle={globalStyles.indhold}>
        <Text style={globalStyles.overskrift}>Om GymFinder</Text>

        <Text style={globalStyles.broedtekst}>
          GymFinder samler priser og tilbud fra fitnesscentre ét sted. I stedet
          for at åbne otte hjemmesider og selv regne studierabatter og
          oprettelsesgebyrer sammen, indtaster du din adresse og din situation
          én gang og ser, hvad hvert center reelt koster dig.
        </Text>

        <Text style={globalStyles.underoverskrift}>Sådan bruger du den</Text>
        <View style={globalStyles.infoBoks}>
          <Text style={globalStyles.broedtekst}>
            1. Udfyld adresse, alder og status på fanen Profil.
          </Text>
          <Text style={globalStyles.broedtekst}>
            2. Tryk på Find centre i nærheden.
          </Text>
          <Text style={globalStyles.broedtekst}>
            3. Sortér efter pris eller afstand, og slå filtre til.
          </Text>
          <Text style={globalStyles.broedtekst}>
            4. Tryk på et center for at se den fulde pris.
          </Text>
        </View>

        <Text style={globalStyles.underoverskrift}>Om tallene</Text>
        <View style={globalStyles.infoBoks}>
          <Text style={globalStyles.broedtekst}>
            {/* Krøllede parenteser = JavaScript midt i teksten. Tallet
                tælles automatisk, så det passer, selvom vi tilføjer centre. */}
            Appen indeholder {CENTRE.length} centre i hovedstadsområdet.
            Priserne er indsamlet manuelt og er vejledende. De hentes ikke
            automatisk fra centrenes hjemmesider.
          </Text>
        </View>

        <Text style={globalStyles.underoverskrift}>Version</Text>
        <Text style={globalStyles.hjaelpetekst}>
         Godkendelsesopgave 1
        </Text>
      </ScrollView>

      {/* Styrer uret og batteriet øverst. "auto" vælger selv lys eller mørk. */}
      <StatusBar style="auto" />
    </View>
  );
}
