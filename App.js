import "expo-dev-client";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Platform,
  InteractionManager,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import FlashMessage from "react-native-flash-message";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";
import { ThemeProvider } from "./utils/themeContext";
import messaging from "@react-native-firebase/messaging";
import { SessionProvider } from "./context/AuthContext";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AuthStackSwitcher from "./context/AuthStackSwitcher"; // Import the AuthStackSwitcher
import moment from "moment";
import * as Font from "expo-font";
import "moment/locale/fr"; // Import the French locale
import {
  hasMigratedFromAsyncStorage,
  migrateFromAsyncStorage,
} from "./utils/storage";
import {isLoaded, useFonts} from "expo-font";
moment.locale("fr"); // Set the locale to French

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

function App() {
  const [loaded, error] = useFonts(fontConfig);
  const [hasMigrated, setHasMigrated] = useState(hasMigratedFromAsyncStorage);



  useEffect(() => {
    const configureNavBar = async () => {
      try {
        if (Platform.OS === "android") {
          await NavigationBar.setPositionAsync("absolute");
          await NavigationBar.setBackgroundColorAsync("#FFFFFF00");
          await NavigationBar.setVisibilityAsync("hidden");
          await NavigationBar.setBehaviorAsync("overlay-swipe");
          setStatusBarHidden(false, "none");
        }
      } catch (error) {
        console.error('Error configuring navigation bar:', error);
      }
    };

    configureNavBar();

    return () => {
      if (Platform.OS === "android") {
        NavigationBar.setVisibilityAsync("visible")
            .catch(error => console.error('Error restoring navigation bar:', error));
        setStatusBarHidden(false, "none");
      }
    };
  }, []);
  useEffect(() => {
    if (!hasMigratedFromAsyncStorage) {
      InteractionManager.runAfterInteractions(async () => {
        try {
          await migrateFromAsyncStorage();
          setHasMigrated(true);
        } catch (e) {}
      });
    }
  }, []);

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

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
  }, []);

  if (!hasMigrated) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"black"} />
      </View>
    );
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <KeyboardProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SessionProvider>
            <AuthStackSwitcher />
            <FlashMessageWithInsets />
          </SessionProvider>
        </NavigationContainer>
      </SafeAreaProvider>
        </KeyboardProvider>
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
