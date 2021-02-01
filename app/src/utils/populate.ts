import { Types } from "mongoose";
import { IPlant, Plant, PlantDocument } from "../models/Plant";
import { IProduct, Product, ProductDocument } from "../models/Product";

export const generatePlants = async (count: number) => {
  const p: IPlant = {
    createdAt: new Date(),
    title: "Monstera Adansonii",
    subtitle: "California Tropicals",
    imageURLs: [
      "https://cdn.shopify.com/s/files/1/0284/2430/6787/files/top_pic_720x.png",
    ],
    light: ["low-light"],
    difficulty: ["beginner"],
    petToxicity: "non-toxic",
  };

  const asd = Array.from(Array(count).keys()).map((value) => {
    return { ...p, title: `${value}-${p.title}` };
  });

  return Plant.insertMany((asd as unknown) as PlantDocument[]);
};

export const generateProducts = async (count: number, plantId: string) => {
  const p: IProduct = {
    price: {
      value: 29.99,
      currency: "usd",
    },
    plant: new Types.ObjectId(plantId),
  };

  return Product.insertMany(new Array(count).fill(p));
};

export const seed = async (count = 10) => {
  await Promise.all([Plant.deleteMany({}), Product.deleteMany({})]);
  const plants = await generatePlants(count);
  const products = plants.map((plant) => ({
    price: {
      value: 29.99,
      currency: "usd",
    },
    plant: new Types.ObjectId((plant._id as unknown) as string),
  }));
  Product.insertMany((products as unknown) as ProductDocument[]);
};
