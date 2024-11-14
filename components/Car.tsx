import { StyleSheet, Text, View, Image, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from "react";
import TextSituation from "./TextSituation";
import { Address, Situation } from "@/models/position";
import TextEmission from "./TextEmission";
import TextAddress from "./TextAddress";

type CarProps = {
    id: number,
    color: string,
    plate: string
    situation: Situation,
    address: Address
    emission: Date,
    style: StyleProp<ViewStyle>
}

const Car: React.FC<CarProps> = memo((props: CarProps) => {
    return (
        <View style={{...props.style,...styles.container}}>
            <LinearGradient
                colors={[props.color, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            />
            <Image source={{ uri: "https://api.xpsystems.com.br/Image/VehicleIcon/" + props.id }} style={styles.carImage} />
            <View style={styles.infoContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextSituation situation={props.situation.id} description={props.situation.description} margin={3}/>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextEmission emission={props.emission} margin={3} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextAddress address={props.address} margin={3} />
                </View>
            </View>
            <Text style={styles.carPlateText}>{props.plate}</Text>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#333',
        position: 'relative',
        overflow: 'hidden'
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