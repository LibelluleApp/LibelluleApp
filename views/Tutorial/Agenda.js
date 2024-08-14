import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Chapeau, Agenda, Check } from "./../../assets/icons/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../utils/themeContext";
import ButtonAuth from "./../../components/auth/buttonAuth";

const TutorialAgenda = () => {
  const { colors } = useContext(ThemeContext);

  styles = StyleSheet.create({
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
      fontSize: 17,
      color: colors.black,
    },
    textContentContainer: {
      flexDirection: "column",
      gap: 10,
    },
    itemTextContentContainer: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black50,
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
      fontSize: 15,
      color: colors.black,
    },
    textResponsableName: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.blue_variable,
    },
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleFirstVisit = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("isFirstVisitAgenda", "false");
      navigation.navigate("Agenda");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Check stroke={colors.black} width={20} height={20} />
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
            <Chapeau fill={colors.black} width={18} height={18} />
            <View style={styles.textResponsableContent}>
              <Text style={styles.textResponsable}>
                Responsable de l'agenda :{" "}
              </Text>
              <Text style={styles.textResponsableName}>Amitou Lucas</Text>
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
