import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    appId: string,
    userId: string,
    title: string,
    state: number,
}

const UserSchema: Schema = new Schema({
    appId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    userId: { type: String, required: true},
    title: { type: String, required: true},
    state: { type: Number, default: 0}
});

export default mongoose.model<IUser>('User', UserSchema);