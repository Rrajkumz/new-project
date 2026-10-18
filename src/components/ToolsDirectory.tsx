import React, { useState } from 'react';
import { Bookmark, ExternalLink, Filter, Info, Star, X } from 'lucide-react';
import { AITool, ToolCategory, ToolPricing } from '../types';

interface ToolsDirectoryProps {
  tools: AITool[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ToolCategory;
  onCategoryChange: (cat: ToolCategory) => void;
  savedToolIds: string[];
  onToggleSave: (id: string) => void;
  onOpenSubmitModal: () => void;
}

const CATEGORIES: ToolCategory[] = [
  'All',
  'Coding & Dev',
  'Writing & Content',
  'Image & Design',
  'Audio & Speech',
  'Video & Motion',
  'Productivity & Search',
  'Research & Data',
];

const PRICING_OPTIONS: ToolPricing[] = ['All', 'Free', 'Freemium', 'Paid', 'Open Source'];

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({
  tools,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  savedToolIds,
  onToggleSave,
  onOpenSubmitModal,
}) => {
  const [selectedPricing, setSelectedPricing] = useState<ToolPricing>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name' | 'newest'>('featured');
  const [activeModalTool, setActiveModalTool] = useState<AITool | null>(null);

  // Filter logic
  const filteredTools = tools.filter((tool) => {
    // Category match
    if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
      return false;
    }
    // Pricing match
    if (selectedPricing !== 'All' && tool.pricing !== selectedPricing) {
      return false;
    }
    // Search query match across name, tagline, description, features, and primaryUse
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inName = tool.name.toLowerCase().includes(q);
      const inTagline = tool.tagline.toLowerCase().includes(q);
      const inDesc = tool.description.toLowerCase().includes(q);
      const inUse = tool.primaryUse.toLowerCase().includes(q);
      const inFeatures = tool.features.some((f) => f.toLowerCase().includes(q));
      if (!inName && !inTagline && !inDesc && !inUse && !inFeatures) {
        return false;
      }
    }
    return true;
  });

  // Sort logic
  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'newest') return b.releaseYear - a.releaseYear;
    // Featured default: featured tools first, then popular, then rating
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return b.rating - a.rating;
  });

  return (
    <section id="directory-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Directory Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Tools Directory</h2>
          <p className="text-sm text-slate-400 mt-1">
            Independently vetted artificial intelligence software, models, and workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Sort Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setSortBy('featured')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                sortBy === 'featured' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                sortBy === 'rating' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Top Rated
            </button>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                sortBy === 'newest' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Newest
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="py-6 space-y-4">
        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 border-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing Sub-filter and Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Pricing:</span>
            {PRICING_OPTIONS.map((pricing) => (
              <button
                key={pricing}
                onClick={() => setSelectedPricing(pricing)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  selectedPricing === pricing
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pricing}
              </button>
            ))}
          </div>

          <div className="font-mono text-slate-400">
            Showing <span className="text-white font-semibold">{sortedTools.length}</span> of {tools.length} tools
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      {sortedTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTools.map((tool) => {
            const isSaved = savedToolIds.includes(tool.id);
            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all duration-200"
              >
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span>{tool.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300 font-medium">{tool.pricing}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleSave(tool.id)}
                      className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                        isSaved ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save tool'}
                      aria-label={isSaved ? 'Remove from saved' : 'Save tool'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Tool Title */}
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors">
                      {tool.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{tool.rating.toFixed(1)}</span>
                      <span className="text-slate-500">({tool.ratingCount.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-medium text-slate-300 mt-1 line-clamp-1">
                    {tool.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Primary Use */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                    <span className="text-slate-500">Best for: </span>
                    <span className="text-slate-300">{tool.primaryUse}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalTool(tool)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    View Details
                  </button>

                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center border border-slate-800 rounded-xl bg-slate-900/30">
          <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No matching tools found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, clearing pricing filters, or browsing other categories.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('All');
              setSelectedPricing('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-medium text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalTool && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setActiveModalTool(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{activeModalTool.category}</span>
                  <span>·</span>
                  <span className="text-slate-300 font-semibold">{activeModalTool.pricing}</span>
                  <span>·</span>
                  <span>Released {activeModalTool.releaseYear}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{activeModalTool.name}</h3>
                <p className="text-sm font-medium text-slate-300 mt-0.5">{activeModalTool.tagline}</p>
              </div>

              <button
                onClick={() => setActiveModalTool(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeModalTool.description}
            </p>

            {/* Core Features */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Key Capabilities</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeModalTool.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 font-mono" aria-hidden="true">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
                <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Advantages</h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeModalTool.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
                <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Trade-offs & Limits</h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeModalTool.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500">✕</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer with External Link */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onToggleSave(activeModalTool.id);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              >
                <Bookmark className={`w-3.5 h-3.5 ${savedToolIds.includes(activeModalTool.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{savedToolIds.includes(activeModalTool.id) ? 'Saved in Library' : 'Bookmark Tool'}</span>
              </button>

              <a
                href={activeModalTool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
