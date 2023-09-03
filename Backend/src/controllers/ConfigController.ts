import { ConfigKey, ConfigReturn } from "../typings/config"
import Config from '../models/ConfigModel'

const initialize: { [key: string]: any } = {
    ['channel_secret']: null
}

export const LoadConfig = async (synthia: string, key: ConfigKey): Promise<ConfigReturn> => {
    const config = await Config.findOne({
        userId: synthia,
        key: key
    });

    return {
        key: key,
        value: config?.value ? config.value : initialize[key]
    }
}

export const SetConfig = async (synthia: string, key: ConfigKey, value: any) => {
    const config = await Config.findOne({
        userId: synthia,
        key: key
    });

    if (config) {
        config.value = value
        return await config.save()
    } else {
        return await Config.create({ userId: synthia, key, value })
    }
}