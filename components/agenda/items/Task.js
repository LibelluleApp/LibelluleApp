import React, { useState, useContext } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar, ChevronRight } from "../../../assets/icons/Icons";
import * as Haptics from "expo-haptics";
import { checkAgenda, uncheckAgenda } from "../../../api/Agenda/check";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ThemeContext } from "./../../../utils/themeContext";

function TaskHome({
  date,
  titre,
  agenda_id,
  matiere,
  checked,
  onTaskCheck,
  onTaskUncheck,
  component,
  bouncyBox,
}) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    evalTask: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 17,
      paddingVertical: 12,
      marginTop: 10,
    },
    taskRight: {
      alignItems: "flex-end",
      width: "15%",
    },
    taskLeft: {
      flexDirection: "row",
      alignItems: "center",
      width: "85%",
      gap: 15,
    },
    taskLeftContent: {
      flexDirection: component === "little" ? "row" : "column",
      alignItems: component === "little" ? "center" : "flex-start", // Correction pour l'alignement
      gap: component === "little" ? 7 : 3,
      flex: component === "little" ? 1 : 0, // Permet à ce conteneur de prendre de l'espace disponible
    },
    taskTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: component === "little" ? 13 : 16,
      color: colors.blue950,
      maxWidth: component === "little" ? 100 : "90%", // Limite la largeur
    },
    taskDescription: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue800,
      maxWidth: component === "little" ? "auto" : "100%", // Limite la largeur
      overflow: "hidden", // Cache le texte débordant
      textOverflow: "ellipsis", // Ajoute des points de suspension si le texte déborde
      whiteSpace: "nowrap", // Empêche le retour à la ligne
      flex: component === "little" ? 1 : 0, // Permet au texte de prendre tout l'espace disponible
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: colors.grey,
    },
  });

  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isChecked) {
      uncheckAgenda(agenda_id);
      if (typeof onTaskUncheck === "function") {
        onTaskUncheck(agenda_id);
      }
    } else {
      checkAgenda(agenda_id);
      if (typeof onTaskCheck === "function") {
        onTaskCheck(agenda_id);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.evalTask}
      onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
    >
      <View style={styles.taskLeft}>
        {bouncyBox && (
          <BouncyCheckbox
            fillColor={colors.blue700}
            unfillColor={colors.white}
            isChecked={isChecked}
            onPress={handleCheckboxPress}
            disableText={true}
            hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
            // style={{ padding: 10 }}
          />
        )}
        <View style={styles.taskLeftContent}>
          <Text style={[styles.taskTitle, isChecked && styles.strikethrough]}>
            {matiere || "Matière indisponible"}
          </Text>
          <Text
            style={[styles.taskDescription, isChecked && styles.strikethrough]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {titre || "Titre indisponible"} dededed
          </Text>
        </View>
      </View>
      <View style={styles.taskRight}>
        <ChevronRight
          stroke={colors.blue700}
          strokeWidth={1.75}
          width={18}
          height={18}
        />
      </View>
    </TouchableOpacity>
  );
}

export default TaskHome;
