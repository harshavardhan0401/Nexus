'use client';

import { useState, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { getPlaceholderImage, getPlaceholderHint } from '@/lib/placeholder-images';
import ProductCard from '@/components/sections/ProductCard';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function CollectionSection() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useUser();
  const [collection, setCollection] = useState(INITIAL_COLLECTION);
  const [sortOrder, setSortOrder] = useState<string>('default');

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
    const product = collection.find(p => p.id === productId);
    if (!product) return;

    const newName = prompt("Enter new product name:", product.name);
    const newPriceStr = prompt("Enter new product price:", product.price.toString());
    const newPrice = newPriceStr ? parseInt(newPriceStr) : product.price;

    if (newName && !isNaN(newPrice)) {
      setCollection(prev => prev.map(p => p.id === productId ? { ...p, name: newName, price: newPrice } : p));
      toast({
        title: "MANIFEST UPDATED",
        description: `PRODUCT ${productId} PARAMETERS RE-SYNTHESIZED`,
        className: "bg-card border-secondary text-secondary font-headline uppercase text-[0.7rem] tracking-widest",
      });
    }
  }, [collection, toast]);

  const sortedCollection = [...collection].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    return 0;
  });

  return (
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
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onAddToCart={handleAddToCart}
              onEditProduct={handleEditProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
