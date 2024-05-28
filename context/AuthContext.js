import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import login from "../api/User/login";
import ApiManager, { setupInterceptor } from "../api/ApiManager";

const TOKEN_KEY = "secure_user_token";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          setUserToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du token.", error);
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);

  useEffect(() => {
    setupInterceptor(() => userToken);
  }, [userToken]);

  const signIn = async (email_edu, mot_de_passe) => {
    try {
      const result = await login(email_edu, mot_de_passe);

      if (result.status === "success") {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        setUserToken(token);
        setIsAuthenticated(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "AppStack" }],
        });
        return result;
      } else {
        return result;
      }
    } catch (error) {
      console.error("Connexion échouée. Veuillez réessayer.", error);
      throw new Error("Connexion échouée. Veuillez réessayer.");
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setUserToken(null);
      setIsAuthenticated(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      });
    } catch (error) {
      console.error(
        "Erreur lors de la déconnexion. Veuillez réessayer.",
        error
      );
      throw new Error("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signOut, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
