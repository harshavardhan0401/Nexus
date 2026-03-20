
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, FlaskConical, Search, Menu, X, ChevronDown, User, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useUser } from '@/firebase';

const NAVIGATION_CATEGORIES = [
  {
    name: 'Men',
    href: '/collections/men',
    sections: [
      { title: 'Footwear', items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'] },
      { title: 'Clothing', items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'] },
      { title: 'Accessories', items: ['Caps', 'Socks', 'Bags'] },
    ],
  },
  {
    name: 'Women',
    href: '/collections/women',
    sections: [
      { title: 'Footwear', items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'] },
      { title: 'Clothing', items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'] },
      { title: 'Accessories', items: ['Caps', 'Socks', 'Bags'] },
    ],
  },
  {
    name: 'Kids',
    href: '/collections/kids',
    sections: [
      { title: 'Footwear', items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'] },
      { title: 'Clothing', items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'] },
      { title: 'Accessories', items: ['Caps', 'Socks', 'Bags'] },
    ],
  },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.email === 'admin@gmail.com';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="group shrink-0">
            <div className="font-headline font-black text-2xl tracking-tighter text-primary group-hover:text-glow transition-all">
              SNEAKERVERSE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-headline text-[0.7rem] tracking-[0.2em] uppercase h-full">
            {NAVIGATION_CATEGORIES.map((category) => (
              <div key={category.name} className="group h-full flex items-center">
                <Link href={category.href} className="hover:text-primary transition-colors flex items-center gap-1 py-4 h-full relative">
                  {category.name}
                  <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Main Links */}
          <div className="hidden lg:flex items-center gap-8 font-headline text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
            <div className="w-px h-4 bg-white/10 mx-2" />
            <Link href="#home" className="hover:text-white transition-colors">Home</Link>
            <Link href="#drops" className="hover:text-white transition-colors">Drops</Link>
            <Link href="#collection" className="hover:text-white transition-colors">Collection</Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative group flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-primary/50 transition-all">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="font-headline text-xs tracking-widest">({totalItems})</span>
            </Link>

            <Link href={user ? "/profile" : "/login"} className="p-2 rounded-full hover:bg-white/5 transition-all">
              {isAdmin ? <Shield className="w-5 h-5 text-secondary" /> : <User className="w-5 h-5" />}
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-l border-white/5">
                <SheetHeader>
                  <SheetTitle className="font-headline text-primary tracking-widest text-left">MENU</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-12">
                  {['MEN', 'WOMEN', 'KIDS', 'HOME', 'DROPS', 'COLLECTION'].map(link => (
                    <Link key={link} href="#" onClick={() => setIsMobileMenuOpen(false)} className="font-headline text-xl tracking-widest hover:text-primary transition-colors">
                      {link}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
