import { Router } from "express";
import { getProducts } from "../services/products";

export const mainRouter: Router = Router();

mainRouter.get("/products", getProducts);
