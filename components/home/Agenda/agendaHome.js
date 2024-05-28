import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CalendarList from "./calendarList";
import EventDay from "./eventDay";

function AgendaHome() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <View>
      <CalendarList onDateSelect={handleDateSelect} />
      <EventDay />
    </View>
  );
}

export default AgendaHome;
