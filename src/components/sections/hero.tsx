'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/common/marquee";

export default function Hero() {
  return (
    <section id="home" className="w-full bg-background pt-4 md:pt-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
            <Marquee />
        </div>
        <div className="relative w-full aspect-[3/1] overflow-hidden rounded-lg shadow-2xl group">
           <Link href="/products">
            <Image
              src="https://maharajpyropark.in/static/media/home_banner_1.b18b8819e09fbecbff12.jpg"
              alt="Diwali fireworks sale banner"
              fill
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              priority
            />
           </Link>
        </div>
        <div className="text-center mt-6 md:mt-8">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-lg">
                Shop Now & Light Up Your Celebration!
              </Button>
            </Link>
            <p className="mt-4 text-lg font-semibold text-muted-foreground">
                Delivery available all over INDIA
            </p>
        </div>
      </div>
    </section>
  );
}
