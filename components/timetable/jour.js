import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import CalendarKit from "react-native-calendar-kit";
import { Location, PeopleFill, Clock } from "../../assets/icons/Icons";
import fetchTimetable from "../../api/Timetable/timetable";

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
  const [timetable, setTimetable] = React.useState(null);

  React.useEffect(() => {
    getTimetable().then((response) => {
      setTimetable(response);
    });
  }, []);

  const events = [
    {
      start: "2024-06-14T15:00:00.000Z",
      end: "2024-06-14T16:00:00.000Z",
      id: "1",
      title: "test",
      isAllDay: true,
      color: "#FF0000",
    },
    {
      start: "2024-06-27T00:00:00.000Z",
      end: "2024-06-28T00:00:00.000Z",
      id: "2",
      title: "test",
      isAllDay: true,
      color: "#FF0000",
    },
  ];

  const initialLocales = {
    en: { weekDayShort: "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_") },
  };
  if (!timetable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0760FB" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CalendarKit
        viewMode="day"
        initialLocales={initialLocales}
        locale="en"
        timeZone="Europe/Paris"
        minDate={"2023-09-01"}
        start={8 * 60}
        end={18 * 60}
        showNowIndicator={true}
        minTimeIntervalHeight={40}
        initialTimeIntervalHeight={50}
        theme={{
          colors: {
            background: "#F4F5F9",
            border: "#7A797C50",
            text: "#252525",
          },
          textStyle: {
            fontFamily: "Ubuntu_500Medium",
          },
          todayNumberContainer: {
            backgroundColor: "#0760FB",
          },
          todayNumber: {
            color: "#FFF",
          },
          todayName: {
            color: "#0760FB",
          },
          dayName: {
            color: "#7A797C",
          },
          dayNumber: {
            color: "#7A797C",
          },
          nowIndicatorColor: "#FF0000",
        }}
        events={timetable}
        renderEvent={(event) => {
          const formattedProfessor = event.professor
            ? formatProfessorName(event.professor)
            : "N/C";

          return (
            <View style={styles.eventBack}>
              <View style={styles.eventContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventBottom}>
                  <View style={styles.eventContent}>
                    <Location />
                    <Text style={styles.eventTextContent}>
                      {event.location || "N/C"}
                    </Text>
                  </View>
                  <View style={styles.eventContent}>
                    <PeopleFill />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
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
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  eventTextContent: {
    fontFamily: "Ubuntu_400Regular",
    includeFontPadding: false,
    fontSize: 14,
    color: "#fff",
    gap: 10,
  },
  eventTitle: {
    fontFamily: "Ubuntu_500Medium",
    includeFontPadding: false,
    fontSize: 17,
    color: "#fff",
  },
});

export default Jour;
