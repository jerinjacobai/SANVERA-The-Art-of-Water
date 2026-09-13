import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';
import { CollectionItem } from '../../types';

interface CollectionSectionProps {
  onSelectProduct: (item: CollectionItem) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({ onSelectProduct }) => {
  const [hoveredItem, setHoveredItem] = useState<CollectionItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="collection" className="relative bg-char py-24 sm:py-32 lg:py-40 text-ink border-t border-hair">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-hair pb-10">
          <div>
            <div className="flex items-center gap-4">
              <span className="label-mono text-smoke">07</span>
              <span className="label-mono text-mist">/ The Collection</span>
            </div>
            <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] text-ink mt-6 leading-[0.92]">
              The collection
            </h2>
          </div>
          <p className="max-w-[28rem] text-base sm:text-lg text-smoke font-light leading-relaxed">
            Six architectural families, one geometry. Every series shares identical quiet radii, ensuring pieces coexist in a room with effortless balance.
          </p>
        </div>

        {/* Editorial Rows */}
        <div className="mt-12 sm:mt-16 divide-y divide-hair">
          {COLLECTIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-12 cursor-pointer transition-all duration-500 hover:bg-void/30 px-2 sm:px-4"
            >
              {/* Left Title & Number */}
              <div className="flex items-baseline gap-6 sm:gap-12 flex-1">
                <span className="label-mono text-brass text-sm sm:text-base w-8">
                  {item.number}
                </span>
                <div className="transition-transform duration-500 ease-editorial group-hover:translate-x-4">
                  <span className="label-mono text-smoke block text-[9px] mb-1">
                    {item.series}
                  </span>
                  <h3 className="editorial-title text-2xl sm:text-4xl lg:text-5xl text-mist group-hover:text-ink transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Center Description */}
              <p className="mt-3 md:mt-0 text-xs sm:text-sm text-smoke font-light max-w-md hidden xl:block leading-relaxed">
                {item.description}
              </p>

              {/* Mobile Preview Image (Visible only on small screens) */}
              <div className="mt-4 md:hidden w-full aspect-[16/9] overflow-hidden rounded-sm border border-hair">
                <img
                  src={item.previewImage}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-115"
                />
              </div>

              {/* Right Indicator & Action */}
              <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 text-smoke group-hover:text-ink">
                <span className="label-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline">
                  Interactive 3D Preview
                </span>
                <div className="w-8 h-8 rounded-full border border-hair group-hover:border-ink flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Hairline Highlight */}
              <div className="absolute bottom-0 left-0 h-px w-full bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Desktop Cursor-Following Product Preview */}
      {hoveredItem && (
        <div
          className="pointer-events-none fixed z-40 hidden lg:block w-[280px] h-[340px] overflow-hidden border border-hair bg-void shadow-2xl transition-opacity duration-300"
          style={{
            left: `${mousePos.x + 30}px`,
            top: `${mousePos.y - 170}px`,
          }}
        >
          <img
            src={hoveredItem.previewImage}
            alt={hoveredItem.title}
            className="w-full h-full object-cover grayscale contrast-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="label-mono text-ink text-[10px]">{hoveredItem.title}</span>
            <span className="label-mono text-brass text-[9px]">3D Ready</span>
          </div>
        </div>
      )}
    </section>
  );
};
