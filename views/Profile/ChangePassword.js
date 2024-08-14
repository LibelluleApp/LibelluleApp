import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Pen } from "../../assets/icons/Icons";
import { ThemeContext } from "../../utils/themeContext";
import PasswordValidate from "react-native-password-validate-checklist";
import Input from "../../components/auth/input";

const ChangePassword = () => {
  const { colors } = useContext(ThemeContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      width: "90%",
      paddingBottom: 30,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    CTAEdit: {
      backgroundColor: validated ? colors.blue700 : colors.blue400,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      gap: 10,
      width: "60%",
    },
    CTAText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 17,
      color: colors.white,
    },
  });

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
        <View>
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
        <View>
          <TouchableOpacity style={styles.CTAEdit} disabled={!validated}>
            <Pen />
            <Text style={styles.CTAText}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
