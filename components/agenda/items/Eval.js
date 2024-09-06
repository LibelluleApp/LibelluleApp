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
    evalTask: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.red700,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 17,
      paddingVertical: 12,
    },
    evalRight: {
      width: "15%",
      alignItems: "flex-end",
    },
    evalLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      width: "85%",
    },
    evalTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: colors.white,
    },
  });

  const [dates, setDates] = useState(moment(date).format("ddd D MMMM"));
  return (
    <TouchableOpacity
      style={styles.evalTask}
      onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
    >
      <View style={styles.evalLeft}>
        <CircleAlert
          stroke={colors.white}
          width={20}
          height={20}
          strokeWidth={1.75}
        />
        <Text style={styles.evalTitle}>
          [Évaluation] {matiere || "Titre non disponible"}
        </Text>
      </View>
      <View style={styles.evalRight}>
        <ChevronRight
          stroke={colors.white}
          strokeWidth={1.75}
          width={18}
          height={18}
        />
      </View>
    </TouchableOpacity>
  );
}

export default EvalHome;
