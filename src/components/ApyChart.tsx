'use client'
import { LoadingSkeleton } from "./LoadingSkeleton"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { APYChartProps } from "@/types/pool"
export const APYChart = ({ data, loading, error }: APYChartProps) => {
    if (loading) {

        return (
            <div>
                <LoadingSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error Loading chart : {error}
            </div>
        )
    }


    if (!data.length) {
        console.log(data)
        return (
            <div>
                <p>No chart data available</p>
            </div>
        )
    }

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height={"100%"}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray={"3 3"} stroke="#f0f0f0" />
                    <XAxis
                        dataKey={"date"}
                        stroke="#6b7280"
                        fontSize={12}
                    />
                    <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        tickFormatter={(value) => `${value}%`}
                    />

                    <Tooltip
                        formatter={(value) => [`${value}%`, 'APY']}
                        labelStyle={{ color: '#374151' }}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Line
                        type={"monotone"}
                        dataKey={"apy"}
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                    />
                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}
