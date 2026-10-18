import React from 'react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <span className="text-base font-bold text-white tracking-tight">SmartAI Tools</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated directory of leading AI solutions alongside private, in-browser writing assistance and precision prompt engineering utilities.
            </p>
            <div className="text-xs text-slate-500 pt-2">
              <span>Local Browser Execution</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Zero Server Telemetry</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-3">Directory & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/tools" onClick={(e) => handleNav(e, '/tools')} className="hover:text-white transition-colors">
                  AI Tools Directory
                </a>
              </li>
              <li>
                <a href="/writing-helper" onClick={(e) => handleNav(e, '/writing-helper')} className="hover:text-white transition-colors">
                  Browser Writing Helper
                </a>
              </li>
              <li>
                <a href="/summarizer" onClick={(e) => handleNav(e, '/summarizer')} className="hover:text-white transition-colors">
                  Text Summarizer
                </a>
              </li>
              <li>
                <a href="/prompt-generator" onClick={(e) => handleNav(e, '/prompt-generator')} className="hover:text-white transition-colors">
                  Prompt Generator & Studio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-3">Guides & Knowledge</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/guides" onClick={(e) => handleNav(e, '/guides')} className="hover:text-white transition-colors">
                  All Educational Guides
                </a>
              </li>
              <li>
                <a href="/guides/prompt-engineering-masterclass" onClick={(e) => handleNav(e, '/guides/prompt-engineering-masterclass')} className="hover:text-white transition-colors">
                  Prompt Engineering Guide
                </a>
              </li>
              <li>
                <a href="/guides/extractive-vs-abstractive-summarization" onClick={(e) => handleNav(e, '/guides/extractive-vs-abstractive-summarization')} className="hover:text-white transition-colors">
                  Extractive NLP Architecture
                </a>
              </li>
              <li>
                <a href="/guides/choosing-the-right-ai-model" onClick={(e) => handleNav(e, '/guides/choosing-the-right-ai-model')} className="hover:text-white transition-colors">
                  Choosing the Right Model
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/about" onClick={(e) => handleNav(e, '/about')} className="hover:text-white transition-colors">
                  About Us & Philosophy
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-white transition-colors">
                  Contact & Support
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleNav(e, '/privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleNav(e, '/terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SmartAI Tools. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" onClick={(e) => handleNav(e, '/privacy')} className="hover:text-slate-300">Privacy</a>
            <span>·</span>
            <a href="/terms" onClick={(e) => handleNav(e, '/terms')} className="hover:text-slate-300">Terms</a>
            <span>·</span>
            <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-slate-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
