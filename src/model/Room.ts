import mongoose, { Document } from "mongoose";
import { ICharacter } from "./Character";

export interface IRoom extends Document {
  name: string;
  users: mongoose.Schema.Types.ObjectId[];
}

const RoomSchema = new mongoose.Schema(
  {
    name: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    versionKey: false,
  }
);

const Room = mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
