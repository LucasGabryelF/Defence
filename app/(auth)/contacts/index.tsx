import React, { useEffect, useState } from 'react';
import { Colors } from '@/globals/colors';
import { Contact } from '@/models/contact';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


import * as ContactServices from '@/services/contactService';
import Spinner from '@/components/Spinner';
import ContactItem from '@/components/ContactItem';
import { router } from 'expo-router';

export default function ContactsScreen() {
    const [contacts, setContacts] = useState<Contact[]>();

    var [spinnerVisible, setSpinnerVisible] = useState(true)

    useEffect(() => {
        getContacts();

        async function getContacts() {

            const _contacts = await ContactServices.getAll();
            if (_contacts) {
                setContacts(_contacts);
            }

            setSpinnerVisible(false);
        }

    }, []);

    return (
        <View style={styles.container}>
            {spinnerVisible && (<Spinner />)}
            <FlatList
                style={styles.list}
                data={contacts}
                renderItem={({ item }) => (
                    <View style={{ flex: 0.25 }}>
                        <ContactItem id={item.id} description={item.description ?? "Desconhecido"} type={item.type ?? -1} value={item.value ?? "N/A"}></ContactItem>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                numColumns={4}
            />
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/contacts/add')}>
                <MaterialCommunityIcons name="plus-thick" size={48} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    listContainer: {
        paddingBottom: 20,
    },
    list: {
        paddingTop: 10,
        paddingHorizontal: 10,
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        zIndex: 10,
    },
    backButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    actionButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 80,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.success
    }
});
