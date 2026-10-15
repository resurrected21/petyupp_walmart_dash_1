import React from 'react';
import { Info, Upload, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DataSourceMode } from '../types';

interface FooterBannerProps {
  dataSourceMode: DataSourceMode;
  lastSyncTimestamp: string;
  onOpenSourceModal: () => void;
}

export const FooterBanner: React.FC<FooterBannerProps> = ({
  dataSourceMode,
  lastSyncTimestamp,
  onOpenSourceModal,
}) => {
  return (
    <footer className="mt-8 pt-4 pb-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-3">
      {/* Left Disclaimer / Source Status */}
      <div className="flex items-center gap-2">
        {dataSourceMode === 'demo_preview' ? (
          <>
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Illustrative preview data — not live seller metrics. Figures shown are for demonstration purposes only.
            </span>
            <button
              onClick={onOpenSourceModal}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 ml-1 underline cursor-pointer"
            >
              Connect Real Account or Upload CSV
            </button>
          </>
        ) : dataSourceMode === 'uploaded_report' ? (
          <>
            <Upload className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="font-medium text-slate-700">
              Active dataset: Custom Uploaded Walmart Report (Read-only parsed session)
            </span>
            <button
              onClick={onOpenSourceModal}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 ml-1 underline cursor-pointer"
            >
              Change file
            </button>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium text-emerald-800">
              Live Walmart Marketplace Ingestion (Item Performance + Inventory feeds active)
            </span>
          </>
        )}
      </div>

      {/* Right Timestamp & Sync Indicator */}
      <div className="flex items-center gap-2 shrink-0 text-slate-500 font-medium">
        <span>Last sync check: {lastSyncTimestamp}</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
      </div>
    </footer>
  );
};
