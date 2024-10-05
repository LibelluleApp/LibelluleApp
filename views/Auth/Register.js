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
import {
  UserRound,
  Envelope,
  Lock,
  ArrowLeft,
} from "./../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";

// Options statiques pour le BUT et l'année
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

// Options pour le groupe TP
const groupeTPOptions = [
  { label: "TP1", value: "TP1" },
  { label: "TP2", value: "TP2" },
  { label: "TP3", value: "TP3" },
  { label: "TP4", value: "TP4" },
  { label: "TP5", value: "TP5" },
  { label: "TP6", value: "TP6" },
];

const groupeTPOptionsGMP = [
  { label: "TPS1 TPA1", value: "TPS1_TPA1" },
  { label: "TPS1 TPA2", value: "TPS1_TPA2" },
  { label: "TPS2 TPA2", value: "TPS2_TPA2" },
  { label: "TPS2 TPA3", value: "TPS2_TPA3" },
  { label: "TPS3 TPA4", value: "TPS3_TPA4" },
  { label: "TPS3 TPA5", value: "TPS3_TPA5" },
  { label: "TPS4 TPA5", value: "TPS4_TPA5" },
  { label: "TPS4 TPA6", value: "TPS4_TPA6" },
];
const groupeTPOptionsGMPY3 = [
  { label: "TPS1 TPA1", value: "TPS1_TPA1" },
  { label: "TPS2 TPA2", value: "TPS2_TPA2" },
  { label: "TPS3 TPA3", value: "TPS3_TPA3" },
  { label: "TPS3 TPA4", value: "TPS3_TPA4" },
];
const parcoursTCY2 = [
  { label: "BI.", value: "BI" },
  { label: "BDMRC.", value: "BDMRC" },
  { label: "SME.", value: "SME" },
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
    but: butOptions[0].value,
    anneeBut: anneeOptions[0].value,
    groupeTP: groupeTPOptions[0].value,
    parcours: null,
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Fonction pour filtrer dynamiquement les groupes TP en fonction du BUT sélectionné
  const filteredGroupeTPOptions = useMemo(() => {
    let options;

    switch (formData.but) {
      case "CL":
        options = [...groupeTPOptions];
        if (formData.anneeBut === "Y2") {
          options = options.slice(0, 4);
          options.push({ label: "TPA", value: "TPA" });
        } else if (formData.anneeBut === "Y3") {
          options = options.slice(0, 5);
        }
        break;

      case "QL":
        options = groupeTPOptions.slice(0, 2);
        break;

      case "GM":
        if (formData.anneeBut === "Y2") {
          options = groupeTPOptionsGMP.filter(
            (_, index) => index !== 5 && index !== groupeTPOptionsGMP.length - 1
          );
        } else if (formData.anneeBut === "Y3") {
          options = groupeTPOptionsGMPY3;
        } else {
          options = groupeTPOptionsGMP;
        }
        break;

      default:
        options = groupeTPOptions.slice(0, 4);
    }

    return options;
  }, [formData.but, formData.anneeBut]);

  // Fonction pour gérer le passage à la deuxième page du formulaire
  const handleSecondePage = useCallback(() => {
    const { prenom, nom, email, password, confirmPassword } = formData;

    if (!prenom || !nom || !email || !password) {
      showMessage({
        message: "Veuillez remplir tous les champs",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: "Les mots de passe ne correspondent pas",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      showMessage({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, et un caractère spécial",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }
    if (!email.includes("@etu.univ-poitiers.fr")) {
      showMessage({
        message: "Veuillez rentrer une adresse mail universitaire valide",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }
    setSecondePage(true);
  }, [formData]);

  // Fonction pour gérer l'inscription
  const handleRegister = useCallback(async () => {
    try {
      setLoading(true);
      let groupe_id = `${formData.anneeBut}${formData.but}-${formData.groupeTP}`;
      let parcours_id = null;

      if (formData.parcours) {
        groupe_id = `${formData.anneeBut}${formData.but}-${formData.groupeTP}.${formData.parcours}`;
      }

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
        });
        navigator.navigate("Login");
      } else {
        showMessage({
          message: "Erreur lors de la création du compte",
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
        });
      }
    } catch (error) {
      showMessage({
        message:
          error?.message || "Une erreur est survenue. Veuillez réessayer.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      setSecondePage(false);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleRetour = useCallback(() => {
    navigator.goBack();
  }, []);

  const handleFirstPage = useCallback(() => {
    setSecondePage(false);
  }, []);

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
          color: colors.blue950,
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
          color: colors.blue950,
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
          color: colors.blue950,
        },
        inputListTitleSelected: {
          fontFamily: "Ubuntu_400Regular",
          fontSize: 15,
          color: colors.blue700,
        },
        buttonContent: {
          paddingBottom: 75,
        },
        accountContainer: {
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          gap: 10,
        },
        accountText: {
          fontFamily: "Ubuntu_400Regular",
          fontSize: 14,
          color: colors.grey,
          marginTop: 5,
        },
        accountButton: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 14,
          color: colors.blue700,
        },
        backButton: {
          position: "absolute",
          top: 75,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: 10,
        },
        titleBackButton: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 16,
          color: colors.blue950,
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
          {secondePage && (
            <TouchableOpacity
              onPress={handleFirstPage}
              style={styles.backButton}
            >
              <ArrowLeft
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <Text style={styles.titleBackButton}>Retour</Text>
            </TouchableOpacity>
          )}
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
                      filteredGroupeTPOptions,
                      formData.groupeTP,
                      (value) => handleInputChange("groupeTP", value)
                    )}
                  </ScrollView>
                </View>
                {formData.but === "CL" &&
                  formData.anneeBut === "Y2" &&
                  formData.groupeTP !== "TPA" && (
                    <View style={styles.itemInputContainer}>
                      <Text style={styles.titleItemInputContainer}>
                        Parcours
                      </Text>
                      <ScrollView
                        horizontal
                        style={styles.inputScrollView}
                        bounces={false}
                      >
                        {renderOptions(
                          parcoursTCY2,
                          formData.parcours,
                          (value) => handleInputChange("parcours", value)
                        )}
                      </ScrollView>
                    </View>
                  )}
              </View>
              <View style={styles.buttonContent}>
                <ButtonAuth
                  title="Créer le compte"
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
                    icon={UserRound}
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => handleInputChange("prenom", text)}
                    secureTextEntry={false}
                    autoComplete="given-name"
                    keyboardType="default"
                    value={formData.prenom}
                  />
                  <Input
                    label="Nom"
                    placeholder="Nom"
                    icon={UserRound}
                    placeholderTextColor={colors.text_placeholder}
                    onChangeText={(text) => handleInputChange("nom", text)}
                    secureTextEntry={false}
                    autoComplete="family-name"
                    keyboardType="default"
                    value={formData.nom}
                  />
                </View>
                <Input
                  label="Email universitaire"
                  placeholder="Entrer l'adresse mail universitaire"
                  icon={Envelope}
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="email"
                  inputMode="email"
                  secureTextEntry={false}
                  keyboardType="email-address"
                  onChangeText={(text) => handleInputChange("email", text)}
                  autoCapitalize="none"
                  value={formData.email}
                />
                <Input
                  label="Mot de passe"
                  placeholder="Entrer le mot de passe"
                  icon={Lock}
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="password"
                  secureTextEntry
                  onChangeText={(text) => handleInputChange("password", text)}
                  value={formData.password}
                />
                <Input
                  label="Confirmer mot de passe"
                  placeholder="Répéter le mot de passe"
                  icon={Lock}
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="password"
                  secureTextEntry
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                  value={formData.confirmPassword}
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
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={handleRetour}>
              <Text style={styles.accountButton}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(Register);
