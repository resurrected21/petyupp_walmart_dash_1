import React, { useState } from 'react';
import { FileSpreadsheet, Download, RefreshCw, Plus, CheckCircle2, Clock, Upload, AlertCircle } from 'lucide-react';
import { WalmartReportJob } from '../types';
import { RECENT_WALMART_REPORT_JOBS } from '../data/baselineData';
import { parseWalmartReportCsv, generateSampleWalmartCsv } from '../utils/reportParser';

interface ReportManagementViewProps {
  onDataUploaded: (parsed: any) => void;
}

export const ReportManagementView: React.FC<ReportManagementViewProps> = ({ onDataUploaded }) => {
  const [jobs, setJobs] = useState<WalmartReportJob[]>(RECENT_WALMART_REPORT_JOBS);
  const [isRequesting, setIsRequesting] = useState(false);
  const [customRequestId, setCustomRequestId] = useState('');
  const [pollingStatus, setPollingStatus] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleRequestNewReport = (type: 'ITEM_PERFORMANCE' | 'INVENTORY') => {
    setIsRequesting(true);
    setSuccessNotice(null);

    // Simulate async Walmart report submission
    setTimeout(() => {
      const newJob: WalmartReportJob = {
        requestId: `01a13${Math.random().toString(16).substring(2, 8)}-${Math.random().toString(16).substring(2, 6)}-79f1-aef3-${Date.now().toString(16).substring(6)}`,
        reportType: type,
        reportVersion: 'v1',
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      };
      setJobs([newJob, ...jobs]);
      setIsRequesting(false);
      setSuccessNotice(`Report request submitted to Walmart Marketplace. Request ID: ${newJob.requestId}`);

      // Simulate status progression from SUBMITTED -> IN_PROGRESS -> READY
      setTimeout(() => {
        setJobs(prev => prev.map(j => j.requestId === newJob.requestId ? { ...j, status: 'IN_PROGRESS' } : j));
      }, 3000);

      setTimeout(() => {
        setJobs(prev => prev.map(j => j.requestId === newJob.requestId ? {
          ...j,
          status: 'READY',
          generatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          recordCount: 126,
          fileSizeBytes: 85400,
        } : j));
      }, 7000);
    }, 1000);
  };

  const handleCheckCustomStatus = () => {
    if (!customRequestId.trim()) return;
    setPollingStatus('Polling Walmart Marketplace endpoint /v3/reports/reportRequests/' + customRequestId.trim() + '...');

    setTimeout(() => {
      if (customRequestId.includes('01a13f29-056a-79f1-aef3-3b066f906dbe')) {
        setPollingStatus('Job 01a13f29-056a-79f1-aef3-3b066f906dbe is READY. Generated: 2026-10-15 04:08:33 UTC (126 records parsed).');
      } else {
        setPollingStatus(`Job ${customRequestId} queried successfully. Status: READY.`);
      }
    }, 800);
  };

  const handleDownloadReportCsv = (job: WalmartReportJob) => {
    const csvContent = generateSampleWalmartCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `walmart_${job.reportType.toLowerCase()}_${job.requestId.substring(0, 8)}.csv`;
    link.click();
  };

  const handleInlineUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseWalmartReportCsv(text);
        onDataUploaded(parsed);
        setSuccessNotice(`Parsed ${parsed.activeSkuCount} records from uploaded file "${file.name}".`);
      } catch (err: any) {
        setPollingStatus('Upload Error: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Walmart Report Management & Ingestion</h2>
          <p className="text-xs text-slate-500 mt-1">
            Submit asynchronous Walmart Marketplace report requests, poll job IDs, and download parsed CSV datasets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleRequestNewReport('ITEM_PERFORMANCE')}
            disabled={isRequesting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isRequesting ? 'Submitting...' : 'Request Item Performance Report'}</span>
          </button>

          <label className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Upload CSV</span>
            <input type="file" accept=".csv" onChange={handleInlineUpload} className="hidden" />
          </label>
        </div>
      </div>

      {successNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Manual Request ID Poller Card */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Query Existing Walmart Report Request ID
        </h3>
        <p className="text-xs text-slate-500">
          Have an existing asynchronous job from earlier sessions or CI tasks? Enter the UUID to poll Walmart status.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="e.g. 01a13f29-056a-79f1-aef3-3b066f906dbe"
            value={customRequestId}
            onChange={(e) => setCustomRequestId(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-emerald-600 font-mono"
          />
          <button
            onClick={handleCheckCustomStatus}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            Check Status
          </button>
        </div>

        {pollingStatus && (
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 font-mono">
            {pollingStatus}
          </div>
        )}
      </div>

      {/* Jobs History Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Walmart Report Job Queue
          </h3>
          <span className="text-xs text-slate-400">Endpoint: /v3/reports/reportRequests</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Report Type</th>
                <th className="py-3 px-4">Submitted (UTC)</th>
                <th className="py-3 px-4">Generated (UTC)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Records</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job.requestId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {job.requestId}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {job.reportType} ({job.reportVersion})
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {job.submittedAt}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {job.generatedAt || 'Pending...'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        job.status === 'READY'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : job.status === 'IN_PROGRESS'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200 animate-pulse'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {job.status === 'READY' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {job.status === 'IN_PROGRESS' && <RefreshCw className="w-3 h-3 animate-spin text-sky-600" />}
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                    {job.recordCount ? `${job.recordCount} rows` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {job.status === 'READY' ? (
                      <button
                        onClick={() => handleDownloadReportCsv(job)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs">Waiting</span>
                    )}
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
