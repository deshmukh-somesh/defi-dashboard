import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { Badge } from './ui/badge'
import { usePoolsData } from '@/components/usePoolsData' // Import your hook
import { Pool } from '@/types/pool' // Import your Pool type

const PoolsTable = () => {
    // Use your custom hook instead of mock data
    const { data: poolsData, loading, error } = usePoolsData();

    // Format large numbers (TVL, etc.)
    function formatNumber(num: number): string {
        if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
        return `$${num.toFixed(0)}`;
    }

    // Format APY percentages
    function formatAPY(apy: number): string {
        return `${apy.toFixed(2)}%`;
    }

    // Component for APY change display
    function APYChangeCell({ current, mean30d }: { current: number, mean30d: number }) {
        const change = current - mean30d;
        const isPositive = change > 0;
        return (
            <TableCell className={`text-right font-medium ${isPositive ? 'crypto-gain' : 'crypto-loss'}`}>
                {isPositive ? '+' : ''}{change.toFixed(2)}%
            </TableCell>
        );
    }

    // Get category colors and labels
    function getCategoryInfo(category: Pool['category']) {
        switch (category) {
            case 'lending':
                return { color: 'bg-blue-600', label: 'Lending' };
            case 'liquidStaking':
                return { color: 'bg-violet-600', label: 'Liquid Staking' };
            case 'yieldAggregator':
                return { color: 'bg-green-600', label: 'Yield Aggregator' };
            default:
                return { color: 'bg-gray-600', label: 'Unknown' };
        }
    }

    // Loading state
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>DeFi Yield Opportunities</CardTitle>
                    <CardDescription>Loading pool data...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse space-y-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-12 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Error state
    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>DeFi Yield Opportunities</CardTitle>
                    <CardDescription>Error loading pool data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">Error: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    DeFi Yield Opportunities
                </CardTitle>
                <CardDescription>
                    Live yields and market data for top DeFi protocols across lending, liquid staking, and yield aggregators
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>
                        DeFi pool data updated from DeFiLlama
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]">#</TableHead>
                            <TableHead>Protocol</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Current APY</TableHead>
                            <TableHead className="text-right">30d Avg APY</TableHead>
                            <TableHead className="text-right">APY Change</TableHead>
                            <TableHead className="text-right">TVL</TableHead>
                            <TableHead className="text-right">Risk (σ)</TableHead>
                            <TableHead className="text-right">Prediction</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {poolsData.map((pool, index) => {
                            const categoryInfo = getCategoryInfo(pool.category);
                            return (
                                <TableRow key={pool.pool} className="hover:bg-accent/50 transition-colors">
                                    <TableCell className="font-medium text-muted-foreground">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${categoryInfo.color}`}>
                                                {pool.project.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{pool.project}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {pool.symbol} • {pool.chain}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`font-mono ${pool.category === 'lending' ? 'bg-blue-100 text-blue-700' :
                                                    pool.category === 'liquidStaking' ? 'bg-violet-100 text-violet-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}
                                        >
                                            {categoryInfo.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-semibold">
                                        {formatAPY(pool.apy)}
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                        {formatAPY(pool.apyMean30d)}
                                    </TableCell>
                                    <APYChangeCell
                                        current={pool.apy}
                                        mean30d={pool.apyMean30d}
                                    />
                                    <TableCell className="text-right font-mono">
                                        {formatNumber(pool.tvlUsd)}
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-muted-foreground">
                                        {pool.sigma ? `${pool.sigma.toFixed(1)}%` : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right text-xs text-muted-foreground">
                                        {pool.predictions ? pool.predictions?.predictedClass  : "N/A"
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default PoolsTable