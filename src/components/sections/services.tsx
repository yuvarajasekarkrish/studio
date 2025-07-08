import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Heart, Building, Users } from "lucide-react";

const services = [
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "Wedding Displays",
    description: "Add a touch of magic to your special day with a personalized firework show that will leave your guests in awe."
  },
  {
    icon: <Building className="w-10 h-10 text-primary" />,
    title: "Corporate Events",
    description: "Launch your product, celebrate a milestone, or impress your clients with a powerful and professional pyrotechnic display."
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Public Celebrations",
    description: "From national holidays to local festivals, we design and execute large-scale shows that light up the community spirit."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            We provide a comprehensive range of pyrotechnic services, tailored to make your event unforgettable.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center bg-card border-border/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <CardContent className="pt-8 flex flex-col items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base px-4">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
