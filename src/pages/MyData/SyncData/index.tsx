import { RefreshIcon } from "@components/Icons/RefreshIcon"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"
import { toast } from "react-toastify"
import { trainData } from "services/chat"

interface SyncDataProps {
  dataId: number
  botId: number
}

const SyncData: React.FC<SyncDataProps> = ({ dataId, botId }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSyncData = async () => {
    try {
      setLoading(true)
      const response = await trainData({
        botId,
        id: dataId,
      })
      if (response?.status === 201) {
        return toast.success("The data has been synced successfully")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <div
          className="flex cursor-pointer items-center gap-1 hover:underline"
          onClick={handleSyncData}
        >
          <RefreshIcon color="#F78500" />
          <span className="text-base-14-sb italic text-[#F78500]">Sync</span>
        </div>
      )}
    </>
  )
}

export const SyncLabel = () => {
  return (
    <div className="w-full text-end">
      <span className="text-base-14-sb italic text-[#F78500]">
        Sync agents with new data
      </span>
    </div>
  )
}
export default SyncData
