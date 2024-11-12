import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import {
  Calendar,
  GraduationCap,
  LayoutList,
  Baseline,
  TextIcon,
} from "../../../assets/icons/Icons";
import * as Haptics from "expo-haptics";
import fetchTask from "../../../api/Agenda/fetchTask";
import deleteTask from "../../../api/Agenda/delete";
import { checkAgenda, uncheckAgenda } from "../../../api/Agenda/check";
import moment from "moment";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../../utils/themeContext";
import { getUserData } from "../../../utils/storage";
import TouchableScale from "react-native-touchable-scale";

const ViewTask = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      width: "90%",
      marginHorizontal: "auto",
    },
    containerItems: {
      flexGrow: 1,
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
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    taskInfoDesc: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
    },
    taskState: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
    },
    taskGood: {
      color: colors.regular700,
    },
    taskDisclaimer: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.red_variable,
      textAlign: "center",
    },
    taskCTA: {
      paddingBottom: Platform.OS === "ios" ? 75 : 25,
      alignSelf: "center",
      flexDirection: "column",
      width: "100%",
      marginHorizontal: "auto",
      justifyContent: "center",
      alignItems: "center",
    },
    taskCTADelete: { padding: 8, alignSelf: "center" },
    taskCTAEdit: {
      backgroundColor: colors.regular700,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    taskCTAText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.white,
    },
    taskCTATextDelete: {
      color: colors.red600_2,
      fontSize: 15,
    },
  });

  const navigation = useNavigation();
  const agenda_id = route.params.agenda_id;
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchTask(agenda_id);
      setUserData(getUserData());
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
  const handlePress = async () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate("editAgenda", { task });
    }, 300);
  };
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerItems}>
          <View style={styles.taskInfo}>
            <View style={styles.taskInfoContent}>
              <Calendar
                stroke={colors.regular900}
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
              <GraduationCap
                stroke={colors.regular900}
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
                stroke={colors.regular900}
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
            {task.type == "devoir" && (
              <View style={styles.taskInfoContent}>
                <Baseline
                  stroke={colors.regular900}
                  strokeWidth={1.75}
                  width={20}
                  height={20}
                />
                <View>
                  <Text style={styles.taskInfoTitle}>Titre</Text>
                  <Text style={styles.taskInfoDesc}>
                    {task.titre || "Titre indisponible"}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.taskInfoContent}>
              <TextIcon
                stroke={colors.regular900}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.taskInfoTitle}>Description</Text>
                <Text style={styles.taskInfoDesc}>
                  {task.contenu || "Contenu indisponible"}
                </Text>
              </View>
            </View>
          </View>

          {task.type == "devoir" && (
            <View style={styles.taskFooter}>
              <BouncyCheckbox
                fillColor={colors.regular700}
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
        {task.utilisateur_id == userData.utilisateur_id && (
          <View style={styles.taskCTA}>
            <TouchableScale
              friction={6}
              activeScale={0.97}
              onPress={handlePress}
              style={{ width: "100%" }}
            >
              <View style={styles.taskCTAEdit}>
                <Text style={styles.taskCTAText}>Modifier</Text>
              </View>
            </TouchableScale>
            <TouchableScale
              friction={6}
              activeScale={0.86}
              style={{ width: "100%" }}
              onPress={handleConfirmDelete}
            >
              <View style={styles.taskCTADelete}>
                <Text style={[styles.taskCTAText, styles.taskCTATextDelete]}>
                  Supprimer
                </Text>
              </View>
            </TouchableScale>
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewTask;
