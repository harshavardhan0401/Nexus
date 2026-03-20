
"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Zap, Shield, Sparkles, Mail, Github, Twitter, Instagram, 
  Cpu, Activity, Play, Filter, Edit3, Lock 
} from 'lucide-react';
import Link from 'next/link';
import { getPlaceholderImage, getPlaceholderHint } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

const INITIAL_FEATURED_PRODUCTS = [
  {
    id: 'ultra-l01',
    name: 'ULTRA L-01',
    price: 24999,
    description: 'Propulsion System',
    specs: ['98% Energy Return', 'Carbon Nanoweave', 'Neural Sync v4'],
    imageUrl: getPlaceholderImage('ultra-l01'),
    imageHint: getPlaceholderHint('ultra-l01'),
  },
  {
    id: 'dark-matter',
    name: 'DARK MATTER',
    price: 18500,
    description: 'Carbon Fiber Weave',
    specs: ['Zero-Weight Chassis', 'Stealth Tread', 'Impact Shield'],
    imageUrl: getPlaceholderImage('dark-matter'),
    imageHint: getPlaceholderHint('dark-matter'),
  },
  {
    id: 'neon-gen',
    name: 'NEON GEN',
    price: 21999,
    description: 'Adaptive Lighting',
    specs: ['16M Color Spectrum', 'Biometric Fit', 'Dual-Core LEDs'],
    imageUrl: getPlaceholderImage('neon-gen'),
    imageHint: getPlaceholderHint('neon-gen'),
  },
];

const INITIAL_COLLECTION = [
  {
    id: 'vapor-max-x',
    name: 'Vapor Max-X',
    price: 12999,
    specs: ['Air Flow Max', 'Grip Tech'],
    imageUrl: getPlaceholderImage('vapor-max-x'),
    imageHint: getPlaceholderHint('vapor-max-x')
  },
  {
    id: 'cyber-classic',
    name: 'Cyber Classic',
    price: 9499,
    specs: ['Retro-Fit', 'Dura-Sole'],
    imageUrl: getPlaceholderImage('cyber-classic'),
    imageHint: getPlaceholderHint('cyber-classic')
  },
  {
    id: 'volt-runner',
    name: 'Volt Runner',
    price: 14200,
    specs: ['Energy Cell', 'Flex Upper'],
    imageUrl: getPlaceholderImage('volt-runner'),
    imageHint: getPlaceholderHint('volt-runner')
  },
  {
    id: 'jordan-peak',
    name: 'Jordan Peak',
    price: 19999,
    specs: ['Ankle Lock', 'Pro Cushion'],
    imageUrl: getPlaceholderImage('jordan-peak'),
    imageHint: getPlaceholderHint('jordan-peak')
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useUser();
  const [featuredProducts, setFeaturedProducts] = useState(INITIAL_FEATURED_PRODUCTS);
  const [collection, setCollection] = useState(INITIAL_COLLECTION);
  const [sortOrder, setSortOrder] = useState<string>('default');

  const isAdmin = user?.email === 'admin@gmail.com';

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    toast({
      title: "NEURAL LINK ESTABLISHED",
      description: `${product.name} ADDED TO CARGO MANIFEST`,
      className: "bg-card border-primary text-primary font-headline uppercase text-[0.7rem] tracking-widest shadow-[0_0_20px_rgba(0,242,255,0.2)]",
    });
  };

  const handleEditProduct = (productId: string, isFeatured: boolean) => {
    const list = isFeatured ? featuredProducts : collection;
    const product = list.find(p => p.id === productId);
    if (!product) return;

    const newName = prompt("Enter new product name:", product.name);
    const newPriceStr = prompt("Enter new product price:", product.price.toString());
    const newPrice = newPriceStr ? parseInt(newPriceStr) : product.price;

    if (newName && !isNaN(newPrice)) {
      if (isFeatured) {
        setFeaturedProducts(prev => prev.map(p => p.id === productId ? { ...p, name: newName, price: newPrice } : p));
      } else {
        setCollection(prev => prev.map(p => p.id === productId ? { ...p, name: newName, price: newPrice } : p));
      }
      toast({
        title: "MANIFEST UPDATED",
        description: `PRODUCT ${productId} PARAMETERS RE-SYNTHESIZED`,
        className: "bg-card border-secondary text-secondary font-headline uppercase text-[0.7rem] tracking-widest",
      });
    }
  };

  const sortedCollection = [...collection].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    return 0;
  });

  return (
    <main className="min-h-screen relative bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <h1 className="text-7xl md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase font-audiowide">
                BEYOND <br />
                <span className="text-primary text-glow">REALITY</span>
              </h1>
              <p className="text-muted-foreground text-lg uppercase tracking-widest leading-relaxed max-w-md font-medium">
                Engineered for the metaverse, built for the streets. Experience the next evolution of comfort and futuristic style.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-background font-headline tracking-widest hover:bg-glow h-16 px-12 group rounded-xl" asChild>
                <Link href="#drops">
                  EXPLORE DROPS
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary font-headline tracking-widest hover:bg-primary/10 h-16 px-12 rounded-xl" asChild>
                <Link href="#collection">
                  COLLECTION
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            {/* Slanted Square Background */}
            <div className="absolute w-[80%] aspect-square bg-[#b4f331] rotate-12 rounded-[2rem] z-0" />
            
            <div className="relative z-10 w-full aspect-square drop-shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-1000 ease-out">
              <Image
                src={getPlaceholderImage('ultra-l01')}
                alt="Hero Sneaker"
                fill
                className="object-contain"
                priority
                data-ai-hint="lime green neon sneaker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Drops Section */}
      <section id="drops" className="bg-card/20 py-32 relative border-y border-white/5">
        <div className="px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <p className="text-primary tracking-[0.5em] font-headline text-[0.6rem] mb-4">DISTRICT_DROPS // v2.025</p>
            <h2 className="text-5xl md:text-8xl font-black font-audiowide">THE SHOWCASE</h2>
          </div>
          <p className="text-muted-foreground font-headline text-xs tracking-widest max-w-xs opacity-60 uppercase">LIMITED RESOURCE ALLOCATION. SECURE ACCESS IMMEDIATELY.</p>
        </div>
        
        <div className="flex gap-12 px-6 md:px-12 overflow-x-auto no-scrollbar pb-16 snap-x snap-mandatory">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="min-w-[85vw] md:min-w-[60vw] h-[65vh] md:h-[80vh] bg-background/40 border border-white/5 rounded-[4rem] p-12 relative overflow-hidden group snap-center hover:border-primary/20 transition-all duration-700 tilt-card"
            >
              <div className="relative z-20 h-full flex flex-col justify-center max-w-md">
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-0 left-0 text-secondary hover:text-secondary-foreground gap-2 font-headline text-[0.6rem] tracking-widest mb-4"
                    onClick={() => handleEditProduct(product.id, true)}
                  >
                    <Edit3 className="w-3 h-3" /> RE-WRITE PARAMS
                  </Button>
                )}
                <p className="text-primary font-headline tracking-[0.4em] text-[0.65rem] uppercase mb-4 opacity-70 mt-8">{product.description}</p>
                <h3 className="text-4xl md:text-7xl font-headline font-black mb-6 group-hover:text-primary transition-colors leading-none font-audiowide">{product.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.specs?.map((spec, i) => (
                    <span key={i} className="text-[0.55rem] font-headline tracking-widest px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary/80 uppercase">
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-4xl font-headline text-secondary mb-12 tracking-tighter animate-pulse-neon font-audiowide">₹{product.price.toLocaleString()}</p>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-fit h-16 px-12 border-primary text-primary font-headline tracking-widest hover:bg-primary hover:text-background rounded-xl text-lg"
                  variant="outline"
                >
                  ACQUIRE
                </Button>
              </div>
              
              <div className="absolute top-0 right-[-15%] w-[120%] h-full pointer-events-none group-hover:scale-105 transition-all duration-1000 ease-out z-10">
                <div className="scanline group-hover:block hidden" />
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain rotate-[-20deg] drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] group-hover:rotate-0 transition-transform duration-1000"
                  data-ai-hint={product.imageHint}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Collection */}
      <section id="collection" className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-end relative z-10">
          <div className="space-y-6">
            <p className="text-primary tracking-[0.4em] font-headline text-[0.65rem] mb-4 uppercase">NEURAL_STREET // COLLECTION</p>
            <h2 className="text-5xl md:text-8xl font-black font-audiowide">CATALOGUE</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4 bg-card/40 p-2 rounded-2xl border border-white/5">
              <Filter className="w-4 h-4 text-primary ml-4" />
              <Select onValueChange={setSortOrder} defaultValue="default">
                <SelectTrigger className="w-[200px] border-none bg-transparent font-headline text-[0.7rem] tracking-widest focus:ring-0 uppercase">
                  <SelectValue placeholder="SORT BY PRICE" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 border-primary/20 backdrop-blur-xl">
                  <SelectItem value="default" className="font-headline text-[0.6rem] tracking-widest uppercase">ORIGINAL SEQUENCE</SelectItem>
                  <SelectItem value="low-to-high" className="font-headline text-[0.6rem] tracking-widest uppercase">MIN → MAX CREDIT</SelectItem>
                  <SelectItem value="high-to-low" className="font-headline text-[0.6rem] tracking-widest uppercase">MAX → MIN CREDIT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24 relative z-10">
          {sortedCollection.map((product) => (
            <div 
              key={product.id} 
              className="bg-card/40 p-10 rounded-[3.5rem] border border-white/5 hover:border-primary/40 transition-all group relative mt-20 tilt-card"
            >
              {isAdmin && (
                <button 
                  className="absolute top-6 left-6 z-30 text-secondary/50 hover:text-secondary transition-colors"
                  onClick={() => handleEditProduct(product.id, false)}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
              <div className="relative aspect-square -mt-36 mb-8 transition-all duration-700 group-hover:scale-125 group-hover:rotate-[-10deg] group-hover:drop-shadow-[0_0_40px_rgba(0,242,255,0.4)]">
                <div className="scanline group-hover:block hidden" />
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain"
                  data-ai-hint={product.imageHint}
                />
              </div>
              <h3 className="font-headline text-xl mb-3 tracking-tight flex items-center gap-2 font-audiowide uppercase">
                <Activity className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                {product.name}
              </h3>
              <p className="text-primary font-bold text-2xl mb-8 animate-pulse-neon font-audiowide">₹{product.price.toLocaleString()}</p>
              
              <div className="flex flex-wrap gap-1 mb-6">
                {product.specs?.map((spec, i) => (
                  <span key={i} className="text-[0.45rem] font-headline tracking-widest px-2 py-1 bg-white/5 rounded border border-white/10 uppercase opacity-60">
                    {spec}
                  </span>
                ))}
              </div>

              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full h-14 font-headline tracking-widest hover:bg-glow text-[0.75rem] border-white/10 group relative z-20 rounded-xl"
                variant="outline"
              >
                ACQUIRE <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Sneaker Stories */}
      <section className="py-32 px-6 md:px-12 bg-card/5 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-primary tracking-[0.6em] font-headline text-xs uppercase">NEURAL_BROADCAST // VOD</p>
            <h2 className="text-5xl md:text-8xl font-black font-audiowide">SNEAKER STORIES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { id: '1', title: 'District Propulsion v1', videoId: 'dQw4w9WgXcQ' },
              { id: '2', title: 'Carbon Nanoweave Field Test', videoId: 'dQw4w9WgXcQ' },
            ].map((video) => (
              <div key={video.id} className="relative group rounded-[3rem] overflow-hidden aspect-video border border-white/10 bg-black/40 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none">
                  <Play className="w-20 h-20 text-primary fill-current animate-pulse" />
                </div>
                <iframe 
                  className="w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&controls=0&mute=1&loop=1`} 
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <h4 className="font-headline text-xl text-white font-black tracking-widest uppercase">{video.title}</h4>
                  <p className="text-primary font-headline text-[0.6rem] tracking-[0.3em]">LIVE FEED ACTIVE</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden bg-background border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <Badge variant="outline" className="border-primary text-primary font-headline py-1 px-4 tracking-[0.4em] mb-6 uppercase">RESTRICTED_ACCESS</Badge>
          <h2 className="text-6xl md:text-9xl font-black leading-none font-audiowide uppercase">EXPLORE <span className="text-primary text-glow">BEYOND</span></h2>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto uppercase tracking-widest leading-loose opacity-80">
            Sign in to your neural hub to unlock elite drops, prioritized synthesis, and real-time cargo tracking.
          </p>
          <Button asChild size="lg" className="h-24 px-20 bg-primary text-background font-headline text-2xl tracking-[0.4em] hover:bg-glow group shadow-[0_0_60px_rgba(0,242,255,0.3)] rounded-3xl" asChild>
            <Link href="/login">
              NEURAL LOGIN <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/5 bg-black/60 backdrop-blur-3xl relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-20">
          <div className="space-y-10 lg:col-span-1">
            <div className="font-headline font-black text-4xl text-primary tracking-tighter uppercase">SNEAKERVERSE</div>
            <p className="text-muted-foreground uppercase text-xs tracking-[0.2em] leading-loose opacity-60">
              The future of movement is a neural-physical hybrid. Engineered for those who never stop.
            </p>
            <div className="flex gap-8">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <Link key={i} href="#" className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all group hover:bg-primary/5">
                  <Icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:col-span-2 gap-12">
            <div className="space-y-8">
              <h5 className="font-headline text-[0.7rem] text-primary tracking-[0.5em] uppercase border-b border-primary/20 pb-4">District Map</h5>
              <ul className="space-y-4 text-xs tracking-widest uppercase font-headline">
                <li><Link href="#home" className="text-muted-foreground hover:text-white transition-colors">Strategic Hub</Link></li>
                <li><Link href="#drops" className="text-muted-foreground hover:text-white transition-colors">Latest Rations</Link></li>
                <li><Link href="#collection" className="text-muted-foreground hover:text-white transition-colors">Propulsion Index</Link></li>
                <li><Link href="/lab" className="text-muted-foreground hover:text-white transition-colors">Neural Lab</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="font-headline text-[0.7rem] text-primary tracking-[0.5em] uppercase border-b border-primary/20 pb-4">Protocols</h5>
              <ul className="space-y-4 text-xs tracking-widest uppercase font-headline">
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Neural Support</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Logistics Hub</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Encryption Key</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Warranty Link</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-10">
            <h5 className="font-headline text-[0.7rem] text-primary tracking-[0.5em] uppercase border-b border-primary/20 pb-4">Neural Pulse</h5>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="ID@SNEAKER.VERSE" 
                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-xs font-headline tracking-widest focus:outline-none focus:border-primary transition-all uppercase"
              />
              <button className="absolute right-2 top-2 h-12 w-12 bg-primary text-background rounded-xl flex items-center justify-center hover:bg-glow transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[0.6rem] text-muted-foreground uppercase tracking-widest leading-relaxed opacity-50">
              By authorizing synchronization, you agree to district-wide data protocols.
            </p>
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.6rem] text-muted-foreground tracking-[0.4em] uppercase font-headline opacity-60">
          <p>© 2025 SNEAKERVERSE // DESIGNED IN THE NEON DISTRICT</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white">PROTOCOLS</Link>
            <Link href="#" className="hover:text-white">NEURAL_PRIVACY</Link>
            <Link href="#" className="hover:text-white">ACCESS_TERMS</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
