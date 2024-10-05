import React, { useContext, createContext } from 'react';
import { useStorageState } from './useStorageState';
import login from '../api/User/login'
import {showMessage} from "react-native-flash-message";

const AuthContext = createContext({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// Ce hook peut être utilisé pour accéder aux informations de session.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }) {
    const [[isLoading, session], setSession] = useStorageState('secure_user_token');
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
            setSession(data.token);
        } catch (error) {
            showMessage({
                message: error.message,
                type: "danger",
                titleStyle: { fontFamily: "Ubuntu_400Regular" },
            });
        }
    };

    const signOut = () => {
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
