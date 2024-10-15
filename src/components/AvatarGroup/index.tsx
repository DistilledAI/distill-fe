import { Avatar } from "@nextui-org/react"
import React from "react"

const AvatarGroup: React.FC<{
  groupName?: string
}> = ({ groupName }) => {
  return (
    <div className="flex-items-center gap-3">
      <div className="relative h-10 w-10">
        <Avatar
          className="absolute right-0 top-0 h-6 w-6 border border-mercury-400"
          disableAnimation={true}
        />
        <Avatar
          className="absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 border border-mercury-400"
          disableAnimation={true}
        />
        <Avatar
          className="absolute left-0 top-0 h-6 w-6 border border-mercury-400"
          disableAnimation={true}
        />
      </div>
      {groupName && (
        <span className="text-base-md line-clamp-1 text-ellipsis text-mercury-950">
          {groupName}
        </span>
      )}
    </div>
  )
}

export default AvatarGroup
