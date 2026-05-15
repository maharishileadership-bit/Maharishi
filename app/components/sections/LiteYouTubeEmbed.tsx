"use client";

import { useState } from "react";

type LiteYouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function LiteYouTubeEmbed({ videoId, title }: LiteYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-primary">
      {isLoaded ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="group absolute inset-0 block w-full bg-cover bg-center"
          onClick={() => setIsLoaded(true)}
          aria-label={`Play ${title}`}
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <span className="absolute inset-0 scale-100 bg-[inherit] bg-cover bg-center opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100" />
          <span className="absolute inset-0 bg-primary/28" aria-hidden />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-primary shadow-[0_18px_55px_-20px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-105"
            aria-hidden
          >
            <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-current" />
          </span>
        </button>
      )}
    </div>
  );
}
