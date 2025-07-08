'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Ready to light up your event? Contact us today for a free consultation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-secondary/50 p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" required className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Wedding Fireworks Inquiry" required className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your event..." rows={5} required className="bg-background"/>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Message
              </Button>
            </form>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-headline">Our Location</h3>
                <p className="text-muted-foreground">123 Pyro Avenue, Celebration City, FL 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-headline">Call Us</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-headline">Email Us</h3>
                <p className="text-muted-foreground">contact@maharajpyro.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
