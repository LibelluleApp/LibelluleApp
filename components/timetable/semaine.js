import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  Platform,
} from "react-native";
import { TimelineCalendar, MomentConfig } from "@howljs/calendar-kit";
import { ThemeContext } from "../../utils/themeContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import fetchTimetable from "../../api/Timetable/timetable";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Semaine = () => {
  const navigator = useNavigation();
  const { colors } = useContext(ThemeContext);
  const isFocused = useIsFocused(); // Hook to check if the screen is focused
  const calendarRef = useRef(null); // Ref for TimelineCalendar
  const [timetable, setTimetable] = useState(null);
  const [colorAlternant, setColorAlternant] = useState(colors.grey);
  const [colorTimetable, setColorTimetable] = useState(colors.blue700);

  const getColorAlternant = async () => {
    try {
      let storedColor = await AsyncStorage.getItem("color_alternant");

      if (storedColor) {
        console.log(storedColor);
        storedColor = storedColor.replace(/['"]+/g, "");
        setColorAlternant(storedColor);
      }
    } catch (error) {
      console.error("Failed to fetch color from storage:", error);
    }
  };

  const getColorTimetable = async () => {
    try {
      let storedColor = await AsyncStorage.getItem("color_timetable");
      if (storedColor) {
        storedColor = storedColor.replace(/['"]+/g, "");
        setColorTimetable(storedColor);
      }
    } catch (error) {
      console.error("Failed to fetch color from storage:", error);
    }
  };

  useEffect(() => {
    // Fetch timetable data when the screen is focused
    if (isFocused) {
      getTimetable().then((response) => {
        setTimetable(response);
      });
      getColorAlternant();
      getColorTimetable();
    }
  }, [isFocused]); // Dependency array includes isFocused

  MomentConfig.updateLocale("fr", {
    weekdaysShort: "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
  });

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
      paddingLeft: 12,
      paddingRight: 7,
      borderRadius: 10,
      // backgroundColor: colorTimetable,
      backgroundColor: colors.blue200,
      position: "relative",
      overflow: "hidden",
    },
    beforeElement: {
      width: 5,
      height: 400,
      backgroundColor: colors.blue500,
      position: "absolute",
      left: 0,
      top: 0,
    },
    eventTitleAlternance: {
      fontFamily: "Ubuntu_500Medium",
      includeFontPadding: false,
      fontSize: 15,
      width: 85,
      color: colors.white,
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
      backgroundColor: colorAlternant,
    },
  });

  if (!timetable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colors.blue700}
          style={{ alignItems: "center" }}
        />
      </View>
    );
  }

  let height = Dimensions.get("screen").height / 17.7;
  height = Platform.OS === "ios" ? height : height + 2;

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
        ref={calendarRef}
        allowPinchToZoom
        minTimeIntervalHeight={height}
        initialTimeIntervalHeight={height}
        timeZone="Europe/Paris"
        isShowHalfLine={false}
        theme={{
          backgroundColor: colors.background,
          dayNumberContainer: {
            backgroundColor: colors.background,
          },
          colors: {
            background: colors.background,
            border: colors.grey,
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
          if (event.duration > 10) {
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
                <View style={styles.beforeElement} />
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
    </View>
  );
};

export default Semaine;
