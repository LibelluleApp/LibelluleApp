import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import moment from "moment-timezone";
import SwiperFlatList from "react-native-swiper-flatlist";
import Item from "./Item"; // Assurez-vous que ce composant est correctement importé
import { ThemeContext } from "./../../utils/themeContext";

const { width } = Dimensions.get("window"); // Obtenir la largeur de l'écran

const Semaine = ({
  tasks,
  user_data,
  setUser_data,
  daysOfWeek,
  setDaysOfWeek,
  taskCount,
  setTaskCount,
  currentIndex,
  setCurrentIndex,
  currentWeekNumber,
  setCurrentWeekNumber,
  totalTaskCount,
  setTotalTaskCount,
  evalCount,
  setEvalCount,
  defaultIndex,
  setDefaultIndex,
  returnToday,
  swiperRef,
  setReturnToday,
}) => {
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    // Initialiser les jours lorsque le composant se monte
    const startDate = moment("2024-07-10");
    const endDate = moment("2024-12-31");

    const weekdays = [];
    let currentDate = startDate.clone();
    while (currentDate <= endDate) {
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        let dayData = tasks.filter((item) =>
          moment(item.date_fin).isSame(currentDate, "day")
        );
        if (dayData.length === 0) {
          dayData = [
            {
              agenda_id: 0,
              date_fin: currentDate.format("YYYY-MM-DD"),
              titre: "Aucun élément à afficher",
              type: "none",
              Ressource: { nom_ressource: "Aucune matière" },
            },
          ];
        }
        weekdays.push({ date: currentDate.clone(), data: dayData });
      }
      currentDate.add(1, "day");
    }

    let todayIndex = weekdays.findIndex((day) =>
      day.date.isSame(moment(), "day")
    );

    if (todayIndex === -1) {
      const today = moment();
      if (today.day() === 6) {
        // Samedi
        today.add(2, "days");
      } else if (today.day() === 0) {
        // Dimanche
        today.add(1, "days");
      }
      todayIndex = weekdays.findIndex((day) => day.date.isSame(today, "day"));
    }

    setCurrentIndex(todayIndex !== -1 ? todayIndex : 0);
    setDefaultIndex(todayIndex !== -1 ? todayIndex : 0);

    setDaysOfWeek(weekdays);
    setCurrentWeekNumber(weekdays[todayIndex]?.date.week());

    calculateCounts(weekdays[todayIndex]?.data || []);
  }, []); // Recalculer si les tâches changent

  useEffect(() => {
    if (returnToday) {
      setCurrentIndex(defaultIndex);
      swiperRef.current.scrollToIndex({ index: defaultIndex });
      setCurrentWeekNumber(daysOfWeek[defaultIndex].date.week());
      calculateCounts(daysOfWeek[defaultIndex].data); // Appel de la fonction de calcul des compteurs pour le nouveau jour

      // Réinitialiser returnToday à false
      setReturnToday(false);
    }
  }, [returnToday, daysOfWeek]); // Déclencheur sur le changement de returnToday

  const handleChangeIndex = ({ index }) => {
    setCurrentIndex(index);
    setCurrentWeekNumber(daysOfWeek[index].date.week());
    calculateCounts(daysOfWeek[index].data); // Appel de la fonction de calcul des compteurs pour le nouveau jour
  };

  const calculateCounts = (dayData) => {
    let evalCounter = 0;
    let taskCounter = 0;
    let totalTaskCounter = 0;

    dayData.forEach((item) => {
      if (item.type === "eval") {
        evalCounter++;
      } else if (item.type === "devoir" && !item.estFait) {
        taskCounter++;
      }
    });

    totalTaskCounter = dayData.filter((item) => item.type === "devoir").length;

    setEvalCount(evalCounter);
    setTaskCount(taskCounter);
    setTotalTaskCount(totalTaskCounter);
  };

  const handleTaskCheck = (taskId) => {
    const updatedDaysOfWeek = daysOfWeek.map((day) => {
      const updatedData = day.data.map((item) => {
        if (item.agenda_id === taskId) {
          return { ...item, estFait: true };
        }
        return item;
      });
      return { ...day, data: updatedData };
    });

    setDaysOfWeek(updatedDaysOfWeek);
    setTaskCount((prev) => prev - 1); // Décrémenter le compte de tâches
  };

  const handleTaskUncheck = (taskId) => {
    const updatedDaysOfWeek = daysOfWeek.map((day) => {
      const updatedData = day.data.map((item) => {
        if (item.agenda_id === taskId) {
          return { ...item, estFait: false };
        }
        return item;
      });
      return { ...day, data: updatedData };
    });

    setDaysOfWeek(updatedDaysOfWeek);
    setTaskCount((prev) => prev + 1); // Incrémenter le compte de tâches
  };

  return (
    <View style={styles.swiperContainer}>
      <SwiperFlatList
        ref={swiperRef} // Référence pour le swiper
        index={currentIndex} // Positionner sur le jour actuel
        data={daysOfWeek}
        renderItem={({ item }) => (
          <View style={styles.itemContent}>
            <Text style={styles.dateText}>
              {item.date.format("YYYY-MM-DD")}
            </Text>
            <View style={styles.itemContainer}>
              {item.data.length > 0 ? (
                item.data.map((agendaItem) => (
                  <Item
                    key={agendaItem.agenda_id}
                    item={agendaItem}
                    currentDay={item.date.format("YYYY-MM-DD")}
                    onTaskCheck={handleTaskCheck}
                    onTaskUncheck={handleTaskUncheck}
                  />
                ))
              ) : (
                <Text style={styles.noTasks}>Aucune tâche pour ce jour.</Text>
              )}
            </View>
          </View>
        )}
        onChangeIndex={handleChangeIndex}
        bounces={false}
        windowSize={5}
        style={styles.swiper} // Ajout de style au Swiper
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
  },
  swiper: {
    width: width, // Assurez-vous que le Swiper prend la largeur de l'écran
  },
  itemContent: {
    width: width, // Chaque élément prend la largeur de l'écran
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  itemContainer: {
    flexDirection: "column",
    gap: 10,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noTasks: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Semaine;
