import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/ld+json',
  },
});
export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);
export const createProduct = (data: any) => api.post('/products', data);
export const updateProduct = (id: string, data: any) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);
export const getCategories = () => api.get('/categories');
export const getCategory = (id: string) => api.get(`/categories/${id}`);
export const createCategory = (data: any) => api.post('/categories', data);
export const updateCategory = (id: string, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);
