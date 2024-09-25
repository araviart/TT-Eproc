import { useState, useEffect } from 'react';
import { createProduct, deleteProduct, getCategory, getProduct, getProducts, updateProduct } from '../service/api';
import { Product } from '@/types/Product';

export const useProducts = (selectedCategoryId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let productsData: Product[] = [];

      if (selectedCategoryId) {
        // récupère les détails de la catégorie
        const categoryResponse = await getCategory(selectedCategoryId);
        const categoryData = categoryResponse.data;

        // extraire les URLs des produits
        const productUrls: string[] = categoryData.products;

        // récupère les détails de chaque produit
        const productPromises = productUrls.map(async (productUrl) => {
          const productId = productUrl.split('/').pop();
          const productResponse = await getProduct(productId?.toString() || '');
          return productResponse.data;
        });

        productsData = await Promise.all(productPromises);
      } else {
        // récupère tous les produits
        const response = await getProducts();
        productsData = response.data['hydra:member'];
      }

      setProducts(productsData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Une erreur inconnue s'est produite"));
      }
    } finally {
      setLoading(false);
    }
  };


  const addProduct = async (data: any) => {
    setLoading(true);
    try {
      await createProduct(data);
      await fetchProducts();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Une erreur est survenue")); // voir avec un fichier not found
      }
    } finally {
      setLoading(false);
    }
  };
  
  const editProduct = async (id: string, data: any) => {
    setLoading(true);
    try {
      await updateProduct(id, data);
      await fetchProducts();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };
  
  const removeProduct = async (id: string) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, addProduct, editProduct, removeProduct };
};