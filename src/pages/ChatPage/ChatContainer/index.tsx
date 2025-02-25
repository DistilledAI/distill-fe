import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ChatMessages from "./ChatMessages"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import SendMessage from "./SendMessage"

const ChatContainer = () => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { inviteAgentId, privateChatId, chatId } = useParams()
  const { isLogin } = useAuthState()
  const navigate = useNavigate()
  const groupId = chatId || privateChatId

  useEffect(() => {
    if (chatId && !isLogin) navigate("/")
  }, [isLogin, chatId])

  return (
    <div className="relative h-full max-h-[calc(100dvh-100px)] w-full">
      {(isLogin && chatId) || inviteAgentId ? (
        <>
          <ChatMessages />
          <SendMessage groupId={groupId} />
        </>
      ) : (
        <MyPrivateAgentContent
          connectWalletLoading={loading}
          connectWallet={connectMultipleWallet}
        />
      )}
    </div>
  )
}

export default ChatContainer
