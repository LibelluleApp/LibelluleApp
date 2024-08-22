import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowLeft, ArrowRight, ResetList } from "../../assets/icons/Icons";
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
      width: "100%",
    },
    recap: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
      width: "90%",
      marginHorizontal: "auto",
    },
    return: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
    },
    week: {
      fontSize: 17,
      fontFamily: "Ubuntu_500Medium",
      color: colors.black,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%",
      marginHorizontal: "auto",
      alignItems: "center",
    },
    day: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      color: colors.black,
    },
    aroundRight: {
      paddingLeft: 20,
      paddingBottom: 20,
      paddingTop: 15,
    },
    aroundLeft: {
      paddingRight: 20,
      paddingBottom: 20,
      paddingTop: 15,
    },
    counts: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 2,
      marginBottom: 20,
      width: "90%",
      marginHorizontal: "auto",
    },
    evalCount: {
      flexDirection: "row",
      justifyContent: "center",
      borderColor: colors.red_variable,
      borderWidth: 1,
      paddingVertical: 7,
      borderRadius: 10,
      width: "51%",
    },
    taskCount: {
      flexDirection: "row",
      justifyContent: "center",
      borderColor: colors.blue_variable,
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 7,
      width: "45%",
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
        {index !== defaultIndex && (
          <TouchableOpacity
            onPress={returnToday}
            style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}
          >
            <ResetList stroke={colors.grey_variable} strokeWidth={1.75} />
          </TouchableOpacity>
        )}
        {index === defaultIndex && (
          <TouchableOpacity
            onPress={returnToday}
            style={{
              opacity: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
            }}
            disabled={true}
          >
            <ResetList stroke={colors.grey_variable} strokeWidth={1.75} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        {index > 0 && (
          <TouchableOpacity
            onPress={onPrev}
            style={styles.aroundLeft}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <ArrowLeft
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        )}
        {index === 0 && (
          <TouchableOpacity
            disabled={true}
            style={styles.aroundLeft}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <ArrowLeft
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.day}>{currentDay}</Text>
        <TouchableOpacity
          onPress={onNext}
          style={styles.aroundRight}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ArrowRight
            stroke={colors.black}
            strokeWidth={1.75}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.counts}>
        <View style={styles.evalCount}>
          <Text style={styles.evalText}>
            {evalCount} évaluation{evalCount > 1 ? "s prévues" : " prévue"}
          </Text>
        </View>
        <View style={styles.taskCount}>
          <Text style={styles.taskText}>
            {taskCount} tâche{taskCount > 1 ? "s restantes" : " restante"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaginationHeader;
