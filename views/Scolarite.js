import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Absence from "../components/scolarite/absence";
import Notes from "../components/scolarite/notes";

const Tab = createMaterialTopTabNavigator();

function Scolarite() {
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
        <Tab.Screen name="Mes absences" component={Absence} />
        <Tab.Screen name="Mes notes" component={Notes} />
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

export default Scolarite;
