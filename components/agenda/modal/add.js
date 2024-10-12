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
import saveAgenda from "../../../api/Agenda/save";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { ThemeContext } from "./../../../utils/themeContext";

const Add = ({ route }) => {
  const { colors } = useContext(ThemeContext);

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
      fontSize: 15,
      textTransform: "capitalize",
    },
  });

  const navigation = useNavigation();
  const { date } = route.params;

  const [dates, setDates] = useState(moment.tz(date, "Europe/Paris"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const [matiere, setMatiere] = useState(0);
  const [type, setType] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);

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
      const result = await saveAgenda(
        titre,
        description,
        dates.format("yyyy-MM-DD"),
        matiere,
        type
      );
      if (result.status === "success") {
        showMessage({
          message: "Tâche ajoutée avec succès.",
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

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  return (
    <KeyboardAwareScrollView
      style={styles.background}
      extraScrollHeight={40} // Ajuste l'espace pour éviter le recouvrement
      keyboardOpeningTime={10} // Temps d'animation du clavier
      // enableOnAndroid={true} // Activer sur Android
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
              value={moment.tz(dates, "Europe/Paris").toDate()}
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
                onChangeText={(text) => setTitre(text)}
              />
            </View>
          )}
          {type !== "eval" ? (
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Description</Text>
              <TextInput
                style={[styles.input, styles.description]}
                placeholderTextColor={colors.text_placeholder}
                placeholder="Entrer une description de la tâche (ex : consignes, lieu du rendu, mail de l’enseignant.e...)"
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Description</Text>
              <TextInput
                onFocus={(event) => {
                  scrollViewRef.current.scrollToFocusedInput(event.target);
                }}
                style={[styles.input, styles.description]}
                placeholderTextColor={colors.text_placeholder}
                placeholder="Entrer une description de l'évaluation (ex : durée, ce qu'il faut réviser...)"
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </View>
          )}

          <ButtonAuth
            title="Ajouter"
            onPress={handleSaveTask}
            loading={loading}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Add;
