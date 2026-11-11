import React from 'react';

const SPATIAL_PROJECTS = [
  {
    id: 'golden-spa-sanctuary',
    title: 'Golden Marble Spa Sanctuary',
    location: 'Lake Como, Italy',
    materials: 'Calacatta gold marble, composite stone bath, brushed brass shower suite',
    image: '/images/golden-spa-sanctuary.jpg',
    aspect: 'aspect-[16/10]',
    span: 'lg:col-span-8',
    isInteractive: true,
  },
  {
    id: 'hotel-kyoto',
    title: 'Aman Pavilion Spa',
    location: 'Kyoto, Japan',
    materials: 'Charred cedar, dark bronze concealed shower',
    image: '/images/renderings/2-1.jpg',
    aspect: 'aspect-[4/5]',
    span: 'lg:col-span-4',
    isInteractive: false,
  },
  {
    id: 'villa-capri',
    title: 'Cliffside Monolith',
    location: 'Capri, Italy',
    materials: 'Honed travertine, polished chrome vessel mixer',
    image: '/images/renderings/3-1.jpg',
    aspect: 'aspect-square',
    span: 'lg:col-span-5',
    isInteractive: false,
  },
  {
    id: 'residence-copenhagen',
    title: 'Nordic Harbor Atelier',
    location: 'Copenhagen, Denmark',
    materials: 'Poured terrazzo, brushed brass freestanding spout',
    image: '/images/renderings/4.jpg',
    aspect: 'aspect-[16/10]',
    span: 'lg:col-span-7',
    isInteractive: false,
  },
];

export const ArchitecturalGallery: React.FC = () => {
  return (
    <section id="architecture" className="relative bg-void py-24 sm:py-32 lg:py-40 text-ink">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-4 border-t border-hair pt-6">
          <span className="label-mono text-smoke">08</span>
          <span className="label-mono text-mist">/ Spatial Context</span>
        </div>

        <div className="mt-16 sm:mt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] text-ink leading-[0.92]">
            Architecture<br />in quietude
          </h2>
          <p className="max-w-[26rem] text-base sm:text-lg text-smoke font-light leading-relaxed">
            Sanvera fixtures are created to harmonize with raw materials: massive quarry stone, lime plaster, poured concrete, and shifting daylight.
          </p>
        </div>

        {/* Asymmetrical Grid of Architectural Compositions */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {SPATIAL_PROJECTS.map((project) => {
            const Wrapper = project.isInteractive ? 'a' : 'figure';
            const wrapperProps = project.isInteractive
              ? { href: '#showroom', 'aria-label': `Enter ${project.title} interactive showroom` }
              : {};

            return (
              <Wrapper
                key={project.id}
                {...wrapperProps}
                className={`plate group relative overflow-hidden rounded-sm block ${project.aspect} ${project.span} ${
                  project.isInteractive ? 'cursor-pointer ring-1 ring-brass/30 hover:ring-brass/80 transition-all' : ''
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-editorial ${
                    project.isInteractive
                      ? 'filter contrast-105 brightness-100 group-hover:brightness-110'
                      : 'grayscale contrast-115 group-hover:grayscale-0 opacity-75 group-hover:opacity-90'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />

                {project.isInteractive && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3 py-1 rounded-full bg-brass/90 text-void font-medium label-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-void animate-ping" />
                      Interactive Spa Showroom
                    </span>
                  </div>
                )}

                <figcaption className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="label-mono text-brass block text-[9px]">{project.location}</span>
                    <h4 className="text-xl sm:text-2xl text-ink font-light mt-1 flex items-center gap-2">
                      {project.title}
                      {project.isInteractive && <span className="text-brass text-sm">→</span>}
                    </h4>
                  </div>
                  <span className="label-mono text-smoke text-[9px]">{project.materials}</span>
                </figcaption>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
