import mongoose, { Schema, Document } from "mongoose";
import { AppType } from "../typings/app";

export interface IApp extends Document {
    username: string,
    email: string,
    password: string,
    type: AppType
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: [true, 'username_required'] },
    email: { type: String, required: [true, 'email_required'] },
    password: { type: String, required: [true, 'password_required'] },
    type: { type: String, required: [true, 'type_required'] }
})

export default mongoose.model<IApp>('App', UserSchema);