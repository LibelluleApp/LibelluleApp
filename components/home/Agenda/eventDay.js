import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
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
} from "../../../assets/icons/Icons";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import Eval from "./Eval";
import Task from "./Task";
import moment from "moment";
import fetchWeekAgenda from "../../../api/Agenda/fetchweek";
import { showMessage } from "react-native-flash-message";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "./../../../utils/themeContext";
import fetchWeather from "../../../api/Weather/fetchWeather";
import fetchHourOfDay from "../../../api/Timetable/fetchHourOfDay";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

function EventDay({ date }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      alignSelf: "center",
      flexDirection: "column",
    },
    topContainer: {
      flexDirection: "row",
      width: "100%",
      paddingBottom: 15,
      gap: 11,
      justifyContent: "space-between",
    },
    hourContainer: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    hourContent: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 13,
      color: colors.grey_variable,
      textAlign: "center",
    },
    weatherContainer: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    weatherContent: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    weatherTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.grey_variable,
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: colors.red_variable,
    },
  });

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [agenda, setAgenda] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({});
  const [hourOfDay, setHourOfDay] = useState({});

  const currentDate = moment(date).format("YYYY-MM-DD");

  // Weather
  const fetchWeatherData = async () => {
    try {
      const response = await fetchWeather(currentDate);
      setWeather(response.weather);
    } catch (error) {
      setError(error);
      showMessage({
        message: "Erreur de chargement",
        description: "Impossible de charger la météo",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    }
  };

  const WeatherIcon = ({ iconName }) => {
    let IconComponent;

    // Mappez les noms des icônes de Lucide aux icônes OpenWeatherMap
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

      // Ajoutez d'autres cas pour les autres icônes
      default:
        IconComponent = Thermometer; // Icône par défaut
        break;
    }

    return (
      <IconComponent
        stroke={colors.grey_variable}
        strokeWidth={1.75}
        width={21}
        height={21}
      />
    );
  };

  const fetchAgenda = async () => {
    try {
      const response = await fetchWeekAgenda();
      setAgenda(response);
    } catch (error) {
      setError(error);
      showMessage({
        message: "Erreur de chargement",
        description: "Impossible de charger l'agenda",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchHour = async () => {
    try {
      const response = await fetchHourOfDay(currentDate);
      setHourOfDay(response);
    } catch (error) {
      setError(error);
      showMessage({
        message: "Erreur de chargement",
        description: "Impossible de charger les heures de cours",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    }
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchAgenda();
      fetchWeatherData(); // Fetch weather whenever the screen is focused
      fetchHour(); // Fetch hour whenever the screen is focused
    }
  }, [isFocused, currentDate]); // Also refetch weather whenever the date changes

  const dayAgendaEval = (agenda[currentDate] || []).filter(
    (item) => item.type === "eval"
  );
  const dayAgendaTask = (agenda[currentDate] || []).filter(
    (item) => item.type === "devoir"
  );

  return (
    <ShimmerPlaceholder
      visible={loading ? false : true}
      shimmerStyle={{
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
        marginTop: 20,
        height: 300,
      }}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.hourContainer}>
            <Clock
              strokeWidth={1.75}
              stroke={colors.grey_variable}
              width={18}
              height={18}
            />
            {hourOfDay.totalHours >= "11:00" ? (
              <Text style={styles.hourContent}>En alternance</Text>
            ) : hourOfDay.totalHours === "00:00" ? (
              <Text style={styles.hourContent}>Aucun cours</Text>
            ) : (
              <Text style={styles.hourContent}>
                {hourOfDay.totalHours} de cours
              </Text>
            )}
          </View>
          <View style={styles.weatherContainer}>
            {weather ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://openweathermap.org/city/3037598");
                }}
                style={styles.weatherContent}
              >
                <Text style={styles.weatherTitle}>{weather.temp}°C</Text>
                <WeatherIcon iconName={weather.icon} />
                {/* <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                  }}
                  style={{ width: 20, height: 20 }}
                /> */}
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="small" color={colors.grey_variable} />
            )}
          </View>
        </View>
        <Eval data={dayAgendaEval} />
        <Task data={dayAgendaTask} />
      </View>
    </ShimmerPlaceholder>
  );
}

export default EventDay;
