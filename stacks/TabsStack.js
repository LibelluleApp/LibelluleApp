import React, { useContext, useState, useMemo, useCallback } from "react";
import { Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoTitle from "../components/logo";
import HeaderBar from "./HeaderBar";
import { Home, Check, Calendar, Envelope } from "../assets/icons/Icons";
import { ThemeContext } from "../utils/themeContext";

// Views import optimization
const VIEWS_CONFIG = {
  Home: require("../views/Home").default,
  Timetable: require("../views/Timetable").default,
  Agenda: require("../views/Agenda").default,
  Mails: require("../views/Mails").default,
};

const Tab = createBottomTabNavigator();

const ICON_CONFIG = {
  "Vue d'ensemble": Home,
  "Emploi du temps": Calendar,
  "Agenda": Check,
  "Mails": Envelope,
};

const TAB_LABELS = {
  "Vue d'ensemble": "Accueil",
  "Emploi du temps": "EDT",
  "Agenda": "Devoirs",
  "Mails": "Mails",
};

const TabIcon = React.memo(({ Icon, color, focused, strokeWidth = 1.75 }) => {
  const { colors } = useContext(ThemeContext);
  const fillColor = focused ? colors.regular700 : color;
  return <Icon stroke={fillColor} strokeWidth={strokeWidth} />;
});

const TabsStack = () => {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [headerTitle, setHeaderTitle] = useState("Vue d'ensemble");

  const screenOptions = useMemo(() => ({
    animation: "shift",
    lazy: false,
    headerShown: false,
    tabBarShowLabel: true,
    tabBarStyle: {
      paddingTop: 8,
      paddingHorizontal: 15,
      backgroundColor: colors.white_background,
      borderTopWidth: 0,
      height: Platform.OS === "ios" ? 85 : 80,
      paddingBottom: insets.bottom,
    },
    tabBarActiveTintColor: colors.regular700,
    tabBarInactiveTintColor: colors.grey,
    tabBarLabelStyle: {
      marginTop: 1,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 12,
    },
    headerLeft: () => <LogoTitle />,
  }), [colors, insets.bottom]);

  const getTabIcon = useCallback(({ color, focused }, routeName) => (
      <TabIcon
          Icon={ICON_CONFIG[routeName]}
          color={color}
          focused={focused}
      />
  ), []);

  const views = useMemo(() => [
    {
      name: "Vue d'ensemble",
      component: VIEWS_CONFIG.Home,
      options: {
        headerShown: false,
        tabBarLabel: TAB_LABELS["Vue d'ensemble"],
        tabBarIcon: (props) => getTabIcon(props, "Vue d'ensemble"),
      },
    },
    {
      name: "Emploi du temps",
      component: VIEWS_CONFIG.Timetable,
      options: {
        headerShown: false,
        tabBarLabel: TAB_LABELS["Emploi du temps"],
        tabBarIcon: (props) => getTabIcon(props, "Emploi du temps"),
      },
    },
    {
      name: "Agenda",
      component: VIEWS_CONFIG.Agenda,
      options: {
        headerShown: false,
        tabBarLabel: TAB_LABELS["Agenda"],
        tabBarIcon: (props) => getTabIcon(props, "Agenda"),
      },
    },
    {
      name: "Mails",
      component: VIEWS_CONFIG.Mails,
      options: {
        headerShown: false,
        tabBarLabel: TAB_LABELS["Mails"],
        tabBarIcon: (props) => getTabIcon(props, "Mails"),
      },
    },
  ], [getTabIcon]);

  const changeHeaderTitle = useCallback((name) => {
    setHeaderTitle(name);
  }, []);

  const containerStyle = useMemo(() => ({
    flex: 1,
    backgroundColor: colors.background
  }), [colors.background]);

  return (
      <View style={containerStyle}>
        <HeaderBar title={headerTitle} />
        <Tab.Navigator screenOptions={screenOptions} id={"tab"}>
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

export default React.memo(TabsStack);