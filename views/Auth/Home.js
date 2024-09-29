import React, { useContext } from "react";
import { Text, View, StyleSheet, Linking, Image } from "react-native";
import { CircleHome, SquareHome } from "./../../assets/icons/Icons";
import Button from "../../components/auth/button";
import Login from "./Login";
import { ThemeContext } from "./../../utils/themeContext";
import Tag from "../../components/auth/tag";

function AuthStack() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    logoContainer: {
      flexDirection: "row",
      gap: 10,
      position: "absolute",
      top: 60,
      alignItems: "center",
    },
    imageLogoLibellule: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    titleLogoContainer: {
      fontFamily: "Ubuntu_700Bold",
      fontSize: 30,
      letterSpacing: -1,
      color: colors.blue_variable,
    },
    textContainer: {
      position: "absolute",
      zIndex: 3,
      bottom: 0,
      alignItems: "end",
      backgroundColor: colors.white_background,
      padding: 25,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      gap: 15,
    },
    textContent: {
      flexDirection: "column",
      gap: 10,
    },
    textTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 22,
      letterSpacing: -0.5,
      color: colors.black,
    },
    textDescription: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 16,
      letterSpacing: -0.5,
      color: colors.grey,
    },
    tagContainer: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    buttonContainer: {
      gap: 10,
    },
    cguText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
    },
    backgroundContainer: {
      zIndex: 2,
      top: 125,
      position: "absolute",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    imagePhone: {
      zIndex: 2,
      width: 325,
      height: 640,
    },
    circleHome: {
      zIndex: 1,
      position: "absolute",
      top: -30,
      left: 10,
    },
    squareHome: {
      zIndex: 1,
      position: "absolute",
      bottom: 250,
      right: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./../../assets/images/logo_libellule.png")}
          style={styles.imageLogoLibellule}
        />
        <Text style={styles.titleLogoContainer}>Libellule</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textContent}>
          <Text style={styles.textTitle}>
            La seule application qu’il faut pour organiser ses études.
          </Text>
          <Text style={styles.textDescription}>
            Créée par des étudiants de l’IUT d’Angoulême.
          </Text>
          <View style={styles.tagContainer}>
            <Tag title="GMP" color="#BB8700" />
            <Tag title="MMI" color="#AC00BB" />
            <Tag title="QLIO" color="#BB0000" />
            <Tag title="GEII" color="#1ABB00" />
            <Tag title="TC" color="#00B0BB" />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Commencer" onPress={Login} />
          <Text style={styles.cguText}>
            En continuant, nos{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => Linking.openURL("https://libellule.app/cgu")}
            >
              conditions générales d’utilisation
            </Text>{" "}
            sont acceptées.
          </Text>
        </View>
      </View>
      <View style={styles.backgroundContainer}>
        <Image
          source={require("./../../assets/images/iphone_home.png")}
          style={styles.imagePhone}
        />
        <View style={styles.circleHome}>
          <CircleHome />
        </View>
        <View style={styles.squareHome}>
          <SquareHome />
        </View>
      </View>
    </View>
  );
}

export default AuthStack;
