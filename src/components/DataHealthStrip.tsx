import React from 'react';
import { DataFeedStatus } from '../types';
import { Clock } from 'lucide-react';

interface DataHealthStripProps {
  statuses: DataFeedStatus[];
  onOpenFeedModal?: (feedId: string) => void;
}

export const DataHealthStrip: React.FC<DataHealthStripProps> = ({ statuses, onOpenFeedModal }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statuses.map(item => {
        const isSalesOrInv = item.id === 'sales' || item.id === 'inventory';
        const isSeo = item.id === 'seo';
        const isAds = item.id === 'ads';

        // dot color
        const dotColor = isSalesOrInv
          ? 'bg-emerald-500'
          : isSeo
          ? 'bg-amber-500'
          : 'bg-slate-300';

        const statusTextColor = isSalesOrInv
          ? 'text-emerald-700 font-semibold'
          : isSeo
          ? 'text-slate-900 font-semibold'
          : 'text-slate-800 font-semibold';

        const barColor = isSalesOrInv
          ? 'bg-emerald-400'
          : isSeo
          ? 'bg-amber-400'
          : 'bg-slate-200';

        return (
          <div
            key={item.id}
            onClick={() => onOpenFeedModal?.(item.id)}
            className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div>
              {/* Feed Title with Status Dot */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-xs font-semibold text-slate-800">{item.title}</span>
              </div>

              {/* Status value / time ago */}
              <div className="flex items-center gap-1.5 text-xs">
                {isSalesOrInv && <Clock className="w-3.5 h-3.5 text-emerald-600" />}
                <span className={statusTextColor}>{item.statusText}</span>
              </div>

              {/* Subtitle / explanation */}
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.syncDetail}</p>
            </div>

            {/* Mini vertical sparkline */}
            <div className="flex items-end gap-1 h-7 pl-3 shrink-0">
              {item.sparkline.map((val, idx) => {
                const heightPercent = val > 0 ? Math.max(15, Math.min(100, (val / 45) * 100)) : 15;
                return (
                  <div
                    key={idx}
                    style={{ height: `${heightPercent}%` }}
                    className={`w-1 rounded-xs ${barColor} group-hover:opacity-90 transition-opacity`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
