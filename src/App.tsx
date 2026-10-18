import React, { useEffect, useState } from 'react';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { GuideDetail } from './components/GuideDetail';
import { GuidesSection } from './components/GuidesSection';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { PrivacyPage } from './components/PrivacyPage';
import { PromptStudio } from './components/PromptStudio';
import { SavedToolsModal } from './components/SavedToolsModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { TermsPage } from './components/TermsPage';
import { TextSummarizer } from './components/TextSummarizer';
import { ToolsDirectory } from './components/ToolsDirectory';
import { WritingHelper } from './components/WritingHelper';
import { GUIDES_DATA } from './data/guidesData';
import { INITIAL_AI_TOOLS } from './data/toolsData';
import { AITool, Guide, ToolCategory } from './types';

export default function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Tools state with custom user submissions
  const [tools, setTools] = useState<AITool[]>(() => {
    try {
      const stored = localStorage.getItem('smartai_custom_tools');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...parsed, ...INITIAL_AI_TOOLS];
      }
    } catch {
      // fallback
    }
    return INITIAL_AI_TOOLS;
  });

  // Bookmarked tool IDs
  const [savedToolIds, setSavedToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('smartai_saved_tool_ids');
      return stored ? JSON.parse(stored) : ['cursor', 'claude', 'notebooklm'];
    } catch {
      return ['cursor', 'claude', 'notebooklm'];
    }
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Sync saved tools to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartai_saved_tool_ids', JSON.stringify(savedToolIds));
    } catch (err) {
      console.error('Failed to save bookmarks to localStorage', err);
    }
  }, [savedToolIds]);

  // Handle URL change via popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      resolveGuideFromPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    resolveGuideFromPath(window.location.pathname || '/');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const resolveGuideFromPath = (path: string) => {
    if (path.startsWith('/guides/')) {
      const guideId = path.replace('/guides/', '');
      const found = GUIDES_DATA.find((g) => g.id === guideId || g.slug === guideId);
      if (found) {
        setSelectedGuide(found);
      }
    } else {
      setSelectedGuide(null);
    }
  };

  const navigate = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Ignore if pushState fails in some sandboxes
    }
    setCurrentPath(path);
    resolveGuideFromPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic SEO title update
    if (path === '/' || path === '/tools') {
      document.title = 'SmartAI Tools – AI Tools Directory, Writing Helper & Prompt Studio';
    } else if (path === '/writing-helper') {
      document.title = 'Browser Writing Helper – Readability & Style Analysis | SmartAI Tools';
    } else if (path === '/summarizer') {
      document.title = 'Extractive Text Summarizer – Key Takeaways Without Hallucination | SmartAI Tools';
    } else if (path === '/prompt-generator') {
      document.title = 'Prompt Generator & Grader Studio | SmartAI Tools';
    } else if (path === '/guides') {
      document.title = 'AI Guides & Technical Whitepapers | SmartAI Tools';
    } else if (path === '/about') {
      document.title = 'About Us & Privacy Architecture | SmartAI Tools';
    } else if (path === '/contact') {
      document.title = 'Contact & Support | SmartAI Tools';
    } else if (path === '/privacy') {
      document.title = 'Privacy Policy – Zero Telemetry Guarantee | SmartAI Tools';
    } else if (path === '/terms') {
      document.title = 'Terms of Service | SmartAI Tools';
    }
  };

  const handleToggleSave = (id: string) => {
    setSavedToolIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomTool = (tool: AITool) => {
    setTools((prev) => [tool, ...prev]);
    try {
      const stored = localStorage.getItem('smartai_custom_tools');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('smartai_custom_tools', JSON.stringify([tool, ...existing]));
    } catch (err) {
      console.error('Error persisting custom tool', err);
    }
  };

  const savedToolsList = tools.filter((t) => savedToolIds.includes(t.id));

  // Determine active view based on path
  const isHomePage = currentPath === '/' || currentPath === '/tools';
  const isWritingHelper = currentPath === '/writing-helper';
  const isSummarizer = currentPath === '/summarizer';
  const isPromptStudio = currentPath === '/prompt-generator';
  const isGuides = currentPath === '/guides' && !selectedGuide;
  const isGuideDetail = currentPath.startsWith('/guides/') || selectedGuide !== null;
  const isAbout = currentPath === '/about';
  const isContact = currentPath === '/contact';
  const isPrivacy = currentPath === '/privacy';
  const isTerms = currentPath === '/terms';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-slate-800 selection:text-white">
      {/* Top Bar Contract compliant Navigation */}
      <Navbar
        currentRoute={currentPath}
        onNavigate={navigate}
        savedCount={savedToolIds.length}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenFavorites={() => setIsSavedModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isHomePage && (
          <>
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectCategory={setSelectedCategory}
              onNavigate={navigate}
            />
            <ToolsDirectory
              tools={tools}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              savedToolIds={savedToolIds}
              onToggleSave={handleToggleSave}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </>
        )}

        {isWritingHelper && <WritingHelper />}

        {isSummarizer && <TextSummarizer />}

        {isPromptStudio && <PromptStudio />}

        {isGuides && (
          <GuidesSection
            onSelectGuide={(guide) => {
              setSelectedGuide(guide);
              navigate(`/guides/${guide.id}`);
            }}
          />
        )}

        {isGuideDetail && selectedGuide && (
          <GuideDetail
            guide={selectedGuide}
            onBack={() => {
              setSelectedGuide(null);
              navigate('/guides');
            }}
          />
        )}

        {isAbout && <AboutPage onNavigate={navigate} />}

        {isContact && <ContactPage />}

        {isPrivacy && <PrivacyPage />}

        {isTerms && <TermsPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Modals */}
      <SubmitToolModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleAddCustomTool}
      />

      <SavedToolsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTools={savedToolsList}
        onRemoveSaved={handleToggleSave}
        onSelectTool={(tool) => {
          setIsSavedModalOpen(false);
          setSearchQuery(tool.name);
          navigate('/tools');
        }}
      />
    </div>
  );
}
