import { StyleSheet, Text, View, Image, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from "react";
import TextSituation from "./TextSituation";
import TextEmission from "./TextEmission";
import TextAddress from "./TextAddress";
import { PositionEletronicFence } from "@/models/positionEletronicFence";
import TextFenceName from "./TextFenceName";
import TextFenceStatus from "./TextFenceStatus";

type PositionEFItemProps = {
    positionEF: PositionEletronicFence
    style: StyleProp<ViewStyle>
}

const PositionEFItem: React.FC<PositionEFItemProps> = memo((props: PositionEFItemProps) => {
    return (
        <View style={{...props.style,...styles.container}}>
            <LinearGradient
                colors={[props.positionEF.vehicle.color, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            />
            <Image source={{ uri: "https://api.xpsystems.com.br/Image/VehicleIcon/" + props.positionEF.vehicle.id }} style={styles.carImage} />
            <View style={styles.infoContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextFenceName name={props.positionEF.eletronicFence.description} margin={3}></TextFenceName>                    
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextFenceStatus isExit={props.positionEF.eletronicFenceStatus.isExit} isEntrance={props.positionEF.eletronicFenceStatus.isEntrance} margin={3}></TextFenceStatus>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextEmission emission={props.positionEF.emission} margin={3} />
                </View>
            </View>
            <Text style={styles.carPlateText}>{props.positionEF.vehicle.plate}</Text>
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

export default PositionEFItem;