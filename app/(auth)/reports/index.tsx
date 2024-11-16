import Spinner from "@/components/Spinner";
import { Colors } from "@/globals/colors";
import { useEffect, useRef, useState } from "react";
import { FlatList, GestureResponderEvent, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewabilityConfig } from "react-native";

import * as EletronicFenceService from "@/services/eletronicFenceService"
import * as VehicleService from "@/services/vehicleService";

import { PositionEletronicFence } from "@/models/positionEletronicFence";
import { EletronicFence } from "@/models/eletronicFence";
import { LatLng } from "react-native-maps";
import { router, useLocalSearchParams } from "expo-router";
import { SelectCountry } from "react-native-element-dropdown";
import React from 'react';
import { DatePicker } from '@nayojs/react-datetime-picker';
import CustomDateTimePicker from "@/components/CustomTimePicker";
import { PageRequest } from "@/services/pageRequest";
import PositionEFItem from "@/components/PositionEFItem";
import { Position } from "@/models/position";
import datetimeUtils from "@/utils/datetimeUtils";

const ReportScreen: React.FC = () => {
    const params = useLocalSearchParams();

    type DropdownItem = { label: string, value: string, icon: { uri: string } }

    var [spinnerVisible, setSpinnerVisible] = useState(true);

    const isLoading = useRef<boolean>(false);

    const [periodStart, setPeriodStart] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0));
    const [periodEnd, setPeriodEnd] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59));
    const [vehicles, setVehicles] = useState<DropdownItem[]>([])
    const [positions, setPositions] = useState<PositionEletronicFence[]>([])
    const [vehicleInfo, setVehicleInfo] = useState<Position>()
    const [eletronicFences, setEletronicFences] = useState<DropdownItem[]>([])
    const [eletronicFenceInfo, serEletronicFenceInfo] = useState<EletronicFence>()
    const [vehicle, setVehicle] = useState("")
    const [eletronicFence, setEletronicFence] = useState("")
    const [screenMode, setScreenMode] = useState<"search" | "historic">("search")

    useEffect(() => {
        loadDropdownData();

        async function loadDropdownData() {
            await Promise.all([getVehicles(), getFences()])
            setSpinnerVisible(false);
        }

        async function getFences() {
            try {
                const _lastEletronicFences = await EletronicFenceService.getAll();
                if (!_lastEletronicFences)
                    return;

                const _eletronicFences = _lastEletronicFences?.map((eletronicFence) => {
                    return {
                        label: eletronicFence.description,
                        value: eletronicFence.id.toString(),
                        icon: require("@/assets/icons/fence_better.svg")
                    }
                })


                setEletronicFences(_eletronicFences);

            } catch (e) {
                console.log(e)
            }
        }

        async function getVehicles() {

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
        }
    }, [])

    useEffect(() => {
        async function getVehicleInfo() {
            if (!vehicle)
                return
            const _vehicleInfo = await VehicleService.GetLastPositionsByVehicleId(Number.parseInt(vehicle))

            if (_vehicleInfo) {
                setVehicleInfo(_vehicleInfo)
            }
        }

        getVehicleInfo();
    }, [vehicle])

    useEffect(() => {
        async function getEletronicFenceInfo() {
            if (!eletronicFence)
                return
            const _eletronicFenceInfo = await EletronicFenceService.getById(Number.parseInt(eletronicFence))

            if (_eletronicFenceInfo) {
                serEletronicFenceInfo(_eletronicFenceInfo)
            }
        }

        getEletronicFenceInfo();
    }, [eletronicFence])

    function onPressSearch(event: GestureResponderEvent): void {
        console.log(vehicle)
        console.log(eletronicFence)
        console.log(!isNaN(periodStart.getTime()))
        if(!(vehicle || eletronicFence) || !(!isNaN(periodStart.getTime()) || !isNaN(periodStart.getTime()))){
            alert("Não foi possível iniciar a busca, revise os dados e tente novamente");
            return;
        }

        if(periodStart > periodEnd){
            alert("O início período de ser antes do fim do período.");
            return;
        }
        
        setSpinnerVisible(true);
        getPosition();
        setScreenMode("historic")
    }

    async function onPressCancel(event: GestureResponderEvent): Promise<void> {
        router.push("/home")
    }

    async function getPosition() {
        if (isLoading.current)
            return

        try {
            isLoading.current = true
            setPositions([]);
            setSpinnerVisible(true);

            const _request = await EletronicFenceService.PositionsOfVehicleByPeriod(
                Number.parseInt(eletronicFence),
                Number.parseInt(vehicle),
                periodStart,
                periodEnd,
                new PageRequest(50, 0)) as PositionEletronicFence[];

            if (!_request || _request.length == 0)
                return;

            setPositions(_request);

        } finally {
            isLoading.current = false;
            setSpinnerVisible(false);
        }
    }

    return (
        <View style={styles.container}>
            {spinnerVisible && (<Spinner />)}
            <Text style={styles.title}>Relatório de Entradas e Saídas</Text>
            <View style={styles.formContainer}>
                {screenMode == 'search' &&
                    <View>
                        <View style={styles.labelRow}>
                            <Text style={styles.labelText}>Cerca Eletronica Alvo:</Text>
                        </View>
                        <SelectCountry data={eletronicFences}
                            style={styles.input}
                            placeholder='Selecione uma cerca'
                            value={eletronicFence}
                            containerStyle={{ backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}
                            activeColor={Colors.backgroundInput}
                            imageStyle={{ width: 30, height: 25 }}
                            placeholderStyle={{ fontSize: 14 }}
                            itemTextStyle={{ fontSize: 14 }}
                            selectedTextStyle={{ fontSize: 14 }}
                            imageField={"icon"}
                            labelField={"label"}
                            valueField={"value"}
                            iconStyle={{
                                width: 20,
                                height: 20,
                            }}
                            onChange={function (item: DropdownItem): void {
                                setEletronicFence(item.value)
                            }} />

                        <View style={styles.labelRow}>
                            <Text style={styles.labelText}>Veículo:</Text>
                        </View>
                        <SelectCountry data={vehicles}
                            style={styles.input}
                            placeholder='Selecione o veículo'
                            value={vehicle}
                            containerStyle={{ backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}
                            activeColor={Colors.backgroundInput}
                            imageStyle={{ width: 30, height: 25 }}
                            placeholderStyle={{ fontSize: 14 }}
                            itemTextStyle={{ fontSize: 14 }}
                            selectedTextStyle={{ fontSize: 14 }}
                            imageField={"icon"}
                            labelField={"label"}
                            valueField={"value"}
                            iconStyle={{
                                width: 20,
                                height: 20,
                            }}
                            onChange={function (item: DropdownItem): void {
                                setVehicle(item.value)
                            }} />

                        <View style={styles.datetimeContainer}>
                            <View style={{ flex: 0.475 }}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelText}>Inicio do Periodo:</Text>
                                </View>
                                <CustomDateTimePicker value={periodStart} onDateChange={setPeriodStart}></CustomDateTimePicker>
                            </View>
                            <View style={{ flex: 0.475 }}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelText}>Fim do Periodo:</Text>
                                </View>
                                <CustomDateTimePicker value={periodEnd} onDateChange={setPeriodEnd}></CustomDateTimePicker>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={{ ...styles.button, ... { backgroundColor: Colors.info } }} onPress={onPressSearch}>
                                <Text style={styles.buttonText}>Buscar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.button, ... { backgroundColor: Colors.danger } }} onPress={onPressCancel}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {screenMode == 'historic' &&
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 20, color: Colors.text.primary }}>
                            <Text style={{ fontWeight: 'bold' }}>Veículo:</Text> {vehicleInfo?.vehicle.plate} | <Text style={{ fontWeight: 'bold' }}>Cerca Eletronica:</Text> {eletronicFenceInfo?.description}
                        </Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 20, color: Colors.text.primary }}>
                            <Text style={{ fontWeight: 'bold' }}>Inicio:</Text> {datetimeUtils.formatDateTime(periodStart, '-03:00')} | <Text style={{ fontWeight: 'bold' }}>Fim:</Text> {datetimeUtils.formatDateTime(periodEnd, '-03:00')}
                        </Text>

                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 300, marginBottom: 20, backgroundColor: Colors.backgroundCard, paddingHorizontal: 40, borderRadius: 10 }}>
                            <FlatList
                                style={{ flex: 1, marginTop: 15 }}
                                data={positions}
                                renderItem={({ item }) => (<PositionEFItem positionEF={item} style={{}} />)}
                                ListEmptyComponent={() => (<Text style={styles.title}>{!spinnerVisible ? "Sem dados!": ""}</Text>)}
                                ItemSeparatorComponent={() => (<View style={{ height: 10 }}></View>)}
                            />
                        </ScrollView>
                        <View style={{ ...styles.buttonContainer, ...{ justifyContent: 'center' } }}>
                            <TouchableOpacity style={styles.button} onPress={() => setScreenMode("search")}>
                                <Text style={styles.buttonText}>
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </View >
    )
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
        width: '50%',
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    datetimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#444',
        paddingVertical: 10,
        borderRadius: 5,
        width: '47.5%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ReportScreen;