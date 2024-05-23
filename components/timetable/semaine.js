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
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import moment from "moment";
import "moment/locale/fr";

import PaginationHeader from "./jour/pagination";
import EventList from "./jour/EventList";

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
          <Text>Coucou</Text>
        </Suspense>
      </View>
    );
  }
}

const Jour = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  // const [currentWeekNumber, setCurrentWeekNumber] = useState(null);

  useEffect(() => {
    // preloadComponent(() => import("../components/home/Agenda/Eval"));
    // preloadComponent(() => import("../components/home/Agenda/Task"));

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

export default Jour;
