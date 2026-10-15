import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Lock, CheckCircle2, Globe, Database, Bell } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [clientId, setClientId] = useState('71926c48-****-****-****-4d5162a79218');
  const [channelType, setChannelType] = useState('0f3e6ddf-c1d5-45b7-a3aa-ad2f778b7709');
  const [readOnlyLock, setReadOnlyLock] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('10');
  const [saveNotice, setSaveNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Workspace Settings & API Safeguards</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage Walmart Marketplace OAuth configuration, read-only operational locks, and security parameters.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Strict Read-Only Enforcement Active</span>
        </div>
      </div>

      {saveNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Workspace configuration preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Connection Box */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Key className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900">Walmart Marketplace US Integration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client ID (Masked)
              </label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 font-mono bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WM_CONSUMER.CHANNEL.TYPE
              </label>
              <input
                type="text"
                value={channelType}
                onChange={(e) => setChannelType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 font-mono bg-slate-50"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Credentials are securely managed via environment variables and never logged or serialized to the browser.</span>
          </div>
        </div>

        {/* Security & Safeguards */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Business Operation Safeguards</h3>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Enforce Read-Only API Permissions</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Disallows any mutating endpoints (e.g. updating item prices, inventory levels, order cancellations, or campaign creation).
              </p>
            </div>
            <input
              type="checkbox"
              checked={readOnlyLock}
              onChange={(e) => setReadOnlyLock(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 mt-1 cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Low-Stock Alert Threshold (Units)</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                SKUs with available stock below this number are flagged in the Priority Action Queue.
              </p>
            </div>
            <input
              type="number"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(e.target.value)}
              className="w-20 px-3 py-1 text-xs rounded-lg border border-slate-200 font-bold text-center"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
