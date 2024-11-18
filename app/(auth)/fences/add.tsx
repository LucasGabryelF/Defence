import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, GestureResponderEvent, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { LatLng, MapPressEvent, Marker, MarkerPressEvent, Polygon } from "react-native-maps";
import * as turf from '@turf/turf';

import { Colors } from "@/globals/colors";

import Spinner from "@/components/Spinner";
import EletronicFenceItem from "@/components/EletronicFenceItem";

import mapUtils from "@/utils/mapUtils";
import colorUtils from "@/utils/colorUtils";

import { EletronicFence } from "@/models/eletronicFence";
import { Contact } from "@/models/contact";
import { Vehicle } from "@/models/position";

import * as EletronicFenceService from "@/services/eletronicFenceService"
import * as ContactService from "@/services/contactService";
import * as VehicleService from "@/services/vehicleService";
import { MultiSelect } from "react-native-element-dropdown";

type DropdownItem = { label: string, value: string, icon: { uri: string } }

export default function FencesScreen() {
    const params = useLocalSearchParams();

    const mapRef = useRef<MapView>();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(true);
    const [coordinates, setCordenadas] = useState<LatLng[]>([]);
    const [fenceName, setNomeCerca] = useState<string>("");
    const [vehicles, setVehicles] = useState<DropdownItem[]>([]);
    const [vehiclesSelected, setVehiclesSelecionados] = useState<string[]>([]);
    const [color, setColor] = useState<string>("#f00");
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactsSelected, setContactsSelecionados] = useState<number[]>([]);

    const id = Number.parseInt(params.id as string ?? "0");

    var [spinnerVisible, setSpinnerVisible] = useState(true)

    useEffect(() => {
        loadScreen();
    }, []);

    async function loadScreen() {
        await Promise.all([getVehicles(),
        getContacts(),
        getEletronicFence(Number.parseInt(params.id as string ?? "0"))
        ])
        setSpinnerVisible(false);
        setIsLoaded(true)
    }

    function reorderPoints(points: LatLng[]): LatLng[] {
        const turfPoints = turf.points(points.map(coord => [coord.longitude, coord.latitude]));
        const concaveHull = turf.concave(turfPoints, { units: 'meters' });
        if (concaveHull) {
            return concaveHull.geometry.coordinates[0].map(coord => ({
                latitude: coord[1],
                longitude: coord[0],
            })) as LatLng[];
        } else {
            //console.warn('Não foi possível criar um polígono concavo com os pontos fornecidos.');
            return points;
        }
    }

    async function getVehicles() {

        try {
            const _lastPositions = await VehicleService.GetVehicles();
            if (!_lastPositions)
                return;

            const _vehicles = _lastPositions?.map((vehicle) => {
                return {
                    label: vehicle.plate,
                    value: vehicle.id.toString(),
                    icon: { uri: "https://api.xpsystems.com.br/Image/VehicleIcon/" + vehicle.id }
                }
            })

            setVehicles(_vehicles)
        } catch (e) {
            alert("Não foi possível carregar os veículos");
        }
    }

    async function getEletronicFence(id: number) {
        if (!id || id <= 0) {
            setUpdating(false)
            return;
        }
        try {
            const eletronicFence = await EletronicFenceService.getById(id);
            console.log(eletronicFence)
            mapRef.current?.animateToRegion(
                mapUtils.getCenter(eletronicFence.polygon.map((x: any[]) => { return { latitude: x[1], longitude: x[0] } })), 0);

            setContactsSelecionados(eletronicFence.contacts.map((x: Contact | number) => x.id))
            setVehiclesSelecionados(eletronicFence.vehicles.map((x: Vehicle | number) => x.id.toString()))
            setNomeCerca(eletronicFence.description);
            setCordenadas(eletronicFence.polygon.map((x: number[]) => { return { latitude: x[1], longitude: x[0] } }))
            setColor(eletronicFence.color)

        } catch (e) {
            console.log(e)
            alert("Não foi possível encontrar a cerca");
        }
    }

    async function getContacts() {
        try {
            const _contacts = await ContactService.getAll();

            setContacts(_contacts);
        } catch (e) {
            alert("Não foi possível encontrar os contatos");
        }
    }

    function onPressMap(event: MapPressEvent): void {
        const { coordinate } = event.nativeEvent
        const novoCoord = [...coordinates, coordinate]
        const final = reorderPoints(novoCoord);

        setCordenadas(final)
    }

    function onPressMarker(event: MarkerPressEvent, index: number) {
        const novosItems = [...coordinates]
        novosItems.splice(index, 1)
        setCordenadas(reorderPoints(novosItems))
    }

    async function onPressSave(event: GestureResponderEvent): Promise<void> {
        setIsLoaded(false);

        if (coordinates.length < 3 || vehicles.length < 1 || fenceName.trimEnd().length == 0) {
            alert("Não foi possível criar a cerca, revise os dados e tente novamente");
            return;
        }
        setSpinnerVisible(true);

        if (updating)
            try {
                await EletronicFenceService.update({
                    description: fenceName,
                    latLngs: coordinates.map(c => { return [c.longitude, c.latitude]; }),
                    polygon: coordinates.map(c => { return [c.longitude, c.latitude]; }),
                    type: 1,
                    vehicles: vehiclesSelected.map(x => { return Number.parseFloat(x); }),
                    contacts: contactsSelected.map(x => { return Number.parseFloat(x); }),
                    id: id,
                    color: ''
                })
                alert(`Cerca "${fenceName}" foi atualizada com sucesso`);
                router.push('/fences');
            } catch (e) {
                alert("Não foi possível atualizar a cerca");
            }
        else
            try {
                await EletronicFenceService.create({
                    description: fenceName,
                    latLngs: coordinates.map(c => { return [c.longitude, c.latitude]; }),
                    polygon: coordinates.map(c => { return [c.longitude, c.latitude]; }),
                    type: 1,
                    vehicles: vehiclesSelected.map(x => { return Number.parseFloat(x); }),
                    contacts: contactsSelected.map(x => { return Number.parseFloat(x); }),
                    id: 0,
                    color: ''
                })
                alert(`Cerca "${fenceName}" foi criada com sucesso`);
                router.push('/fences');
            } catch (e) {
                alert("Não foi possível criar a cerca");
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
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{updating ? "Editar Cerca" : "Cadatro de Cerca"}</Text>
                <ScrollView

                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingHorizontal: 25,
                        paddingBottom: 15
                    }}>

                    <View style={styles.labelRow}>
                        <Text style={styles.labelText}>Nome da cerca:</Text>
                    </View>
                    <TextInput style={styles.input} value={fenceName} onChangeText={setNomeCerca}></TextInput>

                    <View style={styles.labelRow}>
                        <Text style={styles.labelText}>Veículo:</Text>
                    </View>
                    <View>
                        <MultiSelect data={vehicles}
                            style={{
                                backgroundColor: Colors.backgroundInput,
                                borderRadius: 10,
                                padding: 8,
                            }}
                            placeholder='Selecione o veículo'
                            value={vehiclesSelected}
                            containerStyle={{ backgroundColor: Colors.backgroundInput, borderRadius: 10, overflow: 'hidden' }}
                            itemTextStyle={{ color: Colors.text.primary, fontSize: 14 }}
                            activeColor={Colors.primaryColor}
                            placeholderStyle={{ color: Colors.text.primary }}
                            selectedTextStyle={{ color: Colors.text.primary, marginLeft: 8 }}
                            labelField={"label"}
                            valueField={"value"}
                            iconStyle={{
                                width: 20,
                                height: 20,
                            }}
                            onChange={function (item: string[]): void {
                                setVehiclesSelecionados(item)
                            }} />
                    </View>

                    <View style={styles.labelRow}>
                        <Text style={styles.labelText}>Contatos:</Text>
                    </View>
                    <View>
                        <MultiSelect
                            data={contacts}
                            style={{
                                backgroundColor: Colors.backgroundInput,
                                borderRadius: 10,
                                padding: 8,
                            }}
                            placeholder='Selecione os contatos'
                            value={contactsSelected}
                            containerStyle={{ backgroundColor: Colors.backgroundInput, borderRadius: 10, overflow: 'hidden' }}
                            itemTextStyle={{ color: Colors.text.primary, fontSize: 14 }}
                            activeColor={Colors.primaryColor}
                            placeholderStyle={{ color: Colors.text.primary }}
                            selectedTextStyle={{ color: Colors.text.primary, marginLeft: 8 }}
                            labelField={"description"}
                            valueField={"id"}
                            iconStyle={{
                                width: 20,
                                height: 20,
                            }}
                            onChange={function (item: string[]): void {
                                setContactsSelecionados(item.map(v => parseInt(v)))
                            }} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={{ ...styles.button, ... { backgroundColor: !isLoaded || (coordinates.length < 3 || vehiclesSelected.length < 1) ? Colors.disabledBackgroundColor : Colors.success } }}
                            onPress={onPressSave}
                            disabled={!isLoaded || (coordinates.length < 3 || vehiclesSelected.length < 1)}>
                            <Text style={styles.buttonText}>{updating ? 'Atualizar cerca' : 'Criar cerca'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.button, ... { backgroundColor: Colors.danger } }} onPress={onPressCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.mapContainer}>
                <MapView style={styles.map}
                    onPress={onPressMap}
                    provider='google'
                    googleMapsApiKey={process.env.EXPO_PUBLIC_MAPS_API_KEY}
                    // customMapStyle={Colors.googleMaps}
                    initialRegion={{
                        latitude: -15.793735,
                        longitude: -47.882293,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                    }}
                    ref={mapRef}
                    rotateEnabled={false}
                    showsTraffic
                    showsIndoorLevelPicker={false}
                >
                    {coordinates.length > 0 && (<Polygon coordinates={coordinates}
                        fillColor={color + '3d'}
                    ></Polygon>)}
                    {coordinates.map((item, index) => <Marker
                        coordinate={item}
                        pinColor={updating ? color : "#f00"}
                        key={"pos" + index}
                        onPress={e => onPressMarker(e, index)}></Marker>)}

                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.backgroundColor,
    },
    infoContainer: {
        backgroundColor: Colors.backgroundColor,
        flexDirection: 'column',
        flex: 0.25,
    },
    mapContainer: {
        backgroundColor: Colors.backgroundColor,
        flexDirection: 'column',
        flex: 0.75,
    },
    buttonContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
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
    labelRow: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 5
    },
    labelText: {
        color: Colors.text.primary,
        fontSize: 16
    }
})