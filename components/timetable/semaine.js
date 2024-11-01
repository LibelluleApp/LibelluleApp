import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
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

const INITIAL_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
).toISOString();

const Semaine = forwardRef((props, ref) => {
  const { colors } = useContext(ThemeContext);
  const calendarRef = useRef(null);
  const isFocused = useIsFocused();
  const [timetable, setTimetable] = useState([]);
  const navigator = useNavigation();

  useEffect(() => {
    if (isFocused) {
      getTimetable().then((data) => setTimetable(data));
    }
  }, [isFocused]);

  const localHandleGoToToday = () => {
    calendarRef.current?.goToDate({
      date: INITIAL_DATE,
      animatedDate: true,
      animatedHour: true,
    });
  };

  useImperativeHandle(ref, () => ({
    goToToday: localHandleGoToToday,
  }));

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
      letterSpacing: -0.4,
      color: colors.blue950,
      fontSize: 11,
      maxWidth: "100%",
      alignItems: "start",
    },
    eventBack: {
      paddingVertical: 2,
      paddingHorizontal: 2,
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
      letterSpacing: -0.4,
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
  const height =
    Dimensions.get("screen").height / 17.7 +
    (Platform.OS === "android" ? 1 : 0);

  const initialesLocale = {
    fr: {
      weekDayShort: "Dim._Lun._Mar._Mer._Jeu._Ven._Sam.".split("_"),
      meridiem: { ante: "AM", post: "PM" },
    },
  };

  return (
    <View style={styles.container}>
      <CalendarContainer
        viewMode={"week"}
        minDate={"2024-09-02"}
        showWeekNumber={true}
        ref={calendarRef}
        numberOfDays={5}
        start={8 * 60}
        end={18.5 * 60}
        hideWeekDays={[6, 7]}
        events={timetable}
        isLoading={!timetable}
        scrollToNow
        scrollByDay={false}
        initialDate={INITIAL_DATE}
        initialLocales={initialesLocale}
        locale={"fr"}
        isShowHalfLine={true}
        initialTimeIntervalHeight={height}
        onPressEvent={(event) => {
          const eventWithSerializedDate = {
            ...event,
            start: {
              ...event.start,
              dateTime: event.start.dateTime.toISOString(),
            },
            end: {
              ...event.end,
              dateTime: event.end.dateTime.toISOString(),
            },
          };

          navigator.navigate("DetailEvent", { event: eventWithSerializedDate });
        }}
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
            letterSpacing: -0.4,
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
            letterSpacing: -0.4,
          },
          dayNumber: {
            color: colors.grey,
            fontFamily: "Ubuntu_400Regular",
            letterSpacing: -0.4,
          },
          leftBarText: {
            fontFamily: "Ubuntu_500Medium",
            letterSpacing: -0.4,
            color: colors.blue950,
            textTransform: "capitalize",
            fontSize: 12,
          },
          hourTextStyle: {
            fontFamily: "Ubuntu_400Regular",
            letterSpacing: -0.4,
            fontSize: 12,
            color: colors.grey,
          },
          // Week number
          weekNumber: {
            color: colors.blue950,
            fontFamily: "Ubuntu_500Medium",
            letterSpacing: -0.4,
          },
          weekNumberContainer: {
            backgroundColor: colors.blue100,
          },
          headerContainer: {
            borderBottomWidth: 0,
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
});

export default Semaine;
