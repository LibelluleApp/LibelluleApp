import {Redirect, Slot, Stack} from 'expo-router';
import {SessionProvider, useSession} from '../services/ctx';
import {ThemeProvider} from "../utils/themeContext";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import {Text} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Root() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (session) {
        return <Redirect href="/home" />;
    }

    const [loaded, error] = useFonts({
        'Ubuntu_300Light': require("./assets/fonts/Ubuntu/Ubuntu-Light.otf"),
        'Ubuntu_300Light_Italic': require("./assets/fonts/Ubuntu/Ubuntu-LightItalic.otf"),
        'Ubuntu_400Regular': require("./assets/fonts/Ubuntu/Ubuntu-Regular.otf"),
        'Ubuntu_400Regular_Italic': require("./assets/fonts/Ubuntu/Ubuntu-Italic.otf"),
        'Ubuntu_500Medium': require("./assets/fonts/Ubuntu/Ubuntu-Medium.otf"),
        'Ubuntu_500Medium_Italic': require("./assets/fonts/Ubuntu/Ubuntu-MediumItalic.otf"),
        'Ubuntu_700Bold': require("./assets/fonts/Ubuntu/Ubuntu-Bold.otf"),
        'Ubuntu_700Bold_Italic': require("./assets/fonts/Ubuntu/Ubuntu-BoldItalic.otf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <SessionProvider>
        <ThemeProvider>
                <Stack >
                    <Stack.Screen name="(app)" options={{ headerShown: false }}/>
                    <Stack.Screen name='presentation' options={{ headerShown: false }}/>
                    <Stack.Screen name='login' options={{ headerShown: false }}/>
                </Stack>
                <FlashMessageWithInsets />
        </ThemeProvider>
        </SessionProvider>
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