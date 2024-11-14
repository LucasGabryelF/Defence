import { Contact } from "./contact"
import { Vehicle } from "./position"

export interface EletronicFence {
    id: number
    description: string
    type: number
    latLngs: number[][]
    polygon: number[][]
    vehicles: Vehicle[] | number[]
    contacts: Contact[] | number[]
    color: string
}