import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

import { TimelineCalendar } from "@howljs/calendar-kit";
import { MapPin, UserRound, Clock, ResetList } from "../../assets/icons/Icons";
import fetchTimetable from "../../api/Timetable/timetable";
import { ThemeContext } from "./../../utils/themeContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const getTimetable = async () => {
  try {
    const response = await fetchTimetable();
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
};
function formatProfessorName(professor) {
  const parts = professor?.split(" ");
  if (parts.length < 2) return professor;
  const initial = parts[1][0];
  const nom = parts[0];
  return `${initial}. ${nom}`;
}

const Jour = () => {
  const navigator = useNavigation();
  const { colors } = useContext(ThemeContext);
  const calendarRef = React.useRef(null);
  const isFocused = useIsFocused();

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
      justifyContent: "flex-start",
      paddingHorizontal: "5%",
    },
    eventBack: {
      paddingVertical: 2,
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
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "space-around",
      backgroundColor: colors.blue_variable,
    },
    eventTextContent: {
      fontFamily: "Ubuntu_400Regular",
      includeFontPadding: false,
      fontSize: 13,
      color: colors.white,
      gap: 10,
    },
    eventTitle: {
      fontFamily: "Ubuntu_500Medium",
      includeFontPadding: false,
      fontSize: 16,
      color: colors.white,
      maxWidth: "100%",
    },
  });

  if (isFocused) {
    calendarRef.current?.goToDate({
      hourScroll: true,
      animatedHour: true,
      animatedDate: true,
    });
  }

  const [timetable, setTimetable] = React.useState(null);

  React.useEffect(() => {
    getTimetable().then((response) => {
      setTimetable(response);
    });
  }, []);

  if (!timetable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue_variable} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: colors.background,
          alignSelf: "flex-end",
          position: "absolute",
          zIndex: 99,
          marginTop: 13,
        }}
        onPress={() =>
          calendarRef.current?.goToDate({
            hourScroll: true,
            animatedHour: true,
            animatedDate: true,
          })
        }
      >
        <ResetList stroke={colors.grey_variable} strokeWidth={1.75} />
      </TouchableOpacity>
      <TimelineCalendar
        minDate={"2024-09-02"}
        showWeekNumber={true}
        ref={calendarRef}
        start={8}
        end={18.5}
        viewMode="day"
        events={timetable}
        showNowIndicator={true}
        spaceFromTop={4}
        locale="fr"
        theme={{
          backgroundColor: colors.background,
          dayNumberContainer: {
            backgroundColor: colors.background,
          },
          colors: {
            background: colors.background,
            border: colors.grey,
            text: colors.black,
          },
          textStyle: {
            fontFamily: "Ubuntu_500Medium",
          },
          todayNumberContainer: {
            backgroundColor: colors.blue_variable,
          },
          todayNumber: {
            color: colors.white,
          },
          todayName: {
            color: colors.blue_variable,
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
            color: colors.black,
            textTransform: "capitalize",
            fontSize: 12,
          },
          hourText: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 12,
            color: colors.grey,
          },
          cellBorderColor: colors.grey,
        }}
        onPressEvent={(event) => {
          navigator.navigate("DetailEvent", { event });
        }}
        renderEventContent={(event) => {
          const formattedProfessor = event.professor
            ? formatProfessorName(event.professor)
            : "N/C";

          return (
            <View style={styles.eventBack}>
              <View style={styles.eventContainer}>
                <Text
                  style={styles.eventTitle}
                  numberOfLines={1} // Limite le texte à une seule ligne
                  ellipsizeMode="tail"
                >
                  {event.title}
                </Text>
                <View style={styles.eventBottom}>
                  <View style={styles.eventContent}>
                    <MapPin
                      stroke={colors.white}
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
                      stroke={colors.white}
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
    </View>
  );
};

export default Jour;
