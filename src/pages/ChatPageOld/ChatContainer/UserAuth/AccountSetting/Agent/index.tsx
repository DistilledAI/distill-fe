import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
// import { EditPenFilledIcon, EditPenOutlineIcon } from "@components/Icons/Edit"
import { brainAIIcon } from "@assets/svg"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import { ShareWithCloudIcon } from "@components/Icons/Share"
import {
  MAP_DISPLAY_FROM_STATUS_MY_AGENT,
  PATH_NAMES,
  STATUS_AGENT,
} from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useNavigate } from "react-router-dom"
import ShareAgent from "./ShareAgent"

const PrivateAgent: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const navigate = useNavigate()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const status = myAgent?.status as number
  const isPending = status === STATUS_AGENT.PENDING

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-mercury-950">
          My Private Agent:
        </span>
        <div className="relative flex items-center gap-1">
          <span
            style={{ color: MAP_DISPLAY_FROM_STATUS_MY_AGENT[status]?.color }}
            className="text-base font-medium"
          >
            {MAP_DISPLAY_FROM_STATUS_MY_AGENT[status]?.label ?? "- - -"}
          </span>
          <AvatarCustom src={myAgent?.avatar || brainAIIcon} className="p-1" />
          {/* <Button className="absolute -bottom-2 -right-1 flex h-6 w-6 min-w-0 items-center justify-center rounded-full bg-white p-0">
            <EditPenOutlineIcon />
          </Button> */}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Name:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 block max-w-36 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none">
            {myAgent?.username ?? "-"}
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
            {myAgent?.description ?? "-"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Address:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 whitespace-nowrap text-mercury-900">
            {myAgent?.publicAddress
              ? centerTextEllipsis(myAgent?.publicAddress, 6)
              : "-"}
          </span>
          <Button
            onPress={(e) => copyClipboard(e, myAgent?.publicAddress ?? "")}
            className="h-auto w-auto min-w-0 bg-transparent p-0"
          >
            <CopyIcon />
          </Button>
          <div className="hidden md:block">
            <MetamaskIconSmall />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-mercury-600">My data:</span>
        <div className="flex items-center gap-2">
          {myAgent ? (
            <div
              onClick={() => {
                onClose()
                navigate(PATH_NAMES.MY_DATA)
              }}
              className="flex cursor-pointer items-center gap-1 hover:opacity-70"
            >
              <DatabaseSearchIcon color="#A2845E" />
              <span className="text-base font-medium text-[#A2845E]">
                Manage
              </span>
            </div>
          ) : (
            "-"
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="w-full md:w-[40%]">
          <ShareAgent
            agentData={myAgent as any}
            isDisabled={isPending || !myAgent}
          />
        </div>
        <div className="w-full md:w-[60%]">
          <Button
            className="flex w-full rounded-full bg-mercury-100 max-md:min-h-14"
            isDisabled
          >
            <ShareWithCloudIcon />
            <span className="font-medium text-mercury-950">
              Publish on Marketplace
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PrivateAgent
