import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import CalendarKit from "react-native-calendar-kit";

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

const Jour = () => {
  const [timetable, setTimetable] = React.useState(null);

  React.useEffect(() => {
    getTimetable().then((response) => {
      setTimetable(response);
      console.log(response);
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
        viewMode="workWeek"
        initialLocales={initialLocales}
        locale="en"
        timeZone="Europe/Paris"
        minDate={"2023-09-01"}
        showWeekNumber={true}
        start={8 * 60}
        end={18 * 60}
        firstDay={1}
        showNowIndicator={true}
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
        }}
        events={timetable}
        renderEvent={(event) => {
          return (
            <View
              style={{
                backgroundColor: "#FF0000",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text>{event.title}</Text>
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
});

export default Jour;
