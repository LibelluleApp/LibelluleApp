import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CalendarList from "./calendarList";
import EventDay from "./eventDay";

function AgendaHome() {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
