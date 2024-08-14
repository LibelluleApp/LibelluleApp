import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import { TimelineCalendar } from "@howljs/calendar-kit";
import { MomentConfig } from "@howljs/calendar-kit";
import { ThemeContext } from "./../../utils/themeContext";

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
    eventTitle: {
      fontFamily: "Ubuntu_500Medium",
      color: colors.black,
      fontSize: 11,
    },
  });

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
      color: colors.blue_variable,
    },
    {
      start: "2024-06-27T00:00:00.000Z",
      end: "2024-06-28T00:00:00.000Z",
      id: "2",
      title: "test",
      isAllDay: true,
      color: colors.blue_variable,
    },
  ];

  if (!timetable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue_variable} />
      </View>
    );
  }

  MomentConfig.updateLocale("fr", {
    weekdaysShort: "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
  });
  return (
    <View style={styles.container}>
      <TimelineCalendar
        minDate={"2024-09-02"}
        showWeekNumber={true}
        start={8}
        end={18.5}
        viewMode="workWeek"
        events={timetable}
        showNowIndicator={true}
        spaceFromTop={4}
        locale="fr"
        theme={{
          backgroundColor: colors.background,
          textStyle: {
            fontFamily: "Ubuntu_500Medium",
          },
          dayName: {
            color: colors.grey,
          },
          dayNumber: {
            color: colors.grey,
          },
          leftBarText: {
            fontFamily: "Ubuntu_500Medium",
            color: colors.black,
            textTransform: "capitalize",
            fontSize: 12,
          },
        }}
        renderEventContent={(event) => {
          return (
            <View
              style={{
                backgroundColor: colors.blue_variable,
                padding: 10,
                borderRadius: 10,
                flex: 1,
                fontFamily: "Ubuntu_400Regular",
              }}
            >
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Jour;
