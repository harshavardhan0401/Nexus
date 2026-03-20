
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Zap, Sparkles, Loader2 } from 'lucide-react';
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

  // Redirect if already logged in and ensure profile exists
  useEffect(() => {
    if (user && !isUserLoading) {
      if (db) {
        const userRef = doc(db, 'users', user.uid);
        // Ensure profile exists on every login (idempotent)
        setDoc(userRef, {
          id: user.uid,
          email: user.email,
          updatedAt: serverTimestamp(),
          // Don't overwrite firstName/lastName if they already exist
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
    
    setLoading(true);
    if (isSignUp) {
      initiateEmailSignUp(auth, email, password);
    } else {
      initiateEmailSignIn(auth, email, password);
    }
    // Note: Success is handled by the useEffect above monitoring auth state
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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-card/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-primary/20 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 border border-primary/20">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-headline font-black tracking-widest uppercase">
              {isSignUp ? 'Registration' : 'Access'} <span className="text-primary text-glow">Portal</span>
            </h1>
            <p className="text-muted-foreground text-xs font-headline tracking-widest uppercase opacity-70">
              {isSignUp ? 'Synthesize New Identity' : 'Initialize Neural Authentication'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="NEURAL ID (EMAIL)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white/5 border-white/10 rounded-xl font-headline text-[0.7rem] tracking-widest px-6 focus:border-primary"
                required
              />
              <Input
                type="password"
                placeholder="SECURITY PASSCODE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-white/5 border-white/10 rounded-xl font-headline text-[0.7rem] tracking-widest px-6 focus:border-primary"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-primary text-background font-headline text-sm tracking-[0.3em] uppercase hover:bg-glow"
            >
              {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'Register Hub' : 'Initialize Login')}
              {!loading && <Zap className="ml-2 w-4 h-4 fill-current" />}
            </Button>
          </form>

          <div className="pt-8 border-t border-white/5 space-y-4 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[0.6rem] font-headline tracking-widest text-primary/80 hover:text-primary uppercase block w-full"
            >
              {isSignUp ? 'Existing Identity? Sign In' : 'Request New Access Card (Sign Up)'}
            </button>
            <Link href="/" className="inline-flex items-center gap-2 text-[0.6rem] font-headline tracking-widest text-muted-foreground hover:text-white uppercase transition-colors">
              <ArrowLeft className="w-3 h-3" /> Return to Strategic Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
