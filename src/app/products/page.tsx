
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { useCart } from '@/contexts/cart-context';
import { productData, PACKAGING_COST } from '@/lib/products';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

export default function ProductsPage() {
    const { quantities, handleQuantityChange, calculateRowTotal, subtotal, grandTotal } = useCart();
    const [itemToRemove, setItemToRemove] = useState<string | null>(null);

    const handleConfirmRemoveItem = () => {
        if (itemToRemove) {
            handleQuantityChange(itemToRemove, 0);
        }
        setItemToRemove(null);
    };

    const handleQuantityChangeWithConfirmation = (title: string, quantity: number, stock: number) => {
        if (isNaN(quantity) || quantity <= 0) {
            setItemToRemove(title);
        } else {
            handleQuantityChange(title, quantity);
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
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow container max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                            The Great 80% Off Firework Sale!
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                            Dive into our incredible selection of fireworks, all at a staggering 80% discount! From dazzling rockets to crackling sparklers, find everything you need to create a truly spectacular show. Add your favorites to the cart and let the celebration begin!
                        </p>
                    </div>

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
                            {productData.map((category) => (
                                <TableBody key={category.category}>
                                    <TableRow className="bg-secondary/70 hover:bg-secondary/70 border-b-2 border-primary/20">
                                        <TableCell colSpan={5} className="py-4 border">
                                            <div className="flex items-center gap-4 text-primary text-xl md:text-2xl font-bold font-headline">
                                                {React.cloneElement(category.icon, {className: "w-7 h-7"})}
                                                {category.category}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {category.items.map((product) => (
                                        <TableRow key={product.title} className="hover:bg-secondary/50">
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
                                                    onChange={(e) => handleQuantityChangeWithConfirmation(product.title, parseInt(e.target.value), product.stock)}
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
                                </TableBody>
                            ))}
                            <TableFooter>
                                <TableRow className="bg-secondary/50 hover:bg-secondary/50 text-base">
                                    <TableCell colSpan={4} className="text-right font-semibold text-primary border">Subtotal</TableCell>
                                    <TableCell className="text-right font-semibold text-primary border">₹{subtotal.toFixed(2)}</TableCell>
                                </TableRow>
                                {subtotal > 0 && (
                                    <TableRow className="bg-secondary/50 hover:bg-secondary/50 text-base">
                                        <TableCell colSpan={4} className="text-right font-semibold text-primary border">Packaging Cost</TableCell>
                                        <TableCell className="text-right font-semibold text-primary border">₹{PACKAGING_COST.toFixed(2)}</TableCell>
                                    </TableRow>
                                )}
                                <TableRow className="bg-secondary hover:bg-secondary text-lg">
                                    <TableCell colSpan={4} className="text-right font-bold text-xl text-primary border">Grand Total</TableCell>
                                    <TableCell className="text-right font-bold text-xl text-primary border">₹{grandTotal.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
