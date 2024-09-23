// src/hooks/useCategories.ts
import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../service/api';
import { Category } from '@/types/Category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      console.log('Categories reçu:', response.data);
      setCategories(response.data['hydra:member']);
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
  
  const addCategory = async (data: any) => {
    setLoading(true);
    try {
      await createCategory(data);
      await fetchCategories();
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
  
  const editCategory = async (id: string, data: any) => {
    setLoading(true);
    try {
      await updateCategory(id, data);
      await fetchCategories();
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
  
  const removeCategory = async (id: string) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      await fetchCategories();
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
  
  return { categories, loading, error, addCategory, editCategory, removeCategory };
};