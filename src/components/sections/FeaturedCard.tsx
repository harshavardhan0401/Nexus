'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Edit3 } from 'lucide-react';

interface FeaturedCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    specs?: string[];
    imageUrl: string;
    imageHint: string;
  };
  isAdmin: boolean;
  onAddToCart: (product: any) => void;
  onEditProduct: (productId: string, isFeatured: boolean) => void;
}

const FeaturedCard = React.memo(function FeaturedCard({ product, isAdmin, onAddToCart, onEditProduct }: FeaturedCardProps) {
  return (
    <div 
      className="min-w-[85vw] md:min-w-[700px] h-[600px] bg-background/60 border border-white/10 rounded-[4rem] p-16 relative overflow-hidden group snap-center hover:border-primary/40 transition-all duration-700 tilt-card"
    >
      <div className="relative z-20 h-full flex flex-col justify-center max-w-[350px]">
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-0 left-0 text-secondary hover:text-secondary-foreground gap-2 font-headline text-[0.6rem] tracking-[0.4em] mb-4"
            onClick={() => onEditProduct(product.id, true)}
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
          onClick={() => onAddToCart(product)}
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
          sizes="(max-width: 768px) 85vw, 700px"
          loading="lazy"
          data-ai-hint={product.imageHint}
        />
      </div>
    </div>
  );
});

export default FeaturedCard;
