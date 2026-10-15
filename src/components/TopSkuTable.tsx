import React from 'react';
import { BarChart3 } from 'lucide-react';
import { SkuItem, StockStatus } from '../types';

interface TopSkuTableProps {
  skus: SkuItem[];
  onSelectSku: (sku: SkuItem) => void;
  onViewAllSkus: () => void;
}

export const TopSkuTable: React.FC<TopSkuTableProps> = ({
  skus,
  onSelectSku,
  onViewAllSkus,
}) => {
  const renderProductIcon = (skuCode: string) => {
    switch (skuCode) {
      case 'PY-BOWL-24':
        return (
          <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0 text-slate-700">
            {/* Stainless steel bowl icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z" />
              <ellipse cx="12" cy="10" rx="9" ry="2.5" fill="#cbd5e1" />
            </svg>
          </div>
        );
      case 'PY-YAK-M':
        return (
          <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center p-1 shrink-0 text-amber-700">
            {/* Yak chew stick */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <rect x="5" y="4" width="5" height="16" rx="2" transform="rotate(-25 7 12)" fill="#d97706" />
              <rect x="12" y="4" width="5" height="16" rx="2" transform="rotate(-25 14 12)" fill="#f59e0b" />
            </svg>
          </div>
        );
      case 'PY-BUCKET-4':
        return (
          <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0 text-slate-600">
            {/* Flat side bucket */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M5 8h14l-2 12H7L5 8z" fill="#94a3b8" />
              <path d="M6 8c0-3 2.7-5 6-5s6 2 6 5" fill="none" stroke="#64748b" strokeWidth="2" />
            </svg>
          </div>
        );
      case 'PY-LEATHER-R':
        return (
          <div className="w-8 h-8 rounded-md bg-amber-100/60 border border-amber-200 flex items-center justify-center p-1 shrink-0 text-amber-800">
            {/* Leather ring toy */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <circle cx="12" cy="12" r="8" fill="none" stroke="#b45309" strokeWidth="3.5" />
            </svg>
          </div>
        );
      case 'PY-TREAT-C':
        return (
          <div className="w-8 h-8 rounded-md bg-orange-50 border border-orange-200 flex items-center justify-center p-1 shrink-0 text-amber-700">
            {/* Treat pouch */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M6 6l2-2h8l2 2v14H6V6z" fill="#f59e0b" />
              <rect x="8" y="10" width="8" height="6" rx="1" fill="#fef3c7" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0 text-slate-500 text-[10px] font-bold">
            SKU
          </div>
        );
    }
  };

  const getStatusBadge = (status: StockStatus) => {
    switch (status) {
      case 'Healthy':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Healthy
          </span>
        );
      case 'Low stock':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            Low stock
          </span>
        );
      case 'Out of stock':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
            Out of stock
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="text-emerald-600">
            <BarChart3 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Top SKU performance</h2>
        </div>
        <button
          onClick={onViewAllSkus}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View all SKUs</span>
          <span className="text-sm">→</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-2.5 font-medium pl-1">SKU</th>
              <th className="pb-2.5 font-medium">Product</th>
              <th className="pb-2.5 font-medium text-right pr-4">Sales</th>
              <th className="pb-2.5 font-medium text-right pr-4">Units</th>
              <th className="pb-2.5 font-medium text-right pr-4">CTR</th>
              <th className="pb-2.5 font-medium text-right pr-4">Stock</th>
              <th className="pb-2.5 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {skus.slice(0, 5).map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectSku(item)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                {/* SKU Code */}
                <td className="py-3 font-mono text-slate-600 font-medium pl-1 whitespace-nowrap">
                  {item.sku}
                </td>

                {/* Product Name + Icon + Category */}
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2.5 min-w-[200px]">
                    {renderProductIcon(item.sku)}
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.subCategory}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Sales */}
                <td className="py-3 text-right pr-4 font-semibold text-slate-900 whitespace-nowrap">
                  ${item.sales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>

                {/* Units */}
                <td className="py-3 text-right pr-4 text-slate-700 font-medium whitespace-nowrap">
                  {item.units}
                </td>

                {/* CTR */}
                <td className="py-3 text-right pr-4 text-slate-600 font-medium whitespace-nowrap">
                  {item.ctr.toFixed(1)}%
                </td>

                {/* Stock */}
                <td className="py-3 text-right pr-4 font-semibold whitespace-nowrap">
                  <span className={item.stock === 0 ? 'text-rose-600' : item.stock <= 15 ? 'text-amber-600' : 'text-slate-800'}>
                    {item.stock}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="py-3 text-center whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
