// Lille knap, der kan være slået til eller fra.

import React from "react";
import { Pressable, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

// De tre ting i krøllede parenteser er props - værdier komponenten får
// udefra. label = teksten, aktiv = er den valgt, onPress = hvad der sker ved tryk.
const ChipComponent = ({ label, aktiv, onPress }) => {
  return (
    // Pressable er alt, man kan trykke på.
    // aktiv && ... betyder: læg kun den ekstra styling på, hvis aktiv er true.
    <Pressable
      onPress={onPress}
      style={[globalStyles.chip, aktiv && globalStyles.chipAktiv]}
    >
      <Text style={[globalStyles.chipTekst, aktiv && globalStyles.chipTekstAktiv]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default ChipComponent;
