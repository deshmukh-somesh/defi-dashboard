
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

import { PoolDetail } from "@/components/PoolDetail"
export default async function PoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params  // Await params first
    
    
    return (
        <MaxWidthWrapper>
            <PoolDetail poolId={id}  />
        </MaxWidthWrapper>
    )
}