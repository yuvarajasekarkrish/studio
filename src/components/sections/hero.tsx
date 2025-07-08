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
import { Button } from "@/components/ui/button";

const heroImages = [
  { src: "https://placehold.co/1600x900.png", alt: "Spectacular fireworks display at night", hint: "fireworks night" },
  { src: "https://placehold.co/1600x900.png", alt: "Colorful fireworks over a city skyline", hint: "fireworks city" },
  { src: "https://placehold.co/1600x900.png", alt: "Golden fireworks illuminating the dark sky", hint: "golden fireworks" },
];

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[80vh] min-h-[500px] max-h-[700px]">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl">
          Lighting Up Your Special Moments
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl font-body drop-shadow-lg">
          Crafting breathtaking pyrotechnic spectacles that turn any event into a lifelong memory.
        </p>
         <a href="#services">
          <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary-foreground/20 hover:border-primary-foreground font-bold text-lg">
            Explore Our Shows
          </Button>
        </a>
      </div>
    </section>
  );
}
