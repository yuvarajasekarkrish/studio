
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/contexts/cart-context';
import FloatingCart from '@/components/common/floating-cart';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Maharaj Pyrotech - Premier Pyrotechnics & Firework Displays',
  description: 'Maharaj Pyrotech specializes in creating unforgettable firework displays for weddings, corporate events, and public celebrations. Experience the magic of pyrotechnics with our expert team.',
  keywords: 'Maharaj Pyrotech, Buy Fireworks Online, Fireworks Store, Diwali Fireworks, New Year Crackers, Wedding Fireworks, Sparklers, Rockets, Bombs, Fancy Crackers, Gift Boxes, Sivakasi Fireworks, Tamilnadu Fireworks Online, Buy Crackers Online, Crackers Price List, Diwali Offers, Safe Fireworks for Kids, Wholesale Crackers Online, Retail Crackers Online, மகாராஜ் பைரோடெக், ஆன்லைன் பட்டாசு கடை, தீபாவளி பட்டாசுகள், புத்தாண்டு பட்டாசு, திருமண பட்டாசு, ஸ்பார்க்லர்ஸ், ராக்கெட், பாம், ஃபான்சி பட்டாசு, கிப்ட் பாக்ஸ், சிவகாசி பட்டாசுகள், தமிழ்நாடு ஆன்லைன் பட்டாசு, பட்டாசு ஆன்லைன் வாங்க, பட்டாசு விலை பட்டியல், தீபாவளி சலுகை, குழந்தைகளுக்கு பாதுகாப்பான பட்டாசுகள், சில்லறை பட்டாசு ஆன்லைன், மொத்த பட்டாசு ஆன்லைன்',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          {children}
          <FloatingCart />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
