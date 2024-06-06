import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { StartIcon } from "../../assets/icons/startPage";
import Button from "../../components/auth/button";
import Login from "./Login";

function AuthStack() {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.freepics}>
          <StartIcon />
        </View>
        <View style={styles.contentText}>
          <Text style={styles.title}>Libellule</Text>
        </View>

        <View style={styles.contentText}>
          <Text style={styles.underTitle}>Enregistre, organise, réussis !</Text>
          <Text style={styles.description}>
            L’application, conçu pour les étudiants de l’IUT d’Angoulême, pour
            ne plus perdre le fil de vos études.
          </Text>
        </View>
        <Button title="Commencer" onPress={Login} />
        <Text style={styles.cgu}>
          En continuant, vous acceptez nos{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => Linking.openURL("https://mmi-companion.fr/cgu.html")}
          >
            conditions générales d’utilisation
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F9",
    justifyContent: "center",
    flex: 1,
  },
  info: {
    backgroundColor: "#0760FB10",
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 30,
  },
  freepics: {
    alignSelf: "center",
  },
  contentText: {
    paddingHorizontal: 22,
  },
  title: {
    fontFamily: "Ubuntu_700Bold",
    fontSize: 30,
    color: "#0760FB",
    marginTop: 10,
  },
  underTitle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#0760FB",
    marginTop: 10,
  },
  description: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#0760FB",
  },
  cgu: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
    paddingHorizontal: 22,
    marginTop: 10,
  },
});
export default AuthStack;
