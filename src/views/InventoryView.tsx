import React, { useState } from 'react';
import { Package, AlertTriangle, AlertCircle, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';
import { SkuItem } from '../types';

interface InventoryViewProps {
  skus: SkuItem[];
  onSelectSku: (sku: SkuItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ skus, onSelectSku }) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'low' | 'healthy'>('all');

  const outOfStock = skus.filter((s) => s.stock === 0);
  const lowStock = skus.filter((s) => s.stock > 0 && s.stock <= 15);
  const healthy = skus.filter((s) => s.stock > 15);

  const displayed = filter === 'critical'
    ? outOfStock
    : filter === 'low'
    ? lowStock
    : filter === 'healthy'
    ? healthy
    : skus;

  const totalAtRiskGMV = outOfStock.reduce((acc, s) => acc + s.sales, 0) +
    lowStock.reduce((acc, s) => acc + s.sales * 0.4, 0);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inventory & Stockout Monitoring</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stock levels, Days of Supply (DOS) velocity forecasting, and WFS replenishment thresholds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{outOfStock.length} Out of Stock</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{lowStock.length} Low Stock</span>
          </div>
        </div>
      </div>

      {/* Stockout Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">In-Stock Catalog Rate</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {((skus.filter(s => s.stock > 0).length / skus.length) * 100).toFixed(1)}%
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">
            Target benchmark: &gt;96% for Walmart Pro Seller status
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Projected 30-Day GMV At Risk</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">
            ${totalAtRiskGMV.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Calculated from sales velocity of 0-stock and low-stock SKUs
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">WFS Inbound Urgency</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {outOfStock.length + lowStock.length} Shipments Needed
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Supplier lead time: ~9-14 business days
          </p>
        </div>
      </div>

      {/* Filter and SKU Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              All Items ({skus.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'critical' ? 'bg-white text-rose-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Out of Stock ({outOfStock.length})
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'low' ? 'bg-white text-amber-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Low Stock ({lowStock.length})
            </button>
            <button
              onClick={() => setFilter('healthy')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'healthy' ? 'bg-white text-emerald-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Healthy ({healthy.length})
            </button>
          </div>
          <span className="text-xs text-slate-400 font-medium">Synced from Walmart Inventory API</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4 text-center">Fulfillment</th>
                <th className="py-3 px-4 text-right">Available Units</th>
                <th className="py-3 px-4 text-right">30d Velocity</th>
                <th className="py-3 px-4 text-right">Days of Supply (DOS)</th>
                <th className="py-3 px-4 text-center">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayed.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectSku(item)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                    {item.sku}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400">{item.subCategory}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                      {item.fulfillmentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold">
                    <span className={item.stock === 0 ? 'text-rose-600' : item.stock <= 15 ? 'text-amber-600' : 'text-slate-800'}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-700">
                    {item.units} units / mo
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium">
                    <span className={item.daysOfSupply === 0 ? 'text-rose-600 font-bold' : item.daysOfSupply < 14 ? 'text-amber-600 font-bold' : 'text-slate-700'}>
                      {item.daysOfSupply} days
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        item.status === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : item.status === 'Low stock'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
