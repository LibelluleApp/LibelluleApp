import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '../../services/ctx';
export default function AppLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (!session) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
