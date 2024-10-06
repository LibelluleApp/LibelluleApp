import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import refreshData from "../api/User/refreshData";

function useAsyncState(initialValue = [true, null]) {
    return useReducer((state, action) => [false, action], initialValue);
}

// Fonction pour définir un élément dans le Secure Store
export async function setStorageItemAsync(key, value) {
    if (value == null) {
        await SecureStore.deleteItemAsync(key);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
}

// Fonction pour récupérer un élément du Secure Store avec gestion d'erreur
async function getStorageItemAsync(key) {
    try {
        const value = await SecureStore.getItemAsync(key);
        if (!value) {
            throw new Error(`No value found for key: ${key}`);
        }
        return value;
    } catch (error) {
        console.error("Error accessing Secure Store:", error);
        // En cas d'erreur, on supprime les données liées
        await SecureStore.deleteItemAsync(key);
        return null; // Retourne null pour forcer une réinitialisation
    }
}

// Hook personnalisé pour gérer l'état du stockage sécurisé
export function useStorageState(key) {
    const [state, setState] = useAsyncState([true, null]); // [isLoading, value]

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            const value = await getStorageItemAsync(key);
            if (isMounted) {
                setState(value);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [key]);

    const setValue = useCallback(
        async (value) => {
            setState(value);
            await setStorageItemAsync(key, value);

        },
        [key]
    );

    return [state, setValue];
}
