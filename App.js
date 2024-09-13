import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreens';
import TelaCercas from './TelaCercas';
import TelaCadastro from './TelaCadastro';
import TelaContatos from './TelaContatos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TelaCercas" 
          component={TelaCercas} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TelaCadastro" 
          component={TelaCadastro} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TelaContatos" 
          component={TelaContatos} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
