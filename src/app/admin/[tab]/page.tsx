"use client";
import React from 'react';
import AdminSideBar from '@/components/AdminSideBar';
import AdminHeader from '@/components/AdminHeader';
import AdminCard from '@/components/AdminCard';
import { useProducts } from '@/hooks/useProduct';
import { useCategories } from '@/hooks/useCategory';
import { useParams } from 'next/navigation';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';

const AdminTabPage = () => {
  const tab = useParams().tab;
  console.log('tab:', tab);
  

  type HookResult = 
  | {
      type: 'products';
      products: Product[];
      loading: boolean;
      error: Error | null;
      addProduct: (data: any) => Promise<void>;
      editProduct: (id: string, data: any) => Promise<void>;
      removeProduct: (id: string) => Promise<void>;
    }
  | {
      type: 'categories';
      categories: Category[];
      loading: boolean;
      error: Error | null;
      addCategory: (data: any) => Promise<void>;
      editCategory: (id: string, data: any) => Promise<void>;
      removeCategory: (id: string) => Promise<void>;
    };

  let hookResult: HookResult | null = null;

  // Déterminer quel hook utiliser en fonction de l'onglet sélectionné
  if (tab === 'produits') {
    const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts();
    hookResult = {
      type: 'products',
      products,
      loading,
      error,
      addProduct,
      editProduct,
      removeProduct,
    };
  } else if (tab === 'categories') {
    const { categories, loading, error, addCategory, editCategory, removeCategory } = useCategories();
    hookResult = {
      type: 'categories',
      categories,
      loading,
      error,
      addCategory,
      editCategory,
      removeCategory,
    };
  }

  if (!hookResult) {
    return <div>Erreur</div>; // TODO : redirection vers not-found.tsx
  }

  // normalisation des données pour les passer au composant AdminCard
  const {
    items,
    addItem,
    editItem,
    removeItem,
    loading,
    error,
  } = hookResult.type === 'products'
    ? {
        items: hookResult.products,
        addItem: hookResult.addProduct,
        editItem: hookResult.editProduct,
        removeItem: hookResult.removeProduct,
        loading: hookResult.loading,
        error: hookResult.error,
      }
    : {
        items: hookResult.categories,
        addItem: hookResult.addCategory,
        editItem: hookResult.editCategory,
        removeItem: hookResult.removeCategory,
        loading: hookResult.loading,
        error: hookResult.error,
      };

      return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <AdminSideBar selectedTab={tab as string} />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <AdminHeader selectedTab={tab as string} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <AdminCard
                selectedTab={tab as string}
                items={items}
                loading={loading}
                error={error}
                addItem={addItem}
                editItem={editItem}
                removeItem={removeItem}
              />
            </main>
          </div>
        </div>
      );
    };
export default AdminTabPage;