import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function SignIn() {
    const auth = useAuth();

    if (!auth.isLogado()) return <Slot />
    else return <Redirect href="/(app)/home" />
}
