import { CheckedIcon } from "@components/Icons/Checked"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { trainData } from "services/chat"
import { match } from "ts-pattern"
import useCheckBotActive from "../useCheckBotActive"
import InfoWarningModal from "../Components/InfoWarningModal"
import { getValueInfoWarning } from "../helpers"
import { MY_DATA_STATUS } from "@constants/index"
import { twMerge } from "tailwind-merge"
import { LoadingDataIcon } from "@components/Icons"

interface SyncDataProps {
  dataId: number
  botId: number
  status: MY_DATA_STATUS
  setSyncStatus: React.Dispatch<React.SetStateAction<MY_DATA_STATUS>>
}

const SyncData: React.FC<SyncDataProps> = ({
  dataId,
  botId,
  status,
  setSyncStatus,
}) => {
  const [loading, setLoading] = useState(false)
  const { isBotActive } = useCheckBotActive()

  const handleSyncData = async () => {
    try {
      if (!isBotActive || loading) return
      setLoading(true)
      const response = await trainData({
        botId,
        id: dataId,
      })
      if (response?.status === 201) {
        setSyncStatus(MY_DATA_STATUS.PROCESSING)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const renderSyncStatus = () => {
    return match(status)
      .with(MY_DATA_STATUS.RESOLVED, () => (
        <div className="flex items-center gap-1 font-semibold text-green-500">
          <CheckedIcon size={16} />
        </div>
      ))
      .with(MY_DATA_STATUS.PROCESSING, () => (
        <div className="flex items-center gap-1 font-semibold text-[#A2845E] hover:underline">
          <LoadingDataIcon />
        </div>
      ))
      .otherwise(() => (
        <div
          className={twMerge(
            "flex cursor-pointer items-center gap-1 hover:underline",
            loading && "pointer-events-none opacity-60",
          )}
          onClick={handleSyncData}
        >
          <RefreshIcon color="#F78500" />
        </div>
      ))
  }

  return (
    <InfoWarningModal
      title={getValueInfoWarning(status).title}
      description={getValueInfoWarning(status).description}
      isShow={!isBotActive || status === MY_DATA_STATUS.PROCESSING}
    >
      {renderSyncStatus()}
    </InfoWarningModal>
  )
}

export const SyncLabel = () => {
  return (
    <div className="flex w-full items-center justify-end gap-1 max-sm:mt-1 max-sm:justify-start">
      <InfoCircleIcon />
      <span className="text-base-14-sb italic text-[#F78500]">
        Sync agents with new data
      </span>
    </div>
  )
}
export default SyncData
