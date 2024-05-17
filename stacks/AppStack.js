import React, { useEffect } from "react";
import { View, Platform, TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LogoTitle from "../components/logo";

const Stack = createNativeStackNavigator();
function NotificationBell({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingRight: 10 }}>
      <Feather name="bell" size={24} color="black" />
    </TouchableOpacity>
  );
}
const AppStack = ({ navigation }) => {
  const views = [
    {
      name: "TabsStack",
      component: require("./TabsStack").default,
      options: {
        headerShown: false,
      },
    },
    {
      name: "liensExterne",
      component: require("../components/home/modal/liensExterne").default,
      options: {
        title: "Liens Externes",
        presentation: "modal",
      },
    },
    {
      name: "Restauration",
      component: require("../components/home/modal/Restauration").default,
      options: {
        title: "Restauration",
        presentation: "modal",
      },
    },
    {
      name: "Scolarite",
      component: require("../views/Scolarite").default,
      options: {
        title: "Scolarité",
        headerBackTitle: "Retour",
        headerShadowVisible: false,
        headerBackTitleStyle: {
          fontFamily: "Ubuntu_400Regular",
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "#F4F5F9",
          shadowColor: "transparent",
          elevation: 0,
        },
      },
    },
    {
      name: "Notifications",
      component: require("../views/NotificationsViews").default,
      options: {
        title: "Notifications",
        headerShadowVisible: false,
      },
    },
    {
      name: "MailDetail",
      component: require("../components/mails/MailDetail").default,
      options: {
        title: "Détails du mail",
        headerShadowVisible: false,
      },
    },
  ];
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F4F5F9",
            shadowColor: "transparent",
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          headerTintColor: "#252525",
          headerTitleStyle: {
            fontFamily: "Ubuntu_500Medium",
            fontSize: 18,
          },
          headerBackTitle: "Retour",
          headerBackTitleStyle: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: "#F4F5F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      >
        {views.map((view) => (
          <Stack.Screen
            key={view.name}
            name={view.name}
            component={view.component}
            options={view.options}
          />
        ))}
      </Stack.Navigator>
    </View>
  );
};

export default AppStack;
