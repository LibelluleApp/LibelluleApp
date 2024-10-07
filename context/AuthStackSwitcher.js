import React, { useState, useEffect } from "react";
import {ActivityIndicator, Text, View, StyleSheet, Image} from 'react-native';
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
    const styles = StyleSheet.create({
        backLoading: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0760FB",
        },
        imgContainer: {
            marginBottom: 20,
        },
        img: {
            width: 350,
            height: 350,
        },
    });
    if (loading) {
        return (
            <View style={styles.backLoading}>
                <View style={styles.imgContainer}>
                    <Image
                        source={require("../assets/adaptive-icon.png")}
                        style={styles.img}
                    />
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 20,
                            fontFamily: "Ubuntu_500Medium",
                            alignSelf: "center",
                            marginBottom: 20,
                        }}
                    >
                        Chargement...
                    </Text>
                </View>
                <ActivityIndicator size="large" color={"#fff"} />
            </View>
        );
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

