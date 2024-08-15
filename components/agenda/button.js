import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Plus } from "./../../assets/icons/Icons";
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
      <Plus stroke={colors.white} strokeWidth={1.75} width={25} height={25} />
    </TouchableOpacity>
  );
}

export default Button;
