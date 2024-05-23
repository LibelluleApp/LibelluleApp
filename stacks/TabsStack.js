// File for tabs navigation

import React from "react";
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
  Timetable,
  TimetableFocused,
  Mail,
  MailFocused,
  Profile,
  ProfileFocused,
  Notification,
} from "../assets/icons/Icons";

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
      fill={force ? color : "transparent"}
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
    insets.bottom > 30
      ? {
          height: 90,
        }
      : null,
  ],
  headerStyle: {
    backgroundColor: "#F4F5F9",
    shadowColor: "transparent",
    elevation: 0,
  },

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
    component: require("../views/Home").default,
    options: {
      tabBarIcon: ({ color, size, focused }) =>
        getIcon(Timetable, TimetableFocused, color, size, focused),
      headerLeft: () => <LogoTitle />,
      ...baseHeaderOptions,
    },
  },
  {
    name: "Agenda",
    component: require("../views/Agenda2").default,
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

const TabsStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#ccc",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#ccc",
            borderTopWidth: 1,
          },
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
