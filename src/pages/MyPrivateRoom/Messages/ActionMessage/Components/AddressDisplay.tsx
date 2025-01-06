import { CopyIcon } from "@components/Icons/Copy"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React from "react"

const AddressDisplay: React.FC<{
  address: string
}> = ({ address }) => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-mercury-300 px-2 py-[2px]">
      <p>{centerTextEllipsis(address)}</p>
      <div
        className="cursor-pointer"
        onClick={(e) => copyClipboard(e, address)}
      >
        <CopyIcon />
      </div>
    </div>
  )
}

export default AddressDisplay
