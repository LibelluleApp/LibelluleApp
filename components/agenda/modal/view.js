import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Timetable, Chapeau, Task } from "../../../assets/icons/Icons";
import * as Haptics from "expo-haptics";
import { Pen } from "../../../assets/icons/Icons";
import fetchTask from "../../../api/Agenda/fetchTask";
import deleteTask from "../../../api/Agenda/delete";
import moment from "moment";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";

const ViewTask = ({ route }) => {
  const navigation = useNavigation();
  const agenda_id = route.params.agenda_id;
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchTask(agenda_id);
      setTask(response[0]);
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
      <View style={styles.taskInfo}>
        <View style={styles.taskInfoContent}>
          <Timetable fill="#252525" width="23" height="23" />
          <View>
            <Text style={styles.taskInfoTitle}>Date</Text>
            <Text style={styles.taskInfoDesc}>
              {moment(task.date_fin).format("ddd DD MMMM")}
            </Text>
          </View>
        </View>
        <View style={styles.taskInfoContent}>
          <Chapeau />
          <View>
            <Text style={styles.taskInfoTitle}>Matière</Text>
            <Text style={styles.taskInfoDesc}>
              {task.Ressource.nom_ressource || "Matière indisponible"}
            </Text>
          </View>
        </View>
        <View style={styles.taskInfoContent}>
          <Task />
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
        <View>
          <Text style={styles.taskInfoTitle}>Description</Text>
          <Text style={styles.taskInfoDesc}>
            {task.contenu || "Contenu indisponible"}
          </Text>
        </View>
      </View>
      <View style={styles.taskFooter}>
        <BouncyCheckbox
          fillColor="#0760FB"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#7A797C" }}
          onPress={handleCheckboxPress}
          isChecked={isChecked}
        />
        <View>
          <Text style={styles.taskInfoTitle}>Etat</Text>
          <Text style={[styles.taskState, isChecked && styles.taskGood]}>
            {isChecked ? "Fait" : "Non fait"}
          </Text>
        </View>
      </View>
      <Text style={styles.taskDisclaimer}>
        Cette tâche n'a pas été validé par l'enseignant
      </Text>
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
          <Pen />
          <Text style={styles.taskCTAText}>Modifier une tâche</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    padding: 20,
    gap: 20,
  },
  taskInfo: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 20,
  },
  taskInfoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 10,
  },
  taskFooter: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
  },
  taskInfoTitle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#252525",
  },
  taskInfoDesc: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#252525",
  },
  taskState: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#BB0000",
  },
  taskGood: {
    color: "#0760FB",
  },
  taskDisclaimer: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#BB0000",
    textAlign: "center",
  },
  taskCTA: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskCTADelete: {
    backgroundColor: "#FB070710",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#FB0707",
    borderRadius: 10,
  },
  taskCTAEdit: {
    backgroundColor: "#0760FB",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  taskCTAText: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 17,
    color: "#fff",
  },
  taskCTATextDelete: {
    color: "#FB0707",
  },
});

export default ViewTask;
