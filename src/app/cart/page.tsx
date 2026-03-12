
"use client";

import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 px-6 md:px-12 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-headline font-black mb-12 tracking-tighter">
          SECURE <span className="text-primary text-glow">CARGO</span>
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-card/20 rounded-[3rem] border border-dashed border-white/5">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
            <div>
              <p className="font-headline text-lg mb-2">EMPTY INVENTORY</p>
              <p className="text-muted-foreground text-sm">Your cargo bay is currently unoccupied.</p>
            </div>
            <Button asChild className="bg-primary text-background font-headline tracking-widest">
              <Link href="/">RETURN TO CATALOG</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-card/50 border border-white/5 p-6 rounded-3xl flex items-center gap-6 group hover:border-primary/20 transition-all">
                  <div className="relative w-24 h-24 bg-background/50 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      data-ai-hint="sneaker image"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-primary font-bold">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-background/50 p-2 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-headline text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-card p-8 rounded-[2.5rem] h-fit sticky top-32 border border-white/10">
              <h2 className="font-headline text-xl mb-8 tracking-widest">MANIFEST</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest text-[0.7rem]">Unit Count</span>
                  <span className="font-headline">{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest text-[0.7rem]">Logistic Fees</span>
                  <span className="font-headline text-secondary tracking-widest">WAVED</span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-muted-foreground uppercase tracking-widest text-[0.7rem] mb-1">Total Credit</span>
                  <span className="text-3xl font-headline font-black text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <Button asChild className="w-full h-16 bg-primary text-background font-headline tracking-widest hover:bg-glow">
                <Link href="/checkout">
                  INITIALIZE CHECKOUT <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
