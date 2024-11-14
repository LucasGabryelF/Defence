import { Colors } from '@/globals/colors';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import datetimeUtils from '@/utils/datetimeUtils';

type TextEmissionProps = {
    emission: Date | undefined
    margin?: number
}

const TextEmission: React.FC<TextEmissionProps> = memo((props: TextEmissionProps) => {
    return <View style={{
        flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
    }}>
        <MaterialIcons name="watch-later" size={20} color={Colors.text.detail} />
        <Text style={{
            fontSize: 17,
            color: Colors.text.detail,
        }}>{datetimeUtils.formatDateTime(props.emission) ?? "Horário Desconhecido"}</Text>
    </View>;
})

export default TextEmission;