import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
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
  ];

  return (
    <Stack.Navigator>
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
