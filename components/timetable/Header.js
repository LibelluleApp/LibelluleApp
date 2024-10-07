import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { ThemeContext } from "../../utils/themeContext";

const CustomHeaderItem = ({ startUnix }) => {
  const { colors } = useContext(ThemeContext);
  // Conversion de l'Unix en date
  const date = moment(startUnix);
  const day = date.date(); // Jour du mois
  const month = date.format("MMM"); // Mois abrégé (ex: "Oct")
  const weekNumber = getWeekNumber(date.toDate()); // Numéro de la semaine
  const dayOfWeek = date.format("ddd"); // Jour de la semaine en lettres
  const isToday = date.isSame(moment(), "day"); // Vérifie si c'est aujourd'hui
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      width: "100%", // Assurez-vous que le conteneur prend toute la largeur
    },
    leftContent: {
      flex: 1,
      alignItems: "flex-start",
    },
    leftContentText: {
      alignItems: "center",
      paddingLeft: 5,
    },
    centerContent: {
      flex: 1,
    },
    centerContentText: {
      alignItems: "center",
      alignSelf: "flex-start",
    },
    monthText: {
      fontSize: 12,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue800,
      textTransform: "capitalize",
    },
    weekNumberText: {
      fontSize: 12,
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue800,
      textTransform: "capitalize",
    },
    dayText: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue900,
      textTransform: "capitalize",
    },
    dateNumberText: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue900,
      textTransform: "capitalize",
    },
    todayDate: {
      color: colors.blue800,
      fontFamily: "Ubuntu_500Medium",
    },
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContent}>
        <View style={styles.leftContentText}>
          <Text style={styles.monthText}>{month}</Text>
          <Text style={styles.weekNumberText}>Sem {weekNumber}</Text>
        </View>
      </View>
      <View style={styles.centerContent}>
        <View style={styles.centerContentText}>
          <Text style={[styles.dayText, isToday && styles.todayDate]}>
            {dayOfWeek}
          </Text>
          <Text style={[styles.dateNumberText, isToday && styles.todayDate]}>
            {day}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Fonction pour obtenir le numéro de la semaine
const getWeekNumber = (date) => {
  const currentDate = new Date(date);
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const daysSinceFirst = Math.floor(
    (currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000)
  );
  const firstWeekday = firstDayOfYear.getDay();
  return Math.ceil((daysSinceFirst + firstWeekday + 1) / 7);
};

export default CustomHeaderItem;
