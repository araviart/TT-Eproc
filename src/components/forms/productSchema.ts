import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif"),
  image: z.string().url().optional(),
  category: z.array(z.string()).min(1, "Au moins une catégorie est requise"),
});