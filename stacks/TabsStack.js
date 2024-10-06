import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from '@react-navigation/native';
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
  const getIcon = (Icon, color, size, focused) => {
    const fillColor = focused ? colors.blue700 : color;

    return <Icon stroke={fillColor} />;
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
        tabBarIcon: ({ color, size, focused }) => getIcon(Home, color, size, focused),
      },
    },
    {
      name: "Emploi du temps",
      component: require("../views/Timetable").default,
      options: {
        headerShown: false,
        tabBarLabel: "EdT",
        tabBarIcon: ({ color, size, focused }) => getIcon(Calendar, color, size, focused),
      },
    },
    {
      name: "Devoirs",
      component: require("../views/Agenda").default,
      options: {
        headerShown: false,
        tabBarLabel: "Devoirs",
        tabBarIcon: ({ color, size, focused }) => getIcon(Check, color, size, focused),
      },
    },
    {
      name: "Mails",
      component: require("../views/Mails").default,
      options: {
        headerShown: false,
        tabBarBadge: 3,
        tabBarLabel: "Mails",
        tabBarIcon: ({ color, size, focused }) => getIcon(Envelope, color, size, focused),
      },
    }
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
                paddingHorizontal: 8,
                backgroundColor: colors.white_background,
                borderTopWidth: 0,
              },
              tabBarActiveTintColor: colors.blue700,
              tabBarInactiveTintColor: colors.grey,
              tabBarLabelStyle: {
                fontFamily: "Ubuntu_500Medium",
                fontSize: 13,
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
