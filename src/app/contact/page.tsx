
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { Mail, Phone, MapPin, Wallet } from "lucide-react";
import type { Metadata } from 'next';
import ContactForm from '@/components/sections/contact-form';

export const metadata: Metadata = {
    title: 'Contact Us | Maharaj Pyrotech',
    description: 'Get in touch with Maharaj Pyrotech for a free consultation on your event. Contact us via phone, email, or visit our location in Sivakasi.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
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
              <ContactForm />
              <div className="flex flex-col justify-center space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Our Location</h3>
                    <p className="text-muted-foreground">
                      S.No: 172 /1, D.NO : 1/372 A,<br />
                      Keelathiruthangal,<br />
                      Virudhunagar road, Sivakasi - 626 123.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Call Us</h3>
                    <p className="text-muted-foreground">(+91) 9843529357</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Email Us</h3>
                    <p className="text-muted-foreground">maharajpyrotech@gmail.com</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Pay with GPay</h3>
                    <p className="text-muted-foreground">9843529357</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
