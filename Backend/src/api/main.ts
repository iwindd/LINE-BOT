import { ensure as LineEnsure, stop as LineStop } from "./line"
import { ApiType } from "../typings/app";
import AppModel from "../models/AppModel";
const apps: App[] = [];

interface App {
    id: string,
    network: ApiType
}

export const isRunning = (id: string) => {
    return apps.find(app => app.id == id) ? true : false
}

export const stop = async (id: string) => {
    const data = apps.find(app => app.id == id);

    if (!data) return [false, 0]
    switch (data.network) {
        case "LINE":
            const [status, code] = await LineStop(id);
            if (status) apps.splice(apps.findIndex(app => app.id == id), 1)

            return [status, code]
        default:
            return [false, -1]
    }
}

export const ensure = async (id: string, network?: ApiType) => {
    if (!network) {
        const app = await AppModel.findById(id)
        if (app) network = app.api
    }

    if (!network) {
        throw new Error("not found api");
    }

    switch (network) {
        case "LINE":
            const [status, code] = await LineEnsure(id);
            if (status) apps.push({ id, network })

            return [status, code]
        default:
            throw new Error(`NOT FOUND NETWORK : ${network}`);
    }
}

export const ensureAll = async () => {
    AppModel.find({})
        .then((data) => {
            data.map((data) => {
                ensure(data._id, data.api)
            })
        })
}