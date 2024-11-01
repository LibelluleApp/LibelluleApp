import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import moment from "moment-timezone";
import Item from "./Item"; // Assurez-vous que ce composant est correctement importé
import { ThemeContext } from "./../../utils/themeContext";

const Chronologie = ({
  tasks,
  user_data,
  setUser_data,
  setTaskCount,
  evalCount,
  setEvalCount,
  totalTaskCount,
  setTotalTaskCount,
}) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: "90%",
      marginHorizontal: "auto",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    taskContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dateText: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular950,
    },
    listContainer: {},
  });

  // Vérification des tâches
  console.log("Tasks:", tasks); // Vérifiez que le tableau tasks est correctement rempli

  // Obtenir la date d'aujourd'hui
  const today = moment().startOf("day"); // Utiliser le début de la journée

  // Filtrer et trier les tâches futures
  const upcomingTasks = tasks
    .filter((task) => moment(task.date_fin).isAfter(today)) // Garder seulement les tâches à venir
    .sort((a, b) => moment(a.date_fin).diff(moment(b.date_fin))); // Trier par date croissante

  // Fonction pour formater la date pour l'affichage
  const formatDate = (date) => {
    return moment(date).format("DD/MM");
  };

  // Fonction de rendu pour chaque tâche
  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.dateText}>{formatDate(item.date_fin)}</Text>
        <View style={{ flex: 1 }}>
          <Item
            item={item}
            currentDay={item.date_fin}
            onTaskCheck={(taskId) => handleTaskCheck(taskId)}
            onTaskUncheck={(taskId) => handleTaskUncheck(taskId)}
            slide={false}
            component={"little"}
            bouncyBox={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={upcomingTasks} // Utiliser la liste des tâches filtrées
        renderItem={renderItem}
        keyExtractor={(item) => item.agenda_id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Chronologie;
