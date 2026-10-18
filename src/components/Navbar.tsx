import React, { useState } from 'react';
import { Bookmark, Menu, Plus, X } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  savedCount: number;
  onOpenSubmitModal: () => void;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  savedCount,
  onOpenSubmitModal,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Directory', route: '/tools' },
    { label: 'Writing Helper', route: '/writing-helper' },
    { label: 'Summarizer', route: '/summarizer' },
    { label: 'Prompt Studio', route: '/prompt-generator' },
    { label: 'Guides', route: '/guides' },
  ];

  const handleLinkClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-slate-200 transition-colors"
        >
          SmartAI Tools
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route || (item.route === '/tools' && currentRoute === '/');
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => handleLinkClick(e, item.route)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isActive ? 'text-white border-b-2 border-slate-400 pb-1' : 'text-slate-400'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + subtle saved tool trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenFavorites}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="View bookmarked tools"
            aria-label="View bookmarked tools"
          >
            <Bookmark className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Saved</span>
            <span className="font-mono text-slate-400">({savedCount})</span>
          </button>

          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-slate-100 hover:bg-white rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Tool</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.route}
              href={item.route}
              onClick={(e) => handleLinkClick(e, item.route)}
              className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, '/about')}
              className="block px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200"
            >
              About SmartAI Tools
            </a>
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="block px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
