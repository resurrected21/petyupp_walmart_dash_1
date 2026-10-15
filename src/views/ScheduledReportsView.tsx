import React, { useState } from 'react';
import { Clock, Plus, Mail, CheckCircle2, Trash2, Calendar } from 'lucide-react';

interface ScheduleItem {
  id: string;
  name: string;
  reportType: string;
  frequency: string;
  timeUtc: string;
  recipients: string[];
  active: boolean;
}

export const ScheduledReportsView: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: 'sch-1',
      name: 'Daily Inventory & Stockout Alert',
      reportType: 'Inventory Feeds & DOS Forecast',
      frequency: 'Daily',
      timeUtc: '07:00 UTC',
      recipients: ['admin@petyupp.com', 'operations@petyupp.com'],
      active: true,
    },
    {
      id: 'sch-2',
      name: 'Weekly Executive Sales Digest',
      reportType: 'Item Performance (30d Trend)',
      frequency: 'Every Monday',
      timeUtc: '09:00 UTC',
      recipients: ['admin@petyupp.com', 'exec@petyupp.com'],
      active: true,
    },
    {
      id: 'sch-3',
      name: 'Monthly Listing Quality Audit',
      reportType: 'Catalog Quality & Missing Specs',
      frequency: '1st of Every Month',
      timeUtc: '06:00 UTC',
      recipients: ['catalog@petyupp.com'],
      active: false,
    },
  ]);

  const toggleSchedule = (id: string) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Scheduled Reports & Automated Dispatches</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure automated cron dispatches and email summaries for sales velocity and critical out-of-stock items.
          </p>
        </div>

        <button
          onClick={() => alert('New automated schedule template ready. Contact admin@petyupp.com to add custom cron webhooks.')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Scheduled Alert</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Active Report Schedules
          </h3>
          <span className="text-xs text-slate-400">Server time: 04:52 UTC</span>
        </div>

        <div className="divide-y divide-slate-100">
          {schedules.map((sch) => (
            <div key={sch.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{sch.name}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sch.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {sch.active ? 'Active Cron' : 'Paused'}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  <span>Type: <strong>{sch.reportType}</strong></span>
                  <span className="mx-2">•</span>
                  <span>Cadence: <strong>{sch.frequency} at {sch.timeUtc}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{sch.recipients.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSchedule(sch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    sch.active
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}
                >
                  {sch.active ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
