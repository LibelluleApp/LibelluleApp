import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Calendar, Student, LayoutList } from "../../../assets/icons/Icons";
import * as Haptics from "expo-haptics";
import fetchTask from "../../../api/Agenda/fetchTask";
import deleteTask from "../../../api/Agenda/delete";
import { checkAgenda, uncheckAgenda } from "../../../api/Agenda/check";
import moment from "moment";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../../utils/themeContext";

const ViewTask = ({ route }) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: colors.background,
      padding: 20,
      gap: 20,
    },
    containerItems: {
      flexDirection: "column",
      gap: 20,
    },
    taskInfo: {
      flexDirection: "column",
      padding: 20,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      gap: 20,
    },
    taskInfoContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    taskContent: {
      padding: 20,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      gap: 10,
    },
    taskFooter: {
      padding: 20,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      flexDirection: "row",
    },
    taskInfoTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.black,
    },
    taskInfoDesc: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
    taskState: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.red_variable,
    },
    taskGood: {
      color: colors.green_variable,
    },
    taskDisclaimer: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.red_variable,
      textAlign: "center",
    },
    taskCTA: {
      flexDirection: "row",
      width: "95%",
      marginHorizontal: "auto",
      justifyContent: "center",
      gap: 15,
    },
    taskCTADelete: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
      backgroundColor: colors.red700,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      width: "45%",
    },
    taskCTAEdit: {
      backgroundColor: colors.blue700,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      width: "55%",
    },
    taskCTAText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 17,
      color: colors.white,
    },
    taskCTATextDelete: {
      color: colors.white,
    },
  });

  const navigation = useNavigation();
  const agenda_id = route.params.agenda_id;
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchTask(agenda_id);
      setTask(response[0]);
      setIsChecked(response[0].estFait);
    } catch (error) {
      console.error("Erreur lors de la récupération de la tâche:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.grey} />
      </View>
    );
  }

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isChecked) {
      uncheckAgenda(agenda_id);
      if (typeof onTaskUncheck === "function") {
        onTaskUncheck(agenda_id);
      }
    } else {
      checkAgenda(agenda_id);
      if (typeof onTaskCheck === "function") {
        onTaskCheck(agenda_id);
      }
    }
  };
  const handleConfirmDelete = () => {
    Alert.alert(
      "Suppression de la tâche",
      "Voulez-vous vraiment supprimer cette tâche ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: async () => {
            await deleteTask(agenda_id);
            navigation.goBack();
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerItems}>
        <View style={styles.taskInfo}>
          <View style={styles.taskInfoContent}>
            <Calendar
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
            <View>
              <Text style={styles.taskInfoTitle}>Date</Text>
              <Text style={styles.taskInfoDesc}>
                {moment(task.date_fin).format("ddd DD MMMM")}
              </Text>
            </View>
          </View>
          <View style={styles.taskInfoContent}>
            <Student
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
            <View>
              <Text style={styles.taskInfoTitle}>Matière</Text>
              <Text style={styles.taskInfoDesc}>
                {task.Ressource.nom_ressource || "Matière indisponible"}
              </Text>
            </View>
          </View>
          <View style={styles.taskInfoContent}>
            <LayoutList
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
            <View>
              <Text style={styles.taskInfoTitle}>Type de tâche</Text>
              <Text style={styles.taskInfoDesc}>
                {task.type == "eval" ? "Evaluation" : "Tâche à faire"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.taskContent}>
          <View>
            <Text style={styles.taskInfoTitle}>Titre</Text>
            <Text style={styles.taskInfoDesc}>
              {task.titre || "Titre indisponible"}
            </Text>
          </View>
          {task.type == "devoir" && (
            <View>
              <Text style={styles.taskInfoTitle}>Description</Text>
              <Text style={styles.taskInfoDesc}>
                {task.contenu || "Contenu indisponible"}
              </Text>
            </View>
          )}
        </View>
        {task.type == "devoir" && (
          <View style={styles.taskFooter}>
            <BouncyCheckbox
              fillColor={colors.blue_variable}
              unfillColor={colors.white}
              onPress={handleCheckboxPress}
              isChecked={isChecked}
            />

            <View>
              <Text style={styles.taskInfoTitle}>État</Text>
              <Text style={[styles.taskState, isChecked && styles.taskGood]}>
                {isChecked ? "Fait" : "Non fait"}
              </Text>
            </View>
          </View>
        )}
      </View>
      {/* <Text style={styles.taskDisclaimer}>
        Cette {task.type == "devoir" ? "tâche" : "évaluation"} n'a pas été
        validé par l'enseignant
      </Text> */}
      <View style={styles.taskCTA}>
        <TouchableOpacity
          style={styles.taskCTADelete}
          onPress={handleConfirmDelete}
        >
          <Text style={[styles.taskCTAText, styles.taskCTATextDelete]}>
            Supprimer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskCTAEdit}>
          <Text style={styles.taskCTAText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewTask;
