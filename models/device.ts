export class Device {
    id: number = 0
    imei: string | undefined
    model: ModelDevice | undefined
}

export class ModelDevice {
    id: string | undefined
    name: string | undefined
    brand: BrandModel | undefined
}

export interface BrandModel {
    id: number
    name: string
}