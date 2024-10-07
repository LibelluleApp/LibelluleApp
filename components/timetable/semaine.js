import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from "@howljs/calendar-kit";
import { ThemeContext } from "../../utils/themeContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchTimetable from "../../api/Timetable/timetable";

const getTimetable = async () => {
  try {
    const response = await fetchTimetable();
    return response || null;
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
};

const formatProfessorName = (professor) => {
  const parts = professor?.split(" ");
  if (parts.length < 2) return professor;
  const initial = parts[1][0];
  const nom = parts[0];
  return `${initial}. ${nom}`;
};

const INITIAL_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
).toISOString();

const Semaine = () => {
  const { colors } = useContext(ThemeContext);
  const calendarRef = useRef(null);
  const isFocused = useIsFocused();
  const [timetable, setTimetable] = useState(null);
  const [colorAlternant, setColorAlternant] = useState(colors.grey);
  const [colorTimetable, setColorTimetable] = useState(colors.blue_variable);

  const getColorAlternant = async () => {
    try {
      let storedColor = await AsyncStorage.getItem("color_alternant");
      if (storedColor) {
        storedColor = storedColor.replace(/['"]+/g, "");
        setColorAlternant(storedColor);
      } else {
        setColorAlternant(colors.grey);
      }
    } catch (error) {
      console.error("Failed to fetch color from storage:", error);
    }
  };

  const getColorTimetable = async () => {
    try {
      let storedColor = await AsyncStorage.getItem("color_timetable");
      if (storedColor) {
        storedColor = storedColor?.replace(/['"]+/g, "");
        setColorTimetable(storedColor);
      }
      if (storedColor === null) {
        setColorTimetable(colors.blue_variable);
      }
    } catch (error) {
      console.error("Failed to fetch color from storage:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTimetable().then((response) => {
        setTimetable(response);
      });
      getColorAlternant();
      getColorTimetable();
    }
  }, [isFocused]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 10,
      paddingTop: 10,
    },
    itemContainer: {
      flex: 1,
      width: Dimensions.get("window").width,
      justifyContent: "start",
      paddingHorizontal: "5%",
    },
    eventTitle: {
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue950,
      fontSize: 11,
      maxWidth: "100%",
      alignItems: "start",
    },
    eventBack: {
      paddingVertical: 1,
    },
    eventContainer: {
      height: "100%",
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      // backgroundColor: colorTimetable,
      backgroundColor: colors.blue200,
      // position: "relative",
      // overflow: "hidden",
    },
    // beforeElement: {
    //   width: 5,
    //   height: 400,
    //   backgroundColor: colors.blue500,
    //   position: "absolute",
    //   left: 0,
    //   top: 0,
    // },
    eventTitleAlternance: {
      fontFamily: "Ubuntu_500Medium",
      includeFontPadding: false,
      fontSize: 15,
      width: 85,
      color: colors.blue950,
      alignItems: "center",
      justifyContent: "center",
      transform: [{ rotate: "-90deg" }],
    },
    eventContainerAlternance: {
      height: "100%",
      width: "100%",

      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.blue200,
    },
  });

  if (!timetable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue_variable} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CalendarContainer
        viewMode={"week"}
        minDate={"2024-09-02"}
        timeZone="Europe/Paris"
        showWeekNumber={true}
        ref={calendarRef}
        numberOfDays={5}
        start={8 * 60}
        end={18.5 * 60}
        hideWeekDays={[6, 7]}
        events={timetable}
        initialDate={INITIAL_DATE}
        isShowHalfLine={false}
        theme={{
          backgroundColor: colors.background,
          dayNumberContainer: {
            backgroundColor: colors.background,
          },
          colors: {
            background: colors.background,
            border: colors.gray_clear,
            text: colors.blue950,
          },
          textStyle: {
            fontFamily: "Ubuntu_500Medium",
          },
          todayNumberContainer: {
            backgroundColor: colors.blue700,
          },
          todayNumber: {
            color: colors.white,
          },
          todayName: {
            color: colors.blue700,
          },
          dayName: {
            color: colors.grey,
            fontFamily: "Ubuntu_400Regular",
          },
          dayNumber: {
            color: colors.grey,
            fontFamily: "Ubuntu_400Regular",
          },
          leftBarText: {
            fontFamily: "Ubuntu_500Medium",
            color: colors.blue950,
            textTransform: "capitalize",
            fontSize: 12,
          },
          hourTextStyle: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 12,
            color: colors.grey,
          },
          // Week number
          weekNumber: {
            color: colors.blue950,
            fontFamily: "Ubuntu_500Medium",
          },
          weekNumberContainer: {
            backgroundColor: colors.blue100,
          },
        }}
      >
        <CalendarHeader />
        <CalendarBody
          renderEvent={(event) => {
            if (event._internal.duration > 600) {
              return (
                <View style={styles.eventBack}>
                  <View style={styles.eventContainerAlternance}>
                    <Text style={styles.eventTitleAlternance} numberOfLines={1}>
                      {event.title}
                    </Text>
                  </View>
                </View>
              );
            }
            return (
              <View style={styles.eventBack}>
                <View style={styles.eventContainer}>
                  {/* <View style={styles.beforeElement} /> */}
                  <Text
                    style={styles.eventTitle}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                  >
                    {event.title}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </CalendarContainer>
    </View>
  );
};

export default Semaine;
