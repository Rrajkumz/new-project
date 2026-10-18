import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Share2 } from 'lucide-react';
import { Guide } from '../types';

interface GuideDetailProps {
  guide: Guide;
  onBack: () => void;
}

export const GuideDetail: React.FC<GuideDetailProps> = ({ guide, onBack }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs text-slate-400">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
        >
          {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedUrl ? 'Link Copied' : 'Share Guide'}</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="py-8 space-y-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">{guide.category}</span>
          <span aria-hidden="true">·</span>
          <span>{guide.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>Published {guide.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          {guide.subtitle}
        </p>

        {/* Author Bio Bar */}
        <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
          <div>
            <span className="text-slate-200 font-semibold">{guide.author.name}</span>
            <span className="mx-1.5">·</span>
            <span>{guide.author.role}</span>
          </div>
        </div>

        {/* Cover Image if present */}
        {guide.coverImage && (
          <div className="pt-4 aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={guide.coverImage}
              alt={guide.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </header>

      {/* Executive Summary Callout */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 text-sm leading-relaxed text-slate-300 mb-10">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Executive Overview</h4>
        <p>{guide.summary}</p>
      </div>

      {/* Article Content Sections */}
      <div className="space-y-12">
        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight border-b border-slate-800/80 pb-3">
              {section.heading}
            </h2>

            <div className="text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line space-y-4 font-sans">
              {section.content}
            </div>

            {/* Code Snippet with Copy */}
            {section.codeSnippet && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs text-slate-400">
                  <span className="font-mono">{section.codeSnippet.caption || section.codeSnippet.language}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(section.codeSnippet!.code, section.id)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedSnippet === section.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedSnippet === section.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {section.codeSnippet.code}
                </pre>
              </div>
            )}

            {/* Key Takeaway Callout (Anti-slop compliant: hairline border, no thick left border) */}
            {section.keyTakeaway && (
              <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs leading-relaxed">
                <span className="font-bold text-slate-200">Key Takeaway: </span>
                <span className="text-slate-300">{section.keyTakeaway}</span>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Guide Footer */}
      <footer className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500">Tags:</span>
          {guide.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 font-semibold text-white hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </button>
      </footer>
    </article>
  );
};
