import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonAuth from "../../auth/buttonAuth";
import saveAgenda from "../../../api/Agenda/save";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { ThemeContext } from "./../../../utils/themeContext";
import TouchableScale from "react-native-touchable-scale";

const Add = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { date } = route.params;
  const scrollViewRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const [selectedButton, setSelectedButton] = useState("task");
  const [dates, setDates] = useState(moment.tz(date, "Europe/Paris"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const [matiere, setMatiere] = useState("");
  const [type, setType] = useState("devoir");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);

  const handleDescriptionFocus = () => {
    setTimeout(() => {
      descriptionInputRef.current?.measureInWindow((x, y, width, height) => {
        scrollViewRef.current?.scrollTo({
          y: y - 100,
          animated: true,
        });
      });
    }, 100);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
      width: "90%",
      alignSelf: "center",
      paddingTop: 20,
      paddingBottom: Platform.OS === "android" ? 80 : 20,
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
      padding: 20,
      paddingBottom: Platform.OS === "ios" ? 40 : 25,
      backgroundColor: colors.background,
      width: "100%",
    },
    btnContainerBottomText: {
      color: colors.grey,
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      textAlign: "center",
      letterSpacing: -0.5,
      marginTop: 10,
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
        navigation.navigate("Agenda");
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

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setDates(moment.tz(date, "Europe/Paris"));
    hideDatePicker();
  };

  const titleHeight = useSharedValue(type === "eval" ? 0 : 58);
  const marginValue = useSharedValue(20);

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

  const animatedInputContainerStyle = useAnimatedStyle(() => ({
    marginTop: withTiming(marginValue.value, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    }),
  }));

  const updateType = (newType) => {
    setType(newType);
    setSelectedButton(newType === "eval" ? "eval" : "task");
    titleHeight.value = newType === "eval" ? 0 : 58;
    marginValue.value = newType === "eval" ? 5 : 20;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContainer}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.buttonContainer}>
                <TouchableScale
                  style={[
                    styles.buttonContent,
                    type === "devoir"
                      ? styles.buttonContentSelected
                      : styles.buttonContentUnselected,
                  ]}
                  friction={6}
                  activeScale={0.95}
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
                </TouchableScale>
                <TouchableScale
                  style={[
                    styles.buttonContent,
                    type === "eval"
                      ? styles.buttonContentSelected
                      : styles.buttonContentUnselected,
                  ]}
                  friction={6}
                  activeScale={0.95}
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
                </TouchableScale>
              </View>

              <Animated.View
                style={[styles.inputContainer, animatedInputContainerStyle]}
              >
                <Animated.View
                  style={[styles.inputContent, animatedTitleStyle]}
                >
                  <Baseline width={20} height={20} stroke={colors.regular900} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ajouter un titre"
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => setTitre(text)}
                    value={titre}
                    editable={type !== "eval"}
                    pointerEvents={type === "eval" ? "none" : "auto"}
                  />
                </Animated.View>

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
                    value={matiere}
                  />
                </View>

                <View style={styles.inputContent}>
                  <TextIcon width={20} height={20} stroke={colors.regular900} />
                  <TextInput
                    ref={descriptionInputRef}
                    style={[styles.input, styles.description]}
                    placeholder={
                      type === "eval"
                        ? "Description de l'évaluation (consignes, durée...)"
                        : "Description de la tâche (consignes, lieu du rendu...)"
                    }
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    multiline={true}
                    numberOfLines={4}
                    onFocus={handleDescriptionFocus}
                  />
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {Platform.OS === "android" ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.btnContainerBottom}>
              <ButtonAuth
                title="Ajouter"
                bgColor={colors.regular900}
                loading={loading}
                onPress={handleSaveTask}
              />
              <Text style={styles.btnContainerBottomText}>
                Cette tâche s'affichera pour tous les étudiants du TP
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.btnContainerBottom}>
            <ButtonAuth
              title="Ajouter"
              bgColor={colors.regular900}
              loading={loading}
              onPress={handleSaveTask}
            />
            <Text style={styles.btnContainerBottomText}>
              Cette tâche s'affichera pour tous les étudiants du TP
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Add;
