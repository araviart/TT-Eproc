import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { categorySchema } from "./categorySchema";

export type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryForm({
  onSubmit,
  defaultValues = {
    id: 0,
    name: "",
    products: [],
  },
  isOpen,
  onClose,
}: {
  onSubmit: (data: CategoryFormValues) => void;
  defaultValues?: CategoryFormValues;
  isOpen: boolean;
  onClose: () => void;
}) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  const handleSubmit = async (data: CategoryFormValues) => {
    const isValid = await form.trigger();
    if (isValid) {
      onSubmit(data);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="category-form">
        <DialogHeader>
          <DialogTitle>Ajoutez ou modifiez une catégorie</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la catégorie</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de la catégorie" {...field} />
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