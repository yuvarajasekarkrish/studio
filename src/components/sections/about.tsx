import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              About Maharaj Pyropark
            </h2>
            <p className="mb-4 text-lg">
              With a legacy forged in fire and a passion for celebration, Maharaj Pyropark has been illuminating skies for over two decades. Our journey began with a simple mission: to bring joy and wonder to people's most cherished moments through the art of pyrotechnics.
            </p>
            <p className="mb-4">
              We are a team of certified, insured, and experienced professionals dedicated to safety, quality, and breathtaking creativity. From intimate gatherings to grand public displays, we handle every detail with precision and care, ensuring a seamless and spectacular experience for you and your guests.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                    src="https://maharajpyropark.in/static/media/diwali-sale.8e9a7ea214bcd57de1f9.png"
                    alt="Diwali sale banner for Maharaj Pyropark"
                    width={600}
                    height={450}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                    data-ai-hint="fireworks sale"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
