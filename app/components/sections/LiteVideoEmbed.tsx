"use client";

import { useState } from "react";

type LiteVideoEmbedProps = {
  src: string;
  posterSrc: string;
  title: string;
  teaser?: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
};

export function LiteVideoEmbed({
  src,
  posterSrc,
  title,
  teaser,
}: LiteVideoEmbedProps) {
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
          <span
            className="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/28 to-primary/8"
            aria-hidden
          />
          {teaser ? (
            <span className="absolute inset-x-0 bottom-0 z-10 block p-5 text-left text-primary-foreground sm:p-7">
              {teaser.eyebrow ? (
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--peach))]">
                  {teaser.eyebrow}
                </span>
              ) : null}
              <span className="block font-serif text-2xl leading-tight sm:text-3xl">
                {teaser.title}
              </span>
              {teaser.description ? (
                <span className="mt-2 block max-w-xl text-sm leading-[1.55] text-primary-foreground/72 sm:text-base">
                  {teaser.description}
                </span>
              ) : null}
            </span>
          ) : null}
          <span
            className="absolute right-5 top-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/94 text-primary shadow-[0_18px_55px_-20px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
            aria-hidden
          >
            <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-current" />
          </span>
        </button>
      ) : null}
    </div>
  );
}
