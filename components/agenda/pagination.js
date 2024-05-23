import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LeftArrowAgenda, RightArrowAgenda } from "../../assets/icons/Icons";

const PaginationHeader = ({
  currentDay,
  onPrev,
  onNext,
  index,
  returnToday,
  defaultIndex,
  currentWeekNumber,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.recap}>
        <Text style={styles.week}>Semaine {currentWeekNumber}</Text>
        <View style={styles.counts}>
          <View style={styles.evalCount}>
            <Text style={styles.evalText}>1 évaluation prévue</Text>
          </View>
          <View style={styles.taskCount}>
            <Text style={styles.taskText}>1 tâche restante</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        {index > 0 && (
          <TouchableOpacity onPress={onPrev} style={styles.around} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <LeftArrowAgenda fill="#252525" />
          </TouchableOpacity>
        )}
        {index === 0 && (
          <TouchableOpacity disabled={true} style={styles.around} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <LeftArrowAgenda fill="#7A7C7C" />
          </TouchableOpacity>
        )}

        <Text style={styles.day}>{currentDay}</Text>
        <TouchableOpacity onPress={onNext} style={styles.around} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <RightArrowAgenda fill="#252525" />
        </TouchableOpacity>
      </View>
      {index !== defaultIndex && (
        <TouchableOpacity onPress={returnToday} style={styles.btntoday}>
          <Text style={styles.return}>Revenir à aujourd'hui</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#F4F5F9",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#F4F5F9",
  },
  day: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
  },
  btntoday: {
    alignSelf: "flex-start",
  },
  around: {
    padding: 10,
  },
  return: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
    color: "#7A797C",
    paddingHorizontal: 24,
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  week: {
    fontSize: 17,
    fontFamily: "Ubuntu_500Medium",
    color: "#252525",
    paddingHorizontal: 24,
  },
  counts: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  evalCount: {
    borderColor: "#BB0000",
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 10,
  },
  taskCount: {
    borderColor: "#0760FB",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  evalText: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#BB0000",
  },
  taskText: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#0760FB",
  },
});

export default PaginationHeader;
