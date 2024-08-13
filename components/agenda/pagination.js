import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LeftArrowAgenda, RightArrowAgenda } from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";

const PaginationHeader = ({
  currentDay,
  onPrev,
  onNext,
  index,
  returnToday,
  defaultIndex,
  currentWeekNumber,
  evalCount,
  taskCount,
}) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
    },
    recap: {
      marginBottom: 20,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      alignItems: "center",
    },
    day: {
      fontSize: 15,
      fontFamily: "Ubuntu_500Medium",
      color: colors.black,
    },
    btntoday: {
      alignSelf: "center",
    },
    around: {
      padding: 10,
    },
    return: {
      fontSize: 15,
      fontFamily: "Ubuntu_500Medium",
      color: colors.grey,
      paddingHorizontal: 24,
      textDecorationLine: "underline",
    },
    week: {
      fontSize: 17,
      fontFamily: "Ubuntu_500Medium",
      color: colors.black,
      paddingHorizontal: 24,
    },
    counts: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      marginTop: 10,
      marginBottom: 20,
      paddingHorizontal: 24,
      width: "95%",
    },
    evalCount: {
      flexDirection: "row",
      justifyContent: "center",
      borderColor: colors.red_variable,
      borderWidth: 1,
      paddingHorizontal: 13,
      paddingVertical: 7,
      borderRadius: 10,
      width: "50%",
    },
    taskCount: {
      flexDirection: "row",
      justifyContent: "center",
      borderColor: colors.blue_variable,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 13,
      paddingVertical: 7,
      width: "50%",
    },
    evalText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.red_variable,
    },
    taskText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue_variable,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.recap}>
        <Text style={styles.week}>Semaine {currentWeekNumber}</Text>
      </View>
      <View style={styles.content}>
        {index > 0 && (
          <TouchableOpacity
            onPress={onPrev}
            style={styles.around}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <LeftArrowAgenda fill={colors.black} />
          </TouchableOpacity>
        )}
        {index === 0 && (
          <TouchableOpacity
            disabled={true}
            style={styles.around}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <LeftArrowAgenda fill={colors.black} />
          </TouchableOpacity>
        )}

        <Text style={styles.day}>{currentDay}</Text>
        <TouchableOpacity
          onPress={onNext}
          style={styles.around}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <RightArrowAgenda fill={colors.black} />
        </TouchableOpacity>
      </View>
      {index !== defaultIndex && (
        <TouchableOpacity onPress={returnToday} style={styles.btntoday}>
          <Text style={styles.return}>Revenir à aujourd'hui</Text>
        </TouchableOpacity>
      )}
      {index === defaultIndex && (
        <TouchableOpacity
          onPress={returnToday}
          style={{ opacity: 0 }}
          disabled={true}
        >
          <Text style={styles.return}>Revenir à aujourd'hui</Text>
        </TouchableOpacity>
      )}
      <View style={styles.counts}>
        <View style={styles.evalCount}>
          <Text style={styles.evalText}>{evalCount} évaluation prévue</Text>
        </View>
        <View style={styles.taskCount}>
          <Text style={styles.taskText}>{taskCount} tâche restante</Text>
        </View>
      </View>
    </View>
  );
};

export default PaginationHeader;
