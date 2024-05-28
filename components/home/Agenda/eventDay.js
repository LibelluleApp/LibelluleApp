import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CalendarFill } from "../../../assets/icons/Icons";
import { Orage } from "../../../assets/icons/Weather";
import Eval from "./Eval";
import Task from "./Task";

function EventDay() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.hourContainer}>
          <CalendarFill />
          <Text style={styles.hourContent}>7h30 de cours</Text>
        </View>
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherContent}>8°C</Text>
          <Image
            source={require("../../../assets/icons/weather/storm.png")}
            style={styles.weatherIcon}
          />
        </View>
      </View>
      <Eval />
      <Task />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 25,
    gap: 11,
    justifyContent: "space-between",
  },
  hourContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  hourContent: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 13,
    color: "#7A797C",
    textAlign: "center",
  },
  weatherContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  weatherContent: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#7A797C",
    textAlign: "center",
  },
  weatherIcon: {
    width: 23,
    height: 23,
  },
});

export default EventDay;
