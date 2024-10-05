import React, { useContext } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import LogoTitle from "../components/logo";
import Notifications from "../views/NotificationsViews";
import {
  Home,
  Check,
  Calendar,
  Envelope,
  User,
  Bell,
} from "../assets/icons/Icons";
import { ThemeContext } from "./../utils/themeContext";

const Tab = createBottomTabNavigator();

function NotificationBell() {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Notifications")}
      style={{ paddingRight: 10 }}
    >
      <Bell stroke={colors.grey} strokeWidth={1.75} width={22} height={22} />
    </TouchableOpacity>
  );
}

const TabsStack = () => {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  const getIcon = (Icon, color, size, focused) => {
    const fillColor = focused ? colors.blue700 : color; // Change icon color to blue when focused

    return <Icon stroke={fillColor} />;
  };

  const baseHeaderOptions = {
    tabBarShowLabel: true,
    headerShown: true,
    tabBarStyle: [
      {
        paddingHorizontal: 8,
        backgroundColor: colors.white_background,
        borderTopWidth: 0,
      },
      insets.bottom > 30 ? { height: 90 } : { height: 75 },
    ],
    headerStyle: {
      backgroundColor: colors.background,
      elevation: 0,
      shadowColor: colors.background,
    },
    headerTitleStyle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 18,
      color: colors.blue950,
      allowFontScaling: false,
    },
    headerTitleAlign: "center",
    headerLeftContainerStyle: {
      paddingLeft: 17,
    },
    headerRightContainerStyle: {
      paddingRight: 17,
    },
    headerRight: () => <NotificationBell />,
  };

  const views = [
    {
      name: "Vue d'ensemble",
      component: require("../views/Home").default,
      options: {
        tabBarLabel: "Accueil",
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Home, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Emploi du temps",
      component: require("../views/Timetable").default,
      options: {
        tabBarLabel: "Cours",
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Calendar, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Agenda",
      component: require("../views/Agenda").default,
      options: {
        tabBarLabel: "Agenda",
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Check, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Mails",
      component: require("../views/Mails").default,
      options: {
        tabBarLabel: "Mails",
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(Envelope, color, size, focused),
        headerLeft: () => <LogoTitle />,
        ...baseHeaderOptions,
      },
    },
    {
      name: "Profil",
      component: require("../views/Profile").default,
      options: {
        tabBarLabel: "Profil",
        tabBarIcon: ({ color, size, focused }) =>
          getIcon(User, color, size, focused),
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
          tabBarActiveTintColor: colors.blue700, // Active text color
          tabBarInactiveTintColor: colors.grey, // Inactive text color
          tabBarLabelStyle: {
            bottom: 12,
            fontFamily: "Ubuntu_500Medium",
            fontSize: 11,
          },
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
