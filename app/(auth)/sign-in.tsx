import { Redirect, router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as UserService from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import User from '../../models/user';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function SignIn() {
  const auth = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <MaterialIcons name="shield" size={128} color="white" />
        <Text style={styles.formTitle}>DeFENCE</Text>
        <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
        <TextInput style={StyleSheet.compose(styles.input, { marginBottom: 5 })} placeholder="Senha" keyboardType="default" secureTextEntry={true} />
        <View style={styles.controlContainerRight}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={StyleSheet.compose(styles.button, { width: '50%' })} onPress={async () => {
          let result = await UserService.login('tiagoxp.desenvolvedor@gmail.com', '12345');
          if (result.status == 200) {
            await auth.login(result.data.user, result.data.token, result.data.refreshToken, result.data.expires);
            <Redirect href="/(app)/home" />
          }
        }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text
    //     onPress={async () => {
    //       
    //     }}>
    //     Sign In
    //   </Text>
    // </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',

  },
  formContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1b22',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20
  },
  controlContainerRight: {
    marginBottom: 35,
    marginEnd: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '75%',
  },
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    width: '22%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});
