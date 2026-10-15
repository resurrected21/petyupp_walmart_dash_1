import React from 'react';
import { TrendingUp, AlertTriangle, Search, ChevronRight, Sparkles } from 'lucide-react';
import { GrowthSignal } from '../types';

interface GrowthSignalsProps {
  signals: GrowthSignal[];
  onSelectSignal: (signal: GrowthSignal) => void;
  onViewAll: () => void;
}

export const GrowthSignals: React.FC<GrowthSignalsProps> = ({
  signals,
  onSelectSignal,
  onViewAll,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return {
          icon: TrendingUp,
          bg: 'bg-emerald-50 text-emerald-600',
        };
      case 'alert':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-50 text-amber-600',
        };
      case 'search':
      default:
        return {
          icon: Search,
          bg: 'bg-sky-50 text-sky-600',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <h2 className="text-sm font-bold text-slate-900">Growth signals</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View all insights</span>
          <span className="text-sm">→</span>
        </button>
      </div>

      {/* Signal Items List */}
      <div className="space-y-3">
        {signals.map((sig) => {
          const { icon: Icon, bg } = getIcon(sig.icon);
          return (
            <div
              key={sig.id}
              onClick={() => onSelectSignal(sig)}
              className="p-3 rounded-xl border border-slate-200/70 hover:border-slate-300 hover:shadow-xs transition-all flex items-start gap-3.5 cursor-pointer group bg-slate-50/40 hover:bg-white"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {sig.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {sig.description}
                </p>
              </div>

              <div className="text-slate-300 group-hover:text-slate-600 transition-colors pt-1">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
