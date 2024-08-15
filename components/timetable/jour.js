import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import { TimelineCalendar } from "@howljs/calendar-kit";
import { MapPin, UserRound, Clock } from "../../assets/icons/Icons";
import fetchTimetable from "../../api/Timetable/timetable";
import { ThemeContext } from "./../../utils/themeContext";

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
  if (!professor) {
    return null;
  }
  const parts = professor.split(" ");
  if (parts.length == 2) {
    const prenom = parts[1][0];
    const nom = parts[0][0].toUpperCase() + parts[0].slice(1).toLowerCase();
    return `${prenom}. ${nom}`;
  }
}

const Jour = () => {
  const { colors } = useContext(ThemeContext);

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
      paddingVertical: 5,
      backgroundColor: colors.background,
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
      backgroundColor: colors.blue_variable,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "space-around",
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
    },
  });

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
      <TimelineCalendar
        minDate={"2024-09-02"}
        showWeekNumber={true}
        start={8}
        end={18.5}
        viewMode="day"
        events={timetable}
        showNowIndicator={true}
        spaceFromTop={4}
        locale="fr"
        holidays={["2024-09-04", "2024-09-05"]}
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
        }}
        renderEventContent={(event) => {
          const formattedProfessor = event.professor
            ? formatProfessorName(event.professor)
            : "N/C";

          return (
            <View style={styles.eventBack}>
              <View style={styles.eventContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
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
