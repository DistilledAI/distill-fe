import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
// import { EditPenFilledIcon, EditPenOutlineIcon } from "@components/Icons/Edit"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import { ShareWithCloudIcon } from "@components/Icons/Share"
import { Button } from "@nextui-org/react"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useEffect, useState } from "react"
import { getMyPrivateAgent } from "services/chat"
// import AgentDescription from "./Description"
import { brainAIIcon } from "@assets/svg"
import { STATUS_AGENT } from "@constants/index"
import { TYPE_CONTENT } from ".."
import ShareAgent from "./ShareAgent"

const PrivateAgent: React.FC<{ setTypeContent: any }> = ({
  setTypeContent,
}) => {
  const [listBot, setListBot] = useState<any[]>([])
  const firstBot = listBot?.[0]
  const status = firstBot?.status
  const MAP_LABEL_FROM_STATUS = {
    [STATUS_AGENT.PENDING]: "Awaiting creation on pod",
  }
  const isPending = status === STATUS_AGENT.PENDING

  const callGetMyPrivateAgent = async () => {
    try {
      const res = await getMyPrivateAgent()
      if (res) {
        setListBot(res?.data?.items)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    callGetMyPrivateAgent()
  }, [])

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-mercury-950">
          My Private Agent:
        </span>
        <div className="relative flex items-center gap-1">
          <span className="text-base font-medium text-[#FF9500]">
            {MAP_LABEL_FROM_STATUS[status]}
          </span>
          <AvatarCustom src={firstBot?.avatar || brainAIIcon} />
          {/* <Button className="absolute -bottom-2 -right-1 flex h-6 w-6 min-w-0 items-center justify-center rounded-full bg-white p-0">
            <EditPenOutlineIcon />
          </Button> */}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Name:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 block max-w-36 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none">
            {firstBot?.username ?? "-"}
          </span>
          {/* <Button className="h-auto w-auto min-w-0 bg-transparent p-0">
            <EditPenFilledIcon />
          </Button> */}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Description:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 block max-w-36 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none">
            {firstBot?.description ?? "-"}
          </span>
        </div>
      </div>
      {/* <AgentDescription /> */}
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Address:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 whitespace-nowrap text-mercury-900">
            {firstBot?.publicAddress
              ? centerTextEllipsis(firstBot?.publicAddress, 6)
              : "-"}
          </span>
          <Button
            onClick={(e) => copyClipboard(e, firstBot?.publicAddress ?? "")}
            className="h-auto w-auto min-w-0 bg-transparent p-0"
          >
            <CopyIcon />
          </Button>
          <MetamaskIconSmall />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-mercury-600">My data:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 whitespace-nowrap text-mercury-900">
            2 days ago
          </span>
          <Button
            className="h-auto w-auto min-w-0 bg-transparent p-0"
            onClick={() => setTypeContent(TYPE_CONTENT.MY_DATA)}
          >
            <span className="text-base-md text-[#A2845E]">Manage</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <ShareAgent agentData={firstBot} isDisabled={isPending || !firstBot} />
        <Button
          className="flex rounded-full bg-mercury-100"
          // isDisabled={isPending || !firstBot}
          isDisabled
        >
          <ShareWithCloudIcon />
          <span className="font-medium text-mercury-950">
            Publish on Marketplace
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PrivateAgent
