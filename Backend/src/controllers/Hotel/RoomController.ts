import RoomModel from "../../models/Hotel/RoomModel"

export interface HRoom {
    appId: string,
    title: string,
    description: string,
    images: string[]
}

export const Create = (room: HRoom) => {
    return RoomModel.create(room)
}

export const get = (appId : string)  => {
    return RoomModel.find({})
}