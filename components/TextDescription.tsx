import { Colors } from '@/globals/colors';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DatetimeUtils from '@/utils/DatetimeUtils';

type TextDescriptionProps = {
    description: string | undefined
    margin?: number
}

const TextDescription: React.FC<TextDescriptionProps> = memo((props: TextDescriptionProps) => {
    return <View style={{
        flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
    }}>
        <MaterialIcons name="article" size={20} color={Colors.text.detail} />
        <Text style={{
            fontSize: 17,
            color: Colors.text.detail,
        }}>{props.description ?? "N/A"}</Text>
    </View>;
})

export default TextDescription;