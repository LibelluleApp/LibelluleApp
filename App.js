import React, { useEffect } from "react";
import { Text, View, StatusBar, TextInput } from "react-native";
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
NavigationBar.setVisibilityAsync("hidden");
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
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
  }, []);
  const [fontsLoaded] = useFonts({
    Ubuntu_Light: require("./assets/fonts/Ubuntu/Ubuntu-Light.otf"),
    Ubuntu_Light_Italic: require("./assets/fonts/Ubuntu/Ubuntu-LightItalic.otf"),
    Ubuntu_400Regular: require("./assets/fonts/Ubuntu/Ubuntu-Regular.otf"),
    Ubuntu_Regular_Italic: require("./assets/fonts/Ubuntu/Ubuntu-Italic.otf"),
    Ubuntu_500Medium: require("./assets/fonts/Ubuntu/Ubuntu-Medium.otf"),
    Ubuntu_Medium_Italic: require("./assets/fonts/Ubuntu/Ubuntu-MediumItalic.otf"),
    Ubuntu_700Bold: require("./assets/fonts/Ubuntu/Ubuntu-Bold.otf"),
    Ubuntu_Bold_Italic: require("./assets/fonts/Ubuntu/Ubuntu-BoldItalic.otf"),
    HindSiliguri_400Regular: require("./assets/fonts/HindSiliguri-Regular.ttf"),
    HindSiliguri_500Medium: require("./assets/fonts/HindSiliguri-Medium.ttf"),
    HindSiliguri_700Bold: require("./assets/fonts/HindSiliguri-Bold.ttf"),
    SFProTextBlack: require("./assets/fonts/SFProText/SF-Pro-Text-Black.otf"),
    SFProTextBold: require("./assets/fonts/SFProText/SF-Pro-Text-Bold.otf"),
    SFProTextHeavy: require("./assets/fonts/SFProText/SF-Pro-Text-Heavy.otf"),
    SFProTextLight: require("./assets/fonts/SFProText/SF-Pro-Text-Light.otf"),
    SFProTextMedium: require("./assets/fonts/SFProText/SF-Pro-Text-Medium.otf"),
    SFProTextRegular: require("./assets/fonts/SFProText/SF-Pro-Text-Regular.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProText/SF-Pro-Text-Semibold.otf"),
    SFProTextThin: require("./assets/fonts/SFProText/SF-Pro-Text-Thin.otf"),
    SFProTextBlackItalic: require("./assets/fonts/SFProText/SF-Pro-Text-BlackItalic.otf"),
    SFProTextBoldItalic: require("./assets/fonts/SFProText/SF-Pro-Text-BoldItalic.otf"),
    SFProTextHeavyItalic: require("./assets/fonts/SFProText/SF-Pro-Text-HeavyItalic.otf"),
    SFProTextLightItalic: require("./assets/fonts/SFProText/SF-Pro-Text-LightItalic.otf"),
    SFProTextMediumItalic: require("./assets/fonts/SFProText/SF-Pro-Text-MediumItalic.otf"),
    SFProTextRegularItalic: require("./assets/fonts/SFProText/SF-Pro-Text-RegularItalic.otf"),
    SFProTextSemiboldItalic: require("./assets/fonts/SFProText/SF-Pro-Text-SemiboldItalic.otf"),
    SFProTextThinItalic: require("./assets/fonts/SFProText/SF-Pro-Text-ThinItalic.otf"),
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
