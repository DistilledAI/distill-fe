import DistilledAIIcon from "@components/Icons/DistilledAIIcon"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { useParams } from "react-router-dom"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import LeftBar from "./LeftBar"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import { StyleBoxChatProvider } from "./StyleProvider"
import UserAuth from "./UserAuth"
import useMessageSocket from "./useMessageSocket"

const ChatBox = () => {
  const { loading, connectWallet } = useConnectWallet()
  const { chatId } = useParams()
  const { isLogin } = useAuthState()
  const { privateChatId } = useParams()

  useMessageSocket()
  const isEnableTextInput = isLogin && (privateChatId || chatId)

  return (
    <div className="flex h-full items-center justify-center pb-10 pt-[18px]">
      <div className="flex h-full w-full max-w-[1100px] flex-col gap-y-4 rounded-[32px] border border-mercury-100 bg-mercury-70 p-4">
        <div className="flex items-center justify-between">
          <DistilledAIIcon
            baseClassName="w-fit h-fit rounded-none border-none flex-none"
            iconClassName="w-[38px] h-5"
          />
          <UserAuth connectWallet={connectWallet} loading={loading} />
        </div>
        <div className="grid h-full max-h-[calc(100%-143px)] w-full grid-cols-[280px_1fr] gap-4">
          <LeftBar />
          <StyleBoxChatProvider>
            <div className="relative space-y-4">
              {isLogin && chatId ? (
                <ChatMessages />
              ) : (
                <MyPrivateAgentContent
                  connectWalletLoading={loading}
                  connectWallet={connectWallet}
                />
              )}
              <ChatInput isDisabledInput={!isEnableTextInput} />
            </div>
          </StyleBoxChatProvider>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
