import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import {
  Thermometer,
  Clock,
  Cloud,
  Sun,
  CloudRain,
  CloudSun,
  Cloudy,
  CloudSunRain,
  CloudLightning,
  SnowFlake,
  Waves,
} from "./../assets/icons/Icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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
import fetchWeather from "./../api/Weather/fetchWeather";

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
  const isFocused = useIsFocused();
  const today = moment();
  const dayIndex = today.format("ddd");
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [weatherMessage, setWeatherMessage] = useState("");

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } catch (error) {
      console.error("Permission request failed:", error);
      return false;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      fontFamily: "Ubuntu_400Regular",
      flex: 1,
    },
    containerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%",
      alignSelf: "center",
      alignItems: "center",
      marginVertical: 20,
    },
    leftContainer: {
      flexDirection: "row",
      gap: 12,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    weatherContainer: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    weatherContent: {
      flexDirection: "column",
      alignItems: "center",
    },
    weatherTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 13,
      color: colors.blue700,
      textAlign: "center",
    },
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedDate = capitalizeFirstLetter(today.format("ddd D MMM"));
  const generateWeatherMessage = (temp, icon) => {
    // Messages pour les étudiants
    const studentMessages = [
      "N'oubliez pas de faire des pauses !",
      "Bonne révision, ça va le faire !",
      "Restez motivés, vous y êtes presque !",
      "Petit café et ça repart 🚀",
      "Vous êtes sur la bonne voie !",
      "N'oubliez pas de vous hydrater !",
      "Un peu de sport pour se défouler ?",
      "En vrai, petit BK ce midi ?",
      "Ça dit quoi l'équipe ?",
      "Mentalité Kaizen, petit pas par petit pas 🏔️",
      "Chaque effort compte, continuez comme ça !",
    ];

    // Messages météorologiques
    let weatherMessage = "";

    if (icon.includes("01")) {
      // Ensoleillé
      weatherMessage =
        temp > 25
          ? "Il fait chaud ! Profitez du soleil !"
          : "Une belle journée ensoleillée !";
    } else if (icon.includes("02")) {
      // Partiellement nuageux
      weatherMessage = "Un temps agréable avec quelques nuages !";
    } else if (icon.includes("03") || icon.includes("04")) {
      // Nuageux
      weatherMessage = "Un peu nuageux aujourd'hui !";
    } else if (icon.includes("09") || icon.includes("10")) {
      // Pluvieux
      weatherMessage = "Petit parapluie pour aujourd'hui ! ☔️";
    } else if (icon.includes("11")) {
      // Orageux
      weatherMessage = "Un temps orageux ! Faites attention ! ⚡️";
    } else if (icon.includes("13")) {
      // Neigeux
      weatherMessage =
        temp < 0
          ? "Il neige ! N'oubliez pas votre manteau !"
          : "Il fait frais ! Un chocolat chaud serait parfait !";
    } else if (icon.includes("50")) {
      // Brouillard
      weatherMessage = "Visibilité réduite, conduisez prudemment !";
    } else {
      weatherMessage = "Passez une excellente journée !";
    }

    // Choisir aléatoirement entre message étudiant et message météo
    const showStudentMessage = Math.random() < 0.5; // 50% de chance

    return showStudentMessage
      ? studentMessages[Math.floor(Math.random() * studentMessages.length)]
      : weatherMessage; // Retourne soit un message étudiant soit un message météo
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetchWeather(today.format("YYYY-MM-DD"));
      setWeather(response.weather);
      const message = generateWeatherMessage(
        response.weather.temp,
        response.weather.icon
      );
      setWeatherMessage(message);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setWeatherMessage("Impossible de charger les données météo.");
    }
  };

  const WeatherIcon = ({ iconName }) => {
    let IconComponent;

    switch (iconName) {
      case "01d":
        IconComponent = Sun;
        break;
      case "02d":
        IconComponent = CloudSun;
        break;
      case "03d":
        IconComponent = Cloud;
        break;
      case "04d":
        IconComponent = Cloudy;
        break;
      case "09d":
        IconComponent = CloudRain;
        break;
      case "10d":
        IconComponent = CloudSunRain;
        break;
      case "11d":
        IconComponent = CloudLightning;
        break;
      case "13d":
        IconComponent = SnowFlake;
        break;
      case "50d":
        IconComponent = Waves;
        break;
      default:
        IconComponent = Thermometer;
        break;
    }

    return (
      <IconComponent
        stroke={colors.blue700}
        strokeWidth={1.5}
        width={25}
        height={25}
      />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        messaging()
          .getToken()
          .then((token) => {
            saveNotifications(token);
          })
          .catch((error) =>
            console.error("Failed to get messaging token:", error)
          );
      }

      await fetchWeatherData();
      const data = await getData();
      setUser(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerContent}>
          <View style={styles.leftContainer}>
            <View style={styles.weatherContainer}>
              {weather ? (
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL("https://openweathermap.org/city/3037598");
                  }}
                  style={styles.weatherContent}
                >
                  <WeatherIcon iconName={weather.icon} />
                  <Text style={styles.weatherTitle}>{weather.temp}°C</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
                  <ShimmerPlaceHolder
                    width={50}
                    height={50}
                    shimmerStyle={{ borderRadius: 100 }}
                    visible={isLoading ? false : true}
                  >
                    <Image
                      source={{ uri: user.lien_photo_profil }}
                      style={styles.image}
                    />
                  </ShimmerPlaceHolder>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.welcomeContainer}>
              <ShimmerPlaceHolder
                width={100}
                visible={isLoading ? false : true}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu_400Regular",
                    fontSize: 15,
                    color: colors.blue950,
                  }}
                >
                  Bonjour{" "}
                  <Text
                    style={{
                      fontFamily: "Ubuntu_500Medium",
                      color: colors.blue800,
                    }}
                  >
                    {user.prenom}
                  </Text>
                  ,
                </Text>
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                width={150}
                height={20}
                visible={isLoading ? false : true}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu_400Regular",
                    fontSize: 13,
                    color: colors.blue950,
                  }}
                >
                  {isLoading ? "Chargement..." : weatherMessage}
                </Text>
              </ShimmerPlaceHolder>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.dateContainer}>
              <ShimmerPlaceHolder width={70} visible={isLoading ? false : true}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Emploi du temps")}
                >
                  <Text
                    style={{
                      fontFamily: "Ubuntu_500Medium",
                      color: colors.blue700,
                      fontSize: 15,
                    }}
                  >{`${formattedDate}`}</Text>
                </TouchableOpacity>
              </ShimmerPlaceHolder>
            </View>
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
