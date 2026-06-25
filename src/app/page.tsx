import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import DropsSection from '@/components/sections/DropsSection';
import CollectionSection from '@/components/sections/CollectionSection';
import SneakerStories from '@/components/sections/SneakerStories';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/sections/Footer';

function SectionSkeleton() {
  return (
    <div className="py-40 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#020202]">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<SectionSkeleton />}>
        <DropsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CollectionSection />
      </Suspense>

      <SneakerStories />
      <CtaSection />
      <Footer />
    </main>
  );
}
