import StatsCards from "@/components/StatsCards";
import StatsTable from "@/components/StatsTable";

export const Dashboard = () => {
    return (
        <div>
            <div className="mb-12 text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Crypto Market
                    <span className="bitcoin-accent"> Overview</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Track the latest cryptocurrency prices, market caps, and 24h changes in real-time.
                </p>
            </div>
            {/* <StatsCards >

            </StatsCards> */}

            <StatsTable />


        </div>
    )
}
