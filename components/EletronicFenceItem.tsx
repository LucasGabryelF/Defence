import { StyleSheet, View, Image, ViewStyle, StyleProp, TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useState } from "react";
import TextDescription from "./TextDescription";
import { router } from "expo-router";
import Spinner from "./Spinner";

import * as EletronicFenceService from '@/services/eletronicFenceService';

type EletronicFenceItemProps = {
    id: number,
    color: string,
    description: string,
    style: StyleProp<ViewStyle>
}

const Car: React.FC<EletronicFenceItemProps> = memo((props: EletronicFenceItemProps) => {
    var [spinnerVisible, setSpinnerVisible] = useState(false);

    function onPressEdit(): void {
        if (props?.id != undefined)
            router.push("/fences/add?id=" + props?.id)
        else
            router.push("/fences")
    }

    async function onPressDelete(event: GestureResponderEvent): Promise<void> {
        setSpinnerVisible(true);
        try {
            await EletronicFenceService.remove(props?.id)
            alert(`Cerca "${props?.description}" foi deletada com sucesso`);
            router.push("/fences")
        } catch (e) {
            alert("Não foi possível deletar a cerca");
        }
    }

    return (
        <View style={{...props.style,...styles.container}}>
            {spinnerVisible && (<Spinner style={{left:0, top: 0, borderRadius: 8}}/>)}
            <LinearGradient
                colors={[props.color, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            />
            <Image source={require("@/assets/icons/fence_better.svg")} style={styles.carImage} />
            <View style={styles.infoContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextDescription description={props.description} margin={3} />
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onPressEdit}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPressDelete}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
            </View>
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
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10,
        marginBottom: 10,
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '25%',
        borderRadius: 10,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Car;