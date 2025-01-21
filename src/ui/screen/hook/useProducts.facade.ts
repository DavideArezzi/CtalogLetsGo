import { useState, useCallback } from 'react';
import { storage } from '../../../core/storage/storage';
import { PREFERRED_PRODUCTS } from '../../../core/storage/types';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image:string;
    rating: {
        rate: number;
        count: number;
      };
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [initialProducts,setInitialProducts] = useState<Product[]>([]);
const refreshProducts = useCallback(async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        data = await response.json();
        setInitialProducts([...DataTransfer.products]);
        setProducts([...DataTransfer.products]);
    } catch (error) {
        console.error('Error fetching producys:', error);
    }
 }, []);

 const loadFavorites = useCallback(async () => {
    try {
        const storedFavorites = await storage.getItem(PREFERRED_PRODUCTS);
        const parsedFavorites = storedFavolrites ? JSON.parse(storedFavorites) : [];
        setFavoriteIds(parsedFavorites);
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
 }, []);

 const addFavorite = useCallback(
    async (item: Product) => {
        const updateFavorites = favoriteIds.includes(item.id)
        ? favoriteIds.filter((id) => id !== item.id)
        : [...favoriteIds, item.id];

        setFavoriteIds(updatedFavorites);
        await storage.setItem(PREFERRED_PRODUCTS, JSON.stringify(updatedFavorites));
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