"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./productSchema";
import { useCategories } from "@/hooks/useCategory";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "@/components/multi-select"; // Importation du composant MultiSelect
import { useState } from "react";

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({
  onSubmit,
  defaultValues = {
    name: "",
    description: "",
    price: 0,
    image: "",
    category: [""], // default array for multiple categories
  },
}: {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
}) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { categories, loading } = useCategories(); // Utiliser le hook pour récupérer les catégories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValues.category
  );

  const handleCategoryChange = (selected: string[]) => {
    const formattedCategories = selected
      .filter((id) => id !== undefined)
      .map((id) => `/categories/${id}`);
    setSelectedCategories(formattedCategories);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="customForm" size="sm" className="h-8 gap-1">
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajoutez ou modifiez un produit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              (data) => {
                console.log("Form Data:", data);
                console.log("Selected Categories:", selectedCategories);
                onSubmit({
                  ...data,
                  category: selectedCategories, // Ne pas ajouter de chaîne vide ici, le schéma de validation gérera ça
                });
              },
              (e) => {
                console.log("Form Errors:", e);
              }
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du produit</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description du produit</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien vers l'image</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Lien vers l'image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prix"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel>Catégorie(s)</FormLabel>
                  <FormControl>
                    {!loading && (
                      <MultiSelect
                        options={categories.map((category) => ({
                          value: category.id?.toString() || "",
                          label: category.name,
                        }))}
                        onValueChange={handleCategoryChange}
                        defaultValue={selectedCategories.map(
                          (cat) => cat.split("/").pop()!
                        )}
                        placeholder="Sélectionner des catégories"
                        variant="default"
                        maxCount={5} // nb max d'elem avant de résumer
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="customForm" type="submit">
                  Enregistrer
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Annuler
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
