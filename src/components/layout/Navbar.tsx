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
      {
        title: 'Footwear',
        items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'],
      },
      {
        title: 'Clothing',
        items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'],
      },
      {
        title: 'Accessories',
        items: ['Caps', 'Socks', 'Bags'],
      },
    ],
  },
  {
    name: 'Women',
    href: '/collections/women',
    sections: [
      {
        title: 'Footwear',
        items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'],
      },
      {
        title: 'Clothing',
        items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'],
      },
      {
        title: 'Accessories',
        items: ['Caps', 'Socks', 'Bags'],
      },
    ],
  },
  {
    name: 'Kids',
    href: '/collections/kids',
    sections: [
      {
        title: 'Footwear',
        items: ['Sneakers', 'Running Shoes', 'Boots', 'Sandals'],
      },
      {
        title: 'Clothing',
        items: ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits'],
      },
      {
        title: 'Accessories',
        items: ['Caps', 'Socks', 'Bags'],
      },
    ],
  },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.email === 'admin@gmail.com';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-background via-background/95 to-transparent backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group shrink-0">
          <div className="font-headline font-black text-3xl tracking-[0.3em] text-primary group-hover:text-glow transition-all font-audiowide">
            NEO-STEP
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12 font-headline text-[0.7rem] tracking-[0.3em] uppercase h-full">
          {NAVIGATION_CATEGORIES.map((category) => (
            <div key={category.name} className="group h-full flex items-center">
              <Link 
                href={category.href} 
                className="hover:text-primary transition-colors flex items-center gap-2 py-4 h-full relative group"
              >
                {category.name}
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-24 left-0 w-full bg-card/98 backdrop-blur-3xl border-b border-primary/30 shadow-[0_40px_80px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out z-40 p-12">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
                  <div className="col-span-1 border-r border-white/5 pr-12">
                    <h3 className="text-3xl font-black text-white mb-6 font-audiowide">NEO_{category.name.toUpperCase()}</h3>
                    <p className="text-muted-foreground text-[0.6rem] leading-loose tracking-widest uppercase mb-8">
                      Synthesized gear for the next evolution of movement in District {category.name === 'Kids' ? 'Z' : 'Alpha'}.
                    </p>
                    <Button variant="outline" className="border-primary text-primary font-headline text-[0.6rem] tracking-widest h-12 px-6 rounded-xl hover:bg-primary hover:text-background">
                      VIEW ALL ASSETS
                    </Button>
                  </div>
                  <div className="col-span-3 grid grid-cols-3 gap-12">
                    {category.sections.map((section) => (
                      <div key={section.title} className="space-y-6">
                        <h4 className="text-primary font-black tracking-[0.4em] text-[0.7rem] border-b border-primary/20 pb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                          {section.title.toUpperCase()}
                        </h4>
                        <ul className="space-y-4">
                          {section.items.map((item) => (
                            <li key={item}>
                              <Link 
                                href={`/collections/${category.name.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-muted-foreground hover:text-white hover:translate-x-3 transition-all block text-[0.65rem] tracking-[0.2em]"
                              >
                                {item.toUpperCase()}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative Neon Bar */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(0,242,255,0.5)]"></div>
              </div>
            </div>
          ))}
          
          <Link href="/lab" className="flex items-center gap-3 hover:text-primary transition-colors group">
            <FlaskConical className="w-4 h-4 group-hover:animate-pulse text-primary" />
            <span>The Lab</span>
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors hidden sm:flex">
            <Search className="w-6 h-6" />
          </Button>
          
          <Link href="/cart" className="relative group p-2">
            <ShoppingCart className="w-6 h-6 group-hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-background font-bold rounded-full w-5 h-5 flex items-center justify-center text-[0.7rem] animate-in zoom-in font-headline shadow-[0_0_15px_rgba(0,242,255,0.6)]">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href={user ? "/profile" : "/login"} className="relative group p-2 flex items-center gap-3">
             <div className={`p-2 rounded-xl border transition-all ${isAdmin ? 'border-secondary/40 bg-secondary/10' : 'border-white/10 group-hover:border-primary/40'}`}>
                {isAdmin ? <Shield className="w-5 h-5 text-secondary" /> : <User className="w-5 h-5 group-hover:text-primary transition-colors" />}
             </div>
             {user && (
               <span className="hidden md:block font-headline text-[0.6rem] tracking-widest text-muted-foreground group-hover:text-white transition-colors">
                 {isAdmin ? 'ADMIN_HUB' : 'ID_LINKED'}
               </span>
             )}
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary">
                <Menu className="w-7 h-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] bg-background border-l border-white/5 p-0">
              <SheetHeader className="p-8 border-b border-white/5">
                <SheetTitle className="font-headline text-primary tracking-[0.4em] text-left uppercase font-audiowide">
                  NAVIGATION_MATRIX
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full overflow-y-auto p-8 space-y-10">
                <Accordion type="single" collapsible className="w-full">
                  {NAVIGATION_CATEGORIES.map((category) => (
                    <AccordionItem key={category.name} value={category.name} className="border-white/5">
                      <AccordionTrigger className="font-headline text-sm tracking-[0.3em] hover:text-primary py-5 uppercase">
                        {category.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-8 pt-6 pl-6 border-l border-primary/20 ml-2">
                          {category.sections.map((section) => (
                            <div key={section.title} className="space-y-4">
                              <h5 className="text-[0.6rem] font-headline text-primary tracking-[0.3em] uppercase opacity-70">
                                {section.title}
                              </h5>
                              <div className="flex flex-col gap-3">
                                {section.items.map((item) => (
                                  <Link 
                                    key={item}
                                    href={`/collections/${category.name.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-white py-1 tracking-widest"
                                  >
                                    {item.toUpperCase()}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex flex-col gap-8 pt-10 border-t border-white/5">
                  <Link 
                    href="/lab" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-5 font-headline text-sm tracking-[0.4em] hover:text-primary transition-colors"
                  >
                    <FlaskConical className="w-6 h-6 text-primary" />
                    THE LAB
                  </Link>
                  <Link 
                    href="/collections" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-5 font-headline text-sm tracking-[0.4em] hover:text-primary transition-colors"
                  >
                    <Search className="w-6 h-6 text-primary" />
                    SEARCH DISTRICT
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
