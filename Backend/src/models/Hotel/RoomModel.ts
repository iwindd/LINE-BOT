import mongoose, { Schema, Document } from "mongoose";
import { HRoom } from "../../controllers/Hotel/RoomController";
export interface IHRoom extends HRoom, Document {}

const RoomSchema: Schema = new Schema({
    appId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    title: { type: String, required: [true, 'title_required'] },
    description: { type: String, required: [true, 'description_required'] },
    images: { type: Array, required: [true, 'images_required']}
});

export default mongoose.model<IHRoom>('Hotel.Room', RoomSchema);