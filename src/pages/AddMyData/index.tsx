import ConnectData from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/ConnectData"
import MainContainerCreate from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/MainContainerCreate"
import { useParams } from "react-router-dom"

const AddMyData = () => {
  const { botId } = useParams()

  return (
    <MainContainerCreate botId={botId}>
      <ConnectData />
    </MainContainerCreate>
  )
}

export default AddMyData
