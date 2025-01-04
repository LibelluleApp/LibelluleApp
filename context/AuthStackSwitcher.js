import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSession } from "./AuthContext";
import AppStack from "../stacks/AppStack";
import AuthStack from "../stacks/AuthStack";
import OfflineScreen from "../views/Offline/Offline";
import NetInfo from "@react-native-community/netinfo";
import refreshData from "../api/User/refreshData";
import { ThemeContext } from "../utils/themeContext";

const Stack = createNativeStackNavigator();

const AuthStackSwitcher = () => {
  const { session, loading } = useSession();
  const [isOnline, setIsOnline] = useState(true);
  const { colors } = useContext(ThemeContext);

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
      backgroundColor: colors.regular700,
    },
    loadingContainer: {
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    imgContainer: {
      marginBottom: 20,
    },
    img: {
      width: 350,
      height: 350,
    },
    imgTitle: {
      color: colors.white,
      fontSize: 17,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      alignSelf: "center",
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
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.white} />
            <Text style={styles.imgTitle}>
              Libellule s’éveille doucement...
            </Text>
          </View>
        </View>
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
      id={"app"}
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
