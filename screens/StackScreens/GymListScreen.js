// Hovedskærm: kort øverst, filtre og liste over centre nedenunder.

import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import MapComponent from "../../components/MapComponent";
import ChipComponent from "../../components/ChipComponent";
import GymListItem from "../../components/GymListItem";
import { useProfil } from "../../context/ProfileContext";
import { hentCentre } from "../../data/gymService";
import { FILTRE, SORTERINGER } from "../../data/const";
import { forberedListe } from "../../utils/filtrering";
import { globalStyles, farver } from "../../styles/globalStyles";

export default function GymListScreen({ navigation }) {
  const { profil } = useProfil();

  // Rådata fra service-laget
  const [centre, setCentre] = useState([]);
  const [henter, setHenter] = useState(true);

  // Brugerens valg på denne skærm
  const [aktiveFiltre, setAktiveFiltre] = useState([]);
  const [sortering, setSortering] = useState("pris");

  // useEffect kører kode EFTER skærmen er tegnet - her henter vi data.
  // Tom liste [] betyder: kør kun én gang, når skærmen vises første gang.
  useEffect(() => {
    const hentData = async () => {
      setHenter(true);
      const data = await hentCentre();
      setCentre(data);
      setHenter(false);
    };

    hentData();
  }, []);

  // Slår et filter til eller fra. Vi laver en NY liste i stedet for at ændre
  // den gamle - ellers opdager React ikke, at noget er ændret.
  const skiftFilter = (filterId) => {
    setAktiveFiltre((forrige) =>
      forrige.includes(filterId)
        ? forrige.filter((id) => id !== filterId)
        : [...forrige, filterId]
    );
  };

  // Listen brugeren ser: priser og afstande beregnes, filtre og sortering.
  const synligeCentre = forberedListe(
    centre,
    profil.status,
    profil.koordinater,
    aktiveFiltre,
    sortering
  );

  // Spinner mens data hentes, så skærmen ikke bare er tom.
  if (henter) {
    return (
      <View style={globalStyles.centreret}>
        <ActivityIndicator size="large" color={farver.primaer} />
        <Text style={globalStyles.hjaelpetekst}>Henter centre...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* Kortet viser både brugeren og de fundne centre */}
      <MapComponent
        brugerKoordinater={profil.koordinater}
        centre={synligeCentre}
      />

      {/* FlatList ruller selv. Filtrene lægges i ListHeaderComponent, så de
          ruller med. En liste inde i en ScrollView giver en advarsel. */}
      <FlatList
        data={synligeCentre}
        /* keyExtractor fortæller FlatList, hvad der gør hvert element unikt.
           renderItem tegner ét element ad gangen. */
        keyExtractor={(center) => center.id}
        contentContainerStyle={globalStyles.indhold}
        ListHeaderComponent={
          <View>
            {!profil.erUdfyldt && (
              <Text style={globalStyles.hjaelpetekst}>
                Udfyld din profil på første fane for at se afstande og din
                personlige pris.
              </Text>
            )}

            <Text style={globalStyles.underoverskrift}>Sortér efter</Text>
            <View style={globalStyles.chipRaekke}>
              {SORTERINGER.map((mulighed) => (
                <ChipComponent
                  key={mulighed.id}
                  label={mulighed.navn}
                  aktiv={sortering === mulighed.id}
                  onPress={() => setSortering(mulighed.id)}
                />
              ))}
            </View>

            <Text style={globalStyles.underoverskrift}>Filtre</Text>
            <View style={globalStyles.chipRaekke}>
              {FILTRE.map((filter) => (
                <ChipComponent
                  key={filter.id}
                  label={filter.navn}
                  aktiv={aktiveFiltre.includes(filter.id)}
                  onPress={() => skiftFilter(filter.id)}
                />
              ))}
            </View>

            <Text style={globalStyles.underoverskrift}>
              {synligeCentre.length} centre fundet
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <GymListItem
            center={item}
            // Vi sender kun id'et videre, ikke hele centret. Så henter
            // detaljeskærmen selv friske data.
            onPress={() =>
              navigation.navigate("Center detaljer", { centerId: item.id })
            }
          />
        )}
        /* Vises kun hvis listen er tom, fx hvis filtrene er for skrappe */
        ListEmptyComponent={
          <Text style={globalStyles.hjaelpetekst}>
            Ingen centre matcher dine filtre. Prøv at fjerne et af dem.
          </Text>
        }
      />

      <StatusBar style="auto" />
    </View>
  );
}
