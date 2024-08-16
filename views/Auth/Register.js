import React, { useContext, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import Input from "../../components/auth/input";
import ButtonAuth from "../../components/auth/buttonAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import register from "../../api/User/register";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const butOptions = [
  { label: "TC", value: "CL" },
  { label: "GMP", value: "GM" },
  { label: "QLIO", value: "QL" },
  { label: "GEII", value: "GI" },
];

const anneeOptions = [
  { label: "1e année", value: "Y1" },
  { label: "2e année", value: "Y2" },
  { label: "3e année", value: "Y3" },
];

const groupeTPOptions = [
  { label: "TP1", value: "TP1" },
  { label: "TP2", value: "TP2" },
  { label: "TP3", value: "TP3" },
  { label: "TP4", value: "TP4" },
];

const Register = () => {
  const { colors } = useContext(ThemeContext);
  const navigator = useNavigation();
  const [loading, setLoading] = useState(false);
  const [secondePage, setSecondePage] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    but: butOptions[0].value, // Valeur par défaut
    anneeBut: anneeOptions[0].value, // Valeur par défaut
    groupeTP: groupeTPOptions[0].value, // Valeur par défaut
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    // setSelectedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSecondePage = useCallback(() => {
    const { prenom, nom, email, password, confirmPassword } = formData;

    if (!prenom || !nom || !email || !password) {
      showMessage({
        message: "Veuillez remplir tous les champs",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: "Les mots de passe ne correspondent pas",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    // Vérification de la force du mot de passe
    if (password.length < 8) {
      showMessage({
        message: "Le mot de passe doit contenir au moins 8 caractères",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins une majuscule",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins une minuscule",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    if (!/[0-9]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins un chiffre",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins un caractère spécial",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    if (!email.includes("@etu.univ-poitiers.fr")) {
      showMessage({
        message: "Veuillez rentrer une adresse mail universitaire valide",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }
    setSecondePage(true);
  }, [formData]);

  const handleRegister = useCallback(async () => {
    try {
      setLoading(true);
      const groupe_id = `${formData.anneeBut}${formData.but}-${formData.groupeTP}`;

      const response = await register(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.prenom,
        formData.nom,
        groupe_id
      );

      if (response && response.status === 200) {
        showMessage({
          message: "Compte créé avec succès, un email vous a été envoyé",
          type: "success",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
          statusBarHeight: 15,
        });
        navigator.navigate("Login");
      } else {
        showMessage({
          message: "Erreur lors de la création du compte",
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
          statusBarHeight: 15,
        });
      }
    } catch (error) {
      showMessage({
        message:
          error?.message || "Une erreur est survenue. Veuillez réessayer.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      setSecondePage(false);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        background: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        },
        container: {
          width: "90%",
          paddingTop: 15,
          paddingBottom: 5,
          flex: 1,
          flexDirection: "column",
          gap: 30,
          justifyContent: "center",
        },
        topInput: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "47%",
          gap: 20,
        },
        inputContainer: {
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
        },
        titleItemInputContainer: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 15,
          color: colors.black,
        },
        inputScrollView: {
          paddingVertical: 15,
        },
        titleContent: {
          alignItems: "center",
          alignSelf: "center",
          width: "100%",
        },
        title: {
          fontFamily: "Ubuntu_700Bold",
          alignSelf: "flex-start",
          fontSize: 27,
          letterSpacing: -1,
          color: colors.black,
        },
        inputList: {
          backgroundColor: colors.white_background,
          paddingVertical: 11,
          paddingHorizontal: 30,
          borderRadius: 10,
          marginRight: 15,
        },
        inputListSelected: {
          backgroundColor: colors.blue100_variable,
          paddingVertical: 11,
          paddingHorizontal: 30,
          borderRadius: 10,
          marginRight: 15,
        },
        inputListTitle: {
          fontFamily: "Ubuntu_400Regular",
          fontSize: 15,
          color: colors.black,
        },
        inputListTitleSelected: {
          fontFamily: "Ubuntu_400Regular",
          fontSize: 15,
          color: colors.blue_variable,
        },
      }),
    [colors]
  );

  const renderOptions = (options, selectedValue, onSelect) =>
    options.map((option) => (
      <Pressable
        key={option.value}
        onPress={() => onSelect(option.value)}
        style={[
          styles.inputList,
          selectedValue === option.value && styles.inputListSelected,
        ]}
      >
        <Text
          style={[
            styles.inputListTitle,
            selectedValue === option.value && styles.inputListTitleSelected,
          ]}
        >
          {option.label}
        </Text>
      </Pressable>
    ));

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={40}
      keyboardOpeningTime={10}
      contentContainerStyle={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>Créer un compte</Text>
          </View>

          {secondePage ? (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.itemInputContainer}>
                  <Text style={styles.titleItemInputContainer}>BUT</Text>
                  <ScrollView
                    horizontal
                    bounces={false}
                    style={styles.inputScrollView}
                  >
                    {renderOptions(butOptions, formData.but, (value) =>
                      handleInputChange("but", value)
                    )}
                  </ScrollView>
                </View>
                <View style={styles.itemInputContainer}>
                  <Text style={styles.titleItemInputContainer}>
                    Année de BUT
                  </Text>
                  <ScrollView
                    horizontal
                    style={styles.inputScrollView}
                    bounces={false}
                  >
                    {renderOptions(anneeOptions, formData.anneeBut, (value) =>
                      handleInputChange("anneeBut", value)
                    )}
                  </ScrollView>
                </View>
                <View style={styles.itemInputContainer}>
                  <Text style={styles.titleItemInputContainer}>
                    Groupe de TP
                  </Text>
                  <ScrollView
                    horizontal
                    style={styles.inputScrollView}
                    bounces={false}
                  >
                    {renderOptions(
                      groupeTPOptions,
                      formData.groupeTP,
                      (value) => handleInputChange("groupeTP", value)
                    )}
                  </ScrollView>
                </View>
              </View>
              <View style={styles.buttonContent}>
                <ButtonAuth
                  title="Suivant"
                  onPress={handleRegister}
                  loading={loading}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.topInput}>
                  <Input
                    label="Prénom"
                    placeholder="Prénom"
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => handleInputChange("prenom", text)}
                    secureTextEntry={false}
                    autoComplete="given-name"
                    keyboardType="default"
                  />
                  <Input
                    label="Nom"
                    placeholder="Nom"
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => handleInputChange("nom", text)}
                    secureTextEntry={false}
                    autoComplete="family-name"
                    keyboardType="default"
                  />
                </View>
                <Input
                  label="Email universitaire"
                  placeholder="Entrer l'adresse mail universitaire"
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="email"
                  inputMode="email"
                  secureTextEntry={false}
                  keyboardType="email-address"
                  onChangeText={(text) => handleInputChange("email", text)}
                />
                <Input
                  label="Mot de passe"
                  placeholder="Entrer le mot de passe"
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="password"
                  secureTextEntry
                  onChangeText={(text) => handleInputChange("password", text)}
                />
                <Input
                  label="Confirmer mot de passe"
                  placeholder="Répéter le mot de passe"
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="password"
                  secureTextEntry
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                />
              </View>
              <View style={styles.buttonContent}>
                <ButtonAuth
                  title="Suivant"
                  onPress={handleSecondePage}
                  loading={loading}
                />
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(Register);
