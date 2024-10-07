import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoTitle from "../components/logo";
import HeaderBar from "./HeaderBar";
import { Home, Check, Calendar, Envelope } from "../assets/icons/Icons";
import { ThemeContext } from "../utils/themeContext";

const Tab = createBottomTabNavigator();

const TabsStack = () => {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [headerTitle, setHeaderTitle] = useState("Vue d'ensemble");
  const getIcon = (Icon, color, strokeWidth, focused, height, width) => {
    const fillColor = focused ? colors.blue700 : color;

    return (
      <Icon
        stroke={fillColor}
        strokeWidth={strokeWidth}
        height={height}
        width={width}
      />
    );
  };
  const changeHeaderTitle = (name) => {
    setHeaderTitle(name);
  };

  const views = [
    {
      name: "Vue d'ensemble",
      component: require("../views/Home").default,
      options: {
        headerShown: false,
        tabBarLabel: "Accueil",
        tabBarIcon: ({ color, size, focused, height, width }) =>
          getIcon(Home, color, 1.75, focused, 24, 24),
      },
    },
    {
      name: "Emploi du temps",
      component: require("../views/Timetable").default,
      options: {
        headerShown: false,
        tabBarLabel: "EDT",
        tabBarIcon: ({ color, size, focused, height, width }) =>
          getIcon(Calendar, color, 1.75, focused, 24, 24),
      },
    },
    {
      name: "Agenda",
      component: require("../views/Agenda").default,
      options: {
        headerShown: false,
        tabBarLabel: "Devoirs",
        tabBarIcon: ({ color, size, focused, height, width }) =>
          getIcon(Check, color, 1.75, focused, 24, 24),
      },
    },
    {
      name: "Mails",
      component: require("../views/Mails").default,
      options: {
        headerShown: false,
        tabBarLabel: "Mails",
        tabBarIcon: ({ color, size, focused, height, width }) =>
          getIcon(Envelope, color, 1.75, focused, 24, 24),
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title={headerTitle} />
      <Tab.Navigator
        screenOptions={{
          animation: "shift",
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            paddingTop: 8,
            paddingHorizontal: 15,
            backgroundColor: colors.white_background,
            borderTopWidth: 0,
            height: 95,
          },
          tabBarActiveTintColor: colors.blue700,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: {
            marginTop: 1,
            fontFamily: "Ubuntu_500Medium",
            fontSize: 12,
          },
          headerLeft: () => <LogoTitle />,
        }}
      >
        {views.map((view) => (
          <Tab.Screen
            key={view.name}
            name={view.name}
            component={view.component}
            options={view.options}
            listeners={{
              tabPress: () => changeHeaderTitle(view.name),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default TabsStack;
