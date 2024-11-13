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

  const fetchData = useCallback(async () => {
    if (isLoadingData) return;

    try {
      setIsLoadingData(true);
      const data = await fetchTimetable();
      const sortedData =
        data?.sort(
          (a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime)
        ) || [];

      setEvents(sortedData);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setEvents([]);
    } finally {
      setIsLoadingData(false);
    }
  }, [isLoadingData]);

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
          backgroundColor: colors.regular200,
        },
        eventContainerShort: {
          height: "100%",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: colors.regular200,
        },
        eventTitleLong: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 15,
          color: colors.regular950,
          transform: [{ rotate: "-90deg" }],
          width: 85,
        },
        eventTitleShort: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 11,
          color: colors.regular950,
          maxWidth: "100%",
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
  }, [isFocused, fetchData]);

  const calendarTheme = useMemo(
    () => ({
      backgroundColor: colors.background,
      dayNumberContainer: {
        backgroundColor: colors.background,
      },
      colors: {
        background: colors.background,
        border: colors.gray_clear,
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
      weekNumber: {
        color: colors.regular950,
        fontFamily: "Ubuntu_500Medium",
        letterSpacing: -0.4,
      },
      weekNumberContainer: {
        backgroundColor: colors.regular100,
      },
      headerContainer: {
        borderBottomWidth: 0,
      },
      nowIndicatorColor: colors.regular700,
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

  const calendarProps = useMemo(
    () => ({
      viewMode: "week",
      minDate: "2024-09-02",
      showWeekNumber: true,
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
    }),
    [events, INITIAL_DATE, calendarTheme]
  );

  return (
    <View style={styles.container}>
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
