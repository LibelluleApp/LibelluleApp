import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  TouchableOpacity,
} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ArrowLeft, ArrowRight } from "./../../assets/icons/Icons";
import moment from "moment-timezone";
import SwiperFlatList from "react-native-swiper-flatlist";
import Item from "./Item"; // Assurez-vous que ce composant est correctement importé
import { ThemeContext } from "./../../utils/themeContext";
import * as Progress from "react-native-progress";

const { width } = Dimensions.get("window");

const Semaine = ({
  tasks,
  user_data,
  setUser_data,
  setTaskCount,
  taskCount,
  currentIndex,
  setCurrentIndex,
  currentWeekNumber,
  setCurrentWeekNumber,
  evalCount,
  setEvalCount,
  totalTaskCount,
  setTotalTaskCount,
  returnToday,
  swiperRef,
  setReturnToday,
  currentDate,
  setCurrentDate,
  weeks,
  setWeeks,
  day,
}) => {
  const { colors } = useContext(ThemeContext);
  const startDate = moment("2024-07-10");

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
    },
    headerTitleContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue950,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue800,
      textAlign: "center",
    },
    counts: {
      width: "100%",
      paddingHorizontal: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      gap: 5,
    },
    progressTextTask: {
      color: colors.blue_variable,
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
    },
    progressTextPourcent: {
      color: colors.grey_variable,
      fontFamily: "Ubuntu_500Medium",
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
      textAlign: "center",
    },
    dateHeader: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue800,
      marginVertical: 10,
    },
    dateTaskTitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue800,
    },
  });

  // Fonction d'initialisation des semaines
  const initializeWeeks = () => {
    const endDate = moment("2024-12-31");
    const weeks = [];
    let currentDateClone = startDate.clone(); // Utiliser une copie de startDate

    while (currentDateClone <= endDate) {
      const weekNumber = currentDateClone.isoWeek();
      let weekTasks = tasks.filter(
        (item) => moment(item.date_fin).isoWeek() === weekNumber
      );

      // Regroupement des tâches par date
      const tasksByDate = weekTasks.reduce((acc, item) => {
        const dateKey = moment(item.date_fin).format("YYYY-MM-DD");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
      }, {});

      weeks.push({ week: weekNumber, data: tasksByDate });
      currentDateClone.add(1, "week"); // Passer à la semaine suivante
    }

    // Calculer l'index de la semaine actuelle
    const currentWeek = day.isoWeek();
    const currentWeekIndex = weeks.findIndex(
      (week) => week.week === currentWeek
    );

    // Vérifiez que currentWeekIndex n'est pas -1
    const indexToSet = currentWeekIndex !== -1 ? currentWeekIndex : 0;
    setCurrentIndex(indexToSet);
    setCurrentWeekNumber(weeks[indexToSet].week);
    calculateCounts(weeks[indexToSet]?.data || []);
    return weeks;
  };

  // Fonction de calcul des compteurs (évaluations, devoirs)
  const calculateCounts = (weekData) => {
    let evalCounter = 0;
    let taskCounter = 0;
    let totalTaskCounter = 0;

    // Calculer les évaluations et les tâches restantes
    Object.values(weekData).forEach((dateTasks) => {
      dateTasks.forEach((item) => {
        if (item.type === "eval") {
          evalCounter++;
        } else if (item.type === "devoir") {
          totalTaskCounter++;
          if (!item.estFait) {
            taskCounter++;
          }
        }
      });
    });

    setEvalCount(evalCounter);
    setTaskCount(taskCounter);
    setTotalTaskCount(totalTaskCounter);
  };

  const handlePrevWeek = () => {
    const newIndex = currentIndex === 0 ? weeks.length - 1 : currentIndex - 1;

    // Assurez-vous que l'index est valide avant de le définir
    if (newIndex >= 0 && newIndex < weeks.length) {
      setCurrentIndex(newIndex);
      swiperRef.current.scrollToIndex({ index: newIndex });
      setCurrentWeekNumber(weeks[newIndex].week);
      calculateCounts(weeks[newIndex].data);
    } else {
      console.warn("L'index de la semaine précédente est invalide.");
    }
  };

  const handleNextWeek = () => {
    const newIndex = currentIndex === weeks.length - 1 ? 0 : currentIndex + 1;

    // Assurez-vous que l'index est valide avant de le définir
    if (newIndex >= 0 && newIndex < weeks.length) {
      setCurrentIndex(newIndex);
      swiperRef.current.scrollToIndex({ index: newIndex });
      setCurrentWeekNumber(weeks[newIndex].week);
      calculateCounts(weeks[newIndex].data);
    } else {
      console.warn("L'index de la semaine suivante est invalide.");
    }
  };

  // Fonction pour gérer le changement de semaine
  const handleChangeIndex = ({ index }) => {
    // Vérifiez que l'index est valide avant de le définir
    if (index >= 0 && index < weeks.length) {
      setCurrentIndex(index);
      setCurrentWeekNumber(weeks[index].week);
      calculateCounts(weeks[index].data);
    } else {
      console.warn("L'index changé est invalide.");
    }
  };

  // Fonction pour retourner à la semaine actuelle
  const handleReturnToday = () => {
    const currentWeek = moment().isoWeek();
    const currentWeekIndex = weeks.findIndex(
      (week) => week.week === currentWeek
    );

    if (currentWeekIndex !== -1 && swiperRef.current) {
      setCurrentIndex(currentWeekIndex);
      swiperRef.current.scrollToIndex({ index: currentWeekIndex });
    } else {
      console.warn("L'index de la semaine actuelle est invalide.");
    }
  };

  // Gestion des tâches cochées
  const handleTaskCheck = (taskId) => {
    const updatedWeeks = weeks.map((week) => {
      const updatedData = Object.keys(week.data).map((dateKey) => {
        const dateTasks = week.data[dateKey].map((item) =>
          item.agenda_id === taskId ? { ...item, estFait: true } : item
        );
        return { [dateKey]: dateTasks };
      });
      return { ...week, data: Object.assign({}, ...updatedData) };
    });

    setWeeks(updatedWeeks);

    let newTaskCount = taskCount - 1;
    setTaskCount(newTaskCount);
  };

  // Gestion des tâches décochées
  const handleTaskUncheck = (taskId) => {
    const updatedWeeks = weeks.map((week) => {
      const updatedData = Object.keys(week.data).map((dateKey) => {
        const dateTasks = week.data[dateKey].map((item) =>
          item.agenda_id === taskId ? { ...item, estFait: false } : item
        );
        return { [dateKey]: dateTasks };
      });
      return { ...week, data: Object.assign({}, ...updatedData) };
    });

    setWeeks(updatedWeeks);
    let newTaskCount = taskCount + 1;
    setTaskCount(newTaskCount);
  };

  useEffect(() => {
    const initWeeks = initializeWeeks();
    setWeeks(initWeeks);
  }, [tasks]);

  useEffect(() => {
    if (returnToday) {
      handleReturnToday();
      setReturnToday(false); // Réinitialiser l'état
    }
  }, [returnToday]);

  let progression = 1;
  let percentProgression = 100;
  taskCount = totalTaskCount - taskCount;

  if (totalTaskCount === 0) {
    progression = 1;
  } else {
    progression = taskCount / totalTaskCount;
    percentProgression = Math.round(progression * 100);
  }

  return (
    <View style={styles.swiperContainer}>
      {/* Affichage de la semaine actuelle */}
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handlePrevWeek}
          style={styles.aroundLeft}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ArrowLeft
            stroke={colors.black}
            strokeWidth={1.75}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Semaine {currentWeekNumber}</Text>
        </View>
        <TouchableOpacity
          onPress={handleNextWeek}
          style={styles.aroundRight}
          hitSlop={{ top: 20, bottom: 20, right: 20 }}
        >
          <ArrowRight
            stroke={colors.black}
            strokeWidth={1.75}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View> */}

      {/* Liste des semaines avec Swiper */}
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
          unfilledColor={colors.grey}
          borderWidth={0}
          color={colors.blue_variable}
        />
      </View>
      <SwiperFlatList
        ref={swiperRef}
        index={currentIndex}
        data={weeks}
        renderItem={({ item }) => (
          <View style={styles.itemContent}>
            {Object.keys(item.data).length > 0 ? (
              <View style={styles.itemContainer}>
                {Object.entries(item.data).map(([dateKey, dateTasks]) => (
                  <View key={dateKey}>
                    <Text style={styles.dateTaskTitle}>
                      {moment(dateKey)
                        .format("dddd D MMMM")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Text>
                    {dateTasks.map((agendaItem) => (
                      <Item
                        key={agendaItem.agenda_id}
                        item={agendaItem}
                        currentDate={agendaItem.date_fin}
                        onTaskCheck={handleTaskCheck}
                        onTaskUncheck={handleTaskUncheck}
                        slide={true}
                        bouncyBox={true}
                        component={"normal"}
                      />
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noItemContainer}>
                <Text style={styles.noItemTitle}>
                  Aucune tâche pour cette semaine.
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

export default Semaine;
