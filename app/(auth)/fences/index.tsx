import Spinner from "@/components/Spinner";
import { Colors } from "@/globals/colors";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


import * as EletronicFenceService from "@/services/eletronicFenceService"

import MapView, { LatLng, Marker, Polygon } from "react-native-maps";
import { EletronicFence } from "@/models/eletronicFence";
import EletronicFenceItem from "@/components/EletronicFenceItem";
import mapUtils from "@/utils/mapUtils";
import colorUtils from "@/utils/colorUtils";
import { router } from "expo-router";

export default function FencesScreen() {
    const mapRef = useRef<MapView>();
    const [eletronicFences, setEletronicFences] = useState<EletronicFence[]>()

    var [spinnerVisible, setSpinnerVisible] = useState(true)

    useEffect(() => {
        getFences();

        async function getFences() {
            try {
                const _eletronicFences = await EletronicFenceService.getAll();
                console.log(_eletronicFences);

                if (_eletronicFences) {
                    setEletronicFences(_eletronicFences);

                    let positions : LatLng[] = [];

                    for (let i = 0; i < _eletronicFences.length; i++) {                        
                        positions = positions.concat(_eletronicFences[i].polygon.map((x: number[]) => { return { latitude: x[1], longitude: x[0] } }));
                    }
                    console.log(positions)
                    mapRef.current?.animateToRegion(mapUtils.getCenter(positions), 0)
                }
                setSpinnerVisible(false);
            } catch (e) {
                console.log(e)
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            {spinnerVisible && (<Spinner />)}
            <View style={styles.infoContainer}>
                <FlatList
                    data={eletronicFences}
                    renderItem={({ item }) => (
                        <EletronicFenceItem style={{ marginHorizontal: 5, marginVertical: 5 }}
                            id={item.id}
                            color={item.color}
                            description={item.description} />
                    )}
                />
            </View>
            <View style={styles.mapContainer}>
                <MapView style={styles.map}
                    provider='google'
                    googleMapsApiKey={process.env.EXPO_PUBLIC_MAPS_API_KEY}
                    zoomControlEnabled={false}
                    // customMapStyle={Colors.googleMaps}
                    ref={mapRef}
                    rotateEnabled={false}
                    showsTraffic
                    showsIndoorLevelPicker={false}
                    initialRegion={{
                        latitude: -15.793735,
                        longitude: -47.882293,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                    }}
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
                </MapView>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/fences/add')}>
                <MaterialCommunityIcons name="plus-thick" size={48} color="#fff" />
            </TouchableOpacity>
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
    map: {
        width: '100%',
        height: '100%',
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
    },
})