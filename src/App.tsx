/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ActionDetailModal } from './components/ActionDetailModal';
import { SkuDetailModal } from './components/SkuDetailModal';
import { DataSourceModal } from './components/DataSourceModal';

import { OverviewView } from './views/OverviewView';
import { SalesAndSkusView } from './views/SalesAndSkusView';
import { OrganicSeoView } from './views/OrganicSeoView';
import { InventoryView } from './views/InventoryView';
import { AdvertisingView } from './views/AdvertisingView';
import { ListingAuditView } from './views/ListingAuditView';
import { DataHealthView } from './views/DataHealthView';
import { ReportManagementView } from './views/ReportManagementView';
import { ScheduledReportsView } from './views/ScheduledReportsView';
import { SettingsView } from './views/SettingsView';

import {
  NavTab,
  DataSourceMode,
  SkuItem,
  PriorityAction,
  GrowthSignal,
  DataFeedStatus,
  DailyTrendPoint,
} from './types';

import {
  BASELINE_FEED_STATUSES,
  TOP_SKUS,
  DAILY_TRENDS,
  GROWTH_SIGNALS,
  PRIORITY_ACTIONS,
} from './data/baselineData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [comparisonRange, setComparisonRange] = useState('vs previous 30 days');
  const [dataSourceMode, setDataSourceMode] = useState<DataSourceMode>('demo_preview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState('Oct 14, 2026 10:42 AM');

  // Core Data State
  const [feedStatuses, setFeedStatuses] = useState<DataFeedStatus[]>(BASELINE_FEED_STATUSES);
  const [skus, setSkus] = useState<SkuItem[]>(TOP_SKUS);
  const [dailyTrends, setDailyTrends] = useState<DailyTrendPoint[]>(DAILY_TRENDS);
  const [growthSignals, setGrowthSignals] = useState<GrowthSignal[]>(GROWTH_SIGNALS);
  const [priorityActions, setPriorityActions] = useState<PriorityAction[]>(PRIORITY_ACTIONS);

  // Top KPIs
  const [grossSales, setGrossSales] = useState(48291.60);
  const [grossSalesChangePct, setGrossSalesChangePct] = useState(12.8);
  const [unitsSold, setUnitsSold] = useState(2184);
  const [unitsSoldChangePct, setUnitsSoldChangePct] = useState(8.4);
  const [activeSkus, setActiveSkus] = useState(126);
  const [activeSkusChange, setActiveSkusChange] = useState(3);
  const [inStockRate, setInStockRate] = useState(93.2);
  const [inStockRateChangePct, setInStockRateChangePct] = useState(-1.6);

  // Modals
  const [selectedSku, setSelectedSku] = useState<SkuItem | null>(null);
  const [selectedAction, setSelectedAction] = useState<PriorityAction | null>(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  // Handle Refresh Action
  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' ' + now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      setLastSyncTimestamp(formatted);

      // Update feed statuses
      setFeedStatuses(prev => prev.map(f => {
        if (f.id === 'sales') return { ...f, statusText: 'Just now' };
        if (f.id === 'inventory') return { ...f, statusText: 'Just now' };
        return f;
      }));
    }, 1200);
  };

  // Handle Uploaded Walmart CSV Data
  const handleDataUploaded = (parsed: any) => {
    setSkus(parsed.skus);
    setGrossSales(parsed.totalSales);
    setUnitsSold(parsed.totalUnits);
    setActiveSkus(parsed.activeSkuCount);
    setInStockRate(parsed.inStockRate);

    // Update trend proportionally
    if (parsed.totalSales > 0) {
      const scale = parsed.totalSales / 48291.60;
      setDailyTrends(DAILY_TRENDS.map(d => ({
        ...d,
        sales: +(d.sales * scale).toFixed(2),
        units: Math.round(d.units * (parsed.totalUnits / 2184 || 1)),
      })));
    }
    setDataSourceMode('uploaded_report');
  };

  // Handle Reset To Baseline
  const handleResetToBaseline = () => {
    setSkus(TOP_SKUS);
    setDailyTrends(DAILY_TRENDS);
    setGrowthSignals(GROWTH_SIGNALS);
    setPriorityActions(PRIORITY_ACTIONS);
    setGrossSales(48291.60);
    setGrossSalesChangePct(12.8);
    setUnitsSold(2184);
    setUnitsSoldChangePct(8.4);
    setActiveSkus(126);
    setActiveSkusChange(3);
    setInStockRate(93.2);
    setInStockRateChangePct(-1.6);
    setFeedStatuses(BASELINE_FEED_STATUSES);
    setLastSyncTimestamp('Oct 14, 2026 10:42 AM');
    setDataSourceMode('demo_preview');
  };

  // Header Titles Mapping
  const getHeaderInfo = () => {
    switch (currentTab) {
      case 'overview':
        return {
          title: 'Growth Overview',
          subtitle: 'Sales performance, marketplace trends, search insights and operational signals for your Walmart business.',
        };
      case 'sales-skus':
        return {
          title: 'Sales & SKU Performance',
          subtitle: 'Granular catalog revenue, item sales velocity, conversion, and Buy Box retention.',
        };
      case 'organic-seo':
        return {
          title: 'Organic SEO & Search Insights',
          subtitle: 'Customer search queries, keyword rank velocity, and listing optimization opportunities.',
        };
      case 'inventory':
        return {
          title: 'Inventory & Stockout Monitoring',
          subtitle: 'Stock levels, Days of Supply forecast, and WFS replenishment thresholds.',
        };
      case 'advertising':
        return {
          title: 'Walmart Connect Advertising',
          subtitle: 'Sponsored Products, Sponsored Brands, and ROAS attribution.',
        };
      case 'listing-audit':
        return {
          title: 'Listing Quality & Catalog Audit',
          subtitle: 'Content quality score, missing attributes, and title optimization diagnostics.',
        };
      case 'data-health':
        return {
          title: 'Data Health & Freshness Audit',
          subtitle: 'API ingestion logs, sync intervals, and rate limit telemetry.',
        };
      case 'report-management':
        return {
          title: 'Walmart Report Management',
          subtitle: 'Asynchronous report requests, job status polling, and CSV downloads.',
        };
      case 'scheduled-reports':
        return {
          title: 'Scheduled Reports',
          subtitle: 'Automated cron dispatches and email summaries for sales and stockouts.',
        };
      case 'settings':
        return {
          title: 'Workspace Settings',
          subtitle: 'Walmart Marketplace OAuth credentials and read-only safeguards.',
        };
      default:
        return {
          title: 'PetYupp Growth Intelligence',
          subtitle: 'Walmart Marketplace Analytics',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        dataSourceMode={dataSourceMode}
        onOpenSourceModal={() => setIsSourceModalOpen(true)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <TopHeader
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          dateRange={dateRange}
          onChangeDateRange={setDateRange}
          comparisonRange={comparisonRange}
          onChangeComparison={setComparisonRange}
          isRefreshing={isRefreshing}
          onRefreshData={handleRefreshData}
          dataSourceMode={dataSourceMode}
          onOpenSourceModal={() => setIsSourceModalOpen(true)}
        />

        {/* View Router */}
        <main className="flex-1">
          {currentTab === 'overview' && (
            <OverviewView
              feedStatuses={feedStatuses}
              dailyTrends={dailyTrends}
              growthSignals={growthSignals}
              skus={skus}
              priorityActions={priorityActions}
              grossSales={grossSales}
              grossSalesChangePct={grossSalesChangePct}
              unitsSold={unitsSold}
              unitsSoldChangePct={unitsSoldChangePct}
              activeSkus={activeSkus}
              activeSkusChange={activeSkusChange}
              inStockRate={inStockRate}
              inStockRateChangePct={inStockRateChangePct}
              comparisonLabel={comparisonRange}
              dataSourceMode={dataSourceMode}
              lastSyncTimestamp={lastSyncTimestamp}
              onSelectSku={setSelectedSku}
              onSelectAction={setSelectedAction}
              onSelectSignal={(sig) => {
                const act = priorityActions.find(a => a.id.includes(sig.id.replace('sig-', 'act-')));
                if (act) setSelectedAction(act);
              }}
              onViewAllSkus={() => setCurrentTab('sales-skus')}
              onViewAllActions={() => setCurrentTab('sales-skus')}
              onViewAllSignals={() => setCurrentTab('organic-seo')}
              onOpenSourceModal={() => setIsSourceModalOpen(true)}
              onOpenFeedModal={(feedId) => {
                if (feedId === 'ads') setCurrentTab('advertising');
                else if (feedId === 'seo') setCurrentTab('organic-seo');
                else if (feedId === 'inventory') setCurrentTab('inventory');
                else setCurrentTab('data-health');
              }}
            />
          )}

          {currentTab === 'sales-skus' && (
            <SalesAndSkusView skus={skus} onSelectSku={setSelectedSku} />
          )}

          {currentTab === 'organic-seo' && <OrganicSeoView />}

          {currentTab === 'inventory' && (
            <InventoryView skus={skus} onSelectSku={setSelectedSku} />
          )}

          {currentTab === 'advertising' && <AdvertisingView />}

          {currentTab === 'listing-audit' && <ListingAuditView />}

          {currentTab === 'data-health' && (
            <DataHealthView
              statuses={feedStatuses}
              onRefreshAll={handleRefreshData}
              isRefreshing={isRefreshing}
            />
          )}

          {currentTab === 'report-management' && (
            <ReportManagementView onDataUploaded={handleDataUploaded} />
          )}

          {currentTab === 'scheduled-reports' && <ScheduledReportsView />}

          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Modals and Drawers */}
      <SkuDetailModal sku={selectedSku} onClose={() => setSelectedSku(null)} />
      <ActionDetailModal action={selectedAction} onClose={() => setSelectedAction(null)} />
      <DataSourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        currentMode={dataSourceMode}
        onSelectMode={setDataSourceMode}
        onDataUploaded={handleDataUploaded}
        onResetToBaseline={handleResetToBaseline}
      />
    </div>
  );
}
