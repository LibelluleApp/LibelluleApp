import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Jour from "../components/timetable/jour";
import Semaine from "../components/timetable/semaine";
import { ThemeContext } from "../utils/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

function Timetable() {
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
      <Tab.Navigator
        key={isWeekDefault ? "week-first" : "day-first"}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOffset: { width: 0, height: 0 },
          },
          swipeEnabled: false,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 17,
            textTransform: "none",
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.black,
          },
        }}
      >
        {!isWeekDefault ? (
          <>
            <Tab.Screen name="Jour" component={Jour} />
            <Tab.Screen name="Semaine" component={Semaine} />
          </>
        ) : (
          <>
            <Tab.Screen name="Semaine" component={Semaine} />
            <Tab.Screen name="Jour" component={Jour} />
          </>
        )}
      </Tab.Navigator>
    </View>
  );
}

export default Timetable;