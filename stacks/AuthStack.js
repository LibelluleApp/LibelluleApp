import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "../utils/themeContext";
const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
  const { colors } = React.useContext(ThemeContext);
  const views = [
    {
      name: "HomeAuth",
      component: require("../views/Auth/Home").default,
      options: {
        headerShown: false,
      },
    },
    {
      name: "Login",
      component: require("../views/Auth/Login").default,
      options: {
        headerShown: false,
      },
    },
    {
      name: "LostPassword",
      component: require("../views/Auth/LostPassword").default,
      options: {
        title: "Mot de passe oublié",
        headerShadowVisible: false,
      },
    },
  ];

  return (
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
      {views.map((view, index) => (
        <Stack.Screen
          key={index}
          name={view.name}
          component={view.component}
          options={view.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
