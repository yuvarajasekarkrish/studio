
'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';
import { Rocket, Sparkles, Star, Zap, Pencil, Gift, CloudDrizzle, ToyBrick, Droplets, Crosshair, Flame, Send, ShoppingCart, Trash2, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { sendOrderEmail } from '@/ai/flows/send-order-email-flow';

const productData = [
  {
    category: "One Sound Crackers",
    icon: <Rocket />,
    items: [
      { title: "2 3/4\" Kuruvi / குருவி Crackers", actualPrice: "75", offerPrice: "15" },
      { title: "3 1/2\" Lakshmi / லட்சுமி Crackers", actualPrice: "120", offerPrice: "24" },
      { title: "4\" Lakshmi special / லட்சுமி ஸ்பெஷல் Crackers", actualPrice: "150", offerPrice: "30" },
      { title: "4\" Lakshmi Deluxe / லட்சுமி டீலக்ஸ் Crackers", actualPrice: "195", offerPrice: "39" },
      { title: "4\"Gold Lakshmi / கோல்ட் லட்சுமி Crackers", actualPrice: "220", offerPrice: "44" },
      { title: "2 Sound / 2 சத்தம் Crackers", actualPrice: "215", offerPrice: "43" },
      { title: "3 Sound / 3 சத்தம் Crackers", actualPrice: "300", offerPrice: "60" },
      { title: "Lion Gun / லயன் கன்", actualPrice: "475", offerPrice: "95" },
    ],
  },
  {
    category: "Chakkar",
    icon: <Sparkles />,
    items: [
      { title: "Chakkaram Big / சக்கரம் பெரியது", actualPrice: "300", offerPrice: "60" },
      { title: "Chakkaram Special / சக்கரம் ஸ்பெஷல்", actualPrice: "590", offerPrice: "118" },
      { title: "Chakkaram Deluxe / சக்கரம் டீலக்ஸ்", actualPrice: "1000", offerPrice: "200" },
      { title: "Hot Wheel / ஹாட் வீல்", actualPrice: "450", offerPrice: "90" },
      { title: "Spin Master Mini / ஸ்பின் மாஸ்டர் மினி", actualPrice: "540", offerPrice: "108" },
    ],
  },
  {
    category: "Flower Pots",
    icon: <Star />,
    items: [
      { title: "Flower Pots Bomb / பூந்தொட்டி பாம்", actualPrice: "500", offerPrice: "100" },
      { title: "Flower Pots Big / பூந்தொட்டி பெரியது", actualPrice: "600", offerPrice: "120" },
      { title: "Flower Pots Special / பூந்தொட்டி ஸ்பெஷல்", actualPrice: "875", offerPrice: "175" },
      { title: "Flower Pots Giant / பூந்தொட்டி ஜெயண்ட்", actualPrice: "1315", offerPrice: "263" },
      { title: "Flower Pots Super (5 pcs) / பூந்தொட்டி சூப்பர் (5 பீஸ்)", actualPrice: "1570", offerPrice: "314" },
      { title: "Colour Koti Special / கலர் கோட்டி ஸ்பெஷல்", actualPrice: "1115", offerPrice: "223" },
      { title: "Colour Koti / கலர் கோட்டி", actualPrice: "1970", offerPrice: "394" },
      { title: "Colour Koti Deluxe / கலர் கோட்டி டீலக்ஸ்", actualPrice: "2920", offerPrice: "584" },
      { title: "Flower Pots Asoka / பூந்தொட்டி அசோகா", actualPrice: "860", offerPrice: "172" },
    ],
  },
  {
    category: "Bomb",
    icon: <Zap />,
    items: [
      { title: "Bullet Bomb / புல்லட் பாம்", actualPrice: "155", offerPrice: "31" },
      { title: "Atom Bomb / ஆட்டம் பாம்", actualPrice: "295", offerPrice: "59" },
      { title: "Hydro Bomb / ஹைட்ரோ பாம்", actualPrice: "395", offerPrice: "79" },
      { title: "King Bomb / கிங் பாம்", actualPrice: "490", offerPrice: "98" },
      { title: "Classic Bomb / கிளாசிக் பாம்", actualPrice: "735", offerPrice: "147" },
      { title: "Paper Bomb 1/4 kg Small / பேப்பர் பாம் 1/4 கிலோ சிறியது", actualPrice: "300", offerPrice: "60" },
      { title: "Paper Bomb 1/2 kg (Big) / பேப்பர் பாம் 1/2 கிலோ (பெரியது)", actualPrice: "600", offerPrice: "120" },
      { title: "Paper Bomb 1Kg (Big) / பேப்பர் பாம் 1 கிலோ (பெரியது)", actualPrice: "1200", offerPrice: "240" },
      { title: "Digital Bomb / டிஜிட்டல் பாம்", actualPrice: "1300", offerPrice: "260" },
    ],
  },
  {
    category: "Pencil",
    icon: <Pencil />,
    items: [
      { title: "Ultra pencil / அல்ட்ரா பென்சில்", actualPrice: "460", offerPrice: "92" },
      { title: "Selfie Stick (Enjoy) / செல்ஃபி ஸ்டிக் (என்ஜாய்)", actualPrice: "260", offerPrice: "52" },
    ],
  },
  {
    category: "Twinkling Star",
    icon: <Sparkles />,
    items: [
      { title: "1 1/2\" Twinkling Star / 1 1/2\" மினுமினுக்கும் நட்சத்திரம்", actualPrice: "175", offerPrice: "35" },
      { title: "4\" Twinkling Star / 4\" மினுமினுக்கும் நட்சத்திரம்", actualPrice: "470", offerPrice: "94" },
    ],
  },
  {
    category: "Rocket",
    icon: <Rocket />,
    items: [
      { title: "Baby Rocket / பேபி ராக்கெட்", actualPrice: "245", offerPrice: "49" },
      { title: "Rocket Bomb / ராக்கெட் பாம்", actualPrice: "435", offerPrice: "87" },
      { title: "2 Sound Rocket / 2 சத்தம் ராக்கெட்", actualPrice: "900", offerPrice: "180" },
      { title: "Lunick Rocket / லூனிக் ராக்கெட்", actualPrice: "850", offerPrice: "170" },
    ],
  },
  {
    category: "Fancy",
    icon: <Gift />,
    items: [
      { title: "Tri Colour / மூவர்ணம்", actualPrice: "1800", offerPrice: "360" },
      { title: "Peacock Small / மயில் சிறியது", actualPrice: "900", offerPrice: "180" },
      { title: "Peacock Bada / மயில் படா", actualPrice: "3000", offerPrice: "600" },
      { title: "Peacock Feather / மயில் இறகு", actualPrice: "525", offerPrice: "105" },
      { title: "Chotta 5 in 1 / சோட்டா 5 இன் 1", actualPrice: "2175", offerPrice: "435" },
      { title: "2\" Single / 2\" சிங்கிள்", actualPrice: "990", offerPrice: "198" },
      { title: "2 1/2\" Single / 2 1/2\" சிங்கிள்", actualPrice: "1750", offerPrice: "350" },
      { title: "3\" Seven Wonders / 3\" ஏழு அதிசயங்கள்", actualPrice: "2350", offerPrice: "470" },
      { title: "3\" Single / 3\" சிங்கிள்", actualPrice: "2540", offerPrice: "508" },
      { title: "3 1/2\" Single / 3 1/2\" சிங்கிள்", actualPrice: "7500", offerPrice: "1500" },
      { title: "Double Ball Mix / டபுள் பால் மிக்ஸ்", actualPrice: "9075", offerPrice: "1815" },
      { title: "Chotta Single / சோட்டா சிங்கிள்", actualPrice: "300", offerPrice: "60" },
    ],
  },
  {
    category: "Shower",
    icon: <CloudDrizzle />,
    items: [
      { title: "Cocktail / காக்டெய்ல்", actualPrice: "785", offerPrice: "157" },
      { title: "Chotta Bheem (5pcs) / சோட்டா பீம் (5 பீஸ்)", actualPrice: "920", offerPrice: "184" },
      { title: "Ashrafi Shower (5pcs) / அஷ்ரஃபி ஷவர் (5 பீஸ்)", actualPrice: "525", offerPrice: "105" },
    ],
  },
  {
    category: "Fancy Novelties",
    icon: <ToyBrick />,
    items: [
      { title: "Helicopter / ஹெலிகாப்டர்", actualPrice: "575", offerPrice: "115" },
      { title: "Drone / ட்ரோன்", actualPrice: "1160", offerPrice: "232" },
      { title: "Butterfly / பட்டாம்பூச்சி", actualPrice: "425", offerPrice: "85" },
      { title: "Bambaram & Googly Red / பம்பரம் & கூக்ளி சிவப்பு", actualPrice: "680", offerPrice: "136" },
      { title: "Photo Flash / போட்டோ ஃபிளாஷ்", actualPrice: "770", offerPrice: "154" },
      { title: "Photo Flash Red / போட்டோ ஃபிளாஷ் சிவப்பு", actualPrice: "825", offerPrice: "165" },
      { title: "Photo Flash Silver / போட்டோ ஃபிளாஷ் வெள்ளி", actualPrice: "300", offerPrice: "60" },
      { title: "Siren Mega (2 Pcs) / சைரன் மெகா (2 பீஸ்)", actualPrice: "1330", offerPrice: "266" },
      { title: "Smoke / புகை", actualPrice: "1155", offerPrice: "231" },
      { title: "Money In The Bank / மணி இன் தி பேங்க்", actualPrice: "1150", offerPrice: "230" },
      { title: "4\" Emoji / 4\" ஈமோஜி", actualPrice: "1075", offerPrice: "215" },
      { title: "Live Show / லைவ் ஷோ", actualPrice: "1075", offerPrice: "215" },
      { title: "Tin / டின்", actualPrice: "900", offerPrice: "180" },
    ],
  },
  {
    category: "Fountain",
    icon: <Droplets />,
    items: [
      { title: "Four Square / ஃபோர் ஸ்கொயர்", actualPrice: "2020", offerPrice: "404" },
      { title: "20x20 King Of Hitler / 20x20 கிங் ஆஃப் ஹிட்லர்", actualPrice: "750", offerPrice: "150" },
    ],
  },
  {
    category: "Shot",
    icon: <Crosshair />,
    items: [
      { title: "7 Shot / 7 ஷாட்", actualPrice: "600", offerPrice: "120" },
      { title: "15 Shot / 15 ஷாட்", actualPrice: "1625", offerPrice: "325" },
      { title: "30 Shot / 30 ஷாட்", actualPrice: "2400", offerPrice: "480" },
      { title: "60 Shot / 60 ஷாட்", actualPrice: "4800", offerPrice: "960" },
      { title: "120 Shot / 120 ஷாட்", actualPrice: "9750", offerPrice: "1950" },
      { title: "240 Shot / 240 ஷாட்", actualPrice: "19250", offerPrice: "3850" },
    ]
  },
  {
    category: "Matches",
    icon: <Flame />,
    items: [
      { title: "Dora Dora / டோரா டோரா", actualPrice: "175", offerPrice: "35" },
      { title: "Matches - Laptop / தீப்பெட்டி - லேப்டாப்", actualPrice: "1300", offerPrice: "260" },
      { title: "Matches Single (10 box) / தீப்பெட்டி சிங்கிள் (10 பெட்டி)", actualPrice: "350", offerPrice: "70" },
      { title: "Smoke Stick / புகை குச்சி", actualPrice: "125", offerPrice: "25" },
    ]
  },
  {
    category: "Sparklers",
    icon: <Sparkles />,
    items: [
      { title: "12 cm Electric Sparklers / 12 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "160", offerPrice: "32" },
      { title: "12 cm Colour Sparklers / 12 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "170", offerPrice: "34" },
      { title: "15 cm Electric Sparklers / 15 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "285", offerPrice: "57" },
      { title: "15 cm Colour Sparklers / 15 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "310", offerPrice: "62" },
      { title: "15 cm Green Sparklers / 15 செ.மீ பச்சை ஸ்பார்க்லர்ஸ்", actualPrice: "330", offerPrice: "66" },
      { title: "15 cm Red Sparklers / 15 செ.மீ சிவப்பு ஸ்பார்க்லர்ஸ்", actualPrice: "400", offerPrice: "80" },
      { title: "15 cm Silver Drop Sparklers / 15 செ.மீ சில்வர் டிராப் ஸ்பார்க்லர்ஸ்", actualPrice: "340", offerPrice: "68" },
      { title: "30 cm Electric Sparklers / 30 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "285", offerPrice: "57" },
      { title: "30 cm Colour Sparklers / 30 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "310", offerPrice: "62" },
      { title: "30 cm Green Sparklers / 30 செ.மீ பச்சை ஸ்பார்க்லர்ஸ்", actualPrice: "330", offerPrice: "66" },
      { title: "30 cm Red Sparklers / 30 செ.மீ சிவப்பு ஸ்பார்க்லர்ஸ்", actualPrice: "405", offerPrice: "81" },
      { title: "30cm Silver Drop Sparklers / 30 செ.மீ சில்வர் டிராப் ஸ்பார்க்லர்ஸ்", actualPrice: "340", offerPrice: "68" },
      { title: "50 cm Electric Sparklers / 50 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "850", offerPrice: "170" },
      { title: "50 cm Colour Sparklers / 50 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "950", offerPrice: "190" },
      { title: "50 cm Royal Mix Sparklers / 50 செ.மீ ராயல் மிக்ஸ் ஸ்பார்க்லர்ஸ்", actualPrice: "1200", offerPrice: "240" },
    ]
  },
  {
    category: "Chorsa",
    icon: <Flame />,
    items: [
      { title: "Red Bijli (100 pcs) / சிவப்பு பிஜிலி (100 பீஸ்)", actualPrice: "300", offerPrice: "60" },
      { title: "Stripped Bijli (100 pcs) / ஸ்டிரிப்ட் பிஜிலி (100 பீஸ்)", actualPrice: "325", offerPrice: "65" },
      { title: "Red Bijli (50 pcs) / சிவப்பு பிஜிலி (50 பீஸ்)", actualPrice: "210", offerPrice: "42" },
    ]
  },
  {
    category: "2024 New Varieties",
    icon: <Gift />,
    items: [
      { title: "90 Walts / 90 வால்ட்ஸ்", actualPrice: "750", offerPrice: "150" },
      { title: "Shin Chan / ஷின் சான்", actualPrice: "475", offerPrice: "95" },
      { title: "Top Gun / டாப் கன்", actualPrice: "900", offerPrice: "180" },
      { title: "12 Shot Rider (Long) / 12 ஷாட் ரைடர் (நீண்ட)", actualPrice: "700", offerPrice: "140" },
      { title: "25 Shot Rider / 25 ஷாட் ரைடர்", actualPrice: "1100", offerPrice: "220" },
      { title: "50 Shot Rider / 50 ஷாட் ரைடர்", actualPrice: "2200", offerPrice: "440" },
      { title: "1 3/4\" Pipe (3 in One) / 1 3/4\" பைப் (3 இன் ஒன்)", actualPrice: "1350", offerPrice: "270" },
      { title: "Snake Tablet (10 box) / பாம்பு மாத்திரை (10 பெட்டி)", actualPrice: "150", offerPrice: "30" },
      { title: "Assorted Cartoon / அசார்டட் கார்ட்டூன்", actualPrice: "350", offerPrice: "70" },
      { title: "Sky Shot Green crackling(10 pcs) / ஸ்கை ஷாட் பச்சை கிராக்லிங் (10 பீஸ்)", actualPrice: "1000", offerPrice: "200" },
      { title: "Water Falls Pencil / வாட்டர் ஃபால்ஸ் பென்சில்", actualPrice: "1250", offerPrice: "250" },
    ]
  }
];


export default function ProductsPage() {
    const PACKAGING_COST = 200;
    const { toast } = useToast();
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'review'>('cart');
    const orderSummaryRef = useRef<HTMLDivElement>(null);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress1, setCustomerAddress1] = useState('');
    const [customerAddress2, setCustomerAddress2] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerPincode, setCustomerPincode] = useState('');
    const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<string | null>(null);
    const [isWhatsAppConfirmOpen, setIsWhatsAppConfirmOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderDate, setOrderDate] = useState('');
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

    const confirmRemoveItem = () => {
        if (itemToRemove) {
            setQuantities(prev => ({
                ...prev,
                [itemToRemove]: 0,
            }));
        }
        setIsRemoveConfirmOpen(false);
        setItemToRemove(null);
    };

    const cancelRemoveItem = () => {
        setIsRemoveConfirmOpen(false);
        setItemToRemove(null);
    };

    const handleQuantityChange = (title: string, quantity: number) => {
        if ((isNaN(quantity) || quantity <= 0)) {
            if ((quantities[title] || 0) > 0) {
                setItemToRemove(title);
                setIsRemoveConfirmOpen(true);
            }
        } else {
            setQuantities(prev => ({
                ...prev,
                [title]: quantity
            }));
        }
    };

    const calculateRowTotal = (offerPrice: string, quantity: number) => {
        return (parseFloat(offerPrice) * (quantity || 0)).toFixed(2);
    };

    const calculateSubtotal = () => {
        let total = 0;
        for (const category of productData) {
            for (const product of category.items) {
                const quantity = quantities[product.title] || 0;
                total += parseFloat(product.offerPrice) * quantity;
            }
        }
        return total;
    };

    const subtotal = calculateSubtotal();
    const grandTotal = subtotal > 0 ? subtotal + PACKAGING_COST : subtotal;

    const itemsInCart = productData
        .flatMap(c => c.items)
        .filter(p => (quantities[p.title] || 0) > 0);

    const isAddressFormValid = !!(customerName && customerPhone && customerAddress1 && customerCity && customerPincode);

    const handleCheckout = () => {
        if (itemsInCart.length > 0) {
            setCheckoutStep('cart');
            setIsCheckoutOpen(true);
        } else {
            alert("Your cart is empty. Please add some products before checking out.");
        }
    }
    
    const handleReviewOrder = () => {
        if (isAddressFormValid) {
            setCheckoutStep('review');
        } else {
            alert("Please fill in all required delivery details.");
        }
    }

    const handleDownload = () => {
        const input = orderSummaryRef.current;
        if (input) {
            html2canvas(input, { scale: 2, useCORS: true, windowHeight: input.scrollHeight }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfPageHeight = pdf.internal.pageSize.getHeight();
                const imgProps = pdf.getImageProperties(imgData);
                const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

                let heightLeft = imgHeight;
                let position = 0;
                
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfPageHeight;
                
                while (heightLeft > 0) {
                    position -= pdfPageHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                    heightLeft -= pdfPageHeight;
                }
                
                pdf.save('maharaj-pyropark-order.pdf');
            });
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
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Toaster />
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
                                        <TableCell className="font-medium border">{product.title}</TableCell>
                                        <TableCell className="text-right text-muted-foreground line-through border">₹{product.actualPrice}</TableCell>
                                        <TableCell className="text-right font-bold text-primary border">₹{product.offerPrice}</TableCell>
                                        <TableCell className="border">
                                            <Input
                                                type="number"
                                                min="0"
                                                value={quantities[product.title] || ''}
                                                onChange={(e) => handleQuantityChange(product.title, parseInt(e.target.value))}
                                                className="w-20 h-9 text-center mx-auto bg-input"
                                                placeholder="0"
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
                
                <AlertDialog open={isRemoveConfirmOpen} onOpenChange={setIsRemoveConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will remove "{itemToRemove}" from your cart. Do you want to proceed?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={cancelRemoveItem}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmRemoveItem} className="bg-destructive hover:bg-destructive/90">Remove</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={isWhatsAppConfirmOpen} onOpenChange={setIsWhatsAppConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Order Placed!</AlertDialogTitle>
                            <AlertDialogDescription>
                                The order has been recorded. You can now download the order PDF or send a confirmation to the customer via WhatsApp.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                             <AlertDialogCancel onClick={() => setIsWhatsAppConfirmOpen(false)}>Close</AlertDialogCancel>
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
                                        <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>
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

            </main>
            <Footer />
        </div>
    );
}
