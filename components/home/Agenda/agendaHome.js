import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CalendarList from "./calendarList";
import EventDay from "./eventDay";
import moment from "moment";
import { ThemeContext } from "./../../../utils/themeContext";
import { useNavigation } from "@react-navigation/native";
import "moment/locale/fr"; // Assurez-vous que la langue est correctement définie si vous utilisez des formats localisés

function AgendaHome() {
  const { colors } = useContext(ThemeContext);
  const [agendaContent, setAgendaContent] = useState(true);
  console.log("agendaContent", agendaContent);

  const todayDate = moment();

  // Récupérer le jour de la semaine
  const dayOfWeek = todayDate.day(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi

  let message;
  let tomorrowDate;

  // Vérifie si aujourd'hui est vendredi (5) ou samedi (6)
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    // Si c'est le week-end, on prend "la prochaine fois"
    tomorrowDate = moment(todayDate).add(dayOfWeek === 0 ? 3 : 2, "days"); // Dimanche, on prend Lundi; Samedi, on prend Lundi
    message = "Pour la prochaine fois";
  } else {
    // Si c'est un jour de semaine, on prend demain
    tomorrowDate = moment(todayDate).add(1, "days"); // Ajoute un jour
    message = "Pour demain";
  }

  // Formate la date pour obtenir "Mar. 02. oct"
  const formattedDate = tomorrowDate.format("ddd DD MMM");

  const styles = StyleSheet.create({
    agendaContainer: {},
    nextTasksContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      marginVertical: 20,
    },
    nextTasksTitle: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      color: colors.blue950,
    },
    nextTasksSubtitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue800,
    },
    nextTasksContent: {
      flexDirection: "column",
    },
    btnOutline: {
      color: colors.blue700,
      fontSize: 16,
      paddingHorizontal: 20,
      paddingVertical: 7,
      borderRadius: 50,
      borderWidth: 0.5,
      borderColor: colors.blue700,
      textAlign: "center",
    },
    btnOutlineText: {
      color: colors.blue700,
      fontSize: 13,
      fontFamily: "Ubuntu_500Medium",
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.agendaContainer}>
      {/* <CalendarList onDateSelect={handleDateSelect} /> */}
      <View style={styles.nextTasksContainer}>
        <View style={styles.nextTasksContent}>
          <Text style={styles.nextTasksTitle}>{message}</Text>
          <Text style={styles.nextTasksSubtitle}>{formattedDate}</Text>
        </View>
        {/* Utilisation de l'opérateur && pour afficher un bouton conditionnel */}
        {agendaContent === true && (
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => navigation.navigate("Agenda")}
          >
            <Text style={styles.btnOutlineText}>Voir plus</Text>
          </TouchableOpacity>
        )}
      </View>
      <EventDay
        onAgendaContentChange={setAgendaContent}
        date={tomorrowDate.format("YYYY-MM-DD")}
      />
    </View>
  );
}

export default AgendaHome;
