
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useCart } from '@/contexts/cart-context';
import { getProducts } from '@/lib/products';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

const productData = getProducts();

export default function ProductList() {
    const { quantities, handleQuantityChange, calculateRowTotal, grandTotal } = useCart();
    const [itemToRemove, setItemToRemove] = useState<string | null>(null);

    const handleConfirmRemoveItem = () => {
        if (itemToRemove) {
            const product = getProducts().flatMap(c => c.items).find(p => p.title === itemToRemove);
            handleQuantityChange(itemToRemove, 0, product?.stock ?? 0);
        }
        setItemToRemove(null);
    };

    const handleQuantityBlur = (title: string, quantity: string, stock: number) => {
        if (quantity === '') {
            handleQuantityChange(title, 0, stock);
        }
    };


    return (
        <>
            <AlertDialog open={!!itemToRemove} onOpenChange={(open) => !open && setItemToRemove(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will remove "{itemToRemove?.split(' / ')[0]}" from your cart.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setItemToRemove(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmRemoveItem}>
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="bg-card p-2 sm:p-6 rounded-lg shadow-xl border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-2/5 border">Product</TableHead>
                            <TableHead className="text-right border">MRP</TableHead>
                            <TableHead className="text-right text-primary font-bold border">Offer (80% Off)</TableHead>
                            <TableHead className="text-center w-28 border">Quantity</TableHead>
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
                                                {product.stock === 0 && (
                                                    <Badge variant="destructive" className="ml-2">Out of Stock</Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground line-through border">₹{product.actualPrice}</TableCell>
                                        <TableCell className="text-right font-bold text-primary border">₹{product.offerPrice}</TableCell>
                                        <TableCell className="border">
                                            <Input
                                                type="number"
                                                min="0"
                                                value={quantities[product.title] || ''}
                                                onBlur={(e) => handleQuantityBlur(product.title, e.target.value, product.stock)}
                                                onChange={(e) => handleQuantityChange(product.title, e.target.value, product.stock)}
                                                className="w-20 h-9 text-center mx-auto bg-input"
                                                placeholder="0"
                                                disabled={product.stock === 0}
                                            />
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
                            <TableCell colSpan={4} className="text-right font-bold text-xl text-primary border">Subtotal</TableCell>
                            <TableCell className="text-right font-bold text-xl text-primary border">₹{grandTotal.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    );
}
