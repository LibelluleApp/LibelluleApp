import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BigWarning } from "../../../assets/icons/Icons";

function Eval() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <BigWarning />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.evalText}>[Evaluation] Evaluation prévue</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#E80D0D",
    gap: 20,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  evalText: {
    color: "#fff",
    fontFamily: "Ubuntu_500Medium",
    fontSize: 13,
  },
});

export default Eval;
