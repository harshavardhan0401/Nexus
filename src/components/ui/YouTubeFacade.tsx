'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&mute=1&loop=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  }

  return (
    <button
      onClick={handleLoad}
      className="w-full h-full relative cursor-pointer bg-transparent border-none p-0"
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover grayscale opacity-40"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
      />
    </button>
  );
}
