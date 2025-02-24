import { useSearchParams } from "react-router-dom"
import { TabKeyAgent } from "../NavTab"
import { lazy } from "react"
import { twMerge } from "tailwind-merge"
const AgentBasicInfo = lazy(() => import("./Basic"))

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
    </>
  )
}

export default AgentContent
