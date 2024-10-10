import * as APIService from "./apiService";

export async function create(contact: any) {
    const result = await APIService.request("/Contact", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { 'Content-Type': "application/json" }
    })

    if (!result.ok) {
        throw new Error(await result.text() + " " + result.status);
    }
}

export async function update(contact: any) {
    console.log(contact)
    const result = await APIService.request("/Contact", {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: { 'Content-Type': "application/json" }
    })

    if (!result.ok) {
        throw new Error(await result.text() + " " + result.status);
    }
}

export async function remove(id: any) {
    const result = await APIService.request("/Contact/" + id, {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" }
    })

    if (!result.ok) {
        throw new Error(await result.text() + " " + result.status);
    }
}

export async function getAll() {
    const r = await APIService.request("/Contact", {
        method: "GET",
        headers: { 'Content-Type': "application/json" }
    })

    if (!r.ok) {
        throw new Error(await r.text() + " " + r.status);
    }

    return await r.json()
}

export async function getById(id: any) {
    const result = await APIService.request("/Contact/" + id, {
        method: "GET",
        headers: { 'Content-Type': "application/json" }
    })

    if (!result.ok) {
        throw new Error(await result.text() + " " + result.status);
    }

    return await result.json()
}
