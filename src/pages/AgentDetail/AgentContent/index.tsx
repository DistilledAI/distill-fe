import { useSearchParams } from "react-router-dom"
import { lazy } from "react"
import { TabKeyAgent } from "@pages/CreateAgent/NavTab"
const AgentBasicInfo = lazy(() => import("./Basic"))
const ClanUtilities = lazy(() => import("./ClanUtilities"))
const Knowledge = lazy(() => import("./Knowledge"))
const AutonomousTG = lazy(() => import("./AutonomousTG"))
const AutonomousX = lazy(() => import("./AutonomousX"))
const TypeAgent = lazy(() => import("./TypeAgent"))

interface Props {
  clanIdOfAgent: string
}

const AgentContent = ({ clanIdOfAgent }: Props) => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")
  const isActive = (key: TabKeyAgent) => tab === key

  const getClassName = (tabKey: TabKeyAgent) => {
    if (isActive(tabKey)) return "block"
    return "hidden"
  }

  return (
    <>
      <div className={getClassName(TabKeyAgent.Basic)}>
        <AgentBasicInfo />
      </div>
      <div className={getClassName(TabKeyAgent.ClanUtilities)}>
        <ClanUtilities clanIdOfAgent={clanIdOfAgent} />
      </div>
      <div className={getClassName(TabKeyAgent.Knowledge)}>
        <Knowledge />
      </div>
      <div className={getClassName(TabKeyAgent.AgentType)}>
        <TypeAgent />
      </div>
      <div className={getClassName(TabKeyAgent.AutonomousTG)}>
        <AutonomousTG />
      </div>
      <div className={getClassName(TabKeyAgent.AutonomousX)}>
        <AutonomousX />
      </div>
    </>
  )
}

export default AgentContent
