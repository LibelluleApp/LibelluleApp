import React, {
  useState,
  useRef,
  useEffect,
  PureComponent,
  Suspense,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import moment from "moment";
import "moment/locale/fr";

import PaginationHeader from "./jour/pagination";
import EventList, { Break } from "./jour/EventList";
import fetchTimetable from "../../api/Timetable/timetable";
import { getRessourceColor } from "../../utils/ressources/colorsRessources";

const preloadComponent = (component) => {
  return new Promise((resolve) => {
    component().then(resolve);
  });
};

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

const fetchColor = async (summary) => {
  try {
    const response = await getRessourceColor(summary);
    return response;
  } catch (error) {
    console.error("Error fetching resource color:", error);
    return null; // Return null in case of error
  }
};

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventColors: [],
    };
  }

  componentDidMount() {
    this.fetchEventColors();
  }

  fetchEventColors = async () => {
    const { events } = this.props;
    const colors = [];
    for (let event of events) {
      const color = await fetchColor(event.summary);
      colors.push(color);
    }
    this.setState({ eventColors: colors });
  };

  formatProfessorName(professor) {
    const parts = professor.split(" ");
    const initial = parts[1][0];
    const nom = parts[0];
    return `${initial}. ${nom}`;
  }

  render() {
    const { events } = this.props;
    const { eventColors } = this.state;

    // Tri des événements par heure de début
    const sortedEvents = events.slice().sort((a, b) => {
      // Convertir les heures en objets Date pour faciliter la comparaison
      const dateA = new Date(`1970-01-01T${a.startHour}`);
      const dateB = new Date(`1970-01-01T${b.startHour}`);
      return dateA - dateB;
    });

    // Tableau pour stocker le nombre d'heures entre les événements
    const dureesEntreEvents = [];

    // Calcul du nombre d'heures entre les événements
    for (let i = 1; i < sortedEvents.length; i++) {
      const heureDebutActuelle = new Date(
        `1970-01-01T${sortedEvents[i - 1].endHour}`
      );
      const heureDebutSuivante = new Date(
        `1970-01-01T${sortedEvents[i].startHour}`
      );
      const differenceMillis = heureDebutSuivante - heureDebutActuelle;
      const heures = Math.floor(differenceMillis / (1000 * 60 * 60));
      let minutes = Math.floor(
        (differenceMillis % (1000 * 60 * 60)) / (1000 * 60)
      );
      if (minutes === 0) {
        minutes = "00";
      }
      dureesEntreEvents.push({ heures, minutes });
    }

    return (
      <>
        {sortedEvents.length >= 4 ? (
          <ScrollView
            contentContainerStyle={styles.itemContainer}
            bounces={false}
          >
            {sortedEvents.map((event, index) => (
              <View key={index}>
                <EventList
                  heureDebut={event.startHour}
                  heureFin={event.endHour}
                  matiere={event.summary}
                  salle={event.location}
                  professeur={this.formatProfessorName(event.professor)}
                  couleur={eventColors[index] || "#FFC107"}
                />
                {index < dureesEntreEvents.length &&
                  dureesEntreEvents[index].heures > 0 && (
                    <Break
                      duree={`${dureesEntreEvents[index].heures}h${dureesEntreEvents[index].minutes}`}
                    />
                  )}
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.itemContainer,
              sortedEvents.length === 0 && { justifyContent: "center" },
            ]}
          >
            <Suspense
              fallback={<ActivityIndicator size="large" color="#0000ff" />}
            >
              {sortedEvents.length === 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Pas de cours pour le moment
                </Text>
              ) : (
                sortedEvents.map((event, index) => (
                  <View key={index}>
                    <EventList
                      heureDebut={event.startHour}
                      heureFin={event.endHour}
                      matiere={event.summary}
                      salle={event.location}
                      professeur={this.formatProfessorName(event.professor)}
                      couleur={eventColors[index] || "#FFC107"}
                    />
                    {index < dureesEntreEvents.length &&
                      dureesEntreEvents[index].heures > 0 && (
                        <Break
                          duree={`${dureesEntreEvents[index].heures}h${dureesEntreEvents[index].minutes}`}
                        />
                      )}
                  </View>
                ))
              )}
            </Suspense>
          </View>
        )}
      </>
    );
  }
}

const Jour = () => {
  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);

  useEffect(() => {
    preloadComponent(() => import("./jour/EventList"));
    getTimetable().then((data) => {
      if (data) {
        setTimetable(data);
        setLoading(false);
      }
    });

    let today = moment();

    const startDate = moment("2023-09-01");
    const endDate = moment("2024-07-10");

    if (today.day() === 0 || today.day() === 6) {
      today = today.day(1);
    }
    if (today.isAfter(endDate)) {
      today = startDate;
    }

    const weekdays = [];
    let currentDate = startDate.clone();
    while (currentDate <= endDate) {
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        weekdays.push(currentDate.clone());
      }
      currentDate.add(1, "day");
    }

    const todayIndex = weekdays.findIndex((day) => day.isSame(today, "day"));
    setCurrentIndex(todayIndex !== -1 ? todayIndex : 0);
    setDefaultIndex(todayIndex !== -1 ? todayIndex : 0);

    setDaysOfWeek(weekdays);
  }, []);

  const handleChangeIndex = ({ index }) => {
    setCurrentIndex(index);
  };

  const handlePrevDay = () => {
    const newIndex =
      currentIndex === 0 ? daysOfWeek.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
  };

  const handleNextDay = () => {
    const newIndex =
      currentIndex === daysOfWeek.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
  };

  const handleToday = () => {
    setCurrentIndex(defaultIndex);
    swiperRef.current.scrollToIndex({ index: defaultIndex });
  };

  return (
    <View style={styles.container}>
      <PaginationHeader
        currentDay={daysOfWeek[currentIndex]?.format("dddd DD MMMM")}
        onPrev={handlePrevDay}
        onNext={handleNextDay}
        index={currentIndex}
        defaultIndex={defaultIndex}
        returnToday={handleToday}
      />
      <SwiperFlatList
        ref={swiperRef}
        index={currentIndex}
        initialNumToRender={5}
        data={daysOfWeek}
        renderItem={({ item }) => (
          <Item events={timetable[item.format("YYYY-MM-DD")] || []} />
        )}
        onChangeIndex={handleChangeIndex}
        windowSize={3}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    gap: 10,
    paddingTop: 25,
  },
  itemContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
  },
});

export default Jour;
