
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Activity, Play, Filter, Edit3, Lock, Zap, Shield, Mail, Github, Twitter, Instagram 
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
    <main className="min-h-screen relative bg-[#020202]">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
        {/* Precise Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 right-0 w-[60%] h-[60%] bg-primary/10 blur-[180px] rounded-full -translate-y-1/2 pointer-events-none opacity-40" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase font-audiowide flex flex-col">
                <span>BEYOND</span>
                <span className="text-primary text-glow">REALITY</span>
              </h1>
              <p className="text-muted-foreground text-xl uppercase tracking-[0.4em] leading-relaxed max-w-md font-medium opacity-80">
                Engineered for the metaverse, <br />built for the streets.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <Button size="lg" className="bg-primary text-background font-headline tracking-[0.3em] hover:bg-glow h-20 px-14 group rounded-2xl shadow-[0_0_40px_rgba(0,242,255,0.3)]" asChild>
                <Link href="#drops">
                  EXPLORE DROPS
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/40 text-primary font-headline tracking-[0.3em] hover:bg-primary/10 h-20 px-14 rounded-2xl" asChild>
                <Link href="#collection">
                  COLLECTION
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center items-center h-[700px]">
            {/* Slanted Square Background - The Neon Propulsion Block */}
            <div className="absolute w-[90%] aspect-square bg-[#b4f331] rotate-12 rounded-[3.5rem] z-0 shadow-[0_0_100px_rgba(180,243,49,0.3)] animate-pulse" />
            
            <div className="relative z-10 w-full h-full drop-shadow-[0_60px_120px_rgba(0,0,0,0.7)] transition-transform hover:scale-105 duration-1000 ease-out flex items-center justify-center">
              <Image
                src={getPlaceholderImage('ultra-l01')}
                alt="Hero Sneaker"
                width={800}
                height={800}
                className="object-contain rotate-[-15deg] animate-float"
                priority
                data-ai-hint="lime green neon sneaker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Drops Section */}
      <section id="drops" className="bg-card/10 py-40 relative border-y border-white/5">
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6">
            <p className="text-primary tracking-[0.6em] font-headline text-[0.7rem] mb-4 uppercase">DISTRICT_DROPS // V2.025</p>
            <h2 className="text-6xl md:text-9xl font-black font-audiowide leading-none">THE SHOWCASE</h2>
          </div>
          <p className="text-muted-foreground font-headline text-[0.65rem] tracking-[0.4em] max-w-xs opacity-50 uppercase leading-loose">
            Limited resource allocation. Secure neural access immediately.
          </p>
        </div>
        
        <div className="flex gap-12 px-6 md:px-12 max-w-[1400px] mx-auto overflow-x-auto no-scrollbar pb-16 snap-x snap-mandatory">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="min-w-[85vw] md:min-w-[700px] h-[600px] bg-background/60 border border-white/10 rounded-[4rem] p-16 relative overflow-hidden group snap-center hover:border-primary/40 transition-all duration-700 tilt-card"
            >
              <div className="relative z-20 h-full flex flex-col justify-center max-w-[350px]">
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-0 left-0 text-secondary hover:text-secondary-foreground gap-2 font-headline text-[0.6rem] tracking-[0.4em] mb-4"
                    onClick={() => handleEditProduct(product.id, true)}
                  >
                    <Edit3 className="w-3 h-3" /> RE-SYNTH PARAMS
                  </Button>
                )}
                <p className="text-primary font-headline tracking-[0.5em] text-[0.65rem] uppercase mb-6 opacity-80 mt-8">{product.description}</p>
                <h3 className="text-4xl md:text-6xl font-headline font-black mb-8 group-hover:text-primary transition-colors leading-tight font-audiowide uppercase">{product.name}</h3>
                
                <div className="flex flex-wrap gap-3 mb-12">
                  {product.specs?.map((spec, i) => (
                    <span key={i} className="text-[0.6rem] font-headline tracking-widest px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-primary uppercase">
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-5xl font-headline text-secondary mb-12 tracking-tighter animate-pulse-neon font-audiowide">₹{product.price.toLocaleString()}</p>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-fit h-18 px-14 border-primary text-primary font-headline tracking-[0.3em] hover:bg-primary hover:text-background rounded-2xl text-lg shadow-[0_0_30px_rgba(0,242,255,0.1)]"
                  variant="outline"
                >
                  ACQUIRE
                </Button>
              </div>
              
              <div className="absolute top-0 right-[-10%] w-[110%] h-full pointer-events-none group-hover:scale-110 transition-all duration-1000 ease-out z-10">
                <div className="scanline group-hover:block hidden" />
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain rotate-[-25deg] drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] group-hover:rotate-0 transition-transform duration-1000"
                  data-ai-hint={product.imageHint}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Collection */}
      <section id="collection" className="py-40 px-6 md:px-12 bg-[#020202] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-end relative z-10">
            <div className="space-y-6">
              <p className="text-primary tracking-[0.5em] font-headline text-[0.7rem] mb-4 uppercase">NEURAL_STREET // COLLECTION</p>
              <h2 className="text-6xl md:text-9xl font-black font-audiowide leading-none">CATALOGUE</h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-end">
              <div className="flex items-center gap-4 bg-card/60 p-3 rounded-2xl border border-white/10 shadow-xl">
                <Filter className="w-4 h-4 text-primary ml-4" />
                <Select onValueChange={setSortOrder} defaultValue="default">
                  <SelectTrigger className="w-[220px] border-none bg-transparent font-headline text-[0.7rem] tracking-[0.3em] focus:ring-0 uppercase">
                    <SelectValue placeholder="SORT PARAMS" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 border-primary/20 backdrop-blur-2xl">
                    <SelectItem value="default" className="font-headline text-[0.6rem] tracking-widest uppercase">ORIGINAL SEQUENCE</SelectItem>
                    <SelectItem value="low-to-high" className="font-headline text-[0.6rem] tracking-widest uppercase">CREDIT MIN → MAX</SelectItem>
                    <SelectItem value="high-to-low" className="font-headline text-[0.6rem] tracking-widest uppercase">CREDIT MAX → MIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32 relative z-10">
            {sortedCollection.map((product) => (
              <div 
                key={product.id} 
                className="bg-card/50 p-12 rounded-[4rem] border border-white/10 hover:border-primary/50 transition-all group relative mt-24 tilt-card shadow-2xl"
              >
                {isAdmin && (
                  <button 
                    className="absolute top-8 left-8 z-30 text-secondary/40 hover:text-secondary transition-colors"
                    onClick={() => handleEditProduct(product.id, false)}
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
                <div className="relative aspect-square -mt-44 mb-10 transition-all duration-1000 group-hover:scale-125 group-hover:rotate-[-12deg] group-hover:drop-shadow-[0_0_60px_rgba(0,242,255,0.5)]">
                  <div className="scanline group-hover:block hidden" />
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name}
                    fill
                    className="object-contain"
                    data-ai-hint={product.imageHint}
                  />
                </div>
                <h3 className="font-headline text-2xl mb-4 tracking-tight flex items-center gap-3 font-audiowide uppercase">
                  <Activity className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {product.name}
                </h3>
                <p className="text-primary font-bold text-3xl mb-10 animate-pulse-neon font-audiowide">₹{product.price.toLocaleString()}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {product.specs?.map((spec, i) => (
                    <span key={i} className="text-[0.55rem] font-headline tracking-[0.2em] px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 uppercase opacity-40">
                      {spec}
                    </span>
                  ))}
                </div>

                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full h-16 font-headline tracking-[0.4em] hover:bg-glow text-[0.8rem] border-white/10 group relative z-20 rounded-2xl uppercase"
                  variant="outline"
                >
                  ACQUIRE <ArrowRight className="ml-3 w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sneaker Stories */}
      <section className="py-40 px-6 md:px-12 bg-card/5 relative">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <p className="text-primary tracking-[0.8em] font-headline text-[0.75rem] uppercase">NEURAL_BROADCAST // VOD</p>
            <h2 className="text-6xl md:text-[8rem] font-black font-audiowide leading-none">SNEAKER STORIES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { id: '1', title: 'District Propulsion V1', videoId: 'dQw4w9WgXcQ' },
              { id: '2', title: 'Carbon Nanoweave Field Test', videoId: 'dQw4w9WgXcQ' },
            ].map((video) => (
              <div key={video.id} className="relative group rounded-[4rem] overflow-hidden aspect-video border border-white/10 bg-black/60 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 pointer-events-none">
                  <Play className="w-24 h-24 text-primary fill-current animate-pulse" />
                </div>
                <iframe 
                  className="w-full h-full grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&controls=0&mute=1&loop=1`} 
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute bottom-12 left-12 z-20">
                  <h4 className="font-headline text-3xl text-white font-black tracking-[0.2em] uppercase font-audiowide mb-2">{video.title}</h4>
                  <p className="text-primary font-headline text-[0.7rem] tracking-[0.4em] opacity-80 uppercase">LIVE FEED ACTIVE // SECURED</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-52 px-6 relative overflow-hidden bg-[#020202] border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[250px] rounded-full pointer-events-none opacity-30" />
        <div className="max-w-[1400px] mx-auto text-center space-y-16 relative z-10">
          <Badge variant="outline" className="border-primary text-primary font-headline py-2 px-6 tracking-[0.5em] mb-8 uppercase text-xs">RESTRICTED_ACCESS</Badge>
          <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] font-audiowide uppercase">EXPLORE <span className="text-primary text-glow">BEYOND</span></h2>
          <p className="text-muted-foreground text-xl md:text-3xl max-w-4xl mx-auto uppercase tracking-[0.4em] leading-relaxed opacity-60 font-medium">
            Initialize your neural ID to unlock <br />elite drops and priority synthesis.
          </p>
          <Button asChild size="lg" className="h-28 px-24 bg-primary text-background font-headline text-3xl tracking-[0.5em] hover:bg-glow group shadow-[0_0_80px_rgba(0,242,255,0.4)] rounded-[2.5rem] mt-12">
            <Link href="/login">
              NEURAL LOGIN <ArrowRight className="ml-6 w-10 h-10 group-hover:translate-x-4 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-6 md:px-12 border-t border-white/5 bg-black/90 backdrop-blur-3xl relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-24">
          <div className="space-y-12 lg:col-span-1">
            <div className="font-headline font-black text-5xl text-primary tracking-tighter uppercase font-audiowide">SNEAKERVERSE</div>
            <p className="text-muted-foreground uppercase text-[0.7rem] tracking-[0.3em] leading-[2.5] opacity-50 font-medium">
              The future of movement is a neural-physical hybrid. Engineered for those who never stop.
            </p>
            <div className="flex gap-8">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <Link key={i} href="#" className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all group hover:bg-primary/5 shadow-inner">
                  <Icon className="w-7 h-7 group-hover:scale-125 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:col-span-2 gap-16">
            <div className="space-y-10">
              <h5 className="font-headline text-[0.8rem] text-primary tracking-[0.6em] uppercase border-b border-primary/20 pb-6 font-black">District Map</h5>
              <ul className="space-y-6 text-[0.7rem] tracking-[0.3em] uppercase font-headline">
                <li><Link href="#home" className="text-muted-foreground hover:text-white transition-colors">Strategic Hub</Link></li>
                <li><Link href="#drops" className="text-muted-foreground hover:text-white transition-colors">Latest Rations</Link></li>
                <li><Link href="#collection" className="text-muted-foreground hover:text-white transition-colors">Propulsion Index</Link></li>
                <li><Link href="/lab" className="text-muted-foreground hover:text-white transition-colors">Neural Lab</Link></li>
              </ul>
            </div>
            <div className="space-y-10">
              <h5 className="font-headline text-[0.8rem] text-primary tracking-[0.6em] uppercase border-b border-primary/20 pb-6 font-black">Protocols</h5>
              <ul className="space-y-6 text-[0.7rem] tracking-[0.3em] uppercase font-headline">
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Neural Support</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Logistics Hub</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Encryption Key</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Warranty Link</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <h5 className="font-headline text-[0.8rem] text-primary tracking-[0.6em] uppercase border-b border-primary/20 pb-6 font-black">Neural Pulse</h5>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="ID@SNEAKER.VERSE" 
                className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl px-8 text-[0.7rem] font-headline tracking-[0.3em] focus:outline-none focus:border-primary transition-all uppercase placeholder:opacity-30"
              />
              <button className="absolute right-3 top-3 h-14 w-14 bg-primary text-background rounded-xl flex items-center justify-center hover:bg-glow transition-all shadow-lg">
                <Mail className="w-6 h-6" />
              </button>
            </div>
            <p className="text-[0.6rem] text-muted-foreground uppercase tracking-[0.4em] leading-loose opacity-40 font-medium">
              By authorizing synchronization, you agree to district-wide data protocols.
            </p>
          </div>
        </div>
        
        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[0.65rem] text-muted-foreground tracking-[0.5em] uppercase font-headline opacity-40">
          <p>© 2025 SNEAKERVERSE // DESIGNED IN THE NEON DISTRICT</p>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-white">PROTOCOLS</Link>
            <Link href="#" className="hover:text-white">NEURAL_PRIVACY</Link>
            <Link href="#" className="hover:text-white">ACCESS_TERMS</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
