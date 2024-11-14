import React, { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Region, Polygon, LatLng } from 'react-native-maps';


import { Position } from '@/models/position';
import { EletronicFence } from '@/models/eletronicFence';

import mapUtils from "@/utils/mapUtils"

import * as VehicleService from "@/services/vehicleService";
import * as EletronicFenceService from "@/services/eletronicFenceService"

import { useAuth } from '@/hooks/useAuth';

import Spinner from '@/components/Spinner';
import Car from '@/components/Car';

import { Colors } from '@/globals/colors';
import colorUtils from '@/utils/colorUtils';

export default function HomeScreen() {
    const auth = useAuth();
    const mapRef = useRef<MapView>();

    var [SpinnerVisible, setSpinnerVisible] = useState(true)

    const [positions, setPositions] = useState<Position[]>()
    const [eletronicFences, setEletronicFences] = useState<EletronicFence[]>()
    const [loading, setLoading] = useState<boolean>(true);
    const isLoading = useRef<boolean>(false);

    const [footerVisibility, setFooterVisibility] = useState(true);
    const [footerSize, setFooterSize] = useState(135);

    function toogleFooter() {
        if (footerVisibility) {
            setFooterSize(0);
            setFooterVisibility(false);
        }else{
            setFooterSize(135);
            setFooterVisibility(true);
        }
    }

    useEffect(() => {
        getVehicles();
        getFences();

        const att = setInterval(() => updateVehicles(), 5000)
        return () => {
            clearInterval(att)
        }

        async function getFences() {
            try {
                const _eletronicFence = await EletronicFenceService.getAll();
                console.log(_eletronicFence);

                if (_eletronicFence) {
                    setEletronicFences(_eletronicFence);
                }
            } catch (e) {
                console.log(e)
            }
        }

        async function getVehicles() {
            const _lastPositions = await VehicleService.GetLastPositions();

            if (_lastPositions) {
                setPositions(_lastPositions)
                mapRef.current?.animateToRegion(mapUtils.getCenter(_lastPositions), 0)
            }

            setLoading(false);
            setSpinnerVisible(false);
        }

        async function updateVehicles() {
            if (isLoading.current)
                return;

            isLoading.current = true;
            const _lastPositions = await VehicleService.GetLastPositions();

            if (_lastPositions) {
                setPositions(_lastPositions)

                if (_lastPositions.length != positions?.length) {
                    console.log("atualizando veiculos iniciais")
                    setPositions(_lastPositions)
                }
            }
            isLoading.current = false;
        }
    }, [])

    return (
        <View style={styles.container}>
            {SpinnerVisible && (<Spinner />)}
            <View style={styles.container}>
                <MapView style={styles.map}
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
                    {eletronicFences?.map((x, index) => (
                        <View key={"fence_" + index}>
                            <Polygon key={"polygon_" + index}
                                coordinates={x.polygon.map((x: number[]) => { return { latitude: x[1], longitude: x[0] } })}
                                fillColor={x.color}
                                strokeColor={x.color}
                            >
                            </Polygon>
                            <Marker key={"marker_polygon_" + index}
                                anchor={{ x: 0.4, y: 0.5 }}
                                coordinate={mapUtils.getCenter(x.polygon.map((x: number[]) => { return { latitude: x[1], longitude: x[0] } }))}>
                                <Text style={{ fontWeight: 'bold', color: colorUtils.darkenHexColor(x.color, 0.5), textShadowColor: 'rgba(255, 255, 255, 1)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 10 }}>
                                    {x.description}
                                </Text>
                            </Marker>
                        </View>
                    ))}
                    {positions?.map((x, index) => (
                        <Marker key={"marker_" + index}
                            anchor={{ x: 0.4, y: 0.5 }}
                            coordinate={{ latitude: x.latitude, longitude: x.longitude }}>
                            <Image style={{ resizeMode: 'contain', height: 50, width: 50 }}
                                source={{
                                    uri: "https://api.xpsystems.com.br/Image/VehicleIcon/" + x.vehicle.id
                                }} />
                        </Marker>
                    ))}
                </MapView>
            </View>
            <View style={styles.infoRow}>
                <TouchableOpacity style={{
                    position: 'absolute',
                    height: 25,
                    width: 80,
                    alignSelf: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    top: -25,
                    backgroundColor: '#333'
                }}
                    onPress={() => toogleFooter()}>
                    <Text style={{alignSelf:'center'}}>
                        {footerVisibility ? <MaterialCommunityIcons name="menu-down" size={24} color="#fff"/> : <MaterialCommunityIcons name="menu-up" size={24} color="#fff" />}
                    </Text>
                </TouchableOpacity>
                <ScrollView style={{ height: footerSize }}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        numColumns={3}
                        data={positions}
                        ListEmptyComponent={() => <View></View>}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1 / 3}}>
                                <Car style={{ marginHorizontal: 5, marginVertical: 5 }} id={item.vehicle.id} color={item.vehicle.color} situation={item.situation} emission={item.emission} address={item.address} plate={item.vehicle.plate} />
                            </View>
                        )}>
                    </FlatList>
                </ScrollView>
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
    map: {
        width: '100%',
        height: '100%',
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
    },
    buttonText: {
        color: '#fff',
    },
    infoRow: {
        paddingVertical: 10,
        backgroundColor: '#1c1b22',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        width: '30%',
        backgroundColor: '#333',
        position: 'relative',
    }
});