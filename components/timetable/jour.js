import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
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
import { UserRound, MapPin } from "../../assets/icons/Icons";
import moment from "moment";
import Header from "./Header";

const formatProfessorName = (professor) => {
  const parts = professor?.split(" ");
  if (parts.length < 2) return professor;
  const initial = parts[1][0];
  const nom = parts[0];
  return `${initial}. ${nom}`;
};

const Jour = forwardRef((props, ref) => {
  const navigator = useNavigation();
  const { colors } = useContext(ThemeContext);
  const calendarRef = useRef(null);
  const isFocused = useIsFocused();
  const [timetable, setTimetable] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const dates = useMemo(
    () => ({
      MIN_DATE: new Date(
        new Date().getFullYear() - 2,
        new Date().getMonth(),
        new Date().getDate()
      ).toISOString(),
      MAX_DATE: new Date(
        new Date().getFullYear() + 2,
        new Date().getMonth(),
        new Date().getDate()
      ).toISOString(),
      INITIAL_DATE: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).toISOString(),
    }),
    []
  );

  const fetchData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const data = await fetchTimetable();
      setTimetable(data || []);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setTimetable([]);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, fetchData]);

  const localHandleGoToToday = useCallback(() => {
    calendarRef.current?.goToDate({
      date: dates.INITIAL_DATE,
      animatedDate: true,
      animatedHour: true,
    });
  }, [dates.INITIAL_DATE]);

  useImperativeHandle(
    ref,
    () => ({
      goToToday: localHandleGoToToday,
    }),
    [localHandleGoToToday]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          paddingHorizontal: 3,
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
          backgroundColor: colors.regular600,
          position: "relative",
          overflow: "hidden",
        },
        eventContainerLittle: {
          height: "100%",
          paddingHorizontal: 10,
          borderRadius: 10,
          justifyContent: "center",
          backgroundColor: colors.regular600,
        },
        beforeElement: {
          width: 7,
          height: 400,
          backgroundColor: colors.regular500,
          position: "absolute",
          left: 0,
          top: 0,
        },
        eventTextContent: {
          fontFamily: "Ubuntu_400Regular",
          letterSpacing: -0.4,
          fontSize: 13,
          color: colors.regular100,
          gap: 10,
        },
        eventTitle: {
          fontFamily: "Ubuntu_500Medium",
          letterSpacing: -0.4,
          fontSize: 15,
          color: colors.regular50,
          maxWidth: "100%",
        },
        eventTitleLittle: {
          fontFamily: "Ubuntu_500Medium",
          letterSpacing: -0.4,
          fontSize: 12,
          color: colors.regular50,
          maxWidth: "100%",
        },
        eventTitleAlternance: {
          fontFamily: "Ubuntu_500Medium",
          letterSpacing: -0.4,
          fontSize: 20,
          color: colors.regular100,
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
          backgroundColor: colors.regular600,
        },
        loadingOverlay: {
          position: "absolute",
          top: 0,
          right: 0,
          padding: 10,
          zIndex: 1000,
        },
      }),
    [colors]
  );

  const height = useMemo(
    () =>
      Dimensions.get("screen").height / 17.7 +
      (Platform.OS === "android" ? 1 : 0),
    []
  );

  const handlePressEvent = useCallback(
    (event) => {
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
    },
    [navigator]
  );

  const calendarTheme = useMemo(
    () => ({
      backgroundColor: colors.background,
      dayNumberContainer: {
        backgroundColor: colors.background,
      },
      colors: {
        background: colors.background,
        border: colors.grey,
        text: colors.regular950,
      },
      textStyle: {
        fontFamily: "Ubuntu_500Medium",
        letterSpacing: -0.4,
      },
      todayNumberContainer: {
        backgroundColor: colors.regular700,
      },
      todayNumber: {
        color: colors.white,
      },
      todayName: {
        color: colors.regular700,
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
        color: colors.regular950,
        textTransform: "capitalize",
        fontSize: 12,
      },
      hourTextStyle: {
        fontFamily: "Ubuntu_400Regular",
        letterSpacing: -0.4,
        fontSize: 12,
        color: colors.grey,
      },
      headerContainer: {
        borderBottomWidth: 0,
      },
    }),
    [colors]
  );

  const renderEvent = useCallback(
    (event) => {
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
                {event.title} - {event.location || "N/C"} - {formattedProfessor}
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
                  stroke={colors.regular100}
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
                  stroke={colors.regular100}
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
    },
    [styles, colors.regular100]
  );

  const calendarProps = useMemo(
    () => ({
      initialDate: dates.INITIAL_DATE,
      timeZone: "Europe/Paris",
      minDate: dates.MIN_DATE,
      maxDate: dates.MAX_DATE,
      showWeekNumber: true,
      numberOfDays: 1,
      start: 8 * 60,
      end: 18.5 * 60,
      hideWeekDays: [6, 7],
      events: timetable,
      useHaptic: true,
      scrollToNow: true,
      isShowHalfLine: false,
      initialTimeIntervalHeight: height,
      theme: calendarTheme,
    }),
    [dates, height, timetable, calendarTheme]
  );

  return (
    <View style={styles.container}>
      <CalendarContainer
        {...calendarProps}
        ref={calendarRef}
        isLoading={isLoadingData}
        onPressEvent={handlePressEvent}
      >
        <CalendarHeader renderHeaderItem={(props) => <Header {...props} />} />
        <CalendarBody renderEvent={renderEvent} />
      </CalendarContainer>
    </View>
  );
});

export default Jour;
