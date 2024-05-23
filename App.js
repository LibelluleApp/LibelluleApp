import React, { useEffect } from "react";
import { Text, View, StatusBar, TextInput, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import * as NavigationBar from "expo-navigation-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./stacks/AppStack";
import AuthStack from "./stacks/AuthStack";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/AuthContext";
import moment from "moment";
import { useFonts } from "expo-font";
import "moment/locale/fr"; // Importer la locale française

// Définir la locale sur "fr" pour traduire les dates en français
moment.locale("fr");

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
  if (Platform.OS === "android") {
    NavigationBar.setVisibilityAsync("hidden");
  }
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
  }, []);

  const fontConfig = {
    Ubuntu_300Light: require("./assets/fonts/Ubuntu/Ubuntu-Light.otf"),
    Ubuntu_300Light_Italic: require("./assets/fonts/Ubuntu/Ubuntu-LightItalic.otf"),
    Ubuntu_400Regular: require("./assets/fonts/Ubuntu/Ubuntu-Regular.otf"),
    Ubuntu_400Regular_Italic: require("./assets/fonts/Ubuntu/Ubuntu-Italic.otf"),
    Ubuntu_500Medium: require("./assets/fonts/Ubuntu/Ubuntu-Medium.otf"),
    Ubuntu_500Medium_Italic: require("./assets/fonts/Ubuntu/Ubuntu-MediumItalic.otf"),
    Ubuntu_700Bold: require("./assets/fonts/Ubuntu/Ubuntu-Bold.otf"),
    Ubuntu_700Bold_Italic: require("./assets/fonts/Ubuntu/Ubuntu-BoldItalic.otf"),
  };

  if (Platform.OS === "android") {
    fontConfig.Ubuntu_400Regular = require("./assets/fonts/Ubuntu/Ubuntu-Regular-Fix.ttf");
    fontConfig.Ubuntu_500Medium = require("./assets/fonts/Ubuntu/Ubuntu-Medium-Fix.ttf");
    fontConfig.Ubuntu_700Bold = require("./assets/fonts/Ubuntu/Ubuntu-Bold-Fix.ttf");
    fontConfig.Ubuntu_300Light = require("./assets/fonts/Ubuntu/Ubuntu-Light-Fix.ttf");
    fontConfig.Ubuntu_400Regular_Italic = require("./assets/fonts/Ubuntu/Ubuntu-Italic-Fix.ttf");
    fontConfig.Ubuntu_500Medium_Italic = require("./assets/fonts/Ubuntu/Ubuntu-MediumItalic-Fix.ttf");
    fontConfig.Ubuntu_700Bold_Italic = require("./assets/fonts/Ubuntu/Ubuntu-BoldItalic-Fix.ttf");
    fontConfig.Ubuntu_300Light_Italic = require("./assets/fonts/Ubuntu/Ubuntu-LightItalic-Fix.ttf");
  }

  const [fontsLoaded] = useFonts(fontConfig);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthStackSwitcher />
        <FlashMessage
          position="top"
          hideStatusBar={false}
          statusBarHeight={StatusBar.currentHeight}
        />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
