import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    _id: string,
    username: string,
    email: string,
    password: string
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: [true, 'username_required'] },
    email:    { type: String, required: [true, 'email_required'] },
    password: { type: String, required: [true, 'password_required'] },
})

export default mongoose.model<IUser>('User', UserSchema);