import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { RedirectTo } from "../../assets/icons/Icons";

function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <RedirectTo fill="#FFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#0760FB",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 10,
    width: "55%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontFamily: "Ubuntu_400Regular",
    color: "#FFF",
    fontSize: 16,
  },
});

export default Button;
