import { useSearchParams } from "react-router-dom"
import { TabKeyAgent } from "../NavTab"
import { lazy } from "react"
import { twMerge } from "tailwind-merge"
const AgentBasicInfo = lazy(() => import("./Basic"))
const ClanUtilities = lazy(() => import("./ClanUtilities"))
const Knowledge = lazy(() => import("./Knowledge"))

const AgentContent = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")
  const isActive = (key: TabKeyAgent) => tab === key

  return (
    <>
      <div
        className={twMerge("hidden", isActive(TabKeyAgent.Basic) && "block")}
      >
        <AgentBasicInfo />
      </div>
      <div
        className={twMerge(
          "hidden",
          isActive(TabKeyAgent.ClanUtilities) && "block",
        )}
      >
        <ClanUtilities />
      </div>
      <div
        className={twMerge(
          "hidden",
          isActive(TabKeyAgent.Knowledge) && "block",
        )}
      >
        <Knowledge />
      </div>
    </>
  )
}

export default AgentContent
