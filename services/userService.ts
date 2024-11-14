import User from "../models/user";
import * as APIService from "../services/apiService"

type RetornoRequest<T> = {
    status: number,
    data: T
}

export async function login(email: string, password: string): Promise<RetornoRequest<any>> {
    const result = await APIService.request(`/Auth/login`, {
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email: email, password: password, refreshToken: "" }),
        method: "POST"
    })

    let resultObj = {};
    
    if (result.status != 200)
        resultObj = await result.text()
    else
        resultObj = await result.json();

    return { status: result.status, data: resultObj }

}