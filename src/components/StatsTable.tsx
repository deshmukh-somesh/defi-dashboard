import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { Badge } from './ui/badge'
const cryptoData = [
    {
        id: 1,
        symbol: "BTC",
        name: "Bitcoin",
        price: 67435.82,
        change24h: 2.45,
        marketCap: "1.32T",
        volume: "28.5B",
        rank: 1
    },
    {
        id: 2,
        symbol: "ETH",
        name: "Ethereum",
        price: 3621.45,
        change24h: -1.23,
        marketCap: "435.2B",
        volume: "15.8B",
        rank: 2
    },
    {
        id: 3,
        symbol: "BNB",
        name: "BNB",
        price: 635.21,
        change24h: 4.67,
        marketCap: "92.1B",
        volume: "1.9B",
        rank: 3
    },
    {
        id: 4,
        symbol: "SOL",
        name: "Solana",
        price: 154.32,
        change24h: -3.45,
        marketCap: "72.4B",
        volume: "2.1B",
        rank: 4
    },
    {
        id: 5,
        symbol: "XRP",
        name: "XRP",
        price: 0.5234,
        change24h: 1.89,
        marketCap: "29.8B",
        volume: "1.2B",
        rank: 5
    },
    {
        id: 6,
        symbol: "ADA",
        name: "Cardano",
        price: 0.4567,
        change24h: -2.11,
        marketCap: "16.2B",
        volume: "456M",
        rank: 6
    },
    {
        id: 7,
        symbol: "AVAX",
        name: "Avalanche",
        price: 28.94,
        change24h: 5.23,
        marketCap: "12.1B",
        volume: "387M",
        rank: 7
    },
    {
        id: 8,
        symbol: "DOT",
        name: "Polkadot",
        price: 6.78,
        change24h: -1.45,
        marketCap: "9.8B",
        volume: "234M",
        rank: 8
    }
];

const StatsTable = () => {

    function formatPrice(price: number): string {
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


function PriceChangeCell({ change }: { change: number }) {
  const isPositive = change > 0;
  return (
    <TableCell className={`text-right font-medium ${isPositive ? 'crypto-gain' : 'crypto-loss'}`}>
      {isPositive ? '+' : ''}{change.toFixed(2)}%
    </TableCell>
  );
}

    return (
        // Main Crypto table
        <Card>
            <CardHeader>
                <CardTitle>
                    Top Cryptocurrencies
                </CardTitle>
                <CardDescription>
                    Love prices and market data for the top cryptocurrencies by market cap
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>
                        Cryptocurrency market data updated in real-time
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                    <TableHead className="w-[60px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                    <TableHead className="text-right">Volume (24h)</TableHead>
                  </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cryptoData.map((crypto) => (
                            <TableRow key={crypto.id} className="hover:bg-accent/50 transition-colors">
                                <TableCell className="font-medium text-muted-foreground">
                                    {crypto.rank}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
                            ${crypto.symbol === 'BTC' ? 'bg-[oklch(0.70_0.20_45)]' :
                                                crypto.symbol === 'ETH' ? 'bg-[oklch(0.65_0.25_280)]' :
                                                    'bg-primary'}`}>
                                            {crypto.symbol.slice(0, 2)}
                                        </div>
                                        {crypto.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-mono">
                                        {crypto.symbol}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono font-semibold">
                                    {formatPrice(crypto.price)}
                                </TableCell>
                                <PriceChangeCell 
                                change={crypto.change24h} />
                                <TableCell className="text-right font-mono">
                                    ${crypto.marketCap}
                                </TableCell>
                                <TableCell className=" text-right font-mono text-muted-foreground">
                                    ${crypto.volume}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default StatsTable