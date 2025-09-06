export interface Pool {

    pool: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyMean30d: number;
    sigma?: number;
    predictions?: any;
    chain: string;
    category?: 'lending' | 'liquidStaking' | 'yieldAggregator';
}


export interface ChartDataPoint {
    timestamp: number;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
}


export interface APYChartProps {
  data: Array<{
    date: string;
    apy: number;
    timestamp: number;
  }>;
  loading: boolean;
  error: string | null;
}