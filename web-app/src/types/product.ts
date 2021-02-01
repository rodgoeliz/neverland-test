import { Plant } from './plant';

export interface Product {
  _id?: string;
  price: { value: number; currency: string };
  plant: Plant;
}
