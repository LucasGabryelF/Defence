import { Colors } from '@/globals/colors';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ContactType, ContactTypeType } from '@/enums/contactType';
import { router, useLocalSearchParams } from 'expo-router';

import * as ContactService from '@/services/contactService'
import Spinner from '@/components/Spinner';

export default function Add() {
    const params = useLocalSearchParams();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(true);
    var [spinnerVisible, setSpinnerVisible] = useState(true)

    const [type, setType] = useState<ContactTypeType>();
    const [value, setValue] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const id = Number.parseInt(params.id as string ?? "0");

    useEffect(() => {
        getContact(Number.parseInt(params.id as string ?? "0"))
    }, [])

    async function getContact(id: number) {
        if (!id || id <= 0) {
            setUpdating(false)
            setSpinnerVisible(false);
            return;
        }

        try {
            const contact = await ContactService.getById(id);

            setDescription(contact.description);
            setValue(contact.value);
            setType(ContactType.find(x => x.id == contact.type));
        } catch (e) {
            alert("Não foi possível encontrar o contato");
        }
        finally {
            setIsLoaded(true);
            setSpinnerVisible(false);
        }
    }

    async function onPressSave(event: GestureResponderEvent): Promise<void> {
        if (!type || !type.id) {
            alert("Selecione o tipo do contato");
            return;
        }

        setIsLoaded(false);
        setSpinnerVisible(true);
        if (updating)
            try {
                await ContactService.update({
                    description: description,
                    value: value,
                    type: type.id,
                    id: id
                })
                alert(`Contato "${description}" foi atualizada com sucesso`);
                router.dismiss(1)
            } catch (e) {
                console.log(e)
                alert("Não foi possível atualizar o contato");
            }
        else
            try {
                await ContactService.create({
                    description: description,
                    value: value,
                    type: type.id,
                    id: id
                })
                alert(`Contato "${description}" foi criada com sucesso`);
                router.dismiss(1)
            } catch (e) {
                console.log(e)
                alert("Não foi possível criar o contato");
            }
        setSpinnerVisible(false);
        setIsLoaded(true);
    }

    async function onPressCancel(event: GestureResponderEvent): Promise<void> {
        router.push("/fences")
    }

    return (
        <View style={styles.container}>
            {spinnerVisible && (<Spinner />)}
            <Text style={styles.title}>{updating ? "Editar Contato" : "Cadastro de Contato"}</Text>
            <View style={styles.formContainer}>
                <View style={styles.labelRow}>
                    <Text style={styles.labelText}>Nome do contato:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.labelRow}>
                    <Text style={styles.labelText}>Meio de contato:</Text>
                </View>
                <Dropdown
                    data={ContactType}
                    style={styles.input}
                    placeholder='Selecione o tipo'
                    value={type}
                    containerStyle={{ backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}
                    placeholderStyle={{ fontSize: 14 }}
                    itemTextStyle={{ fontSize: 14 }}
                    selectedTextStyle={{ fontSize: 14 }}
                    labelField={"name"}
                    valueField={"id"}
                    iconStyle={{
                        width: 20,
                        height: 20,
                    }}
                    onChange={function (item: ContactTypeType): void {
                        setType(item)
                    }} />
                <View style={styles.labelRow}>
                    <Text style={styles.labelText}>Digite o {ContactType.find(x => x.id == type?.id)?.name ?? "meio de contato"}:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ ...styles.button, ... { backgroundColor: Colors.success } }} onPress={onPressSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, ... { backgroundColor: Colors.danger } }} onPress={onPressCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1c1b22'
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formContainer: {
        width: '40%',
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
    },
    button: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    labelRow: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 5
    },
    labelText: {
        color: Colors.text.primary,
        fontSize: 16
    }
});
