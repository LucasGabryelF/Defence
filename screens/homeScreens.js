import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView from "../map";
import { StatusBar } from 'expo-status-bar';

import Car from '../components/Car';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLeft}>Olá, Fabricio!</Text>
        <View style={styles.headerRight}>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaContatos')}>
            <Text style={styles.buttonText}>Contatos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaCercas')}>
            <Text style={styles.buttonText}>Cercas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <MapView style={styles.map}
          provider='google'
          googleMapsApiKey={process.env.EXPO_PUBLIC_MAPS_API_KEY}
          initialRegion={{
            latitude: -15.793735,
            longitude: -47.882293,
          }}

        />
      </View>

      <View style={styles.infoRow}>
        <Car item={{ color: "green", fenceName: "Vargem Grande do Sul", emission: "2024/08/26 20:08:22", plate: "BTJ8724" }}> </Car>
        <Car item={{ color: "green", fenceName: "Vargem Grande do Sul", emission: "2024/08/26 20:08:22", plate: "BTJ8724" }}> </Car>
        <Car item={{ color: "green", fenceName: "Vargem Grande do Sul", emission: "2024/08/26 20:08:22", plate: "BTJ8724" }}> </Car>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b22',
  },
  map: {
    width: '100%',
    height: '100%',
  },
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1c1b22',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    width: '30%',
    backgroundColor: '#333',
    position: 'relative',
  }
});