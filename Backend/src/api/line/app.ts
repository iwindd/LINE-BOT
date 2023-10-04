import { Client, ClientConfig, ReplyableEvent } from "@line/bot-sdk";
import { Reply } from "./controllers/ReplyController";
import { CutMessage } from "../lib/lib";
import { isCommand } from "./command";
import UserModel, { IUser } from "../../models/UserModel";
import { LineUser, getUser } from "../lib/user";

export class LineApp {
    public id: string;
    public client: Client;
    public reply: Reply;
    public _users: IUser[];
    public users: LineUser[] = [];

    constructor(id: string, config: ClientConfig) {
        this.id = id;
        this.client = new Client(config); // Create a client instance with your tokens
        this.reply = new Reply(id, this.client);
        this._users = [];
    }

    /**
     * message 
     */
    public async message(event: ReplyableEvent, message: string) {
        const [header, args] = CutMessage(message);
        const command = isCommand(header);
        const user = await getUser(event.source.userId as string, this) as LineUser;
        this.use(user as LineUser)

        return command ? (
            command.execute(this, event, user, args as any)
        ) : (
            this.reply.apply(event, header)
        );
    }

    private use(user: LineUser) {
        if (!this.users.find((user) => user.userId)) {
            return this.users.push(user);
        }
    }
}
