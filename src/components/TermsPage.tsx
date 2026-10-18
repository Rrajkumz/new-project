import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="pb-8 border-b border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Legal & Terms</span>
          <span aria-hidden="true">·</span>
          <span>Effective October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Please review these Terms of Service governing your use of SmartAI Tools, our curated directory, and our client-side software utilities.
        </p>
      </div>

      <div className="py-10 space-y-8 text-sm leading-relaxed text-slate-300 font-sans">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the SmartAI Tools website and related browser-based utilities, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">2. Nature of Services & Limitations</h2>
          <p>
            SmartAI Tools provides educational reference materials, a curated directory of AI software, and deterministic client-side text processing utilities (Writing Helper, Text Summarizer, Prompt Studio).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>
              <strong className="text-slate-200">Algorithmic Limitations: </strong> Our Writing Helper and Extractive Summarizer rely on mathematical heuristics (such as syllable counting formulas and TF-IDF frequency weighting). They are designed as automated editorial aids and do not constitute professional editorial, legal, or financial verification.
            </li>
            <li>
              <strong className="text-slate-200">No Fictitious Claims: </strong> We do not market our browser-based utilities as sentient or autonomous artificial intelligence. All calculations are executed locally and deterministic.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">3. Acceptable Use</h2>
          <p>
            You agree to use SmartAI Tools solely for lawful purposes. You agree not to attempt to reverse engineer malicious exploits, disrupt network infrastructure, or submit spam or misleading software entries to the public directory.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">4. Third-Party Products & Directory Listings</h2>
          <p>
            Listing an AI tool in our directory does not constitute an official endorsement, warranty, or affiliation with the underlying creators. Prices, features, models, and availability are subject to change at the sole discretion of the respective third-party providers. Always verify terms and security practices directly on their official domains.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">5. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            SmartAI Tools is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. To the maximum extent permitted by applicable law, SmartAI Tools and its contributors shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools.
          </p>
        </section>
      </div>
    </div>
  );
};
