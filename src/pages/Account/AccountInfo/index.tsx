import { creditBg } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { CircleCheckFilled, WarningIcon } from "@components/Icons"
import { CopyIcon } from "@components/Icons/Copy"
import { PenFullIcon } from "@components/Icons/Edit"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useState } from "react"
import EditProfile from "./EditProfile"
import useWindowSize from "@hooks/useWindowSize"

const AccountInfo = () => {
  const { isMobile } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuthState()

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(102.52% 50% at 50% 50%, #383327 0%, #292929 100%)",
      }}
      className="relative overflow-hidden rounded-[22px] px-6 py-8 max-md:flex max-md:items-center max-md:justify-between max-md:px-4 max-md:py-3"
    >
      <img
        src={creditBg}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="relative flex items-center gap-4 border-b-1 border-dashed border-mercury-800 pb-4 max-md:border-none max-md:p-0">
        <AvatarCustom
          className="h-[56px] w-[56px] rounded-full max-md:h-[40px] max-md:w-[40px]"
          src={user.avatar}
          publicAddress={user.publicAddress}
        />
        <div>
          <p className="line-clamp-1 text-20 font-bold text-white max-md:text-16">
            {user.username}
          </p>
          {user.walletActive ? (
            <div className="flex items-center gap-1 text-[#2CB34E] max-md:text-14">
              <CircleCheckFilled /> Activated
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[#F78500] max-md:text-14">
              <WarningIcon color="#F78500" /> Inactive
            </div>
          )}
        </div>
      </div>
      <div className="relative border-b-1 border-dashed border-mercury-800 py-4 max-md:hidden">
        <div className="flex items-center justify-between">
          <p className="font-medium text-mercury-600">Address:</p>
          <div
            onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
            className="flex cursor-pointer items-center gap-1"
          >
            <span className="ml-1 text-16 text-white">
              {centerTextEllipsis(user?.publicAddress ?? "", 4)}
            </span>
            <CopyIcon color="white" />
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium text-mercury-600">Bio:</p>
          <div className="max-h-[100px] overflow-y-auto scrollbar-hide">
            <p className="mt-1 font-medium text-mercury-100">
              {user.description}
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex justify-end max-md:mt-0">
        <Button
          onPress={() => setIsOpen(true)}
          className="bg-[rgba(84, 84, 84, 0.2)] rounded-full border-1 border-mercury-900 backdrop-blur-[2.5px] max-md:px-2"
        >
          <PenFullIcon size={isMobile ? 16 : 20} />
          <span className="font-bold text-white max-md:text-13">
            Edit Profile
          </span>
        </Button>
      </div>
      {isOpen && (
        <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}

export default AccountInfo
