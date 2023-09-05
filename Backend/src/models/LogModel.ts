import mongoose, { Schema, Document } from "mongoose";

export type LogType = "message"
export interface ILog extends Document {
    app: string,
    type: LogType,
    userId: string,
    data: string
}

const UserSchema: Schema = new Schema({
    app: { type: String, required: [true, 'app_required'] },
    type: { type: String, required: [true, 'type_required'] },
    userId: { type: String, required: [true, 'userId_required'] },
    data: { type: String }
})

export default mongoose.model<ILog>('Log', UserSchema);