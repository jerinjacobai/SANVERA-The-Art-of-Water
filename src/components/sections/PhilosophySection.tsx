import React from 'react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="about" className="relative bg-void py-24 sm:py-32 lg:py-40 text-ink">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Section Index Kicker */}
        <div className="flex items-center gap-4 border-t border-hair pt-6">
          <span className="label-mono text-smoke">04</span>
          <span className="label-mono text-mist">/ Philosophy</span>
        </div>

        {/* Asymmetrical 2-Column Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] text-ink leading-[0.92]">
              Designed<br />around water
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-4 space-y-8">
            <p className="text-base sm:text-lg lg:text-xl text-mist font-light leading-relaxed">
              Sanvera is a contemporary sanitaryware brand focused on the relationship between form, function and the ritual of water.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-smoke font-light leading-relaxed">
              Each piece begins as a drawing of movement — the arc of a stream, the pause before a tap is turned — and is resolved in solid brass, stone and glass.
            </p>
          </div>
        </div>

        {/* Editorial Imagery Plates */}
        <div className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
          <figure className="plate group sm:col-span-7 aspect-[4/3] sm:aspect-[16/11]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="Sanvera architectural studio testing"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-1000 ease-editorial opacity-70 group-hover:opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-6 label-mono text-mist">
              In the studio · Brescia atelier
            </figcaption>
          </figure>

          <figure className="plate group sm:col-span-5 aspect-square sm:mt-12 lg:mt-20">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
              alt="Cold-forged solid brass billet processing"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-editorial opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-6 label-mono text-mist">
              Solid brass · In process
            </figcaption>
          </figure>
        </div>

        {/* Brand Specification Data Points */}
        <dl className="mt-24 sm:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-hair pt-12">
          <div>
            <dt className="label-mono text-smoke">Founded</dt>
            <dd className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-light text-ink">
              2019
            </dd>
          </div>
          <div>
            <dt className="label-mono text-smoke">Custom Components</dt>
            <dd className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-light text-ink">
              340+
            </dd>
          </div>
          <div>
            <dt className="label-mono text-smoke">Artisan Finishes</dt>
            <dd className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-light text-ink">
              11
            </dd>
          </div>
          <div>
            <dt className="label-mono text-smoke">Warranty</dt>
            <dd className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-light text-ink">
              15 Years
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
