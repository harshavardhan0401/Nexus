
"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { aiProductRecommendation, type AIProductRecommendationOutput } from '@/ai/flows/ai-product-recommendation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Sparkles, Loader2, FlaskConical, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LabPage() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AIProductRecommendationOutput>([]);
  const { addToCart } = useCart();

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const output = await aiProductRecommendation({ description });
      setResults(output);
    } catch (error) {
      console.error('Recommendation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Navbar />

      <section className="pt-40 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="border-primary text-primary font-headline py-1 px-4 tracking-[0.2em]">
            NEURAL-GEN ADVISOR v2.0
          </Badge>
          <h1 className="text-5xl md:text-8xl font-headline font-black leading-tight uppercase">
            The <span className="text-primary text-glow">Lab</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe your mission, style, or specific requirements. Our AI will synthesize the perfect match from our elite catalog.
          </p>
        </div>

        <form onSubmit={handleRecommend} className="relative group max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative flex gap-2">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Stealth running shoes with carbon fiber for night missions..."
              className="h-16 bg-card border-none rounded-2xl text-lg px-6 focus-visible:ring-primary/50"
            />
            <Button 
              disabled={loading} 
              type="submit" 
              size="lg" 
              className="h-16 w-16 rounded-2xl bg-primary text-background hover:bg-glow"
            >
              {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </Button>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar py-2">
            {['Stealth', 'Marathon', 'Cyberpunk', 'Glow', 'Performance'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setDescription(prev => prev + (prev ? ' ' : '') + tag)}
                className="text-[0.6rem] font-headline tracking-widest text-muted-foreground hover:text-primary border border-white/5 hover:border-primary/50 px-3 py-1 rounded-full transition-all whitespace-nowrap"
              >
                +{tag}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-24">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <div className="relative">
                <FlaskConical className="w-16 h-16 text-primary animate-bounce" />
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 animate-pulse"></div>
              </div>
              <p className="font-headline tracking-[0.3em] text-primary animate-pulse text-xs">SYNTHESIZING SELECTIONS...</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              {results.map((shoe, idx) => (
                <div 
                  key={idx} 
                  className="bg-card/50 border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/30 transition-all group"
                >
                  <div className="relative aspect-square mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={shoe.imageUrl}
                      alt={shoe.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      data-ai-hint="futuristic shoe"
                    />
                  </div>
                  <h3 className="font-headline text-2xl mb-2 group-hover:text-primary transition-colors">{shoe.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{shoe.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-primary">₹{shoe.price.toLocaleString()}</span>
                    <Button 
                      // ✅ AFTER — remove quantity: 1
                      onClick={() => addToCart({ id: `${shoe.name}-${idx}`, name: shoe.name, price: shoe.price, imageUrl: shoe.imageUrl })}                      variant="ghost" 
                      className="text-primary hover:bg-primary/10 hover:text-primary p-0 h-auto font-headline text-xs tracking-widest"
                    >
                      ACQUIRE <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && !description && (
            <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem]">
              <FlaskConical className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-headline tracking-[0.2em] uppercase text-xs">Awaiting input parameters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
