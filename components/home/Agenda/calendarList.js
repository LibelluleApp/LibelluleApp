import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import countTaskWeek from "../../../api/Agenda/countTaskWeek";
import { ThemeContext } from "././../../../utils/themeContext";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

function CalendarList({ onDateSelect }) {
  const { colors } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [dates, setDates] = useState([]);

  const styles = StyleSheet.create({
    container: {
      marginVertical: 25,
      width: "90%",
      alignSelf: "center",
      flexDirection: "row",
    },
    dateContainer: {
      position: "relative",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: colors.blue700,
      paddingVertical: 10,
      paddingHorizontal: 13,
      borderRadius: 10,
    },
    container_notif: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: colors.background,
      borderRadius: 100,
      width: 17,
      height: 17,
      borderWidth: 0.5,
      borderColor: colors.blue700,
    },
    notif_text: {
      color: colors.blue700,
      fontSize: 10,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      textAlign: "center",
    },
    selected: {
      backgroundColor: colors.blue700,
    },
    dateText: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.blue700,
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

  const currentDate = moment(); // Garde l'objet moment sans formatter immédiatement
  const adjustedStartDate = getNextWeekday(currentDate.clone()); // Utilise clone pour éviter les modifications sur currentDate

  const weekDays = [];

  let date = adjustedStartDate.clone();
  while (weekDays.length < 5) {
    weekDays.push(date.clone());
    date.add(1, "days");
    if (date.day() === 6) {
      date.add(2, "days"); // Saute les weekends
    }
  }

  // Formate les jours de la semaine en "YYYY-MM-DD"
  const formattedWeekDays = weekDays.map((day) => day.format("YYYY-MM-DD"));

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

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        const taskCount = await countTaskWeek(formattedWeekDays);
        setDates(taskCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTaskCount();

    if (isFocused) {
      fetchTaskCount();
    }
  }, [isFocused]);
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
        {dates.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateContainer,
              index === selectedDay && styles.selected,
              index < dates.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => handleDayPress(index)}
          >
            <Text
              style={[
                styles.dateText,
                index === selectedDay && styles.selectedText,
              ]}
            >
              {moment(day.date).format("ddd").replace(".", "")}{" "}
            </Text>
            <Text
              style={[
                styles.dateText,
                index === selectedDay && styles.selectedText,
              ]}
            >
              {moment(day.date).format("DD")}
            </Text>
            <Text
              style={[
                styles.dateText,
                index === selectedDay && styles.selectedText,
              ]}
            >
              {moment(day.date).format("MMM")}
            </Text>

            {index !== selectedDay && day.count > 0 && (
              <View style={styles.container_notif}>
                <Text style={styles.notif_text}>{day.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ShimmerPlaceHolder>
  );
}

export default CalendarList;
