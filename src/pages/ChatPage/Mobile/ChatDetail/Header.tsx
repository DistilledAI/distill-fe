import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import useFetchDetail from "./useFetch"
import DelegatePrivateAgent from "@pages/ChatPage/ChatBox/ChatMessages/ChatActions/DelegatePrivateAgent"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import { getActiveColorRandomById } from "@utils/index"

const ChatDetailHeader = () => {
  const navigate = useNavigate()
  const { groupDetail, chatId } = useFetchDetail()
  const { textColor } = getActiveColorRandomById(chatId)

  return (
    <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-3">
      <div className="flex items-center gap-2">
        <Button
          onPress={() => navigate("/")}
          className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
        >
          <ArrowLeftFilledIcon />
        </Button>
        <ChatInfoCurrent groupDetail={groupDetail} textColor={textColor} />
      </div>
      <div>
        <DelegatePrivateAgent />
      </div>
    </div>
  )
}

export default ChatDetailHeader
