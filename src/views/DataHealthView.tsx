import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { DataFeedStatus } from '../types';

interface DataHealthViewProps {
  statuses: DataFeedStatus[];
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

export const DataHealthView: React.FC<DataHealthViewProps> = ({
  statuses,
  onRefreshAll,
  isRefreshing,
}) => {
  const syncLogs = [
    {
      id: 'log-1',
      feed: 'Item Performance Report (v1)',
      type: 'Asynchronous Walmart Job',
      timestamp: '2026-10-15 04:10:22 UTC',
      status: 'Success',
      records: 126,
      latency: '1.2s',
      period: '2026-09-15 to 2026-10-14',
    },
    {
      id: 'log-2',
      feed: 'Inventory Feeds',
      type: 'Direct API Endpoint',
      timestamp: '2026-10-15 03:52:10 UTC',
      status: 'Success',
      records: 142,
      latency: '340ms',
      period: 'Live snapshot',
    },
    {
      id: 'log-3',
      feed: 'Search Insights Feed',
      type: 'Weekly Batch Ingestion',
      timestamp: '2026-10-08 00:00:00 UTC',
      status: 'Success',
      records: 48,
      latency: '2.8s',
      period: 'Week ending Oct 7, 2026',
    },
    {
      id: 'log-4',
      feed: 'Walmart Connect Advertising',
      type: '3P Advertising Gateway',
      timestamp: '—',
      status: 'Unconnected',
      records: 0,
      latency: '—',
      period: 'Awaiting authorization',
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Data Freshness & Source Health Audit</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              3 of 4 Feeds Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete transparency into Walmart API ingestion timestamps, cadences, latency, and report generation lags.
          </p>
        </div>

        <button
          onClick={onRefreshAll}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Checking Health...' : 'Run Diagnostics'}</span>
        </button>
      </div>

      {/* Cadence Rules Table */}
      <div className="p-4 bg-slate-100/70 rounded-xl border border-slate-200/60 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-600" />
          <span>Honest Cadence Standard:</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-600">
          Walmart Seller APIs use asynchronous reporting with varying source refresh intervals. Item Performance reports reflect finalized settled transactions and are generated on a daily schedule with a 24-48 hour settlement lag. Search Insights are provided weekly by Walmart. Inventory counts are synced near-real-time. We never label delayed reports as "real-time".
        </p>
      </div>

      {/* Feeds Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((feed) => (
          <div key={feed.id} className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{feed.title}</span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  feed.status === 'synced'
                    ? 'bg-emerald-500'
                    : feed.status === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-slate-300'
                }`}
              />
            </div>

            <div>
              <div className="text-sm font-bold text-slate-800">{feed.statusText}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{feed.syncDetail}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              Last Ingest: {feed.updatedAt}
            </div>
          </div>
        ))}
      </div>

      {/* Ingestion Logs */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Recent Ingestion & Report Processing Log
          </h3>
          <span className="text-xs text-slate-400">All timestamps in UTC</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Feed / Report Name</th>
                <th className="py-3 px-4">Ingestion Mechanism</th>
                <th className="py-3 px-4">Executed At</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Records</th>
                <th className="py-3 px-4 text-right">Latency</th>
                <th className="py-3 px-4">Reporting Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {syncLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {log.feed}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.type}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {log.status === 'Success' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                    {log.records > 0 ? log.records : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                    {log.latency}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.period}
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
