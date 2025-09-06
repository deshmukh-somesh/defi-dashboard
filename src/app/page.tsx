'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { usePoolsData } from "@/components/hooks/usePoolsData";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen mt-8">
      <MaxWidthWrapper className="pb-24 sm:pb-32 lg:gap-x-0 xl:gap-x-6 lg:pb-52">
        <Header/>
        <Dashboard/>
      </MaxWidthWrapper>
    </div>
  );
}