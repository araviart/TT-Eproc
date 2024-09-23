import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const categorySchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
  products: z.array(z.string()).optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryForm({
  onSubmit,
  defaultValues = {
    name: "",
    products: [],
  },
}: {
  onSubmit: (data: CategoryFormValues) => void;
  defaultValues?: CategoryFormValues;
}) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="customForm" size="sm" className="h-8 gap-1">Ajouter une catégorie</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="category-form">
        <DialogHeader>
          <DialogTitle>Ajoutez ou modifiez une catégorie</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            {/* TODO : ajoutez liste de produits */}
            <DialogFooter>
            <DialogClose asChild>
                <Button variant="customForm" type="submit">
                  Enregistrer
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" variant="ghost">Annuler</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
