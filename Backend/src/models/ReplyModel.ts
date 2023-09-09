import { Message } from "@line/bot-sdk";
import mongoose, { Schema, Document } from "mongoose";

export interface IReply extends Document {
    app: string,
    command: string,
    reply: Message | Message[]
}

const UserSchema: Schema = new Schema({
    app: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    command: { type: String, required: [true, 'command_required'] },
    reply: { type: String, required: [true, 'reply_required'] }
});

export default mongoose.model<IReply>('Reply', UserSchema);