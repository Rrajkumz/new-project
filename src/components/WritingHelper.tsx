import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCheck,
  Copy,
  Download,
  Eraser,
  HelpCircle,
  RotateCcw,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { analyzeWriting, transformText } from '../utils/textAnalysis';

const SAMPLE_TEXTS = {
  announcement: `We are extremely thrilled to announce that in order to facilitate better collaboration, our engineering team has commenced the implementation of a multifaceted new feature. Due to the fact that our previous architecture was completely eliminated by the recent paradigm shift, a large number of components were refactored by our developers. At the end of the day, we endeavor to ascertain optimal performance. Needless to say, we are very cognizant of user latency concerns.`,
  technical: `The database synchronization pipeline utilizes an asynchronous message broker to ingest transactional payloads. When concurrent mutations are executed by the worker pool, eventual consistency is maintained via distributed vector clocks. In the event that a node failure is detected, heartbeat signals trigger an automatic failover sequence to prevent data loss.`,
  outreach: `I hope you are having a wonderful week! I wanted to touch base with you in order to circle back on our previous conversation regarding your software team's workflow. We leverage cutting-edge synergy to completely eliminate bottlenecks for high-growth tech companies. Would you be open to a quick call at this point in time to discuss low hanging fruit?`,
};

export const WritingHelper: React.FC = () => {
  const [content, setContent] = useState(SAMPLE_TEXTS.announcement);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'issues' | 'rewrite'>('metrics');
  const [history, setHistory] = useState<string[]>([]);

  // Real client-side NLP analysis
  const analysis = useMemo(() => analyzeWriting(content), [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setHistory((prev) => [...prev, content]);
    setContent('');
  };

  const handleLoadSample = (key: keyof typeof SAMPLE_TEXTS) => {
    setHistory((prev) => [...prev, content]);
    setContent(SAMPLE_TEXTS[key]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setContent(prev);
    }
  };

  const handleTransform = (mode: 'concise' | 'simplify' | 'formalize' | 'bulletize') => {
    setHistory((prev) => [...prev, content]);
    const transformed = transformText(content, mode);
    setContent(transformed);
  };

  const handleReplaceFiller = (phrase: string, replacement: string) => {
    setHistory((prev) => [...prev, content]);
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    setContent(content.replace(regex, replacement).replace(/\s{2,}/g, ' '));
  };

  // Interpretation helper for Flesch score
  const getFleschInterpretation = (score: number) => {
    if (score >= 90) return { label: 'Very Easy', note: 'Easily understood by an average 5th grader.' };
    if (score >= 70) return { label: 'Fairly Easy', note: 'Standard plain English, suitable for general audiences.' };
    if (score >= 50) return { label: 'Standard', note: 'High school reading level, standard editorial prose.' };
    if (score >= 30) return { label: 'Difficult', note: 'College level, suitable for technical manuals and whitepapers.' };
    return { label: 'Very Confusing', note: 'Academic research or dense legal prose.' };
  };

  const fleschInfo = getFleschInterpretation(analysis.metrics.fleschReadingEase);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Capabilities Notice */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Client-Side NLP</span>
              <span>·</span>
              <span>Zero-Telemetry</span>
              <span>·</span>
              <span>No Cloud API Required</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Browser-Based Writing Helper
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect draft readability, identify passive constructions, eliminate wordy corporate clichés, and shift tone—processed 100% locally in your browser memory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleUndo}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                title="Undo last edit"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Transparent Limitations & Privacy Banner */}
        <div className="mt-4 p-3 rounded-lg border border-slate-800/80 bg-slate-900/40 flex items-start gap-3 text-xs text-slate-400">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Algorithmic Transparency & Zero Data Transmission: </strong>
            This tool uses local phonetic syllable heuristics and lexical pattern-matching. It does not send text to third-party generative APIs or store drafts on remote servers. All calculations happen synchronously in JavaScript.
          </div>
        </div>
      </div>

      {/* Main Workspace Split Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Text Input & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Sample Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Load sample text:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleLoadSample('announcement')}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                Product Launch
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('technical')}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                Architecture Spec
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('outreach')}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                Cold Email
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-slate-500 hover:text-slate-300"
                title="Clear text"
              >
                <Eraser className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Textarea Editor */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or type your draft here to analyze readability, tone, passive voice, and wordiness..."
              rows={14}
              className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none text-slate-100 text-sm leading-relaxed resize-y font-sans transition-all placeholder-slate-500"
            />
          </div>

          {/* Style & Tone Transformation Toolbar */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-slate-400" />
              <span>Algorithmic Style Transforms</span>
            </div>
            <p className="text-xs text-slate-400">
              Apply rule-based lexical transformations directly to your draft:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleTransform('concise')}
                className="px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 transition-colors text-center"
              >
                Make Concise
              </button>
              <button
                type="button"
                onClick={() => handleTransform('simplify')}
                className="px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 transition-colors text-center"
              >
                Simplify Words
              </button>
              <button
                type="button"
                onClick={() => handleTransform('formalize')}
                className="px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 transition-colors text-center"
              >
                Expand Contractions
              </button>
              <button
                type="button"
                onClick={() => handleTransform('bulletize')}
                className="px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 transition-colors text-center"
              >
                Convert to Bullets
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics & Linguistic Diagnostics (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tab switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('metrics')}
              className={`flex-1 py-1.5 font-medium rounded-md transition-colors text-center ${
                activeTab === 'metrics' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Readability Metrics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('issues')}
              className={`flex-1 py-1.5 font-medium rounded-md transition-colors text-center relative ${
                activeTab === 'issues' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Issues & Clichés ({analysis.fillersList.length + analysis.passiveList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rewrite')}
              className={`flex-1 py-1.5 font-medium rounded-md transition-colors text-center ${
                activeTab === 'rewrite' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tone Profile
            </button>
          </div>

          {/* TAB 1: Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              {/* Primary Score Tile */}
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Flesch Reading Ease</span>
                  <span className="font-semibold text-white">{fleschInfo.label}</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                    {analysis.metrics.fleschReadingEase}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">/ 100</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">{fleschInfo.note}</p>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      analysis.metrics.fleschReadingEase >= 60
                        ? 'bg-emerald-500'
                        : analysis.metrics.fleschReadingEase >= 40
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${analysis.metrics.fleschReadingEase}%` }}
                  />
                </div>
              </div>

              {/* Core Diagnostic Counters */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30">
                  <span className="text-xs text-slate-400">Grade Level</span>
                  <div className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
                    Grade {analysis.metrics.fleschKincaidGrade}
                  </div>
                  <span className="text-xs text-slate-500">Flesch-Kincaid formula</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30">
                  <span className="text-xs text-slate-400">Avg Sentence Length</span>
                  <div className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
                    {analysis.metrics.averageSentenceLength} <span className="text-xs font-normal text-slate-400">words</span>
                  </div>
                  <span className="text-xs text-slate-500">Ideal: 14–20 words</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30">
                  <span className="text-xs text-slate-400">Word Count</span>
                  <div className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
                    {analysis.metrics.words.toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-500">{analysis.metrics.characters} characters</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30">
                  <span className="text-xs text-slate-400">Reading Time</span>
                  <div className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
                    ~{analysis.metrics.readingTimeMinutes} <span className="text-xs font-normal text-slate-400">min</span>
                  </div>
                  <span className="text-xs text-slate-500">~{analysis.metrics.speakingTimeMinutes} min speech</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Issues & Clichés */}
          {activeTab === 'issues' && (
            <div className="space-y-4">
              {/* Filler phrases list */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  <span>Detected Fillers & Clichés</span>
                  <span className="font-mono text-amber-400">{analysis.fillersList.length}</span>
                </div>

                {analysis.fillersList.length > 0 ? (
                  <div className="space-y-2 mt-3 max-h-56 overflow-y-auto pr-1">
                    {analysis.fillersList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-rose-300">"{item.phrase}"</div>
                          <div className="text-slate-400 text-xs">{item.reason}</div>
                        </div>

                        {item.replacement ? (
                          <button
                            type="button"
                            onClick={() => handleReplaceFiller(item.phrase, item.replacement)}
                            className="px-2 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 rounded hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0"
                          >
                            Replace with "{item.replacement}"
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleReplaceFiller(item.phrase, '')}
                            className="px-2 py-1 text-xs font-medium text-rose-300 bg-rose-950/60 border border-rose-800/80 rounded hover:bg-rose-900 transition-colors whitespace-nowrap shrink-0"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 mt-2">
                    ✓ No common corporate clichés or inflated fillers detected in this text.
                  </p>
                )}
              </div>

              {/* Passive Voice Constructions */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  <span>Passive Voice Flags</span>
                  <span className="font-mono text-amber-400">{analysis.passiveList.length}</span>
                </div>

                {analysis.passiveList.length > 0 ? (
                  <div className="space-y-2 mt-3 max-h-56 overflow-y-auto pr-1">
                    {analysis.passiveList.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs">
                        <div className="text-slate-300 italic">"{item.text}"</div>
                        <div className="text-amber-400 mt-1">
                          Passive auxiliary trigger: <span className="font-mono font-bold">"{item.match}"</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 mt-2">
                    ✓ All sentences are formatted in direct active voice.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Tone Profile */}
          {activeTab === 'rewrite' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Formality Level</span>
                    <span className="font-semibold text-white">{analysis.tone.formality}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full transition-all duration-300"
                      style={{ width: `${analysis.tone.formalityScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluated by contraction density, complex word frequency, and syntactic clause depth.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sentiment Polarity</span>
                    <span className="font-semibold text-white">{analysis.tone.sentiment}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Lexical balance between positive affinity terms and risk/failure vocabulary.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Assertiveness & Confidence</span>
                    <span className="font-semibold text-white font-mono tabular-nums">{analysis.tone.confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${analysis.tone.confidenceScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Ratio of definitive outcome verbs vs. speculative hedging modifiers ("perhaps", "might", "seem").
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
