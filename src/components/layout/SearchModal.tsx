import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { SANVERA_CATALOG } from '../../data/sanveraCatalog';
import { JOURNAL_ARTICLES } from '../../data/journal';
import { sanveraProductToCollectionItem } from '../sections/CollectionSection';
import { CollectionItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (item: CollectionItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = SANVERA_CATALOG.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.series.toLowerCase().includes(query.toLowerCase()) ||
      item.family.toLowerCase().includes(query.toLowerCase()) ||
      item.sku.toLowerCase().includes(query.toLowerCase()) ||
      item.materials.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = JOURNAL_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-void/95 backdrop-blur-2xl p-6 sm:p-12 lg:p-20 overflow-y-auto">
      {/* Search Input Bar */}
      <div className="max-w-[1000px] w-full mx-auto">
        <div className="flex items-center justify-between border-b border-hair pb-6">
          <div className="flex items-center gap-4 flex-1">
            <Search size={22} className="text-brass shrink-0" />
            <input
              type="text"
              placeholder="SEARCH BY SERIES, NAME, MATERIAL, OR SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent border-none outline-none font-display text-xl sm:text-2xl lg:text-3xl text-ink placeholder:text-smoke/40 tracking-tight"
            />
          </div>
          <button
            onClick={onClose}
            className="label-mono text-mist hover:text-ink flex items-center gap-2"
          >
            <span>ESC</span>
            <X size={16} />
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-12 space-y-12">
          {/* Products Result Group with Authentic Photographs */}
          <div>
            <span className="label-mono text-smoke block mb-4">
              Sanvera Catalogue Results ({filteredProducts.length})
            </span>
            {filteredProducts.length > 0 ? (
              <div className="divide-y divide-hair">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(sanveraProductToCollectionItem(p));
                    }}
                    className="w-full py-4 text-left group flex items-center justify-between hover:bg-ink/[0.03] px-3 rounded-lg transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-char/50 border border-hair/70 p-1 flex items-center justify-center group-hover:border-brass/70 transition-colors">
                        <img
                          src={p.image || '/catalog/mixer-664.jpg'}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/catalog/mixer-664.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <span className="label-mono text-brass text-[9px]">{p.number} · {p.family} · {p.sku}</span>
                        <h4 className="text-lg sm:text-xl text-mist group-hover:text-ink transition-colors font-light mt-0.5">
                          {p.name}
                        </h4>
                        <p className="text-xs text-smoke font-light mt-0.5 max-w-xl truncate">
                          {p.dimensions} · {p.materials}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-smoke group-hover:text-ink group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-smoke font-light">No products matching query.</p>
            )}
          </div>

          {/* Journal Result Group */}
          <div>
            <span className="label-mono text-smoke block mb-4">Editorial & Research</span>
            {filteredArticles.length > 0 ? (
              <div className="divide-y divide-hair">
                {filteredArticles.map((a) => (
                  <a
                    key={a.id}
                    href="#journal"
                    onClick={onClose}
                    className="w-full py-4 block group hover:bg-ink/[0.02] px-2 transition-colors"
                  >
                    <span className="label-mono text-smoke text-[9px]">{a.category} · {a.readTime}</span>
                    <h4 className="text-lg text-mist group-hover:text-ink transition-colors font-light mt-1">
                      {a.title}
                    </h4>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-smoke font-light">No editorial articles matching query.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
