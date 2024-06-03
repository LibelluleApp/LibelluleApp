import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PeopleFill, Location } from "../../../assets/icons/Icons";

const EventList = ({
  heureDebut,
  heureFin,
  matiere,
  salle,
  professeur,
  id,
  evaluation,
  couleur,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.hour}>
        <Text style={styles.textHour}>{heureDebut}</Text>
        <Text style={styles.textHour}>{heureFin}</Text>
      </View>
      <View style={[styles.content, { backgroundColor: couleur }]}>
        <Text style={styles.textSubject}>{matiere}</Text>
        <View style={styles.teacher}>
          <View style={styles.detail}>
            <Location />
            <Text style={styles.textTeacher}>{salle.slice(0, 14)}...</Text>
          </View>
          <View style={styles.detail}>
            <PeopleFill />
            <Text style={styles.textTeacher}>{professeur}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Break = ({ duree }) => {
  return (
    <View style={styles.containerBreak}>
      <View style={styles.stick}></View>
      <Text style={styles.textBreak}>{duree}</Text>
      <View style={styles.stick}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F9",
    flexDirection: "row",
    marginBottom: 10,
    gap: 12,
    alignSelf: "center",
    marginVertical: 7,
  },
  hour: {
    gap: 8,
    justifyContent: "center",
  },
  textHour: {
    fontFamily: "Ubuntu_500Medium",
    includeFontPadding: false,
    fontSize: 17,
    color: "#252525",
  },
  content: {
    marginLeft: 10,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  textSubject: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#FFF",
  },
  teacher: {
    flexDirection: "row",
    gap: 5,
  },
  textTeacher: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#FFF",
  },
  detail: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  //   Break Styles
  containerBreak: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
  },
  stick: {
    backgroundColor: "#7A797C",
    height: 1,
    width: "40%",
  },
  textBreak: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#7A797C",
  },
});

export default EventList;
export { Break };
