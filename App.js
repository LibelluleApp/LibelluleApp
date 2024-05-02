import React from "react";
import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { useFonts } from "expo-font";
import {
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
} from "@expo-google-fonts/ubuntu";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./stacks/AppStack";
import AuthStack from "./stacks/AuthStack";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

function AuthStackSwitcher() {
  const { isAuthenticated } = useAuth(); // utilisation de useAuth pour déterminer quelle stack afficher

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
}

function App() {

  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (

    <NavigationContainer>
      <AuthProvider>
        <AuthStackSwitcher />
        <FlashMessage position="top" hideStatusBar={false}
  statusBarHeight={StatusBar.currentHeight}/>
      </AuthProvider>
    </NavigationContainer>

  );
}

export default App;
