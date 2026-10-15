import React from 'react';
import { ShoppingCart, Package, Tag, Layers, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface KpiCardsProps {
  grossSales: number;
  grossSalesChangePct: number;
  unitsSold: number;
  unitsSoldChangePct: number;
  activeSkus: number;
  activeSkusChange: number;
  inStockRate: number;
  inStockRateChangePct: number;
  comparisonLabel: string;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  grossSales,
  grossSalesChangePct,
  unitsSold,
  unitsSoldChangePct,
  activeSkus,
  activeSkusChange,
  inStockRate,
  inStockRateChangePct,
  comparisonLabel,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Gross Sales */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <span>Gross sales</span>
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                ${grossSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          {/* Sparkline SVG */}
          <div className="w-16 h-8 shrink-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 64 24">
              <path
                d="M 2 18 Q 16 14, 28 16 T 44 8 T 62 4"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="font-semibold">+{grossSalesChangePct}%</span>
          <span className="text-slate-500 font-normal">{comparisonLabel}</span>
        </div>
      </div>

      {/* 2. Units Sold */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <span>Units sold</span>
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                {unitsSold.toLocaleString('en-US')}
              </div>
            </div>
          </div>
          {/* Sparkline SVG */}
          <div className="w-16 h-8 shrink-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 64 24">
              <path
                d="M 2 20 Q 18 16, 32 18 T 48 10 T 62 6"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="font-semibold">+{unitsSoldChangePct}%</span>
          <span className="text-slate-500 font-normal">{comparisonLabel}</span>
        </div>
      </div>

      {/* 3. Active SKUs */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <span>Active SKUs</span>
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                {activeSkus}
              </div>
            </div>
          </div>
          {/* Mini Bar Sparkline */}
          <div className="flex items-end gap-1 h-7 shrink-0">
            {[30, 45, 55, 70, 85, 100].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-1 bg-slate-300 rounded-xs"
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">+{activeSkusChange} new</span>
          <span>{comparisonLabel}</span>
        </div>
      </div>

      {/* 4. In-Stock Rate */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <span>In-stock rate</span>
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                {inStockRate.toFixed(1)}%
              </div>
            </div>
          </div>
          {/* Downward Sparkline SVG */}
          <div className="w-16 h-8 shrink-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 64 24">
              <path
                d="M 2 4 Q 18 6, 28 10 T 46 14 T 62 19"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-amber-600">
          <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="font-semibold">{inStockRateChangePct}%</span>
          <span className="text-slate-500 font-normal">{comparisonLabel}</span>
        </div>
      </div>
    </div>
  );
};
