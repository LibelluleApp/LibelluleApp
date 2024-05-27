import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Jour from "../components/timetable/jour";
import Semaine from "../components/timetable/semaine";

const Tab = createMaterialTopTabNavigator();

function Timetable() {
  return (
    <View style={styles.modalBackground}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#F4F5F9",
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          swipeEnabled: false,

          tabBarActiveTintColor: "#252525",
          tabBarInactiveTintColor: "#7A797C",
          tabBarLabelStyle: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 17,
            textTransform: "none",
          },

          tabBarIndicatorStyle: {
            backgroundColor: "#252525",
          },
        }}
      >
        <Tab.Screen name="Jour" component={Jour} />
        <Tab.Screen name="Semaine" component={Semaine} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
});

export default Timetable;
