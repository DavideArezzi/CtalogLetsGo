import { useState, useCallback } from 'react';
import { storage } from '../../../core/storage/storage';
import { PREFERRED_PRODUCTS } from '../../../core/storage/types';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const refreshProducts = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
      const data: Product[] = await response.json();
      setInitialProducts([...data]);
      setProducts([...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.getItem(PREFERRED_PRODUCTS);
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteIds(parsedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const addFavorite = useCallback(
    async (item: Product) => {
      const updatedFavorites = favoriteIds.includes(item.id)
        ? favoriteIds.filter((id) => id !== item.id)
        : [...favoriteIds, item.id];

      setFavoriteIds(updatedFavorites);
      try {
        await storage.setItem(PREFERRED_PRODUCTS, JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    },
    [favoriteIds]
  );

  return {
    products,
    setProducts,
    initialProducts,
    setInitialProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
  };
};
