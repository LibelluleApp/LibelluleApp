import React, {
  useState,
  useRef,
  useEffect,
  PureComponent,
  Suspense,
  useContext,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  ScrollView,
  ResetList,
  TouchableOpacity,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import PaginationHeader from "../components/agenda/pagination";
import moment from "moment-timezone";
import Button from "./../components/agenda/button";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import "moment/locale/fr";
import fetchAgenda from "../api/Agenda/fetch";
import { ThemeContext } from "./../utils/themeContext";
import Dropdown from "./../components/dropdown/Dropdown";

// Import explicite des composants à pré-charger
import EvalHome from "../components/agenda/items/Eval";
import TaskHome from "../components/agenda/items/Task";
import {
  getIsFirstVisitAgenda,
  getUserData,
  setIsFirstVisitAgenda,
} from "../utils/storage";

// Import des fonctions pour le stockage et la récupération des données du cache

const preloadComponent = (component) => {
  return new Promise((resolve) => {
    component().then(resolve);
  });
};

const Agenda = () => {
  const { colors } = useContext(ThemeContext);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user_data, setUser_data] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [evalCount, setEvalCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  const [selectedView, setSelectedView] = useState("day");
  const [options, setOptions] = useState([
    { label: "Vue journée", value: "day" },
    { label: "Vue semaine", value: "week" },
    { label: "Vue chronologique", value: "timeline" },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: 25,
    },
    swiperContainer: {
      flex: 1,
    },
    itemContainer: {
      flex: 1,
      width: Dimensions.get("window").width,
      paddingHorizontal: "5%",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    noItemContainer: {
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      width: Dimensions.get("window").width,
    },
    textNone: {
      textAlign: "center",
      alignItems: "center",
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.blue950,
    },
    addButton: {
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
    },
  });

  const handleSelect = (value) => {
    setSelectedView(value);
  };

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

  class Item extends PureComponent {
    render() {
      const { item, currentDay, onTaskCheck, onTaskUncheck } = this.props;

      let ComponentToRender = null;

      const slideDay = moment(currentDay).format("YYYY-MM-DD");
      const itemDay = moment(item?.date_fin).format("YYYY-MM-DD");

      if (itemDay === slideDay) {
        if (item?.type === "eval") {
          ComponentToRender = EvalHome;
        } else if (item?.type === "devoir") {
          ComponentToRender = TaskHome;
        }
        if (item?.type === "none") {
          ComponentToRender = null;
        }
      }

      return ComponentToRender ? (
        <View style={styles.items}>
          <Suspense
            fallback={<ActivityIndicator size="large" color="#0000ff" />}
          >
            <ComponentToRender
              item={item}
              titre={item.titre}
              agenda_id={item.agenda_id}
              date={item.date_fin}
              matiere={item.Ressource?.nom_ressource}
              checked={item.estFait}
              onTaskCheck={onTaskCheck} // Passer le callback ici
              onTaskUncheck={onTaskUncheck} // Passer le callback ici
            />
          </Suspense>
        </View>
      ) : (
        <View style={styles.noItemContainer}>
          <Text style={styles.textNone}>
            Aucun élément à afficher pour cette journée
          </Text>
        </View>
      );
    }
  }

  const fetchData = async () => {
    try {
      const data = await fetchAgenda();
      await initializeAgenda(data);
      setTasks(data); // Assume que 'data' est un tableau d'objets de tâches
      const userDataJSON = getUserData();
      if (userDataJSON !== null) {
        const userData = userDataJSON;
        setUser_data(userData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de l'agenda.", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const initializeAgenda = async (data) => {
    const startDate = moment("2024-07-10");
    const endDate = moment("2024-12-31");

    const weekdays = [];
    let currentDate = startDate.clone();
    while (currentDate <= endDate) {
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        let dayData = data.filter((item) =>
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
  };

  const handleChangeIndex = ({ index }) => {
    setCurrentIndex(index);
    setCurrentWeekNumber(daysOfWeek[index].date.week());
    calculateCounts(daysOfWeek[index].data); // Appel de la fonction de calcul des compteurs pour le nouveau jour
  };

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
    calculateCounts(daysOfWeek[newIndex].data); // Appel de la fonction de calcul des compte
  };

  const handleToday = () => {
    setCurrentIndex(defaultIndex);
    swiperRef.current.scrollToIndex({ index: defaultIndex });
    setCurrentWeekNumber(daysOfWeek[defaultIndex].date.week());
    calculateCounts(daysOfWeek[defaultIndex].data); // Appel de la fonction de calcul des compteurs pour le nouveau jour
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

    let newTaskCount = taskCount - 1;
    setTaskCount(newTaskCount);
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

    let newTaskCount = taskCount + 1;
    setTaskCount(newTaskCount);
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
    dayData.forEach((item) => {
      if (item.type === "devoir") {
        totalTaskCounter++;
      }
    });

    setEvalCount(evalCounter);
    setTaskCount(taskCounter);
    setTotalTaskCount(totalTaskCounter);
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
        currentDay={daysOfWeek[currentIndex]?.date.format("dddd DD MMMM")}
        onPrev={handlePrevDay}
        onNext={handleNextDay}
        index={currentIndex}
        defaultIndex={defaultIndex}
        returnToday={handleToday}
        currentWeekNumber={currentWeekNumber}
        evalCount={evalCount} // Passage du compteur d'évaluations
        taskCount={taskCount} // Passage du compteur de tâches
        totalTaskCount={totalTaskCount} // Passage du compteur total de tâches
        onSelect={handleSelect}
        value={selectedView}
        options={options}
      />
      <View style={styles.swiperContainer}>
        <SwiperFlatList
          ref={swiperRef}
          index={currentIndex}
          data={daysOfWeek}
          initialNumToRender={5}
          renderItem={({ item }) => {
            const numEvents = item.data.length;
            if (numEvents >= 5) {
              return (
                <ScrollView style={styles.itemContainer}>
                  {item.data.map((agendaItem) => (
                    <Item
                      key={agendaItem.agenda_id}
                      item={agendaItem}
                      currentDay={item.date}
                      onTaskCheck={handleTaskCheck}
                      onTaskUncheck={handleTaskUncheck}
                    />
                  ))}
                </ScrollView>
              );
            } else {
              return (
                <View style={styles.itemContainer}>
                  {item.data.map((agendaItem) => (
                    <Item
                      key={agendaItem.agenda_id}
                      item={agendaItem}
                      currentDay={item.date}
                      onTaskCheck={handleTaskCheck}
                      onTaskUncheck={handleTaskUncheck}
                    />
                  ))}
                </View>
              );
            }
          }}
          onChangeIndex={handleChangeIndex}
          windowSize={5}
          bounces={false}
        />
      </View>
      {user_data?.role.includes("Chef") && (
        <Button
          title="Ajouter une tâche"
          onPress={() =>
            navigation.navigate("addAgenda", {
              date: daysOfWeek[currentIndex]?.date.format("yyyy-MM-DD"),
            })
          }
          style={styles.addButton}
        />
      )}
    </View>
  );
};

export default Agenda;
