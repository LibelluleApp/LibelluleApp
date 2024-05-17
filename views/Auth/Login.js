import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import ButtonAuth from "../../components/auth/buttonAuth";
import Input from "../../components/auth/input";
import { useAuth } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";

function Login({ navigation }) {
  const [edu_mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!edu_mail || !password) {
      showMessage({
        message: "Merci d'entrer votre adresse mail et votre mot de passe.",
        type: "danger",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(edu_mail, password);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.inner}>
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
              autoComplete="email"
              inputMode="email"
              secureTextEntry={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label="Mot de passe"
              placeholder="Votre mot de passe"
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
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
