import { Device } from "./device"

export interface Position {
    id: number
    emission: Date
    latitude: number
    longitude: number
    odometer: number
    speed: number
    ignition: boolean
    altitude: number
    course: number
    situation: Situation
    vehicle: Vehicle
    address: Address
}

export interface Situation {
    id: number
    description: string
}

export interface Vehicle {
    id: number
    plate: string
    fuelConsumptionUrban: number
    fuelConsumptionRoadway: number
    color: string
    model: Model
    devices: Device[]
}

export interface Model {
    id: number
    description: string
    brand: Brand
    type: Type
}

export interface Brand {
    id: number
    name: string
}

export interface Type {
    id: number
    description: string
}

export interface Address {
    id: number
    positionId: number
    road: string
    suburb: string
    cityDistrict: string
    town: string
    municipality: string
    stateDistrict: string
    state: string
    iso31662Lvl4: string
    region: string
    postcode: string
    country: string
    countryCode: string
    houseNumber?: string
}
