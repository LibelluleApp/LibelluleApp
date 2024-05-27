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
import moment from "moment";

const Add = ({ route }) => {
  const { date } = route.params;
  const [dates, setDates] = useState(moment(date));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDates(moment(date));
    hideDatePicker();
  };

  const handleSaveTask = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
              date={new Date(dates)}
              minimumDate={new Date()}
              locale="fr-FR"
              value={new Date(dates)}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Matière*</Text>
            <DropdownComponent />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Type de tâche*</Text>
            <SelectComponent />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Titre*</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A3A3A3"
              placeholder="Titre de la tâche"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={[styles.input, styles.description]}
              placeholderTextColor="#A3A3A3"
              placeholder="Description de la tâche"
              multiline={true}
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
