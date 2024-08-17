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
  console.log(matiere);
  const navigation = useNavigation();

  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    evalTask: {
      backgroundColor: colors.red700,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 17,
      paddingVertical: 12,
    },
    evalTop: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    evalTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: colors.white,
    },
    evalBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    evalBottomLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    evalBottomRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    evalContentDate: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.white,
      fontSize: 13,
    },
    evalContentMore: {
      fontFamily: "Ubuntu_500Medium",
      color: colors.white,
      fontSize: 13,
    },
  });

  const [dates, setDates] = useState(moment(date).format("ddd D MMMM"));
  return (
    <TouchableOpacity
      style={styles.evalTask}
      onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
    >
      <View style={styles.evalTop}>
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
      <View style={styles.evalBottom}>
        <View style={styles.evalBottomLeft}>
          <Calendar
            stroke={colors.white}
            width={15}
            height={15}
            strokeWidth={1.75}
          />
          <Text style={styles.evalContentDate}>
            {dates || "Date non disponible"}
          </Text>
        </View>
        <View style={styles.evalBottomRight}>
          <Text style={styles.evalContentMore}>Voir plus</Text>
          <ChevronRight
            stroke={colors.white}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default EvalHome;
