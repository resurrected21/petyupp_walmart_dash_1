import React, { useState } from 'react';
import { Calendar, ChevronDown, Lock, RefreshCw, Database } from 'lucide-react';
import { DataSourceMode } from '../types';

interface TopHeaderProps {
  title: string;
  subtitle: string;
  dateRange: string;
  onChangeDateRange: (range: string) => void;
  comparisonRange: string;
  onChangeComparison: (comparison: string) => void;
  isRefreshing: boolean;
  onRefreshData: () => void;
  dataSourceMode: DataSourceMode;
  onOpenSourceModal: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  dateRange,
  onChangeDateRange,
  comparisonRange,
  onChangeComparison,
  isRefreshing,
  onRefreshData,
  dataSourceMode,
  onOpenSourceModal,
}) => {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCompDropdown, setShowCompDropdown] = useState(false);

  const dateOptions = [
    'Last 7 days',
    'Last 14 days',
    'Last 30 days',
    'Last 90 days',
    'Year to date',
  ];

  const compOptions = [
    'vs previous 30 days',
    'vs previous period',
    'vs last year',
    'None',
  ];

  return (
    <header className="px-8 pt-7 pb-5 bg-white border-b border-slate-200/70">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Title and Breadcrumb */}
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>PetYupp</span>
            <span>/</span>
            <span className="text-slate-800">Walmart Marketplace</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Refresh Data button */}
          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            title="Refresh live sync from Walmart API"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync Now'}</span>
          </button>

          {/* Date Range Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowCompDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDateDropdown && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
                {dateOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      onChangeDateRange(option);
                      setShowDateDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 cursor-pointer ${
                      dateRange === option ? 'text-emerald-700 font-semibold bg-emerald-50/60' : 'text-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCompDropdown(!showCompDropdown);
                setShowDateDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <span>{comparisonRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showCompDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
                {compOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      onChangeComparison(option);
                      setShowCompDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 cursor-pointer ${
                      comparisonRange === option ? 'text-emerald-700 font-semibold bg-emerald-50/60' : 'text-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Read-Only Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Read-only workspace</span>
          </div>

          {/* Data Source Trigger */}
          <button
            onClick={onOpenSourceModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            title="Configure data source / Upload report"
          >
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden lg:inline capitalize">
              {dataSourceMode === 'demo_preview' ? 'Sample Preview' : dataSourceMode === 'uploaded_report' ? 'Custom Report' : 'Live Walmart'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
