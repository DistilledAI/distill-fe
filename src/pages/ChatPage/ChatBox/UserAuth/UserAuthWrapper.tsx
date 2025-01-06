import { useAppSelector } from "@hooks/useAppRedux"
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import { twMerge } from "tailwind-merge"
import UserAuth from "."
import BackAction from "./BackAction"
import { PATH_NAMES } from "@constants/index"
import { useLocation, useParams } from "react-router-dom"
import Title from "./Title"

const UserAuthWrapper = () => {
  const { connectMultipleWallet } = useConnectWallet()
  useReconnectWallet()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const location = useLocation()
  const { agentId } = useParams()
  const isFullWidth = [PATH_NAMES.TRENDING].includes(location.pathname)
  const isBgTransparent = [`${PATH_NAMES.PRIVATE_ROOM}/${agentId}`].includes(
    location.pathname,
  )

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-20 flex w-full items-center justify-between bg-white pl-[329px] text-end duration-300",
        sidebarCollapsed && "pl-[104px]",
        isBgTransparent && "bg-transparent pl-0",
        isFullWidth && "pl-0",
      )}
    >
      <BackAction />
      <Title />
      <div className="w-full flex-1 px-4 pb-2 pt-4">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default UserAuthWrapper
