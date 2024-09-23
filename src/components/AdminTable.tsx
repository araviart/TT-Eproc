import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getNumberColumns } from '@/lib/utils';

interface AdminTableProps {
  items: any[];  // les données du tableau, qui peuvent être des produits, des catégories (modulable)
  columns: string[];  // liste des colonnes à afficher 
  editItem: (id: string) => void;  // fonction edit un élément
  removeItem: (id: string) => void;  // fonction delete un élément
}

// fonction utilitaire pour faire le rendu des cellules du tableau
const renderTableCells = (item: any, columns: string[]) => {
  return columns.map((col, i) => (
    <TableCell key={i} className={getNumberColumns(i)}>
      {item[col]}
    </TableCell>
  ));
};

const AdminTable: React.FC<AdminTableProps> = ({ items, columns, editItem, removeItem }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // état pour l'élément sélectionné

  const handleDelete = (id: string) => {
    setSelectedItemId(id); // définir l'élément sélectionné pour suppression
  };

  const confirmDelete = () => {
    if (selectedItemId) {
      removeItem(selectedItemId); // appeler la fonction removeItem
      setSelectedItemId(null); // réinitialiser l'état après suppression
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead className={getNumberColumns(index)} key={index}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </TableHead>
          ))}
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            {renderTableCells(item, columns)}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => editItem(item.id)}>Modifier</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <AlertDialog open={selectedItemId !== null} onOpenChange={() => setSelectedItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedItemId(null)}>Annuler</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Table>
  );
};

export default AdminTable;
