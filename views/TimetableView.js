import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Jour from "../components/timetable/jour";
import Semaine from "../components/timetable/semaine";
import { ThemeContext } from "../utils/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Timetable from  "../components/timetable/Timetable"

const Tab = createMaterialTopTabNavigator();

function TimetableView() {
  const { colors } = useContext(ThemeContext);
  const [isWeekDefault, setIsWeekDefault] = useState(false);
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
    },
  });

  useEffect(() => {
    const getWeekDefault = async () => {
      try {
        const value = await AsyncStorage.getItem("week_default");
        return value ? JSON.parse(value) : false;
      } catch (error) {
        console.error(
          "Impossible de récupérer la vue semaine par défaut",
          error
        );
        return false;
      }
    };

    if (isFocused) {
      getWeekDefault().then(setIsWeekDefault);
    }
  }, [isFocused]);

  return (
    <View style={styles.modalBackground}>
      <Timetable />
    </View>
  );
}

export default TimetableView;