
'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useCart } from '@/contexts/cart-context';
import { getProducts } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

const productData = getProducts();

export default function ProductList() {
    const { quantities, handleQuantityChange, calculateRowTotal, grandTotal } = useCart();
    
    const onQuantityChange = (title: string, value: string, stock: number) => {
        const quantity = parseInt(value, 10);
        handleQuantityChange(title, isNaN(quantity) ? 0 : quantity, stock);
    };

    const handleQuantityBlur = (title: string, value: string, stock: number) => {
        if (value === '') {
            handleQuantityChange(title, 0, stock);
        }
    };

    return (
        <>
            <div className="bg-card p-2 sm:p-6 rounded-lg shadow-xl border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-2/5 border">Product</TableHead>
                            <TableHead className="text-right border">MRP</TableHead>
                            <TableHead className="text-right text-primary font-bold border">Offer (80% Off)</TableHead>
                            <TableHead className="text-center w-32 border">Quantity</TableHead>
                            <TableHead className="text-right border">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productData.map((category) => (
                            <React.Fragment key={category.category}>
                                <TableRow className="bg-secondary/70 hover:bg-secondary/70 border-b-2 border-primary/20">
                                    <TableCell colSpan={5} className="py-4 border">
                                        <div className="flex items-center gap-4 text-primary text-xl md:text-2xl font-bold font-headline">
                                            {React.cloneElement(category.icon, {className: "w-7 h-7"})}
                                            {category.category}
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {category.items.map((product) => (
                                    <TableRow key={`${category.category}-${product.title}`} className="hover:bg-secondary/50">
                                        <TableCell className="font-medium border">
                                            <div>
                                                {product.title}
                                                {product.stock > 0 && (quantities[product.title] || 0) >= product.stock && (
                                                    <Badge variant="destructive" className="ml-2 animate-pulse">Stock Limit Reached</Badge>
                                                )}
                                                {product.stock === 0 && (
                                                    <Badge variant="destructive" className="ml-2">Out of Stock</Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground line-through border">₹{product.actualPrice}</TableCell>
                                        <TableCell className="text-right font-bold text-primary border">₹{product.offerPrice}</TableCell>
                                        <TableCell className="border">
                                            <div className="flex items-center justify-center gap-2">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={quantities[product.title] || ''}
                                                    onBlur={(e) => handleQuantityBlur(product.title, e.target.value, product.stock)}
                                                    onChange={(e) => onQuantityChange(product.title, e.target.value, product.stock)}
                                                    className="w-20 h-9 text-center bg-input"
                                                    placeholder="0"
                                                    disabled={product.stock === 0}
                                                />
                                                {(quantities[product.title] || 0) > 0 && (
                                                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(product.title, 0, product.stock)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-bold border">
                                            ₹{calculateRowTotal(product.offerPrice, quantities[product.title] || 0)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-secondary hover:bg-secondary text-lg">
                            <TableCell colSpan={4} className="text-right font-bold text-xl text-primary border">Grand Total</TableCell>
                            <TableCell className="text-right font-bold text-xl text-primary border">₹{grandTotal.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    );
}
