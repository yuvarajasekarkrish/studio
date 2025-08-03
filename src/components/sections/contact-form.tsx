
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
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
  );
}
