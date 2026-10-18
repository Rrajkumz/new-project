import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="pb-8 border-b border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Legal & Transparency</span>
          <span aria-hidden="true">·</span>
          <span>Effective October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          At SmartAI Tools, we believe in mathematical privacy: our browser-based tools run locally on your device without sending your text, drafts, or prompts to remote servers.
        </p>
      </div>

      <div className="py-10 space-y-8 text-sm leading-relaxed text-slate-300 font-sans">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">1. Client-Side Processing Architecture</h2>
          <p>
            When you use the <strong className="text-white">Writing Helper</strong>, the <strong className="text-white">Text Summarizer</strong>, or the <strong className="text-white">Prompt Studio</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>All tokenization, syllable counting, Flesch formula evaluation, and sentence scoring algorithms run in your browser's local JavaScript engine.</li>
            <li>No text is transmitted across the internet to our servers or to third-party artificial intelligence cloud APIs (such as OpenAI, Anthropic, or Google) during the use of these built-in utilities.</li>
            <li>Your input drafts are stored solely in volatile browser RAM and are permanently cleared when you close or refresh the web page.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">2. Information We Do Not Collect</h2>
          <p>
            We do not collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Any proprietary code, documents, essays, or personal text pasted into our tools.</li>
            <li>Biometric or keystroke telemetry.</li>
            <li>Cross-site tracking identifiers or marketing cookies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">3. Local Storage Usage</h2>
          <p>
            SmartAI Tools uses modern HTML5 <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">localStorage</code> exclusively on your device to persist:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Your bookmarked/saved AI tools list so that your preferences survive page refreshes.</li>
            <li>Community tools you have submitted locally.</li>
          </ul>
          <p>
            This data never leaves your browser and can be completely wiped at any time by clearing your browser cache.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">4. External Links to Third-Party AI Platforms</h2>
          <p>
            Our AI Tools Directory links to external websites and software providers (e.g., Cursor, Anthropic, Midjourney, Stability AI). Each third-party service operates under its own distinct terms of service and privacy agreements. We encourage you to review their specific data collection practices and model-training opt-outs before submitting confidential information to external platforms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions regarding our privacy architecture or require technical confirmation of our zero-telemetry implementation, please contact us via our Contact page or at <span className="font-mono text-slate-200">privacy@smartaitools.app</span>.
          </p>
        </section>
      </div>
    </div>
  );
};
