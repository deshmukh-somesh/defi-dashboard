export interface Pool{

    pool: string;
    project:string;
    symbol:string;
    tvlUsd:number;
    apy:number;
    apyMean30d:number;
    sigma?:number;
    predictions?:any;
    chain:string;
    category?: 'lending' | 'liquidStaking' | 'yieldAggregator';
    
}