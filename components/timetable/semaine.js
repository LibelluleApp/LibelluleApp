import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import { TimelineCalendar } from '@howljs/calendar-kit';
import { MomentConfig } from '@howljs/calendar-kit';

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

  if (!timetable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0760FB" />
      </View>
    );
  }

  MomentConfig.updateLocale('fr', {
    weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
  });
  return (
    <View style={styles.container}>

      <TimelineCalendar minDate={"2024-09-02"}
        showWeekNumber={true}
        start={8}
        end={18.5}
        viewMode="workWeek"
        events={timetable}
        showNowIndicator={true}
        spaceFromTop={4}
        locale="fr"
        theme={{
          backgroundColor: "#F4F5F9",
          dayNumberContainer: {
            backgroundColor: "#F4f5f9",
          },
          colors: {
            background: "#F000",
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
          leftBar: {
            backgroundColor: '#ECECEC',
            borderRadius: 7,
            padding: 2,
          },
          leftBarText: {
            fontFamily: 'Ubuntu_500Medium',
            color: "#252525",
            textTransform: "capitalize",
            fontSize: 12,
          }
        }}
        renderEventContent={(event) => {
          return (
            <View
              style={{
                backgroundColor: "#FF0000",
                padding: 10,
                borderRadius: 5,
                flex: 1,

              }}
            >
              <Text>{event.title}</Text>
            </View>
          );
        }} />
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
