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

const heroImages = [
  { src: "https://placehold.co/1600x900.png", alt: "Spectacular fireworks display at night", hint: "vibrant fireworks" },
  { src: "https://placehold.co/1600x900.png", alt: "Colorful fireworks over a city skyline", hint: "colorful explosion" },
  { src: "https://placehold.co/1600x900.png", alt: "Golden fireworks illuminating the dark sky", hint: "night celebration" },
];

const saleImageUrl = "https://storage.googleapis.com/maker-studio-5f296.appspot.com/user-hc0q0z2g0ywdjkkr942b0k7c/projects/clx20y0sx000b3b6u98w3h4h2/images/84729f2d-8854-469b-8f37-d2c69d82136e.png";

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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <Link href="/products" className="w-full max-w-4xl px-4">
            <Image
              src={saleImageUrl}
              alt="Diwali Sale up to 80% off on all crackers"
              width={1031}
              height={396}
              className="w-full h-auto rounded-md shadow-2xl"
              priority
            />
        </Link>
      </div>
    </section>
  );
}
