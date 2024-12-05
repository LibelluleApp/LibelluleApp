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
import { View, StyleSheet, Text, Dimensions, Platform } from "react-native";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from "@howljs/calendar-kit";
import { ThemeContext } from "../../utils/themeContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import fetchTimetable from "../../api/Timetable/timetable";
import TouchableScale from "react-native-touchable-scale";

const Semaine = forwardRef((props, ref) => {
  const { colors } = useContext(ThemeContext);
  const calendarRef = useRef(null);
  const isFocused = useIsFocused();
  const [events, setEvents] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());

  const INITIAL_DATE = useMemo(() => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
  }, []);

  const handleGoToToday = useCallback(() => {
    calendarRef.current?.goToDate({
      date: INITIAL_DATE,
      animatedDate: true,
      animatedHour: true,
    });
  }, [INITIAL_DATE]);

  useImperativeHandle(
    ref,
    () => ({
      goToToday: handleGoToToday,
    }),
    [handleGoToToday]
  );

  const fetchData = useCallback(() => {
    let isMounted = true;
    const getData = async () => {
      if (isLoadingData) return;
      try {
        setIsLoadingData(true);
        const data = await fetchTimetable();
        if (isMounted) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
        if (isMounted) {
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
          gap: 10,
          paddingTop: 10,
        },
        eventBack: {
          paddingVertical: 2,
          paddingHorizontal: 2,
        },
        eventContainerLong: {
          height: "100%",
          width: "100%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.regular600,
        },
        eventContainerShort: {
          height: "100%",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: colors.regular600,
        },
        eventTitleLong: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 15,
          color: colors.regular50,
          transform: [{ rotate: "-90deg" }],
          width: 85,
        },
        eventTitleShort: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 11,
          color: colors.regular50,
          maxWidth: "100%",
        },

        weekNumberWrapper: {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 60,
          zIndex: 1,
          pointerEvents: "none",
        },
        weekNumberItem: {
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        },
        monthText: {
          fontSize: 12,
          fontFamily: "Ubuntu_400Regular",
          letterSpacing: -0.4,
          color: colors.regular800,
          textTransform: "capitalize",
        },
        weekNumberText: {
          fontSize: 12,
          fontFamily: "Ubuntu_500Medium",
          letterSpacing: -0.4,
          color: colors.regular800,
          textTransform: "capitalize",
        },
      }),
    [colors]
  );

  const EventComponent = useMemo(
    () =>
      React.memo(({ event }) => {
        const isLongEvent = event._internal?.duration > 600;
        const eventStyle = isLongEvent
          ? styles.eventContainerLong
          : styles.eventContainerShort;
        const titleStyle = isLongEvent
          ? styles.eventTitleLong
          : styles.eventTitleShort;

        return (
          <View style={styles.eventBack}>
            <View style={eventStyle}>
              <Text
                style={titleStyle}
                numberOfLines={isLongEvent ? 1 : 4}
                ellipsizeMode="tail"
              >
                {event.title}
              </Text>
            </View>
          </View>
        );
      }),
    [styles]
  );

  const renderEvent = useCallback(
    (event) => <EventComponent event={event} />,
    [EventComponent]
  );

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

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
        color: colors.regular900,
        fontFamily: "Ubuntu_400Regular",
        letterSpacing: -0.4,
      },
      dayNumber: {
        color: colors.regular900,
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
      weekNumber: {
        color: colors.regular900,
        fontFamily: "Ubuntu_500Medium",
        letterSpacing: -0.4,
      },
      weekNumberContainer: {
        backgroundColor: "transparent",
      },
      headerContainer: {
        borderBottomWidth: 0,
      },
      nowIndicatorColor: colors.regular700,
      weekNumber: {
        color: colors.regular900,
        fontFamily: "Ubuntu_500Medium",
        letterSpacing: -0.4,
      },
      weekNumberContainer: {
        backgroundColor: "transparent",
        height: 45, // Assurez-vous d'avoir assez d'espace pour le mois
        paddingVertical: 4,
      },
    }),
    [colors]
  );

  const renderCustomHorizontalLine = useCallback(
    ({ index }) => {
      const isWholeNumber = Number.isInteger(index);
      if (!isWholeNumber) return null;

      return (
        <View
          style={{
            height: 1,
            backgroundColor: colors.grey,
          }}
        />
      );
    },
    [colors.grey]
  );

  const handlePressEvent = useCallback(
    (event) => {
      if (!event?.start?.dateTime || !event?.end?.dateTime) return;

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

      navigation.navigate("DetailEvent", { event: eventWithSerializedDate });
    },
    [navigation]
  );

  // Fonction pour calculer le numéro de semaine
  const getWeekNumber = useCallback((date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }, []);

  const WeekNumberColumn = useCallback(() => {
    const monthNames = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];
    const weekNumber = getWeekNumber(currentDate);
    const month = monthNames[currentDate.getMonth()];

    return (
      <View style={styles.weekNumberWrapper}>
        <View style={styles.weekNumberItem}>
          <Text style={styles.monthText}>{month}.</Text>
          <Text style={styles.weekNumberText}>Sem {weekNumber}</Text>
        </View>
      </View>
    );
  }, [currentDate, styles, getWeekNumber]);

  const handleDateChanged = useCallback((date) => {
    setCurrentDate(new Date(date));
  }, []);

  const calendarProps = useMemo(
    () => ({
      viewMode: "week",
      minDate: "2024-09-02",
      numberOfDays: 5,
      start: 8 * 60,
      end: 18.5 * 60,
      hideWeekDays: [6, 7],
      events,
      scrollToNow: true,
      scrollByDay: false,
      initialDate: INITIAL_DATE,
      initialLocales: {
        fr: {
          weekDayShort: "Dim._Lun._Mar._Mer._Jeu._Ven._Sam.".split("_"),
          meridiem: { ante: "AM", post: "PM" },
        },
      },
      locale: "fr",
      timeZone: "Europe/Paris",
      isShowHalfLine: true,
      initialTimeIntervalHeight:
        Dimensions.get("screen").height / 17.7 +
        (Platform.OS === "android" ? 1 : 0),
      theme: calendarTheme,
      onDateChanged: handleDateChanged,
    }),
    [events, INITIAL_DATE, calendarTheme, handleDateChanged]
  );

  return (
    <View style={styles.container}>
      <WeekNumberColumn />
      <CalendarContainer
        {...calendarProps}
        isLoading={isLoadingData}
        ref={calendarRef}
        onPressEvent={handlePressEvent}
      >
        <CalendarHeader />
        <CalendarBody
          renderEvent={renderEvent}
          renderCustomHorizontalLine={renderCustomHorizontalLine}
        />
      </CalendarContainer>
    </View>
  );
});

export default React.memo(Semaine);
