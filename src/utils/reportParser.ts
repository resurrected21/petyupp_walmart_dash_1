import { SkuItem, StockStatus } from '../types';

export interface ParsedReportResult {
  skus: SkuItem[];
  totalSales: number;
  totalUnits: number;
  inStockRate: number;
  activeSkuCount: number;
  lowStockCount: number;
  outOfStockCount: number;
  avgCtr: number;
  reportDateRange: string;
}

export function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split(/\r?\n/);
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    const row: string[] = [];
    let current = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    rows.push(row);
  }
  
  return rows;
}

export function parseWalmartReportCsv(csvText: string): ParsedReportResult {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) {
    throw new Error('CSV file is empty or does not contain data rows.');
  }

  const headers = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  // Find column indexes
  const findCol = (aliases: string[]): number => {
    return headers.findIndex(h => aliases.some(alias => h.includes(alias)));
  };

  const skuCol = findCol(['sku', 'selleritemid', 'partnerritemid', 'itemid']);
  const nameCol = findCol(['productname', 'itemname', 'title', 'producttitle']);
  const salesCol = findCol(['grosssales', 'sales', 'gmv', 'revenue']);
  const unitsCol = findCol(['unitssold', 'units', 'quantitysold', 'qty']);
  const ctrCol = findCol(['ctr', 'clickthroughrate']);
  const stockCol = findCol(['inventory', 'stock', 'quantity', 'unitsavailable', 'availableqty']);
  const priceCol = findCol(['customerprice', 'price', 'unitprice']);
  const buyBoxCol = findCol(['buybox', 'buyboxpercentage']);
  const categoryCol = findCol(['category', 'subcategory', 'producttype']);

  if (skuCol === -1 && nameCol === -1) {
    throw new Error('Unable to detect SKU or Product Name column. Please verify Walmart CSV format.');
  }

  const skus: SkuItem[] = [];
  let totalSales = 0;
  let totalUnits = 0;
  let totalCtrSum = 0;
  let ctrCount = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 0 || row.every(val => val === '')) continue;

    const sku = (skuCol !== -1 && row[skuCol]) ? row[skuCol] : `SKU-${r}`;
    const title = (nameCol !== -1 && row[nameCol]) ? row[nameCol] : `Walmart Product #${r}`;
    
    // Parse numeric fields stripping $, %, commas
    const parseNum = (val?: string): number => {
      if (!val) return 0;
      const clean = val.replace(/[^0-9.-]+/g, '');
      const num = parseFloat(clean);
      return isNaN(num) ? 0 : num;
    };

    const sales = salesCol !== -1 ? parseNum(row[salesCol]) : 0;
    const units = unitsCol !== -1 ? parseNum(row[unitsCol]) : 0;
    const ctr = ctrCol !== -1 ? parseNum(row[ctrCol]) : 2.5;
    const stock = stockCol !== -1 ? parseNum(row[stockCol]) : 50;
    const price = priceCol !== -1 ? parseNum(row[priceCol]) : (units > 0 ? sales / units : 19.99);
    const buyBox = buyBoxCol !== -1 ? parseNum(row[buyBoxCol]) : 95.0;
    const subCategory = categoryCol !== -1 && row[categoryCol] ? row[categoryCol] : 'Pet Supplies';

    let status: StockStatus = 'Healthy';
    if (stock <= 0) {
      status = 'Out of stock';
    } else if (stock <= 15) {
      status = 'Low stock';
    }

    totalSales += sales;
    totalUnits += units;
    totalCtrSum += ctr;
    ctrCount++;

    skus.push({
      id: `sku-upload-${r}`,
      sku,
      title,
      subCategory,
      category: 'Pet Supplies',
      sales,
      units,
      ctr,
      stock,
      status,
      price: price > 0 ? price : 19.99,
      buyBoxPercentage: buyBox > 0 ? buyBox : 98.0,
      pageViews: units * 55,
      clicks: Math.round(units * 1.5),
      returnsCount: Math.round(units * 0.02),
      daysOfSupply: units > 0 ? Math.round((stock / units) * 30) : 0,
      fulfillmentType: 'WFS',
      listingScore: Math.floor(80 + Math.random() * 18),
    });
  }

  // Sort by sales descending
  skus.sort((a, b) => b.sales - a.sales);

  const activeSkuCount = skus.length;
  const inStockCount = skus.filter(s => s.stock > 0).length;
  const lowStockCount = skus.filter(s => s.status === 'Low stock').length;
  const outOfStockCount = skus.filter(s => s.status === 'Out of stock').length;
  const inStockRate = activeSkuCount > 0 ? (inStockCount / activeSkuCount) * 100 : 0;
  const avgCtr = ctrCount > 0 ? +(totalCtrSum / ctrCount).toFixed(2) : 2.4;

  return {
    skus,
    totalSales: +totalSales.toFixed(2),
    totalUnits,
    inStockRate: +inStockRate.toFixed(1),
    activeSkuCount,
    lowStockCount,
    outOfStockCount,
    avgCtr,
    reportDateRange: 'Uploaded Walmart CSV dataset',
  };
}

export function generateSampleWalmartCsv(): string {
  return `SKU,Product Name,Sub-Category,Gross Sales,Units Sold,Customer Price,CTR (%),Inventory,Buy Box (%)
PY-BOWL-24,"Stainless Steel Bowl · 24 oz",Pet Bowls,6420.00,312,20.58,3.8,84,98.4
PY-YAK-M,"Yak Cheese Chew · Medium",Natural Chews,5980.00,287,20.84,2.4,46,99.1
PY-BUCKET-4,"Flat Side Bucket · 4 qt",Stainless Steel Buckets,4710.00,204,23.09,1.9,12,96.5
PY-LEATHER-R,"Leather Ring Dog Toy",Dog Toys,3940.00,181,21.77,2.8,0,42.0
PY-TREAT-C,"Training Treats · Chicken",Dog Treats,2860.00,145,19.72,2.1,22,97.8
PY-COLLAR-REF,"Reflective Tactical Dog Collar · Large",Collars & Leashes,2450.00,112,21.87,3.2,58,95.0
PY-BED-ORTHO-L,"Orthopedic Memory Foam Pet Bed · L",Beds & Mats,2380.00,48,49.58,1.8,8,93.4
PY-GROOM-BRUSH,"Self-Cleaning Slicker Brush",Grooming Tools,2120.00,132,16.06,2.7,64,99.2
PY-POOP-BAG-500,"Biodegradable Waste Bags · 500 Count",Waste Management,1980.00,99,20.00,2.9,120,99.5
PY-ROPE-KNOT-XL,"Heavy Duty Triple Knot Rope Toy",Dog Toys,1820.00,122,14.92,2.0,6,94.1
PY-DENTAL-STICKS,"Daily Dental Health Chews · 30pk",Natural Chews,1680.00,94,17.87,3.1,75,98.2
PY-CAT-SCRATCH-T,"Sisal Sisal Post Cat Tree Tower",Scratchers & Furniture,1540.00,35,44.00,1.6,0,35.0`;
}
