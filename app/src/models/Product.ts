import { model, Schema, Document, Types } from "mongoose";
import { PlantDocument } from "./Plant";

export interface IProduct {
  _id?: Types.ObjectId;
  price: { value: number; currency: string };
  plant: Types.ObjectId | PlantDocument;
}

export type ProductDocument = Document<IProduct>;

const productSchema = new Schema<ProductDocument>({
  price: {
    value: Number,
    currency: String,
  },

  plant: {
    type: Schema.Types.ObjectId,
    ref: "Plant",
  },
});

export const Product = model("Product", productSchema, "products");
