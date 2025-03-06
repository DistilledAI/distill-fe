import { CheckedIcon } from "@components/Icons/Checked"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { mapMyDataToBot } from "services/user"
import AddSocialProfile from "./Social"
import PlainTextFile from "./PlainText"
import FaqData from "./FAQ"
import { useAppSelector } from "@hooks/useAppRedux"
import useUpdateStatus from "@pages/MyData/useUpdateStatus"

const AddData = () => {
  const { agentId } = useParams()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  useUpdateStatus(myAgent?.id as number)

  const onMoreCustomRequest = async (data: any, callback: () => void) => {
    try {
      const payload = {
        botId: agentId,
        data,
      }
      const res = await mapMyDataToBot(payload)
      if (res) {
        callback()
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
    <div className="mt-6 flex flex-col gap-6">
      <AddSocialProfile onMoreCustomRequest={onMoreCustomRequest} />
      <PlainTextFile onMoreCustomRequest={onMoreCustomRequest} />
      <FaqData onMoreCustomRequest={onMoreCustomRequest} />
    </div>
  )
}

export default AddData
