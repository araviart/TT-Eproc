import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../service/api';
// import { Product } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(response => {
        console.log('Products reçu:', response.data);
        setProducts(response.data['hydra:member']); // Extraire les produits de response.data['hydra:member']
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};