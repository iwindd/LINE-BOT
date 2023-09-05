import { Client } from '@line/bot-sdk';

export type ApiType = "LINE"
export type AppType = "Hotel"
export interface App {
    id: string,
    type: AppType,
    client: Client
}