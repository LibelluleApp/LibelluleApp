import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Absence from "../components/scolarite/absence";
import Notes from "../components/scolarite/notes";
import { ThemeContext } from "./../utils/themeContext";

const Tab = createMaterialTopTabNavigator();

function Scolarite() {
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

          tabBarActiveTintColor: colors.blue950,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: {
            fontFamily: "Ubuntu_400Regular",
            letterSpacing: -0.4,
            fontSize: 17,
            textTransform: "none",
          },

          tabBarIndicatorStyle: {
            backgroundColor: colors.blue950,
          },
        }}
      >
        <Tab.Screen name="Mes absences" component={Absence} />
        <Tab.Screen name="Mes notes" component={Notes} />
      </Tab.Navigator>
    </View>
  );
}

export default Scolarite;
