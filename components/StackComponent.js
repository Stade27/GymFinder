// Stack-navigator: liste -> detaljer. Ligger inde i midterste fane.

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GymListScreen from "../screens/StackScreens/GymListScreen";
import GymDetailsScreen from "../screens/StackScreens/GymDetailsScreen";
import { navigationsStil } from "../styles/globalStyles";

// En stack lægger skærme oven på hinanden, så man kan gå ind og tilbage igen.
// Faner ligger derimod ved siden af hinanden.
const Stack = createStackNavigator();

export default function StackComponent() {
  return (
    <Stack.Navigator
      initialRouteName="Centre i nærheden"
      // Gælder alle skærme i stakken. Samme styling som fanerne bruger,
      // så headeren ser ens ud i hele appen.
      screenOptions={navigationsStil}
    >
      <Stack.Screen name="Centre i nærheden" component={GymListScreen} />
      <Stack.Screen name="Center detaljer" component={GymDetailsScreen} />
    </Stack.Navigator>
  );
}
