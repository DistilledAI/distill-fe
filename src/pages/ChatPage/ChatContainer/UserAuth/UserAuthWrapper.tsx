import { useAppSelector } from "@hooks/useAppRedux"
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import { twMerge } from "tailwind-merge"
import UserAuth from "."
import BackAction from "./BackAction"
import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"
import TitlePathName from "@components/Layout/Header/TitlePathName"

const UserAuthWrapper = () => {
  const { connectMultipleWallet } = useConnectWallet()
  useReconnectWallet()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const location = useLocation()
  const isFullWidth = [PATH_NAMES.TRENDING].includes(location.pathname)

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-20 flex w-full items-center justify-between bg-white pl-[329px] text-end duration-300",
        sidebarCollapsed && "pl-[104px]",
        isFullWidth && "pl-0",
      )}
    >
      <BackAction />
      <TitlePathName />
      <div className="w-full flex-1 pb-2 pl-[18px] pr-4 pt-4">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default UserAuthWrapper
