import { ChartDataPoint } from "@/types/pool"
import { clsx, type ClassValue } from "clsx"
import { Metadata } from 'next'
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


export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
  title = "DeFi Dashboard - Advanced Cryptocurrency Portfolio & Trading Platform",
  description = "Comprehensive DeFi dashboard for cryptocurrency trading, portfolio management, and yield farming. Track your digital assets, analyze market trends, and maximize your DeFi investments with real-time data and advanced analytics.",
  image = "/Thumbnail.jpeg",
  icons = "/icon.ico",
  noIndex = false,
  keywords = "DeFi dashboard, cryptocurrency portfolio, crypto trading, yield farming, liquidity pools, DeFi analytics, blockchain portfolio tracker, crypto investment platform, decentralized finance"
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  keywords?: string
} = {}): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200, 
          height: 630,
          alt: 'DeFi Dashboard - Cryptocurrency Portfolio & Trading Platform'
        }
      ], 
      type: 'website', 
      siteName: 'DeFi Dashboard', 
      locale: 'en_US'
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@defidashboard",
      site: "@defidashboard",
    },
    icons,
    metadataBase: new URL('https://defi-dashboard-phi.vercel.app/'),
    alternates: {
      canonical: 'https://defi-dashboard-phi.vercel.app/'
    },
    authors: [{
      name: 'DeFi Dashboard Team',
      url: 'https://defi-dashboard-phi.vercel.app/'
    }],
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}