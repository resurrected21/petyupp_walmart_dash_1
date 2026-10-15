import React, { useState } from 'react';
import { TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import { DailyTrendPoint } from '../types';

interface SalesTrendChartProps {
  data: DailyTrendPoint[];
  dateRangeLabel?: string;
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({
  data,
  dateRangeLabel = 'Sep 15, 2026 → Oct 14, 2026',
}) => {
  const [granularity, setGranularity] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 640;
  const height = 280;
  const paddingLeft = 45;
  const paddingRight = 45;
  const paddingTop = 25;
  const paddingBottom = 45;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Max scales
  const maxSales = 5000;
  const maxUnits = 200;

  // Coordinate calculations
  const getX = (index: number) => {
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getSalesY = (val: number) => {
    const clamped = Math.max(0, Math.min(maxSales, val));
    return paddingTop + chartHeight - (clamped / maxSales) * chartHeight;
  };

  const getUnitsY = (val: number) => {
    const clamped = Math.max(0, Math.min(maxUnits, val));
    return paddingTop + chartHeight - (clamped / maxUnits) * chartHeight;
  };

  // Generate SVG path strings
  const salesPoints = data.map((d, i) => `${getX(i)},${getSalesY(d.sales)}`);
  const salesPath = `M ${salesPoints.join(' L ')}`;
  const salesArea = `${salesPath} L ${getX(data.length - 1)},${paddingTop + chartHeight} L ${getX(0)},${paddingTop + chartHeight} Z`;

  const unitsPoints = data.map((d, i) => `${getX(i)},${getUnitsY(d.units)}`);
  const unitsPath = `M ${unitsPoints.join(' L ')}`;
  const unitsArea = `${unitsPath} L ${getX(data.length - 1)},${paddingTop + chartHeight} L ${getX(0)},${paddingTop + chartHeight} Z`;

  // Grid steps (0, 1K, 2K, 3K, 4K, 5K for sales; 0, 40, 80, 120, 160, 200 for units)
  const gridSteps = [
    { sales: '5K', units: '200', pct: 1.0 },
    { sales: '4K', units: '160', pct: 0.8 },
    { sales: '3K', units: '120', pct: 0.6 },
    { sales: '2K', units: '80', pct: 0.4 },
    { sales: '1K', units: '40', pct: 0.2 },
    { sales: '0', units: '0', pct: 0.0 },
  ];

  // Selected date points for x-axis ticks (matching screenshot: Sep 15, 18, 21, 24, 27, 30, Oct 3, 6, 9, 12, 14)
  const displayTickIndices = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, data.length - 1];

  const activePoint = hoverIndex !== null && hoverIndex >= 0 && hoverIndex < data.length ? data[hoverIndex] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 relative">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2">
          <div className="text-sky-600">
            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Sales & units trend</h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {/* Granularity Toggle */}
          <div className="relative inline-flex items-center">
            <select
              value={granularity}
              onChange={(e) => setGranularity(e.target.value as any)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 pr-6 rounded-md border border-slate-200 cursor-pointer text-xs"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Date range badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 font-medium">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{dateRangeLabel}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full pt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            {/* Sales Green Gradient */}
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>

            {/* Units Blue Gradient */}
            <linearGradient id="unitsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Axis Labels */}
          {gridSteps.map((step, idx) => {
            const y = paddingTop + chartHeight - step.pct * chartHeight;
            return (
              <g key={idx}>
                {/* Horizontal grid line */}
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray={step.pct > 0 && step.pct < 1 ? '3 3' : undefined}
                />
                {/* Left Y Axis Label (Sales USD) */}
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                >
                  {step.sales}
                </text>
                {/* Right Y Axis Label (Units sold) */}
                <text
                  x={width - paddingRight + 8}
                  y={y + 3}
                  textAnchor="start"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                >
                  {step.units}
                </text>
              </g>
            );
          })}

          {/* Left Axis Title */}
          <text
            x={14}
            y={paddingTop + chartHeight / 2}
            transform={`rotate(-90 14 ${paddingTop + chartHeight / 2})`}
            textAnchor="middle"
            fill="#64748b"
            fontSize="10"
            fontWeight="500"
          >
            Sales (USD)
          </text>

          {/* Right Axis Title */}
          <text
            x={width - 12}
            y={paddingTop + chartHeight / 2}
            transform={`rotate(90 ${width - 12} ${paddingTop + chartHeight / 2})`}
            textAnchor="middle"
            fill="#64748b"
            fontSize="10"
            fontWeight="500"
          >
            Units sold
          </text>

          {/* Shaded Areas */}
          <path d={salesArea} fill="url(#salesGrad)" />
          <path d={unitsArea} fill="url(#unitsGrad)" />

          {/* Sales Green Line */}
          <path
            d={salesPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Units Blue Line */}
          <path
            d={unitsPath}
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const sx = getX(i);
            const sy = getSalesY(d.sales);
            const uy = getUnitsY(d.units);
            const isHovered = hoverIndex === i;

            return (
              <g key={i}>
                {/* Sales point */}
                <circle
                  cx={sx}
                  cy={sy}
                  r={isHovered ? 4.5 : 3}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all"
                />
                {/* Units point */}
                <circle
                  cx={sx}
                  cy={uy}
                  r={isHovered ? 4.5 : 3}
                  fill="#0284c7"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all"
                />
              </g>
            );
          })}

          {/* Active Hover Crosshair Line */}
          {hoverIndex !== null && (
            <line
              x1={getX(hoverIndex)}
              y1={paddingTop}
              x2={getX(hoverIndex)}
              y2={paddingTop + chartHeight}
              stroke="#64748b"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )}

          {/* X Axis Date Labels */}
          {displayTickIndices.map((idx) => {
            if (idx >= data.length) return null;
            const pt = data[idx];
            return (
              <text
                key={idx}
                x={getX(idx)}
                y={paddingTop + chartHeight + 20}
                textAnchor="middle"
                fill="#64748b"
                fontSize="10"
                fontWeight="500"
              >
                {pt.displayDate}
              </text>
            );
          })}

          {/* Invisible interactive hover targets */}
          {data.map((_, i) => {
            const step = chartWidth / data.length;
            const x = getX(i) - step / 2;
            return (
              <rect
                key={i}
                x={x}
                y={paddingTop}
                width={step}
                height={chartHeight + 15}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>

        {/* Floating Tooltip Box */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-xs text-white text-xs rounded-lg shadow-xl px-3 py-2 border border-slate-700"
            style={{
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: '20px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-semibold text-slate-200 border-b border-slate-700/80 pb-1 mb-1.5 flex items-center justify-between gap-4">
              <span>{activePoint.displayDate}, 2026</span>
              <span className="text-[10px] text-slate-400">Day {hoverIndex + 1} of 30</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Sales:
                </span>
                <span className="font-bold text-white">${activePoint.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Units:
                </span>
                <span className="font-bold text-white">{activePoint.units}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 mt-1 text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Sales (USD)</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
          <span>Units sold</span>
        </div>
      </div>
    </div>
  );
};
