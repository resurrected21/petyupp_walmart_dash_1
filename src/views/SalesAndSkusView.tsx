import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, ArrowUpDown, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { SkuItem, StockStatus } from '../types';

interface SalesAndSkusViewProps {
  skus: SkuItem[];
  onSelectSku: (sku: SkuItem) => void;
}

export const SalesAndSkusView: React.FC<SalesAndSkusViewProps> = ({ skus, onSelectSku }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | StockStatus>('All');
  const [sortField, setSortField] = useState<keyof SkuItem>('sales');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredSkus = useMemo(() => {
    return skus
      .filter((item) => {
        const matchesSearch =
          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [skus, searchQuery, statusFilter, sortField, sortAsc]);

  const totalSales = skus.reduce((acc, s) => acc + s.sales, 0);
  const totalUnits = skus.reduce((acc, s) => acc + s.units, 0);

  const handleExportCsv = () => {
    const headers = 'SKU,Product Name,Category,Sub-Category,Gross Sales,Units Sold,Price,CTR (%),Stock,Buy Box (%),Status\n';
    const rows = filteredSkus
      .map(
        (s) =>
          `"${s.sku}","${s.title}","${s.category}","${s.subCategory}",${s.sales},${s.units},${s.price},${s.ctr},${s.stock},${s.buyBoxPercentage},"${s.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `petyupp_walmart_sku_performance_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Sales & SKU Performance Matrix</h2>
          <p className="text-xs text-slate-500 mt-1">
            Granular breakdown of item revenue, conversion rates, inventory velocity, and Buy Box retention.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right">
            <span className="text-slate-400 block font-medium">Catalog Revenue</span>
            <span className="text-base font-bold text-slate-900">
              ${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-slate-400 block font-medium">Total Units Sold</span>
            <span className="text-base font-bold text-slate-900">{totalUnits.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Revenue Concentration Indicator */}
      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs text-slate-700">
            <strong className="text-emerald-900 font-bold">Pareto Distribution: </strong>
            Top 12 SKUs generate <strong className="text-emerald-900">64% of total marketplace GMV</strong>.
            Safeguarding stock for top performers is PetYupp's highest leverage growth priority.
          </div>
        </div>
        <button
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by SKU, title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
            {(['All', 'Healthy', 'Low stock', 'Out of stock'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Product Name</th>
                <th
                  onClick={() => {
                    if (sortField === 'sales') setSortAsc(!sortAsc);
                    else { setSortField('sales'); setSortAsc(false); }
                  }}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-700"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Sales (USD)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => {
                    if (sortField === 'units') setSortAsc(!sortAsc);
                    else { setSortField('units'); setSortAsc(false); }
                  }}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-700"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Units</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">CTR</th>
                <th className="py-3 px-4 text-right">Stock</th>
                <th className="py-3 px-4 text-right">Buy Box</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSkus.map((item) => (
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
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    ${item.sales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                    {item.units}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600">
                    {item.ctr.toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold">
                    <span className={item.stock === 0 ? 'text-rose-600' : item.stock <= 15 ? 'text-amber-600' : 'text-slate-800'}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600">
                    {item.buyBoxPercentage.toFixed(1)}%
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
