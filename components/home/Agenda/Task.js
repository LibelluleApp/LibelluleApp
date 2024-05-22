import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  Warning,
  TimetableSmall,
  LeftArrow,
} from "../../../assets/icons/Icons";
import * as Haptics from "expo-haptics";

function TaskHome() {
  return (
    <TouchableOpacity style={styles.evalTask}>
      <View style={styles.taskTop}>
        <BouncyCheckbox
          fillColor="#0760FB"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#7A797C" }}
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        />
        <View style={styles.taskTopContent}>
          <Text style={styles.taskTitle}>Audiovisuel</Text>
          <Text style={styles.taskDescription}>Rendu de projet</Text>
        </View>
      </View>
      <View style={styles.taskBottom}>
        <View style={styles.taskBottomLeft}>
          <TimetableSmall fill="#252525" />
          <Text style={styles.taskContent}>mar. 2 avril</Text>
        </View>
        <View style={styles.taskBottomRight}>
          <Text style={styles.taskContent}>Voir plus</Text>
          <LeftArrow fill="#252525" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  evalTask: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 15,
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
    fontFamily: "SFProDisplay_500Medium",
    fontSize: 16,
    color: "#252525",
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
    fontFamily: "SFProDisplay_400Regular",
    color: "#252525",
  },
  taskDescription: {
    fontFamily: "SFProDisplay_400Regular",
    color: "#252525",
  },
});
export default TaskHome;
