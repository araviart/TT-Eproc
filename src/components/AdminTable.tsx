// components/AdminTable.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

const AdminTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Nom</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead className="hidden md:table-cell">Catégorie</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="hidden sm:table-cell">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              height="64"
              src="/placeholder.svg"
              width="64"
            />
          </TableCell>
          <TableCell className="font-medium">
            Laser Lemonade Machine
          </TableCell>
          <TableCell className="hidden md:table-cell">
            $499.99
          </TableCell>
          <TableCell className="hidden md:table-cell">
            25
          </TableCell>
          <TableCell className="hidden md:table-cell">
            2023-07-12 10:42 AM
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Modifier</DropdownMenuItem>
                <DropdownMenuItem>Supprimer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AdminTable;