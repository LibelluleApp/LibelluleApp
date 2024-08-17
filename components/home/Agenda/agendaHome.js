import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CalendarList from "./calendarList";
import EventDay from "./eventDay";
import moment from "moment";
import "moment/locale/fr"; // Assurez-vous que la langue est correctement définie si vous utilisez des formats localisés

function AgendaHome() {
  const todayDate = moment();
  if (todayDate.day() === 0) {
    todayDate.add(1, "days");
  } else if (todayDate.day() === 6) {
    todayDate.add(2, "days");
  }

  const [selectedDate, setSelectedDate] = useState(todayDate);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <View>
      <CalendarList onDateSelect={handleDateSelect} />
      <EventDay date={selectedDate} />
    </View>
  );
}

export default AgendaHome;
