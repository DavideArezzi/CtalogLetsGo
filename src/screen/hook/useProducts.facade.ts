import { useState, useCallback } from 'react';

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
return {
    products,
    setProducts,
    initialProducts,
    setInitialProducts,
 };
};