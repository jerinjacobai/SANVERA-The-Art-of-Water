import React from 'react';

const SPATIAL_PROJECTS = [
  {
    id: 'residence-engadin',
    title: 'Engadin Alpine Sanctuary',
    location: 'St. Moritz, Switzerland',
    materials: 'Valser quartzite, brushed brass series mixer',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    aspect: 'aspect-[16/10]',
    span: 'lg:col-span-8',
  },
  {
    id: 'hotel-kyoto',
    title: 'Aman Pavilion Spa',
    location: 'Kyoto, Japan',
    materials: 'Charred cedar, dark bronze concealed shower',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/5]',
    span: 'lg:col-span-4',
  },
  {
    id: 'villa-capri',
    title: 'Cliffside Monolith',
    location: 'Capri, Italy',
    materials: 'Honed travertine, polished chrome vessel mixer',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-square',
    span: 'lg:col-span-5',
  },
  {
    id: 'residence-copenhagen',
    title: 'Nordic Harbor Atelier',
    location: 'Copenhagen, Denmark',
    materials: 'Poured terrazzo, brushed brass freestanding spout',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80',
    aspect: 'aspect-[16/10]',
    span: 'lg:col-span-7',
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
          {SPATIAL_PROJECTS.map((project) => (
            <figure
              key={project.id}
              className={`plate group relative overflow-hidden rounded-sm ${project.aspect} ${project.span}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-editorial opacity-75 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <span className="label-mono text-brass block text-[9px]">{project.location}</span>
                  <h4 className="text-xl sm:text-2xl text-ink font-light mt-1">{project.title}</h4>
                </div>
                <span className="label-mono text-smoke text-[9px]">{project.materials}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
