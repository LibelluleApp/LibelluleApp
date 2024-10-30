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

  const [selectedButton, setSelectedButton] = useState("task");
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
      backgroundColor: colors.blue200,
      zIndex: 5,
    },
    buttonContentUnselected: {
      backgroundColor: colors.background,
      borderColor: colors.blue200,
      borderWidth: 1,
      zIndex: 5,
    },
    buttonTitleSelected: {
      color: colors.blue900,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      zIndex: 5,
    },
    buttonTitleUnselected: {
      color: colors.blue400,
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
      color: colors.blue900,
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
      color: colors.blue900,
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

  const titleHeight = useSharedValue(type === "eval" ? 0 : 58); // Hauteur initiale du champ titre
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

  // Mettez à jour le marginValue lors du changement de type
  const updateType = (newType) => {
    setType(newType);
    setSelectedButton(newType === "eval" ? "eval" : "task");
    titleHeight.value = newType === "eval" ? 0 : 58; // anime la hauteur

    // Mettez à jour le padding en fonction du type
    marginValue.value = newType === "eval" ? 5 : 20; // Padding à 0 si "eval"
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
                onPress={() => updateType("devoir")}
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
                onPress={() => updateType("eval")}
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

            <Animated.View
              style={[styles.inputContainer, animatedInputContainerStyle]}
            >
              {/* Champ pour le titre de la tâche */}
              <Animated.View style={[styles.inputContent, animatedTitleStyle]}>
                <Baseline width={20} height={20} stroke={colors.blue900} />
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
              <View style={styles.inputContent}>
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
              <View style={styles.inputContent}>
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
            </Animated.View>
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
