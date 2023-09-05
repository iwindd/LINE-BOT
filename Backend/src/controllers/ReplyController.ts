import { Client, ReplyableEvent, WebhookEvent } from "@line/bot-sdk";
import ReplyModel, { IReply } from "../models/ReplyModel";
import { LineApp } from "../api/line/classes/line";

export class Reply {
    public replys: IReply[] = [];
    private client : Client;

    constructor(id: string, client: Client) {
        this.client = client
        ReplyModel.find({ app: id })
            .then((replys) => {
                this.replys = replys
            })
    }

    /**
     * isReply
    */
    public hasReply(msg: string) {
        return this.replys.find((reply) => reply.command == msg)?.reply
    }

    /**
     * apply
     */
    public apply(event: ReplyableEvent, msg: string) {
        const replyMsg = this.hasReply(msg);

        if (!replyMsg) return false;
        if (!event?.replyToken) return false;

        this.client.replyMessage(event.replyToken, {
            type: "text",
            text: replyMsg
        });
    }
}