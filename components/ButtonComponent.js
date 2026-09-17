// Genbrugelig knap. Tager title, onPress og valgfrit variant="sekundaer".

import React from "react";
import { Pressable, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const ButtonComponent = ({ title, onPress, variant }) => {
  const erSekundaer = variant === "sekundaer";

  return (
    <Pressable
      onPress={onPress}
      // style kan være en liste. React Native lægger dem oven på hinanden
      // fra venstre mod højre og springer false over. Sådan slår vi styling
      // til og fra.
      style={[
        globalStyles.knap,
        erSekundaer && globalStyles.knapSekundaer,
      ]}
    >
      <Text
        style={[
          globalStyles.knapTekst,
          erSekundaer && globalStyles.knapSekundaerTekst,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default ButtonComponent;
