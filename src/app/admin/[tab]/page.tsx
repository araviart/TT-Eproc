"use client";
// src/app/admin/[tab]/page.tsx
import React from 'react';
import { useProducts } from '@/hooks/useProduct';
import { useCategories } from '@/hooks/useCategory';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import AdminSideBar from '@/components/AdminSideBar';
import AdminHeader from '@/components/AdminHeader';
import AdminCard from '@/components/AdminCard';
import { useParams } from 'next/navigation';

const AdminTabPage = () => {
  const tab = useParams().tab;

  let hookResult: {
    type: 'products' | 'categories';
    items: Product[] | Category[];
    loading: boolean;
    error: any;
    addItem: (data: Product | Category) => Promise<void>;
    editItem: (id: string, data: Product | Category) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
  } | null = null;

  if (tab === 'produits') {
    const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts();
    hookResult = {
      type: 'products',
      items: products,
      loading,
      error,
      addItem: addProduct,
      editItem: editProduct,
      removeItem: removeProduct,
    };
  } else if (tab === 'categories') {
    const { categories, loading, error, addCategory, editCategory, removeCategory } = useCategories();
    hookResult = {
      type: 'categories',
      items: categories,
      loading,
      error,
      addItem: addCategory,
      editItem: editCategory,
      removeItem: removeCategory,
    };
  }

  const handleFormSubmit = async (data: Product | Category) => {
    if (hookResult) {
      if (data.id) {
        await hookResult.editItem(data.id.toString(), data);
      } else {
        await hookResult.addItem(data); 
      }
    }
  };

  if (!hookResult) {
    return <div>Erreur: onglet non trouvé</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSideBar selectedTab={tab as string} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader selectedTab={tab as string} onAddClick={handleFormSubmit} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <AdminCard
            selectedTab={tab as string}
            items={hookResult.items}
            loading={hookResult.loading}
            error={hookResult.error}
            addItem={hookResult.addItem}
            editItem={hookResult.editItem}
            removeItem={hookResult.removeItem}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminTabPage;