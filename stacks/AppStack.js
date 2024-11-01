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
        <Feather name="bell" size={24} color={colors.regular950} />
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
      component: require("../views/Settings/Others/liensExterne").default,
      options: {
        title: "Liens Externes",
        presentation: "modal",
        headerShadowVisible: false,
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
          letterSpacing: -0.4,
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
      component: require("../views/Settings/CustomColor").default,
      options: {
        title: "Modifiers les couleurs",
        headerShadowVisible: false,
        presentation: "modal",
      },
    },
    {
      name: "ChangePassword",
      component: require("../views/Settings/ChangePassword").default,
      options: {
        title: "Changer de mot de passe",
        headerShadowVisible: false,
      },
    },
    {
      name: "TutorialAgenda",
      component: require("../views/Tutorial/Agenda").default,
      options: {
        headerShown: false,
      },
    },
    {
      name: "DetailEvent",
      component: require("../views/Timetable/DetailEvent").default,
      options: {
        title: "Détails de l'événement",
        headerShadowVisible: false,
        presentation: "modal",
      },
    },
    {
      name: "editAgenda",
      component: require("../components/agenda/modal/edit").default,
      options: {
        title: "Modifier une tâche",
        headerShadowVisible: false,
      },
    },
    {
      name: "DeleteAccount",
      component: require("../views/Settings/DeleteAccount").default,
      options: {
        title: "Supprimer le compte",
        headerShadowVisible: false,
      },
    },
    {
      name: "TransferRole",
      component: require("../views/Settings/TransferRole").default,
      options: {
        title: "Transférer mon rôle",
        headerShadowVisible: false,
      },
    },
    {
      name: "Offline",
      component: require("../views/Offline/Offline").default,
      options: {
        title: "Hors ligne",
        headerShadowVisible: false,
        headerShown: false,
      },
    },
    {
      name: "Profile",
      component: require("../views/Settings/Profile/Profile").default,
      options: {
        title: "Profil",
        headerShadowVisible: false,
      },
    },
    {
      name: "Colors",
      component: require("../views/Settings/Customization/Colors").default,
      options: {
        title: "Couleurs",
        headerShadowVisible: false,
      },
    },
    {
      name: "TimetableSettings",
      component: require("../views/Settings/Settings/Timetable").default,
      options: {
        title: "Paramètres",
        headerShadowVisible: false,
      },
    },
    {
      name: "Settings",
      component: require("../views/Settings").default,
      options: {
        title: "Paramètres",
        headerShadowVisible: false,
      },
    },
  ];

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
          headerTintColor: colors.regular950,
          headerTitleStyle: {
            fontFamily: "Ubuntu_500Medium",
            letterSpacing: -0.4,
            fontSize: 18,
            color: colors.regular950,
          },
          headerBackTitle: "Retour",
          headerBackTitleStyle: {
            fontFamily: "Ubuntu_400Regular",
            letterSpacing: -0.4,
            fontSize: 16,
          },
        }}
        id={"app"}
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
