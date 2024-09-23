import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AdminTable from './AdminTable';
import { AdminCardProps } from '@/types/AdminCardProps';

const AdminCard: React.FC<AdminCardProps> = ({ selectedTab, items, loading, error, addItem, editItem, removeItem }) => {
  const columns = items.length > 0 ? Object.keys(items[0]) : [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading... (afficher skeleton)</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <AdminTable
          items={items}
          columns={columns}
          editItem={(id) => editItem(id, {})} // passe un objet vide pour data par défaut
          removeItem={removeItem}
        />
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs">
          Affiche <strong>{items.length}</strong> {selectedTab}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminCard;
