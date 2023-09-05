import { ensure as LineEnsure, stop as LineStop } from "./line"

const apps: App[] = [];

type Network = "LINE"
interface App {
    id: string,
    network: Network
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

export const ensure = async (network: Network, id: string) => {
    switch (network) {
        case "LINE":
            const [status, code] = await LineEnsure(id);
            if (status) apps.push({ id, network })

            return [status, code]
        default:
            throw new Error(`NOT FOUND NETWORK : ${network}`);
    }
}
