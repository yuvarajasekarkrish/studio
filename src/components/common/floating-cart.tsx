
'use client';

import * as React from 'react';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';
import { Sparkles, Download, Loader2, Send, ShoppingCart, Trash2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendOrderEmail } from '@/ai/flows/send-order-email-flow';
import { useCart } from '@/contexts/cart-context';
import { PACKAGING_COST } from '@/lib/products';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
        <title>WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);


export default function FloatingCart() {
    const { toast } = useToast();
    const { quantities, handleQuantityChange, itemsInCart, subtotal, grandTotal, calculateRowTotal, clearCart } = useCart();
    
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'review'>('cart');
    const orderSummaryRef = useRef<HTMLDivElement>(null);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress1, setCustomerAddress1] = useState('');
    const [customerAddress2, setCustomerAddress2] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerPincode, setCustomerPincode] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderDate, setOrderDate] = useState('');
    const [itemToRemove, setItemToRemove] = useState<string | null>(null);
    const [whatsAppMessage, setWhatsAppMessage] = useState('');

    const isAddressFormValid = !!(customerName && customerEmail && customerPhone && customerAddress1 && customerCity && customerPincode);

    const handleCheckout = () => {
        if (itemsInCart.length > 0) {
            setCheckoutStep('cart');
            setIsCheckoutOpen(true);
        } else {
            toast({
                title: "Your cart is empty",
                description: "Please add some products before checking out.",
            });
        }
    }
    
    const handleReviewOrder = () => {
        if (isAddressFormValid) {
            setCheckoutStep('review');
        } else {
            toast({
                variant: "destructive",
                title: "Incomplete Details",
                description: "Please fill in all required delivery details.",
            });
        }
    }

    const handleDownload = async () => {
        const input = orderSummaryRef.current;
        if (!input) return;

        const originalStyles = {
            maxHeight: input.style.maxHeight,
            overflowY: input.style.overflowY,
        };
        const scrollTop = input.scrollTop;
        
        input.style.maxHeight = 'none';
        input.style.overflowY = 'visible';
        input.scrollTop = 0;
        
        try {
            const canvas = await html2canvas(input, {
                scale: 2, 
                useCORS: true,
                logging: false,
                scrollY: -window.scrollY,
                windowWidth: input.scrollWidth,
                windowHeight: input.scrollHeight,
            });
            
            input.style.maxHeight = originalStyles.maxHeight;
            input.style.overflowY = originalStyles.overflowY;
            input.scrollTop = scrollTop;

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
            
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft > 0) {
                position = position - pdf.internal.pageSize.getHeight();
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }
            
            pdf.save('maharaj-pyrotech-order.pdf');

        } catch (error) {
            console.error("Error generating PDF:", error);
            toast({
                variant: "destructive",
                title: "PDF Generation Failed",
                description: "There was an error creating the PDF file. Please try again.",
            });
        } finally {
            if (input) {
                input.style.maxHeight = originalStyles.maxHeight;
                input.style.overflowY = originalStyles.overflowY;
                input.scrollTop = scrollTop;
            }
        }
    };
    
    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        try {
            const cartItemsText = itemsInCart
                .map(p => `- ${p.title.split(' / ')[0]} (Qty: ${quantities[p.title]}) -> ₹${calculateRowTotal(p.offerPrice, quantities[p.title] || 0)}`)
                .join('\n');
    
            const placedOnDate = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
            setOrderDate(placedOnDate);

            const packagingCostString = subtotal > 0 ? `₹${PACKAGING_COST.toFixed(2)}` : '₹0.00';

            // Prepare WhatsApp message
            const addressParts = [customerAddress1, customerAddress2, customerCity, customerPincode].filter(Boolean);
            const fullAddress = addressParts.join(', ');

            const waMessage = `*New Order from Maharaj Pyrotech!*

*Customer:* ${customerName}
*Phone:* ${customerPhone}
*Address:* ${fullAddress}

*Items:*
${cartItemsText}

*Subtotal:* ₹${subtotal.toFixed(2)}
*Packaging Cost:* ${packagingCostString}
*Grand Total:* *₹${grandTotal.toFixed(2)}*

*Order Date:* ${placedOnDate}`;
            
            setWhatsAppMessage(waMessage);

            await sendOrderEmail({
                customerName,
                customerEmail,
                customerPhone,
                customerAddress1,
                customerAddress2,
                customerCity,
                customerPincode,
                cartItemsText,
                subtotal: `₹${subtotal.toFixed(2)}`,
                packagingCost: packagingCostString,
                grandTotal: `₹${grandTotal.toFixed(2)}`,
                orderDate: placedOnDate,
            });
            
            setIsConfirmOpen(true);
    
        } catch (error) {
            console.error("Failed to place order:", error);
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            toast({
                variant: "destructive",
                title: "Error Placing Order",
                description: errorMessage,
            });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    const handleShareToWhatsApp = () => {
        const encodedMessage = encodeURIComponent(whatsAppMessage);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleConfirmRemoveItem = () => {
        if (itemToRemove) {
            handleQuantityChange(itemToRemove, 0);
        }
        setItemToRemove(null);
    };

    const handleQuantityChangeWithConfirmation = (title: string, quantity: number) => {
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

            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Order Placed Successfully!</AlertDialogTitle>
                        <AlertDialogDescription>
                           An order confirmation has been sent to the business owner. You can also download or share the order summary.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-start gap-2">
                        <Button variant="outline" onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                        <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleShareToWhatsApp}>
                            <WhatsAppIcon className="mr-2 h-4 w-4" /> Share on WhatsApp
                        </Button>
                         <AlertDialogCancel onClick={() => {
                            setIsConfirmOpen(false);
                            clearCart();
                            setIsCheckoutOpen(false);
                         }} className="sm:ml-auto">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={isCheckoutOpen} onOpenChange={(open) => {
                if (!open) {
                    setCheckoutStep('cart');
                }
                setIsCheckoutOpen(open);
            }}>
                <DialogContent className="sm:max-w-3xl bg-card">
                   {checkoutStep === 'cart' && (
                       <>
                            <DialogHeader>
                                <DialogTitle className="text-primary font-headline">Your Shopping Cart</DialogTitle>
                                <DialogDescription>
                                    Review and edit your items before proceeding to checkout.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="max-h-[60vh] overflow-y-auto p-1">
                                {itemsInCart.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="border">Product</TableHead>
                                                <TableHead className="w-28 text-center border">Quantity</TableHead>
                                                <TableHead className="text-right border">Total</TableHead>
                                                <TableHead className="w-12 border"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {itemsInCart.map(product => (
                                                <TableRow key={product.title}>
                                                    <TableCell className="font-medium border">
                                                        {product.title}
                                                        <p className="text-sm text-muted-foreground">@ ₹{product.offerPrice} each</p>
                                                    </TableCell>
                                                    <TableCell className="border">
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            value={quantities[product.title] || ''}
                                                            onChange={(e) => handleQuantityChangeWithConfirmation(product.title, parseInt(e.target.value))}
                                                            className="w-20 h-9 text-center mx-auto bg-input"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right font-bold border">
                                                        ₹{calculateRowTotal(product.offerPrice, quantities[product.title] || 0)}
                                                    </TableCell>
                                                    <TableCell className="border">
                                                        <Button variant="ghost" size="icon" onClick={() => setItemToRemove(product.title)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow className="bg-secondary/50 hover:bg-secondary/50 text-base">
                                                <TableCell colSpan={2} className="text-right font-semibold text-primary border">Subtotal</TableCell>
                                                <TableCell className="text-right font-semibold text-primary border" colSpan={2}>₹{subtotal.toFixed(2)}</TableCell>
                                            </TableRow>
                                            {subtotal > 0 && (
                                                <TableRow className="bg-secondary/50 hover:bg-secondary/50 text-base">
                                                    <TableCell colSpan={2} className="text-right font-semibold text-primary border">Packaging Cost</TableCell>
                                                    <TableCell className="text-right font-semibold text-primary border" colSpan={2}>₹{PACKAGING_COST.toFixed(2)}</TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow className="bg-secondary hover:bg-secondary text-lg">
                                                <TableCell colSpan={2} className="text-right font-bold text-xl text-primary border">Grand Total</TableCell>
                                                <TableCell className="text-right font-bold text-xl text-primary border" colSpan={2}>₹{grandTotal.toFixed(2)}</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <ShoppingCart className="w-16 h-16 mb-4 text-muted-foreground" />
                                        <h3 className="text-2xl font-bold font-headline text-primary">Your Cart is Empty</h3>
                                        <p className="mt-2 text-muted-foreground">Looks like you haven't added any fireworks yet.</p>
                                    </div>
                                )}
                            </div>
                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Continue Shopping</Button>
                                <Button
                                    onClick={() => setCheckoutStep('details')}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                    disabled={itemsInCart.length === 0}
                                >
                                    Proceed to Delivery Details
                                </Button>
                            </DialogFooter>
                       </>
                   )}
                   {checkoutStep === 'details' && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-primary font-headline">Delivery Details</DialogTitle>
                                <DialogDescription>
                                    Please provide your delivery address and contact information.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customer-name">Full Name</Label>
                                    <Input
                                        id="customer-name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="John Doe"
                                        className="bg-input"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer-email">Email Address</Label>
                                    <Input
                                        id="customer-email"
                                        type="email"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="bg-input"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer-phone">Phone Number</Label>
                                    <Input
                                        id="customer-phone"
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        placeholder="(+91) 98765 43210"
                                        className="bg-input"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address-line1">Address Line 1</Label>
                                    <Input
                                        id="address-line1"
                                        value={customerAddress1}
                                        onChange={(e) => setCustomerAddress1(e.target.value)}
                                        placeholder="House No, Street Name"
                                        className="bg-input"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
                                    <Input
                                        id="address-line2"
                                        value={customerAddress2}
                                        onChange={(e) => setCustomerAddress2(e.target.value)}
                                        placeholder="Apartment, suite, etc."
                                        className="bg-input"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={customerCity}
                                        onChange={(e) => setCustomerCity(e.target.value)}
                                        placeholder="Sivakasi"
                                        className="bg-input"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input
                                        id="pincode"
                                        value={customerPincode}
                                        onChange={(e) => setCustomerPincode(e.target.value)}
                                        placeholder="626123"
                                        className="bg-input"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setCheckoutStep('cart')}>Back to Cart</Button>
                                <Button
                                    onClick={handleReviewOrder}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-primary/50"
                                    disabled={!isAddressFormValid}
                                >
                                    Review Order
                                </Button>
                            </DialogFooter>
                        </>
                   )}
                   {checkoutStep === 'review' && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-primary font-headline">Review Your Order</DialogTitle>
                                <DialogDescription>
                                    Please check your order and delivery details before confirming.
                                </DialogDescription>
                            </DialogHeader>
                            <div ref={orderSummaryRef} className="p-6 bg-background rounded-md border my-4 max-h-[50vh] overflow-y-auto">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-8 w-8 text-primary" />
                                        <span className="font-bold text-2xl font-headline text-primary">Maharaj Pyrotech</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-GB')}</p>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="font-bold text-lg font-headline mb-2 text-primary">Delivery Details</h3>
                                    <div className="text-sm space-y-1 text-foreground">
                                        <p><span className="font-semibold">Name:</span> {customerName || ' '}</p>
                                        <p><span className="font-semibold">Email:</span> {customerEmail || ' '}</p>
                                        <p><span className="font-semibold">Phone:</span> {customerPhone || ' '}</p>
                                        <p className="font-semibold">Address:</p>
                                        <p>{customerAddress1 || ' '}</p>
                                        {customerAddress2 && <p>{customerAddress2}</p>}
                                        {(customerCity || customerPincode) && (
                                            <p>{customerCity}{customerCity && customerPincode ? ', ' : ''}{customerPincode}</p>
                                        )}
                                    </div>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent border-b-primary/20">
                                            <TableHead className="w-3/5 border">Product</TableHead>
                                            <TableHead className="text-center border">Qty</TableHead>
                                            <TableHead className="text-right border">Price</TableHead>
                                            <TableHead className="text-right border">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {itemsInCart.map(product => (
                                            <TableRow key={product.title} className="hover:bg-secondary/30">
                                                <TableCell className="font-medium border">{product.title}</TableCell>
                                                <TableCell className="text-center border">{quantities[product.title]}</TableCell>
                                                <TableCell className="text-right border">₹{product.offerPrice}</TableCell>
                                                <TableCell className="text-right font-bold border">₹{calculateRowTotal(product.offerPrice, quantities[product.title] || 0)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow className="bg-secondary/50 hover:bg-secondary/50 text-base border-t-2 border-primary/20">
                                            <TableCell colSpan={3} className="text-right font-semibold text-primary border">Subtotal</TableCell>
                                            <TableCell className="text-right font-semibold text-primary border">₹{subtotal.toFixed(2)}</TableCell>
                                        </TableRow>
                                        {subtotal > 0 && (
                                            <TableRow className="bg-secondary/50 hover:bg-secondary/50 text-base">
                                                <TableCell colSpan={3} className="text-right font-semibold text-primary border">Packaging Cost</TableCell>
                                                <TableCell className="text-right font-semibold text-primary border">₹{PACKAGING_COST.toFixed(2)}</TableCell>
                                            </TableRow>
                                        )}
                                        <TableRow className="bg-secondary hover:bg-secondary text-lg">
                                            <TableCell colSpan={3} className="text-right font-bold text-xl text-primary border">Grand Total</TableCell>
                                            <TableCell className="text-right font-bold text-xl text-primary border">₹{grandTotal.toFixed(2)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setCheckoutStep('details')}>Back to Details</Button>
                                <Button 
                                    onClick={handlePlaceOrder} 
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                    disabled={isPlacingOrder}
                                >
                                    {isPlacingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {isPlacingOrder ? 'Processing Order...' : 'Confirm Order'}
                                </Button>
                            </DialogFooter>
                        </>
                   )}
                </DialogContent>
            </Dialog>

            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    size="icon"
                    className="relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-16 w-16 shadow-lg"
                    onClick={handleCheckout}
                    aria-label={`View cart, ${itemsInCart.length} items`}
                >
                    <ShoppingCart className="h-8 w-8" />
                    {itemsInCart.length > 0 && (
                        <span className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground border-2 border-background">
                            {itemsInCart.length}
                        </span>
                    )}
                </Button>
            </div>
        </>
    );
}
