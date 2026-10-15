import React, { useState } from 'react';
import { Search, TrendingUp, ArrowUp, ArrowDown, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { OrganicKeyword } from '../types';
import { ORGANIC_KEYWORDS } from '../data/baselineData';

export const OrganicSeoView: React.FC = () => {
  const [keywords, setKeywords] = useState<OrganicKeyword[]>(ORGANIC_KEYWORDS);
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = keywords.filter((k) =>
    k.keyword.toLowerCase().includes(searchFilter.toLowerCase()) ||
    k.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Walmart Organic SEO & Search Insights</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Weekly Walmart Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track customer search queries on Walmart.com, keyword rank velocity, and low-competition listing optimization targets.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Last weekly report generation: <strong>Oct 8, 2026</strong></span>
        </div>
      </div>

      {/* High-Impact Insight Banner */}
      <div className="p-4 bg-sky-50/70 rounded-xl border border-sky-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
          <div className="text-xs text-slate-700">
            <strong className="text-sky-900 font-bold">17 High-Potential Keywords Found: </strong>
            Pet bowls and natural dog treats show elevated Q4 search demand on Walmart. Incorporating phrases like "stainless steel dog bowl 24 oz" into item title bullets can capture up to +2,400 organic search impressions.
          </div>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Walmart queries..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">{filtered.length} tracked keywords</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Search Query</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Search Volume (Mo)</th>
                <th className="py-3 px-4 text-center">Walmart Rank</th>
                <th className="py-3 px-4 text-center">Trend</th>
                <th className="py-3 px-4 text-center">Competition</th>
                <th className="py-3 px-4 text-right">Estimated Clicks</th>
                <th className="py-3 px-4 text-center">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((kw) => {
                const rankDelta = kw.previousRank - kw.rank;
                return (
                  <tr key={kw.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {kw.keyword}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {kw.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-slate-800">
                      {kw.searchVolume.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 font-bold text-slate-800 text-xs">
                        #{kw.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {rankDelta > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold text-xs">
                          <ArrowUp className="w-3.5 h-3.5" />+{rankDelta}
                        </span>
                      ) : rankDelta < 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-rose-600 font-semibold text-xs">
                          <ArrowDown className="w-3.5 h-3.5" />{rankDelta}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          kw.competition === 'Low'
                            ? 'bg-emerald-50 text-emerald-700'
                            : kw.competition === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {kw.competition}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-700">
                      ~{kw.estimatedClicks.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${kw.opportunityScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 text-[11px]">
                          {kw.opportunityScore}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
