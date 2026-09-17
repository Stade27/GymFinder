// Registrerer App som rodkomponent. Genereret af Expo.

// Denne import SKAL stå allerøverst. Stack-navigatoren bruger den til
// swipe-gestus, og den virker kun, hvis den indlæses først.
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";

registerRootComponent(App);
