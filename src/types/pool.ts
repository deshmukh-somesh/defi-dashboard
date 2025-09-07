export interface Pool {

    pool: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyMean30d: number;
    sigma?: number;
    predictions?: Predictions;
    chain: string;
    category?: 'lending' | 'liquidStaking' | 'yieldAggregator';
}

type Predictions = {
  predictedClass: string;
  predictedProbability: number;
  binnedConfidence: number;
}

export interface ChartDataPoint {
    timestamp: number;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    il7d?:string;
    apyBase7d?:string
}

export interface ProcessedChartDataPoint {
  date: string;
  apy: number;
  timestamp: number;
}


export interface APYChartProps {
   data: ProcessedChartDataPoint[];
  loading: boolean;
  error: string | null;
}

export interface SimplePremiumModalProps{
  isOpen: boolean;
  onClose: ()=> void;
  // onConnect: ()=> void;
  // isConnecting?: boolean;
}