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
import lostPassword from "../../api/User/lostPassword";
import { Envelope } from "./../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";

function LostPassword({ navigation }) {
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
      color: colors.blue950,
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
  const [loading, setLoading] = useState(false);

  const handleLostPassword = async () => {
    if (email_edu === "") {
      showMessage({
        message: "Veuillez renseigner votre adresse mail",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }

    if (!email_edu.includes("univ-poitiers.fr")) {
      showMessage({
        message: "Veuillez renseigner une adresse mail universitaire",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }

    try {
      navigation.navigate("Login");
      await lostPassword(email_edu);
      showMessage({
        message:
          "Un mail de réinitialisation de mot de passe vous a été envoyé",
        type: "success",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    } catch (error) {
      showMessage({
        message: "Une erreur est survenue",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
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
              <Text style={styles.title}>Mot de passe oublié</Text>
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
            </View>

            <View style={styles.buttonContent}>
              <ButtonAuth
                title="Réinitialiser le mot de passe"
                onPress={handleLostPassword}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

export default LostPassword;
