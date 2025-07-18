
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
import { Sparkles, Download, Loader2, Send, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendOrderEmail } from '@/ai/flows/send-order-email-flow';
import { useCart } from '@/contexts/cart-context';
import { PACKAGING_COST } from '@/lib/products';

export default function FloatingCart() {
    const { toast } = useToast();
    const { quantities, handleQuantityChange, itemsInCart, subtotal, grandTotal, calculateRowTotal, clearCart } = useCart();
    
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'review'>('cart');
    const orderSummaryRef = useRef<HTMLDivElement>(null);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress1, setCustomerAddress1] = useState('');
    const [customerAddress2, setCustomerAddress2] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerPincode, setCustomerPincode] = useState('');
    const [isWhatsAppConfirmOpen, setIsWhatsAppConfirmOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderDate, setOrderDate] = useState('');

    const isAddressFormValid = !!(customerName && customerPhone && customerAddress1 && customerCity && customerPincode);

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

        // Store original styles and scroll position
        const originalStyles = {
            maxHeight: input.style.maxHeight,
            overflowY: input.style.overflowY,
        };
        const scrollTop = input.scrollTop;

        // Temporarily override styles to ensure full content is rendered for capture
        input.style.maxHeight = 'none';
        input.style.overflowY = 'visible';
        
        // Ensure we are at the top before capture
        input.scrollTop = 0;

        try {
            const canvas = await html2canvas(input, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                scrollY: -window.scrollY // Capture from top of the element
            });
            
            // Restore styles and scroll position immediately after capture
            input.style.maxHeight = originalStyles.maxHeight;
            input.style.overflowY = originalStyles.overflowY;
            input.scrollTop = scrollTop;

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Calculate the height of the image in the PDF's units
            const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
            
            let heightLeft = imgHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add new pages if the content is taller than one page
            while (heightLeft > 0) {
                position = position - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
            
            pdf.save('maharaj-pyropark-order.pdf');

        } catch (error) {
            console.error("Error generating PDF:", error);
            toast({
                variant: "destructive",
                title: "PDF Generation Failed",
                description: "There was an error creating the PDF file. Please try again.",
            });
        } finally {
            // Ensure styles are restored even on error
            input.style.maxHeight = originalStyles.maxHeight;
            input.style.overflowY = originalStyles.overflowY;
            input.scrollTop = scrollTop;
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

            await sendOrderEmail({
                customerName,
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
            
            setIsWhatsAppConfirmOpen(true);
    
        } catch (error) {
            console.error("Failed to place order:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to place order. Please try again.",
            });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    const handleSendWhatsAppConfirmation = () => {
        const cartItemsText = itemsInCart
            .map(p => `- ${p.title.split(' / ')[0]} (Qty: ${quantities[p.title]}) -> ₹${calculateRowTotal(p.offerPrice, quantities[p.title] || 0)}`)
            .join('\n');
        
        const address_line_2 = customerAddress2 ? `\n${customerAddress2}` : '';
        
        let financialDetails = `*Subtotal: ₹${subtotal.toFixed(2)}*`;
        if (subtotal > 0) {
            financialDetails += `\n*Packaging Cost: ₹${PACKAGING_COST.toFixed(2)}*`;
        }
        financialDetails += `\n*Grand Total: ₹${grandTotal.toFixed(2)}*`;
        
        const message = `
🎉 *New Order from Maharaj Pyropark* 🎉

*Customer Details:*
👤 Name: ${customerName}
📱 Phone: ${customerPhone}
🏠 Address: ${customerAddress1}${address_line_2}
📍 ${customerCity}, ${customerPincode}

---

*Order Summary:*
${cartItemsText}

---

${financialDetails}

Order placed on: ${orderDate}
        `.trim().replace(/\n\n+/g, '\n\n');

        const encodedMessage = encodeURIComponent(message);

        const businessPhone = '919843529357';
        const customerPhoneSanitized = customerPhone.replace(/[^0-9]/g, '');

        const businessUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;
        window.open(businessUrl, '_blank');

        if (customerPhoneSanitized) {
            const customerUrl = `https://wa.me/${customerPhoneSanitized}?text=${encodedMessage}`;
            window.open(customerUrl, '_blank');
        }
        setIsWhatsAppConfirmOpen(false);
        clearCart();
        setIsCheckoutOpen(false);
    };

    return (
        <>
            <AlertDialog open={isWhatsAppConfirmOpen} onOpenChange={setIsWhatsAppConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Order Placed!</AlertDialogTitle>
                        <AlertDialogDescription>
                            The order has been recorded. You can now download the order PDF or send a confirmation to the customer via WhatsApp.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel onClick={() => {
                            setIsWhatsAppConfirmOpen(false);
                            clearCart();
                            setIsCheckoutOpen(false);
                         }}>Close</AlertDialogCancel>
                         <Button variant="outline" onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                         <AlertDialogAction onClick={handleSendWhatsAppConfirmation}>
                            <Send className="mr-2 h-4 w-4" /> Send WhatsApp
                        </AlertDialogAction>
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
                                                            onChange={(e) => handleQuantityChange(product.title, parseInt(e.target.value))}
                                                            className="w-20 h-9 text-center mx-auto bg-input"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right font-bold border">
                                                        ₹{calculateRowTotal(product.offerPrice, quantities[product.title] || 0)}
                                                    </TableCell>
                                                    <TableCell className="border">
                                                        <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(product.title, 0)}>
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
                                <div className="md:col-span-2 space-y-2">
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
                                        <span className="font-bold text-2xl font-headline text-primary">Maharaj Pyropark</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-GB')}</p>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="font-bold text-lg font-headline mb-2 text-primary">Delivery Details</h3>
                                    <div className="text-sm space-y-1 text-foreground">
                                        <p><span className="font-semibold">Name:</span> {customerName || ' '}</p>
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
                                    {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
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
