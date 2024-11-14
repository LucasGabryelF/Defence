import { Colors } from '@/globals/colors';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Address } from '@/models/position';

type TextAddressProps = {
    address: Address | undefined
    margin?: number
}

const TextAddress: React.FC<TextAddressProps> = memo((props: TextAddressProps) => {

    return <View style={{
        flexDirection: "row", columnGap: props.margin ?? 10, alignItems: "center"
    }}>
        <Text style={{
            fontSize: 17,
            color: Colors.text.detail,
        }}>
            <MaterialCommunityIcons name="road-variant" size={20} color={Colors.text.detail} />
            {props.address?.road ? (props.address?.road ?? "") + ", " + (props.address?.suburb ?? "") + "\n" + (props.address?.town ?? "") : "Sem endereço"}</Text>
    </View>;
})

export default TextAddress;