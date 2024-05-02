import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Warning, TimetableSmall, LeftArrow } from "../../assets/icons/Icons";

import EvalHome from "./Agenda/Eval";
import TaskHome from "./Agenda/Task";

function AgendaHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>L'agenda pour demain</Text>
      <View style={styles.counts}>
        <View style={styles.evalCount}>
          <Text style={styles.evalText}>1 évaluation prévue</Text>
        </View>
        <View style={styles.taskCount}>
          <Text style={styles.taskText}>1 tâche restante</Text>
        </View>
      </View>
      <EvalHome />
      <TaskHome />
      <TaskHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Ubuntu_400Regular",
    marginTop: 22,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#7A797C",
    marginBottom: 14,
  },
  counts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  evalCount: {
    borderColor: "#BB0000",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  taskCount: {
    borderColor: "#5088F3",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  evalText: {
    fontFamily: "Ubuntu_500Medium",
    color: "#BB0000",
  },
  taskText: {
    fontFamily: "Ubuntu_500Medium",
    color: "#5088F3",
  },
});

export default AgendaHome;
