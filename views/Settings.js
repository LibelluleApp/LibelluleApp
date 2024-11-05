import React, { useEffect, useState, useContext, forwardRef } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from "react-native";
import {
  ChevronRight,
  NotepadText,
  Landmark,
  LogOut,
  Palette,
  Bell,
  Link,
  Envelope,
} from "../assets/icons/Icons";
import Constants from "expo-constants";

import { useSession } from "../context/AuthContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../utils/themeContext";
import { getAlternant, getUserData } from "../utils/storage";
import TouchableScale from "react-native-touchable-scale";

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
    const userData = getUserData();
    return userData;
  } catch (e) {
    console.error(e);
  }
}
async function getIsAlternant() {
  try {
    const isAlternant = getAlternant();
    return isAlternant;
  } catch (e) {
    console.error(e);
  }
}

function Settings() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionPageContainer: {
      marginTop: 15,
      width: "90%",
      marginHorizontal: "auto",
      gap: 20,
    },
    sectionPageItem: {
      gap: 10,
    },
    sectionTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.grey,
    },
    pageSeparation: {
      height: 0.5,
      width: "85%",
      backgroundColor: colors.grey,
      alignSelf: "flex-end",
    },
    pageContainer: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
    },
    pageItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
    },
    profilPicture: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    pageProfilContainer: {
      flexDirection: "row",
      gap: 15,
    },
    pageProfilContent: {
      flexDirection: "column",
      gap: 3,
    },
    pageProfilTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    profilName: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    profilGroupContent: {
      backgroundColor: colors.regular200_2,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 5,
    },
    profilGroupTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular900_2,
    },
    profilEmail: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    pageContent: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    pageTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
    },
    pageSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    pageIcon: {
      backgroundColor: colors.regular900,
      borderRadius: 8,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    footerContainer: {
      width: "90%",
      marginHorizontal: "auto",
      alignItems: "center",
    },
    footerTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    footerSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 11,
      color: colors.grey,
    },
  });

  const [isAlternant, setIsAlternant] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { signOut } = useSession();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getProfileData().then((data) => {
      setUserData(data);

      setIsLoading(false);
    });
    getIsAlternant().then((data) => {
      setIsAlternant(data === "true");
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getProfileData().then((data) => {
        setUserData(data);
      });
      getIsAlternant().then((data) => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionPageContainer}>
        <TouchableScale
          friction={6}
          activeScale={0.94}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.sectionPageItem}>
            <View style={styles.pageContainer}>
              <View style={styles.pageItem}>
                <View style={styles.pageProfilContainer}>
                  <Image
                    source={{ uri: userData.lien_photo_profil }}
                    style={styles.profilPicture}
                  />
                  <View style={styles.pageProfilContent}>
                    <View style={styles.pageProfilTitle}>
                      <Text style={styles.profilName}>
                        {userData.prenom} {userData.nom}
                      </Text>
                      <View style={styles.profilGroupContent}>
                        <Text style={styles.profilGroupTitle}>
                          {userData.groupe_id}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.profilEmail}>{userData.email_edu}</Text>
                  </View>
                </View>
                <ChevronRight
                  stroke={colors.regular700}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
                />
              </View>
            </View>
          </View>
        </TouchableScale>
        <View style={styles.sectionPageItem}>
          <Text style={styles.sectionTitle}>Personnalisation</Text>
          <View style={styles.pageContainer}>
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => navigation.navigate("Colors")}
            >
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <Palette
                    stroke={colors.regular100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Couleurs</Text>
              </View>
              <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionPageItem}>
          <Text style={styles.sectionTitle}>Autre</Text>
          <View style={styles.pageContainer}>
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => navigation.navigate("liensExterne")}
            >
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <Link
                    stroke={colors.regular100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Liens externes</Text>
              </View>
              <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
            <View style={styles.pageSeparation} />
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => {
                Linking.openURL("https://libellule.app/patchnotes");
              }}
            >
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <NotepadText
                    stroke={colors.regular100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Journal des mises à jour</Text>
              </View>
              <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
            <View style={styles.pageSeparation} />

            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => {
                Linking.openURL("https://libellule.app/contact");
              }}
            >
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <Envelope
                    stroke={colors.regular100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Nous contacter</Text>
              </View>
              <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
            <View style={styles.pageSeparation} />
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => {
                Linking.openURL("https://libellule.app/cgu");
              }}
            >
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <Landmark
                    stroke={colors.regular100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <View>
                  <Text style={styles.pageTitle}>CGU</Text>
                  <Text style={styles.pageSubtitle}>
                    Conditions générales d'utilisation
                  </Text>
                </View>
              </View>
              <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionPageItem}>
          <View style={styles.pageContainer}>
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => handleConfirmLogout()}
            >
              <View style={styles.pageContent}>
                <View
                  style={[styles.pageIcon, { backgroundColor: colors.red800 }]}
                >
                  <LogOut
                    stroke={colors.red100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={[styles.pageTitle, { color: colors.red800 }]}>
                  Se déconnecter
                </Text>
              </View>
              <ChevronRight
                stroke={colors.red700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerTitle}>Version 1.0.0</Text>
          <Text style={styles.footerSubtitle}>
            Créée avec ❤️ par Raphaël Tiphonet et Arnaud Graciet
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Settings;
