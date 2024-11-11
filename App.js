import "expo-dev-client";
import React, { useEffect, useState, useCallback, memo } from "react";
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
import AuthStackSwitcher from "./context/AuthStackSwitcher";
import moment from "moment";
import "moment/locale/fr";
import {
  hasMigratedFromAsyncStorage,
  migrateFromAsyncStorage,
} from "./utils/storage";
import { useFonts } from "expo-font";


import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';


configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Set French locale
moment.locale("fr");

// Font configuration
const FONT_CONFIG = {
  Ubuntu_300Light: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-Light.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-Light-Fix.ttf"),
  }),
  Ubuntu_300Light_Italic: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-LightItalic.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-LightItalic-Fix.ttf"),
  }),
  Ubuntu_400Regular: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-Regular.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-Regular-Fix.ttf"),
  }),
  Ubuntu_400Regular_Italic: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-Italic.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-Italic-Fix.ttf"),
  }),
  Ubuntu_500Medium: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-Medium.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-Medium-Fix.ttf"),
  }),
  Ubuntu_500Medium_Italic: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-MediumItalic.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-MediumItalic-Fix.ttf"),
  }),
  Ubuntu_700Bold: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-Bold.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-Bold-Fix.ttf"),
  }),
  Ubuntu_700Bold_Italic: Platform.select({
    ios: require("./assets/fonts/Ubuntu/Ubuntu-BoldItalic.otf"),
    android: require("./assets/fonts/Ubuntu/Ubuntu-BoldItalic-Fix.ttf"),
  }),
};

const configureAndroidNavBar = async () => {
  try {
    await Promise.all([
      NavigationBar.setPositionAsync("absolute"),
      NavigationBar.setBackgroundColorAsync("#FFFFFF00"),
      NavigationBar.setVisibilityAsync("hidden"),
      NavigationBar.setBehaviorAsync("overlay-swipe"),
    ]);
    setStatusBarHidden(false, "none");
  } catch (error) {
    console.error('Error configuring navigation bar:', error);
  }
};

const configurePushNotifications = () => {
  const handleInitialNotification = async () => {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
      );
    }
  };

  const notificationListeners = [
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
      );
    }),
    messaging().onMessage(async remoteMessage => {
      console.log("A new FCM message arrived!", remoteMessage);
    }),
  ];

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message handled in the background!", remoteMessage);
  });

  handleInitialNotification();

  return () => notificationListeners.forEach(listener => listener());
};

const configureTextScaling = () => {
  const components = [Text, TextInput, View];
  components.forEach(Component => {
    Component.defaultProps = {
      ...(Component.defaultProps || {}),
      allowFontScaling: false,
    };
  });
};

const LoadingSpinner = memo(() => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="black" />
    </View>
));

const FlashMessageWithInsets = memo(() => {
  const insets = useSafeAreaInsets();
  return (
      <FlashMessage
          position="top"
          hideStatusBar={true}
          statusBarHeight={insets.top}
      />
  );
});

function App() {
  const [loaded, error] = useFonts(FONT_CONFIG);
  const [hasMigrated, setHasMigrated] = useState(hasMigratedFromAsyncStorage);

  useEffect(() => {
    if (Platform.OS === "android") {
      configureAndroidNavBar();
      return () => {
        NavigationBar.setVisibilityAsync("visible")
            .catch(error => console.error('Error restoring navigation bar:', error));
        setStatusBarHidden(false, "none");
      };
    }
  }, []);

  useEffect(() => {
    if (!hasMigratedFromAsyncStorage) {
      InteractionManager.runAfterInteractions(async () => {
        try {
          await migrateFromAsyncStorage();
          setHasMigrated(true);
        } catch (error) {
          console.error('Migration error:', error);
        }
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = configurePushNotifications();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    configureTextScaling();
  }, []);

  if (!hasMigrated) {
    return <LoadingSpinner />;
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

export default memo(App);