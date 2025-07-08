import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Rocket, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    icon: <Rocket className="w-10 h-10 text-primary" />,
    title: "Skyblazer Rockets (Pack of 12)",
    description: "Our best-selling rockets, perfect for adding a high-flying spectacle to any celebration.",
    price: "$49.99",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "Grand Finale Assortment",
    description: "A complete show in a box. Everything you need for a jaw-dropping 5-minute finale.",
    price: "$199.99",
  },
  {
    icon: <Star className="w-10 h-10 text-primary" />,
    title: "Sparkler Bonanza (50 pieces)",
    description: "Safe and fun for all ages. Bright, long-lasting golden sparklers for everyone to enjoy.",
    price: "$24.99",
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "ColorBurst Fountains (Set of 3)",
    description: "Create a vibrant ground-level display with these long-lasting, multi-color fountains.",
    price: "$79.99",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
            Our Products
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Bring the excitement home with our premium selection of consumer fireworks.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="flex flex-col text-center bg-card border-border/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <CardContent className="pt-8 flex flex-col items-center gap-4 flex-grow">
                <div className="bg-primary/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-xl">{product.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base px-4">
                  {product.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-end pt-4">
                  <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Add to Cart
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
