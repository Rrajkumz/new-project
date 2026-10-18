import React from 'react';
import { Bookmark, ExternalLink, Trash2, X } from 'lucide-react';
import { AITool } from '../types';

interface SavedToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTools: AITool[];
  onRemoveSaved: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
}

export const SavedToolsModal: React.FC<SavedToolsModalProps> = ({
  isOpen,
  onClose,
  savedTools,
  onRemoveSaved,
  onSelectTool,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Bookmarked AI Tools ({savedTools.length})
            </h3>
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

        <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
          {savedTools.length > 0 ? (
            savedTools.map((tool) => (
              <div
                key={tool.id}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 flex items-center justify-between gap-3 text-xs transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-slate-400 mb-0.5">
                    <span className="font-semibold text-white">{tool.name}</span>
                    <span>·</span>
                    <span>{tool.category}</span>
                    <span>·</span>
                    <span className="text-slate-300 font-mono">{tool.pricing}</span>
                  </div>
                  <p className="text-slate-400 truncate">{tool.tagline}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800"
                    title="Visit website"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onRemoveSaved(tool.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="font-semibold text-white">No bookmarked tools yet</p>
              <p className="text-slate-500 max-w-xs mx-auto">
                Click the bookmark icon on any card in the directory to save tools for quick access here.
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
