import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Rocket, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const productData = [
  {
    category: "One Sound Crackers",
    icon: <Rocket className="w-8 h-8 text-primary" />,
    items: [
      { title: "2 3/4\" Kuruvi Crackers", actualPrice: "75", offerPrice: "15" },
      { title: "3 1/2\" Lakshmi Crackers", actualPrice: "120", offerPrice: "24" },
      { title: "4\" Lakshmi special Crackers", actualPrice: "150", offerPrice: "30" },
      { title: "4\" Lakshmi Deluxe Crackers", actualPrice: "195", offerPrice: "39" },
      { title: "4\"Gold Lakshmi Crackers", actualPrice: "220", offerPrice: "44" },
      { title: "2 Sound Crackers", actualPrice: "215", offerPrice: "43" },
      { title: "3 Sound Crackers", actualPrice: "300", offerPrice: "60" },
      { title: "Lion Gun", actualPrice: "475", offerPrice: "95" },
    ],
  },
  {
    category: "Chakkar",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    items: [
      { title: "Chakkaram Big", actualPrice: "300", offerPrice: "60" },
      { title: "Chakkaram Special", actualPrice: "590", offerPrice: "118" },
      { title: "Chakkaram Deluxe", actualPrice: "1000", offerPrice: "200" },
      { title: "Hot Wheel", actualPrice: "450", offerPrice: "90" },
      { title: "Spin Master Mini", actualPrice: "540", offerPrice: "108" },
    ],
  },
  {
    category: "Flower Pots",
    icon: <Star className="w-8 h-8 text-primary" />,
    items: [
      { title: "Flower Pots Bomb", actualPrice: "500", offerPrice: "100" },
      { title: "Flower Pots Big", actualPrice: "600", offerPrice: "120" },
      { title: "Flower Pots Special", actualPrice: "875", offerPrice: "175" },
      { title: "Flower Pots Giant", actualPrice: "1315", offerPrice: "263" },
      { title: "Flower Pots Super (5 pcs)", actualPrice: "1570", offerPrice: "314" },
      { title: "Colour Koti Special", actualPrice: "1115", offerPrice: "223" },
      { title: "Colour Koti", actualPrice: "1970", offerPrice: "394" },
      { title: "Colour Koti Deluxe", actualPrice: "2920", offerPrice: "584" },
      { title: "Flower Pots Asoka", actualPrice: "860", offerPrice: "172" },
    ],
  },
  {
    category: "Bomb",
    icon: <Zap className="w-8 h-8 text-primary" />,
    items: [
      { title: "Bullet Bomb", actualPrice: "155", offerPrice: "31" },
    ],
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
            Bring the excitement home with our premium selection of consumer fireworks. All prices are inclusive of taxes. Enjoy an 80% discount on all items!
          </p>
        </div>
        
        <div className="space-y-12">
          {productData.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-4 mb-8">
                {category.icon}
                <h3 className="text-2xl md:text-3xl font-headline font-bold">{category.category}</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.items.map((product, pIndex) => (
                  <Card key={pIndex} className="flex flex-col text-center bg-card border-border/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <CardHeader className="pt-6 pb-2">
                      <CardTitle className="font-headline text-xl h-12 flex items-center justify-center">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-2 flex-grow justify-center">
                      <p className="text-muted-foreground text-lg line-through">
                        MRP: ₹{product.actualPrice}
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        Offer: ₹{product.offerPrice}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-end pt-4 pb-6">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Add to Cart
                        </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}