import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BigWarning, BigPouce } from "../../../assets/icons/Icons";

function Eval({ data }) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View style={[styles.container, stylesNothing.container]}>
        <View style={styles.leftContainer}>
          <BigPouce />
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.evalText, stylesNothing.evalText]}>
            Aucune évaluation de prévue
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <BigWarning />
        </View>
        <View style={styles.rightContainer}>
          {data.map((item) => (
            <View key={item.agenda_id} style={styles.rightContainer}>
              <Text style={styles.evalText}>
                [Evaluation] {item.Ressource.nom_ressource}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
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
  rightContainer: {
    flexDirection: "column",
    gap: 8,
  },
});

const stylesNothing = StyleSheet.create({
  container: {
    backgroundColor: "#3BC70A",
  },
  evalText: {
    color: "#12841D",
  },
});

export default Eval;
