import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import Mail from "../components/mails/Mail";

function Mails() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Cette page vous propose une prévisualisation de vos mails. Pour plus
          de fonctionnalités, connectez-vous à votre{" "}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://webmail.univ-poitiers.fr/");
            }}
          >
            <Text style={styles.link}>webmail.</Text>
          </TouchableOpacity>
        </Text>
        <Mail />
        <Mail />
        <Mail />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
  },
  content: {
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
  },
  text: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
    marginBottom: 20,
  },
  link: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
    lineHeight: 20,
    textDecorationLine: "underline",
  },
});
export default Mails;
