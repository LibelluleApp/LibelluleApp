import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import moment from "moment-timezone";
import Item from "./Item";
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
      marginVertical: 5,
    },
    listContainer: {},
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

  const today = moment().startOf("day");

  const upcomingTasks = tasks
    .filter((task) => moment(task.date_fin).isAfter(today))
    .sort((a, b) => moment(a.date_fin).diff(moment(b.date_fin)));

  const formatDate = (date) => {
    return moment(date).format("DD/MM");
  };

  // Suivi de la dernière date affichée pour appliquer l'opacité
  let lastRenderedDate = null;

  const renderItem = ({ item }) => {
    const itemDate = formatDate(item.date_fin);
    const isSameDate = itemDate === lastRenderedDate;
    lastRenderedDate = itemDate;

    return (
      <View style={styles.taskContainer}>
        <Text
          style={[
            styles.dateText,
            { opacity: isSameDate ? 0 : 1 }, // Opacité à 0 pour les dates répétées
          ]}
        >
          {itemDate}
        </Text>
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
        data={upcomingTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.agenda_id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Chronologie;
