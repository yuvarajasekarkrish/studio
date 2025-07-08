import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://storage.googleapis.com/aifirebase-dev-images/projects/f44b2f20-b427-449e-876a-d248b11c47ea/11d13fbe-0fbf-409b-a63e-f18703a5323a.png"
              alt="80% off fireworks sale"
              width={600}
              height={600}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              Unbeatable 80% Discount on All Fireworks!
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Your ultimate celebration is just a click away! We're offering a massive 80% discount across our entire range of premium fireworks. Browse our catalog now and stock up for a spectacular event.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop All Products & Get 80% Off
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
