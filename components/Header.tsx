import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default function Header() {
  const auth = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.headerLeft}>Olá, {auth.Usuario?.username}!</Text>
      <View style={styles.headerRight}>

        <TouchableOpacity style={styles.button} /*onPress={() => navigation.navigate('Login')}*/>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} /*onPress={() => navigation.navigate('TelaContatos')}*/>
          <Text style={styles.buttonText}>Contatos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} /*onPress={() => navigation.navigate('TelaCercas')}*/>
          <Text style={styles.buttonText}>Cercas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDanger} onPress={() => {
          auth.logout();
          <Redirect href={"/(auth)/sign-in"}/>
        }} >
          <Text style={styles.buttonTextDanger}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333',
  },
  headerLeft: {
    color: '#fff',
    fontSize: 18,
  },
  headerRight: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
  },
  buttonDanger: {
    borderWidth: 1,
    borderColor: '#fa6161',
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  buttonTextDanger: {
    color: '#fa6161',
  }
});