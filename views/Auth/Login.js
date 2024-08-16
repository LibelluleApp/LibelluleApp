import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import ButtonAuth from "../../components/auth/buttonAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../components/auth/input";
import { useAuth } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";
import { ThemeContext } from "./../../utils/themeContext";
import { Mail, Lock } from "./../../assets/icons/Icons";

function Login({ navigation }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    background: {
      position: "relative",
      justifyContent: "center",
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    containerContent: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 30,
      width: "90%",
      alignSelf: "center",
    },
    titleContent: {
      alignItems: "center",
      alignSelf: "center",
      width: "100%",
    },
    textContent: {
      width: "100%",
      alignSelf: "center",
      gap: 20,
    },
    passwordContent: {
      gap: 10,
    },
    title: {
      fontFamily: "Ubuntu_700Bold",
      alignSelf: "flex-start",
      fontSize: 27,
      letterSpacing: -1,
      color: colors.black,
    },
    forgotpass: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
      color: colors.grey,
      textDecorationLine: "underline",
      alignSelf: "flex-end",
    },
    buttonContent: {
      width: "100%",
      alignSelf: "center",
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
    },
    accountButton: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
      color: colors.blue700,
    },
  });

  const [email_edu, setEmail] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email_edu || !mot_de_passe) {
      showMessage({
        message: "Merci d'entrer votre adresse mail et votre mot de passe.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(email_edu, mot_de_passe);
      if (result.status === "error") {
        showMessage({
          message: result.message,
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
          statusBarHeight: 15,
        });
      } else {
        // Gérer la redirection après une connexion réussie
      }
    } catch (error) {
      showMessage({
        message:
          "Une erreur d'authentification s'est produite. Veuillez réessayer.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={40}
      keyboardOpeningTime={10}
      contentContainerStyle={styles.background} // Déplacer les styles ici
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.containerContent}>
            <View style={styles.titleContent}>
              <Text style={styles.title}>Se connecter</Text>
            </View>

            <View style={styles.textContent}>
              <Input
                label="Mail"
                placeholder="Entrer l'adresse mail universitaire"
                icon={Mail}
                placeholderTextColor={colors.text_placeholder}
                autoComplete="email"
                inputMode="email"
                secureTextEntry={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.passwordContent}>
                <Input
                  label="Mot de passe"
                  placeholder="Entrer le mot de passe"
                  icon={Lock}
                  placeholderTextColor={colors.text_placeholder}
                  autoComplete="password"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
                <Text
                  style={styles.forgotpass}
                  onPress={() => navigation.navigate("LostPassword")}
                >
                  J'ai oublié mon mot de passe
                </Text>
              </View>
            </View>

            <View style={styles.buttonContent}>
              <ButtonAuth
                title="Se connecter"
                onPress={handleLogin}
                loading={loading}
              />
            </View>
          </View>
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Pas encore de compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.accountButton}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

export default Login;
