import { LineApp } from "../api/line/app"

export type ApiType = "LINE"
export type AppType = "Hotel"
export interface App {
    id: string,
    type: AppType,
    app: LineApp
}

