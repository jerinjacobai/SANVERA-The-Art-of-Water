import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { SANVERA_CATALOG, CATALOG_CATEGORIES } from '../../data/sanveraCatalog';
import { CollectionItem, ProductCategory, SanveraProduct } from '../../types';

interface CollectionSectionProps {
  onSelectProduct: (item: CollectionItem) => void;
}

export const sanveraProductToCollectionItem = (p: SanveraProduct): CollectionItem => ({
  id: p.id,
  number: p.number,
  title: p.name,
  series: `${p.family} · ${p.series}`,
  description: p.description,
  category: p.category,
  previewImage: p.image || '/images/plate-architecture.jpg',
  specs: {
    materials: p.materials,
    flowRate: p.flowRate || 'Laminar Regulated Stream',
    cartridge: p.cartridge || 'Ceramic Disc Technology',
    dimensions: p.dimensions,
    warranty: '15-Year Architectural Guarantee',
    finishes: p.finishes,
  },
  features: p.tags,
});

export const CollectionSection: React.FC<CollectionSectionProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState<SanveraProduct | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProducts = useMemo(() => {
    return SANVERA_CATALOG.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
              The catalogue
            </h2>
          </div>
          <p className="max-w-[30rem] text-base sm:text-lg text-smoke font-light leading-relaxed">
            Thirty-four architectural fittings across nine functional families. Each series begins as an ink drawing of fluid movement and is resolved in solid brass and stone.
          </p>
        </div>

        {/* Filter Bar: Category Tabs & Real-Time Search */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-hair/60 pb-6">
          {/* Category Horizontal Scroll Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-light tracking-wider transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-ink text-void font-medium'
                  : 'text-mist hover:text-ink bg-void/40 border border-hair/60'
              }`}
            >
              All ({SANVERA_CATALOG.length})
            </button>
            {CATALOG_CATEGORIES.map((cat) => {
              const count = SANVERA_CATALOG.filter((p) => p.category === cat.id).length;
              if (count === 0) return null;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-light tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-ink text-void font-medium'
                      : 'text-mist hover:text-ink bg-void/40 border border-hair/60'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search series or SKU..."
              className="w-full bg-void/50 border border-hair rounded-full py-1.5 pl-9 pr-4 text-xs text-ink placeholder:text-smoke focus:outline-none focus:border-ink transition-colors"
            />
          </div>
        </div>

        {/* Editorial Rows */}
        <div className="mt-8 sm:mt-12 divide-y divide-hair">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-smoke label-mono">
              No products found matching your filter criteria.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(sanveraProductToCollectionItem(product))}
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-9 cursor-pointer transition-all duration-500 hover:bg-void/40 px-2 sm:px-4"
              >
                {/* Left: Product Title, Series & Family */}
                <div className="flex items-baseline gap-6 sm:gap-10 flex-1">
                  <span className="label-mono text-brass text-xs sm:text-sm w-7">
                    {product.number}
                  </span>
                  <div className="transition-transform duration-500 ease-editorial group-hover:translate-x-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="label-mono text-smoke text-[9px] uppercase">
                        {product.family}
                      </span>
                      <span className="text-hair">·</span>
                      <span className="label-mono text-brass text-[9px]">
                        {product.sku}
                      </span>
                    </div>
                    <h3 className="editorial-title text-xl sm:text-3xl lg:text-4xl text-mist group-hover:text-ink transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Center: Dimensions & Materials Spec */}
                <div className="mt-3 md:mt-0 flex flex-col gap-1 text-xs text-smoke font-light max-w-xs hidden lg:block leading-relaxed">
                  <span className="text-ink/80 truncate">{product.dimensions}</span>
                  <span className="text-smoke/70 truncate text-[11px]">{product.materials}</span>
                </div>

                {/* Right: Interactive Indicator */}
                <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 text-smoke group-hover:text-ink">
                  <span className="label-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline text-mist">
                    Inspect Technical Specification
                  </span>
                  <div className="w-8 h-8 rounded-full border border-hair group-hover:border-ink flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Hairline highlight */}
                <div className="absolute bottom-0 left-0 h-px w-full bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Desktop Cursor-Following Product Preview */}
      {hoveredProduct && (
        <div
          className="pointer-events-none fixed z-40 hidden lg:block w-[280px] h-[340px] overflow-hidden border border-hair bg-void shadow-2xl transition-opacity duration-300"
          style={{
            left: `${mousePos.x + 30}px`,
            top: `${mousePos.y - 170}px`,
          }}
        >
          <img
            src={hoveredProduct.image || '/images/plate-architecture.jpg'}
            alt={hoveredProduct.name}
            className="w-full h-full object-cover grayscale contrast-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
            <span className="label-mono text-brass text-[9px] uppercase">{hoveredProduct.family}</span>
            <span className="editorial-title text-ink text-sm font-light leading-tight">{hoveredProduct.name}</span>
            <span className="label-mono text-smoke text-[9px] mt-1">{hoveredProduct.dimensions}</span>
          </div>
        </div>
      )}
    </section>
  );
};
