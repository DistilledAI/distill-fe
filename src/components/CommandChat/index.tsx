import ChatWrapper from "./ChatWrapper"
import ToolWrapper from "./ToolWrapper"
import { CommandMsgProvider } from "./Providers/CommandMessageProvider"
import { CommandActionProvider } from "./Providers/CommandActionProvider"
import VoiceCommand from "./Voice"
import SubmitCommandChat from "./Submit"
// import ClearContextChat from "./ClearContextChat"
import HeaderCommandChat from "./HeaderChat"

const CommandChat = () => {
  return (
    <CommandActionProvider>
      <CommandMsgProvider>
        <div className="relative flex flex-col">
          <ToolWrapper />
          <HeaderCommandChat />
          <div className="rounded-b-[22px] bg-mercury-200 p-3">
            <ChatWrapper />
            <div className="mt-1 flex items-center justify-end gap-4">
              <VoiceCommand />
              <SubmitCommandChat />
            </div>
          </div>
          {/* <ClearContextChat /> */}
        </div>
      </CommandMsgProvider>
    </CommandActionProvider>
  )
}

export default CommandChat
