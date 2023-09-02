import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string
}

const UserSchema: Schema = new Schema({
    username: String,
    email: String,
    password: String
})

export default mongoose.model<IUser>('User', UserSchema);