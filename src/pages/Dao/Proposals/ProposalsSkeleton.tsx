import { Skeleton } from "@nextui-org/react"

const ProposalsSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-12 cursor-pointer items-center gap-4 rounded-full bg-mercury-70 px-4 py-3 hover:bg-mercury-100"
        />
      ))}
    </div>
  )
}

export default ProposalsSkeleton
