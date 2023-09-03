import { ensure as Line } from "./line"

type Network = "LINE"

export default async function ensure(network: Network, id: string) {
    switch (network) {
        case "LINE":
            return await Line(id)
        default:
            throw new Error(`NOT FOUND NETWORK : ${network}`);
    }
}