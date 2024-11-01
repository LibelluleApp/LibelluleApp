import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ArrowLeft, ArrowRight } from "../../assets/icons/Icons";
import moment from "moment-timezone";
import SwiperFlatList from "react-native-swiper-flatlist";
import Item from "./Item"; // Assurez-vous que ce composant est correctement importé
import { ThemeContext } from "./../../utils/themeContext";
import * as Progress from "react-native-progress";

const { width } = Dimensions.get("window");

const Jour = ({
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
  currentDate,
  setCurrentDate,
  todayMoment,
}) => {
  const { colors } = useContext(ThemeContext);

  console.log(currentIndex, defaultIndex); // Vérifiez que le tableau tasks est correctement rempli

  const styles = StyleSheet.create({
    swiperContainer: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%",
      marginHorizontal: "auto",
      alignItems: "center",
      marginVertical: 10,
    },
    headerTitleContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.blue950,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.blue800,
      textAlign: "center",
    },
    counts: {
      width: "100%",
      paddingHorizontal: 20,
      gap: 5,
    },
    progressTextTask: {
      color: colors.blue700,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    progressTextPourcent: {
      color: colors.blue200,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    progression: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    swiper: {
      width: width,
    },
    itemContent: {
      width: width,
      paddingHorizontal: 20,
    },
    itemContainer: {
      paddingTop: 10,
      flexDirection: "column",
      gap: 10,
    },
    noItemContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noItemTitle: {
      fontSize: 16,
      color: colors.blue800,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      textAlign: "center",
    },
  });

  // Fonction d'initialisation des jours
  const initializeDays = () => {
    const startDate = moment("2024-07-10"); // Date de début que tu veux, par exemple 10 juillet 2024
    const endDate = moment("2024-12-31"); // Date de fin
    const days = [];
    let currentDateClone = todayMoment.clone();

    // Remplir les jours de semaine entre startDate et endDate
    while (currentDateClone <= endDate) {
      if (currentDateClone.day() !== 0 && currentDateClone.day() !== 6) {
        const dayData = tasks.filter((item) =>
          moment(item.date_fin).isSame(currentDateClone, "day")
        );

        days.push({ date: currentDateClone.clone(), data: dayData });
      }
      currentDateClone.add(1, "day");
    }

    // Trouver l'index du jour actuel dans la liste weekdays
    let todayIndex = days.findIndex((day) =>
      day.date.isSame(todayMoment, "day")
    );

    // Gérer le cas où on est un week-end et sauter au jour ouvré suivant
    if (todayIndex === -1) {
      if (todayMoment.day() === 6)
        todayMoment.add(2, "days"); // Si on est samedi
      else if (todayMoment.day() === 0) todayMoment.add(1, "days"); // Si on est dimanche
      todayIndex = days.findIndex((day) => day.date.isSame(todayMoment, "day"));
    }

    // Sauvegarde de l'état du jour actuel pour éviter de revenir au startDate à chaque rafraîchissement
    setDaysOfWeek(days);
    setCurrentIndex(todayIndex);
    setDefaultIndex(todayIndex);
    setCurrentWeekNumber(days[todayIndex]?.date.week()); // Semaine courante
    setCurrentDate(
      days[todayIndex].date
        .format("dddd D MMMM")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );

    calculateCounts(days[todayIndex]?.data || []); // Calculer les tâches pour le jour actuel
  };

  // Fonction de calcul des compteurs (évaluations, devoirs)
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
    dayData.forEach((item) => {
      if (item.type === "devoir") {
        totalTaskCounter++;
      }
    });

    setEvalCount(evalCounter);
    setTaskCount(taskCounter);
    setTotalTaskCount(totalTaskCounter);
  };

  useEffect(() => {
    // Initialiser les jours au premier rendu ou lorsque les tâches changent
    initializeDays();
  }, [tasks]);

  useEffect(() => {
    if (returnToday) {
      setCurrentIndex(defaultIndex);
      swiperRef.current.scrollToIndex({ index: defaultIndex });
      setCurrentWeekNumber(daysOfWeek[defaultIndex].date.week());
      calculateCounts(daysOfWeek[defaultIndex].data); // Recalculer pour le jour actuel

      setReturnToday(false); // Réinitialiser l'état
    }
  }, [returnToday, daysOfWeek]);

  const handlePrevDay = () => {
    const newIndex =
      currentIndex === 0 ? daysOfWeek.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
    setCurrentWeekNumber(daysOfWeek[newIndex].date.week());
    calculateCounts(daysOfWeek[newIndex].data); // Appel de la fonction de calcul des compteurs pour le nouveau jour
  };

  const handleNextDay = () => {
    const newIndex =
      currentIndex === daysOfWeek.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
    setCurrentWeekNumber(daysOfWeek[newIndex].date.week());
    calculateCounts(daysOfWeek[newIndex].data); // Appel de la fonction de calcul
  };

  // Gestion du changement d'index dans le Swiper
  const handleChangeIndex = ({ index }) => {
    setCurrentIndex(index);
    setCurrentWeekNumber(daysOfWeek[index].date.week());

    setCurrentDate(
      daysOfWeek[index].date
        .format("dddd D MMMM")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );

    calculateCounts(daysOfWeek[index].data);
  };

  const handleTaskCheck = (taskId) => {
    const updatedDaysOfWeek = daysOfWeek.map((day) => {
      const updatedData = day.data.map((item) =>
        item.agenda_id === taskId ? { ...item, estFait: true } : item
      );
      return { ...day, data: updatedData };
    });

    setDaysOfWeek(updatedDaysOfWeek);
    setTaskCount((prevTaskCount) => Math.max(0, prevTaskCount - 1)); // Use state updater function
  };

  const handleTaskUncheck = (taskId) => {
    const updatedDaysOfWeek = daysOfWeek.map((day) => {
      const updatedData = day.data.map((item) =>
        item.agenda_id === taskId ? { ...item, estFait: false } : item
      );
      return { ...day, data: updatedData };
    });

    setDaysOfWeek(updatedDaysOfWeek);
    setTaskCount((prevTaskCount) =>
      Math.min(totalTaskCount, prevTaskCount + 1)
    ); // Use state updater function
  };

  // Gestion de la progression des tâches
  let progression = 1;
  let percentProgression = 100;
  taskCount = totalTaskCount - taskCount;

  if (totalTaskCount === 0) {
    progression = 1;
  } else {
    progression = Math.max(0, Math.min(1, taskCount / totalTaskCount)); // Ensure progression is between 0 and 1
    percentProgression = Math.round(progression * 100);
  }

  return (
    <View style={styles.swiperContainer}>
      {/* Affichage du jour actuel */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={handlePrevDay}
          style={[styles.aroundLeft, { opacity: currentIndex === 0 ? 0.5 : 1 }]}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ArrowLeft
            stroke={colors.blue950}
            strokeWidth={1.75}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{currentDate}</Text>
          <Text style={styles.headerSubtitle}>Semaine {currentWeekNumber}</Text>
        </View>
        <TouchableOpacity
          onPress={handleNextDay}
          style={styles.aroundRight}
          hitSlop={{ top: 20, bottom: 20, right: 20 }}
        >
          <ArrowRight
            stroke={colors.blue950}
            strokeWidth={1.75}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.counts}>
        <View style={styles.progression}>
          {totalTaskCount >= 0 && (
            <Text style={styles.progressTextTask}>
              {taskCount}/{totalTaskCount}{" "}
              {totalTaskCount <= 1 ? "tâche" : "tâches"}
            </Text>
          )}
          <Text style={styles.progressTextPourcent}>{percentProgression}%</Text>
        </View>
        <Progress.Bar
          progress={progression}
          width={null}
          height={4}
          animated={true}
          unfilledColor={colors.blue200}
          borderWidth={0}
          color={colors.blue700}
        />
      </View>

      {/* Liste de jours avec Swiper */}
      <SwiperFlatList
        ref={swiperRef}
        index={0}
        data={daysOfWeek}
        initialNumToRender={1}
        renderItem={({ item }) => (
          <View style={styles.itemContent}>
            {item.data.length > 0 ? (
              <View style={styles.itemContainer}>
                {item.data.map((agendaItem) => (
                  <Item
                    key={agendaItem.agenda_id}
                    item={agendaItem}
                    currentDate={item.date.format("YYYY-MM-DD")}
                    onTaskCheck={handleTaskCheck}
                    onTaskUncheck={handleTaskUncheck}
                    slide={true}
                    bouncyBox={true}
                    component={"normal"}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noItemContainer}>
                <Text style={styles.noItemTitle}>
                  Aucune tâche pour ce jour.
                </Text>
              </View>
            )}
          </View>
        )}
        onChangeIndex={handleChangeIndex}
        bounces={false}
        windowSize={5}
        style={styles.swiper}
      />
    </View>
  );
};

export default Jour;
