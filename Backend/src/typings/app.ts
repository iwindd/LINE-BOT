import { LineApp } from "../api/line/classes/line"

export type ApiType = "LINE"
export type AppType = "Hotel"
export interface App {
    id: string,
    type: AppType,
    app: LineApp
}