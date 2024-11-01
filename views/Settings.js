import React, { useEffect, useState, useContext } from "react";
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
    sectionTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.grey,
      letterSpacing: -0.6,
    },
    sectionPageItem: {
      gap: 10,
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
      color: colors.blue950,
      letterSpacing: -0.6,
    },
    profilGroupContent: {
      backgroundColor: colors.blue200_2,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 5,
    },
    profilGroupTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.blue900_2,
      letterSpacing: -0.6,
    },
    profilEmail: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
      letterSpacing: -0.6,
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
      color: colors.blue900,
      letterSpacing: -0.6,
    },
    pageSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
      letterSpacing: -0.6,
    },
    pageIcon: {
      backgroundColor: colors.blue900,
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
      letterSpacing: -0.6,
    },
    footerSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 11,
      color: colors.grey,
      letterSpacing: -0.6,
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

  // const handlePressPrank = () => {
  //   Alert.alert(
  //     "Modifier la photo de profil",
  //     "Voulez-vous vraiment modifier votre photo de profil ?",
  //     [
  //       {
  //         text: "Annuler",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Modifier",
  //         onPress: () => {
  //           Alert.alert(
  //             "Aïe, aïe, aïe ! 😭",
  //             "La fonctionnalité arrive bientôt, pas de panique !",
  //             [{ text: "Compris !" }]
  //           );
  //         },
  //       },
  //     ]
  //   );
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionPageContainer}>
        <TouchableOpacity
          style={styles.sectionPageItem}
          onPress={() => navigation.navigate("Profile")}
        >
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
                stroke={colors.blue700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </View>
          </View>
        </TouchableOpacity>
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
                    stroke={colors.blue100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Couleurs</Text>
              </View>
              <ChevronRight
                stroke={colors.blue700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.sectionPageItem}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.pageContainer}>
            <TouchableOpacity style={styles.pageItem}>
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <Bell
                    stroke={colors.white}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Notifications</Text>
              </View>
              <ChevronRight
                stroke={colors.blue700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View> */}
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
                    stroke={colors.blue100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Liens externes</Text>
              </View>
              <ChevronRight
                stroke={colors.blue700}
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
                    stroke={colors.blue100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Journal des mises à jour</Text>
              </View>
              <ChevronRight
                stroke={colors.blue700}
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
                    stroke={colors.blue100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={styles.pageTitle}>Nous contacter</Text>
              </View>
              <ChevronRight
                stroke={colors.blue700}
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
                    stroke={colors.blue100}
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
                stroke={colors.blue700}
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

        {/* <View style={styles.topProfile}>
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
          </View>
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
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>Mes informations</Text>
            </View>
            <ChevronRight
              stroke={colors.blue950}
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
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>
                Modifier mon mot de passe
              </Text>
            </View>
            <ChevronRight
              stroke={colors.blue950}
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
                  stroke={colors.blue950}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
                />
                <Text style={styles.profileBtnText}>Transmettre mon rôle</Text>
              </View>
              <ChevronRight
                stroke={colors.blue950}
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
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>Paramètres</Text>
            </View>
            <ChevronRight
              stroke={colors.blue950}
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
                    stroke={colors.blue700}
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
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
              <Text style={styles.profileBtnText}>
                Journal des mises à jour
              </Text>
            </View>
            <ChevronRight
              stroke={colors.blue950}
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
                stroke={colors.blue950}
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
              stroke={colors.blue950}
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
      </View> */}
      </View>
    </ScrollView>
  );
}

export default Settings;
