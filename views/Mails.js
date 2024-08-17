import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import fetchMailFromZimbra from "../api/Mail/fetchMail";
import Mail from "../components/mails/Mail";
import ButtonAuth from "../components/auth/buttonAuth";
import Input from "./../components/auth/input";
import { Envelope, Lock } from "./../assets/icons/Icons";
import { ThemeContext } from "./../utils/themeContext";

function Mails() {
  const { colors } = useContext(ThemeContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setIsAuthenticated(true);
        await fetchEmails();
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setIsAuthenticated(true);
        await fetchEmails();
      } else {
        Alert.alert(
          "Erreur de connexion",
          "Veuillez vérifier vos identifiants."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    setLoading(false);
  };

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const data = await fetchMailFromZimbra();
      if (data && data.m) {
        setEmails(data.m);
      } else {
        Alert.alert("Erreur", "Aucun e-mail trouvé.");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.background,
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
      gap: 5,
    },
    textContent: {
      width: "100%",
      alignSelf: "center",
      gap: 20,
    },
    title: {
      fontFamily: "Ubuntu_700Bold",
      alignSelf: "flex-start",
      fontSize: 27,
      letterSpacing: -1,
      color: colors.black,
    },
    titleDescription: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.grey,
      alignSelf: "flex-start",
    },
    buttonContent: {
      width: "100%",
      alignSelf: "center",
    },
    // ----
    // container: {
    //   flex: 1,
    //   backgroundColor: colors.background,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   paddingTop: 20,
    // },
    // input: {
    //   width: "80%",
    //   paddingHorizontal: 20,
    //   marginVertical: 10,
    //   height: 58,
    //   backgroundColor: colors.white_background,
    //   borderRadius: 10,
    //   borderWidth: 0.5,
    //   borderColor: colors.input_border,
    //   color: colors.black,
    //   fontFamily: "Ubuntu_400Regular",
    // },
    // button: {
    //   width: "80%",
    // },
    text: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      marginBottom: 20,
    },
    link: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      lineHeight: 20,
      textDecorationLine: "underline",
    },
    content: {
      width: "90%",
      alignSelf: "center",
      marginTop: 25,
    },
    emailItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.grey,
    },
    subject: {
      fontWeight: "bold",
    },
    from: {
      color: colors.grey,
    },
    date: {
      fontSize: 12,
      color: colors.grey,
    },
    body: {
      marginTop: 5,
    },
  });

  if (!isAuthenticated) {
    return (
      // <View style={styles.container}>
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Email Universitaire"
      //     placeholderTextColor={colors.grey}
      //     value={email}
      //     onChangeText={setEmail}
      //     autoCapitalize="none"
      //   />
      // <TextInput
      //   style={styles.input}
      //   placeholder="Mot de passe"
      //   placeholderTextColor={colors.grey}
      //   value={password}
      //   onChangeText={setPassword}
      //   secureTextEntry
      // />
      //   <View style={styles.button}>
      //     <ButtonAuth title="Se connecter" onPress={handleLogin} />
      //   </View>
      // </View>
      <View style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>Se connecter</Text>
            <Text style={styles.titleDescription}>
              Pour consulter les mails, il faut se connecter avec les
              identifiants de l’ENT.
            </Text>
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
            <Input
              label="Mot de passe"
              placeholder="Entrer le mot de passe de l'ENT"
              icon={Lock}
              placeholderTextColor={colors.text_placeholder}
              autoComplete="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.buttonContent}>
            <ButtonAuth title="Se connecter" onPress={handleLogin} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Cette page vous propose une prévisualisation de vos mails. Pour plus
          de fonctionnalités, connectez-vous à votre{" "}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://webmail.univ-poitiers.fr/");
            }}
          >
            <Text style={styles.link}>webmail.</Text>
          </TouchableOpacity>
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={emails}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Mail email={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

export default Mails;
