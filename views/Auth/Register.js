import React, { useContext, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  TouchableOpacity,
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
  { label: "1er année", value: "Y1" },
  { label: "2eme année", value: "Y2" },
  { label: "3eme année", value: "Y3" },
];

const groupeTPOptions = [
  { label: "TP1", value: "TP1" },
  { label: "TP2", value: "TP2" },
  { label: "TP3", value: "TP3" },
  { label: "TP4", value: "TP4" },
  { label: "TP5", value: "TP5" }, // TP5 ajouté
  { label: "TP6", value: "TP6" }, // TP6 ajouté
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
    but: "",
    anneeBut: "",
    groupeTP: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSecondePage = useCallback(() => {
    const { prenom, nom, email, password, confirmPassword } = formData;

    if (!prenom || !nom || !email || !password) {
      showMessage({
        message: "Veuillez remplir tous les champs",
        type: "danger",
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: "Les mots de passe ne correspondent pas",
        type: "danger",
      });
      return;
    }
    if (password.length < 8) {
      showMessage({
        message: "Le mot de passe doit contenir au moins 8 caractères",
        type: "danger",
      });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins une majuscule",
        type: "danger",
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins une minuscule",
        type: "danger",
      });
      return;
    }
    if (!/[0-9]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins un chiffre",
        type: "danger",
      });
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showMessage({
        message: "Le mot de passe doit contenir au moins un caractère spécial",
        type: "danger",
      });
      return;
    }
    if (!email.includes("@etu.univ-poitiers.fr")) {
      showMessage({
        message: "Veuillez rentrer une adresse mail universitaire valide",
        type: "danger",
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
        });
        navigator.navigate("Login");
      } else {
        showMessage({
          message: "Erreur lors de la création du compte",
          type: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message:
          error?.message || "Une erreur est survenue. Veuillez réessayer.",
        type: "danger",
      });
      setSecondePage(false);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const filteredGroupeTPOptions = useMemo(() => {
    if (formData.but === "CL") {
      return groupeTPOptions;
    }
    return groupeTPOptions.slice(0, 4);
  }, [formData.but]);

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
        scrollList: {
          gap: 20,
        },
        inputList: {
          backgroundColor: colors.white_background,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 10,
          marginRight: 10,
        },
        inputListSelected: {
          backgroundColor: colors.blue_variable,
          borderColor: colors.grey,
          borderWidth: 1,
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
        <Text>{option.label}</Text>
      </Pressable>
    ));

  return (
    <View style={styles.background}>
      <KeyboardAwareScrollView
        extraScrollHeight={40}
        keyboardOpeningTime={10}
        contentContainerStyle={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <>
            <View style={styles.titleContent}>
              <Text style={styles.title}>Créer un compte</Text>
            </View>
            <View style={styles.inputContainer}>
              {secondePage ? (
                <>
                  <TouchableOpacity
                    style={styles.topInput}
                    onPress={() => setSecondePage(false)}
                  >
                    <Text>Retour</Text>
                  </TouchableOpacity>
                  <View>
                    <Text>BUT</Text>
                    <ScrollView
                      horizontal
                      style={styles.scrollList}
                      bounces={false}
                    >
                      {renderOptions(butOptions, formData.but, (value) =>
                        handleInputChange("but", value)
                      )}
                    </ScrollView>
                  </View>
                  <View>
                    <Text>Année de BUT</Text>
                    <ScrollView
                      horizontal
                      style={styles.scrollList}
                      bounces={false}
                    >
                      {renderOptions(anneeOptions, formData.anneeBut, (value) =>
                        handleInputChange("anneeBut", value)
                      )}
                    </ScrollView>
                  </View>
                  <View>
                    <Text>Groupe de TP</Text>
                    <ScrollView
                      horizontal
                      style={styles.scrollList}
                      bounces={false}
                    >
                      {renderOptions(
                        filteredGroupeTPOptions,
                        formData.groupeTP,
                        (value) => handleInputChange("groupeTP", value)
                      )}
                    </ScrollView>
                  </View>

                  <ButtonAuth
                    title="Suivant"
                    onPress={handleRegister}
                    loading={loading}
                  />
                </>
              ) : (
                <>
                  <View style={styles.topInput}>
                    <Input
                      label="Prénom"
                      placeholder="Prénom"
                      placeholderTextColor={colors.text_placeholder}
                      onChangeText={(text) => handleInputChange("prenom", text)}
                    />
                    <Input
                      label="Nom"
                      placeholder="Nom"
                      placeholderTextColor={colors.text_placeholder}
                      onChangeText={(text) => handleInputChange("nom", text)}
                    />
                  </View>
                  <Input
                    label="Email"
                    placeholder="Email"
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => handleInputChange("email", text)}
                  />
                  <Input
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    secureTextEntry
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => handleInputChange("password", text)}
                  />
                  <Input
                    label="Confirmation du mot de passe"
                    placeholder="Confirmation du mot de passe"
                    secureTextEntry
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) =>
                      handleInputChange("confirmPassword", text)
                    }
                  />

                  <ButtonAuth
                    title="Suivant"
                    onPress={handleSecondePage}
                    loading={loading}
                  />
                </>
              )}
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;
