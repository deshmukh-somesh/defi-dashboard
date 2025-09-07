import { ChartDataPoint } from "@/types/pool"
import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const processChartData = (data: ChartDataPoint[]) => {
  const monthlyData = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
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

    if (closestPoint) {
      monthlyData.push({
        date: targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        apy: Number(closestPoint.apy.toFixed(2)),
        timestamp: closestPoint.timestamp
      });
    }
  }
  return monthlyData;
}


// format wallet address to show first 6 and last 4 characters.
export const formatAddress = (address: string | undefined): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Format balance from wei to ETH with 4 decimal places

export const formatBalance = (rawBalance: string): string => {
  if (rawBalance) return "0.00";
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(4);
  return balance;

}

// convering hex chain Id to decimal 
export const formatChainAsNum = (chainIdHex: string): number => {
  return parseInt(chainIdHex, 16);
}


// Get network name from chain ID
export const getNetworkName = (chainId: string): string => {
  const networks: { [key: string]: string } = {
    "0x1": "Ethereum Mainnet",
    "0x5": "Goerli Testnet", 
    "0xaa36a7": "Sepolia Testnet",
    "0x89": "Polygon Mainnet",
    "0x13881": "Polygon Mumbai",
    "0xa": "Optimism",
    "0xa4b1": "Arbitrum One",
  };
  
  return networks[chainId] || `Unknown Network (${chainId})`;
};

// Check if chain ID is supported
export const isSupportedChain = (chainId: string): boolean => {
  const supportedChains = ["0x1", "0x5", "0xaa36a7", "0x89"];
  return supportedChains.includes(chainId);
};