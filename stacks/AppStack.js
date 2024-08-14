import React, { useEffect, useContext } from "react";
import { View, Platform, TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LogoTitle from "../components/logo";

import { ThemeContext } from "./../utils/themeContext";

const Stack = createNativeStackNavigator();

const AppStack = ({ navigation }) => {
  const { colors } = useContext(ThemeContext);

  function NotificationBell({ onPress }) {
    return (
      <TouchableOpacity onPress={onPress} style={{ paddingRight: 10 }}>
        <Feather name="bell" size={24} color={colors.black} />
      </TouchableOpacity>
    );
  }

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
        background: "transparent",
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
          backgroundColor: colors.background,
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
    {
      name: "addAgenda",
      component: require("../components/agenda/modal/add").default,
      options: {
        title: "Ajouter une tâche",
        headerShadowVisible: false,
      },
    },
    {
      name: "viewAgenda",
      component: require("../components/agenda/modal/view").default,
      options: {
        title: "Détails d'une tâche",
        headerShadowVisible: false,
        presentation: "modal",
      },
    },
    {
      name: "CustomColor",
      component: require("../views/Profile/CustomColor").default,
      options: {
        title: "Modifiers les couleurs",
        headerShadowVisible: false,
        presentation: "modal",
      },
    },
    {
      name: "ChangePassword",
      component: require("../views/Profile/ChangePassword").default,
      options: {
        title: "Changer de mot de passe",
        headerShadowVisible: false,
        presentation: "modal",
      },
    },
    {
      name: "CGU",
      component: require("../views/Profile/CGU").default,
      options: {
        title: "Conditions Générales d'Utilisation",
        headerShadowVisible: false,
        presentation: "modal",
      },
    },
    {
      name: "TutorialAgenda",
      component: require("../views/Tutorial/Agenda").default,
      options: {
        headerShown: false,
      },
    },
  ];
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: "transparent",
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontFamily: "Ubuntu_500Medium",
            fontSize: 18,
            color: colors.black,
          },
          headerBackTitle: "Retour",
          headerBackTitleStyle: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: colors.background,
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
