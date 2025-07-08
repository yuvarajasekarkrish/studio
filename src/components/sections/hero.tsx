'use client'

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const heroImages = [
  { src: "https://placehold.co/1600x900.png", alt: "Spectacular fireworks display at night", hint: "vibrant rainbow fireworks" },
  { src: "https://placehold.co/1600x900.png", alt: "Colorful fireworks over a city skyline", hint: "exploding colors night" },
  { src: "https://placehold.co/1600x900.png", alt: "Golden fireworks illuminating the dark sky", hint: "dazzling gold blue" },
];

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[60vh] min-h-[400px] max-h-[600px]">
      <Carousel
        className="w-full h-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={image.hint}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white border-white bg-black/20 hover:bg-primary/80 hover:text-white" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white border-white bg-black/20 hover:bg-primary/80 hover:text-white" />
        </div>
      </Carousel>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-2xl mb-4 text-foreground bg-black/30 px-6 py-2 rounded-lg">
          Diwali Fireworks Sale
        </h1>
        <p className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-lg text-accent animate-pulse">
            UP TO 80% OFF!
        </p>
        <Link href="/products">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-lg">
            Shop Now & Light Up Your Celebration!
          </Button>
        </Link>
        <p className="mt-4 text-lg font-semibold bg-black/40 px-4 py-1 rounded-md">
            Delivery available all over INDIA
        </p>
      </div>
    </section>
  );
}
