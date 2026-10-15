import React from 'react';
import { ListFilter, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { PriorityAction } from '../types';

interface PriorityActionQueueProps {
  actions: PriorityAction[];
  onSelectAction: (action: PriorityAction) => void;
  onViewAllActions: () => void;
}

export const PriorityActionQueue: React.FC<PriorityActionQueueProps> = ({
  actions,
  onSelectAction,
  onViewAllActions,
}) => {
  const renderBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60 shrink-0">
            <AlertCircle className="w-3 h-3 text-rose-600 fill-rose-100" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 shrink-0">
            <AlertTriangle className="w-3 h-3 text-amber-600 fill-amber-100" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200/60 shrink-0">
            <Info className="w-3 h-3 text-sky-600" />
            Medium
          </span>
        );
      case 'Info':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/60 shrink-0">
            <Info className="w-3 h-3 text-slate-500" />
            Info
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="text-sky-600">
            <ListFilter className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Priority action queue</h2>
        </div>
        <button
          onClick={onViewAllActions}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View all actions</span>
          <span className="text-sm">→</span>
        </button>
      </div>

      {/* Action Items List */}
      <div className="space-y-3">
        {actions.slice(0, 4).map((act) => (
          <div
            key={act.id}
            className="p-3 rounded-xl border border-slate-200/70 hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 bg-slate-50/40 hover:bg-white"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="mt-0.5">{renderBadge(act.level)}</div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                  {act.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectAction(act)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-sky-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
