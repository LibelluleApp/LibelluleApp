import React, { useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  CircleAlert,
  Calendar,
  ChevronRight,
} from "../../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ThemeContext } from "./../../../utils/themeContext";

function EvalHome({ date, titre, agenda_id, matiere }) {
  const navigation = useNavigation();

  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    containerEval: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      backgroundColor: colors.red50,
      gap: 10,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderWidth: 0.5,
      borderColor: colors.red300,
    },
    evalText: {
      color: colors.red500,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    rightContainer: {},
  });

  return (
    <TouchableOpacity
      style={styles.containerEval}
      onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
    >
      <View style={styles.leftContainer}>
        <CircleAlert
          stroke={colors.red500}
          width={20}
          height={20}
          strokeWidth={1.75}
        />
        <Text style={styles.evalText}>
          <Text style={{ fontWeight: "bold" }}>[Évaluation]</Text>{" "}
          {matiere || "Titre non disponible"}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <ChevronRight
          stroke={colors.red500}
          strokeWidth={1.75}
          width={18}
          height={18}
        ></ChevronRight>
      </View>
    </TouchableOpacity>
  );
}

export default EvalHome;
