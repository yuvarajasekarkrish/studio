
'use client';

import * as React from 'react';
import { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { getProducts } from '@/lib/products';
import { useToast } from "@/hooks/use-toast";

type Product = {
    title: string;
    actualPrice: string;
    offerPrice: string;
    stock: number;
};

type CartContextType = {
    quantities: Record<string, number>;
    handleQuantityChange: (title: string, quantity: number | string, stock: number) => void;
    itemsInCart: Product[];
    subtotal: number;
    grandTotal: number;
    calculateRowTotal: (offerPrice: string, quantity: number) => string;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const allProducts = getProducts().flatMap(category => category.items);
const productMap = new Map(allProducts.map(p => [p.title, p]));

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const { toast } = useToast();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const savedCart = localStorage.getItem('maharajPyrotechCart');
            if (savedCart) {
                const savedQuantities = JSON.parse(savedCart);
                const validQuantities: Record<string, number> = {};
                for (const title in savedQuantities) {
                    if (productMap.has(title)) {
                        validQuantities[title] = savedQuantities[title];
                    }
                }
                setQuantities(validQuantities);
            }
        } catch (error) {
            console.error('Could not load cart from localStorage', error);
            localStorage.removeItem('maharajPyrotechCart');
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem('maharajPyrotechCart', JSON.stringify(quantities));
        } catch (error) {
            console.error('Could not save cart to localStorage', error);
        }
    }, [quantities]);
    
    const handleQuantityChange = useCallback((title: string, value: string | number, stock: number) => {
        const product = productMap.get(title);
        if (!product) return;

        let numQuantity = typeof value === 'string' ? parseInt(value, 10) : value;

        if (isNaN(numQuantity) || numQuantity < 0) {
            numQuantity = 0;
        }
        
        let validatedQuantity = numQuantity;

        if (stock > 0 && numQuantity > stock) {
            toast({
                variant: "destructive",
                title: "Stock Limit Exceeded",
                description: `You can only order up to ${stock} of "${product.title.split(' / ')[0]}".`,
            });
            validatedQuantity = stock;
        }

        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            if (validatedQuantity > 0) {
                newQuantities[title] = validatedQuantity;
            } else {
                delete newQuantities[title];
            }
            return newQuantities;
        });
    }, [toast]);


    const clearCart = useCallback(() => {
        setQuantities({});
    }, []);

    const subtotal = useMemo(() => {
        return Object.entries(quantities).reduce((total, [title, quantity]) => {
            const product = productMap.get(title);
            if (product) {
                return total + (parseFloat(product.offerPrice) * quantity);
            }
            return total;
        }, 0);
    }, [quantities]);

    const grandTotal = useMemo(() => {
        const fee = subtotal > 0 ? subtotal * 0.03 : 0;
        return subtotal + fee;
    }, [subtotal]);

    const itemsInCart = useMemo(() => {
        return allProducts
            .filter(p => (quantities[p.title] || 0) > 0)
            .sort((a,b) => {
                const aIndex = allProducts.findIndex(p => p.title === a.title);
                const bIndex = allProducts.findIndex(p => p.title === b.title);
                return aIndex - bIndex;
            });
    }, [quantities]);

    const calculateRowTotal = useCallback((offerPrice: string, quantity: number) => {
        return (parseFloat(offerPrice) * (quantity || 0)).toFixed(2);
    }, []);

    const value = {
        quantities,
        handleQuantityChange,
        itemsInCart,
        subtotal,
        grandTotal,
        calculateRowTotal,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
