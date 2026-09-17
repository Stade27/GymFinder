// Skærm: fuld pris og faciliteter for ét center.

import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ButtonComponent from "../../components/ButtonComponent";
import { useProfil } from "../../context/ProfileContext";
import { hentCenterVedId } from "../../data/gymService";
import { FILTRE } from "../../data/const";
import {
  beregnMaanedspris,
  beregnFoersteAarsPris,
  beregnBesparelse,
} from "../../utils/pricing";
import { globalStyles, farver } from "../../styles/globalStyles";

// route og navigation kommer automatisk, fordi skærmen ligger i en stack.
// route bærer data med fra den forrige skærm, navigation styrer, hvor vi går hen.
export default function GymDetailsScreen({ route, navigation }) {
  // route.params er det, listen sendte med, da den navigerede hertil.
  const { centerId } = route.params;

  const { profil } = useProfil();
  const [center, setCenter] = useState(null);

  // Henter centret ud fra id'et.
  useEffect(() => {
    const hentData = async () => {
      const fundet = await hentCenterVedId(centerId);
      setCenter(fundet);
    };

    hentData();
  }, [centerId]);

  if (!center) {
    return (
      <View style={globalStyles.centreret}>
        <ActivityIndicator size="large" color={farver.primaer} />
        <StatusBar style="auto" />
      </View>
    );
  }

  const maanedspris = beregnMaanedspris(center, profil.status);
  const aarspris = beregnFoersteAarsPris(center, profil.status);
  const besparelse = beregnBesparelse(center, profil.status);

  // Kun de faciliteter, centret faktisk har.
  // filter() beholder kun de elementer, hvor testen er sand.
  const faciliteter = FILTRE.filter(
    (filter) => center.faciliteter[filter.id] === true
  );

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.indhold}>
        <Text style={globalStyles.overskrift}>{center.navn}</Text>
        <Text style={globalStyles.hjaelpetekst}>{center.adresse}</Text>

        {center.kampagne && (
          <Text style={globalStyles.kampagnetekst}>{center.kampagne}</Text>
        )}

        <Text style={globalStyles.underoverskrift}>Pris for dig</Text>
        <View style={globalStyles.infoBoks}>
          <View style={globalStyles.infoRaekke}>
            <Text style={globalStyles.infoNoegle}>Månedspris</Text>
            <Text style={globalStyles.infoVaerdi}>{maanedspris} kr.</Text>
          </View>
          <View style={globalStyles.infoRaekke}>
            <Text style={globalStyles.infoNoegle}>Oprettelse</Text>
            <Text style={globalStyles.infoVaerdi}>
              {center.oprettelse === 0 ? "Gratis" : `${center.oprettelse} kr.`}
            </Text>
          </View>
          <View style={globalStyles.infoRaekke}>
            <Text style={globalStyles.infoNoegle}>Binding</Text>
            <Text style={globalStyles.infoVaerdi}>
              {center.binding === 0 ? "Ingen" : `${center.binding} måneder`}
            </Text>
          </View>
          <View style={globalStyles.infoRaekke}>
            <Text style={globalStyles.infoNoegle}>Første år i alt</Text>
            <Text style={globalStyles.infoVaerdi}>{aarspris} kr.</Text>
          </View>

          {/* Vises kun, hvis der er en rabat */}
          {besparelse > 0 && (
            <Text style={globalStyles.kampagnetekst}>
              Du sparer {besparelse} kr./md. i forhold til standardprisen
            </Text>
          )}
        </View>

        <Text style={globalStyles.underoverskrift}>Åbningstider</Text>
        <View style={globalStyles.infoBoks}>
          <Text style={globalStyles.broedtekst}>{center.aabningstider}</Text>
        </View>

        <Text style={globalStyles.underoverskrift}>Faciliteter</Text>
        <View style={globalStyles.infoBoks}>
          {faciliteter.length > 0 ? (
            faciliteter.map((facilitet) => (
              <Text key={facilitet.id} style={globalStyles.broedtekst}>
                {facilitet.navn}
              </Text>
            ))
          ) : (
            <Text style={globalStyles.hjaelpetekst}>
              Ingen ekstra faciliteter oplyst
            </Text>
          )}
        </View>

        {/* goBack() sender brugeren ét skridt tilbage i stakken */}
        <ButtonComponent
          title="Tilbage til listen"
          onPress={() => navigation.goBack()}
          variant="sekundaer"
        />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
