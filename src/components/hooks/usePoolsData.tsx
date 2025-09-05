'use client'
import { POOL_CONFIG } from '@/config/POOL_CONFIG'
import { Pool } from '@/types/pool'
import { useState, useCallback, useEffect } from 'react'
export const usePoolsData = () => {
    const [data, setData] = useState<Pool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const fetchPools = useCallback(async () => {

        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://yields.llama.fi/pools');
            if (!response.ok) throw new Error('Failed to fetch pools data');

            const allPools = await response.json();

            const targetPoolIds = Object.values(POOL_CONFIG).flat();

            const filteredPools = allPools.data.filter((pool: Pool) => targetPoolIds.includes(pool.pool)).map((pool: Pool) => {
                let category: Pool['category'] = 'lending';
                if (POOL_CONFIG.liquidStaking.includes(pool.pool)) category = 'liquidStaking';
                if (POOL_CONFIG.yieldAggregator.includes(pool.pool)) category = 'yieldAggregator';

                return { ...pool, category };
            });

            
            setData(filteredPools);



        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPools();

    }, [fetchPools])

    return { data, loading, error, refetch: fetchPools }
}