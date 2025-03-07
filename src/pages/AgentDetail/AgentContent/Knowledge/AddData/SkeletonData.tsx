import { Skeleton } from "@nextui-org/react"

const SkeletonData = () => {
  return (
    <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

export default SkeletonData
