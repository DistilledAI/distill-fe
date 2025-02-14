import { Skeleton } from "@nextui-org/react"

const ClanSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-10 gap-4">
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
      <Skeleton className="h-[70px] w-full rounded-md" />
    </div>
  )
}

export default ClanSkeleton
