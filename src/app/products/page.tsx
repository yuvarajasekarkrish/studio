'use client';

import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { Rocket, Sparkles, Star, Zap, Pencil, Gift, CloudDrizzle, ToyBrick, Droplets } from "lucide-react";

const productData = [
  {
    category: "One Sound Crackers",
    icon: <Rocket />,
    items: [
      { title: "2 3/4\" Kuruvi Crackers", actualPrice: "75", offerPrice: "15" },
      { title: "3 1/2\" Lakshmi Crackers", actualPrice: "120", offerPrice: "24" },
      { title: "4\" Lakshmi special Crackers", actualPrice: "150", offerPrice: "30" },
      { title: "4\" Lakshmi Deluxe Crackers", actualPrice: "195", offerPrice: "39" },
      { title: "4\"Gold Lakshmi Crackers", actualPrice: "220", offerPrice: "44" },
      { title: "2 Sound Crackers", actualPrice: "215", offerPrice: "43" },
      { title: "3 Sound Crackers", actualPrice: "300", offerPrice: "60" },
      { title: "Lion Gun", actualPrice: "475", offerPrice: "95" },
    ],
  },
  {
    category: "Chakkar",
    icon: <Sparkles />,
    items: [
      { title: "Chakkaram Big", actualPrice: "300", offerPrice: "60" },
      { title: "Chakkaram Special", actualPrice: "590", offerPrice: "118" },
      { title: "Chakkaram Deluxe", actualPrice: "1000", offerPrice: "200" },
      { title: "Hot Wheel", actualPrice: "450", offerPrice: "90" },
      { title: "Spin Master Mini", actualPrice: "540", offerPrice: "108" },
    ],
  },
  {
    category: "Flower Pots",
    icon: <Star />,
    items: [
      { title: "Flower Pots Bomb", actualPrice: "500", offerPrice: "100" },
      { title: "Flower Pots Big", actualPrice: "600", offerPrice: "120" },
      { title: "Flower Pots Special", actualPrice: "875", offerPrice: "175" },
      { title: "Flower Pots Giant", actualPrice: "1315", offerPrice: "263" },
      { title: "Flower Pots Super (5 pcs)", actualPrice: "1570", offerPrice: "314" },
      { title: "Colour Koti Special", actualPrice: "1115", offerPrice: "223" },
      { title: "Colour Koti", actualPrice: "1970", offerPrice: "394" },
      { title: "Colour Koti Deluxe", actualPrice: "2920", offerPrice: "584" },
      { title: "Flower Pots Asoka", actualPrice: "860", offerPrice: "172" },
    ],
  },
  {
    category: "Bomb",
    icon: <Zap />,
    items: [
      { title: "Bullet Bomb", actualPrice: "155", offerPrice: "31" },
      { title: "Atom Bomb", actualPrice: "295", offerPrice: "59" },
      { title: "Hydro Bomb", actualPrice: "395", offerPrice: "79" },
      { title: "King Bomb", actualPrice: "490", offerPrice: "98" },
      { title: "Classic Bomb", actualPrice: "735", offerPrice: "147" },
      { title: "Paper Bomb 1/4 kg Small", actualPrice: "300", offerPrice: "60" },
      { title: "Paper Bomb 1/2 kg (Big)", actualPrice: "600", offerPrice: "120" },
      { title: "Paper Bomb 1Kg (Big)", actualPrice: "1200", offerPrice: "240" },
      { title: "Digital Bomb", actualPrice: "1300", offerPrice: "260" },
    ],
  },
  {
    category: "Pencil",
    icon: <Pencil />,
    items: [
      { title: "Ultra pencil", actualPrice: "460", offerPrice: "92" },
      { title: "Selfi Stick (Enjoy)", actualPrice: "260", offerPrice: "52" },
    ],
  },
  {
    category: "Twinkling Star",
    icon: <Sparkles />,
    items: [
      { title: "1 1/2\" Twinkling Star", actualPrice: "175", offerPrice: "35" },
      { title: "4\" Twinkling Star", actualPrice: "470", offerPrice: "94" },
    ],
  },
  {
    category: "Rocket",
    icon: <Rocket />,
    items: [
      { title: "Baby Rocket", actualPrice: "245", offerPrice: "49" },
      { title: "Rocket Bomb", actualPrice: "435", offerPrice: "87" },
      { title: "2 Sound Rocket", actualPrice: "900", offerPrice: "180" },
      { title: "Lunick Rocket", actualPrice: "850", offerPrice: "170" },
    ],
  },
  {
    category: "Fancy",
    icon: <Gift />,
    items: [
      { title: "Tri Colour", actualPrice: "1800", offerPrice: "360" },
      { title: "Peacock Small", actualPrice: "900", offerPrice: "180" },
      { title: "Peacock Bada", actualPrice: "3000", offerPrice: "600" },
      { title: "Peacock Feather", actualPrice: "525", offerPrice: "105" },
    ],
  },
  {
    category: "Shower",
    icon: <CloudDrizzle />,
    items: [
      { title: "Cocktail", actualPrice: "785", offerPrice: "157" },
      { title: "Chotta Bheam (5pcs)", actualPrice: "920", offerPrice: "184" },
      { title: "Ashrafi Shower (5pcs)", actualPrice: "525", offerPrice: "105" },
    ],
  },
  {
    category: "Fancy Novelties",
    icon: <ToyBrick />,
    items: [
      { title: "Helicopter", actualPrice: "575", offerPrice: "115" },
      { title: "Drone", actualPrice: "1160", offerPrice: "232" },
      { title: "Butterfly", actualPrice: "425", offerPrice: "85" },
      { title: "Bambaram & Googly Red", actualPrice: "680", offerPrice: "136" },
      { title: "Photo Flash", actualPrice: "770", offerPrice: "154" },
      { title: "Photo Flash Red", actualPrice: "825", offerPrice: "165" },
      { title: "Photo Flash Silver", actualPrice: "300", offerPrice: "60" },
      { title: "Siren Mega (2 Pcs)", actualPrice: "1330", offerPrice: "266" },
      { title: "Smoke", actualPrice: "1155", offerPrice: "231" },
    ],
  },
  {
    category: "Fountain",
    icon: <Droplets />,
    items: [
      { title: "Four Square", actualPrice: "2020", offerPrice: "404" },
      { title: "20x20 King Of Hitler", actualPrice: "750", offerPrice: "150" },
    ],
  },
];


export default function ProductsPage() {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const handleQuantityChange = (title: string, quantity: number) => {
        setQuantities(prev => ({
            ...prev,
            [title]: Math.max(0, quantity || 0)
        }));
    };

    const calculateRowTotal = (offerPrice: string, quantity: number) => {
        return (parseFloat(offerPrice) * (quantity || 0)).toFixed(2);
    };

    const calculateGrandTotal = () => {
        let total = 0;
        for (const category of productData) {
            for (const product of category.items) {
                const quantity = quantities[product.title] || 0;
                total += parseFloat(product.offerPrice) * quantity;
            }
        }
        return total.toFixed(2);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                        Our Products
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg">
                        Select your fireworks and add them to your cart. All prices are inclusive of taxes. Enjoy an 80% discount on all items!
                    </p>
                </div>

                <div className="bg-card p-2 sm:p-6 rounded-lg shadow-xl border overflow-x-auto">
                    <Table>
                        {productData.map((category) => (
                            <React.Fragment key={category.category}>
                                <TableHeader>
                                    <TableRow className="bg-secondary/70 hover:bg-secondary/70 border-b-2 border-primary/20">
                                        <TableHead colSpan={5} className="py-4">
                                            <div className="flex items-center gap-4 text-primary text-xl md:text-2xl font-bold font-headline">
                                                {React.cloneElement(category.icon, {className: "w-7 h-7"})}
                                                {category.category}
                                            </div>
                                        </TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead className="w-2/5">Product</TableHead>
                                        <TableHead className="text-right">MRP</TableHead>
                                        <TableHead className="text-right">Offer Price</TableHead>
                                        <TableHead className="text-center w-28">Quantity</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {category.items.map((product) => (
                                        <TableRow key={product.title} className="hover:bg-secondary/50">
                                            <TableCell className="font-medium">{product.title}</TableCell>
                                            <TableCell className="text-right text-muted-foreground line-through">₹{product.actualPrice}</TableCell>
                                            <TableCell className="text-right font-bold text-primary">₹{product.offerPrice}</TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={quantities[product.title] || ''}
                                                    onChange={(e) => handleQuantityChange(product.title, parseInt(e.target.value))}
                                                    className="w-20 h-9 text-center mx-auto bg-input"
                                                    placeholder="0"
                                                />
                                            </TableCell>
                                            <TableCell className="text-right font-bold">
                                                ₹{calculateRowTotal(product.offerPrice, quantities[product.title] || 0)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </React.Fragment>
                        ))}
                         <TableFooter>
                            <TableRow className="bg-secondary hover:bg-secondary text-lg">
                                <TableCell colSpan={4} className="text-right font-bold text-xl text-primary">Grand Total</TableCell>
                                <TableCell className="text-right font-bold text-xl text-primary">₹{calculateGrandTotal()}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <div className="flex justify-end mt-8">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
