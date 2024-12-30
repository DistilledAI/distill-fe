import CmdChatWindow from "../CmdChatWindow"
import CmdActionMessage, { CmdActionKey } from "./ActionMessage"
import ReceiverMessage from "./ReceiverMessage"
import SenderMessage from "./SenderMessage"

const CmdMessages = () => {
  const messages: any = [{}, {}]

  const renderMessage = (index: number) => {
    const isOwner = index === 1
    const isCustomer = index !== 1
    return (
      <div>
        {isCustomer && <ReceiverMessage />}
        {isOwner && <SenderMessage />}
        <CmdActionMessage actionKey={CmdActionKey.swap} />
        <CmdActionMessage actionKey={CmdActionKey.send} />
        <CmdActionMessage actionKey={CmdActionKey.lock} />
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
      msgBoxClassName="p-0 pb-4"
      className="pt-4"
    />
  )
}

export default CmdMessages
