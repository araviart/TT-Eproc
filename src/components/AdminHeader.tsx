import { useState } from "react"; // Importer useState
import Link from "next/link";
import {
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminCardProps } from "@/types/AdminCardProps";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ProductForm, ProductFormValues } from "./forms/productForm";
import { CategoryForm, CategoryFormValues } from "./forms/categoryForm";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";

const AdminHeader: React.FC<
  Pick<AdminCardProps, "selectedTab"> & {
    onAddClick: (data: Product | Category) => void;
  }
> = ({ selectedTab, onAddClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // État pour contrôler l'ouverture du formulaire
  const [currentItem, setCurrentItem] = useState<Product | Category | null>(
    null
  ); 

  const handleAddClick = () => {
    setCurrentItem(null);
    setIsDialogOpen(true); 
  };

  const handleFormClose = () => {
    setIsDialogOpen(false);
  }

  const handleCategoryFormSubmit = (data: CategoryFormValues) => {
    onAddClick(data);
    setIsDialogOpen(false);
  };
  
  // Pour ProductForm
  const handleProductFormSubmit = (data: ProductFormValues) => {
    onAddClick(data);
    setIsDialogOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex h-14 items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Panel</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="Rechercher"
            placeholder="Rechercher"
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </div>
      <div className="flex gap-2 pb-2">
        <Button
          variant="customForm"
          size="sm"
          className="h-8 gap-1"
          onClick={handleAddClick}
        >
          <PlusCircle className="h-4 w-4" />
          {selectedTab === "produits"
            ? "Ajouter un produit"
            : "Ajouter une catégorie"}
        </Button>

        {/* Formulaire pour ajouter un produit */}
        {selectedTab === "produits" && (
  <ProductForm
    isOpen={isDialogOpen}
    onClose={handleFormClose}
    onSubmit={handleProductFormSubmit}
    defaultValues={currentItem ? (currentItem as ProductFormValues) : undefined}

  />
)}

{selectedTab === "categories" && (
  <CategoryForm
    isOpen={isDialogOpen}
    onClose={handleFormClose}
    onSubmit={handleCategoryFormSubmit}
    defaultValues={currentItem as CategoryFormValues}
  />
)}
        {/* Menu de filtrage */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filtrer
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrer</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Options de filtrage */}
            <DropdownMenuCheckboxItem checked>
              Catégorie 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Catégorie 2</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Catégorie 3</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Catégorie 4</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
