import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./productSchema";
import { useCategories } from "@/hooks/useCategory";
import {
  Dialog,
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
import { MultiSelect } from "@/components/ui/multi-select"; 
import { useState, useEffect } from "react";


export type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({
  onSubmit,
  defaultValues = {
    name: "",
    description: "",
    price: 0,
    image: "",
    category: [],
  },
  isOpen,
  onClose,
}: {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
  isOpen: boolean;
  onClose: () => void;
}) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  const { categories, loading } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValues.category
  );

  const handleCategoryChange = (selected: string[]) => {
    console.log("Selected categories productForm:", selected);
    const formattedCategories = selected
      .filter((id) => id !== undefined)
      .map((id) => `/categories/${id}`);
    setSelectedCategories(formattedCategories);
    form.setValue("category", formattedCategories);
  };

  const handleSubmit = async (data: ProductFormValues) => {
    const isValid = await form.trigger();
    if (isValid) {
      onSubmit({
        ...data,
        category: selectedCategories,
      });
      onClose();
      form.reset();
    }
  };

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      setSelectedCategories(defaultValues.category);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajoutez ou modifiez un produit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (errors) => {
              console.log("Form validation errors:", errors);
            })}
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
                    <Input placeholder="Prix" type="number" {...field} />
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
                        defaultValue={selectedCategories?.map(
                          (cat) => cat.split("/").pop()!
                        )}
                        placeholder="Sélectionner des catégories"
                        variant="default"
                        maxCount={5}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="customForm" type="submit">
                Enregistrer
              </Button>
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
