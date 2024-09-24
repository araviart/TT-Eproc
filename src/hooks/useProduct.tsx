// src/hooks/useProducts.tsx
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../service/api';
import { Product } from '@/types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data['hydra:member']);
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