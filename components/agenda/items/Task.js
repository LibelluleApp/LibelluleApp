import React, { useState, useContext, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar, ChevronRight } from "../../../assets/icons/Icons";
import * as Haptics from "expo-haptics";
import { checkAgenda, uncheckAgenda } from "../../../api/Agenda/check";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ThemeContext } from "./../../../utils/themeContext";
import TouchableScale from "react-native-touchable-scale";

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
      alignItems: component === "little" ? "center" : "flex-start",
      gap: component === "little" ? 7 : 3,
      flex: component === "little" ? 1 : 0,
    },
    taskTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: component === "little" ? 13 : 16,
      color: colors.regular950,
      maxWidth: component === "little" ? 100 : "90%",
    },
    taskDescription: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular800,
      maxWidth: component === "little" ? "auto" : "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flex: component === "little" ? 1 : 0,
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: colors.grey,
    },
  });

  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxPress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (newCheckedState) {
      checkAgenda(agenda_id);
      if (typeof onTaskCheck === "function") {
        onTaskCheck(agenda_id);
      }
    } else {
      uncheckAgenda(agenda_id);
      if (typeof onTaskUncheck === "function") {
        onTaskUncheck(agenda_id);
      }
    }
  };

  return (
      <TouchableScale
          friction={6}
          activeScale={0.97}
          onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
      >
        <View style={styles.evalTask}>
          <View style={styles.taskLeft}>
            {bouncyBox && (
                <BouncyCheckbox
                    fillColor={colors.regular700}
                    unfillColor={colors.white}
                    isChecked={isChecked}
                    onPress={handleCheckboxPress}
                    disableText={true}
                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                />
            )}
            <View style={styles.taskLeftContent}>
              <Text style={[styles.taskTitle, isChecked && styles.strikethrough]}>
                {matiere || "Matière indisponible"}
              </Text>
              <Text
                  style={[
                    styles.taskDescription,
                    isChecked && styles.strikethrough,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
              >
                {titre || "Titre indisponible"}
              </Text>
            </View>
          </View>
          <View style={styles.taskRight}>
            <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
            />
          </View>
        </View>
      </TouchableScale>
  );
}

export default TaskHome;