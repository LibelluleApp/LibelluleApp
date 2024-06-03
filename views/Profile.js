import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import {} from "react-native-gesture-handler";
import {
  ChangePP,
  LeftArrow,
  ProfileCard,
  Locker,
  ForwardRole,
  InstaIcon,
  MailFocused,
  Changelog,
  CGU,
} from "../assets/icons/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getProfileData() {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem("user_data"));
    return userData;
  } catch (e) {
    console.log(e);
  }
}

function Profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
    <View style={styles.container}>
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
              onValueChange={toggleSwitch}
              ios_backgroundColor={"#7A797C"}
              value={isEnabled}
            ></Switch>
          </View>
          <View style={styles.switcherContent}>
            <Text style={styles.profileBtnSwitch}>Notifcations</Text>
            <Switch
              trackColor={{ false: "#7A797C", true: "#0760FB" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              onValueChange={toggleSwitch}
              ios_backgroundColor={"#7A797C"}
              value={isEnabled}
            ></Switch>
          </View>
        </View>
      </View>
    </View>
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
  profileBtnSwitch: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 17,
    color: "#252525",
  },
});

export default Profile;
