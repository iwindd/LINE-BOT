import { Client, ReplyableEvent } from "@line/bot-sdk";
import ReplyModel, { IReply } from "../models/ReplyModel";

export class Reply {
    public replies: IReply[] = [];
    private client: Client;

    constructor(id: string, client: Client) {
        this.client = client
        ReplyModel.find({ app: id })
            .then((replies) => {
                this.replies = replies
            })
    }

    /**
     * isReply
    */
    public hasReply(msg: string): IReply | undefined {
        return this.replies.find((reply) => reply.command == msg)
    }

    /**
     * apply
    */
    public apply(event: ReplyableEvent, msg: string) {
        const replyMsg = this.hasReply(msg)?.reply;

        if (!replyMsg) return false;
        if (!event?.replyToken) return false;

        this.client.replyMessage(event.replyToken, JSON.parse(replyMsg as any))
            .catch((e) => console.log("ERROR CANNOT REPLY", e)) 
    }
}