import { RefreshIcon } from "@components/Icons/RefreshIcon"
import { PlayFilledIcon } from "@components/Icons/SocialLinkIcon"
import { Button } from "@nextui-org/react"
import ChatInput from "@pages/ChatPageOld/ChatContainer/ChatInput"

const TestAgent = () => {
  const onChatSubmit = () => {}

  return (
    <div className="top-[95px] mt-2 w-[330px] rounded-[22px] border-1 border-mercury-100 p-4">
      <div className="flex items-center justify-between border-b-1 pb-4">
        <span className="text-[22px] font-bold text-mercury-950">
          Test Agent
        </span>
        <div className="flex items-center gap-4">
          <RefreshIcon color="#545454" />
          <Button className="h-[33px] rounded-full border border-mercury-50 bg-brown-50">
            <PlayFilledIcon />
            <span className="text-base-b text-brown-600">Update</span>
          </Button>
        </div>
      </div>

      <div className="relative h-[600px] flex-1 pt-1">
        {/* <ChatWindowV2
          messages={messages}
          itemContent={renderMessage}
          isLoading={isLoading}
          onLoadPrevMessages={onLoadPrevMessages}
          chatId={privateChatId}
          isFetched={isFetched}
          hasPreviousMore={hasPreviousMore}
          isFetchingPreviousPage={isFetchingPreviousPage}
          style={{
            paddingBottom: `${spacing}px`,
          }}
          className="md:max-h-[calc(100%-110px)]"
          isChatActions={isChatActions}
        /> */}

        <ChatInput
          onSubmit={onChatSubmit}
          isDisabledInput={false}
          wrapperClassName="!bottom-0 flex-col items-end md:py-3 rounded-3xl justify-end w-full left-1/2 -translate-x-1/2 "
        />
      </div>
    </div>
  )
}

export default TestAgent
