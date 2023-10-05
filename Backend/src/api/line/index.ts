import AppModel, { IApp } from '../../models/AppModel';
import { LoadConfig } from '../../controllers/ConfigController';
import { WebhookEvent } from '@line/bot-sdk'
import { ConfigReturn } from '../../typings/config';
import { isRunning } from '../main';
import { App } from '../../typings/app';
import * as Logger from '../../controllers/LogController';
import { LineApp } from './app';
import { onContext } from './command';
import { Context } from '../lib/typings';

const apps: App[] = [];

export const stop = async (id: string): Promise<[boolean, number]> => {
    if (!apps.find(app => app.id == id)) return [false, 1]

    const index: number = apps.findIndex(app => app.id == id);
    apps.splice(index, 1)

    return [true, 200]
}

export const ensure = async (id: string): Promise<[boolean, number]> => {
    if (isRunning(id)) return [false, 1]

    const config: ConfigReturn[] = await LoadConfig(id, ['channel_access_token', 'channel_secret']) as ConfigReturn[];
    if (!config) return [false, 2];

    const channel_secret: string = config.find(con => con.key == "channel_secret")?.value
    const channel_access_token: string = config.find(con => con.key == "channel_access_token")?.value

    if (!channel_secret) return [false, 3];
    if (!channel_access_token) return [false, 4];

    const data: IApp | null = await AppModel.findById(id);
    if (!data) return [false, 5];

    apps.push({
        id: data._id,
        type: data.type,
        app: new LineApp(id, {
            channelSecret: channel_secret,
            channelAccessToken: channel_access_token
        })
    })

    return [true, 200]
}

export const onEvent = async (event: WebhookEvent, id: string) => {
    const app = (apps.find((app) => app.id == id) as App).app

    switch (event.type) {
        case "message":
            if (event.message.type != "text") {
                return console.error(`NOT SUPPORT MESSAGE TYPE : ${event.message.type}`)
            };

            app.message(event, event.message.text)
            Logger.msg(app.id, event);
            break;
        case "postback":
            const payload = JSON.parse(event.postback.data);

            app.context(event, payload)
            Logger.context(app.id, event);
            break;
        default:
            console.error(`NOT SUPPORT : ${event.type}`);
            break
    }
}
