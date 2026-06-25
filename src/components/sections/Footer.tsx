import Link from 'next/link';
import { Mail, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-40 px-6 md:px-12 border-t border-white/5 bg-black/90 backdrop-blur-3xl relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-24">
        <div className="space-y-12 lg:col-span-1">
          <div className="font-headline font-black text-5xl text-primary tracking-tighter uppercase font-audiowide">THE SHOE ROOM</div>
          <p className="text-muted-foreground uppercase text-[0.7rem] tracking-[0.3em] leading-[2.5] opacity-50 font-medium">
            The future of movement is a neural-physical hybrid. Engineered for those who never stop.
          </p>
          <div className="flex gap-8">
            {[Twitter, Instagram, Github].map((Icon, i) => (
              <Link key={i} href="#" className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all group hover:bg-primary/5 shadow-inner">
                <Icon className="w-7 h-7 group-hover:scale-125 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:col-span-2 gap-16">
          <div className="space-y-10">
            <h5 className="font-headline text-[0.8rem] text-primary tracking-[0.6em] uppercase border-b border-primary/20 pb-6 font-black">District Map</h5>
            <ul className="space-y-6 text-[0.7rem] tracking-[0.3em] uppercase font-headline">
              <li><Link href="#home" className="text-muted-foreground hover:text-white transition-colors">Strategic Hub</Link></li>
              <li><Link href="#drops" className="text-muted-foreground hover:text-white transition-colors">Latest Rations</Link></li>
              <li><Link href="#collection" className="text-muted-foreground hover:text-white transition-colors">Propulsion Index</Link></li>
              <li><Link href="/lab" className="text-muted-foreground hover:text-white transition-colors">Neural Lab</Link></li>
            </ul>
          </div>
          <div className="space-y-10">
            <h5 className="font-headline text-[0.8rem] text-primary tracking-[0.6em] uppercase border-b border-primary/20 pb-6 font-black">Protocols</h5>
            <ul className="space-y-6 text-[0.7rem] tracking-[0.3em] uppercase font-headline">
              <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Neural Support</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Logistics Hub</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Encryption Key</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Warranty Link</Link></li>
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <h5 className="font-headline text-[0.8rem] text-primary tracking-[0.6em] uppercase border-b border-primary/20 pb-6 font-black">Neural Pulse</h5>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="ID@THE_SHOE.ROOM" 
              className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl px-8 text-[0.7rem] font-headline tracking-[0.3em] focus:outline-none focus:border-primary transition-all uppercase placeholder:opacity-30"
            />
            <button className="absolute right-3 top-3 h-14 w-14 bg-primary text-background rounded-xl flex items-center justify-center hover:bg-glow transition-all shadow-lg">
              <Mail className="w-6 h-6" />
            </button>
          </div>
          <p className="text-[0.6rem] text-muted-foreground uppercase tracking-[0.4em] leading-loose opacity-40 font-medium">
            By authorizing synchronization, you agree to district-wide data protocols.
          </p>
        </div>
      </div>
      
      <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[0.65rem] text-muted-foreground tracking-[0.5em] uppercase font-headline opacity-40">
        <p>© 2025 THE SHOE ROOM // DESIGNED IN THE NEON DISTRICT</p>
        <div className="flex gap-12">
          <Link href="#" className="hover:text-white">PROTOCOLS</Link>
          <Link href="#" className="hover:text-white">NEURAL_PRIVACY</Link>
          <Link href="#" className="hover:text-white">ACCESS_TERMS</Link>
        </div>
      </div>
    </footer>
  );
}
