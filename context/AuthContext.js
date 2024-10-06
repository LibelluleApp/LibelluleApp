import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import login from "../api/User/login";
import {setupInterceptor} from "../api/ApiManager";

// Créez le contexte
const AuthContext = createContext();

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signIn = async (username, password) => {
    try {
      const data = await login(username, password);
      if (data.status === "error") {
        showMessage({
          message: data.message,
          type: "danger",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
        });
      } else if(data.status === "warning"){
        showMessage({
          message: data.message,
          type: "warning",
          titleStyle: { fontFamily: "Ubuntu_400Regular" },
        })}
      await SecureStore.setItemAsync('secure_user_token', data.token);
      setSession(data.token);
    } catch (error) {
      showMessage({
        message: error.message,
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('secure_user_token');
    setSession(null);

  };


  const checkToken = async () => {
    const token = await SecureStore.getItemAsync('secure_user_token');
    if (token) {
      setSession(token);
      setupInterceptor(() => token)
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
      <AuthContext.Provider value={{ session, signIn, signOut, loading, error }}>
        {children}
      </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
