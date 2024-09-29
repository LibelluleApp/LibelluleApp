import React, {
  useContext,
  useEffect,
  useState,
  useRef
} from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { ThemeContext } from "../../utils/themeContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchTimetable from "../../api/Timetable/timetable";
import { UserRound, MapPin } from "../../assets/icons/Icons";

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
  const [timetable, setTimetable] = useState(null);
  const [colorAlternant, setColorAlternant] = useState(colors.grey);
  const [colorTimetable, setColorTimetable] = useState(colors.blue_variable);

  const getColorAlternant = async () => {
    try {
      let storedColor = await AsyncStorage.getItem("color_alternant");
      if (storedColor) {
        storedColor = storedColor.replace(/['"]+/g, "");
        setColorAlternant(storedColor);
      }else{
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
      justifyContent: "flex-start",
      paddingHorizontal: "5%",
    },
    eventBack: {
      paddingVertical: 1,
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
      backgroundColor: colorTimetable,
    },
    eventContainerLittle: {
      height: "100%",
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "center",
      backgroundColor: colorTimetable,
    },
    eventTextContent: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.white,
      gap: 10,
    },
    eventTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: colors.white,
      maxWidth: "100%",
    },
    eventTitleLittle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 12,
      color: colors.white,
      maxWidth: "100%",
    },
    eventTitleAlternance: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 25,
      color: colors.white,
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
      backgroundColor: colorAlternant,
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
      <TimelineCalendar
        minDate={"2024-09-02"}
        timeZone="Europe/Paris"
        showWeekNumber={true}
        ref={calendarRef}
        start={8}
        end={18.5}
        viewMode="day"
        events={timetable}
        showNowIndicator={true}
        allowPinchToZoom
        minTimeIntervalHeight={height}
        initialTimeIntervalHeight={height}
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
          if (event.duration < 1) {
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
          if (event.duration > 10) {
            return (
              <View style={styles.eventBack}>
                <View
                  style={
                    styles.eventContainerAlternance
                  }
                >
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
