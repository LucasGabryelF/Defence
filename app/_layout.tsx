import { useAuth } from '@/hooks/useAuth';
import { AuthContextProvider } from '../contexts/authContext';
import { Redirect, Slot } from 'expo-router';

export default function RootLayout() {
  const auth = useAuth();
  return (
    <AuthContextProvider>
      {!auth.isLogado && (<Redirect href="/(auth)/sign-in"/>)}
      <Slot />
    </AuthContextProvider>
  );
}
