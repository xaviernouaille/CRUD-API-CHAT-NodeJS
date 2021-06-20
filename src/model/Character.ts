import mongoose, { Document } from "mongoose";

export interface ICharacter extends Document {
  name: string;
  age: number;
}

const CharacterSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const Character = mongoose.model<ICharacter>("Character", CharacterSchema);

export default Character;
