import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../utils/themeContext";
import Dropdown from "../components/dropdown/Dropdown";
import Jour from "./../components/agenda/jour";
import Semaine from "./../components/agenda/semaine";
import Chronologique from "./../components/agenda/chronologique";
import fetchAgenda from "../api/Agenda/fetch"; // Assurez-vous que cette fonction est correctement implémentée
import PaginationHeader from "./../components/agenda/pagination";

import {
  getIsFirstVisitAgenda,
  getUserData,
  setIsFirstVisitAgenda,
} from "./../utils/storage";
import moment from "moment";

const Agenda = () => {
  const { colors } = useContext(ThemeContext);
  const [selectedView, setSelectedView] = useState("day"); // Vue par défaut
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const [user_data, setUser_data] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(0);
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const swiperRef = useRef(null); // Référence au Swiper
  const [taskCount, setTaskCount] = useState(0);
  const [evalCount, setEvalCount] = useState(0);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [returnToday, setReturnToday] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [todayMoment, settodayMoment] = useState(moment());
  const [weeks, setWeeks] = useState([]);
  const options = [
    { label: "Vue journée", value: "day" },
    { label: "Vue semaine", value: "week" },
    { label: "Vue chronologique", value: "chronological" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 25,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });

  const checkFirstVisit = () => {
    try {
      const value = getIsFirstVisitAgenda();
      if (value == null) {
        setIsFirstVisitAgenda(true);
        setIsFirstVisit(true);
      } else {
        setIsFirstVisit(false);
      }
    } catch (e) {
      console.log("Error accessing AsyncStorage:", e);
    }
  };
  useEffect(() => {
    if (isFocused) {
      checkFirstVisit();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFirstVisit && isFocused) {
      navigation.navigate("TutorialAgenda");
    }
  }, [isFirstVisit, isFocused, navigation]);

  useEffect(() => {
    // Vous pouvez également déclencher le chargement des données en fonction de la vue
    if (isFocused) {
      const fetchData = async () => {
        try {
          const data = await fetchAgenda();
          setTasks(data);
          console.log("Agenda chargé avec succès.");
          setIsLoading(false);
        } catch (error) {
          console.error("Erreur lors du chargement de l'agenda.", error);
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedView, isFocused]);

  const handleSelect = (value) => {
    setSelectedView(value);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PaginationHeader
        index={currentIndex}
        defaultIndex={defaultIndex}
        setReturnToday={setReturnToday}
        onSelect={handleSelect}
        value={selectedView}
        options={options}
      />
      {selectedView === "day" && (
        <Jour
          tasks={tasks}
          user_data={user_data}
          setUser_data={setUser_data}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          taskCount={taskCount}
          setTaskCount={setTaskCount}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          currentWeekNumber={currentWeekNumber}
          setCurrentWeekNumber={setCurrentWeekNumber}
          totalTaskCount={totalTaskCount}
          setTotalTaskCount={setTotalTaskCount}
          evalCount={evalCount}
          setEvalCount={setEvalCount}
          defaultIndex={defaultIndex}
          setDefaultIndex={setDefaultIndex}
          returnToday={returnToday}
          setReturnToday={setReturnToday}
          swiperRef={swiperRef}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          todayMoment={todayMoment}
        />
      )}
      {selectedView === "week" && (
        <Semaine
          tasks={tasks}
          user_data={user_data}
          setUser_data={setUser_data}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          taskCount={taskCount}
          setTaskCount={setTaskCount}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          currentWeekNumber={currentWeekNumber}
          setCurrentWeekNumber={setCurrentWeekNumber}
          totalTaskCount={totalTaskCount}
          setTotalTaskCount={setTotalTaskCount}
          evalCount={evalCount}
          setEvalCount={setEvalCount}
          defaultIndex={defaultIndex}
          setDefaultIndex={setDefaultIndex}
          returnToday={returnToday}
          setReturnToday={setReturnToday}
          swiperRef={swiperRef}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          weeks={weeks}
          setWeeks={setWeeks}
          todayMoment={todayMoment}
        />
      )}
      {selectedView === "chronological" && <Chronologique tasks={tasks} />}
    </View>
  );
};

export default Agenda;
