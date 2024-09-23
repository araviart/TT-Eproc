import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';

interface AdminTableProps {
  items: any[];  // les données du tableau, qui peuvent être des produits, des catégories (modulable)
  columns: string[];  // liste des colonnes à afficher 
  editItem: (id: string) => void;  // fonction edit un élément
  removeItem: (id: string) => void;  // fonction delete un élément
}

// fonction utilitaire pour générer les classes CSS conditionnelles pour les colonnes
const getNumberColumns = (index: number) => {
  if (index > 2) return 'hidden lg:table-cell';
  if (index > 1) return 'hidden md:table-cell';
  if (index > 0) return 'hidden sm:table-cell';
  return '';
};

// fonction utilitaire pour faire le rendu des cellules du tableau
const renderTableCells = (item: any, columns: string[]) => {
  return columns.map((col, i) => (
    <TableCell key={i} className={getNumberColumns(i)}>
      {item[col]}
    </TableCell>
  ));
};

const AdminTable: React.FC<AdminTableProps> = ({ items, columns, editItem, removeItem }) => {
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
                  <DropdownMenuItem onClick={() => editItem(item.id)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => removeItem(item.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;