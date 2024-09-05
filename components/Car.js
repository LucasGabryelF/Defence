import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import carImage from '../assets/Icons/car_green.svg';

const Car = ({ item }) => {
    return (
        <View style={styles.infoContainer}>
            <LinearGradient
                colors={[item.color, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            />
            <Image source={carImage} style={styles.carImage} />
            <View style={styles.infoTextContainer}>
                <Text style={styles.cityName}>{item.city}</Text>
                <Text style={styles.entryTime}>{item.emission}</Text>
            </View>
            <Text style={styles.carPlate}>{item.plate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    carImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 10,
        marginBottom: 10,
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

export default Car;