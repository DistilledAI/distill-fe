import { CopyIcon } from "@components/Icons/Copy"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React from "react"

const ContractAddress: React.FC = () => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-mercury-300 px-2 py-[2px]">
      <p>{centerTextEllipsis("123123123123123123123321312")}</p>
      <div
        className="cursor-pointer"
        onClick={(e) => copyClipboard(e, "asdasd")}
      >
        <CopyIcon />
      </div>
    </div>
  )
}

export default ContractAddress
