import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { Badge } from './ui/badge'
import { usePoolsData } from '@/components/hooks/usePoolsData' // Import your hook
import { Pool } from '@/types/pool' // Import your Pool type
import { useMemo, useState } from "react"
import { CategoryFilter } from "./CategoryFilter"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { useSDK } from '@metamask/sdk-react';
import { PremiumModal } from "./PremiumModal"



const Free_ROWS_LIMIT = 5;
const PoolsTable = () => {
    // Use your custom hook instead of mock data
    const { data: poolsData, loading, error } = usePoolsData();
    const [activeCategory, setActiveCategory] = useState('all');
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [clickedPools, setClickedPools] = useState<string[]>([]);
    const { connected} = useSDK();
    const router = useRouter();

    

    // Update your existing handleRowClick function
    const handleRowClick = (pool: Pool, index: number): void => {
        const isPremium = originalPremiumPools.has(pool.pool);
        
        if (isPremium && !connected) {
            setShowPremiumModal(true); // Show modal
        } else {
            setClickedPools(prev=> [...prev, pool.pool])
            router.push(`/pools/${pool.pool}`); // Navigate normally
        }
    };

    // premium pools set: 
    const originalPremiumPools = useMemo(() => {
        return new Set(
            poolsData.slice(Free_ROWS_LIMIT).map(pool => pool.pool)
        )
    }, [poolsData])

  

    // filter logic 
    const filteredPools = activeCategory === 'all' ? poolsData : poolsData.filter(pool => pool.category === activeCategory)

    // handlecategorychage
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    }

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
    function APYChangeCell({ current, mean30d, shouldBlur }: { current: number, mean30d: number, shouldBlur: boolean }) {
        const change = current - mean30d;
        const isPositive = change > 0;
        return (
            <TableCell className={`text-right font-medium ${shouldBlur ? "blur-[2px]" : ""} ${isPositive ? 'crypto-gain' : 'crypto-loss'}`}>
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
                {/* <CardHeader>
                    <CardTitle>DeFi Yield Opportunities</CardTitle>
                    <CardDescription>Loading pool data...</CardDescription>
                </CardHeader> */}
                <CardContent>
                    <div className="animate-pulse space-y-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="h-12 dark:bg-zinc-900 bg-gray-200 rounded"></div>
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
        <>
            <Card>
                <CardHeader>
                    {/* <CardTitle>
                        DeFi Yield Opportunities
                    </CardTitle>
                    <CardDescription className="mb-3">
                        Live yields and market data for top DeFi protocols across lending, liquid staking, and yield aggregators
                    </CardDescription > */}
                    <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
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
                            {filteredPools.map((pool, index) => {
                                const categoryInfo = getCategoryInfo(pool.category);
                                const isPremium = originalPremiumPools.has(pool.pool)
                                const shouldBlur = isPremium && !connected;
                                return (
                                    <TableRow
                                        key={pool.pool}
                                        // onClick={() => isPremium ? console.log(pool.pool) : router.push(`/pools/${pool.pool}`)}
                                        onClick={() => !clickedPools.includes(pool.pool) && handleRowClick(pool, index)}
                                        className={` relative ${clickedPools.includes(pool.pool) ? 'cursor-not-allowed':'cursor-pointer'}`}
                                        
                                    >
                                        {/* <TableCell className={`font-medium text-muted-foreground ${isPremium ? "blur-[2px]" : ""}`}> */}
                                        <TableCell className={`font-medium text-muted-foreground`}>
                                            {shouldBlur ? <Lock className="w-4 h-4" /> : index + 1}
                                        </TableCell>

                                        <TableCell className={`font-semibold ${shouldBlur ? "blur-[2px]" : ""}`}>
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

                                        <TableCell className={shouldBlur ? "blur-[2px]" : ""}>
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
                                        <TableCell className={`text-right font-mono font-semibold ${shouldBlur ? "blur-[2px]" : ""}`}>
                                            {formatAPY(pool.apy)}
                                        </TableCell>
                                        <TableCell className={`text-right font-mono ${shouldBlur ? "blur-[2px]" : ""}`}>
                                            {formatAPY(pool.apyMean30d)}
                                        </TableCell>
                                        <APYChangeCell
                                            current={pool.apy}
                                            mean30d={pool.apyMean30d}
                                            shouldBlur={shouldBlur}
                                        />
                                        <TableCell className={`text-right font-mono ${shouldBlur ? "blur-[2px]" : ""}`}>
                                            {formatNumber(pool.tvlUsd)}
                                        </TableCell>
                                        <TableCell className={`text-right font-mono text-muted-foreground ${shouldBlur ? "blur-[2px]" : ""}`}>
                                            {pool.sigma ? `${pool.sigma.toFixed(1)}%` : 'N/A'}
                                        </TableCell>
                                        <TableCell className={`text-right text-xs text-muted-foreground ${shouldBlur ? "blur-[2px]" : ""}`}>
                                            {pool.predictions ? pool.predictions?.predictedClass : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}

            />
        </>
    )
}

export default PoolsTable;
