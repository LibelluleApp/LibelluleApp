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

const WEEKS_TO_PRELOAD = 2; // Nombre de semaines à précharger avant et après

const Semaine = forwardRef((props, ref) => {
  const { colors } = useContext(ThemeContext);
  const calendarRef = useRef(null);
  const isFocused = useIsFocused();
  const [allEvents, setAllEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigator = useNavigation();

  const INITIAL_DATE = useMemo(() => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
  }, []);

  // Fonction utilitaire pour obtenir les dates de début et fin avec préchargement
  const getExtendedDateRange = useCallback((centerDate) => {
    const date = new Date(centerDate);

    // Obtenir le début de la semaine
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    // Calculer la plage étendue
    const extendedStart = new Date(weekStart);
    extendedStart.setDate(weekStart.getDate() - WEEKS_TO_PRELOAD * 7);

    const extendedEnd = new Date(weekStart);
    extendedEnd.setDate(weekStart.getDate() + (WEEKS_TO_PRELOAD * 2 + 1) * 7);

    return { start: extendedStart, end: extendedEnd };
  }, []);

  // Fonction pour filtrer les événements visible avec préchargement
  const filterEventsByDate = useCallback(
    (events, centerDate) => {
      if (!events.length) return [];

      const { start, end } = getExtendedDateRange(centerDate);

      return events.filter((event) => {
        const eventStart = new Date(event.start.dateTime);
        return eventStart >= start && eventStart <= end;
      });
    },
    [getExtendedDateRange]
  );

  // Fonction pour récupérer tous les événements
  const fetchData = useCallback(async () => {
    if (isLoadingData) return;

    setIsLoadingData(true);
    try {
      const data = await fetchTimetable();
      // Trier les événements par date
      const sortedData = data.sort(
        (a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime)
      );
      setAllEvents(sortedData || []);

      // Initialiser les événements visibles pour la période étendue
      setVisibleEvents(filterEventsByDate(sortedData, INITIAL_DATE));
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setAllEvents([]);
      setVisibleEvents([]);
    } finally {
      setIsLoadingData(false);
    }
  }, [INITIAL_DATE, filterEventsByDate]);

  // Gestionnaire de changement de date optimisé avec préchargement
  const handleDateChange = useCallback(
    (date) => {
      const filteredEvents = filterEventsByDate(allEvents, date);
      setVisibleEvents(filteredEvents);

      // Log pour debug
      console.log(
        `Loaded ${filteredEvents.length} events for ${
          WEEKS_TO_PRELOAD * 2 + 1
        } weeks`
      );
    },
    [allEvents, filterEventsByDate]
  );

  // Styles optimisés avec useMemo
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

  // Composant Event mémoïsé
  const EventComponent = useMemo(
    () =>
      React.memo(({ event }) => {
        const isLongEvent = event._internal.duration > 600;
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

  // Render event optimisé
  const renderEvent = useCallback((event) => {
    return <EventComponent event={event} />;
  }, []);

  useEffect(() => {
    if (isFocused && allEvents.length === 0) {
      fetchData();
    }
  }, [isFocused, fetchData, allEvents.length]);

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

  const renderCustomHorizontalLineWithProps = useCallback(
    (props) => {
      const isWholeNumber = Number.isInteger(props.index);
      if (isWholeNumber) {
        return (
          <View
            style={{
              height: 1,
              backgroundColor: colors.grey,
            }}
          />
        );
      }
      return null;
    },
    [colors.grey]
  );

  // Gérer l'événement de pression (onClick)
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

  const calendarProps = useMemo(
    () => ({
      viewMode: "week",
      minDate: "2024-09-02",
      showWeekNumber: true,
      numberOfDays: 5,
      start: 8 * 60,
      end: 18.5 * 60,
      hideWeekDays: [6, 7],
      events: visibleEvents,
      // Augmenter le nombre de pages pour le préchargement
      pagesPerSide: WEEKS_TO_PRELOAD + 2, // +2 pour avoir une marge supplémentaire
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
    [visibleEvents, INITIAL_DATE, calendarTheme]
  );

  return (
    <View style={styles.container}>
      <CalendarContainer
        {...calendarProps}
        isLoading={isLoadingData}
        ref={calendarRef}
        onPressEvent={handlePressEvent}
        onDateChanged={handleDateChange}
      >
        <CalendarHeader />
        <CalendarBody
          renderEvent={renderEvent}
          renderCustomHorizontalLine={renderCustomHorizontalLineWithProps}
        />
      </CalendarContainer>
    </View>
  );
});

export default React.memo(Semaine);
