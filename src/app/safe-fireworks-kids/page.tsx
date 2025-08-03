
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Safe Fireworks for Kids | Maharaj Pyrotech',
    description: 'Find a variety of safe fireworks for kids at Maharaj Pyrotech. Our selection includes low-noise sparklers, fountains, and ground chakkars perfect for a fun and safe family celebration.',
};

export default function SafeFireworksPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container max-w-7xl mx-auto px-4 text-center">
                        <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                            Safe & Fun Fireworks for Kids
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                            Your family's safety is our top priority. We offer a specially curated selection of low-noise and visually beautiful fireworks that are perfect for children to enjoy under supervision. Celebrate with peace of mind.
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-lg">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Shop Safe Fireworks
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
