
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Gift } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Buy Diwali Crackers Online - Special Offers | Maharaj Pyrotech',
    description: 'Shop for Diwali crackers online at Maharaj Pyrotech. Get the best deals and a huge selection of fireworks for your Diwali celebration. Safe and fast delivery across India.',
};

export default function BuyDiwaliCrackersPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container max-w-7xl mx-auto px-4 text-center">
                        <Gift className="w-16 h-16 mx-auto mb-6 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                            Buy Diwali Crackers Online with 80% Off
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                            Light up your Diwali with the best fireworks from Maharaj Pyrotech. We offer a massive selection of crackers, sparklers, rockets, and gift boxes, all at an incredible 80% discount. Order now for a memorable celebration!
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-lg">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Browse All Diwali Fireworks
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
