import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import ButtonAuth from "../../components/auth/buttonAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../components/auth/input";
import { useSession } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";
import { ThemeContext } from "./../../utils/themeContext";
import { Envelope, Lock } from "./../../assets/icons/Icons";

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
      color: colors.regular950,
    },
    forgotpass: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
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
      letterSpacing: -0.4,
      fontSize: 14,
      color: colors.grey,
    },
    accountButton: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
      color: colors.regular700,
    },
  });

  const [email_edu, setEmail] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();

  const handleLogin = async () => {
    if (!email_edu || !mot_de_passe) {
      showMessage({
        message: "Merci d'entrer votre adresse mail et votre mot de passe.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }
    setLoading(true);
    try {
      await signIn(email_edu, mot_de_passe);
    } catch (error) {
      showMessage({
        message:
          "Une erreur d'authentification s'est produite. Veuillez réessayer.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
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
                icon={Envelope}
                placeholderTextColor={colors.text_placeholder}
                autoComplete="email"
                inputMode="email"
                secureTextEntry={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
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
