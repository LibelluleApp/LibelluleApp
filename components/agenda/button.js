import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Add } from "./../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";

function Button({ title, onPress, style }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      backgroundColor: colors.blue700,
      width: 50,
      height: 50,
      borderRadius: 10,
      marginTop: 10,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.white,
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Add fill={colors.white} />
    </TouchableOpacity>
  );
}

export default Button;
