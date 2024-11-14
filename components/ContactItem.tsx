import { memo, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/globals/colors";
import { router } from "expo-router";

import * as ContactService from '@/services/contactService';
import Spinner from "./Spinner";

type ContactItemProps = {
    description: string,
    type: number,
    value: string,
    id: number | undefined,
}

const ContactItem: React.FC<ContactItemProps> = memo((props: ContactItemProps) => {
    var [spinnerVisible, setSpinnerVisible] = useState(false);

    function onPressEdit(): void {
        if (props?.id != undefined)
            router.push("/contacts/add?id=" + props?.id)
        else
            router.push("/contacts")
    }

    async function onPressDelete(event: GestureResponderEvent): Promise<void> {
        setSpinnerVisible(true);
        try {
            await ContactService.remove(props?.id)
            alert(`Contato "${props?.description}" foi deletado com sucesso`);
            router.push("/contacts")
        } catch (e) {
            alert("Não foi possível deletar o contato");
        }
    }

    return (
        <View style={styles.container}>
            {spinnerVisible && (<Spinner style={{left:0, top: 0, borderRadius: 8}}/>)}
            <View style={styles.infoContainer}>
                <View style={{ alignSelf: "center", paddingRight: 5 }}>
                    {![1, 2].includes(props.type) ? <MaterialCommunityIcons name="alert-circle" size={40} color={Colors.text.detail} /> : ""}
                    {props.type == 1 ? <MaterialCommunityIcons name="email" size={40} color={Colors.text.detail} /> : ""}
                    {props.type == 2 ? <MaterialCommunityIcons name="cellphone" size={40} color={Colors.text.detail} /> : ""}
                </View>
                <View>
                    <Text style={styles.contactText}>Nome: {props.description}</Text>
                    <Text style={styles.contactText}>Telefone: {props.value}</Text>
                </View>
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
    )
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        margin: 5,
        flex: 1,
    },
    infoContainer: {

        flexDirection: 'row'
    },
    contactText: {
        color: '#fff',
        marginBottom: 5,
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

export default ContactItem;