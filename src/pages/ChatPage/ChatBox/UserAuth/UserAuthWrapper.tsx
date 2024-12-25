import { useAppSelector } from "@hooks/useAppRedux"
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import BackActionAgentDetailPage from "@pages/AgentDetail/BackAction"
import { twMerge } from "tailwind-merge"
import UserAuth from "."

const UserAuthWrapper = ({ hasLeftBar = true }: { hasLeftBar?: boolean }) => {
  const { connectMultipleWallet } = useConnectWallet()
  useReconnectWallet()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-20 flex w-full items-center justify-between bg-white pl-[329px] text-end duration-300",
        sidebarCollapsed && "pl-[104px]",
        !hasLeftBar && "bg-transparent pl-0",
      )}
    >
      <BackActionAgentDetailPage />
      <div className="w-full px-4 pb-2 pt-4">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default UserAuthWrapper
