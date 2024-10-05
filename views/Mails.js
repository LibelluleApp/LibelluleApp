import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
  RefreshControl,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import fetchMailFromZimbra from "../api/Mail/fetchMail";
import Mail from "../components/mails/Mail";
import ButtonAuth from "../components/auth/buttonAuth";
import Input from "./../components/auth/input";
import { Envelope, Lock } from "./../assets/icons/Icons";
import { ThemeContext } from "./../utils/themeContext";
import connectZimbra from "../api/Mail/connect";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { set } from "date-fns";
// import * as Device from "expo-device";

function Mails() {
  const { colors } = useContext(ThemeContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState("");
  // const [rooted, setRooted] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setIsAuthenticated(true);
        await fetchEmails();
      }
    };
    // const checkIfIsRooted = async () => {
    //   const isRooted = await Device.isRootedExperimentalAsync();
    //   setRooted(isRooted);
    // };
    // checkIfIsRooted();

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
        const response = await connectZimbra(email, password);
        if (response) {
          setIsAuthenticated(true);
          await fetchEmails();
        } else {
          Alert.alert(
            "Erreur de connexion",
            "Veuillez vérifier vos identifiants."
          );
        }
        // Alert.alert(
        //   "Erreur de connexion",
        //   "Veuillez vérifier vos identifiants."
        // );
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
        setMessages("");
      } else {
        setEmails([]);
        setMessages("Aucun mail à afficher.");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
    setLoading(false);
  };

  const handleOpenLink = () => {
    if (Platform.OS === "android") {
      Linking.openURL(
        "https://developer.android.com/privacy-and-security/keystore?hl=fr"
      );
    } else {
      Linking.openURL(
        "https://developer.apple.com/documentation/security/keychain-services"
      );
    }
  };

  const styles = StyleSheet.create({
    background: {
      position: "relative",
      justifyContent: "center",
      flex: 1,
      backgroundColor: colors.background,
    },
    containerLogin: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    containerContentLogin: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 30,
      width: "90%",
      alignSelf: "center",
    },
    titleContentLogin: {
      alignItems: "center",
      alignSelf: "center",
      width: "100%",
      gap: 5,
    },
    textLogin: {
      width: "100%",
      alignSelf: "center",
      gap: 20,
    },
    titleLogin: {
      fontFamily: "Ubuntu_700Bold",
      alignSelf: "flex-start",
      fontSize: 27,
      letterSpacing: -1,
      color: colors.blue950,
    },
    titleDescriptionLogin: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.grey,
      alignSelf: "flex-start",
    },
    titleWarningLogin: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      alignSelf: "flex-start",
    },
    buttonLogin: {
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
    //   color: colors.blue950,
    //   fontFamily: "Ubuntu_400Regular",
    // },
    // button: {
    //   width: "80%",
    // },
    containerMails: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentMails: {
      width: "90%",
      alignSelf: "center",
      paddingTop: 20,
      gap: 15,
    },
    descriptionMails: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    textDescriptionMails: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
      color: colors.grey,
    },
    linkDescriptionMails: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
      color: colors.grey,
      textDecorationLine: "underline",
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
    listMails: {
      paddingBottom: 65,
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
      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        // extraScrollHeight={40}
        keyboardOpeningTime={10}
        contentContainerStyle={styles.background} // Déplacer les styles ici
      >
        <View style={styles.containerLogin}>
          <View style={styles.containerContentLogin}>
            <View style={styles.titleContentLogin}>
              <Text style={styles.titleLogin}>Se connecter</Text>
              <Text style={styles.titleDescriptionLogin}>
                Pour consulter les mails, il faut se connecter avec les
                identifiants de l’ENT.
              </Text>
            </View>

            <View style={styles.textLogin}>
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

            <View style={styles.buttonLogin}>
              <ButtonAuth title="Se connecter" onPress={handleLogin} />
            </View>
            <View style={styles.titleContentLogin}>
              <Text style={styles.titleWarningLogin}>
                En vous connectant, vous autorisez la sauvegarde de vos
                identifiants encrypté sur votre appareil. {"\n"}
                {"\n"}Pour en savoir plus sur la sécurité des vos identifiants,
                nous vous invitons à relire les CGU (Article 2.1).
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <View style={styles.containerMails}>
      <View style={styles.contentMails}>
        <View style={styles.descriptionMails}>
          <Text style={styles.textDescriptionMails}>
            Accès à toutes les fonctionnalités sur{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://webmail.univ-poitiers.fr/");
            }}
          >
            <Text style={styles.linkDescriptionMails}>Zimbra</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listMails}>
          <Text>{messages}</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <FlatList
              data={emails}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Mail email={item} />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchEmails} />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default Mails;
