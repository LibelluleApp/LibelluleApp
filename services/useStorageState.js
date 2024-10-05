import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';

function useAsyncState(initialValue = [true, null]) {
    return useReducer((state, action) => [false, action], initialValue);
}

export async function setStorageItemAsync(key, value) {
    if (value == null) {
        await SecureStore.deleteItemAsync(key);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
}

export function useStorageState(key) {
    const [state, setState] = useAsyncState();

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            const value = await SecureStore.getItemAsync(key);
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
