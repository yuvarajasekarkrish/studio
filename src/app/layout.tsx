import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maharaj Pyropark - Premier Pyrotechnics & Firework Displays',
  description: 'Maharaj Pyropark specializes in creating unforgettable firework displays for weddings, corporate events, and public celebrations. Experience the magic of pyrotechnics with our expert team.',
  keywords: 'fireworks, pyrotechnics, wedding fireworks, corporate events, firework displays, Maharaj Pyropark',
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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
