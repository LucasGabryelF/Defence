import User from "../models/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
    Usuario?: User,
    RefreshToken: string,
    Token: string,
    login: (usuario: User, token: string, refreshToken: string, dataExpiracao: Date) => void,
    logout: () => void,
    isLogado: () => boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode;
};

export type AuthStateType = {
    Usuario?: User,
    RefreshToken: string,
    Token: string,
    DataExpiracao?: Date
}

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [auth, setAuth] = useState<AuthStateType>({
        RefreshToken: "",
        Token: "",
        Usuario: undefined
    })
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        console.log("BuscandoStorage")
        buscarStorage();
    }, [])

    function isLogado(): boolean {
        console.log([auth.Usuario != undefined, auth.Usuario, carregado])
        return auth.Usuario != undefined
    }

    async function buscarStorage() {
        const userJson = await AsyncStorage.getItem('user');
        console.log("Resultado storage: " + userJson)

        if (!userJson) {
            setCarregado(true)
            return
        }

        const user = JSON.parse(userJson);

        if (user) {
            setAuth(user);
        }

        setCarregado(true)
    }

    async function logar(usuario: User, token: string, refreshToken: string, dataExpiracao: Date): Promise<void> {
        await AsyncStorage.setItem('user', JSON.stringify({
            Usuario: usuario,
            RefreshToken: refreshToken,
            Token: token,
            DataExpiracao: dataExpiracao
        }));

        setAuth({
            Usuario: usuario,
            RefreshToken: refreshToken,
            Token: token,
            DataExpiracao: dataExpiracao
        })
    }

    async function logout() {
        await AsyncStorage.removeItem('user');
        console.log("Deslogado")
        setAuth({
            RefreshToken: "",
            Token: "",
            Usuario: undefined,
            DataExpiracao: undefined
        })
    }

    return <AuthContext.Provider
        children={props.children}
        value={{
            ...auth,
            login: logar,
            logout,
            isLogado
        }} />
}