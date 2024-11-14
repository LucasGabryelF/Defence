import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { KeyboardTypeOptions } from 'react-native';

export type ContactTypeType = {
    id: number,
    keyboardType: KeyboardTypeOptions | undefined
    name: string,
    icon: string,
    filter: (v: string) => string
};

export const ContactType: ContactTypeType[] = [
    {
        id: 1,
        name: "Email",
        icon: "email",
        keyboardType: "email-address",
        filter: (v: string) => v
    },
    {
        id: 2,
        name: "Celular",
        icon: "phone",
        keyboardType: "numeric",
        filter: (v: string) => v.replace(/[^0-9]/g, '')
    }
] 