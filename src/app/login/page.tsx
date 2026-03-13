"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    initiateEmailSignIn(auth, email, password);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-body flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-card/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-primary/20 shadow-2xl space-y-10 relative overflow-hidden">
          {/* Neon Border Glow */}
          <div className="absolute inset-0 border border-primary/30 rounded-[3.5rem] pointer-events-none" />
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 border border-primary/20">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-headline font-black tracking-widest uppercase">
              Access <span className="text-primary text-glow">Portal</span>
            </h1>
            <p className="text-muted-foreground text-xs font-headline tracking-widest uppercase opacity-70">
              Initialize Neural Authentication
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-300" />
                <Input
                  type="email"
                  placeholder="NEURAL ID (EMAIL)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative h-14 bg-white/5 border-white/10 rounded-xl font-headline text-[0.7rem] tracking-widest uppercase px-6 focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-300" />
                <Input
                  type="password"
                  placeholder="SECURITY PASSCODE"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative h-14 bg-white/5 border-white/10 rounded-xl font-headline text-[0.7rem] tracking-widest uppercase px-6 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 bg-primary text-background font-headline text-sm tracking-[0.3em] uppercase hover:bg-glow transition-all active:scale-95"
            >
              Initialize Login <Zap className="ml-2 w-4 h-4 fill-current" />
            </Button>
          </form>

          <div className="pt-8 border-t border-white/5 space-y-4 text-center">
            <Link href="#" className="text-[0.6rem] font-headline tracking-widest text-primary/80 hover:text-primary uppercase block">
              Request New Access Card (Sign Up)
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 text-[0.6rem] font-headline tracking-widest text-muted-foreground hover:text-white uppercase transition-colors">
              <ArrowLeft className="w-3 h-3" /> Return to Strategic Hub
            </Link>
          </div>
        </div>

        {/* Decorative elements under card */}
        <div className="mt-8 flex justify-center gap-8 text-primary/30">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <div className="h-px w-20 bg-primary/10 self-center" />
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: #050505;
        }
      `}</style>
    </div>
  );
}