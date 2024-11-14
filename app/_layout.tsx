import { useAuth } from '@/hooks/useAuth';
import { AuthContextProvider } from '../contexts/authContext';
import { Redirect, Slot } from 'expo-router';

export default function RootLayout() {
  const auth = useAuth();
  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
