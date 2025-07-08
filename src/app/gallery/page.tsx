import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Image from "next/image";

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "Wedding fireworks over a lake", hint: "celebration fireworks" },
  { src: "https://placehold.co/600x400.png", alt: "Red and gold fireworks burst", hint: "vibrant fireworks" },
  { src: "https://placehold.co/600x400.png", alt: "Corporate event finale", hint: "event fireworks" },
  { src: "https://placehold.co/600x400.png", alt: "Festival fireworks display", hint: "night sky fireworks" },
  { src: "https://placehold.co/600x400.png", alt: "Blue and purple fireworks", hint: "colorful fireworks" },
  { src: "https://placehold.co/600x400.png", alt: "Close-up of a vibrant firework", hint: "fireworks finale" },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
                Our Gallery
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                A glimpse into the spectacular moments we've created.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    data-ai-hint={image.hint}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
