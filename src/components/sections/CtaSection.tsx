import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CtaSection() {
  return (
    <section className="py-52 px-6 relative overflow-hidden bg-[#020202] border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[250px] rounded-full pointer-events-none opacity-30" />
      <div className="max-w-[1400px] mx-auto text-center space-y-16 relative z-10">
        <Badge variant="outline" className="border-primary text-primary font-headline py-2 px-6 tracking-[0.5em] mb-8 uppercase text-xs">RESTRICTED_ACCESS</Badge>
        <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] font-audiowide uppercase">EXPLORE <span className="text-primary text-glow">BEYOND</span></h2>
        <p className="text-muted-foreground text-xl md:text-3xl max-w-4xl mx-auto uppercase tracking-[0.4em] leading-relaxed opacity-60 font-medium">
          Initialize your neural ID to unlock <br />elite drops and priority synthesis.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center h-28 px-24 bg-primary text-background font-headline text-3xl tracking-[0.5em] hover:bg-glow group shadow-[0_0_80px_rgba(0,242,255,0.4)] rounded-[2.5rem] mt-12"
        >
          NEURAL LOGIN <ArrowRight className="ml-6 w-10 h-10 group-hover:translate-x-4 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
