import { Client, ClientConfig } from "@line/bot-sdk";
import { Reply } from "../../../controllers/ReplyController";

export class LineApp {
    public id: string;
    public client: Client;
    public reply : Reply

    constructor(id: string, config: ClientConfig) {
        this.id = id;
        this.client = new Client(config); // Create a client instance with your tokens
        this.reply  = new Reply(id, this.client)
    }

}
