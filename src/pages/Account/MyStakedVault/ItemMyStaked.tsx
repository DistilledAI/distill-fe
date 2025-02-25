import { shortenNumber } from "@utils/index"
import React from "react"

const ItemMyStaked: React.FC<{
  data: Record<string, any>
}> = ({ data }) => {
  return (
    <div className="flex items-center gap-2 text-14 font-medium">
      {shortenNumber(data.myStaked)} {data.tokenName}
    </div>
  )
}

export default ItemMyStaked
