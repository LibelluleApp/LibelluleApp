import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Calendar,
  TextIcon,
  Baseline,
  GraduationCap,
} from "./../../../assets/icons/Icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonAuth from "../../auth/buttonAuth";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { ThemeContext } from "./../../../utils/themeContext";
import saveEditAgenda from "../../../api/Agenda/edit";

const Edit = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { task } = route.params;

  const [dates, setDates] = useState(moment.tz(task.date_fin, "Europe/Paris"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const [matiere, setMatiere] = useState(task.Ressource.nom_ressource);
  const [type, setType] = useState(task.type);
  const [titre, setTitre] = useState(task.titre);
  const [description, setDescription] = useState(task.contenu);
  const agenda_id = task.agenda_id;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollViewContainer: {
      width: "90%",
      alignSelf: "center",
      paddingTop: 20,
      paddingBottom: 100,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    buttonContent: {
      width: "48%",
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContentSelected: {
      backgroundColor: colors.blue200,
    },
    buttonContentUnselected: {
      backgroundColor: colors.background,
      borderColor: colors.blue200,
      borderWidth: 1,
    },
    buttonTitleSelected: {
      color: colors.blue900,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
    },
    buttonTitleUnselected: {
      color: colors.blue400,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginVertical: 10,
      gap: 15,
    },
    input: {
      flex: 1,
      borderRadius: 10,
      paddingHorizontal: 20,
      height: 58,
      color: colors.blue900,
      fontFamily: "Ubuntu_400Regular",
      backgroundColor: colors.white_background,
    },
    description: {
      height: 135,
      padding: 15,
      textAlignVertical: "top",
    },
    textDate: {
      color: colors.blue900,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      textTransform: "capitalize",
    },
    btnContainerBottom: {
      flexDirection: "column",
      gap: 10,
      position: "absolute",
      bottom: 40,
      width: "90%",
      alignSelf: "center",
    },
    btnContainerBottomText: {
      color: colors.grey,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      textAlign: "center",
      letterSpacing: -0.5,
    },
  });

  const handleSaveTask = async () => {
    if (type !== "eval") {
      if (!dates || !matiere || !type || !titre) {
        showMessage({
          message: "Veuillez remplir tous les champs obligatoires.",
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
        });
        return;
      }
    } else if (!dates || !matiere || !type) {
      showMessage({
        message: "Veuillez remplir tous les champs obligatoires.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }

    setLoading(true);
    try {
      const result = await saveEditAgenda(
        titre,
        description,
        dates.format("yyyy-MM-DD"),
        matiere,
        type,
        agenda_id
      );
      if (result.status === "success") {
        showMessage({
          message: "Tâche modifiée avec succès.",
          type: "success",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
        });
        navigation.goBack();
      }
    } catch (error) {
      showMessage({
        message: error.message,
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setDates(moment.tz(date, "Europe/Paris"));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        extraScrollHeight={40}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            {/* Boutons de sélection */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonContent,
                  type === "devoir"
                    ? styles.buttonContentSelected
                    : styles.buttonContentUnselected,
                ]}
                onPress={() => setType("devoir")}
              >
                <Text
                  style={
                    type === "devoir"
                      ? styles.buttonTitleSelected
                      : styles.buttonTitleUnselected
                  }
                >
                  Tâche
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonContent,
                  type === "eval"
                    ? styles.buttonContentSelected
                    : styles.buttonContentUnselected,
                ]}
                onPress={() => setType("eval")}
              >
                <Text
                  style={
                    type === "eval"
                      ? styles.buttonTitleSelected
                      : styles.buttonTitleUnselected
                  }
                >
                  Évaluation
                </Text>
              </TouchableOpacity>
            </View>

            {/* Champ pour le titre de la tâche */}
            {type !== "eval" && (
              <View style={styles.inputContainer}>
                <Baseline width={20} height={20} stroke={colors.blue900} />
                <TextInput
                  style={styles.input}
                  placeholder="Ajouter un titre"
                  placeholderTextColor={colors.text_placeholder}
                  onChangeText={(text) => setTitre(text)}
                  value={titre}
                />
              </View>
            )}

            {/* Date Picker */}
            <View style={styles.inputContainer}>
              <Calendar stroke={colors.blue900} width={20} height={20} />
              <TouchableOpacity
                onPress={showDatePicker}
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={styles.textDate}>
                  {dates.format("dddd DD MMMM")}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={moment.tz(dates, "Europe/Paris").toDate()}
                minimumDate={new Date()}
                locale="fr-FR"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>

            {/* Champ pour la matière */}
            <View style={styles.inputContainer}>
              <GraduationCap width={20} height={20} stroke={colors.blue900} />
              <TextInput
                style={styles.input}
                placeholder="Ajouter une matière"
                placeholderTextColor={colors.text_placeholder}
                onChangeText={(text) => setMatiere(text)}
                value={matiere}
              />
            </View>

            {/* Champ pour la description */}
            <View style={styles.inputContainer}>
              <TextIcon width={20} height={20} stroke={colors.blue900} />
              <TextInput
                style={[styles.input, styles.description]}
                placeholder="Ajouter une description"
                placeholderTextColor={colors.text_placeholder}
                onChangeText={(text) => setDescription(text)}
                value={description}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

      {/* Boutons de sauvegarde */}
      <View style={styles.btnContainerBottom}>
        <ButtonAuth
          title="Modifier"
          bgColor={colors.blue900}
          loading={loading}
          onPress={handleSaveTask}
        />
        <Text style={styles.btnContainerBottomText}>
          Cette modification sera visible pour tous les étudiants du TP.
        </Text>
      </View>
    </View>
  );
};

export default Edit;
