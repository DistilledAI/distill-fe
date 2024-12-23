import MyEcho from "./MyEcho"
// import Playground from "./Playground"
import { xMasBg } from "@assets/images"
import { DistilledAIIcon } from "@components/Icons/DistilledAIIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import ButtonMarketplace from "@pages/Marketplace/ButtonMarketplace"
import TrendingButton from "@pages/Trending/TrendingButton"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import AnalyticsInfoWrap from "./AnalyticsInfoWrap"
import ChatClans from "./Clans"
import PrivateAI from "./PrivateAI"
import SidebarCollapsed from "./SidebarCollapsed"

const LeftBar = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <div>
      <div
        className={twMerge(
          "bg-re min-h-dvh w-[329px] transition-all duration-300 ease-in-out",
          sidebarCollapsed && "w-[104px]",
        )}
      />
      <div className="fixed left-0 top-0 z-[21] h-dvh p-4 pr-0">
        <div
          className={twMerge(
            "relative flex h-full w-[313px] max-w-[313px] flex-shrink-0 flex-col gap-4 overflow-hidden rounded-[32px] border border-mercury-100 bg-mercury-70 bg-contain bg-bottom bg-no-repeat p-4 transition-all duration-300 ease-in-out",
            sidebarCollapsed && "w-[88px]",
          )}
        >
          <div
            className={twMerge(
              "flex items-center justify-between",
              sidebarCollapsed && "flex-col justify-center gap-6",
            )}
          >
            <Link to={"/"}>
              <DistilledAIIcon
                baseClassName="w-fit h-fit rounded-none border-none flex-none"
                iconClassName="w-[38px] h-5"
              />
            </Link>
            <SidebarCollapsed />
          </div>
          <div
            className={twMerge("relative z-[1] h-[calc(100%-152px)] flex-1")}
          >
            <MyEcho />
            <ChatClans />
            <PrivateAI />
          </div>

          <div
            className={twMerge(
              "flex justify-between gap-2",
              sidebarCollapsed && "flex-shrink-0 flex-col justify-center",
            )}
          >
            {/* <Playground /> */}
            <TrendingButton />
            <ButtonMarketplace />
          </div>
          <AnalyticsInfoWrap />
          <img
            className="absolute -bottom-[2px] left-0 h-[352px] w-full"
            src={xMasBg}
          />
        </div>
      </div>
    </div>
  )
}
export default LeftBar
