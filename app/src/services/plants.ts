import { Response, Request } from "express";
import { PlantDocument, Plant } from "../models/Plant";

export const getPlants = async (req: Request, res: Response): Promise<void> => {
  const Plants: PlantDocument[] = await Plant.find();
  res.status(200).json({ Plants });
};

export const createPlant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const person = new Plant(req.body);
    const result = await person.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
