import { WebhookEvent } from "@line/bot-sdk"
import LogModel from "../models/LogModel"

export const msg = async (app: string, webhook: WebhookEvent) => {
    if (webhook.type != "message") return;
    if (webhook.message.type != "text") return;
    
    return await LogModel.create({
        app ,
        type: webhook.type,
        userId : String(webhook.source.userId),
        data : webhook.message.text
    })
}

export const context = async (app: string, webhook: WebhookEvent) => {
/*     if (webhook.type != "postback") return;

    return await LogModel.create({
        app, 
        type: webhook.type,
        userId : String(webhook.source.userId),
        data : webhook.postback
    }) */
}
