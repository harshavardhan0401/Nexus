import Image from 'next/image';
import Link from 'next/link';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function HeroSection() {
  return (
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
            <Link
              href="#drops"
              className="inline-flex items-center justify-center h-20 px-14 bg-primary text-background font-headline tracking-[0.3em] hover:bg-glow rounded-2xl shadow-[0_0_40px_rgba(0,242,255,0.3)] text-sm font-medium"
            >
              EXPLORE DROPS
            </Link>
            <Link
              href="#collection"
              className="inline-flex items-center justify-center h-20 px-14 border border-primary/40 text-primary font-headline tracking-[0.3em] hover:bg-primary/10 rounded-2xl text-sm font-medium"
            >
              COLLECTION
            </Link>
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
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint="lime green neon sneaker"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
