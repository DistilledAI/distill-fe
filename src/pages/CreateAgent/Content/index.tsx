import { useSearchParams } from "react-router-dom"
import { TabKeyAgent } from "../NavTab"
import { lazy } from "react"
const AgentBasicInfo = lazy(() => import("./Basic"))
const ClanUtilities = lazy(() => import("./ClanUtilities"))
const Knowledge = lazy(() => import("./Knowledge"))

const AgentContent = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")

  const renderContent = () => {
    switch (tab as TabKeyAgent) {
      case TabKeyAgent.Basic:
        return <AgentBasicInfo />
      case TabKeyAgent.ClanUtilities:
        return <ClanUtilities />
      case TabKeyAgent.Knowledge:
        return <Knowledge />

      default:
        return null
    }
  }

  return renderContent()
}

export default AgentContent
