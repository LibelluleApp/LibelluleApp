import "expo-dev-client";
import React, { useEffect } from "react";
import { Text, View, StatusBar, TextInput, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";
import { ThemeProvider } from "./utils/themeContext";
import messaging from "@react-native-firebase/messaging";
import {SessionProvider, useSession} from './context/AuthContext';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import AuthStackSwitcher from "./context/AuthStackSwitcher"; // Import the AuthStackSwitcher
import moment from "moment";
import { useFonts } from "expo-font";
import "moment/locale/fr"; // Import the French locale

moment.locale("fr"); // Set the locale to French

function App() {
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", remoteMessage);
    });
  }, []);

  if (Platform.OS === "android") {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync('#ffffff00');
    NavigationBar.setVisibilityAsync("visible");
    NavigationBar.setBehaviorAsync("inset-touch");
    setStatusBarHidden(true, "none");
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
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SessionProvider>
            <AuthStackSwitcher />
            <FlashMessageWithInsets />
          </SessionProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function FlashMessageWithInsets() {
  const insets = useSafeAreaInsets();

  return (
    <FlashMessage
      position="top"
      hideStatusBar={true}
      statusBarHeight={insets.top}
    />
  );
}

export default App;
