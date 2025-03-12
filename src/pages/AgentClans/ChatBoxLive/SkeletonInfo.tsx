import { Skeleton } from "@nextui-org/react"

const SkeletonInfo = () => {
  return (
    <div>
      <div className="mt-3 hidden items-center justify-between gap-3 md:flex">
        <Skeleton className="h-10 w-[80px] rounded-full" />
        <Skeleton className="h-10 w-[80px] rounded-full" />
        <Skeleton className="h-10 w-[80px] rounded-full" />
      </div>
      <div className="mt-3 hidden md:block">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
      <Skeleton className="mt-3 hidden h-5 w-full rounded-xl md:block" />
    </div>
  )
}

export default SkeletonInfo

export const SkeletonDesc = () => {
  return (
    <div className="hidden md:block">
      <Skeleton className="mt-3 h-5 w-[100px] rounded-xl" />
      <Skeleton className="mt-2 h-5 w-full rounded-sm" />
      <Skeleton className="mt-1 h-5 w-[90%] rounded-sm" />
      <Skeleton className="mt-1 h-5 w-full rounded-sm" />
    </div>
  )
}
