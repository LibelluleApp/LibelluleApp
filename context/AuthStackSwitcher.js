import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./AuthContext";
import AppStack from "../stacks/AppStack";
import AuthStack from "../stacks/AuthStack";
import OfflineScreen from "../views/Offline/Offline";
import NetInfo from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();

const AuthStackSwitcher = () => {
  const { isAuthenticated } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isOnline === false) {
    return <OfflineScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
        animationDuration: 150,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AuthStackSwitcher;
