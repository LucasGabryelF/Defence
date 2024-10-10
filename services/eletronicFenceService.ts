import * as APIService from "./apiService"

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



export async function getAll() {
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