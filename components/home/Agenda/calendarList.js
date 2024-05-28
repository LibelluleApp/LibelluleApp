import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";

function CalendarList({ onDateSelect }) {
  const currentDate = moment();
  const currentDayIndex = currentDate.day() - 1;

  const startOfWeek = currentDate.clone().startOf("week");

  const weekDays = [];

  for (let i = 0; i < 5; i++) {
    const day = startOfWeek.clone().add(i, "days");
    weekDays.push(day);
  }
  const [selectedDay, setSelectedDay] = useState(currentDayIndex);

  const handleDayPress = (index) => {
    setSelectedDay(index);
    const selectedDate = weekDays[index].toDate(); // Convertir la date Moment.js en objet JavaScript Date
    onDateSelect(selectedDate); // Appeler la fonction de rappel avec la date sélectionnée
  };
  return (
    <View style={styles.container}>
      {weekDays.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateContainer,
            index === selectedDay && styles.selected,
            index < weekDays.length - 1 && { marginRight: 10 },
          ]}
          onPress={() => handleDayPress(index)}
        >
          <Text
            style={[
              styles.dateText,
              index === selectedDay && styles.selectedText,
            ]}
          >
            {day.format("ddd").replace(".", "")}
          </Text>
          <Text
            style={[
              styles.dateText,
              index === selectedDay && styles.selectedText,
            ]}
          >
            {day.format("DD")}
          </Text>
          <Text
            style={[
              styles.dateText,
              index === selectedDay && styles.selectedText,
            ]}
          >
            {day.format("MMM")}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
  },
  dateContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#0760FB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "#0760FB",
  },
  dateText: {
    fontSize: 15,
    fontFamily: "Ubuntu_400Regular",
    color: "#0760FB",
  },
  selectedText: {
    color: "#FFF",
  },
});

export default CalendarList;
