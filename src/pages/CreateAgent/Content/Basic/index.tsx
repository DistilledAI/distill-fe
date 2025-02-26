import { useParams } from "react-router-dom"
import Appearance from "./Appearance"
import Personality from "./Personality"
import AdvancedSetting from "./AdvancedSetting"

const AgentBasicInfo = () => {
  const { agentId } = useParams()

  return (
    <div>
      <Appearance />
      <Personality />
      {!!agentId && <AdvancedSetting />}
    </div>
  )
}

export default AgentBasicInfo
