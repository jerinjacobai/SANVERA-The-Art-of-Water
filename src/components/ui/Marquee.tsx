import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <div
      className="w-full overflow-hidden border-y border-hair py-6 select-none pointer-events-none flex"
      aria-hidden="true"
    >
      <div className="flex shrink-0 items-center gap-12 whitespace-nowrap animate-drift-slow font-display text-4xl sm:text-6xl lg:text-8xl font-light uppercase text-ink/[0.07] tracking-tight pr-12">
        <span>{text}</span>
        <span>{text}</span>
      </div>
      <div className="flex shrink-0 items-center gap-12 whitespace-nowrap animate-drift-slow font-display text-4xl sm:text-6xl lg:text-8xl font-light uppercase text-ink/[0.07] tracking-tight pr-12">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};
