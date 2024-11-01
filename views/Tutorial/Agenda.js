import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Student, Agenda, Check } from "./../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../utils/themeContext";
import ButtonAuth from "./../../components/auth/buttonAuth";
import whoIsChief from "../../api/Agenda/chef";
import { setAlternant, setIsFirstVisitAgenda } from "../../utils/storage";

const TutorialAgenda = () => {
  const [chef, setChef] = useState(null);

  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const fetchChef = async () => {
      const response = await whoIsChief();
      setChef(response);
    };
    fetchChef();
  }, []);

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      width: "90%",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      gap: 20,
    },
    containerContent: {
      flexDirection: "column",
      gap: 10,
    },
    textContainer: {
      flexDirection: "column",
      gap: 15,
      backgroundColor: colors.white_background,
      padding: 25,
      borderRadius: 10,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    titleText: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.regular950,
    },
    textContentContainer: {
      flexDirection: "column",
      gap: 10,
    },
    itemTextContentContainer: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular95050,
    },
    responsableContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      backgroundColor: colors.white_background,
      padding: 25,
      borderRadius: 10,
      width: "100%",
    },
    textResponsableContent: {
      flexDirection: "column",
    },
    textResponsable: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    textResponsableName: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular700,
    },
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleFirstVisit = () => {
    setLoading(true);
    try {
      setIsFirstVisitAgenda(false);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };
  if (!chef) {
    return (
      <View style={styles.background}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Check stroke={colors.regular950} width={20} height={20} />
              <Text style={styles.titleText}>
                Comment fonctionne l’agenda ?
              </Text>
            </View>
            <View style={styles.textContentContainer}>
              <Text style={styles.itemTextContentContainer}>
                Dans chaque groupe de classe, un étudiant est désigné pour
                ajouter les devoirs et les évaluations visibles sur l'agenda de
                ses camarades 👀
              </Text>
              <Text style={styles.itemTextContentContainer}>
                Le responsable de l'agenda peut ajouter des évènements avec le
                bouton "+" en bas de l'écran. Il peut également les modifier ou
                les supprimer individuellement en cliquant dessus.
              </Text>
              <Text style={styles.itemTextContentContainer}>
                Il peut de transmettre cette responsabilité depuis son profil à
                un étudiant de son groupe de classe motivé pour assumer ce rôle.
              </Text>
              <Text style={styles.itemTextContentContainer}>
                L'intérêt de l'agenda est que tous les devoirs et évaluations
                soient notés par un seul étudiant pour l'ensemble du groupe, au
                lieu que chacun le fasse de son côté 👍
              </Text>
            </View>
          </View>
          <View style={styles.responsableContainer}>
            <Check
              stroke={colors.regular950}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
            <View style={styles.textResponsableContent}>
              <Text style={styles.textResponsable}>
                Responsable de l'agenda :{" "}
              </Text>
              <Text style={styles.textResponsableName}>
                {chef.nom + " " + chef.prenom || "N/C"}
              </Text>
            </View>
          </View>
        </View>
        <ButtonAuth
          title="Terminer le tutoriel"
          onPress={handleFirstVisit}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default TutorialAgenda;
