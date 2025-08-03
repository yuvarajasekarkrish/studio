
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/contexts/cart-context';
import FloatingCart from '@/components/common/floating-cart';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Maharaj Pyrotech - Premier Pyrotechnics & Firework Displays',
  description: 'Maharaj Pyrotech specializes in creating unforgettable firework displays for weddings, corporate events, and public celebrations. Experience the magic of pyrotechnics with our expert team.',
  keywords: 'Maharaj Pyrotech, Buy Fireworks Online, Fireworks Store, மகாராஜ் பைரோடெக், ஆன்லைன் பட்டாசு கடை, Diwali Fireworks, New Year Crackers, Wedding Fireworks, தீபாவளி பட்டாசுகள், புத்தாண்டு பட்டாசு, திருமண பட்டாசு, Sparklers, Rockets, Bombs, Fancy Crackers, Gift Boxes, ஸ்பார்க்லர்ஸ், ராக்கெட், பாம், ஃபான்சி பட்டாசு, கிப்ட் பாக்ஸ், Sivakasi Fireworks, Tamilnadu Fireworks Online, சிவகாசி பட்டாசுகள், தமிழ்நாடு ஆன்லைன் பட்டாசு, Buy Crackers Online, Crackers Price List, Diwali Offers, பட்டாசு ஆன்லைன் வாங்க, பட்டாசு விலை பட்டியல், தீபாவளி சலுகை, Safe Fireworks for Kids, Wholesale Crackers Online, குழந்தைகளுக்கு பாதுகாப்பான பட்டாசுகள், சில்லறை பட்டாசு ஆன்லைன், buy fireworks online, fireworks online shopping India, crackers online, buy crackers for Diwali, diwali crackers, diwali fireworks sale 2025, fireworks store online, online firecracker shop Tamil Nadu, sivakasi crackers, buy sivakasi fireworks online, wedding fireworks, fireworks for wedding ceremony India, ஆன்லைன் பட்டாசு கடை, online fireworks shop, தீபாவளி பட்டாசுகள் வாங்க, buy Diwali crackers, சிவகாசி பட்டாசுகள், Sivakasi crackers, திருமண பட்டாசுகள், Wedding fireworks, சலுகை பட்டாசுகள், Offer fireworks, தீபாவளி ஆஃபர் பட்டாசுகள், Diwali offer fireworks, பாதுகாப்பான பட்டாசுகள், Safe fireworks for kids, fireworks shop in Sivakasi, crackers in Tamil Nadu online, best crackers online Tamil Nadu, sivakasi diwali crackers free delivery, crackers near me Tamil Nadu, diwali fireworks 2025, crackers for diwali online, deepavali pattasu, new year fireworks 2025 India, fireworks celebration crackers, wedding fireworks India, best fireworks for Indian weddings, pongal fireworks, pongal crackers online, tricolor fireworks, August 15 crackers, fireworks discount online, bulk fireworks order, best crackers brand in India, Sivakasi vs Chennai crackers, buy sparklers online, flower pots price, hydrogen bomb crackers, last minute diwali crackers order, same day fireworks delivery Tamil Nadu, safe fireworks for children, low noise crackers India',
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
