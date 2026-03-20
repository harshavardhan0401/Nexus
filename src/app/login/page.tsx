"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Zap, Lock, Mail, Loader2 } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      if (db) {
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, {
          id: user.uid,
          email: user.email,
          updatedAt: serverTimestamp(),
        }, { merge: true }).then(() => {
          router.push('/');
        });
      } else {
        router.push('/');
      }
    }
  }, [user, isUserLoading, router, db]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Protorype Hardcoded Credentials Logic (Simulated with real Firebase sign-in/up)
    setLoading(true);
    if (isSignUp) {
      initiateEmailSignUp(auth, email, password);
    } else {
      initiateEmailSignIn(auth, email, password);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-body flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-card/40 backdrop-blur-3xl p-10 md:p-14 rounded-[4rem] border border-primary/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] space-y-12 relative overflow-hidden">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[2rem] mb-6 border border-primary/20 group hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-10 h-10 text-primary group-hover:text-glow" />
            </div>
            <h1 className="text-4xl font-headline font-black tracking-[0.2em] uppercase font-audiowide">
              {isSignUp ? 'Registration' : 'Access'} <span className="text-primary text-glow">Portal</span>
            </h1>
            <p className="text-muted-foreground text-[0.65rem] font-headline tracking-[0.3em] uppercase opacity-60">
              {isSignUp ? 'SYNTHeSIZE NEW IDENTITY' : 'INITIALIZE NEURAL AUTHENTICATION'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="NEURAL ID (EMAIL)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-16 bg-white/5 border-white/10 rounded-2xl font-headline text-[0.7rem] tracking-widest pl-14 pr-6 focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="SECURITY PASSCODE"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-16 bg-white/5 border-white/10 rounded-2xl font-headline text-[0.7rem] tracking-widest pl-14 pr-6 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-20 bg-primary text-background font-headline text-lg tracking-[0.4em] uppercase hover:bg-glow rounded-2xl shadow-[0_0_30px_rgba(0,242,255,0.2)]"
            >
              {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'REQuEST ACCESS' : 'INITIALIZE')}
              {!loading && <Zap className="ml-3 w-5 h-5 fill-current" />}
            </Button>
          </form>

          <div className="pt-10 border-t border-white/5 space-y-6 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[0.65rem] font-headline tracking-[0.3em] text-primary/80 hover:text-primary uppercase block w-full transition-colors"
            >
              {isSignUp ? 'Existing Identity? Sign In' : 'Request New Access Card (Sign Up)'}
            </button>
            <Link href="/" className="inline-flex items-center gap-3 text-[0.6rem] font-headline tracking-[0.4em] text-muted-foreground hover:text-white uppercase transition-all">
              <ArrowLeft className="w-3 h-3" /> RETURN TO DISTRICT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
