import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Products from '@/components/sections/products';
import Gallery from '@/components/sections/gallery';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Products />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
