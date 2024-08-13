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

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.profileEmail}>{userData.email_edu}</Text>
        </View>
      </View>
      <View style={styles.profileCTA}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <ProfileCard />
            <Text style={styles.profileBtnText}>Mes informations</Text>
          </View>
          <LeftArrow />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <Locker />
            <Text style={styles.profileBtnText}>Modifier mon mot de passe</Text>
          </View>
          <LeftArrow />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <ForwardRole />
            <Text style={styles.profileBtnText}>Transmettre mon rôle</Text>
          </View>
          <LeftArrow />
        </TouchableOpacity>
        <View style={styles.profileSwitcher}>
          <View style={styles.switcherContent}>
            <Text style={styles.profileBtnSwitch}>Mode sombre</Text>
            <Switch
              trackColor={{ false: "#7A797C", true: "#0760FB" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              onValueChange={toggleTheme}
              value={isDarkMode}
            ></Switch>
          </View>
          <View style={styles.switcherContent}>
            <Text style={styles.profileBtnSwitch}>Notifcations</Text>
            <Switch
              trackColor={{ false: "#7A797C", true: "#0760FB" }}
              thumbColor={isNotification ? "#fff" : "#fff"}
              onValueChange={toggleNotification}
              value={isNotification}
            ></Switch>
          </View>
          <View style={styles.separatorStick}></View>
          <View style={styles.mediaLinks}>
            <InstaIcon />
            <Text style={styles.profileMediaInsta}>@libellule</Text>
          </View>
          <View style={styles.mediaLinks}>
            <MailProfile />
            <Text style={styles.profileMediaMail}>support@libellule.app</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <Changelog />
            <Text style={styles.profileBtnText}>Journal des mises à jours</Text>
          </View>
          <LeftArrow />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.CTAContent}>
            <CGU />
            <View>
              <Text style={styles.profileBtnText}>CGU</Text>
              <Text style={styles.profileBtnUnderText}>
                Conditions générales d'utilisation
              </Text>
            </View>
          </View>
          <LeftArrow />
        </TouchableOpacity>
      </View>
      <View>
        <Button title="Se déconnecter" onPress={signOut} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
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
    color: "#252525",
  },
  profileEmail: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#7A797C",
    textDecorationLine: "underline",
  },
  profileCTA: {
    marginTop: 15,
    alignItems: "center",
    gap: 12,
  },
  profileButton: {
    backgroundColor: "#FFF",
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
    color: "#252525",
  },
  profileBtnUnderText: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
  },
  CTAContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  profileSwitcher: {
    paddingHorizontal: 20,
    width: "90%",
    marginTop: 12,
    gap: 20,
  },
  switcherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mediaLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileBtnSwitch: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 17,
    color: "#252525",
  },
  separatorStick: {
    marginVertical: 20,
    height: 1,
    backgroundColor: "#7A797C",
  },
  profileMediaInsta: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#FE068D",
  },
  profileMediaMail: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#0760FB",
    paddingBottom: 5,
  },
});

export default Profile;
