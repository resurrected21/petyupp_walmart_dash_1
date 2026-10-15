import React from 'react';
import { X, TrendingUp, Package, ShieldCheck, ShoppingCart, Percent, Eye, MousePointer } from 'lucide-react';
import { SkuItem } from '../types';

interface SkuDetailModalProps {
  sku: SkuItem | null;
  onClose: () => void;
}

export const SkuDetailModal: React.FC<SkuDetailModalProps> = ({ sku, onClose }) => {
  if (!sku) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                {sku.sku}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {sku.category} › {sku.subCategory}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 pt-1">{sku.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Stats */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Gross Sales</div>
              <div className="text-base font-bold text-slate-900 mt-1">
                ${sku.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Units Sold</div>
              <div className="text-base font-bold text-slate-900 mt-1">{sku.units}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Click-Through Rate</div>
              <div className="text-base font-bold text-slate-900 mt-1">{sku.ctr.toFixed(1)}%</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Available Stock</div>
              <div
                className={`text-base font-bold mt-1 ${
                  sku.stock === 0 ? 'text-rose-600' : sku.stock <= 15 ? 'text-amber-600' : 'text-slate-900'
                }`}
              >
                {sku.stock} units
              </div>
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Walmart Operational Signals
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Buy Box Win Rate:</span>
                <span className="font-semibold text-slate-800">{sku.buyBoxPercentage.toFixed(1)}%</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Days of Supply (DOS):</span>
                <span className="font-semibold text-slate-800">{sku.daysOfSupply} days</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Fulfillment Method:</span>
                <span className="font-semibold text-slate-800">{sku.fulfillmentType === 'WFS' ? 'Walmart Fulfillment Services (WFS)' : 'Seller Fulfilled'}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Page Views & Clicks:</span>
                <span className="font-semibold text-slate-800">{sku.pageViews.toLocaleString()} views ({sku.clicks} clicks)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Listing Quality Score:</span>
                <span className="font-semibold text-emerald-700">{sku.listingScore ?? 92}/100</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Note */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Recommendation: </span>
            {sku.stock === 0
              ? 'This SKU is completely out of stock. Immediate replenishment order or stock reallocation is required to preserve search ranking.'
              : sku.stock <= 15
              ? 'Inventory is below the 14-day safety threshold. Consider creating an inbound WFS shipment today.'
              : 'Inventory velocity and stock levels are healthy. Focus on maintaining competitive pricing and high buy box retention.'}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Source: Item Performance Report (v1)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
