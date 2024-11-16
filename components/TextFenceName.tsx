import { Colors } from '@/globals/colors';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type TextFenceNameProps = {
    name: string | undefined
    margin?: number
}

const TextFenceName: React.FC<TextFenceNameProps> = memo((props: TextFenceNameProps) => {
    return <View style={{
        flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
    }}>
        <MaterialIcons name="fence" size={20} color={Colors.text.detail} />
        <Text style={{
            fontSize: 17,
            color: Colors.text.detail,
        }}>{props.name ?? "N/A"}</Text>
    </View>;
})

export default TextFenceName;