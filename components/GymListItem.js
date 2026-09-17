// Ét fitnesscenter, som det ser ud i listen.

import React from "react";
import { Pressable, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { formaterPris } from "../utils/pricing";
import { formaterAfstand } from "../utils/distance";

// Komponenten ved intet om, hvor data kommer fra. Den får ét center og en
// funktion ind, og tegner. Derfor kan den genbruges andre steder.
const GymListItem = ({ center, onPress }) => {
  return (
    <Pressable style={globalStyles.listeElement} onPress={onPress}>
      {/* Øverste række: navn til venstre, pris til højre */}
      <View style={globalStyles.raekkeMellemrum}>
        <Text style={globalStyles.listeNavn}>{center.navn}</Text>
        <Text style={globalStyles.listePris}>
          {formaterPris(center.beregnetPris)}
        </Text>
      </View>

      <Text style={globalStyles.hjaelpetekst}>
        {formaterAfstand(center.beregnetAfstand)}
        {"  ·  "}
        {/* a ? b : c betyder: hvis a er sand, vis b - ellers vis c.
            Backticks `` gør det muligt at sætte en værdi ind med ${}. */}
        {center.binding === 0 ? "Ingen binding" : `${center.binding} mdr. binding`}
      </Text>

      {/* Vises kun hvis der er en kampagne.
          && betyder: er venstre side falsk, tegnes højre side slet ikke. */}
      {center.kampagne && (
        <Text style={globalStyles.kampagnetekst}>{center.kampagne}</Text>
      )}
    </Pressable>
  );
};

export default GymListItem;
