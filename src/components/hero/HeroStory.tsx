import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroStoryProps {
  currentStage: number;
}

export const HeroStory: React.FC<HeroStoryProps> = ({ currentStage }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div className="relative mx-auto h-full w-full max-w-[1800px] px-6 sm:px-12 lg:px-20">
        {/* =========================================================================
            STAGE 01: THE ART OF WATER (Left Aligned)
            ========================================================================= */}
        <article
          className={`absolute inset-y-0 left-6 sm:left-12 lg:left-32 xl:left-40 max-w-[28rem] flex flex-col justify-center transition-all duration-1000 ease-editorial ${
            currentStage === 0
              ? 'opacity-100 translate-y-0 filter-none pointer-events-auto'
              : 'opacity-0 translate-y-6 blur-md pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="label-mono text-brass">01</span>
            <span className="label-mono text-mist">/ Philosophy</span>
          </div>
          <h1 className="editorial-title text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] text-ink mt-6">
            The art<br />of water
          </h1>
          <p className="mt-6 text-base sm:text-lg text-mist font-light leading-relaxed">
            Where precision engineering meets the quiet luxury of everyday ritual. A quieter kind of sanitaryware.
          </p>
          <a
            href="#about"
            className="group inline-flex items-center gap-4 mt-8 pt-2 border-b border-hair hover:border-ink text-[11px] uppercase tracking-widest2 text-ink transition-colors duration-500 w-fit"
          >
            <span>Enter Sanvera</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
          </a>
        </article>

        {/* =========================================================================
            STAGE 02: FORM IN MOTION (Right Aligned)
            ========================================================================= */}
        <article
          className={`absolute inset-y-0 right-6 sm:right-12 lg:right-32 xl:right-40 max-w-[28rem] flex flex-col justify-center transition-all duration-1000 ease-editorial ${
            currentStage === 1
              ? 'opacity-100 translate-y-0 filter-none pointer-events-auto'
              : 'opacity-0 translate-y-6 blur-md pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="label-mono text-brass">02</span>
            <span className="label-mono text-mist">/ Geometry</span>
          </div>
          <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] text-ink mt-6">
            Form in<br />motion
          </h2>
          <p className="mt-6 text-base sm:text-lg text-mist font-light leading-relaxed">
            Every curve begins as a drawing of movement — the arc of a stream, the pause before a tap is turned.
          </p>
          <a
            href="#evolution"
            className="group inline-flex items-center gap-4 mt-8 pt-2 border-b border-hair hover:border-ink text-[11px] uppercase tracking-widest2 text-ink transition-colors duration-500 w-fit"
          >
            <span>Discover the craft</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
          </a>
        </article>

        {/* =========================================================================
            STAGE 03: MATERIAL WITH PURPOSE (Left Macro Aligned)
            ========================================================================= */}
        <article
          className={`absolute inset-y-0 left-6 sm:left-12 lg:left-32 xl:left-40 max-w-[28rem] flex flex-col justify-center transition-all duration-1000 ease-editorial ${
            currentStage === 2
              ? 'opacity-100 translate-y-0 filter-none pointer-events-auto'
              : 'opacity-0 translate-y-6 blur-md pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="label-mono text-brass">03</span>
            <span className="label-mono text-mist">/ Metallurgy</span>
          </div>
          <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] text-ink mt-6">
            Material<br />with purpose
          </h2>
          <p className="mt-6 text-base sm:text-lg text-mist font-light leading-relaxed">
            Solid cold-forged brass, honed alpine mineral stone, and optically pure smoked glass. Resolved without compromise.
          </p>
          <a
            href="#materials"
            className="group inline-flex items-center gap-4 mt-8 pt-2 border-b border-hair hover:border-ink text-[11px] uppercase tracking-widest2 text-ink transition-colors duration-500 w-fit"
          >
            <span>Explore materiality</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
          </a>
        </article>

        {/* =========================================================================
            STAGE 04: DESIGNED AROUND WATER (Centered Architectural)
            ========================================================================= */}
        <article
          className={`absolute inset-y-0 left-6 right-6 flex flex-col justify-center items-center text-center max-w-[42rem] mx-auto transition-all duration-1000 ease-editorial ${
            currentStage === 3
              ? 'opacity-100 translate-y-0 filter-none pointer-events-auto'
              : 'opacity-0 translate-y-6 blur-md pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="label-mono text-brass">04</span>
            <span className="label-mono text-mist">/ Ritual</span>
          </div>
          <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] text-ink mt-6">
            Designed<br />around water
          </h2>
          <p className="mt-6 text-base sm:text-lg text-mist font-light leading-relaxed max-w-[34rem]">
            The faucet is not a fixture. It is the architectural punctuation of the room — the intimate point where form meets the hand.
          </p>
          <a
            href="#collection"
            className="group inline-flex items-center gap-4 mt-8 pt-2 border-b border-hair hover:border-ink text-[11px] uppercase tracking-widest2 text-ink transition-colors duration-500"
          >
            <span>Explore the collection</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
          </a>
        </article>
      </div>
    </div>
  );
};
