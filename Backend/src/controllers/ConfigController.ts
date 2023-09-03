import { ConfigKey, ConfigReturn } from "../typings/config"
import Config from '../models/ConfigModel'

const initialize: { [key: string]: any } = {
    ['channel_access_token']: null,
    ['channel_secret']: null
}

export const LoadConfig = async (synthia: string, key: ConfigKey | ConfigKey[]) => {
    const getValue = async (key: ConfigKey) => {
        const config = await Config.findOne({
            userId: synthia,
            key: key
        });

        return {
            key: key,
            value: config?.value || initialize[key]
        };
    };

    if (Array.isArray(key)) {
        if (key.length <= 1) {
            return await getValue(key[0]);
        }

        return Promise.all(key.map(getValue));
    } else {
        return await getValue(key);
    }
};


export const SetConfig = async (synthia: string, data: ConfigReturn | ConfigReturn[]) => {
    const setValue = async (key: ConfigKey, value: any) => {
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

    if (Array.isArray(data)) {
        return Promise.all(data.map(async (data) => {
            return await setValue(data.key, data.value)
        })); 
    } else {
        return await setValue(data.key, data.value);
    }
}