import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { Clock } from "../../../assets/icons/Icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Orage } from "../../../assets/icons/Weather";
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
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.grey_variable,
      textAlign: "center",
    },
    weatherIcon: {
      width: 35,
      height: 35,
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
        statusBarHeight: 15,
      });
    } finally {
      setLoading(false);
    }
  };

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
        statusBarHeight: 15,
      });
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
        statusBarHeight: 15,
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
            {hourOfDay.totalHours === "00:00" ? (
              <Text style={styles.hourContent}>Pas de cours</Text>
            ) : (
              <Text style={styles.hourContent}>
                {hourOfDay.totalHours} de cours
              </Text>
            )}
          </View>
          <View style={styles.weatherContainer}>
            {weather ? (
              <>
                <Text style={styles.weatherContent}>{weather.temp}°C</Text>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                  }}
                  style={styles.weatherIcon}
                />
              </>
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
