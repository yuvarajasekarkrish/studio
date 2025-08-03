
import type { Metadata } from 'next';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import ProductList from '@/components/sections/product-list';

export const metadata: Metadata = {
    title: 'Products - 80% Off Firework Sale | Maharaj Pyropark',
    description: 'Browse our huge selection of fireworks, all at an 80% discount. Find rockets, sparklers, crackers, and more for your perfect celebration.',
};

export default function ProductsPage() {
    return (
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
                <ProductList />
            </main>
            <Footer />
        </div>
    );
}
