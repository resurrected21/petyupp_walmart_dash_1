import React from 'react';
import { DataHealthStrip } from '../components/DataHealthStrip';
import { KpiCards } from '../components/KpiCards';
import { SalesTrendChart } from '../components/SalesTrendChart';
import { GrowthSignals } from '../components/GrowthSignals';
import { TopSkuTable } from '../components/TopSkuTable';
import { PriorityActionQueue } from '../components/PriorityActionQueue';
import { FooterBanner } from '../components/FooterBanner';
import {
  DataFeedStatus,
  DailyTrendPoint,
  GrowthSignal,
  SkuItem,
  PriorityAction,
  DataSourceMode,
} from '../types';

interface OverviewViewProps {
  feedStatuses: DataFeedStatus[];
  dailyTrends: DailyTrendPoint[];
  growthSignals: GrowthSignal[];
  skus: SkuItem[];
  priorityActions: PriorityAction[];
  grossSales: number;
  grossSalesChangePct: number;
  unitsSold: number;
  unitsSoldChangePct: number;
  activeSkus: number;
  activeSkusChange: number;
  inStockRate: number;
  inStockRateChangePct: number;
  comparisonLabel: string;
  dataSourceMode: DataSourceMode;
  lastSyncTimestamp: string;
  onSelectSku: (sku: SkuItem) => void;
  onSelectAction: (action: PriorityAction) => void;
  onSelectSignal: (signal: GrowthSignal) => void;
  onViewAllSkus: () => void;
  onViewAllActions: () => void;
  onViewAllSignals: () => void;
  onOpenSourceModal: () => void;
  onOpenFeedModal: (feedId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  feedStatuses,
  dailyTrends,
  growthSignals,
  skus,
  priorityActions,
  grossSales,
  grossSalesChangePct,
  unitsSold,
  unitsSoldChangePct,
  activeSkus,
  activeSkusChange,
  inStockRate,
  inStockRateChangePct,
  comparisonLabel,
  dataSourceMode,
  lastSyncTimestamp,
  onSelectSku,
  onSelectAction,
  onSelectSignal,
  onViewAllSkus,
  onViewAllActions,
  onViewAllSignals,
  onOpenSourceModal,
  onOpenFeedModal,
}) => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* 1. Top Data Health & Freshness Strip */}
      <DataHealthStrip statuses={feedStatuses} onOpenFeedModal={onOpenFeedModal} />

      {/* 2. Primary KPI Metric Cards */}
      <KpiCards
        grossSales={grossSales}
        grossSalesChangePct={grossSalesChangePct}
        unitsSold={unitsSold}
        unitsSoldChangePct={unitsSoldChangePct}
        activeSkus={activeSkus}
        activeSkusChange={activeSkusChange}
        inStockRate={inStockRate}
        inStockRateChangePct={inStockRateChangePct}
        comparisonLabel={comparisonLabel}
      />

      {/* 3. Middle Row: Sales & Units Trend Chart (Left) + Growth Signals (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesTrendChart data={dailyTrends} />
        </div>
        <div className="lg:col-span-1">
          <GrowthSignals
            signals={growthSignals}
            onSelectSignal={onSelectSignal}
            onViewAll={onViewAllSignals}
          />
        </div>
      </div>

      {/* 4. Bottom Row: Top SKU Performance (Left 2/3) + Priority Action Queue (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopSkuTable
            skus={skus}
            onSelectSku={onSelectSku}
            onViewAllSkus={onViewAllSkus}
          />
        </div>
        <div className="lg:col-span-1">
          <PriorityActionQueue
            actions={priorityActions}
            onSelectAction={onSelectAction}
            onViewAllActions={onViewAllActions}
          />
        </div>
      </div>

      {/* 5. Bottom Disclaimer Banner & Timestamp */}
      <FooterBanner
        dataSourceMode={dataSourceMode}
        lastSyncTimestamp={lastSyncTimestamp}
        onOpenSourceModal={onOpenSourceModal}
      />
    </div>
  );
};
