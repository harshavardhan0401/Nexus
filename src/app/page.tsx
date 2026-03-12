
"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

const FEATURED_PRODUCTS = [
  {
    id: 'ultra-l01',
    name: 'ULTRA L-01',
    price: 24999,
    description: 'Propulsion System',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    color: 'hsl(var(--primary))'
  },
  {
    id: 'dark-matter',
    name: 'DARK MATTER',
    price: 18500,
    description: 'Carbon Fiber Weave',
    imageUrl: 'https://images.unsplash.com/photo-1551107643-404395679f18?auto=format&fit=crop&w=800&q=80',
    color: 'hsl(var(--secondary))'
  },
  {
    id: 'neon-gen',
    name: 'NEON GEN',
    price: 21999,
    description: 'Adaptive Lighting',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    color: 'hsl(var(--primary))'
  },
];

const COLLECTION = [
  {
    id: '1',
    name: 'Vapor Max-X',
    price: 12999,
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Cyber Classic',
    price: 9499,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Volt Runner',
    price: 14200,
    imageUrl: 'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'Jordan Peak',
    price: 19999,
    imageUrl: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const showcaseRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <h1 className="absolute font-headline font-black text-[15vw] leading-none hero-title-stroke select-none pointer-events-none z-0">
          ADVANCED
        </h1>
        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] drop-shadow-[0_0_50px_rgba(0,242,255,0.3)] animate-float transition-transform hover:scale-110 duration-700">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
              alt="Hero Shoe"
              fill
              className="object-contain rotate-[-15deg]"
              priority
              data-ai-hint="futuristic sneaker"
            />
          </div>
          <div className="mt-8 flex flex-col items-center text-center space-y-4">
            <p className="font-headline text-primary tracking-[0.5em] text-sm">ELITE PROPULSION SYSTEMS</p>
            <Button size="lg" className="bg-primary text-background font-headline tracking-widest hover:bg-glow" asChild>
              <Link href="/collections">
                ENTER THE CORE <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Horizontal Showcase */}
      <section className="bg-card py-24 overflow-hidden">
        <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <p className="text-primary tracking-[0.3em] font-headline text-xs mb-2">FUTURE DROPS</p>
            <h2 className="text-4xl md:text-6xl font-headline font-black">SHOWCASE</h2>
          </div>
        </div>
        
        <div 
          ref={showcaseRef}
          className="flex gap-8 px-6 md:px-12 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="min-w-[85vw] md:min-w-[60vw] h-[50vh] md:h-[70vh] bg-background/50 border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group snap-center"
            >
              <div className="relative z-10 h-full flex flex-col justify-center max-w-md">
                <p className="text-primary font-headline tracking-[0.4em] text-xs uppercase mb-2">{product.description}</p>
                <h3 className="text-4xl md:text-7xl font-headline font-black mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-2xl font-headline text-secondary mb-8">₹{product.price.toLocaleString()}</p>
                <Button 
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="w-fit border-primary text-primary font-headline tracking-widest"
                  variant="outline"
                >
                  ACQUIRE NOW
                </Button>
              </div>
              <div className="absolute top-0 right-[-10%] w-[120%] h-full pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain rotate-[-20deg]"
                  data-ai-hint="neon sneaker"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Collection */}
      <section className="py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <p className="text-primary tracking-[0.3em] font-headline text-xs mb-2">2024 DROP</p>
            <h2 className="text-4xl md:text-7xl font-headline font-black">COLLECTION</h2>
          </div>
          <p className="text-muted-foreground text-sm max-width-md">
            Every pair is engineered for maximum performance and street presence. 
            Experience the next generation of footwear technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {COLLECTION.map((product) => (
            <div 
              key={product.id} 
              className="bg-card p-8 rounded-[2rem] border border-transparent hover:border-primary/30 transition-all group relative mt-12"
            >
              <div className="relative aspect-square -mt-20 mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[-10deg]">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-xl"
                  data-ai-hint="futuristic sneaker"
                />
              </div>
              <h3 className="font-headline text-lg mb-2">{product.name}</h3>
              <p className="text-primary font-bold text-xl mb-6">₹{product.price.toLocaleString()}</p>
              <Button 
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="w-full font-headline tracking-tighter hover:bg-glow text-[0.7rem]"
                variant="outline"
              >
                INITIALIZE PURCHASE
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/30">
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-8 border border-white/5 rounded-3xl bg-background/20 backdrop-blur hover:border-primary/20 transition-all">
            <Zap className="w-12 h-12 text-primary mb-6" />
            <h4 className="font-headline mb-4 tracking-widest">PROPULSION</h4>
            <p className="text-muted-foreground text-sm">Advanced energy return systems integrated within the midsole for peak athletic performance.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 border border-white/5 rounded-3xl bg-background/20 backdrop-blur hover:border-primary/20 transition-all">
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h4 className="font-headline mb-4 tracking-widest">SHIELD TECH</h4>
            <p className="text-muted-foreground text-sm">Nano-weave outer layers providing unprecedented durability and weather resistance in any environment.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 border border-white/5 rounded-3xl bg-background/20 backdrop-blur hover:border-primary/20 transition-all">
            <Sparkles className="w-12 h-12 text-primary mb-6" />
            <h4 className="font-headline mb-4 tracking-widest">ADAPTIVE LITE</h4>
            <p className="text-muted-foreground text-sm">Smart LED matrix that reacts to your environment and pace, controllable via the Neural Link app.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-12 border-t border-white/5 bg-background">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <div className="font-headline font-black text-4xl text-primary mb-4">NEO-STEP</div>
            <p className="text-muted-foreground max-w-sm">The future of movement is here. Engineered for those who never stop moving.</p>
          </div>
          <div className="flex gap-12 font-headline text-xs tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">TWITTER</Link>
            <Link href="#" className="hover:text-primary transition-colors">INSTAGRAM</Link>
            <Link href="#" className="hover:text-primary transition-colors">DISCORD</Link>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[0.6rem] text-muted-foreground tracking-[0.2em] uppercase">
          <p>© 2024 NEO-STEP // DESIGNED IN THE NEON DISTRICT</p>
          <p>TERMS / PRIVACY / NEURAL-LINK</p>
        </div>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-15deg); }
          50% { transform: translateY(-20px) rotate(-10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
