import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheckBig,
} from "../../assets/icons/Icons";
import moment from "moment-timezone";
import SwiperFlatList from "react-native-swiper-flatlist";
import Item from "./Item"; // Assurez-vous que ce composant est correctement importé
import { ThemeContext } from "./../../utils/themeContext";
import * as Progress from "react-native-progress";
import TouchableScale from "react-native-touchable-scale";

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

  const styles = StyleSheet.create({
    swiperContainer: {
      flex: 1,
      zIndex: -1
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
      color: colors.regular950,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular800,
      textAlign: "center",
    },
    counts: {
      width: "100%",
      paddingHorizontal: 20,
      gap: 5,
    },
    progressTextTask: {
      color: colors.regular700,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    progressTextPourcent: {
      color: colors.regular200,
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
    noItemContent: {
      justifyContent: "center",
      alignItems: "center",
      gap: 7,
      width: "100%",
      marginBottom: 50,
      flex: 1,
    },
    textNone: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      textAlign: "center",
      color: colors.regular800,
      width: "50%",
    },
  });

  // Fonction d'initialisation des jours
  const initializeDays = () => {
    const startDate = moment("2024-09-01"); // Date de début : 1er septembre 2024
    const endDate = moment("2025-07-31"); // Date de fin : 31 juillet 2025
    const days = [];
    let currentDateClone = todayMoment.clone();

    // Si la date actuelle est avant le début de l'année scolaire, commencer au début
    if (currentDateClone.isBefore(startDate)) {
      currentDateClone = startDate.clone();
    }
    // Si la date actuelle est après la fin de l'année scolaire, commencer à la dernière date
    else if (currentDateClone.isAfter(endDate)) {
      currentDateClone = endDate.clone();
    }

    let iterationDate = startDate.clone();

    // Remplir les jours de semaine entre startDate et endDate
    while (iterationDate <= endDate) {
      if (iterationDate.day() !== 0 && iterationDate.day() !== 6) {
        const dayData = tasks.filter((item) =>
            moment(item.date_fin).isSame(iterationDate, "day")
        );

        days.push({ date: iterationDate.clone(), data: dayData });
      }
      iterationDate.add(1, "day");
    }

    // Trouver l'index du jour actuel dans la liste weekdays
    let todayIndex = days.findIndex((day) =>
        day.date.isSame(currentDateClone, "day")
    );

    // Gérer le cas où on est un week-end ou hors des dates valides
    if (todayIndex === -1) {
      // Si on est un weekend, trouver le prochain jour ouvré
      if (currentDateClone.day() === 6) { // Samedi
        currentDateClone.add(2, "days");
      } else if (currentDateClone.day() === 0) { // Dimanche
        currentDateClone.add(1, "days");
      }

      // Rechercher à nouveau l'index
      todayIndex = days.findIndex((day) =>
          day.date.isSame(currentDateClone, "day")
      );

      // Si toujours pas trouvé, prendre le premier jour disponible
      if (todayIndex === -1) {
        todayIndex = 0;
      }
    }

    // Sauvegarde de l'état du jour actuel
    setDaysOfWeek(days);
    setCurrentIndex(todayIndex);
    setDefaultIndex(todayIndex);
    setCurrentWeekNumber(days[todayIndex]?.date.week());
    setCurrentDate(
        days[todayIndex].date
            .format("dddd D MMMM")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );

    calculateCounts(days[todayIndex]?.data || []);
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
        <TouchableScale
          friction={6}
          activeScale={0.7}
          onPress={handlePrevDay}
          disabled={currentIndex === 0}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <View
            style={[
              styles.aroundLeft,
              { opacity: currentIndex === 0 ? 0.5 : 1 },
            ]}
          >
            <ArrowLeft
              stroke={colors.regular950}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </View>
        </TouchableScale>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{currentDate}</Text>
          <Text style={styles.headerSubtitle}>Semaine {currentWeekNumber}</Text>
        </View>
        <TouchableScale
          friction={6}
          activeScale={0.7}
          onPress={handleNextDay}
          hitSlop={{ top: 20, bottom: 20, right: 20 }}
        >
          <View style={styles.aroundRight}>
            <ArrowRight
              stroke={colors.regular950}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </View>
        </TouchableScale>
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
          unfilledColor={colors.regular200}
          borderWidth={0}
          color={colors.regular700}
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
              <View style={styles.noItemContent}>
                <CircleCheckBig
                  stroke={colors.regular800}
                  strokeWidth={1.75}
                  width={30}
                  height={30}
                />
                <Text style={styles.textNone}>
                  Aucun élément à afficher pour cette journée
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
