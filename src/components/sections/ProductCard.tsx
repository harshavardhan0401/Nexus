'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Edit3 } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    specs?: string[];
    imageUrl: string;
    imageHint: string;
  };
  isAdmin: boolean;
  onAddToCart: (product: any) => void;
  onEditProduct: (productId: string, isFeatured: boolean) => void;
}

const ProductCard = React.memo(function ProductCard({ product, isAdmin, onAddToCart, onEditProduct }: ProductCardProps) {
  return (
    <div 
      className="bg-card/50 p-12 rounded-[4rem] border border-white/10 hover:border-primary/50 transition-all group relative mt-24 tilt-card shadow-2xl"
    >
      {isAdmin && (
        <button 
          className="absolute top-8 left-8 z-30 text-secondary/40 hover:text-secondary transition-colors"
          onClick={() => onEditProduct(product.id, false)}
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
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
        onClick={() => onAddToCart(product)}
        className="w-full h-16 font-headline tracking-[0.4em] hover:bg-glow text-[0.8rem] border-white/10 group relative z-20 rounded-2xl uppercase"
        variant="outline"
      >
        ACQUIRE <ArrowRight className="ml-3 w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" />
      </Button>
    </div>
  );
});

export default ProductCard;
