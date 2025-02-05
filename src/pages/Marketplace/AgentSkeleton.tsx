import { Skeleton } from "@nextui-org/react"

const AgentSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-[110px] rounded-xl" />
          <Skeleton className="mt-1 h-4 w-[150px] rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-9 w-[45px] rounded-3xl" />
    </div>
  )
}

export default AgentSkeleton
