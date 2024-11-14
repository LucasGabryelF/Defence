import { Position, Vehicle } from '@/models/position';
import * as APIService from '@/services/apiService'
import { PageRequest } from './pageRequest';
import { PageResponse } from './pageResponse';

export async function GetLastPositions(): Promise<Position[] | null> {

    try {
        const result = await APIService.request("/position/last")
        if (!result.ok) {
            throw new Error(await result.text() + " " + result.status);
        }
        return await result.json()
    } catch (e) {
        console.log(e)
    }
    
    return null
}

export async function GetLastPositionsByVehicleId(vehicleId: number): Promise<Position | null> {

    try {
        const result = await APIService.request("/position/last/" + vehicleId)
        if (!result.ok) {
            throw new Error(await result.text() + " " + result.status);
        }
        return await result.json()
    } catch (e) {
        console.log(e)
    }
    return null
}

export async function GetVehicles(): Promise<Vehicle[]> {

    try {
        const r = await APIService.request("/vehicle")

        if (!r.ok) {
            throw new Error(await r.text() + " " + r.status);
        }
        return await r.json()
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function GetVehicle(id: number): Promise<Vehicle> {

    try {
        const r = await APIService.request("/vehicle/" + id)

        if (!r.ok) {
            throw new Error(await r.text() + " " + r.status);
        }

        return await r.json()
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function PositionsOfVehicleByPeriod(vehicleId: number, periodStart: Date, periodEnd: Date, page: PageRequest): Promise<PageResponse<Position> | Position[]> {

    try {
        const r = await APIService.request(`/Position/ByPeriod/${vehicleId}?PeriodStart=${periodStart.toISOString()}&PeriodEnd=${periodEnd.toISOString()}&ItemsPerPage=${page.itemsPerPage}&Page=${page.page}`)

        if (!r.ok) {
            throw new Error(await r.text() + " " + r.status);
        }
        return await r.json()
    } catch (e) {
        console.log(e)
        throw e;
    }
}