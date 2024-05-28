import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  Warning,
  TimetableSmall,
  LeftArrow,
} from "../../../assets/icons/Icons";
import moment from "moment";

function EvalHome({ titre, id, date }) {
  const [dates, setDates] = useState(moment(date).format("ddd D MMMM"));
  return (
    <TouchableOpacity style={styles.evalTask}>
      <View style={styles.evalTop}>
        <Warning />
        <Text style={styles.evalTitle}>
          [Evaluation] {titre || "Titre non disponible"}
        </Text>
      </View>
      <View style={styles.evalBottom}>
        <View style={styles.evalBottomLeft}>
          <TimetableSmall />
          <Text style={styles.evalContent}>
            {dates || "Date non disponible"}
          </Text>
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
    marginBottom: 15,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  evalTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  evalTitle: {
    fontFamily: "Ubuntu_500Medium",
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
    fontFamily: "Ubuntu_400Regular",
    color: "#fff",
  },
});
export default EvalHome;
