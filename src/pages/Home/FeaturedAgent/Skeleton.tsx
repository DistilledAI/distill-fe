import { Skeleton } from "@nextui-org/react"

const FeaturedSkeleton = () => {
  return (
    <div className="mt-5 grid grid-cols-6 gap-[2px]">
      <Skeleton className="h-[180px] w-full rounded-md" />
      <Skeleton className="h-[180px] w-full rounded-md" />
      <Skeleton className="h-[180px] w-full rounded-md" />
      <Skeleton className="h-[180px] w-full rounded-md" />
      <Skeleton className="h-[180px] w-full rounded-md" />
      <Skeleton className="h-[180px] w-full rounded-md" />
    </div>
  )
}

export default FeaturedSkeleton
