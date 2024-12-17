import { ScrollShadow } from "@nextui-org/react"
import React from "react"

const AgentDescription: React.FC<{
  description?: string
}> = ({ description }) => {
  return (
    <>
      <h4 className="mb-1 text-16 font-bold text-mercury-950">Description</h4>
      <ScrollShadow className="max-h-[150px]">
        <p className="line-clamp-5 text-14 font-medium text-mercury-600">
          {description}
        </p>
      </ScrollShadow>
    </>
  )
}

export default AgentDescription
