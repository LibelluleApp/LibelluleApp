import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../utils/themeContext";

const Offline = () => {
  const { colors } = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 20,
      color: "#000",
    },
    button: {
      backgroundColor: colors.blue700,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: "#fff",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vous êtes hors ligne</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Offline;
