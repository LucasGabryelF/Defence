import { View } from 'react-native';
import { Redirect, Slot } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';

export default function AppLayout() {
    const auth = useAuth();

    if (!auth.isLogado()) {
        return <Redirect href="/sign-in" />;
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <Slot />
            </View>);
    }
}
