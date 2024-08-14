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
  ChangePP,
  LeftArrow,
  ProfileCard,
  Locker,
  ForwardRole,
  InstaIcon,
  MailProfile,
  Changelog,
  CGU,
  ColorPal,
  Exit,
} from "../assets/icons/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../utils/themeContext";
// import messaging from '@react-native-firebase/messaging';

async function getProfileData() {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem("user_data"));
    return userData;
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
    },
    topProfile: {
      alignItems: "center",
      padding: 20,
    },
    image: {
      width: 70,
      height: 70,
    },
    changePicture: {
      position: "relative",
    },
    ChangePP: {
      position: "absolute",
      bottom: 0,
      right: 0,
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
      textDecorationLine: "underline",
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
      width: "90%",
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
      width: "90%",
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
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotification, setIsNotification] = useState(false);
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const toggleNotification = async () => {
    try {
      if (isNotification) {
        await messaging().unregisterDeviceForRemoteMessages();
        setIsNotification(false);
      } else {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log(token);
        setIsNotification(true);
      }
    } catch (error) {
      console.error("Failed to toggle notifications", error);
    }
  };

  useEffect(() => {
    getProfileData().then((data) => {
      setUserData(data);
      setIsLoading(false);
    });
  }, []);

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
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => handleConfirmLogout()}>
          <Exit stroke={colors.red700} />
        </TouchableOpacity>
      </View>
      <View style={styles.topProfile}>
        <TouchableOpacity style={styles.changePicture}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <View style={styles.ChangePP}>
            <ChangePP />
          </View>
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>
            {userData.prenom} {userData.nom}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:${userData.email_edu}`);
            }}
          >
            <Text style={styles.profileEmail}>{userData.email_edu}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileCTA}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <ProfileCard fill={colors.black} />
            <Text style={styles.profileBtnText}>Mes informations</Text>
          </View>
          <LeftArrow fill={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <View style={styles.CTAContent}>
            <Locker fill={colors.black} />
            <Text style={styles.profileBtnText}>Modifier mon mot de passe</Text>
          </View>
          <LeftArrow fill={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <ForwardRole fill={colors.black} />
            <Text style={styles.profileBtnText}>Transmettre mon rôle</Text>
          </View>
          <LeftArrow fill={colors.black} />
        </TouchableOpacity>
        <View style={styles.profileSwitcher}>
          <View style={styles.switcherToggle}>
            <View style={styles.switcherContent}>
              <Text style={styles.profileBtnSwitch}>Mode sombre</Text>
              <Switch
                trackColor={{ false: colors.grey, true: colors.blue_variable }}
                thumbColor={isEnabled ? colors.white : colors.white}
                onValueChange={toggleTheme}
                value={isDarkMode}
              ></Switch>
            </View>
            <View style={styles.switcherContent}>
              <Text style={styles.profileBtnSwitch}>Notifications</Text>
              <Switch
                trackColor={{ false: colors.grey, true: colors.blue_variable }}
                thumbColor={isNotification ? colors.white : colors.white}
                onValueChange={toggleNotification}
                value={isNotification}
              ></Switch>
            </View>
          </View>
          <View style={styles.separatorStick}></View>
          <View style={styles.containerMediaLinks}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.instagram.com/libelluleapp");
              }}
            >
              <View style={styles.mediaLinks}>
                <InstaIcon />
                <Text style={styles.profileMediaInsta}>@libellule</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("mailto:support@libellule.app");
              }}
            >
              <View style={styles.mediaLinks}>
                <MailProfile fill={colors.blue_variable} />
                <Text style={styles.profileMediaMail}>
                  support@libellule.app
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <Changelog fill={colors.black} />
            <Text style={styles.profileBtnText}>Journal des mises à jours</Text>
          </View>
          <LeftArrow fill={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <CGU fill={colors.black} />
            <View>
              <Text style={styles.profileBtnText}>CGU</Text>
              <Text style={styles.profileBtnUnderText}>
                Conditions générales d'utilisation
              </Text>
            </View>
          </View>
          <LeftArrow fill={colors.black} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Profile;
