import { model, Schema, Document, Types } from "mongoose";

export interface IPlant {
  _id?: Types.ObjectId;
  createdAt: Date;
  title: string;
  subtitle: string;
  imageURLs: string[];
  light: string[];
  difficulty: string[];
  petToxicity: string;
}

export type PlantDocument = Document<IPlant>;

export const plantSchema = new Schema<PlantDocument>({
  createdAt: Date,
  title: String,
  subtitle: String,
  imageURLs: [String],
  light: [String],
  difficulty: [String],
  petToxicity: String,
});

export const Plant = model("Plant", plantSchema, "plants");
