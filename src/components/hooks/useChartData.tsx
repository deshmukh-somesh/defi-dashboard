'use client'
import { useCallback, useEffect, useState } from "react"
import { processChartData } from "@/lib/utils";
export const useChartData = (poolId: string | null) => {
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchChartData = useCallback(async (id: string) => {

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://yields.llama.fi/chart/${id}`);
            if (!response.ok) throw new Error("Failed to fetch chart data");

            const data = await response.json();
            console.log(data);

            // Process to get 1st of each month for last 12 months
            const monthlyData = processChartData(data.data);
            setChartData(monthlyData);
            
        } catch (err) {
            // setError(err instanceof Error ? err.message : "Failed to load chart data");
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        if (poolId) {
            fetchChartData(poolId);
        }

    }, [poolId, fetchChartData])

    return { chartData, loading, error }

}

