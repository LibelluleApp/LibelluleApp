// Ajoutez ceci dans le composant Add juste après vos imports
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  Calendar,
  TextIcon,
  Baseline,
  GraduationCap,
} from "./../../../assets/icons/Icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonAuth from "../../auth/buttonAuth";
import saveAgenda from "../../../api/Agenda/save";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { ThemeContext } from "./../../../utils/themeContext";

// Composant Add avec animation corrigée
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
      color: colors.regular950,
      marginBottom: 10,
    },
    input: {
      borderRadius: 10,
      paddingHorizontal: 20,
      height: 58,
      color: colors.regular950,
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
      color: colors.regular950,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      textTransform: "capitalize",
    },
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
      zIndex: 5,
    },
    buttonContent: {
      width: "48%",
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 5,
    },
    buttonContentSelected: {
      backgroundColor: colors.regular200,
      zIndex: 5,
    },
    buttonContentUnselected: {
      backgroundColor: colors.background,
      borderColor: colors.regular200,
      borderWidth: 1,
      zIndex: 5,
    },
    buttonTitleSelected: {
      color: colors.regular900,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      zIndex: 5,
    },
    buttonTitleUnselected: {
      color: colors.regular400,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      zIndex: 5,
    },
    inputContainer: {
      marginTop: 20,
      gap: 15,
      zIndex: 4,
    },
    inputContent: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: 15,
      zIndex: 4,
    },
    input: {
      flex: 1,
      borderRadius: 10,
      paddingHorizontal: 20,
      height: 58,
      fontSize: 14,
      color: colors.regular900,
      fontFamily: "Ubuntu_400Regular",
      backgroundColor: colors.white_background,
      zIndex: 4,
    },
    description: {
      height: 135,
      padding: 15,
      textAlignVertical: "top",
    },
    textDate: {
      color: colors.regular900,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
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

  const navigation = useNavigation();
  const { date } = route.params;

  const [selectedButton, setSelectedButton] = useState("task");
  const [dates, setDates] = useState(moment.tz(date, "Europe/Paris"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matiere, setMatiere] = useState(0);
  const [type, setType] = useState("devoir");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const titleHeight = useSharedValue(type === "eval" ? 0 : 58);
  const marginValue = useSharedValue(20); // Valeur initiale du padding

  // Style d'animation de la hauteur et de l'opacité du champ titre
  const animatedTitleStyle = useAnimatedStyle(() => ({
    height: withTiming(titleHeight.value, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    }),
    opacity: withTiming(titleHeight.value > 0 ? 1 : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    }),
  }));

  // Style d'animation pour le padding
  const animatedInputContainerStyle = useAnimatedStyle(() => ({
    marginTop: withTiming(marginValue.value, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    }),
  }));

  // Met à jour le type et anime le champ titre
  const updateType = (newType) => {
    setType(newType);
    setSelectedButton(newType === "eval" ? "eval" : "task");
    titleHeight.value = newType === "eval" ? 0 : 58; // anime la hauteur

    // Mettez à jour le padding en fonction du type
    marginValue.value = newType === "eval" ? 5 : 20; // Padding à 0 si "eval"
  };

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
                  selectedButton === "task"
                    ? styles.buttonContentSelected
                    : styles.buttonContentUnselected,
                ]}
                onPress={() => updateType("devoir")}
              >
                <Text
                  style={
                    selectedButton === "task"
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
                  selectedButton === "eval"
                    ? styles.buttonContentSelected
                    : styles.buttonContentUnselected,
                ]}
                onPress={() => updateType("eval")}
              >
                <Text
                  style={
                    selectedButton === "eval"
                      ? styles.buttonTitleSelected
                      : styles.buttonTitleUnselected
                  }
                >
                  Évaluation
                </Text>
              </TouchableOpacity>
            </View>

            <Animated.View
              style={[styles.inputContainer, animatedInputContainerStyle]}
            >
              {/* Champ pour le titre de la tâche */}
              <Animated.View style={[styles.inputContent, animatedTitleStyle]}>
                <Baseline width={20} height={20} stroke={colors.regular900} />
                <TextInput
                  style={styles.input}
                  placeholder="Ajouter un titre"
                  placeholderTextColor={colors.text_placeholder}
                  onChangeText={(text) => setTitre(text)}
                  value={titre}
                  editable={type !== "eval"} // Rend le champ inactif si le type est "eval"
                  pointerEvents={type === "eval" ? "none" : "auto"} // Désactive les interactions tactiles
                />
              </Animated.View>

              {/* Date Picker */}
              <View style={styles.inputContent}>
                <Calendar stroke={colors.regular900} width={20} height={20} />
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
              <View style={styles.inputContent}>
                <GraduationCap
                  width={20}
                  height={20}
                  stroke={colors.regular900}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ajouter une matière"
                  placeholderTextColor={colors.text_placeholder}
                  onChangeText={(text) => setMatiere(text)}
                />
              </View>

              {/* Champ pour la description */}
              <View style={styles.inputContent}>
                <TextIcon width={20} height={20} stroke={colors.regular900} />
                <TextInput
                  style={[styles.input, styles.description]}
                  placeholder={
                    type === "eval"
                      ? "Description de l'évaluation (consignes, durée...)"
                      : "Description de la tâche (consignes, lieu du rendu...)"
                  }
                  placeholderTextColor={colors.text_placeholder}
                  multiline={true}
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

      {/* Bouton Ajouter en bas de la vue */}
      <View style={styles.btnContainerBottom}>
        <ButtonAuth
          title="Ajouter"
          bgColor={colors.regular900}
          onPress={handleSaveTask}
          loading={loading}
        />
        <Text style={styles.btnContainerBottomText}>
          Cette tâche s’affichera pour tous les étudiants du TP
        </Text>
      </View>
    </View>
  );
};

export default Add;
