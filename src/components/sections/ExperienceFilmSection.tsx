import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Marquee } from '../ui/Marquee';

export const ExperienceFilmSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="film" className="relative bg-char py-24 sm:py-32 lg:py-40 text-ink border-t border-hair overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hair pb-6">
          <span className="label-mono text-smoke">09</span>
          <span className="label-mono text-mist">/ The Sanctuary Film</span>
        </div>

        {/* Large Cinematic Player Plate */}
        <div className="mt-16 sm:mt-20 relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden border border-hair group select-none">
          {/* Background Ambient Imagery & Gradients */}
          <img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=80"
            alt="The Sanvera Experience"
            className={`w-full h-full object-cover transition-all duration-1000 ease-editorial ${
              isPlaying ? 'scale-105 filter-none brightness-95' : 'grayscale contrast-125 brightness-60'
            }`}
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-void/40 to-void/90 pointer-events-none" />

          {/* Interactive Play Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <button
              onClick={togglePlay}
              className="group/btn flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-ink/40 bg-void/50 backdrop-blur-md text-ink hover:scale-110 hover:border-ink transition-all duration-500 mb-8"
              aria-label={isPlaying ? 'Pause Film' : 'Play Film'}
            >
              {isPlaying ? (
                <Pause size={28} className="text-ink" />
              ) : (
                <Play size={28} className="text-ink ml-1 fill-ink" />
              )}
            </button>

            <div className="max-w-xl">
              <span className="label-mono text-brass block mb-2">Cinematic Monograph · 03:42</span>
              <h2 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-ink">
                The Sanvera experience
              </h2>
              <p className="mt-4 text-sm sm:text-base text-mist font-light leading-relaxed">
                A closer study of the acoustic silence, laminar water trajectory, and metallurgical craftsmanship behind every form.
              </p>
            </div>
          </div>

          {/* Player Progress Bar when playing */}
          {isPlaying && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-void/80">
              <div className="h-full bg-brass animate-pulse w-2/3 transition-all" />
            </div>
          )}
        </div>
      </div>

      {/* Editorial Marquee Band */}
      <div className="mt-20 sm:mt-28">
        <Marquee text="FORM · MATERIAL · WATER · ARCHITECTURE · RITUAL · PRECISION · SILENCE ·" />
      </div>
    </section>
  );
};
