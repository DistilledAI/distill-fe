import { Skeleton } from "@nextui-org/react"

const ClanSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      <Skeleton className="h-[70px] w-[50px] rounded-md" />
      <Skeleton className="h-[70px] w-[50px] rounded-md" />
      <Skeleton className="h-[70px] w-[50px] rounded-md" />
      <Skeleton className="h-[70px] w-[50px] rounded-md" />
    </div>
  )
}

export default ClanSkeleton
