import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  Warning,
  TimetableSmall,
  LeftArrow,
} from "../../../assets/icons/Icons";
function EvalHome() {
  return (
    <TouchableOpacity style={styles.evalTask}>
      <View style={styles.evalTop}>
        <Warning />
        <Text style={styles.evalTitle}>[Evaluation] Ergonomie</Text>
      </View>
      <View style={styles.evalBottom}>
        <View style={styles.evalBottomLeft}>
          <TimetableSmall />
          <Text style={styles.evalContent}>mar. 2 avril</Text>
        </View>
        <View style={styles.evalBottomRight}>
          <Text style={styles.evalContent}>Voir plus</Text>
          <LeftArrow fill="#FFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  evalTask: {
    backgroundColor: "#BB0000",
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  evalTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  evalTitle: {
    fontFamily: "SFProDisplay_500Medium",
    fontSize: 16,
    color: "#fff",
  },
  evalBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  evalBottomLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  evalBottomRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  evalContent: {
    fontFamily: "SFProDisplay_400Regular",
    color: "#fff",
  },
});
export default EvalHome;
