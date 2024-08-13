import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { is } from "date-fns/locale";
import { isLoading } from "expo-font";
import { set } from "date-fns";
import { ThemeContext } from "././../../../utils/themeContext";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

function CalendarList({ onDateSelect }) {
  const { colors } = useContext(ThemeContext);

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
      borderColor: colors.blue_variable,
      paddingVertical: 10,
      paddingHorizontal: 13,
      borderRadius: 10,
    },
    selected: {
      backgroundColor: colors.blue_variable,
    },
    dateText: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue_variable,
    },
    selectedText: {
      color: colors.white,
    },
  });

  function getNextWeekday(date) {
    const day = date.day();
    if (day === 0) {
      // Dimanche
      date.add(1, "days"); // Passe au lundi
    } else if (day === 6) {
      // Samedi
      date.add(2, "days"); // Passe au lundi
    }
    return date;
  }

  const currentDate = moment();
  const adjustedStartDate = getNextWeekday(currentDate.clone());

  const weekDays = [];

  let date = adjustedStartDate.clone();
  while (weekDays.length < 5) {
    weekDays.push(date.clone());
    date.add(1, "days");
    if (date.day() === 6) {
      date.add(2, "days"); // Saute les weekends
    }
  }

  // Calculer l'index du jour actuel ajusté
  const currentDayIndex = weekDays.findIndex((day) =>
    day.isSame(adjustedStartDate, "day")
  );

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(currentDayIndex);

  const handleDayPress = (index) => {
    setSelectedDay(index);
    const selectedDate = weekDays[index].toDate();
    onDateSelect(selectedDate);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <ShimmerPlaceHolder
      shimmerStyle={{
        borderRadius: 15,
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
      }}
      height={70}
      visible={isLoading ? false : true}
    >
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
    </ShimmerPlaceHolder>
  );
}

export default CalendarList;
