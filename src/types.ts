export type NavTab =
  | 'overview'
  | 'sales-skus'
  | 'organic-seo'
  | 'inventory'
  | 'advertising'
  | 'listing-audit'
  | 'data-health'
  | 'report-management'
  | 'scheduled-reports'
  | 'settings';

export type StockStatus = 'Healthy' | 'Low stock' | 'Out of stock';

export interface SkuItem {
  id: string;
  sku: string;
  title: string;
  subCategory: string;
  category: string;
  sales: number;
  units: number;
  ctr: number;
  stock: number;
  status: StockStatus;
  price: number;
  buyBoxPercentage: number;
  pageViews: number;
  clicks: number;
  returnsCount: number;
  daysOfSupply: number;
  fulfillmentType: 'WFS' | 'Seller';
  imageUrl?: string;
  listingScore?: number;
}

export interface DailyTrendPoint {
  date: string;
  displayDate: string;
  sales: number;
  units: number;
  priorSales?: number;
  priorUnits?: number;
}

export interface GrowthSignal {
  id: string;
  title: string;
  description: string;
  category: 'sales' | 'inventory' | 'seo' | 'listing';
  icon: 'trend' | 'alert' | 'search' | 'info';
  impact: string;
  actionRecommendation: string;
}

export interface PriorityAction {
  id: string;
  level: 'Critical' | 'High' | 'Medium' | 'Info';
  title: string;
  description: string;
  sku?: string;
  impactMetric: string;
  suggestedSteps: string[];
  walmartCenterPath: string;
  estimatedRevenueLoss?: number;
}

export interface DataFeedStatus {
  id: 'sales' | 'inventory' | 'seo' | 'ads';
  title: string;
  status: 'synced' | 'pending' | 'warning' | 'disconnected';
  statusText: string;
  syncDetail: string;
  updatedAt: string;
  sparkline: number[];
}

export interface WalmartReportJob {
  requestId: string;
  reportType: 'ITEM_PERFORMANCE' | 'INVENTORY' | 'BUY_BOX' | 'ITEM_CATALOG';
  reportVersion: string;
  status: 'READY' | 'SUBMITTED' | 'IN_PROGRESS' | 'FAILED';
  submittedAt: string;
  generatedAt?: string;
  recordCount?: number;
  fileSizeBytes?: number;
  downloadUrl?: string;
  errorMessage?: string;
}

export interface OrganicKeyword {
  id: string;
  keyword: string;
  category: string;
  searchVolume: number;
  rank: number;
  previousRank: number;
  competition: 'High' | 'Medium' | 'Low';
  impressions: number;
  estimatedClicks: number;
  opportunityScore: number;
}

export interface ListingAuditRecord {
  sku: string;
  title: string;
  score: number;
  status: 'Pass' | 'Needs Attention' | 'Critical';
  missingAttributes: string[];
  titleIssues?: string;
  imageIssues?: string;
  bulletIssues?: string;
}

export type DataSourceMode = 'demo_preview' | 'live_walmart_api' | 'uploaded_report';
