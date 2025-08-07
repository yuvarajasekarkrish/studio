
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
    handleQuantityChange: (title: string, quantity: number, stock: number) => void;
    itemsInCart: Product[];
    subtotal: number;
    grandTotal: number;
    calculateRowTotal: (offerPrice: string, quantity: number) => string;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const allProducts = getProducts().flatMap(category => category.items);
const productMap = new Map(allProducts.map(p => [p.title, p]));

// Custom hook for debouncing
function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const { toast } = useToast();

    // Load cart from localStorage only on initial mount
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

    // Debounce the quantities state
    const debouncedQuantities = useDebounce(quantities, 300);

    // Save to localStorage only when the debounced value changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem('maharajPyrotechCart', JSON.stringify(debouncedQuantities));
        } catch (error) {
            console.error('Could not save cart to localStorage', error);
        }
    }, [debouncedQuantities]);

    const handleQuantityChange = useCallback((title: string, quantity: number, stock: number) => {
        const product = productMap.get(title);
        if (!product) return;

        let validatedQuantity = quantity;

        if (validatedQuantity > stock) {
            toast({
                variant: "destructive",
                title: "Stock Limit Exceeded",
                description: `You can only order up to ${stock} of "${product.title.split(' / ')[0]}".`,
            });
            validatedQuantity = stock; // Correctly cap the quantity at the stock limit
        }

        setQuantities(prev => {
            const newQuantities = { ...prev };
            if (isNaN(validatedQuantity) || validatedQuantity <= 0) {
                delete newQuantities[title];
            } else {
                newQuantities[title] = validatedQuantity;
            }
            return newQuantities;
        });
    }, [toast]);


    const clearCart = useCallback(() => {
        setQuantities({});
    }, []);

    const subtotal = useMemo(() => {
        let total = 0;
        for (const title in quantities) {
            const product = productMap.get(title);
            if (product) {
                const quantity = quantities[title] || 0;
                total += parseFloat(product.offerPrice) * quantity;
            }
        }
        return total;
    }, [quantities]);

    const grandTotal = useMemo(() => {
        return subtotal > 0 ? subtotal * 1.03 : subtotal;
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
