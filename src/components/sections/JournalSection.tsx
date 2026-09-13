import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../../data/journal';
import { JournalArticle } from '../../types';
import { ArrowRight, X } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="relative bg-void py-24 sm:py-32 lg:py-40 text-ink">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-4 border-t border-hair pt-6">
          <span className="label-mono text-smoke">10</span>
          <span className="label-mono text-mist">/ Editorial Journal</span>
        </div>

        <div className="mt-16 sm:mt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-hair pb-10">
          <div>
            <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] text-ink leading-[0.92]">
              Discourses on water<br />and spatial form
            </h2>
          </div>
          <p className="max-w-[26rem] text-base sm:text-lg text-smoke font-light leading-relaxed">
            Essays on metallurgy, acoustic calm, and the ritualistic nature of contemporary private spaces.
          </p>
        </div>

        {/* Asymmetrical Editorial Article Layout */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          {/* Article 1 (Large Feature Left) */}
          <article
            onClick={() => setActiveArticle(JOURNAL_ARTICLES[0])}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="plate aspect-[16/10] overflow-hidden">
              <img
                src={JOURNAL_ARTICLES[0].image}
                alt={JOURNAL_ARTICLES[0].title}
                className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-editorial opacity-75 group-hover:opacity-95"
              />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="label-mono text-brass">{JOURNAL_ARTICLES[0].number}</span>
              <span className="label-mono text-smoke">· {JOURNAL_ARTICLES[0].category}</span>
              <span className="label-mono text-smoke">· {JOURNAL_ARTICLES[0].readTime}</span>
            </div>
            <h3 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-mist group-hover:text-ink transition-colors mt-4">
              {JOURNAL_ARTICLES[0].title}
            </h3>
            <p className="mt-4 text-base text-smoke font-light leading-relaxed max-w-xl">
              {JOURNAL_ARTICLES[0].excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-widest2 text-ink border-b border-hair pb-1 group-hover:border-ink">
              <span>Read Essay</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </article>

          {/* Right Column: Stacked Essays */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-hair">
            {JOURNAL_ARTICLES.slice(1).map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="py-8 first:pt-0 last:pb-0 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="label-mono text-brass">{article.number}</span>
                  <span className="label-mono text-smoke">· {article.category}</span>
                  <span className="label-mono text-smoke">· {article.readTime}</span>
                </div>
                <h4 className="editorial-title text-2xl sm:text-3xl text-mist group-hover:text-ink transition-colors mt-3">
                  {article.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-smoke font-light leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest2 text-smoke group-hover:text-ink transition-colors">
                  <span>Read Article</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-[100] flex bg-void/98 backdrop-blur-2xl p-6 sm:p-12 lg:p-24 overflow-y-auto">
          <div className="max-w-[840px] mx-auto w-full">
            <div className="flex items-center justify-between border-b border-hair pb-6">
              <span className="label-mono text-brass">{activeArticle.category} · {activeArticle.readTime}</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="label-mono text-mist hover:text-ink flex items-center gap-2"
              >
                <span>Close</span>
                <X size={16} />
              </button>
            </div>

            <h2 className="editorial-title text-4xl sm:text-6xl text-ink mt-10">
              {activeArticle.title}
            </h2>
            <p className="text-xl text-mist font-light mt-4 italic">
              {activeArticle.subtitle}
            </p>

            <div className="mt-12 space-y-6 text-base sm:text-lg text-mist font-light leading-loose border-t border-hair pt-8">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-hair flex justify-between items-center">
              <span className="label-mono text-smoke">Published in Sanvera Editions</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="label-mono text-ink border-b border-ink pb-1"
              >
                Return to Journal ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
