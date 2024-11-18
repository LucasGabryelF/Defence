import { PositionEletronicFence } from "@/models/positionEletronicFence";
import * as APIService from "./apiService"
import { PageRequest } from "./pageRequest";
import { PageResponse } from "./pageResponse";
import { EletronicFence } from "@/models/eletronicFence";

export async function create(eletronicFence: any) {
    const r = await APIService.request("/EletronicFence", {
        method: "POST",
        body: JSON.stringify(eletronicFence),
        headers: { 'Content-Type': "application/json" }
    })

    if (!r.ok) {
        throw new Error(await r.text() + " " + r.status);
    }
}

export async function update(eletronicFence: any) {
    const r = await APIService.request("/EletronicFence/" + eletronicFence.id, {
        method: "PUT",
        body: JSON.stringify(eletronicFence),
        headers: { 'Content-Type': "application/json" }
    })

    if (!r.ok) {
        throw new Error(await r.text() + " " + r.status);
    }
}

export async function remove(id) {
    const r = await APIService.request("/EletronicFence/" + id, {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" }
    })

    if (!r.ok) {
        throw new Error(await r.text() + " " + r.status);
    }
}



export async function getAll() : Promise<EletronicFence[]> {
    const result = await APIService.request("/EletronicFence", {
        method: "GET",
        headers: { 'Content-Type': "application/json" }
    })

    if (!result.ok) {
        throw new Error(await result.text() + " " + result.status);
    }

    return await result.json()
}

export async function getById(id) {
    const result = await APIService.request("/EletronicFence/" + id, {
        method: "GET",
        headers: { 'Content-Type': "application/json" }
    })

    if (!result.ok) {
        throw new Error(await result.text() + " " + result.status);
    }

    return await result.json()
}

export async function PositionsOfVehicleByPeriod(eletronicFenceId: number, vehicleId: number, periodStart: Date, periodEnd: Date, page: PageRequest): Promise<PageResponse<PositionEletronicFence> | PositionEletronicFence[]> {

    try {
        const r = await APIService.request(`/EletronicFence/Positions/ByPeriod/${eletronicFenceId}/${vehicleId}?PeriodStart=${periodStart.toISOString()}&PeriodEnd=${periodEnd.toISOString()}&ItemsPerPage=${page.itemsPerPage}&Page=${page.page}`)

        if (!r.ok) {
            throw new Error(await r.text() + " " + r.status);
        }
        return await r.json()
    } catch (e) {
        console.log(e)
        throw e;
    }
}