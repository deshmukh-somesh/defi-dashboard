'use client'
import { useChartData } from "./hooks/useChartData";
import { Button } from "./ui/button";
import { ChevronLeft, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { APYChart } from "./ApyChart";
import { useRouter } from "next/navigation";
import { usePoolsData } from "./hooks/usePoolsData";

export const PoolDetail = ({ poolId }: { poolId: string }) => {
    const formatNumber = (num: number) => {
        const safeNum = num ?? 0;
        if (safeNum >= 1e9) return `$${(safeNum / 1e9).toFixed(1)}B`;
        if (safeNum >= 1e6) return `$${(safeNum / 1e6).toFixed(1)}M`;
        if (safeNum >= 1e3) return `$${(safeNum / 1e3).toFixed(1)}K`;
        return `$${safeNum.toFixed(0)}`;
    };

    const formatAPY = (apy: number) => `${(apy ?? 0).toFixed(2)}%`;

    const { data: poolsData, loading, error } = usePoolsData();
    const { chartData, loading: chartLoading, error: chartError } = useChartData(poolId);

    const router = useRouter();

    function handleBack() {
        router.push('/');
    }

    // LOADING STATE
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
                <Card className="fintech-card p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-muted rounded-lg w-1/3"></div>
                        <div className="h-4 bg-muted rounded-lg w-1/4"></div>
                        <div className="grid grid-cols-4 gap-6 mt-8">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-24 bg-muted rounded-lg"></div>
                            ))}
                        </div>
                        <div className="h-80 bg-muted rounded-lg mt-8"></div>
                    </div>
                </Card>
            </div>
        );
    }

    // ERROR STATE
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
                <Card className="fintech-card p-8">
                    <div className="text-center py-8">
                        <p className="text-destructive mb-4">Error loading pool data: {error}</p>
                        <Button onClick={() => window.location.reload()} className="btn-financial">
                            Retry
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    const pool = poolsData.find(p => p.pool === poolId);

    // POOL NOT FOUND STATE
    if (!pool) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
                <Card className="fintech-card p-8">
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Pool not found</p>
                        <p className="text-sm text-muted-foreground/70 mb-4">Pool ID: {poolId}</p>
                        <Button onClick={handleBack} className="btn-financial">
                            Return to Dashboard
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    const apyChange = pool.apy - pool.apyMean30d;
    const isPositive = apyChange > 0;

    // MAIN CONTENT
    return (
        <div className="space-y-6 mt-15">
            <Card className="fintech-card p-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                        <ChevronLeft className="w-4 h-4" />
                        Back 
                    </Button>
                </div>

                <div className="flex justify-between items-start mb-5">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{pool.project}</h1>
                        <p className="text-lg text-muted-foreground">{pool.symbol} • {pool.chain}</p>
                        <p className="text-sm text-muted-foreground/70 mt-1">Pool ID: {pool.pool}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${pool.category === 'lending' ? 'bg-chart-2/10 text-chart-2 border-chart-2/20' :
                                pool.category === 'liquidStaking' ? 'bg-chart-5/10 text-chart-5 border-chart-5/20' :
                                    'bg-chart-3/10 text-chart-3 border-chart-3/20'
                            }`}>
                            {pool.category === 'liquidStaking' ? 'Liquid Staking' :
                                pool.category === 'yieldAggregator' ? 'Yield Aggregator' : 'Lending'}
                        </span>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">30d Change</p>
                            <p className={`text-lg font-semibold ${isPositive ? 'profit-gain' : 'financial-loss'}`}>
                                {isPositive ? '+' : ''}{apyChange.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-7">
                    <div className="fintech-card p-6 bg-gradient-to-r from-chart-2/5 to-chart-2/10 border border-chart-2/15 shadow-sm hover:shadow-md transition-all duration-200">
                        <p className="text-sm text-chart-2 mb-1">Current APY</p>
                        <p className="text-3xl font-bold text-foreground">{formatAPY(pool.apy)}</p>
                    </div>
                    <div className="fintech-card p-6 bg-gradient-to-r from-chart-5/5 to-chart-5/10 border border-chart-5/15 shadow-sm hover:shadow-md transition-all duration-200">
                        <p className="text-sm text-chart-5 mb-1">30d Average</p>
                        <p className="text-2xl font-bold text-foreground">{formatAPY(pool.apyMean30d)}</p>
                    </div>
                    <div className="fintech-card p-6 bg-gradient-to-r from-chart-3/5 to-chart-3/10 border border-chart-3/15 shadow-sm hover:shadow-md transition-all duration-200">
                        <p className="text-sm text-chart-3 mb-1">Total Value Locked</p>
                        <p className="text-2xl font-bold text-foreground">{formatNumber(pool.tvlUsd)}</p>
                    </div>
                    <div className="fintech-card p-6 bg-gradient-to-r from-chart-1/5 to-chart-1/10 border border-chart-1/15 shadow-sm hover:shadow-md transition-all duration-200">
                        <p className="text-sm text-chart-1 mb-1">Risk (Volatility)</p>
                        <p className="text-2xl font-bold text-foreground">
                            {pool.sigma ? `${pool.sigma.toFixed(1)}%` : 'N/A'}
                        </p>
                    </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="fintech-card p-4">
                        <h3 className="font-semibold text-foreground mb-2">Pool Information</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Protocol:</span>
                                <span className="text-foreground">{pool.project}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Chain:</span>
                                <span className="text-foreground">{pool.chain}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Symbol:</span>
                                <span className="text-foreground">{pool.symbol}</span>
                            </div>
                        </div>
                    </div>

                    <div className="fintech-card p-4">
                        <h3 className="font-semibold text-foreground mb-2">Yield Analysis</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Prediction:</span>
                                <span className="text-foreground">
                                    {pool.predictions?.predictedClass || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Risk Level:</span>
                                <span className={`font-medium ${!pool.sigma ? 'text-muted-foreground' :
                                        pool.sigma < 2 ? 'profit-gain' :
                                            pool.sigma < 5 ? 'amber-accent' : 'financial-loss'
                                    }`}>
                                    {!pool.sigma ? 'N/A' :
                                        pool.sigma < 2 ? 'Low Risk' :
                                            pool.sigma < 5 ? 'Medium Risk' : 'High Risk'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Yield Trend:</span>
                                <span className={`font-medium ${isPositive ? 'profit-gain' : 'financial-loss'}`}>
                                    {isPositive ? 'Increasing' : 'Decreasing'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-chart-3" />
                        Historical APY (Last 12 Months)
                    </h2>
                    <APYChart data={chartData} loading={chartLoading} error={chartError} />
                </div>
            </Card>
        </div>
    );
};