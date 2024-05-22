import React, { useState, useMemo, Suspense, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, { useSharedValue } from "react-native-reanimated";
import moment from "moment";
import HeaderCarousel from "../components/agenda/HeaderCarrousel";

const EvalHome = React.lazy(() => import("../components/home/Agenda/Eval"));
const TaskHome = React.lazy(() => import("../components/home/Agenda/Task"));

const generateDates = () => {
  const startDate = moment("2023-09-01").locale("fr");
  const endDate = moment("2024-07-10").locale("fr");
  const dates = [];

  let current = startDate.clone();
  while (current.isSameOrBefore(endDate)) {
    const dayOfWeek = current.isoWeekday();
    if (dayOfWeek !== 6 && dayOfWeek !== 7) {
      dates.push({
        date: current.format("D"),
        fullDate: current.clone(),
        dayOfWeek: current.format("ddd"),
      });
    }
    current.add(1, "day");
  }
  return dates;
};

const preloadComponent = (component) => {
  return new Promise((resolve) => {
    component().then(resolve);
  });
};

const Agenda = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dates = useMemo(() => generateDates(), []);
  console.log(dates);
  const carouselRef = useRef(null);
  const headerRef = useRef(null);

  const changeSlideHeader = (slide) => {
    if (headerRef.current) {
      headerRef.current?.scrollTo({
        index: slide,
        animated: true,
      });
    }
  };

  useEffect(() => {
    preloadComponent(() => import("../components/home/Agenda/Eval"));
    preloadComponent(() => import("../components/home/Agenda/Task"));
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

  return (
    <View style={styles.container}>
      <View style={{ height: 10 }} />

      <HeaderCarousel
        ref={carouselRef}
        data={dates}
        onProgressChange={(_, slideProgress) => {
          changeSlideHeader(slideProgress);
        }}
      />
      <Carousel
        ref={headerRef}
        width={Dimensions.get("window").width}
        height={Dimensions.get("screen").height - 150}
        data={dates}
        loop={false}
        windowSize={3}
        overscrollEnabled={false}
        renderItem={renderItem}
        enabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
  },
});

export default Agenda;
