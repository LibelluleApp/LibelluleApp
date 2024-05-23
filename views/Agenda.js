import React, {
  useState,
  useRef,
  useEffect,
  PureComponent,
  Suspense,
} from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import PaginationHeader from "../components/agenda/pagination";
import moment from "moment";
import "moment/locale/fr";

// Import explicite des composants à pré-charger
import EvalHome from "../components/home/Agenda/Eval";
import TaskHome from "../components/home/Agenda/Task";

const preloadComponent = (component) => {
  return new Promise((resolve) => {
    component().then(resolve);
  });
};

class Item extends PureComponent {
  render() {
    return (
      <View style={styles.itemContainer}>
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          <EvalHome />
          <TaskHome />
        </Suspense>
      </View>
    );
  }
}

const Agenda = () => {
  const swiperRef = useRef(null); // Référence au SwiperFlatList
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(null);

  useEffect(() => {
    // Pré-chargement des composants
    preloadComponent(() => import("../components/home/Agenda/Eval"));
    preloadComponent(() => import("../components/home/Agenda/Task"));

    // Calcul de la date d'aujourd'hui
    let today = moment();

    // Calcul de la date de début et de fin de la période
    const startDate = moment("2023-09-01");
    const endDate = moment("2024-07-10");

    // Si c'est le week-end, passer au lundi suivant
    if (today.day() === 0 || today.day() === 6) {
      today = today.day(1); // Passer au lundi suivant
    }

    // Si la date d'aujourd'hui est après la fin de la période, revenir à la date de début
    if (today.isAfter(endDate)) {
      today = startDate;
    }

    // Générer les jours de la semaine
    const weekdays = [];
    let currentDate = startDate.clone();
    while (currentDate <= endDate) {
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        weekdays.push(currentDate.clone());
      }
      currentDate.add(1, "day");
    }

    // Déterminer l'index de la date d'aujourd'hui ou du lundi suivant
    const todayIndex = weekdays.findIndex((day) => day.isSame(today, "day"));
    setCurrentIndex(todayIndex !== -1 ? todayIndex : 0);
    setDefaultIndex(todayIndex !== -1 ? todayIndex : 0);

    setDaysOfWeek(weekdays);
    setCurrentWeekNumber(weekdays[todayIndex].week());
  }, []);

  const handleChangeIndex = ({ index }) => {
    setCurrentIndex(index);
    setCurrentWeekNumber(daysOfWeek[index].week());
  };

  const handlePrevDay = () => {
    const newIndex =
      currentIndex === 0 ? daysOfWeek.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
    setCurrentWeekNumber(daysOfWeek[newIndex].week());
  };

  const handleNextDay = () => {
    const newIndex =
      currentIndex === daysOfWeek.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
    setCurrentWeekNumber(daysOfWeek[newIndex].week());
  };

  const handleToday = () => {
    setCurrentIndex(defaultIndex);
    swiperRef.current.scrollToIndex({ index: defaultIndex });
    setCurrentWeekNumber(daysOfWeek[defaultIndex].week());
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
        currentWeekNumber={currentWeekNumber}
      />
      <SwiperFlatList
        ref={swiperRef}
        index={currentIndex}
        data={daysOfWeek}
        renderItem={({ item }) => <Item item={item} />}
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
    paddingVertical: 25,
  },
  itemContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
  },
});

export default Agenda;
