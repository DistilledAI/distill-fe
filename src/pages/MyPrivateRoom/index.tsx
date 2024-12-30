import { bgPrivateRoom } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import CommandChat from "@components/CommandChat"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { ExternalLinkIcon2 } from "@components/Icons/Share"
import { Link, useNavigate } from "react-router-dom"
// import RoomSetting from "./Settings"
import CmdMessages from "./Messages"

const MyPrivateRoom = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100dvh-68px)]">
      <img
        className="fixed bottom-0 left-0 h-full w-full"
        src={bgPrivateRoom}
      />
      <div
        onClick={() => navigate(-1)}
        className="fixed left-0 top-0 z-[21] inline-flex h-[68px] cursor-pointer items-center gap-2 px-4"
      >
        <ArrowLeftFilledIcon color="#545454" />
        <p className="font-medium">Exit Room</p>
      </div>
      {/* <RoomSetting /> */}
      <div className="relative z-[1] mx-auto max-w-[800px] px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <AvatarCustom
              src={undefined}
              publicAddress="orai12398433984739273947"
            />
            <p className="text-[24px] font-semibold text-mercury-950">
              Welcome to your Private Room
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-16 font-semibold text-brown-500">
              Jordan's Investor Coach
            </p>
            <Link to={"#"} className="flex items-center gap-1">
              <p className="text-16 font-semibold text-mercury-800">
                0xdk45...332dhl
              </p>
              <ExternalLinkIcon2 />
            </Link>
          </div>
        </div>
        <div className="flex h-[calc(100dvh-140px)] flex-col">
          <div className="relative flex-1">
            <CmdMessages />
            <div className="absolute inset-x-0 bottom-[-4px] left-0 h-6 w-full bg-fading-white" />
          </div>
          <div className="pb-4 pt-2">
            <CommandChat />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPrivateRoom
