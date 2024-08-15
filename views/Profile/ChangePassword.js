import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import PasswordValidate from "react-native-password-validate-checklist";
import Input from "../../components/auth/input";
import { showMessage } from "react-native-flash-message";
import updatePassword from "../../api/User/updatePassword";
import { useNavigation } from "@react-navigation/native";
import { lostPasswordConnected } from "../../api/User/lostPassword";

const ChangePassword = () => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
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
      justifyContent: "space-between",
    },
    passwordContainer: {
      flexDirection: "column",
      gap: 20,
    },
    passwordContainerContent: {
      flexDirection: "column",
      gap: 20,
    },
    editBtnContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: "100%",
    },
    editBtn: {
      backgroundColor: colors.blue700,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      width: "100%",
    },
    editBtnText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 17,
      color: colors.white,
      letterSpacing: -0.5,
    },
    forgotPasswordText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.grey,
      padding: 15,
      paddingBottom: 30,
    },
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const navigation = useNavigation();

  const handleValidated = async () => {
    if (!validated) {
      showMessage({
        message: "Toutes les étapes ne sont pas validées",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    } else {
      try {
        const response = await updatePassword(
          currentPassword,
          newPassword,
          confirmPassword
        );
        showMessage({
          message: response,
          type: "success",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
          statusBarHeight: 15,
        });
        navigation.goBack();
      } catch (error) {
        showMessage({
          message: error.message,
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
          statusBarHeight: 15,
        });
      }
    }
  };

  const handleLostPassword = async () => {
    try {
      await lostPasswordConnected();
      showMessage({
        message:
          "Un mail de réinitialisation de mot de passe vous a été envoyé",
        type: "success",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: "Une erreur est survenue",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
    }
  };

  useEffect(() => {
    if (
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword &&
      passwordCorrect
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [newPassword, confirmPassword, passwordCorrect]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.passwordContainer}>
          <View style={styles.passwordContainerContent}>
            <Input
              label="Mot de passe actuel"
              placeholder="Votre mot de passe actuel"
              placeholderTextColor="#A3A3A3"
              autoComplete="password"
              secureTextEntry={true}
              onChangeText={setCurrentPassword}
            />
            <Input
              label="Nouveau mot de passe"
              placeholder="Votre nouveau mot de passe"
              placeholderTextColor="#A3A3A3"
              autoComplete="password"
              secureTextEntry={true}
              onChangeText={setNewPassword}
            />
            <Input
              label="Confirmer mot de passe"
              placeholder="Confirmer votre mot de passe"
              placeholderTextColor="#A3A3A3"
              autoComplete="password"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
          </View>
          <PasswordValidate
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            validationRules={[
              {
                key: "MIN_LENGTH",
                ruleValue: 9,
                label: "Votre mot de passe doit contenir au moins 9 caractères",
              },
              {
                key: "LOWERCASE_LETTER",
                label:
                  "Votre mot de passe doit contenir au moins une lettre minuscule",
              },
              {
                key: "UPPERCASE_LETTER",
                label:
                  "Votre mot de passe doit contenir au moins une lettre majuscule",
              },
              {
                key: "NUMERIC",
                label: "Votre mot de passe doit contenir au moins un chiffre",
              },
              {
                key: "SPECIAL_CHARS",
                label:
                  "Votre mot de passe doit contenir au moins un caractère spécial",
              },
              {
                key: "PASSWORDS_MATCH",
                label: "Les mots de passe doivent correspondre",
              },
            ]}
            onPasswordValidateChange={setPasswordCorrect}
            isImage={false}
            labelStyle={{
              Success: {
                fontFamily: "Ubuntu_400Regular",
                fontSize: 12,
                color: colors.green700,
              },
              Error: {
                fontFamily: "Ubuntu_400Regular",
                fontSize: 12,
                color: colors.black,
              },
            }}
          />
        </View>
        <View style={styles.editBtnContainer}>
          <TouchableOpacity style={styles.editBtn} onPress={handleValidated}>
            <Text style={styles.editBtnText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleLostPassword}
          >
            <Text style={styles.forgotPasswordText}>
              J'ai oublié mon mot de passe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
