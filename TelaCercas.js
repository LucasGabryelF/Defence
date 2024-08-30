import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import mapaImage from './assets/mapacercas.png';
import predioImage from './assets/predio.png';

export default function TelaCercas({ navigation }) {
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

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.infoSection}>
          <View style={styles.infoColumn}>
            <View style={styles.infoContainer}>
              <LinearGradient
                colors={['rgba(0, 255, 0, 0.5)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
              />
              <Image source={predioImage} style={styles.predioImage} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.cityName}>{"Vargem Grande do Sul"}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.buttonSmall}>
                    <Text style={styles.buttonTextSmall}>Contatos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonSmall}>
                    <Text style={styles.buttonTextSmall}>Veículos</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.infoContainer}>
              <LinearGradient
                colors={['rgba(0, 255, 0, 0.5)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
              />
              <Image source={predioImage} style={styles.predioImage} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.cityName}>{"São João da Boa Vista"}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.buttonSmall}>
                    <Text style={styles.buttonTextSmall}>Contatos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonSmall}>
                    <Text style={styles.buttonTextSmall}>Veículos</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Image source={mapaImage} style={styles.mapImage} />
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
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  infoSection: {
    width: '40%',
    justifyContent: 'flex-start',
  },
  infoColumn: {
    width: '100%',
    marginBottom: 10,
  },
  mapImage: {
    width: 550,
    height: 550,
    resizeMode: 'cover',
    marginLeft: 250,
    marginTop: -10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    width: '70%',
    backgroundColor: '#333',
    marginLeft: 20,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '20%',
    borderRadius: 8,
  },
  predioImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  infoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cityName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSmall: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#444',
    margin: 5,
    width: '45%',
  },
  buttonTextSmall: {
    color: '#fff',
    textAlign: 'center',
  },
});
