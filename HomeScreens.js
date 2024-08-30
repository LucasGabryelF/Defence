import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import mapaImage from './assets/mapa.png';
import carImage from './assets/carro.png';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLeft}>Olá, Fabricio!</Text>
        <View style={styles.headerRight}>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaContatos')}>
            <Text style={styles.buttonText}>Contatos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaCercas')}>
            <Text style={styles.buttonText}>Cercas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={mapaImage} style={styles.mapImage} />

      <View style={styles.infoRow}>
        <View style={styles.infoContainer}>
          <LinearGradient
            colors={['rgba(0, 255, 0, 0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          />
          <Image source={carImage} style={styles.carImage} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.cityName}>{"Vargem Grande do Sul"}</Text>
            <Text style={styles.entryTime}>Entrada às 13:30</Text>
          </View>
          <Text style={styles.carPlate}>BTJ8724</Text>
        </View>

        <View style={styles.infoContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 0, 0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          />
          <Image source={carImage} style={styles.carImage} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.cityName}>{"Vargem Grande do Sul"}</Text>
            <Text style={styles.entryTime}>Entrada às 13:30</Text>
          </View>
          <Text style={styles.carPlate}>DKL8043</Text>
        </View>

        <View style={styles.infoContainer}>
          <LinearGradient
            colors={['rgba(255, 0, 0, 0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          />
          <Image source={carImage} style={styles.carImage} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.cityName}>{"Vargem Grande do Sul"}</Text>
            <Text style={styles.entryTime}>Entrada às 13:30</Text>
          </View>
          <Text style={styles.carPlate}>FJ09923</Text>
        </View>
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
  mapImage: {
    width: '96%',
    height: 390,
    resizeMode: 'cover',
    marginHorizontal: '2%',
    marginTop: 20, // Adicionado espaçamento superior
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
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '20%',
    borderRadius: 8,
  },
  carImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  infoTextContainer: {
    flex: 1,
  },
  cityName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  entryTime: {
    color: '#aaa',
    fontSize: 17,
  },
  carPlate: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});