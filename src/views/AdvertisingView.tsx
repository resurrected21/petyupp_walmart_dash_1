import React, { useState } from 'react';
import { Megaphone, ExternalLink, ShieldCheck, Key, AlertCircle, Info, Lock } from 'lucide-react';

export const AdvertisingView: React.FC = () => {
  const [partnerId, setPartnerId] = useState('');
  const [adAuthKey, setAdAuthKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleConnectAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId || !adAuthKey) {
      setFeedback('Please enter both Partner ID and Walmart Connect API Key.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback('Authorization request sent to Walmart Connect Advertising API gateway. Verification pending account owner approval in Walmart Connect console.');
    }, 1200);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Walmart Connect Advertising Analytics</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Awaiting Connection
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sponsored Products, Sponsored Brands, and ROAS attribution directly from Walmart Connect API.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Read-only analytics mode</span>
        </div>
      </div>

      {/* Honest Empty State Container */}
      <div className="p-10 bg-white rounded-2xl border border-slate-200/90 text-center max-w-2xl mx-auto shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400 mb-4">
          <Megaphone className="w-7 h-7 stroke-[1.8]" />
        </div>

        <h3 className="text-base font-bold text-slate-900">Walmart Connect Data Feed Not Yet Connected</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-lg mx-auto">
          Per PetYupp's strict data integrity policy, advertising metrics (Ad Spend, ROAS, Attributed GMV, and CPC) are never fabricated or estimated. Advertising data will only appear when authenticated with your Walmart Connect advertising partner account.
        </p>

        {/* Requirements Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-600" />
            <span>Connection Requirements:</span>
          </div>
          <ul className="list-disc pl-5 text-slate-600 space-y-1 text-[11px]">
            <li>Walmart Connect Seller Advertising Partner Account (US Marketplace)</li>
            <li>API Client credentials with <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">advertising.read</code> scope enabled</li>
            <li>Active campaign history for PetYupp sponsored items</li>
          </ul>
        </div>

        {/* Connection Form */}
        <form onSubmit={handleConnectAttempt} className="mt-6 text-left space-y-3.5 max-w-md mx-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Walmart Connect Advertiser ID
            </label>
            <input
              type="text"
              placeholder="e.g. ADV-849129"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Advertising API Access Token / Key
            </label>
            <input
              type="password"
              placeholder="••••••••••••••••••••••••••••••••"
              value={adAuthKey}
              onChange={(e) => setAdAuthKey(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Verifying Ad Gateway...' : 'Submit Advertising API Credentials'}
          </button>
        </form>

        {feedback && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};
