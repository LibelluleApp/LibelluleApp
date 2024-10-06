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
      width: "15%",
      alignItems: "flex-end",
    },
    taskLeft: {
      flexDirection: "row",
      alignItems: "center",
      width: "85%",
    },
    taskLeftContent: {
      gap: 3,
    },
    taskTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: colors.blue950,
    },
    taskContentDate: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue950,
      fontSize: 13,
    },
    taskContentMore: {
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue950,
      fontSize: 13,
    },
    taskDescription: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue800,
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: colors.grey, // Optional: change color when striked through
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
        <BouncyCheckbox
          fillColor={colors.blue700}
          unfillColor={colors.white}
          isChecked={isChecked}
          onPress={handleCheckboxPress}
        />
        <View style={styles.taskLeftContent}>
          <Text style={[styles.taskTitle, isChecked && styles.strikethrough]}>
            {matiere || "Matière indisponible"}
          </Text>
          <Text
            style={[styles.taskDescription, isChecked && styles.strikethrough]}
          >
            {titre || "Titre indisponible"}
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
