import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { TxtIcon } from "@components/Icons/TextIcon"
import UploadFAQ from "./UploadFAQ"
import UploadSocial from "./UploadSocial"
import ListData from "./ListData"
import { useParams } from "react-router-dom"
import { mapMyDataToBot } from "services/user"
import { toast } from "react-toastify"
import { CheckedIcon } from "@components/Icons/Checked"
import useFetchData from "./useFetchData"
import UploadCommon from "./UploadCommon"
import { TYPE_DATA_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/CreatePrivateAgent"

const AddData = () => {
  const { agentId } = useParams()

  const {
    list: data,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchData(agentId ? Number(agentId) : undefined)

  const onMoreCustomRequest = async (data: any) => {
    try {
      const payload = {
        botId: agentId,
        data,
      }
      const res = await mapMyDataToBot(payload)
      if (res) {
        refetch()
        toast(
          <div className="p-4">
            <div className="flex items-center gap-2">
              <CheckedIcon size={18} /> Connect success
            </div>
            <div className="mt-2 text-16 font-medium leading-[1.2] text-mercury-900">
              {data?.length} data source(s) have been added to your data pod.
            </div>
            <div className="text-base-md mt-2 text-14 leading-[1.2] text-[#F78500]">
              Please sync your private agents with the new data.
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            closeOnClick: true,
          },
        )
        return "success"
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="mt-6 flex gap-6">
      <div className="flex w-[230px] flex-col items-stretch gap-2 rounded-[22px] border-1 border-dashed border-mercury-700 bg-mercury-50 p-4">
        <UploadCommon
          moreCustomRequest={onMoreCustomRequest}
          fileKey={TYPE_DATA_KEY.TXT_FILE}
          icon={<TxtIcon color="#363636" />}
          label="Text files"
        />
        <UploadFAQ onMoreCustomRequest={onMoreCustomRequest} />
        <UploadCommon
          moreCustomRequest={onMoreCustomRequest}
          fileKey={TYPE_DATA_KEY.PDF_FILE}
          icon={<PDFTypeIcon color="#363636" />}
          label="PDFs"
        />
        <UploadCommon
          moreCustomRequest={onMoreCustomRequest}
          fileKey={TYPE_DATA_KEY.CV_FILE}
          icon={<PDFTypeIcon color="#363636" />}
          label="CV"
        />
        <UploadSocial onMoreCustomRequest={onMoreCustomRequest} />
        <p className="mt-2 text-center text-13 font-medium text-mercury-800">
          Max file size: 20MB
        </p>
      </div>
      <div className="flex-1">
        <div className="h-full rounded-[22px] border-1 border-mercury-100 bg-mercury-30">
          <ListData
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  )
}

export default AddData
