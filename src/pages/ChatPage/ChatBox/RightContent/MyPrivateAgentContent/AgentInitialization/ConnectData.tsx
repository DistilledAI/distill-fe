import AlertBox from "@components/AlertBox"
import { CheckedIcon } from "@components/Icons/Checked"
import { DatabaseIcon } from "@components/Icons/DatabaseImportIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { TxtIcon } from "@components/Icons/TextIcon"
import { PATH_NAMES } from "@constants/index"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { mapMyDataToBot } from "services/user"
import { TYPE_DATA_KEY } from "../CreatePrivateAgent"
import UploadCustom from "../UploadCustom"
import UploadFAQ from "../UploadFAQ"
import UploadSocialLink from "../UploadSocialLink"
import useActiveAgent from "../useActiveAgent"
import AgentSetupStatus from "./AgentSetupStatus"
import { AGENT_TYPE_KEY } from "./AgentType"

const ConnectData = () => {
  const navigate = useNavigate()
  const { botId } = useParams()
  const { isAgentActive, agentDataList, isAgentDataFetched, currentAgent } =
    useActiveAgent()
  //@ts-ignore
  const typeAgentData = currentAgent?.typeAgent
  console.log("🚀 ~ ConnectData ~ isAgentActive:", isAgentActive)

  const onMoreCustomRequest = async (data: any) => {
    try {
      const payload = {
        botId,
        data,
      }
      const res = await mapMyDataToBot(payload)
      if (res) {
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
            <button
              onClick={() => navigate(PATH_NAMES.MY_DATA)}
              className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-full bg-mercury-950 px-4 text-white"
            >
              <DatabaseIcon color="white" size={20} />
              <span className="text-[15px]">Go to My Data and Sync</span>
            </button>
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
    <>
      <div className="mx-auto h-auto w-full max-w-[800px] overflow-y-auto px-4 md:h-full md:px-0">
        <AgentSetupStatus isAgentActive={isAgentActive} />
        <div className="mb-4 space-y-2 md:mb-6">
          {typeAgentData === AGENT_TYPE_KEY.DEFAULT ? (
            <AlertBox
              isVisible={!isAgentActive}
              messages={[
                "Please join the whitelist to activate. You will receive an email from contact@distilled.ai once your Personal Agent has been approved.",
              ]}
              links={[
                {
                  to: "https://forms.gle/qGWWAnt3nWWAkxeE9",
                  label: "Enter waitlist",
                  external: true,
                },
                { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
              ]}
            />
          ) : (
            <div />
          )}

          <AlertBox
            isVisible={!agentDataList.length && isAgentDataFetched}
            messages={[
              "Since no data has been added, your agent lacks personalized intelligence.",
              "Please add your data to help your agent learn more about you.",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 max-md:order-2">
            <UploadSocialLink moreCustomRequest={onMoreCustomRequest} />
            <UploadCustom
              fileKey={TYPE_DATA_KEY.CV_FILE}
              icon={<PDFTypeIcon />}
              label="CV"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
            <UploadCustom
              fileKey={TYPE_DATA_KEY.PHOTO_VIDEO_FILE}
              icon={<PhotoPlusIcon />}
              label="Photos & Videos"
              accept="image/*,video/*"
              multiple
              moreCustomRequest={onMoreCustomRequest}
              isComingSoon
            />
          </div>
          <div className="flex flex-col gap-4">
            <UploadCustom
              fileKey={TYPE_DATA_KEY.PDF_FILE}
              icon={<PDFTypeIcon />}
              label="PDFs"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
            <UploadCustom
              fileKey={TYPE_DATA_KEY.TXT_FILE}
              icon={<TxtIcon />}
              label="Text files"
              accept=".txt,.md"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
            <UploadFAQ onMoreCustomRequest={onMoreCustomRequest} />
          </div>
        </div>
      </div>
    </>
  )
}
export default ConnectData
