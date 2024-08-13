// File for tabs navigation

import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";

import { Feather } from "@expo/vector-icons";
import LogoTitle from "../components/logo";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Notifications from "../views/NotificationsViews";
import {
  Home,
  HomeFocused,
  Agenda,
  AgendaFocused,
  TimetableNoProps as Timetable,
  TimetableFocused,
  Mail,
  MailFocused,
  Profile,
  ProfileFocused,
  Notification,
} from "../assets/icons/Icons";
import { ThemeContext } from "./../utils/themeContext";

const Tab = createBottomTabNavigator();

function NotificationBell({ onPress }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(onPress)}
      style={{ paddingRight: 10 }}
    >
      <Notification />
    </TouchableOpacity>
  );
}

const TabsStack = () => {
  const { colors } = useContext(ThemeContext);

  const getIcon = (Icon, IconFill, color, size, focused, force) => {
    const width = size + 2;
    const height = size + 2;

    const same = Icon == IconFill;

    return focused ? (
      <IconFill
        fill={!same || force ? color : "transparent"}
        stroke={color}
        width={width}
        height={height}
      />
    ) : (
      <Icon
        fill={!same || force ? color : "transparent"}
        stroke={color}
        width={width}
        height={height}
      />
    );
  };

  const insets = useSafeAreaInsets();

  const baseHeaderOptions = {
    tabBarShowLabel: false,
    headerShown: true,
    tabBarLabelStyle: {
      marginTop: insets.bottom > 30 ? -3 : 0,
    },
    tabBarStyle: [
      Platform.OS === "ios"
        ? {
            paddingHorizontal: 8,
          }
        : {
            paddingHorizontal: 8,
          },
      { backgroundColor: colors.background, borderTopWidth: 0 },
      insets.bottom > 30
        ? {
            height: 90,
          }
        : {
            height: 70,
          },
    ],
    headerStyle: {
      backgroundColor: colors.background,
      elevation: 0,
      shadowColor: colors.background,
    },
    headerTitleStyle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 18,
      color: colors.black,
      allowFontScaling: false,
    },
    headerTitleAlign: "center",
    headerLeftContainerStyle: {
      paddingLeft: 17,
    },
    headerRightContainerStyle: {
      paddingRight: 17,
    },
    headerRight: () => <NotificationBell onPress="Notifications" />,
  };

  const views = [
    {
      name: "Vue d'ensemble",
      component: require("../views/Home").default,
      options: {
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Home, HomeFocused, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Emploi du temps",
      component: require("../views/Timetable").default,
      options: {
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Timetable, TimetableFocused, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Agenda",
      component: require("../views/Agenda").default,
      options: {
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Agenda, AgendaFocused, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Mails",
      component: require("../views/Mails").default,
      options: {
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Mail, MailFocused, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Profil",
      component: require("../views/Profile").default,
      options: {
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Profile, ProfileFocused, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          lazy: false,
        }}
      >
        {views.map((view) => (
          <Tab.Screen
            key={view.name}
            name={view.name}
            component={view.component}
            options={view.options}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default TabsStack;
