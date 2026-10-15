import React from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { PriorityAction } from '../types';

interface ActionDetailModalProps {
  action: PriorityAction | null;
  onClose: () => void;
}

export const ActionDetailModal: React.FC<ActionDetailModalProps> = ({ action, onClose }) => {
  if (!action) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  action.level === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : action.level === 'High'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-sky-50 text-sky-700 border border-sky-200'
                }`}
              >
                {action.level} Priority
              </span>
              {action.sku && (
                <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {action.sku}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 pt-1">{action.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Issue Overview</h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {action.description}
            </p>
          </div>

          {/* Impact Metric */}
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-900">Projected Business Impact</div>
              <div className="text-xs text-emerald-700 font-medium mt-0.5">{action.impactMetric}</div>
            </div>
          </div>

          {/* Recommended Resolution Steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Step-by-Step Resolution Plan
            </h4>
            <div className="space-y-2">
              {action.suggestedSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Walmart Seller Center Location */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Target Walmart Seller Center Path
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100/70 border border-slate-200/60 text-xs font-mono text-slate-700">
              <span>{action.walmartCenterPath}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Read-only guidance</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
