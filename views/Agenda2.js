import React, { useState, useRef, useEffect, Suspense } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import PaginationHeader from "../components/agenda/pagination";
const EvalHome = React.lazy(() => import("../components/home/Agenda/Eval"));
const TaskHome = React.lazy(() => import("../components/home/Agenda/Task"));
import moment from "moment";
import "moment/locale/fr";

const preloadComponent = (component) => {
  return new Promise((resolve) => {
    component().then(resolve);
  });
};

const Agenda2 = () => {
  const swiperRef = useRef(null); // Référence au SwiperFlatList
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  // Fonction pour obtenir les jours de la semaine entre deux dates
  const getWeekDays = (startDate, endDate) => {
    const days = [];
    let currentDate = moment(startDate);
    while (currentDate <= endDate) {
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        days.push(moment(currentDate));
      }
      currentDate.add(1, "day");
    }
    return days;
  };

  useEffect(() => {
    preloadComponent(() => import("../components/home/Agenda/Eval"));
    preloadComponent(() => import("../components/home/Agenda/Task"));

    const startDate = moment("2023-09-01");
    const endDate = moment("2024-07-10");

    let currentDate = startDate;
    const weekdays = [];
    while (currentDate <= endDate) {
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        weekdays.push(moment(currentDate));
      }
      currentDate.add(1, "day");
    }

    setDaysOfWeek(weekdays);
  }, []);

  const renderItem = ({ index }) => {
    return (
      <View style={styles.itemContainer}>
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          <EvalHome />
          <TaskHome />
        </Suspense>
      </View>
    );
  };

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

  return (
    <View style={styles.container}>
      <PaginationHeader
        currentDay={daysOfWeek[currentIndex]?.format("dddd DD MMMM")}
        onPrev={handlePrevDay}
        onNext={handleNextDay}
        index={currentIndex}
      />
      <SwiperFlatList
        ref={swiperRef}
        index={currentIndex}
        data={daysOfWeek}
        renderItem={renderItem}
        onChangeIndex={handleChangeIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    gap: 23,
  },

  text: {
    fontSize: 24,
    color: "white",
  },
  itemContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
  },
});
export default Agenda2;
