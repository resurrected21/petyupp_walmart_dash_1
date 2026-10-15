import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Search,
  Package,
  Megaphone,
  CheckSquare,
  ShieldCheck,
  FileSpreadsheet,
  Clock,
  Settings,
  Lock,
  Sparkles,
} from 'lucide-react';
import { NavTab, DataSourceMode } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  dataSourceMode: DataSourceMode;
  onOpenSourceModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  dataSourceMode,
  onOpenSourceModal,
}) => {
  const mainNavItems = [
    { id: 'overview' as NavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'sales-skus' as NavTab, label: 'Sales & SKUs', icon: TrendingUp },
    { id: 'organic-seo' as NavTab, label: 'Organic SEO', icon: Search },
    { id: 'inventory' as NavTab, label: 'Inventory', icon: Package },
    {
      id: 'advertising' as NavTab,
      label: 'Advertising',
      icon: Megaphone,
      badge: 'Unconnected',
    },
    {
      id: 'listing-audit' as NavTab,
      label: 'Listing Audit',
      icon: CheckSquare,
      badge: '5',
    },
    { id: 'data-health' as NavTab, label: 'Data Health', icon: ShieldCheck },
  ];

  const secondaryNavItems = [
    { id: 'report-management' as NavTab, label: 'Report Management', icon: FileSpreadsheet },
    { id: 'scheduled-reports' as NavTab, label: 'Scheduled Reports', icon: Clock },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-slate-200/80 flex flex-col h-screen shrink-0 sticky top-0 select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
            {/* Pet Paw Icon SVG */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="8.5" cy="5" rx="2" ry="3" />
              <ellipse cx="15.5" cy="5" rx="2" ry="3" />
              <ellipse cx="4.5" cy="10" rx="2" ry="2.5" />
              <ellipse cx="19.5" cy="10" rx="2" ry="2.5" />
              <path d="M12 10.5c-3.2 0-6 2.3-6 5.5 0 2.2 1.8 4 4 4 .9 0 1.6-.3 2-.7.4.4 1.1.7 2 .7 2.2 0 4-1.8 4-4 0-3.2-2.8-5.5-6-5.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">PetYupp</h1>
            <p className="text-[11px] font-medium text-slate-500 tracking-tight">Growth Intelligence</p>
          </div>
        </div>

        {/* Walmart Marketplace Status Card */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500 font-bold text-xs">✴</span>
              <span className="text-xs font-semibold text-slate-800">Walmart Marketplace</span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          </div>

          <div className="space-y-0.5 text-[11px] text-slate-500">
            <div className="flex justify-between">
              <span>Account:</span>
              <span className="font-medium text-slate-700">PetYupp</span>
            </div>
            <div className="flex justify-between">
              <span>Marketplace:</span>
              <span className="font-medium text-slate-700">US</span>
            </div>
            <div className="flex justify-between">
              <span>Environment:</span>
              <span className="font-medium text-slate-700">Production</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
              <Lock className="w-3 h-3 text-slate-400" />
              Read-only access
            </span>
            <button
              onClick={onOpenSourceModal}
              className="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium hover:underline cursor-pointer"
            >
              Source: {dataSourceMode === 'live_walmart_api' ? 'Live API' : dataSourceMode === 'uploaded_report' ? 'Upload' : 'Preview'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
        {mainNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    item.badge === 'Unconnected'
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="pt-3 pb-2">
          <div className="h-px bg-slate-200/80 mx-2" />
        </div>

        {/* Secondary Links */}
        {secondaryNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-400'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-3 m-3 bg-slate-100/80 rounded-xl border border-slate-200/60">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-600 leading-tight">
            <span className="font-semibold text-slate-800">Direct Ingestion:</span> Item Performance & Inventory reports ready.
          </div>
        </div>
      </div>
    </aside>
  );
};
