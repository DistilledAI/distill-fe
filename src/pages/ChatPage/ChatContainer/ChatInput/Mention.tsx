import { AvatarMention } from "@components/AvatarContainer"
import useOutsideClick from "@hooks/useOutSideClick"
import React, { useRef } from "react"

const MentionChatInput: React.FC<{
  isOpen: boolean
  onClose: () => void
  setMessage: React.Dispatch<React.SetStateAction<string>>
  currentMentionIndex: number | null
}> = ({ isOpen, setMessage, onClose, currentMentionIndex }) => {
  const mentionRef = useRef<any>()

  useOutsideClick(mentionRef, () => onClose())

  const handleSelectMention = (val: string) => {
    if (currentMentionIndex === null) return
    const updateWords = (word: string) => {
      const words = word.split(" ")
      words[currentMentionIndex] = `@${val} `
      return words.join(" ")
    }
    setMessage((prev) => updateWords(prev))
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      ref={mentionRef}
      className="absolute bottom-[100%] left-0 z-[11] w-full rounded-xl border-1 bg-white px-3 py-1 shadow-lg"
    >
      <ul className="m-0 max-h-[200px] overflow-y-auto p-0">
        <li
          onClick={() => handleSelectMention("BAC")}
          className="cursor-pointer rounded-full p-1 hover:bg-mercury-30"
        >
          <AvatarMention name="Lukaku" publicAddress="asd12312312asdasd" />
        </li>
        <li
          onClick={() => handleSelectMention("POP")}
          className="cursor-pointer rounded-full p-1 hover:bg-mercury-30"
        >
          <AvatarMention name="Lukaku" publicAddress="asd12312312asdasd" />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-mercury-30">
          <AvatarMention name="Lukaku" publicAddress="asd12312312asdasd" />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-mercury-30">
          <AvatarMention name="Lukaku" publicAddress="asd12312312asdasd" />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-mercury-30">
          <AvatarMention name="Lukaku" publicAddress="asd12312312asdasd" />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-mercury-30">
          <AvatarMention name="Lukaku" publicAddress="asd12312312asdasd" />
        </li>
      </ul>
    </div>
  )
}

export default MentionChatInput
