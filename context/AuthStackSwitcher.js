import React, { useState, useEffect } from "react";
import {Text} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSession } from "./AuthContext";
import AppStack from "../stacks/AppStack";
import AuthStack from "../stacks/AuthStack";
import OfflineScreen from "../views/Offline/Offline";
import NetInfo from "@react-native-community/netinfo";
import refreshData from "../api/User/refreshData";


const Stack = createNativeStackNavigator();

const AuthStackSwitcher = () => {
    const { session, loading } = useSession();
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOnline(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    if (!isOnline) {
        return <OfflineScreen />;
    }

    if (loading) {
        return <Text>Chargement...</Text>;
    }


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "fade",
                animationDuration: 150,
            }}
        >
            {session ? (
                <Stack.Screen name="AppStack" component={AppStack} />
            ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default AuthStackSwitcher;

