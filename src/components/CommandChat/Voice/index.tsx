import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import VoiceChat from "@pages/ChatPage/ChatBox/ChatInput/Voice"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"

const VoiceCommand = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const { setMessage } = useCommandMsgChat()
  return (
    <VoiceChat
      resetTranscript={resetTranscript}
      isListening={listening}
      SpeechRecognition={SpeechRecognition}
      transcript={transcript}
      setMessages={setMessage}
      isDisabled={false}
    />
  )
}

export default VoiceCommand
