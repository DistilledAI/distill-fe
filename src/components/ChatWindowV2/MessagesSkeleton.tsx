import { Skeleton } from "@nextui-org/react"
import React from "react"

const MessagesSkeleton = () => {
  return (
    <div className="mx-auto -mt-10 h-full w-full max-w-[768px] space-y-4 px-4 md:h-0 md:px-0">
      {Array.from({ length: 2 }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-mercury-100" />
            <Skeleton className="h-20 w-full max-w-[50%] rounded-[20px] bg-mercury-100" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-11 w-full max-w-[25%] rounded-[20px] bg-mercury-100" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-mercury-100" />
            <Skeleton className="h-20 w-full max-w-[70%] rounded-[20px] bg-mercury-100" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-11 w-full max-w-[45%] rounded-[20px] bg-mercury-100" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-mercury-100" />
            <Skeleton className="h-40 w-full max-w-[90%] rounded-[20px] bg-mercury-100" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-11 w-full max-w-[35%] rounded-[20px] bg-mercury-100" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-mercury-100" />
            <Skeleton className="h-[120px] w-full max-w-[60%] rounded-[20px] bg-mercury-100" />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default MessagesSkeleton
