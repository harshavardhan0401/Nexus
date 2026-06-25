'use client';

import { useState, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { getPlaceholderImage, getPlaceholderHint } from '@/lib/placeholder-images';
import FeaturedCard from '@/components/sections/FeaturedCard';

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

export default function DropsSection() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useUser();
  const [featuredProducts, setFeaturedProducts] = useState(INITIAL_FEATURED_PRODUCTS);

  const isAdmin = user?.email === 'admin@gmail.com';

  const handleAddToCart = useCallback((product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    toast({
      title: "NEURAL LINK ESTABLISHED",
      description: `${product.name} ADDED TO CARGO MANIFEST`,
      className: "bg-card border-primary text-primary font-headline uppercase text-[0.7rem] tracking-widest shadow-[0_0_20px_rgba(0,242,255,0.2)]",
    });
  }, [addToCart, toast]);

  const handleEditProduct = useCallback((productId: string, _isFeatured: boolean) => {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;

    const newName = prompt("Enter new product name:", product.name);
    const newPriceStr = prompt("Enter new product price:", product.price.toString());
    const newPrice = newPriceStr ? parseInt(newPriceStr) : product.price;

    if (newName && !isNaN(newPrice)) {
      setFeaturedProducts(prev => prev.map(p => p.id === productId ? { ...p, name: newName, price: newPrice } : p));
      toast({
        title: "MANIFEST UPDATED",
        description: `PRODUCT ${productId} PARAMETERS RE-SYNTHESIZED`,
        className: "bg-card border-secondary text-secondary font-headline uppercase text-[0.7rem] tracking-widest",
      });
    }
  }, [featuredProducts, toast]);

  return (
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
          <FeaturedCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onAddToCart={handleAddToCart}
            onEditProduct={handleEditProduct}
          />
        ))}
      </div>
    </section>
  );
}
