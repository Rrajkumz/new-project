import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { GUIDES_DATA } from '../data/guidesData';
import { Guide } from '../types';

interface GuidesSectionProps {
  onSelectGuide: (guide: Guide) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ onSelectGuide }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', 'Prompt Engineering', 'NLP', 'Model Selection', 'Privacy', 'Developer Tools'];

  const filteredGuides = GUIDES_DATA.filter((g) => {
    if (selectedTag === 'All') return true;
    return g.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Technical Whitepapers & Tutorials</span>
          <span>·</span>
          <span>Original Research</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Architecture & Engineering Guides
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Deep-dive technical guides on prompt engineering frameworks, extractive vs. abstractive NLP, local client-side computation, and developer workflows.
        </p>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-white text-slate-950 border-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Guide */}
      {filteredGuides.length > 0 && (
        <div className="mt-8">
          <div
            onClick={() => onSelectGuide(filteredGuides[0])}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {filteredGuides[0].coverImage && (
              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-950">
                <img
                  src={filteredGuides[0].coverImage}
                  alt={filteredGuides[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className={`p-6 sm:p-8 flex flex-col justify-between ${filteredGuides[0].coverImage ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="text-slate-300 font-semibold">{filteredGuides[0].category}</span>
                  <span>·</span>
                  <span>{filteredGuides[0].readTime}</span>
                  <span>·</span>
                  <span>{filteredGuides[0].publishedDate}</span>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-slate-200 transition-colors">
                  {filteredGuides[0].title}
                </h2>

                <p className="text-sm font-medium text-slate-300 mt-2 leading-relaxed">
                  {filteredGuides[0].subtitle}
                </p>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {filteredGuides[0].summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="text-slate-400">
                  By <span className="text-slate-200 font-semibold">{filteredGuides[0].author.name}</span>, {filteredGuides[0].author.role}
                </div>

                <span className="flex items-center gap-1 font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Guides */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.slice(1).map((guide) => (
          <div
            key={guide.id}
            onClick={() => onSelectGuide(guide)}
            className="group cursor-pointer flex flex-col justify-between p-6 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 hover:border-slate-700 transition-all"
          >
            <div>
              {guide.coverImage && (
                <div className="mb-4 aspect-[4/3] rounded-lg overflow-hidden bg-slate-950">
                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span>{guide.category}</span>
                <span>·</span>
                <span>{guide.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-slate-200 transition-colors leading-snug">
                {guide.title}
              </h3>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{guide.author.name}</span>
              <span className="flex items-center gap-1 text-slate-200 font-medium group-hover:translate-x-0.5 transition-transform">
                <span>Read</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
