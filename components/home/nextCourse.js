import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Location, PeopleFill, Clock } from "../../assets/icons/Icons";

function NextCourse() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.hour}>
        <Text style={styles.textHour}>16:30</Text>
        <Text style={styles.textHour}>18:00</Text>
      </View>
      <View style={styles.stick}></View>
      <View style={styles.contentLeft}>
        <Text style={styles.textSubject}>Anglais</Text>
        <View style={styles.teacher}>
          <View style={styles.content}>
            <Location />
            <Text style={styles.textTeacher}>MMI311</Text>
          </View>
          <View style={styles.content}>
            <PeopleFill />
            <Text style={styles.textTeacher}>C.Mercier</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Clock />
          <Text style={styles.textTeacher}>
            Dans <Text style={styles.hourClock}>44 minutes</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5088F3",
    fontFamily: "Ubuntu_400Regular",
    borderRadius: 10,
    width: "90%",
    paddingHorizontal: 17,
    paddingVertical: 15,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  hour: {
    gap: 8,
    justifyContent: "center",
  },
  textHour: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#fff",
  },
  stick: {
    backgroundColor: "#fff",
    height: "90%",
    width: 1,
    marginHorizontal: 14,
  },
  textSubject: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#fff",
  },
  teacher: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textTeacher: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 14,
    color: "#fff",
    gap: 10,
  },
  contentLeft: {
    gap: 5,
    justifyContent: "center",
  },
  hourClock: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 14,
    color: "#fff",
  },
  content: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});

export default NextCourse;
