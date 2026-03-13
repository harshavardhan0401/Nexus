
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, FlaskConical, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
        items: ['T-Shirts', 'Hoodies', 'Jackets', 'Tracksuits'],
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
        items: ['T-Shirts', 'Hoodies', 'Jackets', 'Tracksuits'],
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
        items: ['T-Shirts', 'Hoodies', 'Jackets', 'Tracksuits'],
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-background via-background/90 to-transparent backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group shrink-0">
          <div className="font-headline font-black text-2xl tracking-[0.2em] text-primary group-hover:text-glow transition-all">
            NEO-STEP
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 font-headline text-[0.7rem] tracking-widest uppercase h-full">
          {NAVIGATION_CATEGORIES.map((category) => (
            <div key={category.name} className="group h-full flex items-center">
              <Link 
                href={category.href} 
                className="hover:text-primary transition-colors flex items-center gap-1 py-4"
              >
                {category.name}
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </Link>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-20 left-0 w-full bg-card/95 backdrop-blur-xl border-b border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out z-40">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-12 p-12">
                  {category.sections.map((section) => (
                    <div key={section.title} className="space-y-6">
                      <h4 className="text-primary font-black tracking-[0.2em] text-xs border-b border-primary/20 pb-2">
                        {section.title}
                      </h4>
                      <ul className="space-y-3">
                        {section.items.map((item) => (
                          <li key={item}>
                            <Link 
                              href={`/collections/${category.name.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}
                              className="text-muted-foreground hover:text-white hover:translate-x-2 transition-all block"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* Decorative Neon Bar at Bottom of Dropdown */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
              </div>
            </div>
          ))}
          
          <Link href="/lab" className="flex items-center gap-2 hover:text-primary transition-colors group">
            <FlaskConical className="w-4 h-4 group-hover:animate-pulse" />
            <span>The Lab</span>
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href="/cart" className="relative group">
            <ShoppingCart className="w-5 h-5 group-hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-background font-bold rounded-full w-4 h-4 flex items-center justify-center text-[0.6rem] animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] bg-background border-l border-white/5 p-0">
              <SheetHeader className="p-6 border-b border-white/5">
                <SheetTitle className="font-headline text-primary tracking-widest text-left uppercase">
                  Navigation Matrix
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full overflow-y-auto p-6 space-y-8">
                <Accordion type="single" collapsible className="w-full">
                  {NAVIGATION_CATEGORIES.map((category) => (
                    <AccordionItem key={category.name} value={category.name} className="border-white/5">
                      <AccordionTrigger className="font-headline text-sm tracking-widest hover:text-primary py-4 uppercase">
                        {category.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4 pl-4">
                          {category.sections.map((section) => (
                            <div key={section.title} className="space-y-3">
                              <h5 className="text-[0.6rem] font-headline text-primary tracking-widest uppercase opacity-70">
                                {section.title}
                              </h5>
                              <div className="flex flex-col gap-2">
                                {section.items.map((item) => (
                                  <Link 
                                    key={item}
                                    href={`/collections/${category.name.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-white py-1"
                                  >
                                    {item}
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

                <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                  <Link 
                    href="/lab" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 font-headline text-sm tracking-widest hover:text-primary transition-colors"
                  >
                    <FlaskConical className="w-5 h-5 text-primary" />
                    THE LAB
                  </Link>
                  <Link 
                    href="/collections" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 font-headline text-sm tracking-widest hover:text-primary transition-colors"
                  >
                    <Search className="w-5 h-5 text-primary" />
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
