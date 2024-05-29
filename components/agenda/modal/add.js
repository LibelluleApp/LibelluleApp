import React, { useEffect, useState } from "react";
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
import DropdownComponent from "./dropdown";
import SelectComponent from "./select";
import ButtonAuth from "../../auth/buttonAuth";
import saveAgenda from "../../../api/Agenda/save";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";

const Add = ({ route }) => {
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
    if (!dates || !matiere || !type || !titre) {
      showMessage({
        message: "Veuillez remplir tous les champs obligatoires.",
        type: "danger",
      });
      return;
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
        });
        navigation.navigate("Agenda");
      }
    } catch (error) {
      setError(error.message);
      showMessage({
        message: error.message,
        type: "danger",
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
      extraScrollHeight={40}
      keyboardOpeningTime={10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Date*</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={[styles.input, styles.date]}
            >
              <Text style={styles.textDate}>
                {dates.format("dddd DD MMMM")}
              </Text>
              <Calendar />
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
            <Text style={styles.title}>Matière*</Text>
            <DropdownComponent
              onChange={(item) => {
                setValue(item.value);
                setMatiere(item.value);
              }}
              data={data}
              value={value}
              save={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Type de tâche*</Text>
            <SelectComponent
              onChange={(item) => {
                setValue2(item.value);
                setType(item.value);
              }}
              data={data2}
              value={value2}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Titre*</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A3A3A3"
              placeholder="Titre de la tâche"
              onChangeText={(text) => setTitre(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={[styles.input, styles.description]}
              placeholderTextColor="#A3A3A3"
              placeholder="Description de la tâche"
              multiline={true}
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </View>

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

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
  container: {
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
    backgroundColor: "#F4F5F9",
  },
  title: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
    color: "#252525",
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderRadius: 10,
    borderColor: "#252525",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#252525",
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    height: 135,
    textAlignVertical: "top",
  },
  textDate: {
    color: "#252525",
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    textTransform: "capitalize",
  },
});

export default Add;
