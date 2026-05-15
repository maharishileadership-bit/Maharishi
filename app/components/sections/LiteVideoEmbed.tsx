"use client";

import { useState } from "react";

type LiteVideoEmbedProps = {
  src: string;
  posterSrc: string;
  title: string;
};

export function LiteVideoEmbed({ src, posterSrc, title }: LiteVideoEmbedProps) {
  const [isRequested, setIsRequested] = useState(false);
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-primary">
      {isRequested ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          controls
          autoPlay
          preload="auto"
          playsInline
          poster={posterSrc}
          aria-label={title}
          onCanPlay={() => setIsReady(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}

      {!isReady ? (
        <button
          type="button"
          className="group absolute inset-0 block w-full bg-cover bg-center"
          onClick={() => setIsRequested(true)}
          disabled={isRequested}
          aria-label={isRequested ? `Loading ${title}` : `Play ${title}`}
          style={{ backgroundImage: `url(${posterSrc})` }}
        >
          <span className="absolute inset-0 scale-100 bg-[inherit] bg-cover bg-center transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute inset-0 bg-primary/18" aria-hidden />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-primary shadow-[0_18px_55px_-20px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-105"
            aria-hidden
          >
            <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-current" />
          </span>
        </button>
      ) : null}
    </div>
  );
}
