import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "./../../utils/themeContext";

function Tag({ title, color }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      backgroundColor: color,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 20,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.white,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
}

export default Tag;
