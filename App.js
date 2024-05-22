import React, { useEffect } from "react";
import { Text, View, StatusBar, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { loadFonts } from "./utils/fonts/Font";
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
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
  }, []);
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light: require("./assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu_300Light_Italic: require("./assets/fonts/Ubuntu-LightItalic.ttf"),
    Ubuntu_400Regular: require("./assets/fonts/Ubuntu-Regular.ttf"),
    Ubuntu_400Regular_Italic: require("./assets/fonts/Ubuntu-Italic.ttf"),
    Ubuntu_500Medium: require("./assets/fonts/Ubuntu-Medium.ttf"),
    Ubuntu_500Medium_Italic: require("./assets/fonts/Ubuntu-MediumItalic.ttf"),
    Ubuntu_700Bold: require("./assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu_700Bold_Italic: require("./assets/fonts/Ubuntu-BoldItalic.ttf"),
    HindSiliguri_400Regular: require("./assets/fonts/HindSiliguri-Regular.ttf"),
    HindSiliguri_500Medium: require("./assets/fonts/HindSiliguri-Medium.ttf"),
    HindSiliguri_700Bold: require("./assets/fonts/HindSiliguri-Bold.ttf"),
    SFProDisplay_400Regular: require("./assets/fonts/SFProDisplay-Regular.ttf"),
    SFProDisplay_500Medium: require("./assets/fonts/SFProDisplay-Medium.ttf"),
    SFProDisplay_700Bold: require("./assets/fonts/SFProDisplay-Bold.ttf"),
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
