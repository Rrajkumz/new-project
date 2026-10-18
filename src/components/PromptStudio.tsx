import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  HelpCircle,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Wand2,
} from 'lucide-react';
import { PROMPTS_DATA } from '../data/promptsData';
import { PromptTemplate } from '../types';
import { evaluateAndOptimizePrompt, PromptAnalysisReport } from '../utils/promptOptimizer';

interface PromptStudioProps {
  onNavigateToWritingHelper?: () => void;
}

export const PromptStudio: React.FC<PromptStudioProps> = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'optimizer' | 'library'>('builder');

  // Builder State
  const [targetModel, setTargetModel] = useState<string>('Claude');
  const [role, setRole] = useState('Senior Staff TypeScript & React Architect');
  const [task, setTask] = useState('Refactor the state management pipeline into clean functional reducers.');
  const [context, setContext] = useState('Web application using React 19 and Tailwind CSS. The app runs 100% in browser memory.');
  const [constraints, setConstraints] = useState('Do not use any external state libraries. Avoid mutation of existing arrays. No conversational preamble or postamble.');
  const [outputFormat, setOutputFormat] = useState('Markdown code block with comprehensive TypeScript types and brief bulleted invariant notes.');
  const [fewShotExamples, setFewShotExamples] = useState<{ input: string; output: string }[]>([
    {
      input: 'const items = []; function add(x) { items.push(x); }',
      output: 'type State = readonly string[];\nconst addItem = (state: State, item: string): State => [...state, item];',
    },
  ]);

  // Optimizer State
  const [rawPromptToOptimize, setRawPromptToOptimize] = useState(
    'Write a blog post about artificial intelligence for software developers.'
  );
  const [optimizationReport, setOptimizationReport] = useState<PromptAnalysisReport | null>(null);

  // Library State
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryCategory, setLibraryCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedBuilder, setCopiedBuilder] = useState(false);

  // Synthesize structured prompt in Builder
  const synthesizedPrompt = useMemo(() => {
    let result = '';

    if (role.trim()) {
      result += `# Role\nYou are a ${role.trim()}.\n\n`;
    }

    if (context.trim()) {
      result += `# Context & Environment\n${context.trim()}\n\n`;
    }

    if (task.trim()) {
      result += `# Primary Directive\n${task.trim()}\n\n`;
    }

    if (constraints.trim()) {
      result += `# Guardrails & Constraints\n${constraints.trim()}\n\n`;
    }

    if (outputFormat.trim()) {
      result += `# Output Specification\n${outputFormat.trim()}\n\n`;
    }

    if (fewShotExamples.length > 0 && fewShotExamples.some(e => e.input.trim())) {
      result += `# Few-Shot Demonstrations\n`;
      fewShotExamples.forEach((ex, idx) => {
        if (ex.input.trim()) {
          result += `### Example ${idx + 1}\n**Input:**\n${ex.input.trim()}\n\n**Expected Output:**\n${ex.output.trim()}\n\n`;
        }
      });
    }

    return result.trim();
  }, [role, context, task, constraints, outputFormat, fewShotExamples]);

  const handleCopyBuilder = () => {
    navigator.clipboard.writeText(synthesizedPrompt);
    setCopiedBuilder(true);
    setTimeout(() => setCopiedBuilder(false), 2000);
  };

  const handleDownloadBuilder = () => {
    const blob = new Blob([synthesizedPrompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `structured-prompt-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddExample = () => {
    setFewShotExamples([...fewShotExamples, { input: '', output: '' }]);
  };

  const handleRemoveExample = (idx: number) => {
    setFewShotExamples(fewShotExamples.filter((_, i) => i !== idx));
  };

  const handleEvaluatePrompt = () => {
    const report = evaluateAndOptimizePrompt(rawPromptToOptimize);
    setOptimizationReport(report);
  };

  const handleLoadPromptFromLibrary = (template: PromptTemplate) => {
    setRole(`Expert specializing in ${template.category}`);
    setTask(template.description);
    setContext(`Target Model: ${template.targetModel}`);
    setConstraints('Follow production engineering best practices. Avoid unnecessary conversational filler.');
    setOutputFormat('Standard Markdown structured format with concrete examples.');
    setActiveTab('builder');
  };

  const filteredPrompts = PROMPTS_DATA.filter((p) => {
    if (libraryCategory !== 'All' && p.category !== libraryCategory) return false;
    if (librarySearch.trim()) {
      const q = librarySearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Prompt Engineering Studio</span>
              <span>·</span>
              <span>Multi-Model Architecture</span>
              <span>·</span>
              <span>Quality Grader</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Prompt Generator & Studio
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Architect modular prompts with explicit roles, negative guardrails, and few-shot schemas. Evaluate draft prompts against production standards.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                activeTab === 'builder' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Prompt Builder
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('optimizer')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                activeTab === 'optimizer' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grader & Optimizer
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                activeTab === 'library' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Prompt Library ({PROMPTS_DATA.length})
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: PROMPT BUILDER */}
      {activeTab === 'builder' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Form Inputs (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Target Model Selector */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Target Model Optimization:
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Claude', 'Gemini', 'ChatGPT', 'Cursor', 'Midjourney', 'Universal'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTargetModel(m)}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      targetModel === m
                        ? 'bg-white text-slate-950 border-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Role & Persona */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                1. Role & Identity Persona
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Senior Systems Architect, Financial Analyst, Copywriter"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-800 focus:border-slate-500 focus:outline-none text-xs text-white placeholder-slate-500"
              />
            </div>

            {/* Primary Directive */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                2. Primary Directive (Task)
              </label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                rows={3}
                placeholder="The single unambiguous outcome or transformation required..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-800 focus:border-slate-500 focus:outline-none text-xs text-white placeholder-slate-500 leading-relaxed"
              />
            </div>

            {/* Operational Context */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                3. Background Context & Environment
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={2}
                placeholder="Stack, business goals, target audience, technical constraints..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-800 focus:border-slate-500 focus:outline-none text-xs text-white placeholder-slate-500 leading-relaxed"
              />
            </div>

            {/* Negative Guardrails */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                4. Negative Constraints (What NEVER to do)
              </label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                rows={2}
                placeholder="e.g., Do not hallucinate citations. Never output conversational pleasantries."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-800 focus:border-slate-500 focus:outline-none text-xs text-white placeholder-slate-500 leading-relaxed"
              />
            </div>

            {/* Output Schema */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                5. Output Schema & Format
              </label>
              <input
                type="text"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                placeholder="e.g., Strictly valid JSON matching { status, summary, actionItems }"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-800 focus:border-slate-500 focus:outline-none text-xs text-white placeholder-slate-500"
              />
            </div>

            {/* Few-Shot Examples Builder */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  6. Few-Shot In-Context Demonstrations (Optional)
                </label>
                <button
                  type="button"
                  onClick={handleAddExample}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Example</span>
                </button>
              </div>

              {fewShotExamples.map((ex, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Demonstration #{idx + 1}</span>
                    {fewShotExamples.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveExample(idx)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={ex.input}
                    onChange={(e) => {
                      const updated = [...fewShotExamples];
                      updated[idx].input = e.target.value;
                      setFewShotExamples(updated);
                    }}
                    placeholder="Input example..."
                    className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={ex.output}
                    onChange={(e) => {
                      const updated = [...fewShotExamples];
                      updated[idx].output = e.target.value;
                      setFewShotExamples(updated);
                    }}
                    placeholder="Expected output example..."
                    className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Synthesized Prompt Output Preview (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Synthesized Structured Prompt
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Calibrated for {targetModel}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyBuilder}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    {copiedBuilder ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBuilder ? 'Copied' : 'Copy Prompt'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBuilder}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
                    title="Download Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Formatted Code View */}
              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[560px]">
                {synthesizedPrompt}
              </pre>

              {/* Best practice tips */}
              <div className="pt-2 text-xs text-slate-400 space-y-1 border-t border-slate-800/80">
                <span className="font-semibold text-slate-300">Prompt Engineering Tip:</span>
                <p>
                  Markdown headers (<code className="text-slate-300"># Role</code>, <code className="text-slate-300"># Directives</code>) allow transformer attention layers to separate system instructions from user payloads without token leakage.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: GRADER & OPTIMIZER */}
      {activeTab === 'optimizer' && (
        <div className="mt-8 space-y-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Prompt Quality Grader & Architecture Optimizer
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Paste an unoptimized or conversational prompt. The analyzer evaluates it against 5 core criteria (Role, Specificity, Context, Format, Guardrails) and produces an enhanced structured version.
            </p>

            <textarea
              value={rawPromptToOptimize}
              onChange={(e) => setRawPromptToOptimize(e.target.value)}
              rows={4}
              placeholder="Paste your rough prompt here..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-slate-500 focus:outline-none text-sm text-white placeholder-slate-500 leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500">Quick tests:</span>
                <button
                  type="button"
                  onClick={() =>
                    setRawPromptToOptimize('Write a blog post about artificial intelligence for software developers.')
                  }
                  className="hover:text-white underline"
                >
                  Vague Request
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() =>
                    setRawPromptToOptimize('Review this SQL query and tell me if anything is wrong with it.')
                  }
                  className="hover:text-white underline"
                >
                  Unconstrained Review
                </button>
              </div>

              <button
                type="button"
                onClick={handleEvaluatePrompt}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Evaluate & Optimize Prompt</span>
              </button>
            </div>
          </div>

          {/* Results Display */}
          {optimizationReport && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Score breakdown (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Overall Prompt Quality Score</span>
                    <span className="font-semibold text-white">{optimizationReport.ratingLabel}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                      {optimizationReport.overallScore}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ 100</span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        optimizationReport.overallScore >= 75
                          ? 'bg-emerald-500'
                          : optimizationReport.overallScore >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${optimizationReport.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Criteria breakdown */}
                <div className="space-y-2.5">
                  {optimizationReport.criteria.map((crit, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-900/30 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{crit.name}</span>
                        <span className="font-mono text-slate-400 tabular-nums">{crit.score}/20</span>
                      </div>
                      <p className="text-slate-400">{crit.feedback}</p>
                      <p className="text-slate-300 font-medium pt-0.5">Recommendation: {crit.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Prompt (7 cols) */}
              <div className="lg:col-span-7 p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Synthesized Production Version
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(optimizationReport.enhancedPrompt);
                      setCopiedId('enhanced');
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    {copiedId === 'enhanced' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'enhanced' ? 'Copied' : 'Copy Optimized Version'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                  {optimizationReport.enhancedPrompt}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: PROMPT LIBRARY */}
      {activeTab === 'library' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Search prompt templates..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none rounded-lg text-xs text-white placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['All', 'Development', 'Writing', 'Marketing', 'Design', 'System Architecture'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLibraryCategory(cat)}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    libraryCategory === cat
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrompts.map((template) => (
              <div
                key={template.id}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-medium text-slate-300">{template.category}</span>
                    <span className="font-mono text-slate-500">{template.targetModel}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{template.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{template.description}</p>

                  <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap line-clamp-4">
                      {template.prompt}
                    </pre>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleLoadPromptFromLibrary(template)}
                    className="text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Load in Builder →
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(template.prompt);
                      setCopiedId(template.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                  >
                    {copiedId === template.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === template.id ? 'Copied' : 'Copy Prompt'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
