import { Category } from "@/types/Category";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
}