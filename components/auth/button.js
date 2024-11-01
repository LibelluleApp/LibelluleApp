import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../utils/themeContext";

function Button({ title, onPress }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      backgroundColor: colors.blue700,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 10,
      marginTop: 20,
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.white,
      fontSize: 17,
      letterSpacing: -0.5,
    },
  });

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(onPress)}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
