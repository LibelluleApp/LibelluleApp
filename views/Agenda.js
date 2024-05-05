import React, { useState, useMemo, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import HeaderCarousel from "../components/agenda/header";
import ListAgenda from "../components/agenda/list";
import moment from "moment";

const getNextWeekday = (date) => {
  const dayOfWeek = date.isoWeekday();
  if (dayOfWeek === 6) {
    return date.add(2, "days");
  } else if (dayOfWeek === 7) {
    return date.add(1, "day");
  }
  return date;
};

const generateDates = () => {
  const startDate = moment("2023-09-01");
  const endDate = moment("2024-07-10");
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

const Agenda = () => {
  const dates = useMemo(() => generateDates(), []);
  const currentDate = getNextWeekday(moment());

  const defaultIndex = Math.max(
    0,
    dates.findIndex((d) => d.fullDate.isSame(currentDate, "day"))
  );

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  useEffect(() => {
    const nextWeekday = getNextWeekday(moment());
    const newIndex = dates.findIndex((d) =>
      d.fullDate.isSame(nextWeekday, "day")
    );

    if (newIndex >= 0 && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: "Ubuntu_400Regular",
          fontSize: 15,
          color: "#252525",
          marginBottom: 10,
          textTransform: "capitalize",
          alignSelf: "center",
        }}
      >
        {dates[currentIndex].fullDate.format("MMMM")}
      </Text>
      <HeaderCarousel
        currentIndex={currentIndex}
        setIndex={setCurrentIndex}
        initialIndex={defaultIndex}
      />
      <ListAgenda
        currentIndex={currentIndex}
        setIndex={setCurrentIndex}
        initialIndex={defaultIndex}
      />
    </View>
  );
};

export default Agenda;
