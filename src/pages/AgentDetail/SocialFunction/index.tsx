import React from "react"
import CategoryLabel from "../CategoryLabel"
import { FunctionIcon } from "@components/Icons"

const SocialFunction: React.FC = () => {
  return (
    <div className="space-y-4">
      <CategoryLabel text="Functions" icon={<FunctionIcon />} />
      <div className="flex items-center justify-between"></div>
    </div>
  )
}

export default SocialFunction
