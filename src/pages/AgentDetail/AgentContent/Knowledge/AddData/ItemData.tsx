import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { MY_DATA_STATUS } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import DeleteData from "@pages/MyData/DeleteData"
import SyncData from "@pages/MyData/SyncData"
import { BotDataTypeKey } from "@types"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const ItemData: React.FC<{
  id: number
  title: string
  value: string
  status: any
  category: BotDataTypeKey
  className?: {
    classNameTitle?: string
  }
  icon?: React.ReactNode
}> = ({ title, id, category, icon, status, value, className }) => {
  const [syncStatus, setSyncStatus] = useState(status)
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  useEffect(() => {
    setSyncStatus(status)
  }, [status])

  return (
    <div className="flex items-center justify-between rounded-[8px] border-1 border-brown-500 bg-brown-50 px-3 py-2">
      <div className="flex items-center gap-1">
        {icon && icon}
        <a
          href={value}
          target="_blank"
          className={twMerge(
            "max-w-[100px] truncate text-13 font-semibold hover:underline max-md:max-w-[170px]",
            className?.classNameTitle,
          )}
        >
          {title}
        </a>
      </div>
      <div className="flex items-center gap-[6px]">
        <div>
          <SyncData
            botId={myAgent?.id as number}
            dataId={id}
            status={syncStatus}
            setSyncStatus={setSyncStatus}
          />
        </div>
        {syncStatus !== MY_DATA_STATUS.PROCESSING && (
          <DeleteData
            trigger={<CloseFilledIcon color="#A2845E" />}
            botId={myAgent?.id as number}
            ids={[id]}
            category={category}
          />
        )}
      </div>
    </div>
  )
}

export default ItemData
