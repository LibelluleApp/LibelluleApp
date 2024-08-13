import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { CalendarFill } from "../../../assets/icons/Icons";
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
      paddingVertical: 25,
      gap: 11,
      justifyContent: "space-between",
    },
    hourContainer: {
      flexDirection: "row",
      gap: 8,
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
      width: 23,
      height: 23,
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
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchAgenda();
    }
  }, [isFocused]);

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
            <CalendarFill fill={colors.grey_variable} width={20} height={20} />
            <Text style={styles.hourContent}>7h30 de cours</Text>
          </View>
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherContent}>8°C</Text>
            <Image
              source={require("../../../assets/icons/weather/storm.png")}
              style={styles.weatherIcon}
            />
          </View>
        </View>
        <Eval data={dayAgendaEval} />
        <Task data={dayAgendaTask} />
      </View>
    </ShimmerPlaceholder>
  );
}

export default EventDay;
