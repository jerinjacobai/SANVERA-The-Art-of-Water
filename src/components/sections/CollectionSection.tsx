import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Search, Grid, List } from 'lucide-react';
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
  previewImage: p.image || '/catalog/mixer-664.jpg',
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<SanveraProduct | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProducts = useMemo(() => {
    return SANVERA_CATALOG.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="collection" className="relative bg-void py-24 sm:py-32 lg:py-40 text-ink">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center justify-between border-t border-hair pt-6">
          <div className="flex items-center gap-4">
            <span className="label-mono text-smoke">04</span>
            <span className="label-mono text-mist">/ The Official Catalogue</span>
          </div>
          <span className="label-mono text-smoke text-[10px]">
            {filteredProducts.length} of {SANVERA_CATALOG.length} Authentic Fittings
          </span>
        </div>

        {/* Title & View Toggle */}
        <div className="mt-16 sm:mt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] text-ink leading-[0.92]">
              The Architectural<br />Catalogue
            </h2>
            <p className="mt-4 text-base sm:text-lg text-mist font-light max-w-xl leading-relaxed">
              Thirty-four contemporary fittings resolved in solid DZR brass, forged composite stone, and Swiss laminar fluid regulators.
            </p>
          </div>

          {/* View Mode Toggle (Grid vs List) */}
          <div className="flex items-center gap-2 bg-char/50 border border-hair p-1 rounded-full self-start lg:self-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-light transition-colors ${
                viewMode === 'grid' ? 'bg-ink text-void font-medium' : 'text-smoke hover:text-ink'
              }`}
              title="Large Photographic Grid View"
            >
              <Grid size={14} />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-light transition-colors ${
                viewMode === 'list' ? 'bg-ink text-void font-medium' : 'text-smoke hover:text-ink'
              }`}
              title="Architectural Monograph List View"
            >
              <List size={14} />
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* Filter Pill Navigation & Search Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-hair pb-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
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
          <div className="relative min-w-[260px] w-full md:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search series, SKU, or finish..."
              className="w-full bg-void/50 border border-hair rounded-full py-2 pl-9 pr-4 text-xs text-ink placeholder:text-smoke focus:outline-none focus:border-ink transition-colors"
            />
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: LARGE PHOTOGRAPHIC EDITORIAL GRID (Generous, high-impact photography)
            ========================================================================= */}
        {viewMode === 'grid' ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-24 text-center text-smoke label-mono">
                No products found matching your filter criteria.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(sanveraProductToCollectionItem(product))}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-char/30 hover:bg-char/70 border border-hair/80 hover:border-brass/70 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
                >
                  {/* Top Badge: Number & SKU */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="label-mono text-brass text-xs font-medium">
                      {product.number}
                    </span>
                    <span className="label-mono text-smoke text-[10px] bg-void/60 px-2 py-0.5 rounded border border-hair/50">
                      {product.sku}
                    </span>
                  </div>

                  {/* LARGE HERO PRODUCT PHOTOGRAPH CONTAINER (Height ~280px) */}
                  <div className="w-full h-64 sm:h-72 my-4 rounded-xl overflow-hidden bg-void/40 p-4 flex items-center justify-center relative border border-hair/40 group-hover:border-brass/40 transition-colors">
                    <img
                      src={product.image || '/catalog/mixer-664.jpg'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 ease-editorial"
                      onError={(e) => {
                        e.currentTarget.src = '/catalog/mixer-664.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-void/90 backdrop-blur-md px-2.5 py-1 rounded text-[9px] label-mono text-brass border border-hair flex items-center gap-1.5 shadow-lg">
                      <span>Inspect 3D</span>
                      <ArrowRight size={10} />
                    </div>
                  </div>

                  {/* Bottom Information */}
                  <div className="mt-3">
                    <span className="label-mono text-smoke text-[9px] uppercase tracking-wider block">
                      {product.family}
                    </span>
                    <h3 className="editorial-title text-xl sm:text-2xl text-ink group-hover:text-brass transition-colors duration-300 mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs text-smoke font-light leading-relaxed line-clamp-2">
                      {product.dimensions} · {product.materials}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* =========================================================================
              VIEW 2: EDITORIAL ROWS WITH GENEROUS w-28 h-28 THUMBNAILS
              ========================================================================= */
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
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 cursor-pointer transition-all duration-500 hover:bg-void/40 px-3 sm:px-5 gap-4 sm:gap-6"
                >
                  {/* Left: Product Number, Large Thumbnail, Title, Series */}
                  <div className="flex items-center gap-4 sm:gap-8 flex-1">
                    <span className="label-mono text-brass text-sm sm:text-base w-6 shrink-0 font-medium">
                      {product.number}
                    </span>

                    {/* Generous Product Photograph (w-24 h-24 to w-28 h-28) */}
                    <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-char/60 border border-hair/80 p-2 flex items-center justify-center group-hover:border-brass/80 transition-all duration-300 shadow-md">
                      <img
                        src={product.image || '/catalog/mixer-664.jpg'}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/catalog/mixer-664.jpg';
                        }}
                      />
                    </div>

                    <div className="transition-transform duration-500 ease-editorial group-hover:translate-x-2">
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
                      <span className="text-smoke/80 text-xs font-light mt-1 block lg:hidden">
                        {product.dimensions}
                      </span>
                    </div>
                  </div>

                  {/* Center: Dimensions & Materials Spec */}
                  <div className="mt-2 md:mt-0 flex flex-col gap-1 text-xs text-smoke font-light max-w-xs hidden lg:block leading-relaxed">
                    <span className="text-ink/90 font-normal truncate">{product.dimensions}</span>
                    <span className="text-smoke/70 truncate text-[11px]">{product.materials}</span>
                  </div>

                  {/* Right: Interactive Indicator */}
                  <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end gap-6 text-smoke group-hover:text-ink">
                    <span className="label-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline text-mist">
                      Inspect 3D Specification
                    </span>
                    <div className="w-9 h-9 rounded-full border border-hair group-hover:border-ink flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Hairline highlight */}
                  <div className="absolute bottom-0 left-0 h-px w-full bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial" />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Floating Desktop Cursor-Following Product Preview (for list mode) */}
      {viewMode === 'list' && hoveredProduct && (
        <div
          className="pointer-events-none fixed z-40 hidden lg:block w-[320px] h-[380px] overflow-hidden border border-hair bg-void shadow-2xl transition-opacity duration-300 rounded-xl"
          style={{
            left: `${mousePos.x + 30}px`,
            top: `${mousePos.y - 190}px`,
          }}
        >
          <img
            src={hoveredProduct.image || '/catalog/mixer-664.jpg'}
            alt={hoveredProduct.name}
            className="w-full h-full object-contain p-6 bg-char/50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
            <span className="label-mono text-brass text-[9px] uppercase">{hoveredProduct.family}</span>
            <span className="editorial-title text-ink text-base font-light leading-tight">{hoveredProduct.name}</span>
            <span className="label-mono text-smoke text-[9px] mt-1">{hoveredProduct.dimensions}</span>
          </div>
        </div>
      )}
    </section>
  );
};
