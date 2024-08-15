import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import NextCourse from "../components/home/nextCourse/nextCourse";
import AgendaHome from "../components/home/Agenda/agendaHome";
import ParcourirHome from "../components/home/Parcourir";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { ThemeContext } from "./../utils/themeContext";
import Timetable from "./Timetable";
import Profile from "./Profile";
import messaging from "@react-native-firebase/messaging";
import saveNotifications from "../api/Notifications/saveNotifications";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("user_data");
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

function Home() {
  const { colors } = useContext(ThemeContext);
  const [user, setUser] = useState({});
  const today = moment();
  const dayIndex = today.format("ddd");
  const formattedDate = today.format("ddd D MMMM");
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          saveNotifications(token);
          console.log(token);
        });
    } else {
      console.log("Permission not granted", authStatus);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUser(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      fontFamily: "Ubuntu_400Regular",
      flex: 1,
    },
    image: {
      width: 50,
      height: 50,
    },
    topContainer: {
      flexDirection: "row",
      width: "90%",
      paddingVertical: 25,
      gap: 11,
      alignSelf: "center",
    },
    topContent: {
      flexDirection: "column",
    },
    headerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
      alignItems: "center",
    },
  });

  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Profile)}>
            <ShimmerPlaceHolder
              width={50}
              height={50}
              shimmerStyle={{ borderRadius: 100 }}
              visible={isLoading ? false : true}
            >
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.image}
              />
            </ShimmerPlaceHolder>
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <View style={styles.topContent}>
              <ShimmerPlaceHolder
                width={100}
                visible={isLoading ? false : true}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu_400Regular",
                    fontSize: 13,
                    color: colors.black,
                  }}
                >
                  Bonne journée,
                </Text>
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                width={150}
                height={20}
                visible={isLoading ? false : true}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu_500Medium",
                    fontSize: 17,
                    color: colors.black,
                  }}
                >
                  {user.prenom}
                </Text>
              </ShimmerPlaceHolder>
            </View>
            <ShimmerPlaceHolder width={70} visible={isLoading ? false : true}>
              <TouchableOpacity onPress={() => navigation.navigate(Timetable)}>
                <Text
                  style={{
                    fontFamily: "Ubuntu_500Medium",
                    color: colors.blue_variable,
                    fontSize: 15,
                  }}
                >{`${formattedDate}`}</Text>
              </TouchableOpacity>
            </ShimmerPlaceHolder>
          </View>
        </View>
        <NextCourse />
        <AgendaHome />
        <ParcourirHome />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default Home;
