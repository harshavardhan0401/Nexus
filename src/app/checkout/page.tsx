
"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
          <div className="relative">
            <CheckCircle2 className="w-24 h-24 text-primary mx-auto mb-8 animate-bounce" />
            <div className="absolute inset-0 bg-primary blur-3xl opacity-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-black">TRANSACTION AUTHORIZED</h1>
          <p className="text-muted-foreground">Your cargo has been prioritized for immediate dispatch. Neural tracking link sent to your device.</p>
          <Button asChild size="lg" className="bg-primary text-background font-headline tracking-widest w-full h-16">
            <Link href="/">RETURN TO DISTRICT</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 px-6 md:px-12 max-w-4xl mx-auto mb-24">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/cart" className="hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase">
            Payment <span className="text-primary text-glow">Portal</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleCheckout} className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-headline text-xs tracking-[0.3em] uppercase text-muted-foreground">Delivery Matrix</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="FIRST NAME" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
                <Input placeholder="LAST NAME" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
              </div>
              <Input placeholder="NEURAL ADDRESS / SHIPPING" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="CITY" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
                <Input placeholder="POSTAL CODE" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-headline text-xs tracking-[0.3em] uppercase text-muted-foreground">Credit Authorization</h3>
              <Input placeholder="CARD NUMBER (XXXX XXXX XXXX XXXX)" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="EXP (MM/YY)" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
                <Input placeholder="CVV" className="bg-card/50 border-white/10 h-12 font-headline text-[0.7rem]" required />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isProcessing} 
              className="w-full h-16 bg-primary text-background font-headline tracking-widest text-lg hover:bg-glow transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> AUTHORIZING...
                </>
              ) : (
                `CONFIRM ₹${totalPrice.toLocaleString()}`
              )}
            </Button>
          </form>

          <div className="bg-card/30 border border-white/5 rounded-[3rem] p-8 h-fit space-y-8">
            <div className="flex items-center gap-4 text-primary">
              <ShieldCheck className="w-10 h-10" />
              <div>
                <p className="font-headline text-xs tracking-widest">SECURE LINK</p>
                <p className="text-[0.6rem] text-muted-foreground uppercase">End-to-end neural encryption active</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-headline text-[0.7rem] tracking-widest text-muted-foreground border-b border-white/5 pb-2">ORDER SUMMARY</h4>
              <div className="flex justify-between items-end">
                <span className="text-muted-foreground text-xs uppercase tracking-widest">Grand Total</span>
                <span className="text-3xl font-headline font-black text-primary">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-[0.6rem] text-muted-foreground leading-relaxed uppercase tracking-widest text-center opacity-50">
              By confirming authorization, you agree to the Neo-Step protocol 3.1 and immediate resource allocation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
