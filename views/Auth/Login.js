import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import ButtonAuth from "../../components/auth/buttonAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../components/auth/input";
import { useAuth } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";

function Login({ navigation }) {
  const [email_edu, setEmail] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email_edu || !mot_de_passe) {
      showMessage({
        message: "Merci d'entrer votre adresse mail et votre mot de passe.",
        type: "danger",
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
        });
      } else {
        // Gérer la redirection après une connexion réussie
      }
    } catch (error) {
      showMessage({
        message: "An error occurred during login. Please try again.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={40}
      keyboardOpeningTime={10}
      contentContainerStyle={styles.inner} // Déplacer les styles ici
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <View style={styles.info}>
            <Text style={styles.title}>Connectez-vous</Text>
            <Text style={styles.underTitle}>
              Vous avez reçu vos identifiants sur votre adresse mail
              universitaire
            </Text>
          </View>

          <View style={styles.contentText}>
            <Input
              label="Mail"
              placeholder="Adresse mail"
              placeholderTextColor="#A3A3A3"
              autoComplete="email"
              inputMode="email"
              secureTextEntry={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label="Mot de passe"
              placeholder="Votre mot de passe"
              placeholderTextColor="#A3A3A3"
              autoComplete="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.forgotpass}>J'ai oublié mon mot de passe</Text>
          </View>

          <ButtonAuth
            title="Se connecter"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  inner: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F4F5F9",
  },
  info: {
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
  contentText: {
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontFamily: "Ubuntu_500Medium",
    alignSelf: "flex-start",
    fontSize: 22,
    color: "#252525",
    marginTop: 10,
  },
  underTitle: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#7A797C",
    marginTop: 3,
    alignSelf: "flex-start",
  },
  forgotpass: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default Login;
