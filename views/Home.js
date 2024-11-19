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
    WindyIcon
} from "./../assets/icons/Icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import NextCourse from "../components/home/nextCourse/nextCourse";
import AgendaHome from "../components/home/Agenda/agendaHome";
import Restauration from "../components/home/Restauration";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { ThemeContext } from "./../utils/themeContext";
import messaging from "@react-native-firebase/messaging";
import saveNotifications from "../api/Notifications/saveNotifications";
import fetchWeather from "./../api/Weather/fetchWeather";
import { getUserData } from "../utils/storage";
import TouchableScale from "react-native-touchable-scale";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const getData = () => {
  try {
    const value = getUserData();
    return value;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

function Home() {
  const { colors } = useContext(ThemeContext);
  const [weatherError, setWeatherError] = useState(false);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const today = moment();
  const [isLoading, setIsLoading] = useState(true);
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

  const [weather, setWeather] = useState({});
  const [weatherMessage, setWeatherMessage] = useState("");

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
    container: {
      gap: 25,
    },
    containerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%",
      alignSelf: "center",
      alignItems: "center",
      marginTop: 20,
    },
    leftContainer: {
      flexDirection: "row",
      gap: 12,
      width: "60%",
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
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular700,
      textAlign: "center",
    },
    welcomeContainer: {
      flexDirection: "column",
      width: "100%",
    },
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedDate = capitalizeFirstLetter(today.format("ddd D MMM"));
  const generateWeatherMessage = (temp, conditionsType, currentTime) => {
    // Messages pour les étudiants
    const generalStudentMessages = [
      "N'oubliez pas de faire des pauses !",
      "Bonne révision, ça va le faire !",
      "Restez motivés, vous y êtes presque !",
      "Vous êtes sur la bonne voie !",
      "N'oubliez pas de vous hydrater !",
      "Mentalité Kaizen, petit pas par petit pas 🏔️",
      "Chaque effort compte, continuez comme ça !",
      "Prenez soin de vous la team 😊",
      "Là, on est biieennngggg 👀",
      "Allez, on lâche pas les cours la team 😎",
      "C'est quoi ces CDs ? 🤔",
    ];

    const startdayStudentMessages = [
      "Oui je sais, le réveil est difficile 😭",
      "Café et petit-déjeuner, c'est parti pour une bonne journée !",
      "Allez la team, on part pour une journée productive 🚀",
      "Petit-déjeuner, motivation et c'est partiiiiii 🫣",
    ];

    const morningStudentMessages = [
      "La vibe du matin, quel plaisir ! 😊",
      "Votre motivation du matin va vous porter loin aujourd'hui !",
      "Frais et dispo pour travailler 👀",
    ];

    const middayStudentMessages = [
      "Petite pause déjeuner, rechargez les batteries !",
      "Bon appétit, profitez de votre pause !",
      "Encore de la queue au Crousty... BK ?",
      "Un peu de repos, vous avez bien travaillé ce matin.",
    ];

    const afternoonStudentMessages = [
      "N'oubliez pas de faire des pauses et de vous détendre !",
      "Restez motivés, vous êtes sur la bonne voie !",
      "Petit café et ça repart 🚀",
      "Vous gérez, continuez comme ça !",
      "N'oubliez pas de vous hydrater régulièrement.",
      "Un peu de sport pour se défouler ?",
    ];

    const eveningStudentMessages = [
      "Bravo, vous avez bien travaillé aujourd'hui !",
      "Profitez de la soirée pour vous détendre un peu.",
      "Vous avez mérité une bonne nuit de sommeil !",
      "Bonne fin de journée la team !",
      "La journée de maallaaadeeee est finie !",
    ];

    // Messages météorologiques drôles et courts
    let weatherMessage = "Passez une excellente journée ! 🎉";

    switch (conditionsType) {
      case "Clear":
        weatherMessage =
          temp > 25
            ? "Trop chaud pour travailler, profitez ! ☀️"
            : "Ouais pas mal le temps ! ☀️";
        break;
      case "MostlyClear":
      case "PartlyCloudy":
        weatherMessage = "Pas mal, mais pas parfait ! ☁️";
        break;
      case "Cloudy":
        weatherMessage = "Un peu nuageux aujourd'hui !";
        break;
      case "ScatteredThunderstorms":
      case "Thunderstorm":
        weatherMessage = "Oulaaa temps orageux ! Faites attention⚡";
        break;
      case "HeavyRain":
      case "Rain":
      case "Showers":
        weatherMessage = "Trop relou la pluie 🌧️";
        break;
      case "Drizzle":
        weatherMessage = "Juste une petite pluie, pas de panique ! 🌧️";
        break;
      case "Snow":
      case "Flurries":
        weatherMessage =
          temp < 0
            ? "Il neige, le bonhomme de neige arrive ! ⛄️"
            : "Il fait frais, faites un bon chocolat chaud ! ☕️";
        break;
      case "Fog":
      case "Haze":
        weatherMessage = "Brouillard, jouons à cache-cache ! 👻";
        break;
      case "Dust":
      case "Smoke":
        weatherMessage = "Respirez à fond... ou pas ! 🌫️";
        break;
      case "Breezy":
        weatherMessage = "C'est une journée pour le cerf-volant ! 🪁";
        break;
      case "Windy":
        weatherMessage = "On dirait que le vent veut s'amuser ! 💨";
        break;
      case "Hurricane":
      case "Tornado":
      case "SevereThunderstorm":
        weatherMessage = "C'est l'heure de rester au chaud ! 🏠";
        break;
      case "Blizzard":
        weatherMessage = "Oula, c'est l'heure du chocolat chaud ! ☕️";
        break;
      default:
        weatherMessage = "Passez une excellente journée ! 🎉";
        break;
    }

    // Choisir aléatoirement entre message étudiant et message météo
    const hourOfDay = currentTime.getHours();
    let studentMessages = [];
    // Réveil
    if (hourOfDay < 8 && hourOfDay > 5) {
      studentMessages = [...generalStudentMessages, ...startdayStudentMessages];
    }
    // Matinée
    else if (hourOfDay > 8 && hourOfDay < 12) {
      studentMessages = [...generalStudentMessages, ...morningStudentMessages];
    } else if (hourOfDay >= 12 && hourOfDay <= 14) {
      studentMessages = [...generalStudentMessages, ...middayStudentMessages];
    } else if (hourOfDay < 18 && hourOfDay > 14) {
      studentMessages = [
        ...generalStudentMessages,
        ...afternoonStudentMessages,
      ];
    } else if (hourOfDay >= 18 && hourOfDay <= 0) {
      studentMessages = [...generalStudentMessages, ...eveningStudentMessages];
    } else {
      studentMessages = [...generalStudentMessages];
    }

    const showStudentMessage = Math.random() < 0.5; // 50% de chance

    return showStudentMessage
      ? studentMessages[Math.floor(Math.random() * studentMessages.length)]
      : weatherMessage; // Retourne soit un message étudiant soit un message météo
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetchWeather();
      
      if (response.error) {
        setWeatherError(true);
        setWeatherMessage(response.message || "Données météo indisponibles");
        setWeather(null);
        return;
      }
      
      setWeather(response.currentWeather);
      const currentTime = new Date();
      const message = generateWeatherMessage(
        response.currentWeather.temperature,
        response.currentWeather.conditionCode,
        currentTime
      );
      setWeatherMessage(message);
      setWeatherError(false);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setWeatherError(true);
      setWeatherMessage("Données météo indisponibles");
      setWeather(null);
    }
  };

  const renderWeatherOrProfile = () => {
    if (isLoading) {
      return (
        <ShimmerPlaceHolder
          width={50}
          height={50}
          shimmerStyle={{ borderRadius: 100 }}
          visible={false}
        />
      );
    }

    if (weather && !weatherError) {
      return (
        <TouchableScale
          friction={6}
          activeScale={0.78}
          onPress={() => {
            Linking.openURL(
              "https://meteofrance.com/previsions-meteo-france/angouleme/16000"
            );
          }}
        >
          <View style={styles.weatherContent}>
            <WeatherIcon iconName={weather.conditionCode} />
            <Text style={styles.weatherTitle}>
              {Math.round(weather.temperature)}°C
            </Text>
          </View>
        </TouchableScale>
      );
    }

    return (
      <TouchableScale
        friction={6}
        activeScale={0.95}
        onPress={() => navigation.navigate("Profil")}
      >
        <Image
          source={{ uri: user.lien_photo_profil }}
          style={styles.image}
        />
      </TouchableScale>
    );
  };

  const WeatherIcon = ({ iconName }) => {
    let IconComponent;

    switch (iconName) {
      case "Clear":
        IconComponent = Sun; // Icône pour le temps clair
        break;
      case "Cloudy":
        IconComponent = Cloud; // Icône pour le temps nuageux
        break;
      case "Dust":
        IconComponent = Cloud; // Remplace par l'icône de nuage (ou l'icône de votre choix)
        break;
      case "Fog":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      case "Haze":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      case "MostlyClear":
        IconComponent = CloudSun; // Icône pour en grande partie clair
        break;
      case "MostlyCloudy":
        IconComponent = Cloud; // Icône pour en grande partie nuageux
        break;
      case "PartlyCloudy":
        IconComponent = CloudSun; // Icône pour partiellement nuageux
        break;
      case "ScatteredThunderstorms":
        IconComponent = CloudLightning; // Icône pour orages éparpillés
        break;
      case "Smoke":
        IconComponent = Waves; // Remplace par l'icône de nuage
        break;
      case "Breezy":
        IconComponent = WindyIcon; // Icône pour une brise
        break;
      case "Windy":
        IconComponent = WindyIcon; // Icône pour le temps venteux
        break;
      case "Drizzle":
        IconComponent = CloudRain; // Icône pour la bruine
        break;
      case "HeavyRain":
        IconComponent = CloudRain; // Icône pour des pluies fortes
        break;
      case "Rain":
        IconComponent = CloudRain; // Icône pour la pluie
        break;
      case "Showers":
        IconComponent = CloudRain; // Icône pour les averses
        break;
      case "Flurries":
        IconComponent = SnowFlake; // Icône pour les flocons
        break;
      case "HeavySnow":
        IconComponent = SnowFlake; // Icône pour la forte neige
        break;
      case "MixedRainAndSleet":
        IconComponent = CloudRain; // Icône pour pluie et verglas mélangés
        break;
      case "MixedRainAndSnow":
        IconComponent = CloudRain; // Icône pour pluie et neige mélangées
        break;
      case "MixedRainfall":
        IconComponent = CloudRain; // Icône pour des précipitations mixtes
        break;
      case "MixedSnowAndSleet":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      case "ScatteredShowers":
        IconComponent = CloudRain; // Icône pour les averses éparpillées
        break;
      case "ScatteredSnowShowers":
        IconComponent = SnowFlake; // Icône pour les averses de neige éparpillées
        break;
      case "Sleet":
        IconComponent = CloudRain; // Icône pour le verglas
        break;
      case "Snow":
        IconComponent = SnowFlake; // Icône pour la neige
        break;
      case "SnowShowers":
        IconComponent = SnowFlake; // Icône pour les averses de neige
        break;
      case "Blizzard":
        IconComponent = SnowFlake; // Icône pour blizzard
        break;
      case "BlowingSnow":
        IconComponent = SnowFlake; // Icône pour neige soufflante
        break;
      case "FreezingDrizzle":
        IconComponent = CloudRain; // Icône pour la bruine gelée
        break;
      case "FreezingRain":
        IconComponent = CloudRain; // Icône pour la pluie verglaçante
        break;
      case "Frigid":
        IconComponent = SnowFlake; // Icône pour temps glacial
        break;
      case "Hail":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      case "Hot":
        IconComponent = Sun; // Icône pour temps chaud
        break;
      case "Hurricane":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      case "IsolatedThunderstorms":
        IconComponent = CloudLightning; // Icône pour orages isolés
        break;
      case "SevereThunderstorm":
        IconComponent = CloudLightning; // Icône pour orage violent
        break;
      case "Thunderstorm":
        IconComponent = CloudLightning; // Icône pour orage
        break;
      case "Tornado":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      case "TropicalStorm":
        IconComponent = Cloud; // Remplace par l'icône de nuage
        break;
      default:
        IconComponent = Thermometer; // Icône par défaut
        break;
    }

    return (
      <IconComponent
        stroke={colors.regular700}
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
      const data = getData();
      setUser(data);
      setIsLoading(false);
      await fetchWeatherData();
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerContent}>
            <View style={styles.leftContainer}>
              <View style={styles.weatherContainer}>
                {renderWeatherOrProfile()}
              </View>
              <View style={styles.welcomeContainer}>
                <ShimmerPlaceHolder
                  width={100}
                  visible={!isLoading}
                >
                  <Text
                    style={{
                      fontFamily: "Ubuntu_500Medium",
                      letterSpacing: -0.4,
                      fontSize: 15,
                      color: colors.regular950,
                    }}
                  >
                    Bonjour{" "}
                    <Text
                      style={{
                        fontFamily: "Ubuntu_500Medium",
                        letterSpacing: -0.4,
                        color: colors.regular800,
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
                  visible={!isLoading}
                >
                  <Text
                    style={{
                      fontFamily: "Ubuntu_400Regular",
                      letterSpacing: -0.4,
                      fontSize: 13,
                      color: colors.regular950,
                    }}
                  >
                    {isLoading ? "Chargement..." : weatherMessage}
                  </Text>
                </ShimmerPlaceHolder>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <ShimmerPlaceHolder width={70} visible={!isLoading}>
                <TouchableScale
                  friction={6}
                  activeScale={0.95}
                  onPress={() => navigation.navigate("Emploi du temps")}
                >
                  <Text
                    style={{
                      fontFamily: "Ubuntu_500Medium",
                      letterSpacing: -0.4,
                      color: colors.regular700,
                      fontSize: 15,
                    }}
                  >{`${formattedDate}`}</Text>
                </TouchableScale>
              </ShimmerPlaceHolder>
            </View>
          </View>

          <NextCourse />
          <AgendaHome />
          <Restauration />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default Home;
