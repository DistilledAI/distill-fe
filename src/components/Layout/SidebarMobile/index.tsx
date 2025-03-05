import { xDSTL } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
import { CloseFilledIcon, EditFilledIcon } from "@components/Icons/DefiLens"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { CoinsOutlineIcon } from "@components/Icons/Sidebar"
import { UserIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import { numberWithCommas } from "@utils/format"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useNavigate } from "react-router-dom"
import Socials from "../Sidebar/Socials"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"
import { PlusIcon } from "@components/Icons/Plus"
import { useState } from "react"

const SidebarMobile = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()
  const { logout } = useAuthAction()
  const [isOpen, setIsOpen] = useState(false)
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isAgentActive = myAgent?.status === STATUS_AGENT.ACTIVE
  const totalxDstlPoint = user?.xDstlPoint || 0

  const onClose = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-mercury-30 !outline-none md:h-12 md:w-12"
      >
        <AvatarCustom
          publicAddress={user.publicAddress}
          src={user.avatar}
          className="h-fit w-fit"
        />
      </button>
      <div
        className={twMerge(
          "fixed bottom-0 right-[-90%] top-0 w-[85%] rounded-l-[22px] border-1 border-mercury-100 bg-mercury-70 pt-9 duration-300",
          isOpen && "right-0",
        )}
      >
        <div onClick={onClose} className="absolute right-5 top-5">
          <CloseFilledIcon />
        </div>
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <AvatarCustom
                  publicAddress={user.publicAddress}
                  src={user.avatar}
                />
                <div>
                  <span className="text-18 font-bold text-mercury-950">
                    {user.username}
                  </span>
                  <div
                    onClick={(e) => {
                      copyClipboard(e, user?.publicAddress ?? "")
                    }}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    <span className="text-16 text-mercury-900">
                      {centerTextEllipsis(user?.publicAddress ?? "", 4)}
                    </span>
                    <CopyIcon color="#545454" size={20} />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex h-12 items-center bg-[#F6F4EC] p-2">
                <div className="flex items-center gap-3">
                  <img src={xDSTL} width={24} height={24} />
                  <span className="text-13 text-mercury-900 md:text-16">
                    <span className="font-bold">
                      {numberWithCommas(totalxDstlPoint)}
                    </span>{" "}
                    xDSTL
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button
                type="button"
                className={twMerge(
                  "flex w-full cursor-pointer items-center gap-2 rounded-full border-1 border-white bg-mercury-30 px-3 py-3",
                  !isAgentActive && !!myAgent && "opacity-50",
                )}
                disabled={!isAgentActive && !!myAgent}
                onClick={() => {
                  onClose()
                  navigate(
                    myAgent
                      ? `${PATH_NAMES.AGENT_DETAIL}/${myAgent.id}`
                      : PATH_NAMES.CREATE_AGENT,
                  )
                }}
              >
                <div
                  className={twMerge(
                    "flex items-center justify-center rounded-full border border-mercury-400 bg-mercury-100 p-1",
                  )}
                >
                  {myAgent ? (
                    <EditFilledIcon color="#545454" size={14} />
                  ) : (
                    <PlusIcon color="#545454" size={14} />
                  )}
                </div>
                <span
                  className={twMerge(
                    "whitespace-nowrap text-[16px] font-bold text-mercury-950 group-hover:text-mercury-800",
                  )}
                >
                  {myAgent ? "Edit Agent" : "Create Agent"}
                </span>
              </button>
              <div
                onClick={() => {
                  onClose()
                  navigate(PATH_NAMES.ACCOUNT)
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-full border-1 border-white bg-mercury-30 px-3 py-3"
              >
                <UserIcon />
                <span className="text-16 font-bold text-mercury-900">
                  My Profile
                </span>
              </div>
              <div
                onClick={() => {
                  onClose()
                  navigate("/account?tab=my-vault-holdings")
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-full border-1 border-white bg-mercury-30 px-3 py-3"
              >
                <CoinsOutlineIcon />
                <span className="text-16 font-bold text-mercury-900">
                  My Staked Vaults
                </span>
              </div>
              <div
                onClick={() => {
                  onClose()
                  logout(true)
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-full border-1 border-white bg-mercury-30 px-3 py-3"
              >
                <LogoutIcon color="#FF3B30" />
                <span className="text-16 font-bold text-[#FF3B30]">
                  Log out
                </span>
              </div>
            </div>
          </div>
          <div className="pb-3">
            <Socials />
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarMobile
