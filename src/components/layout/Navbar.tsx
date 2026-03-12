
"use client";

import Link from 'next/link';
import { ShoppingCart, FlaskConical, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-background via-background/80 to-transparent backdrop-blur-sm">
      <Link href="/" className="group">
        <div className="font-headline font-black text-2xl tracking-[0.2em] text-primary group-hover:text-glow transition-all">
          NEO-STEP
        </div>
      </Link>

      <div className="flex items-center gap-8 font-headline text-[0.7rem] tracking-widest uppercase">
        <Link href="/collections" className="hidden md:block hover:text-primary transition-colors">
          Collections
        </Link>
        <Link href="/lab" className="flex items-center gap-2 hover:text-primary transition-colors group">
          <FlaskConical className="w-4 h-4 group-hover:animate-pulse" />
          <span className="hidden md:inline">The Lab</span>
        </Link>
        <Link href="/cart" className="relative group">
          <ShoppingCart className="w-5 h-5 group-hover:text-primary transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-background font-bold rounded-full w-4 h-4 flex items-center justify-center text-[0.6rem] animate-in zoom-in">
              {totalItems}
            </span>
          )}
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
