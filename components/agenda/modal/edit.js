import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Calendar } from "./../../../assets/icons/Icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectComponent from "./select";
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

  const [error, setError] = useState(null);
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
    container: {
      width: "90%",
      alignSelf: "center",
      paddingTop: 20,
    },
    title: {
      fontSize: 15,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.blue950,
      marginBottom: 10,
    },
    input: {
      borderRadius: 10,
      paddingHorizontal: 20,
      height: 58,
      color: colors.blue950,
      marginBottom: 20,
      justifyContent: "center",
      backgroundColor: colors.white_background,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
    },
    date: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    description: {
      height: 135,
      paddingHorizontal: 20,
      padding: 15,
      textAlignVertical: "top",
      paddingVertical: 10,
    },
    textDate: {
      color: colors.blue950,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      textTransform: "capitalize",
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
    } else {
      if (!dates || !matiere || !type) {
        showMessage({
          message: "Veuillez remplir tous les champs obligatoires.",
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
        });
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const result = await saveEditAgenda(
        titre,
        description,
        dates.format("yyyy-MM-DD"),
        matiere,
        type,
        agenda_id // Include ID to update the existing agenda item
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
      setError(error.message);
      showMessage({
        message: error.message,
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDates(moment.tz(date, "Europe/Paris"));
    hideDatePicker();
  };

  const data = [{ label: "Anglais", value: "1" }];

  const data2 = [
    { label: "Tâche à faire", value: "devoir" },
    { label: "Évaluation", value: "eval" },
  ];

  const [value2, setValue2] = useState(type);

  return (
    <KeyboardAwareScrollView
      style={styles.background}
      extraScrollHeight={40}
      keyboardOpeningTime={10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>
              Date<Text style={{ color: colors.blue800 }}>*</Text>
            </Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={[styles.input, styles.date]}
            >
              <Text style={styles.textDate}>
                {dates.format("dddd DD MMMM")}
              </Text>
              <Calendar
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={16}
                height={16}
              />
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
          <View style={styles.inputContainer}>
            <Text style={styles.title}>
              Matière<Text style={{ color: colors.blue800 }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.text_placeholder}
              placeholder="Nom de la matière"
              value={matiere}
              onChangeText={(text) => setMatiere(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>
              Type de tâche<Text style={{ color: colors.blue800 }}>*</Text>
            </Text>
            <SelectComponent
              onChange={(item) => {
                setValue2(item.value);
                setType(item.value);
              }}
              data={data2}
              value={value2}
            />
          </View>
          {type !== "eval" && (
            <View style={styles.inputContainer}>
              <Text style={styles.title}>
                Titre<Text style={{ color: colors.blue800 }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.text_placeholder}
                placeholder="Entrer le nom de la tâche"
                value={titre}
                onChangeText={(text) => setTitre(text)}
              />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={[styles.input, styles.description]}
              placeholderTextColor={colors.text_placeholder}
              placeholder={
                type === "eval"
                  ? "Entrer une description de l'évaluation"
                  : "Entrer une description de la tâche"
              }
              multiline={true}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <ButtonAuth
            title="Sauvegarder"
            onPress={handleSaveTask}
            loading={loading}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Edit;
