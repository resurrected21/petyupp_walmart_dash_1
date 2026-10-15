import React, { useState } from 'react';
import { CheckSquare, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { LISTING_AUDIT_DATA } from '../data/baselineData';
import { ListingAuditRecord } from '../types';

export const ListingAuditView: React.FC = () => {
  const [records] = useState<ListingAuditRecord[]>(LISTING_AUDIT_DATA);
  const [selectedRecord, setSelectedRecord] = useState<ListingAuditRecord | null>(records[0]);

  const itemsNeedingAttention = records.filter((r) => r.status !== 'Pass');

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Walmart Listing Quality & Catalog Audit</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {itemsNeedingAttention.length} Items Require Optimization
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated compliance checks against Walmart Style Guides, attribute completeness standards, and image resolution rules.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
          Average Catalog Listing Score: <strong className="text-emerald-700 font-bold">87/100</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Listing Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Catalog Audit Roster</span>
            <span className="text-xs text-slate-400">Click any item for attribute breakdown</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Product Title</th>
                  <th className="py-3 px-4 text-center">Quality Score</th>
                  <th className="py-3 px-4 text-center">Missing Specs</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((item) => {
                  const isSelected = selectedRecord?.sku === item.sku;
                  return (
                    <tr
                      key={item.sku}
                      onClick={() => setSelectedRecord(item)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        isSelected ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                        {item.sku}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-bold text-xs ${
                            item.score >= 90
                              ? 'text-emerald-600'
                              : item.score >= 80
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {item.score}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-600">
                        {item.missingAttributes.length > 0 ? (
                          <span className="text-amber-700 font-semibold">
                            {item.missingAttributes.length} missing
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-medium">Complete</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            item.status === 'Pass'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.status === 'Needs Attention'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Item Deep-Dive Panel */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Item Diagnostic Detail
            </h3>
            {selectedRecord && (
              <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {selectedRecord.sku}
              </span>
            )}
          </div>

          {selectedRecord ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{selectedRecord.title}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-slate-500">Listing Quality Score:</div>
                  <div className="text-sm font-bold text-slate-900">{selectedRecord.score}/100</div>
                </div>
              </div>

              {/* Missing Attributes */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2">
                  Missing High-Priority Attributes:
                </div>
                {selectedRecord.missingAttributes.length > 0 ? (
                  <div className="space-y-1.5">
                    {selectedRecord.missingAttributes.map((attr, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-[11px] text-amber-900 font-medium flex items-center gap-2"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>All required and recommended attributes are present.</span>
                  </div>
                )}
              </div>

              {/* Title & Image Feedback */}
              {(selectedRecord.titleIssues || selectedRecord.imageIssues || selectedRecord.bulletIssues) && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700">Optimization Feedback:</div>
                  {selectedRecord.titleIssues && (
                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong>Title:</strong> {selectedRecord.titleIssues}
                    </p>
                  )}
                  {selectedRecord.imageIssues && (
                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong>Image:</strong> {selectedRecord.imageIssues}
                    </p>
                  )}
                  {selectedRecord.bulletIssues && (
                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong>Description Bullets:</strong> {selectedRecord.bulletIssues}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select a SKU to view listing audit diagnostics.</p>
          )}
        </div>
      </div>
    </div>
  );
};
