import React from 'react';
import { ArrowRight, Search, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { ToolCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: ToolCategory) => void;
  onNavigate: (route: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onNavigate,
}) => {
  const popularCategories: ToolCategory[] = ['Coding & Dev', 'Writing & Content', 'Image & Design', 'Productivity & Search'];

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 pt-12 pb-16 lg:pt-16 lg:pb-20">
      {/* Background Graphic Asset with measured contrast scrim */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src="/src/assets/images/hero_ai_platform_1792353406593.jpg"
          alt="AI Platform Architecture Grid"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Quiet kicker text without pill box */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>The Open AI Directory & Native Workspace</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Updated 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Discover modern AI tools. Analyze & refine text without cloud dependencies.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Explore 30+ categorized AI platforms, run private client-side writing analysis, summarize documents with extractive NLP, and construct precision prompts—free, without paid API keys.
          </p>

          {/* Interactive Search Bar */}
          <div className="pt-2 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tools, models, capabilities (e.g., 'Cursor', 'code', 'summarize', 'Claude')..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700 hover:border-slate-600 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm text-white placeholder-slate-400 rounded-xl transition-all shadow-lg"
              />
            </div>

            {/* Quick jump category filters */}
            <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-slate-400">
              <span className="text-slate-500">Popular:</span>
              {popularCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    const el = document.getElementById('directory-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Core Feature Quick Cards */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <div
              onClick={() => onNavigate('/writing-helper')}
              className="cursor-pointer group p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Writing Helper</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-400">
                Flesch readability, passive voice flags, and vocabulary simplifier running 100% in your browser.
              </p>
            </div>

            <div
              onClick={() => onNavigate('/summarizer')}
              className="cursor-pointer group p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Text Summarizer</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-400">
                Extractive TF-IDF sentence scoring engine. Zero hallucination risk, configurable compression.
              </p>
            </div>

            <div
              onClick={() => onNavigate('/prompt-generator')}
              className="cursor-pointer group p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Prompt Studio</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-400">
                Multi-model structured prompt builder, quality evaluator, and verified prompt library.
              </p>
            </div>
          </div>

          {/* Quantitative proof adjacent to claim */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
            <span>30+ Curated Tools</span>
            <span>·</span>
            <span>100% In-Browser Privacy</span>
            <span>·</span>
            <span>0 External API Calls</span>
          </div>
        </div>
      </div>
    </section>
  );
};
