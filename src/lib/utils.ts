import { ChartDataPoint } from "@/types/pool"
import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const processChartData = (data: ChartDataPoint[]) => {
  const monthlyData = [];
  const now = new Date();

  for(let i = 11; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

    const closestPoint = data.reduce((closest, current) => {
      // Convert ISO strings to Unix timestamps
      const closestTimestamp = Math.floor(new Date(closest.timestamp).getTime() / 1000);
      const currentTimestamp = Math.floor(new Date(current.timestamp).getTime() / 1000);
      
      const closestDiff = Math.abs(closestTimestamp - targetTimestamp);
      const currentDiff = Math.abs(currentTimestamp - targetTimestamp);
      return currentDiff < closestDiff ? current : closest;
    });

    if(closestPoint) {
      monthlyData.push({
        date: targetDate.toLocaleDateString('en-US', {month:'short', year:'numeric'}), 
        apy: Number(closestPoint.apy.toFixed(2)),
        timestamp: closestPoint.timestamp
      });
    }
  }
  return monthlyData;
}