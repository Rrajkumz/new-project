import React, { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { AITool, ToolCategory, ToolPricing } from '../types';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tool: AITool) => void;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [category, setCategory] = useState<Exclude<ToolCategory, 'All'>>('Coding & Dev');
  const [pricing, setPricing] = useState<Exclude<ToolPricing, 'All'>>('Freemium');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [primaryUse, setPrimaryUse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !website.trim() || !description.trim()) return;

    const newTool: AITool = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Community-submitted AI tool',
      description: description.trim(),
      category,
      pricing,
      website: website.startsWith('http') ? website.trim() : `https://${website.trim()}`,
      features: ['Community verified', 'Recently added to directory'],
      pros: ['User submitted utility', 'Indexed in SmartAI Tools directory'],
      cons: ['Editorial audit in progress'],
      rating: 5.0,
      ratingCount: 1,
      primaryUse: primaryUse.trim() || 'General AI productivity',
      releaseYear: new Date().getFullYear(),
    };

    onSubmit(newTool);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Submit an AI Tool</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Add your AI product or open-source project to the public directory.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Tool Added to Directory!</h4>
            <p className="text-xs text-slate-400">
              Your tool has been saved and is now visible in the directory listing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Tool Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CodeStream AI"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Website URL *</label>
                <input
                  type="text"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Exclude<ToolCategory, 'All'>)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white"
                >
                  <option value="Coding & Dev">Coding & Dev</option>
                  <option value="Writing & Content">Writing & Content</option>
                  <option value="Image & Design">Image & Design</option>
                  <option value="Audio & Speech">Audio & Speech</option>
                  <option value="Video & Motion">Video & Motion</option>
                  <option value="Productivity & Search">Productivity & Search</option>
                  <option value="Research & Data">Research & Data</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Pricing Model</label>
                <select
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value as Exclude<ToolPricing, 'All'>)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white"
                >
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Tagline (One-line description)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Real-time multi-agent code debugger"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Description *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What core problem does this tool solve? What are its primary features?"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Best For (Use Case)</label>
              <input
                type="text"
                value={primaryUse}
                onChange={(e) => setPrimaryUse(e.target.value)}
                placeholder="e.g. Automated test generation, blog writing, podcast dubbing"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit Tool</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
