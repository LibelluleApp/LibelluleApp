import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
  Button,
  Linking,
  Alert,
  Platform,
} from "react-native";
import {
  ImageUp,
  ChevronRight,
  IdCard,
  Lock,
  UserRoundPen,
  InstaIcon,
  NotepadText,
  Landmark,
  UserX,
  Envelope,
  LogOut,
  Settings,
} from "../assets/icons/Icons";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "./../utils/themeContext";

const isExpoGo = Constants.appOwnership === "expo";

let messaging;
if (!isExpoGo) {
  (async () => {
    messaging = (await import("@react-native-firebase/messaging")).default;
  })();
} else {
  console.log(
    "Expo Go détecté, `@react-native-firebase/messaging` ne sera pas importé."
  );
}
async function getProfileData() {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem("user_data"));
    return userData;
  } catch (e) {
    console.error(e);
  }
}
async function getAlternant() {
  try {
    const isAlternant = await AsyncStorage.getItem("isAlternant");
    return isAlternant;
  } catch (e) {
    console.error(e);
  }
}

function Profile() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    logout: {
      position: "absolute",
      padding: 20,
      top: 0,
      right: 0,
      zIndex: 99,
    },
    topProfile: {
      alignItems: "center",
      padding: 20,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 50,
    },
    changePicture: {
      position: "relative",
    },
    ChangePP: {
      position: "absolute",
      bottom: -2,
      right: -2,
      backgroundColor: colors.blue_variable,
      borderRadius: 50,
      padding: 5,
    },
    profileContainer: {
      marginTop: 15,
      alignItems: "center",
    },
    profileName: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 17,
      color: colors.black,
    },
    profileEmail: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.grey,
    },
    containerCTA: {
      width: "90%",
      marginHorizontal: "auto",
    },
    profileCTA: {
      marginVertical: 15,
      alignItems: "center",
      gap: 12,
    },
    profileButton: {
      backgroundColor: colors.white_background,
      paddingVertical: 17,
      paddingHorizontal: 20,
      borderRadius: 10,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profileBtnText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
    profileBtnUnderText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
    },
    CTAContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    profileSwitcher: {
      paddingHorizontal: 20,
      width: "100%",
      marginVertical: 12,
    },
    switcherToggle: {
      flexDirection: "column",
      gap: Platform.OS === "ios" ? 10 : 0,
    },
    switcherContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerMediaLinks: {
      flexDirection: "column",
      gap: 20,
    },
    mediaLinks: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    profileBtnSwitch: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 16,
      color: colors.black,
    },
    separatorStick: {
      marginVertical: 20,
      height: 1,
      width: "90%",
      backgroundColor: colors.grey,
    },
    profileMediaInsta: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: "#FE068D",
    },
    profileMediaMail: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 16,
      color: colors.blue_variable,
      paddingBottom: 5,
    },
    disabled: {
      opacity: 0.4,
    },
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const [isAlternant, setIsAlternant] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getProfileData().then((data) => {
      setUserData(data);

      setIsLoading(false);
    });
    getAlternant().then((data) => {
      setIsAlternant(data === "true");
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getProfileData().then((data) => {
        setUserData(data);
      });
      getAlternant().then((data) => {
        setIsAlternant(data === "true");
      });
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const handleConfirmLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se déconnecter",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  const handlePressPrank = () => {
    Alert.alert(
      "Modifier la photo de profil",
      "Voulez-vous vraiment modifier votre photo de profil ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Modifier",
          onPress: () => {
            Alert.alert(
              "Aïe, aïe, aïe ! 😭",
              "La fonctionnalité arrive bientôt, pas de panique !",
              [{ text: "Compris !" }]
            );
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topProfile}>
        <TouchableOpacity
          style={styles.changePicture}
          onPress={handlePressPrank}
        >
          <Image
            source={{ uri: userData.lien_photo_profil }}
            style={styles.image}
          />
          {/* <View style={styles.ChangePP}>
            <ImageUp
              stroke={colors.white}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </View> */}
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>
            {userData.prenom} {userData.nom}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://webmail.univ-poitiers.fr/");
            }}
          >
            <Text style={styles.profileEmail}>{userData.email_edu}</Text>
          </TouchableOpacity>
          <Text style={styles.profileEmail}>
            Mon groupe : {userData.groupe_id}
          </Text>
          {isAlternant === true && (
            <Text style={styles.profileEmail}>Alternant</Text>
          )}
        </View>
      </View>
      <View style={styles.containerCTA}>
        <View style={styles.profileCTA}>
          <TouchableOpacity
            style={[styles.profileButton, styles.disabled]}
            disabled={true}
          >
            <View style={styles.CTAContent}>
              <IdCard
                stroke={colors.black}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>Mes informations</Text>
            </View>
            <ChevronRight
              stroke={colors.black}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <View style={styles.CTAContent}>
              <Lock
                stroke={colors.black}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>
                Modifier mon mot de passe
              </Text>
            </View>
            <ChevronRight
              stroke={colors.black}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          {userData.role === "Chef" && (
            <TouchableOpacity
              style={[styles.profileButton]}
              onPress={() => navigation.navigate("TransferRole")}
            >
              <View style={styles.CTAContent}>
                <UserRoundPen
                  stroke={colors.black}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
                />
                <Text style={styles.profileBtnText}>Transmettre mon rôle</Text>
              </View>
              <ChevronRight
                stroke={colors.black}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.profileButton]}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={styles.CTAContent}>
              <Settings
                stroke={colors.black}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>Paramètres</Text>
            </View>
            <ChevronRight
              stroke={colors.black}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          <View style={styles.profileSwitcher}>
            <View style={styles.separatorStick}></View>
            <View style={styles.containerMediaLinks}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.instagram.com/libelluleapp");
                }}
              >
                <View style={styles.mediaLinks}>
                  <InstaIcon
                    stroke="#FE068D"
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                  <Text style={styles.profileMediaInsta}>@libellule</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("mailto:support@libellule.app");
                }}
              >
                <View style={styles.mediaLinks}>
                  <Envelope
                    stroke={colors.blue_variable}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                  <Text style={styles.profileMediaMail}>
                    support@libellule.app
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              Linking.openURL("https://libellule.app/patchnotes");
            }}
          >
            <View style={styles.CTAContent}>
              <NotepadText
                stroke={colors.black}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>
                Journal des mises à jour
              </Text>
            </View>
            <ChevronRight
              stroke={colors.black}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              Linking.openURL("https://libellule.app/cgu");
            }}
          >
            <View style={styles.CTAContent}>
              <Landmark
                stroke={colors.black}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <View>
                <Text style={styles.profileBtnText}>CGU</Text>
                <Text style={styles.profileBtnUnderText}>
                  Conditions générales d'utilisation
                </Text>
              </View>
            </View>
            <ChevronRight
              stroke={colors.black}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          <View style={styles.separatorStick}></View>

          <TouchableOpacity
            style={[
              styles.profileButton,
              {
                backgroundColor: colors.red_background_variable,
              },
            ]}
            onPress={() => handleConfirmLogout()}
          >
            <View style={styles.CTAContent}>
              <LogOut
                stroke={colors.red700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <View>
                <Text style={[styles.profileBtnText, { color: colors.red700 }]}>
                  Se déconnecter
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: colors.red700 }]}
            onPress={() => {
              navigation.navigate("DeleteAccount");
            }}
          >
            <View style={styles.CTAContent}>
              <UserX
                stroke={colors.white}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <View>
                <Text style={[styles.profileBtnText, { color: colors.white }]}>
                  Supprimer mon compte
                </Text>
              </View>
            </View>
            <ChevronRight
              stroke={colors.white}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
