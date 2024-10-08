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
import { UserRound, MapPin } from "../../assets/icons/Icons";
import moment from "moment";
import Header from "./Header";

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



const Jour = () => {
  const navigator = useNavigation();
  const { colors } = useContext(ThemeContext);
  const calendarRef = useRef(null);
  const isFocused = useIsFocused();
  const [timetable, setTimetable] = useState([]);

  const MIN_DATE = new Date(
      new Date().getFullYear() - 2,
      new Date().getMonth(),
      new Date().getDate()
  ).toISOString();

  const MAX_DATE = new Date(
      new Date().getFullYear() + 2,
      new Date().getMonth(),
      new Date().getDate()
  ).toISOString();

  const INITIAL_DATE = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
  ).toISOString();

  useEffect(() => {
    if (isFocused) {
      getTimetable().then(data => setTimetable(data));
    }
  }, [isFocused]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    itemContainer: {
      flex: 1,
      width: Dimensions.get("window").width,
      justifyContent: "flex-start",
      paddingHorizontal: "5%",
    },
    eventBack: {
      paddingVertical: 3,
      paddingHorizontal: 3
    },
    eventBottom: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    eventContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    eventContainer: {
      height: "100%",
      paddingHorizontal: 15,
      borderRadius: 10,
      gap: 7,
      justifyContent: "center",
      // backgroundColor: colorTimetable,
      backgroundColor: colors.blue200,
      position: "relative",
      overflow: "hidden",
    },

    eventContainerLittle: {
      height: "100%",
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "center",
      // backgroundColor: colorTimetable,
      backgroundColor: colors.blue600,
    },
    beforeElement: {
      width: 7,
      height: 400,
      backgroundColor: colors.blue500,
      position: "absolute",
      left: 0,
      top: 0,
    },
    eventTextContent: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.blue800,
      gap: 10,
    },
    eventTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.blue950,
      maxWidth: "100%",
    },
    eventTitleLittle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 12,
      color: colors.blue950,
      maxWidth: "100%",
    },
    eventTitleAlternance: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 20,
      color: colors.blue950,
      maxWidth: "100%",
      alignItems: "center",
      justifyContent: "center",
      transform: [{ rotate: "-90deg" }],
    },
    eventContainerAlternance: {
      height: "100%",
      paddingVertical: 10,
      paddingHorizontal: 10,
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

  const height =
    Dimensions.get("screen").height / 17.7 +
    (Platform.OS === "android" ? 1 : 0);

  return (
    <View style={styles.container}>
      <CalendarContainer
          initialDate={INITIAL_DATE}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        showWeekNumber={true}
        ref={calendarRef}
        numberOfDays={1}
        start={8 * 60}
        end={18.5 * 60}
        hideWeekDays={[6, 7]}
        events={timetable}
        useHaptic={true}
        scrollToNow={true}
        isShowHalfLine={false}
        initialTimeIntervalHeight={height}
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
          headerContainer: {
            borderBottomWidth: 0
          }
        }}
      >
        <CalendarHeader renderHeaderItem={(props) => <Header {...props} />} />
        <CalendarBody
          renderEvent={(event) => {
            const formattedProfessor = event.professor
              ? formatProfessorName(event.professor)
              : "N/C";
            if (event._internal.duration < 60) {
              return (
                <View style={styles.eventBack}>
                  <View style={styles.eventContainerLittle}>
                    <Text
                      style={styles.eventTitleLittle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {event.title} - {event.location || "N/C"} -{" "}
                      {formattedProfessor}
                    </Text>
                  </View>
                </View>
              );
            }
            if (event._internal.duration > 600) {
              return (
                <View style={styles.eventBack}>
                  <View style={styles.eventContainerAlternance}>
                    <Text
                      style={styles.eventTitleAlternance}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
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
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {event.title}
                  </Text>
                  <View style={styles.eventBottom}>
                    <View style={styles.eventContent}>
                      <MapPin
                        stroke={colors.blue800}
                        width={14}
                        height={14}
                        strokeWidth={1.75}
                      />
                      <Text style={styles.eventTextContent}>
                        {event.location || "N/C"}
                      </Text>
                    </View>
                    <View style={styles.eventContent}>
                      <UserRound
                        stroke={colors.blue800}
                        width={14}
                        height={14}
                        strokeWidth={1.75}
                      />
                      <Text style={styles.eventTextContent}>
                        {formattedProfessor}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </CalendarContainer>
    </View>
  );
};

export default Jour;
