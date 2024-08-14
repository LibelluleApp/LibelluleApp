import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Jour from "../components/timetable/jour";
import Semaine from "../components/timetable/semaine";
import { ThemeContext } from "./../utils/themeContext";

const Tab = createMaterialTopTabNavigator();

function Timetable() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
    },
  });

  return (
    <View style={styles.modalBackground}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
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
        <Tab.Screen name="Jour" component={Jour} />
        <Tab.Screen name="Semaine" component={Semaine} />
      </Tab.Navigator>
    </View>
  );
}

export default Timetable;
