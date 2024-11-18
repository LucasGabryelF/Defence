import { AuthStateType } from "../contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://api.xpsystems.com.br"

export async function request(endpoint: string, parameters: RequestInit | null = null) {
    console.log(API_URL + endpoint)
    const user = await getUser();

    const request = await fetch(API_URL + endpoint, {
        ...parameters,
        headers: {
            ...parameters?.headers,
            fuso: (new Date().getTimezoneOffset() * -1).toString(),
            Authorization: `Bearer ${user?.Token ?? ""}`
        }
    });

    return request;
}

async function updateToken(auth: AuthStateType) {

    if (!auth)
        return auth;

    if (auth.DataExpiracao && new Date(auth.DataExpiracao) > new Date())
        return auth;

    console.log("ApiService->Atualizando Token")
    const request = await fetch(API_URL + "/Auth/refreshLogin", {
        body: JSON.stringify({
            email: auth.Usuario?.email,
            password: "",
            refreshToken: auth.RefreshToken
        }),
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            fuso: (new Date().getTimezoneOffset() * -1).toString(),
        }
    });

    const result = await request.json();
    console.log(result)
    const userAuth = {
        User: result.user,
        RefreshToken: result.refreshToken,
        Token: result.token,
        ExpirationDate: result.expires
    };
    await AsyncStorage.setItem('user', JSON.stringify(userAuth));

    return userAuth;

}

async function getUser() {
    const userJson = await AsyncStorage.getItem('user');

    if (!userJson)
        return null;

    const user = JSON.parse(userJson) as AuthStateType;
    return updateToken(user);
}