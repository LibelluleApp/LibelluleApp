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
  RefreshControl,
  ScrollView,
  AsyncStorage,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import PaginationHeader from "../components/agenda/pagination";
import moment from "moment-timezone";
import Button from "../components/scolarite/button";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import "moment/locale/fr";
import fetchAgenda from "../api/Agenda/fetch";

// Import explicite des composants à pré-charger
import EvalHome from "../components/home/Agenda/Eval";
import TaskHome from "../components/home/Agenda/Task";

// Import des fonctions pour le stockage et la récupération des données du cache
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erreur lors du stockage des données", error);
  }
};

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
    return null;
  }
};

const preloadComponent = (component) => {
  return new Promise((resolve) => {
    component().then(resolve);
  });
};

class Item extends PureComponent {
  render() {
    const { item, currentDay } = this.props;

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
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          <ComponentToRender
            item={item}
            titre={item.titre}
            id={item.agenda_id}
            date={item.date_fin}
            matiere={item.Ressource?.nom_ressource}
            checked={item.estFait}
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

const Agenda = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Utilisation de useIsFocused pour détecter si la page est en focus
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [evalCount, setEvalCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const fetchData = async () => {
    try {
      const data = await fetchAgenda();
      initializeAgenda(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de l'agenda.", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Vérifie si la page est en focus
      fetchData();
    }
  }, [isFocused]); // Déclenche la mise à jour lorsque isFocused change

  useEffect(() => {
    fetchData();

    preloadComponent(() => import("../components/home/Agenda/Eval"));
    preloadComponent(() => import("../components/home/Agenda/Task"));
  }, []);

  const initializeAgenda = async (data) => {
    const startDate = moment("2023-09-01");
    const endDate = moment("2024-07-10");

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
    const todayIndex = weekdays.findIndex((day) =>
      day.date.isSame(moment(), "day")
    );
    setCurrentIndex(todayIndex !== -1 ? todayIndex : 0);
    setDefaultIndex(todayIndex !== -1 ? todayIndex : 0);

    setDaysOfWeek(weekdays);
    setCurrentWeekNumber(weekdays[todayIndex].date.week());

    calculateCounts(weekdays[todayIndex].data); // Appel pour calculer les compteurs
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

  // Fonction pour calculer les compteurs d'évaluations et de tâches restantes pour le jour donné
  const calculateCounts = (dayData) => {
    let evalCounter = 0;
    let taskCounter = 0;
    dayData.forEach((item) => {
      if (item.type === "eval") {
        evalCounter++;
      } else if (item.type === "devoir" && !item.estFait) {
        taskCounter++;
      }
    });

    setEvalCount(evalCounter);
    setTaskCount(taskCounter);
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
      />
      <View style={styles.swiperContainer}>
        <SwiperFlatList
          ref={swiperRef}
          index={currentIndex}
          data={daysOfWeek}
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
                    />
                  ))}
                </View>
              );
            }
          }}
          onChangeIndex={handleChangeIndex}
          windowSize={3}
          bounces={false}
        />
      </View>
      <Button
        title="Ajouter une tâche"
        onPress={() =>
          navigation.navigate("addAgenda", {
            date: daysOfWeek[currentIndex]?.date.format("yyyy-MM-DD"),
          })
        }
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    paddingVertical: 25,
  },
  swiperContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    paddingHorizontal: "5%",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5F9",
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
    color: "#252525",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});

export default Agenda;
