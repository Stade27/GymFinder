// Registrerer App som rodkomponent. Genereret af Expo.

// Den her import skal stå først, ellers virker swipe tilbage ikke i stacken.
// Har prøvet at flytte den, det gik galt.
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";

registerRootComponent(App);
