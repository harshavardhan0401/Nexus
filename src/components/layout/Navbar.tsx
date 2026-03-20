
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, User, Menu, ChevronDown, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUser } from '@/firebase';

const NAVIGATION_CATEGORIES = [
  {
    name: 'Men',
    href: '#collection',
    sections: [
      { title: 'Footwear', items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'] },
      { title: 'Clothing', items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'] },
      { title: 'Accessories', items: ['Caps', 'Socks', 'Bags'] },
    ],
  },
  {
    name: 'Women',
    href: '#collection',
    sections: [
      { title: 'Footwear', items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'] },
      { title: 'Clothing', items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'] },
      { title: 'Accessories', items: ['Caps', 'Socks', 'Bags'] },
    ],
  },
  {
    name: 'Kids',
    href: '#collection',
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex justify-between items-center">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="group shrink-0">
            <div className="font-headline font-black text-3xl tracking-tighter text-primary group-hover:text-glow transition-all font-audiowide">
              SNEAKERVERSE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10 font-headline text-[0.75rem] tracking-[0.3em] uppercase h-full">
            {NAVIGATION_CATEGORIES.map((category) => (
              <div key={category.name} className="group relative h-full flex items-center">
                <Link href={category.href} className="hover:text-primary transition-colors flex items-center gap-2 py-8 h-full">
                  {category.name}
                  <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />
                </Link>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-0 w-[600px] bg-card/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 grid grid-cols-3 gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {category.sections.map((section) => (
                    <div key={section.title} className="space-y-4">
                      <h4 className="text-primary text-[0.65rem] font-bold tracking-[0.4em]">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item}>
                            <Link href="#collection" className="text-muted-foreground hover:text-white transition-colors text-[0.7rem] lowercase tracking-widest">{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Action Icons */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full hover:border-primary/50 transition-all shadow-inner">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="font-headline text-[0.75rem] tracking-widest text-primary">({totalItems})</span>
            </Link>

            <Link href={user ? "/profile" : "/login"} className="p-2.5 rounded-full hover:bg-white/5 transition-all text-white/80 hover:text-white">
              {isAdmin ? <Shield className="w-5 h-5 text-secondary" /> : <User className="w-5 h-5" />}
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/5">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-l border-white/5 p-12">
                <SheetHeader className="mb-12">
                  <SheetTitle className="font-headline text-primary tracking-[0.5em] text-left text-xl">MANIFEST</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8">
                  {['MEN', 'WOMEN', 'KIDS', 'HOME', 'DROPS', 'COLLECTION'].map(link => (
                    <Link 
                      key={link} 
                      href={link === 'HOME' ? '/' : link === 'DROPS' ? '#drops' : '#collection'} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="font-headline text-2xl tracking-[0.3em] hover:text-primary transition-colors uppercase"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Visual Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </nav>
  );
};

export default Navbar;
