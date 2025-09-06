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

    // LOADING STATE - Show this while data is being fetched
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
                <Card className="p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="grid grid-cols-4 gap-6 mt-8">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-24 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                        <div className="h-80 bg-gray-200 rounded mt-8"></div>
                    </div>
                </Card>
            </div>
        );
    }

    // ERROR STATE - Show this if there's an error fetching pools
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
                <Card className="p-8">
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">Error loading pool data: {error}</p>
                        <Button onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // Find the specific pool AFTER we know data has loaded
    const pool = poolsData.find(p => p.pool === poolId);
    
    console.log("poolsData:", poolsData);
    console.log("poolId:", poolId);
    console.log("found pool:", pool);

    // POOL NOT FOUND STATE - Show this if the poolId doesn't match any pool
    if (!pool) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
                <Card className="p-8">
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Pool not found</p>
                        <p className="text-sm text-gray-500 mb-4">Pool ID: {poolId}</p>
                        <Button onClick={handleBack}>
                            Return to Dashboard
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // Calculate APY change
    const apyChange = pool.apy - pool.apyMean30d;
    const isPositive = apyChange > 0;

    // MAIN CONTENT - Only render this when we have a valid pool
    return (
        <div className="space-y-6 mt-15">

            <Card className="p-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 cursor-pointer">
                    <ChevronLeft className="w-4 h-4 " />
                    Back to Dashboard
                </Button>
            </div>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{pool.project}</h1>
                        <p className="text-lg text-gray-600">{pool.symbol} • {pool.chain}</p>
                        <p className="text-sm text-gray-500 mt-1">Pool ID: {pool.pool}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            pool.category === 'lending' ? 'bg-blue-100 text-blue-700' :
                            pool.category === 'liquidStaking' ? 'bg-violet-100 text-violet-700' :
                            'bg-green-100 text-green-700'
                        }`}>
                            {pool.category === 'liquidStaking' ? 'Liquid Staking' :
                             pool.category === 'yieldAggregator' ? 'Yield Aggregator' : 'Lending'}
                        </span>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">30d Change</p>
                            <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {isPositive ? '+' : ''}{apyChange.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                        <p className="text-sm text-blue-600 mb-1">Current APY</p>
                        <p className="text-3xl font-bold text-blue-900">{formatAPY(pool.apy)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-violet-50 to-violet-100 p-6 rounded-lg">
                        <p className="text-sm text-violet-600 mb-1">30d Average</p>
                        <p className="text-2xl font-bold text-violet-900">{formatAPY(pool.apyMean30d)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                        <p className="text-sm text-green-600 mb-1">Total Value Locked</p>
                        <p className="text-2xl font-bold text-green-900">{formatNumber(pool.tvlUsd)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                        <p className="text-sm text-orange-600 mb-1">Risk (Volatility)</p>
                        <p className="text-2xl font-bold text-orange-900">
                            {pool.sigma ? `${pool.sigma.toFixed(1)}%` : 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Additional Pool Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">Pool Information</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Protocol:</span>
                                <span className="text-gray-700">{pool.project}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Chain:</span>
                                <span className="text-gray-700">{pool.chain}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Symbol:</span>
                                <span className="text-gray-700">{pool.symbol}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">Yield Analysis</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Prediction:</span>
                                <span className="text-gray-700">
                                    {pool.predictions?.predictedClass || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Risk Level:</span>
                                <span className={`font-medium ${
                                    !pool.sigma ? 'text-gray-500' :
                                    pool.sigma < 2 ? 'text-green-600' :
                                    pool.sigma < 5 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                    {!pool.sigma ? 'N/A' :
                                     pool.sigma < 2 ? 'Low Risk' :
                                     pool.sigma < 5 ? 'Medium Risk' : 'High Risk'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Yield Trend:</span>
                                <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {isPositive ? 'Increasing' : 'Decreasing'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Historical APY (Last 12 Months)
                    </h2>
                    <APYChart data={chartData} loading={chartLoading} error={chartError} />
                </div>
            </Card>
        </div>
    );
};