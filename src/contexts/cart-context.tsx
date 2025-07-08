
'use client';

import * as React from 'react';
import { useState, useEffect, createContext, useContext, useMemo, useCallback, useRef } from 'react';
import { productData, PACKAGING_COST } from '@/lib/products';

type Product = {
    title: string;
    actualPrice: string;
    offerPrice: string;
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

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            try {
                const savedCart = localStorage.getItem('maharajPyroparkCart');
                if (savedCart) {
                    setQuantities(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error('Could not load cart from localStorage', error);
            }
            isInitialMount.current = false;
        } else {
            try {
                localStorage.setItem('maharajPyroparkCart', JSON.stringify(quantities));
            } catch (error) {
                console.error('Could not save cart to localStorage', error);
            }
        }
    }, [quantities]);

    const handleQuantityChange = useCallback((title: string, quantity: number) => {
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
        for (const category of productData) {
            for (const product of category.items) {
                const quantity = quantities[product.title] || 0;
                total += parseFloat(product.offerPrice) * quantity;
            }
        }
        return total;
    }, [quantities]);

    const grandTotal = useMemo(() => {
        return subtotal > 0 ? subtotal + PACKAGING_COST : subtotal;
    }, [subtotal]);

    const itemsInCart = useMemo(() => {
        return productData
            .flatMap(c => c.items)
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
