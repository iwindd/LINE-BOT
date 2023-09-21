import { Client, ClientConfig, ReplyableEvent } from "@line/bot-sdk";
import { Reply } from "./controllers/ReplyController";
import UserModel, { IUser } from "../../models/UserModel";
import { CutMessage } from "../lib";
import { isCommand } from "./command";
import { Args } from "./command/typings";

export class LineApp {
    public id: string;
    public client: Client;
    public reply: Reply;
    public users: IUser[];

    constructor(id: string, config: ClientConfig) {
        this.id = id;
        this.client = new Client(config); // Create a client instance with your tokens
        this.reply = new Reply(id, this.client);
        this.users = [];
    }

    /**
     * message 
     */
    public message(event: ReplyableEvent, message: string): void {
        const [header, args] = CutMessage(message);
        const command = isCommand(header);

        return command ? (
            command.execute(this, event, args as any)
        ) : (
            this.reply.apply(event, header)
        );
    }

    /**
     * getUser
    */
    public async getUser(userId: string) {
        if (!userId) return;

        const index = this.users.find((user) => user.userId == userId);
        const user: IUser | null = index || await UserModel.findOne({ userId });

        if (!index && user) {
            this.users.push(user)
        } else if (!index && !user) {
            const { displayName } = await this.client.getProfile(userId);

            return await UserModel.create({
                userId,
                appId: this.id,
                title: displayName
            });
        }
        return user
    }
}
