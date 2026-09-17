// Kort med markører for brugeren og de fundne centre.

import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { globalStyles, farver } from "../styles/globalStyles";

// Midt i København. Bruges indtil brugeren har indtastet en adresse,
// så kortet ikke peger ud i Atlanterhavet (0,0).
const KOEBENHAVN = { latitude: 55.6761, longitude: 12.5683 };

// Hvor mange grader kortet dækker. Små tal = tættere på. 0.08 ≈ en bydel.
const ZOOM = { latitudeDelta: 0.08, longitudeDelta: 0.08 };

// Får brugerens punkt og listen af centre ind som props.
const MapComponent = ({ brugerKoordinater, centre }) => {
  // En ref er en "fjernbetjening" til kortet, så vi kan flytte det bagefter.
  const kortRef = useRef(null);

  // HVORFOR IKKE region={...}? Fordi region er et "styret" felt: kortet ville
  // hoppe tilbage til start, hver gang skærmen tegnes igen - altså hver gang
  // man trykker på et filter. I stedet sætter vi kun startpositionen én gang
  // og flytter kortet blødt, når brugeren har indtastet en ny adresse.
  useEffect(() => {
    if (brugerKoordinater && kortRef.current) {
      kortRef.current.animateToRegion(
        {
          latitude: brugerKoordinater.latitude,
          longitude: brugerKoordinater.longitude,
          ...ZOOM,
        },
        600 // millisekunder animationen tager
      );
    }
  }, [brugerKoordinater]);

  const startPosition = {
    latitude: brugerKoordinater ? brugerKoordinater.latitude : KOEBENHAVN.latitude,
    longitude: brugerKoordinater
      ? brugerKoordinater.longitude
      : KOEBENHAVN.longitude,
    ...ZOOM,
  };

  return (
    <View style={globalStyles.kortContainer}>
      <MapView
        ref={kortRef}
        style={globalStyles.kort}
        initialRegion={startPosition}
      >
        {/* Brugeren selv - orange, så den skiller sig ud fra centrene */}
        {brugerKoordinater && (
          <Marker
            coordinate={{
              latitude: brugerKoordinater.latitude,
              longitude: brugerKoordinater.longitude,
            }}
            title="Din adresse"
            description={brugerKoordinater.byNavn}
            pinColor={farver.accent}
          />
        )}

        {/* Én markør per center. map() laver en markør ud af hvert element.
            key skal være unik, så React kan holde dem fra hinanden. */}
        {centre.map((center) => (
          <Marker
            key={center.id}
            coordinate={{
              latitude: center.latitude,
              longitude: center.longitude,
            }}
            title={center.navn}
            description={`${center.beregnetPris} kr./md.`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapComponent;
