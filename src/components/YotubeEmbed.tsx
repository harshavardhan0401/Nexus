'use client';

/**
 * YoutubeEmbed.tsx
 * 
 * Lazy-loads YouTube iframes only when user clicks play.
 * Replace all <iframe src="youtube.com/embed/..."> with this.
 * 
 * WHY: A raw YouTube iframe loads ~400KB of scripts on page load
 * and blocks the main thread. This facade shows a thumbnail + play
 * button and only loads the actual iframe when clicked.
 * 
 * USAGE:
 *   <YoutubeEmbed videoId="dQw4w9WgXcQ" title="Sneaker Story - Air Max" />
 */

import { useState } from 'react';
import Image from 'next/image';

interface YoutubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function YoutubeEmbed({ videoId, title, className = '' }: YoutubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  if (isLoaded) {
    return (
      <div className={`relative aspect-video ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsLoaded(true)}
      className={`relative aspect-video group w-full cursor-pointer ${className}`}
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Cyberpunk scanline overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-lg group-hover:bg-black/10 transition-colors duration-300" />

      {/* Play button — styled to match cyberpunk theme */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="
            w-16 h-16 rounded-full flex items-center justify-center
            border-2 border-[#00F2FF] bg-black/60
            group-hover:bg-[#00F2FF]/20 group-hover:scale-110
            transition-all duration-300
            shadow-[0_0_20px_rgba(0,242,255,0.5)]
            group-hover:shadow-[0_0_40px_rgba(0,242,255,0.8)]
          "
        >
          {/* Play triangle */}
          <svg
            className="w-6 h-6 text-[#00F2FF] ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
        <p className="text-[#00F2FF] text-sm font-medium font-mono truncate">
          {title}
        </p>
      </div>
    </button>
  );
}
