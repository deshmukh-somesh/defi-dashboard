import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import StatsTable from "@/components/StatsTable";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section>
        <Header></Header>
        <MaxWidthWrapper className=" pb-24 pt-10  sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          {/* <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Crypto Market
              <span className="bitcoin-accent"> Overview</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Track the latest cryptocurrency prices, market caps, and 24h changes in real-time.
            </p>
          </div> */}
          <StatsCards>

          </StatsCards>

          <StatsTable>

          </StatsTable>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
