"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Sparkles, Mail, Github, Twitter, Instagram, Cpu, Activity } from 'lucide-react';
import Link from 'next/link';
import { getPlaceholderImage, getPlaceholderHint } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const FEATURED_PRODUCTS = [
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

const COLLECTION = [
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
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    toast({
      title: "NEURAL LINK ESTABLISHED",
      description: `${product.name} ADDED TO CARGO MANIFEST`,
      className: "bg-card border-primary text-primary font-headline uppercase text-[0.7rem] tracking-widest",
    });
  };

  return (
    <main className="min-h-screen relative">
      <div className="particles-bg" />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <h1 className="absolute font-headline font-black text-[18vw] leading-none hero-title-stroke select-none pointer-events-none z-0 opacity-20">
          NEO-STEP
        </h1>
        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
          <div className="relative w-full aspect-[16/9] drop-shadow-[0_0_80px_rgba(0,242,255,0.4)] animate-float transition-transform hover:scale-105 duration-1000 ease-out">
            <Image
              src={getPlaceholderImage('hero-shoe')}
              alt="Hero Shoe"
              fill
              className="object-contain rotate-[-15deg] brightness-110"
              priority
              data-ai-hint={getPlaceholderHint('hero-shoe')}
            />
          </div>
          <div className="mt-4 flex flex-col items-center text-center space-y-6">
            <div className="space-y-2">
              <p className="font-headline text-primary tracking-[0.8em] text-xs uppercase animate-pulse">Neural Propulsion Active</p>
              <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-sm">FUTURE OF <span className="text-primary text-glow italic">STANCE</span></h2>
            </div>
            <Button size="lg" className="bg-primary text-background font-headline tracking-widest hover:bg-glow h-16 px-12 group" asChild>
              <Link href="/collections">
                INITIALIZE CORE <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Horizontal Showcase */}
      <section id="drops" className="bg-card/30 py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-primary tracking-[0.5em] font-headline text-[0.6rem] mb-4">DISTRICT_DROPS // v2.025</p>
            <h2 className="text-5xl md:text-8xl font-black">THE SHOWCASE</h2>
          </div>
          <p className="text-muted-foreground font-headline text-xs tracking-widest max-w-xs">LIMITED RESOURCE ALLOCATION. SECURE ACCESS IMMEDIATELY.</p>
        </div>
        
        <div 
          ref={showcaseRef}
          className="flex gap-10 px-6 md:px-12 overflow-x-auto no-scrollbar pb-16 snap-x snap-mandatory"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="min-w-[90vw] md:min-w-[65vw] h-[60vh] md:h-[75vh] bg-background/40 border border-white/5 rounded-[4rem] p-12 relative overflow-hidden group snap-center hover:border-primary/20 transition-all duration-700 tilt-card"
            >
              <div className="relative z-20 h-full flex flex-col justify-center max-w-md">
                <p className="text-primary font-headline tracking-[0.4em] text-[0.65rem] uppercase mb-4 opacity-70">{product.description}</p>
                <h3 className="text-5xl md:text-8xl font-headline font-black mb-6 group-hover:text-primary transition-colors leading-none">{product.name}</h3>
                
                {/* Neural Spec Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.specs?.map((spec, i) => (
                    <span key={i} className="text-[0.5rem] font-headline tracking-widest px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary/80">
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-3xl font-headline text-secondary mb-10 tracking-tighter animate-pulse-neon">₹{product.price.toLocaleString()}</p>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-fit h-14 px-8 border-primary text-primary font-headline tracking-widest hover:bg-primary hover:text-background"
                  variant="outline"
                >
                  SECURE CARGO
                </Button>
              </div>
              
              <div className="absolute top-0 right-[-10%] w-[130%] h-full pointer-events-none group-hover:scale-110 transition-all duration-1000 ease-out z-10">
                <div className="scanline group-hover:block hidden" />
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain rotate-[-25deg] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] group-hover:rotate-0 transition-transform duration-1000"
                  data-ai-hint={product.imageHint}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Collection */}
      <section id="collection" className="py-32 px-6 md:px-12 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-end">
          <div>
            <p className="text-primary tracking-[0.4em] font-headline text-[0.65rem] mb-4">NEURAL_STREET // COLLECTION</p>
            <h2 className="text-5xl md:text-8xl font-black">CATALOGUE</h2>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground text-sm uppercase tracking-widest leading-loose">
              Synthesized materials. Reactive comfort. Neural link compatibility. NeoStride brings the future of athletic propulsion to the current timeline.
            </p>
            <div className="h-0.5 w-24 bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {COLLECTION.map((product) => (
            <div 
              key={product.id} 
              className="bg-card/40 p-10 rounded-[3rem] border border-white/5 hover:border-primary/40 transition-all group relative mt-20 tilt-card"
            >
              <div className="relative aspect-square -mt-32 mb-8 transition-all duration-700 group-hover:scale-125 group-hover:rotate-[-12deg] group-hover:drop-shadow-[0_0_30px_rgba(0,242,255,0.4)]">
                <div className="scanline group-hover:block hidden" />
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain"
                  data-ai-hint={product.imageHint}
                />
              </div>
              <h3 className="font-headline text-xl mb-3 tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                {product.name}
              </h3>
              <p className="text-primary font-bold text-2xl mb-8 animate-pulse-neon">₹{product.price.toLocaleString()}</p>
              
              {/* Hover Spec Overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] pointer-events-none border border-primary/20" />

              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full h-14 font-headline tracking-tighter hover:bg-glow text-[0.75rem] border-white/10 group relative z-20"
                variant="outline"
              >
                ACQUIRE <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Features - High Tech Display */}
      <section className="py-32 bg-card/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="group flex flex-col items-center text-center p-12 border border-white/5 rounded-[3rem] bg-background/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,242,255,0.1)]">
              <Zap className="w-10 h-10 text-primary group-hover:text-glow" />
            </div>
            <h4 className="font-headline text-xl mb-6 tracking-widest">PROPULSION X</h4>
            <p className="text-muted-foreground text-sm leading-relaxed tracking-wide">Kinetic energy recovery system providing up to 98% return on every stride.</p>
          </div>
          <div className="group flex flex-col items-center text-center p-12 border border-white/5 rounded-[3rem] bg-background/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,242,255,0.1)]">
              <Cpu className="w-10 h-10 text-primary group-hover:text-glow" />
            </div>
            <h4 className="font-headline text-xl mb-6 tracking-widest">NEURAL ARMOUR</h4>
            <p className="text-muted-foreground text-sm leading-relaxed tracking-wide">Carbon-fiber nanoweave providing total environmental protection with zero weight.</p>
          </div>
          <div className="group flex flex-col items-center text-center p-12 border border-white/5 rounded-[3rem] bg-background/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,242,255,0.1)]">
              <Sparkles className="w-10 h-10 text-primary group-hover:text-glow" />
            </div>
            <h4 className="font-headline text-xl mb-6 tracking-widest">ILLUMINATE SYNC</h4>
            <p className="text-muted-foreground text-sm leading-relaxed tracking-wide">Smart-LED arrays that react to your pace and environment via neural connection.</p>
          </div>
        </div>
      </section>

      {/* Login CTA - Neural Access */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <p className="font-headline text-primary tracking-[0.5em] text-xs uppercase">Restricted Access District</p>
          <h2 className="text-6xl md:text-9xl font-black leading-none">NEURAL <span className="text-primary text-glow">OVERRIDE</span></h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
            Sign in to unlock exclusive neural-drops, personalized style synthesis, and accelerated checkout protocols.
          </p>
          <Button asChild size="lg" className="h-20 px-16 bg-primary text-background font-headline text-xl tracking-[0.3em] hover:bg-glow group shadow-[0_0_50px_rgba(0,242,255,0.2)]">
            <Link href="/login">
              INITIALIZE LOGIN <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer - Final Frontier */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/5 bg-black/40 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-20">
          <div className="space-y-8 lg:col-span-1">
            <div className="font-headline font-black text-4xl text-primary tracking-widest">NEO-STEP</div>
            <p className="text-muted-foreground uppercase text-xs tracking-widest leading-loose">
              The future of movement is a neural-physical hybrid. Engineered for those who never stop.
            </p>
            <div className="flex gap-6">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all group shadow-[0_0_10px_rgba(0,242,255,0.05)]">
                  <Icon className="w-5 h-5 group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:col-span-2 gap-12">
            <div className="space-y-6">
              <h5 className="font-headline text-[0.65rem] text-primary tracking-[0.4em] uppercase">Operations</h5>
              <ul className="space-y-4 text-xs tracking-widest uppercase font-headline">
                <li><Link href="#home" className="text-muted-foreground hover:text-white transition-colors">Base Hub</Link></li>
                <li><Link href="#drops" className="text-muted-foreground hover:text-white transition-colors">Latest Drops</Link></li>
                <li><Link href="#collection" className="text-muted-foreground hover:text-white transition-colors">Neural Catalog</Link></li>
                <li><Link href="/lab" className="text-muted-foreground hover:text-white transition-colors">The Lab</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-headline text-[0.65rem] text-primary tracking-[0.4em] uppercase">Support</h5>
              <ul className="space-y-4 text-xs tracking-widest uppercase font-headline">
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Neural Help</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Ship Protocols</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Security Rules</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Warranty Link</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="font-headline text-[0.65rem] text-primary tracking-[0.4em] uppercase">Newsletter Update</h5>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="NEURAL_ID@HOST.COM" 
                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-xs font-headline tracking-widest focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-2 h-12 w-12 bg-primary text-background rounded-xl flex items-center justify-center hover:bg-glow transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[0.6rem] text-muted-foreground uppercase tracking-widest leading-relaxed">
              By subscribing, you authorize neural data synchronization for personalized updates.
            </p>
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.6rem] text-muted-foreground tracking-[0.3em] uppercase font-headline">
          <p>© 2025 NEO-STEP // DESIGNED IN THE NEON DISTRICT</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white">PROTOCOLS</Link>
            <Link href="#" className="hover:text-white">NEURAL_PRIVACY</Link>
            <Link href="#" className="hover:text-white">ACCESS_TERMS</Link>
          </div>
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
        .bg-grid-white {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
      `}</style>
    </main>
  );
}