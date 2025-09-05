import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="crypto-card">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Market Cap</CardTitle>
                </CardHeader>
                <CardContent >
                    <div className="text-2xl font-bold text-foreground">$2.45T</div>
                    <p className="text-sm crypto-gain">+2.4% (24h)</p>
                </CardContent>

            </Card>
            <Card className="crypto-card">
                <CardHeader className="pb-3">
                    <CardTitle>Total Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">$2.45T</div>
                    <p className="text-sm crypto-loss">+2.4% (24h)</p>
                </CardContent>

            </Card>
            <Card className="crypto-card">
                <CardHeader className="pb-3">
                    <CardTitle>Total Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">$2.45T</div>
                    <p className="text-sm crypto-gain">+2.4% (24h)</p>
                </CardContent>

            </Card>
            <Card className="crypto-card">
                <CardHeader className="pb-3">
                    <CardTitle>Total Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">$2.45T</div>
                    <p className="text-sm crypto-gain">+2.4% (24h)</p>
                </CardContent>

            </Card>
        </div>
    )
}

export default StatsCards

/*
Card: 
CardHeader -> CardTitle
CardContent

*/