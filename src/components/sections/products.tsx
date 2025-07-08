import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
          Unbeatable 80% Discount on All Fireworks!
        </h2>
        <p className="max-w-2xl mx-auto text-lg mb-8 text-muted-foreground">
          Your ultimate celebration is just a click away! We're offering a massive 80% discount across our entire range of premium fireworks. Browse our catalog now and stock up for a spectacular event.
        </p>
        <Link href="/products">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Shop All Products & Get 80% Off
          </Button>
        </Link>
      </div>
    </section>
  );
}
