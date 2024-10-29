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
    {
      name: "Register",
      component: require("../views/Auth/Register").default,
      options: {
        title: "Créer un compte",
        headerShadowVisible: false,
        headerShown: false,
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
        headerTintColor: colors.blue950,
        headerTitleStyle: {
          fontFamily: "Ubuntu_500Medium",
          fontSize: 18,
          color: colors.blue950,
        },
        headerBackTitle: "Retour",
        headerBackTitleStyle: {
          fontFamily: "Ubuntu_400Regular",
          fontSize: 16,
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
