import React, { useState, useContext } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { TimetableSmall, LeftArrow } from "../../../assets/icons/Icons";
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
      backgroundColor: colors.white_background,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 17,
      paddingVertical: 12,
    },
    taskTop: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    taskTopContent: {
      gap: 3,
    },
    taskTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: colors.black,
    },
    taskBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    taskBottomLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    taskBottomRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    taskContent: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.black,
    },
    taskDescription: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.black,
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: colors.grey, // Optional: change color when striked through
    },
  });

  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(checked);
  const dates = moment(date).format("ddd D MMMM");
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
      <View style={styles.taskTop}>
        <BouncyCheckbox
          fillColor={colors.blue_variable}
          unfillColor={colors.white}
          isChecked={isChecked}
          onPress={handleCheckboxPress}
        />
        <View style={styles.taskTopContent}>
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
      <View style={styles.taskBottom}>
        <View style={styles.taskBottomLeft}>
          <TimetableSmall fill={colors.black} />
          <Text style={styles.taskContent}>{dates || "Date indisponible"}</Text>
        </View>
        <View style={styles.taskBottomRight}>
          <Text style={styles.taskContent}>Voir plus</Text>
          <LeftArrow fill={colors.black} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TaskHome;
