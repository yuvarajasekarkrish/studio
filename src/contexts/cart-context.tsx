
'use client';

import * as React from 'react';
import { useState, useEffect, createContext, useContext, useMemo, useCallback, useRef } from 'react';
import { productData, PACKAGING_COST } from '@/lib/products';
import { useToast } from "@/hooks/use-toast";

type Product = {
    title: string;
    actualPrice: string;
    offerPrice: string;
    stock: number;
};

type CartContextType = {
    quantities: Record<string, number>;
    handleQuantityChange: (title: string, quantity: number) => void;
    itemsInCart: Product[];
    subtotal: number;
    grandTotal: number;
    calculateRowTotal: (offerPrice: string, quantity: number) => string;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const allProducts = productData.flatMap(category => category.items);
const productMap = new Map(allProducts.map(p => [p.title, p]));

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const isInitialMount = useRef(true);
    const { toast } = useToast();

    useEffect(() => {
        if (isInitialMount.current) {
            try {
                const savedCart = localStorage.getItem('maharajPyrotechCart');
                if (savedCart) {
                    setQuantities(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error('Could not load cart from localStorage', error);
            }
            isInitialMount.current = false;
        } else {
            try {
                localStorage.setItem('maharajPyrotechCart', JSON.stringify(quantities));
            } catch (error) {
                console.error('Could not save cart to localStorage', error);
            }
        }
    }, [quantities]);

    const handleQuantityChange = useCallback((title: string, quantity: number) => {
        const product = productMap.get(title);
        if (!product) return;

        setQuantities(prev => {
            const newQuantities = { ...prev };
            if (isNaN(quantity) || quantity <= 0) {
                delete newQuantities[title];
            } else {
                newQuantities[title] = quantity;
            }
            return newQuantities;
        });
    }, []);

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
        return subtotal > 0 ? subtotal + PACKAGING_COST : subtotal;
    }, [subtotal]);

    const itemsInCart = useMemo(() => {
        return allProducts
            .filter(p => (quantities[p.title] || 0) > 0);
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
