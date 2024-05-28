import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LeftArrow } from "../../../assets/icons/Icons";
import * as Progress from "react-native-progress";

function Eval() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.leftContainer}>
              <Text style={styles.taskTitle}>Anglais</Text>
              <Text style={styles.taskDesc}>Finir de lire le livre</Text>
            </View>
            <LeftArrow fill="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.leftContainer}>
              <Text style={styles.taskTitle}>Anglais</Text>
              <Text style={styles.taskDesc}>Finir de lire le livre</Text>
            </View>
            <LeftArrow fill="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.progression}>
          <Text style={styles.progressText}>1/3 tâches</Text>
          <Text style={styles.progressText}>33%</Text>
        </View>
        <Progress.Bar
          progress={0.3}
          width={null}
          height={4}
          animated={false}
          unfilledColor="#345496"
          borderWidth={0}
          color="#fff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  topContainer: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: "column",
    gap: 11,
    backgroundColor: "#0760FB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    width: "100%",
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor: "#0F4199",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 5,
  },
  progressText: {
    color: "#fff",
    fontFamily: "Ubuntu_500Medium",
    fontSize: 11,
  },
  progression: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#fff",
  },
  taskDesc: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#fff",
  },
});

export default Eval;
