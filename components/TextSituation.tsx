import { Colors } from '@/globals/colors';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

type TextSituationProps = {
    situation: number | undefined, description: string | undefined
    margin?: number
}

const TextSituation: React.FC<TextSituationProps> = memo((props: TextSituationProps) => {
    if (props.situation == 12)
        return <View style={{
            flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
        }}>
            <MaterialIcons name="pause-circle-filled" size={20} color="#B81818" />
            <Text style={{
                fontSize: 20,
                color: Colors.text.detail,
            }}>{props.description ?? "Situação Desconhecida"}</Text>
        </View>;
    else
        return <View style={{
            flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
        }}>
            <MaterialCommunityIcons name="arrow-up-circle" size={20} color="1861B8" />
            <Text style={{
                fontSize: 20,
                color: Colors.text.detail,
            }}>{props.description ?? "Situação Desconhecida"}</Text>
        </View>;
})

export default TextSituation;