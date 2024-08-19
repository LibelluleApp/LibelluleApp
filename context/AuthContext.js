import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import login from "../api/User/login";
import ApiManager, { setupInterceptor } from "../api/ApiManager";
import fetchToken from "../api/User/fetchtoken";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const TOKEN_KEY = "secure_user_token";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const clearAllData = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync("email_edu");
      await SecureStore.deleteItemAsync("mdpMail");
      await SecureStore.deleteItemAsync("authToken");
      await asyncStorage.removeItem("user_data");
    } catch (error) {
      console.error("Erreur lors du nettoyage des données.", error);
    }
  };

  const checkTokenValidity = async () => {
    try {
      if (userToken) {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
          showMessage({
            message: "Vous êtes hors ligne. Certaines fonctionnalités peuvent ne pas être disponibles.",
            type: "warning",
            titleStyle: { fontFamily: "Ubuntu_400Regular" },
            statusBarHeight: 15,
          });
          return;
        }

        const response = await fetchToken(userToken);
        if (response.status !== "success") {
          showMessage({
            message: "Votre session a expiré. Veuillez vous reconnecter.",
            type: "warning",
            titleStyle: { fontFamily: "Ubuntu_400Regular" },
            statusBarHeight: 15,
          });
          await signOut();
        }
      }
    } catch (error) {
      showMessage({
        message: "Erreur lors de la vérification de votre session.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
        statusBarHeight: 15,
      });
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await clearAllData();
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          const response = await fetchToken(storedToken);
          if (response.status === "success") {
            setUserToken(storedToken);
            setIsAuthenticated(true);
          } else {
            await signOut();
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement du token.", error);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    setupInterceptor(() => userToken);
    checkTokenValidity();
  }, [userToken]);

  const signIn = async (email_edu, mot_de_passe) => {
    try {
      const result = await login(email_edu, mot_de_passe);
      if (result.status === "success") {
        const token = result.token; // Supposant que vous recevez le token ici
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        setUserToken(token);
        setIsAuthenticated(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "AppStack" }],
        });
      }
      return result;
    } catch (error) {
      console.error("Connexion échouée. Veuillez réessayer.", error);
      throw new Error("Connexion échouée. Veuillez réessayer.");
    }
  };

  const signOut = async () => {
    try {
      await clearAllData();
      setUserToken(null);
      setIsAuthenticated(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion. Veuillez réessayer.", error);
      throw new Error("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ alignSelf: "center" }} />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
