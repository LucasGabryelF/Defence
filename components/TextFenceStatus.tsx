import { Colors } from '@/globals/colors';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TextFenceStatusProps = {
    isExit: boolean
    isEntrance: boolean
    margin?: number
}

const TextFenceStatus: React.FC<TextFenceStatusProps> = memo((props: TextFenceStatusProps) => {
    if (props.isExit)
        return <View style={{
            flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
        }}>
            <MaterialCommunityIcons name="location-exit" size={20} color="#B81818" />
            <Text style={{
                fontSize: 17,
                color: Colors.text.detail,
            }}>Saída</Text>
        </View>;
    if(props.isEntrance)
        return <View style={{
            flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
        }}>
            <MaterialCommunityIcons name="location-enter" size={20} color="#1861B8" />
            <Text style={{
                fontSize: 17,
                color: Colors.text.detail,
            }}>Entrada</Text>
        </View>;
})

export default TextFenceStatus;