// app/pools/layout.tsx
import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function PoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen crypto-gradient">
      <MaxWidthWrapper>
        <Header />
        {children}
      </MaxWidthWrapper>
    </div>
  );
}