import { Play } from 'lucide-react';
import YouTubeFacade from '@/components/ui/YouTubeFacade';

const VIDEOS = [
  { id: '1', title: 'District Propulsion V1', videoId: 'dQw4w9WgXcQ' },
  { id: '2', title: 'Carbon Nanoweave Field Test', videoId: 'dQw4w9WgXcQ' },
];

export default function SneakerStories() {
  return (
    <section className="py-40 px-6 md:px-12 bg-card/5 relative">
      <div className="max-w-[1400px] mx-auto space-y-24">
        <div className="text-center space-y-6">
          <p className="text-primary tracking-[0.8em] font-headline text-[0.75rem] uppercase">NEURAL_BROADCAST // VOD</p>
          <h2 className="text-6xl md:text-[8rem] font-black font-audiowide leading-none">SNEAKER STORIES</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {VIDEOS.map((video) => (
            <div key={video.id} className="relative group rounded-[4rem] overflow-hidden aspect-video border border-white/10 bg-black/60 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 pointer-events-none">
                <Play className="w-24 h-24 text-primary fill-current animate-pulse" />
              </div>
              <YouTubeFacade videoId={video.videoId} title={video.title} />
              <div className="absolute bottom-12 left-12 z-20 pointer-events-none">
                <h4 className="font-headline text-3xl text-white font-black tracking-[0.2em] uppercase font-audiowide mb-2">{video.title}</h4>
                <p className="text-primary font-headline text-[0.7rem] tracking-[0.4em] opacity-80 uppercase">LIVE FEED ACTIVE // SECURED</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
