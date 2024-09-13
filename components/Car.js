import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import carImage from '../assets/Icons/car_green.svg';

const Car = ({ item }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[item.color, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            />
            <Image source={carImage} style={styles.carImage} />
            <View style={styles.infoContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="select-multiple-marker" size={20} color="#fff" />
                    <Text style={styles.fenceNameText}> {item.fenceName} </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <MaterialIcons name="watch-later" size={20} color="#aaa" />
                    <Text style={styles.emissionText}> {item.emission}</Text>
                </View>
                {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                    <MaterialIcons name="warning-amber" size={24} color="#c70c0c" />
                    <Text style={styles.emissionText}> {item.alert}</Text>
                </View> */}
            </View>
            <Text style={styles.carPlateText}>{item.plate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        width: '30%',
        backgroundColor: '#333',
        position: 'relative',
    },
    infoContainer: {
        flex: 1,
    },
    carImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 10,
        marginBottom: 10,
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '20%',
        borderRadius: 8,
    },
    fenceNameText: {
        color: '#fff',
        fontSize: 20,
    },
    emissionText: {
        color: '#aaa',
        fontSize: 17,
    },
    alertText: {
        color: '#c70c0c',
        fontSize: 17,
    },
    carPlateText: {
        color: '#fff',
        fontSize: 16,
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
});

export default Car;