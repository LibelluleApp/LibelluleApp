import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import login from "../api/User/login";
import {setupInterceptor} from "../api/ApiManager";
import refreshData from "../api/User/refreshData";
import {getUserData} from "../utils/storage";

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

  const showNotification = (message, type = "danger") => {
    showMessage({
      message,
      type,
      titleStyle: { fontFamily: "Ubuntu_400Regular" },
    });
  };

  const signIn = async (username, password) => {
    try {
      const data = await login(username, password);

      if (data.status === "error" || data.status === "warning") {
        showNotification(data.message, data.status);
        return false;
      }

      setupInterceptor(() => data.token);
      await SecureStore.setItemAsync('secure_user_token', data.token);
      setSession(data.token);
      return true;
    } catch (error) {
      showNotification(error.message);
      setError(error.message);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('secure_user_token');
      setSession(null);
      setError(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      showNotification('Failed to sign out properly');
    }
  };

  const checkToken = async () => {
    try {
      setLoading(true);
      const userData = getUserData();

      if (!userData) {
        await signOut();
        return;
      }

      const token = await SecureStore.getItemAsync('secure_user_token');

      if (token) {
        setupInterceptor(() => token);
        setSession(token);
        await refreshData();
      } else {
        await signOut();
      }
    } catch (error) {
      console.error('Error checking token:', error);
      setError(error.message);
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    // Consider adding a cleanup function if needed
    return () => {
      // Cleanup logic here if necessary
    };
  }, []);

  const contextValue = useMemo(() => ({
    session,
    signIn,
    signOut,
    loading,
    error
  }), [session, loading, error]);

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
