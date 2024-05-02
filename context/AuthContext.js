import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import login from "../api/User/login";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const TOKEN_KEY = "secure_user_token";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  // Charge le token initial
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          setUserToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        throw new Error("Erreur lors du chargement du token.");
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);

  // Fonction de connexion
  const signIn = async (edu_mail, password) => {
    try {
      const result = await login(edu_mail, password);

      if (result.status === "success") {
        setUserToken(await SecureStore.getItemAsync(TOKEN_KEY));
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
      throw new Error("Connexion échouée. Veuillez réessayer.");
    }
  };

  // Fonction de déconnexion
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
      throw new Error("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };

  if (isLoading) {
    return <Text>Loading....</Text>; // Afficher un indicateur de chargement
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
