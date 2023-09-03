import mongoose, { Schema, Document } from "mongoose";

export interface IConfig extends Document {
    key: string,
    value: any
}

const UserSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // User ID associated with the config
    key: { type: String, required: [true, 'key_required'] },
    value: { type: String, required: [true, 'value_required'] }
});

export default mongoose.model<IConfig>('Config', UserSchema);