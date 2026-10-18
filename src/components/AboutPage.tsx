import React from 'react';
import { ArrowRight, Cpu, Eye, Lock, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="pb-8 border-b border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Our Mission</span>
          <span aria-hidden="true">·</span>
          <span>Core Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About SmartAI Tools
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
          An open platform dedicated to demystifying artificial intelligence software through independent curations, privacy-first client-side utilities, and transparent algorithmic literacy.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="py-10 space-y-10 text-sm leading-relaxed text-slate-300 font-sans">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Why We Built SmartAI Tools</h2>
          <p>
            The generative AI landscape has exploded with thousands of tools, models, and hype cycles. Yet, for practitioners—software engineers, researchers, writers, and students—finding trustworthy software without getting locked into predatory monthly subscriptions or opaque paywalls has become increasingly difficult.
          </p>
          <p>
            Furthermore, most "AI writing assistants" require users to copy-paste confidential company roadmaps, proprietary code, or personal drafts into cloud servers. We believed there had to be a better standard: an open directory of verified AI platforms paired with zero-telemetry, browser-native tools that run instantly without API keys or privacy compromises.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">100% In-Browser Privacy</h3>
            <p className="text-xs text-slate-400">
              Our writing helper and extractive summarizer execute entirely in client JavaScript. Zero bytes of your text are dispatched to external servers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <Cpu className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Algorithmic Honesty</h3>
            <p className="text-xs text-slate-400">
              We never simulate or fake AI responses. We transparently explain our heuristic phonetic syllable calculations, TF-IDF scoring, and prompt structures.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Editorial Independence</h3>
            <p className="text-xs text-slate-400">
              Every tool in our directory includes real trade-offs and limitations. We do not accept sponsored rankings that hide software flaws.
            </p>
          </div>
        </div>

        {/* The Team / Methodology */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <h2 className="text-xl font-bold text-white tracking-tight">Curation Standards</h2>
          <p>
            To be listed in SmartAI Tools, software must satisfy three strict verification criteria:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-white">Active Production Utility: </strong> The tool must deliver a concrete, measurable workflow outcome rather than superficial novelty.
            </li>
            <li>
              <strong className="text-white">Transparent Pricing & Data Policy: </strong> The platform must clearly state whether user data is utilized for model training.
            </li>
            <li>
              <strong className="text-white">API & Export Availability: </strong> Where applicable, tools supporting local execution, open weights, or direct data export are prioritized.
            </li>
          </ol>
        </div>

        {/* CTA Strip */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Explore the directory or test our utilities</h4>
            <p className="text-xs text-slate-400 mt-0.5">Start enhancing text drafts and discovering AI platforms today.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/tools')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Browse Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
