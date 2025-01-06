import { twMerge } from "tailwind-merge"
import CmdChatWindow from "../CmdChatWindow"
import CmdActionMessage, { CmdActionKey } from "./ActionMessage"
import { ICmdMessage, useCmdMessageList } from "../CmdMessageProvider"
// import ReceiverMessage from "./ReceiverMessage"
// import SenderMessage from "./SenderMessage"

const CmdMessages = () => {
  const { messages } = useCmdMessageList()

  const renderMessage = (index: number, message: ICmdMessage) => {
    const isFirst = index === 0
    const isLockAction = !!message.lock
    const isSwapAction = !!message.swap
    const isSendAction = !!message.send
    return (
      <div className={twMerge(isFirst && "mt-4")}>
        {/* {isCustomer && <ReceiverMessage />}
        {isOwner && <SenderMessage />} */}
        {isLockAction && (
          <CmdActionMessage data={message} actionKey={CmdActionKey.lock} />
        )}
        {isSwapAction && (
          <CmdActionMessage data={message} actionKey={CmdActionKey.swap} />
        )}
        {isSendAction && (
          <CmdActionMessage data={message} actionKey={CmdActionKey.send} />
        )}
      </div>
    )
  }

  const onLoadPrevMessages = async () => {
    return undefined
  }

  return (
    <CmdChatWindow
      messages={messages}
      itemContent={renderMessage}
      isLoading={false}
      isFetched={true}
      hasPreviousMore={true}
      isFetchingPreviousPage={false}
      onLoadPrevMessages={onLoadPrevMessages}
      isChatActions={false}
      msgBoxClassName="p-0 pb-5"
      className="pt-4"
    />
  )
}

export default CmdMessages
