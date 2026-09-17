// Appens startpunkt. Her sættes faner og navigation op.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "./screens/ProfileScreen";
import AboutScreen from "./screens/AboutScreen";
import StackComponent from "./components/StackComponent";
import { ProfileProvider } from "./context/ProfileContext";
import { tabNavigationsStil } from "./styles/globalStyles";

// Laver fanebjælken i bunden. Den skal kun laves én gang, uden for App().
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // ProfileProvider yderst: så kan ALLE skærme læse brugerens profil.
    // NavigationContainer skal pakke al navigation ind - der må kun være én.
    <ProfileProvider>
      <NavigationContainer>
        {/* Gælder alle faner. Stylingen ligger i styles/globalStyles.js. */}
        <Tab.Navigator screenOptions={tabNavigationsStil}>
          {/* name = teksten i fanebjælken. component = skærmen der vises. */}
          <Tab.Screen name="Profil" component={ProfileScreen} />

          {/* Denne fane viser en hel stak i stedet for én skærm.
              headerShown slås fra, så vi ikke får to grønne bjælker. */}
          <Tab.Screen
            name="Centre"
            component={StackComponent}
            options={{ headerShown: false }}
          />

          <Tab.Screen name="Om" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}
