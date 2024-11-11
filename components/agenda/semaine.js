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
} from "./../../assets/icons/Icons";
import moment from "moment-timezone";
import SwiperFlatList from "react-native-swiper-flatlist";
import Item from "./Item"; // Assurez-vous que ce composant est correctement importé
import { ThemeContext } from "./../../utils/themeContext";
import * as Progress from "react-native-progress";
import TouchableScale from "react-native-touchable-scale";

const { width } = Dimensions.get("window");

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
  setReturnToday,
  swiperRef,
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
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      gap: 5,
    },
    progressTextTask: {
      color: colors.regular700,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    progressTextPourcent: {
      color: colors.regular700,
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
      paddingTop: 20,
    },
    itemContainer: {
      flexDirection: "column",
      gap: 20,
    },
    noItemContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noItemTitle: {
      fontSize: 16,
      color: colors.regular800,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      textAlign: "center",
    },
    dateHeader: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.regular800,
      marginVertical: 10,
    },
    dateTaskTitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.regular800,
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

  // Fonction d'initialisation des semaines
  const initializeWeeks = () => {
    const endDate = moment("2024-12-31");
    const weeks = [];

    // Vérifier si aujourd'hui est un samedi (6) ou un dimanche (0) et basculer à la semaine suivante
    let currentDateClone = todayMoment.clone();

    // Si c'est samedi ou dimanche, passer à lundi prochain
    if (
      currentDateClone.isoWeekday() === 6 ||
      currentDateClone.isoWeekday() === 7
    ) {
      currentDateClone.add(1, "week").startOf("isoWeek");
    } else {
      currentDateClone.startOf("isoWeek"); // Sinon, commencer la semaine normalement
    }

    while (currentDateClone <= endDate) {
      const weekNumber = currentDateClone.isoWeek(); // Numéro de semaine ISO
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
    const currentWeek = todayMoment
      .clone()
      .add(
        todayMoment.isoWeekday() === 6 || todayMoment.isoWeekday() === 7
          ? 1
          : 0,
        "week"
      )
      .isoWeek(); // Toujours calculer à partir du lundi

    const weekIndex = weeks.findIndex((week) => week.week === currentWeek);

    setDaysOfWeek(weeks);
    setCurrentIndex(weekIndex);
    setDefaultIndex(weekIndex); // Même chose pour l'index par défaut
    setCurrentWeekNumber(weeks[weekIndex].week);
    calculateCounts(weeks[weekIndex]?.data || []); // Calculer les compteurs pour la semaine actuelle
  };

  useEffect(() => {
    initializeWeeks();
  }, [tasks]);

  // Fonction de calcul des compteurs (évaluations, devoirs)
  const calculateCounts = (weekData) => {
    let evalCounter = 0;
    let taskCounter = 0;
    let totalTaskCounter = 0;

    // Vérification des données reçues
    if (weekData && Object.keys(weekData).length > 0) {
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
    }

    // Met à jour les compteurs
    setEvalCount(evalCounter);
    setTaskCount(taskCounter);
    setTotalTaskCount(totalTaskCounter);
  };

  const handlePrevWeek = () => {
    const newIndex =
      currentIndex === 0 ? daysOfWeek.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
    setCurrentWeekNumber(daysOfWeek[newIndex].week);
    calculateCounts(daysOfWeek[newIndex].data); // Appel de la fonction de calcul des compteurs pour le nouveau jour
  };

  const handleNextWeek = () => {
    const newIndex =
      currentIndex === daysOfWeek.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    swiperRef.current.scrollToIndex({ index: newIndex });
    setCurrentWeekNumber(daysOfWeek[newIndex].week);
    calculateCounts(daysOfWeek[newIndex].data); // Appel de la fonction de calcul
  };

  useEffect(() => {
    if (returnToday) {
      setCurrentIndex(defaultIndex);
      swiperRef.current.scrollToIndex({ index: defaultIndex });
      setCurrentWeekNumber(daysOfWeek[defaultIndex].week);
      calculateCounts(daysOfWeek[defaultIndex].data); // Recalculer pour le jour actuel

      setReturnToday(false); // Réinitialiser l'état
    }
  }, [returnToday, daysOfWeek]);

  // Fonction pour gérer le changement de semaine
  const handleChangeIndex = ({ index }) => {
    // Vérifiez que l'index est valide avant de le définir
    setCurrentIndex(index);
    setCurrentWeekNumber(daysOfWeek[index].week);
    calculateCounts(daysOfWeek[index].data);
  };

  // Gestion des tâches cochées
  const handleTaskCheck = (taskId) => {
    const updatedWeeks = daysOfWeek.map((week) => {
      const updatedData = Object.keys(week.data).map((dateKey) => {
        const dateTasks = week.data[dateKey].map((item) =>
          item.agenda_id === taskId ? { ...item, estFait: true } : item
        );
        return { [dateKey]: dateTasks };
      });
      return { ...week, data: Object.assign({}, ...updatedData) };
    });

    setDaysOfWeek(updatedWeeks);
    setTaskCount((prevTaskCount) => Math.max(0, prevTaskCount - 1)); // Use state updater function
  };

  // Gestion des tâches décochées
  const handleTaskUncheck = (taskId) => {
    const updatedWeeks = daysOfWeek.map((week) => {
      const updatedData = Object.keys(week.data).map((dateKey) => {
        const dateTasks = week.data[dateKey].map((item) =>
          item.agenda_id === taskId ? { ...item, estFait: false } : item
        );
        return { [dateKey]: dateTasks };
      });
      return { ...week, data: Object.assign({}, ...updatedData) };
    });

    setDaysOfWeek(updatedWeeks);
    setTaskCount((prevTaskCount) =>
      Math.min(totalTaskCount, prevTaskCount + 1)
    ); // Use state updater function
  };

  let progression = 1;
  let percentProgression = 100;
  taskCount = totalTaskCount - taskCount;

  if (totalTaskCount === 0) {
    progression = 1;
  } else {
    progression = taskCount / totalTaskCount;
    percentProgression = Math.round(progression * 100);
  }

  // Obtenir le début de l'année
  const yearStart = moment().startOf("year");
  // Calculer la date de début de la semaine en fonction du numéro de semaine
  const startOfWeekDate = yearStart
    .add(currentWeekNumber - 1, "weeks")
    .startOf("isoWeek");

  return (
    <View style={styles.swiperContainer}>
      <View style={styles.headerContainer}>
        <TouchableScale
          friction={6}
          activeScale={0.7}
          disabled={currentIndex === 0}
          onPress={handlePrevWeek}
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
          <Text style={styles.headerTitle}>Semaine {currentWeekNumber}</Text>
          <Text style={styles.headerSubtitle}>
            {`Du ${startOfWeekDate.format("DD/MM")} au ${startOfWeekDate
              .clone()
              .add(4, "days")
              .format("DD/MM")}`}
          </Text>
        </View>
        <TouchableScale
          friction={6}
          activeScale={0.7}
          onPress={handleNextWeek}
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
          unfilledColor={colors.regular200}
          borderWidth={0}
          color={colors.regular700}
        />
      </View>

      <SwiperFlatList
        ref={swiperRef}
        index={0}
        data={daysOfWeek}
        initialNumToRender={1}
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
                    {Array.isArray(dateTasks) ? (
                      dateTasks.map((agendaItem) => (
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
                      ))
                    ) : (
                      <View style={styles.noItemContent}>
                        <CircleCheckBig
                          stroke={colors.regular800}
                          strokeWidth={1.75}
                          width={30}
                          height={30}
                        />
                        <Text style={styles.textNone}>
                          Aucun élément à afficher pour cette semaine
                        </Text>
                      </View>
                    )}
                  </View>
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
                  Aucun élément à afficher pour cette semaine
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
