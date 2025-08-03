
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Percent } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sivakasi Crackers Discount - 80% Off | Maharaj Pyrotech',
    description: 'Get the best Sivakasi crackers discount at Maharaj Pyrotech. We are your direct source for premium fireworks from Sivakasi with a huge 80% off on all products.',
};

export default function SivakasiDiscountPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                <section className="py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-4 text-center">
                        <Percent className="w-16 h-16 mx-auto mb-6 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                            Sivakasi Crackers with a Massive 80% Discount
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                            Why pay more? Get authentic crackers directly from Sivakasi at an unbeatable 80% discount. Maharaj Pyrotech offers premium quality and the best prices online.
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-lg">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                View All Discounted Crackers
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
