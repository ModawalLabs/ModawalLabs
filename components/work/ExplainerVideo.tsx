"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, Volume2 } from "lucide-react";
import type { WorkVideo } from "@/lib/work";

/**
 * Click-to-play facade: shows the poster and a play button, and only loads the video
 * once the visitor asks for it.
 */
export default function ExplainerVideo({ video }: { video: WorkVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-night shadow-lift ring-1 ring-black/10">
      {playing ? (
        <video
          className="absolute inset-0 size-full"
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={video.title}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer"
          aria-label={`Play video: ${video.title}`}
        >
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex size-18 items-center justify-center rounded-full bg-white/95 text-ink shadow-lift transition-transform duration-300 group-hover:scale-105">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </span>
          <span
            className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
            aria-hidden="true"
          >
            {video.hasAudio && <Volume2 className="size-3.5" />}
            0:30 explainer
          </span>
        </button>
      )}
    </div>
  );
}
