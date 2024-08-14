import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Mail from "../components/mails/Mail";
import { ThemeContext } from "./../utils/themeContext";

function Mails() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      width: "90%",
      alignSelf: "center",
      marginTop: 25,
    },
    text: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      marginBottom: 20,
    },
    link: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      lineHeight: 20,
      textDecorationLine: "underline",
    },
  });

  const [emails, setEmails] = useState([]);

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

export default Mails;
