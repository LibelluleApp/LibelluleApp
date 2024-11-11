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
import TouchableScale from "react-native-touchable-scale";

function EvalHome({ date, titre, agenda_id, matiere }) {
  const navigation = useNavigation();

  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    containerEval: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      backgroundColor: colors.red50_eval,
      gap: 10,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 17,
      borderWidth: 0.5,
      borderColor: colors.red300_eval,
      marginTop: 10,
    },
    evalText: {
      color: colors.red500_eval,
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
    <TouchableScale
      friction={6}
      activeScale={0.97}
      onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
    >
      <View style={styles.containerEval}>
        <View style={styles.leftContainer}>
          <CircleAlert
            stroke={colors.red500}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.evalText}>
            <Text
              style={{
                color: colors.red500,
                fontFamily: "Ubuntu_500Medium",
                letterSpacing: -0.4,
                fontSize: 14,
              }}
            >
              [Évaluation]
            </Text>{" "}
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
      </View>
    </TouchableScale>
  );
}

export default EvalHome;
