import { useState, useEffect, useRef } from "react"
import AvatarCustom from "@components/AvatarCustom"
import { twMerge } from "tailwind-merge"
import { useQuery } from "@tanstack/react-query"
import { getLikedAgentMessage } from "services/messages"

function usePrevious(value: string | undefined) {
  const [current, setCurrent] = useState<string | undefined>(value)
  const [previous, setPrevious] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (current !== value) {
      setPrevious(current)
      setCurrent(value)
    }
  }, [value, current])

  return previous
}

// const mockMessages = [
//   "This is a short message",
//   "This is a longer message that might need to be expanded to see full content",
//   "Random message number three with some interesting content",
//   "Hello world! This is a test message for animation",
//   "Another different message to trigger the animation effect",
// ]

// const mockUsers = [
//   { username: "user1", avatarSrc: "avatar1.jpg", publicAddress: "0x1" },
//   { username: "user2", avatarSrc: "avatar2.jpg", publicAddress: "0x2" },
//   { username: "user3", avatarSrc: "avatar3.jpg", publicAddress: "0x3" },
// ]

// const getLikedAgentMessage = async (groupId: number) => {
//   const randomMessage =
//     mockMessages[Math.floor(Math.random() * mockMessages.length)]
//   const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]

//   return {
//     message: randomMessage,
//     user: randomUser,
//   }
// }

interface LikedAgentMessageProps {
  groupId: number
}

export const LikedAgentMessage = ({ groupId }: LikedAgentMessageProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const messageRef = useRef<HTMLParagraphElement>(null)

  const { data: likedMessage } = useQuery({
    queryKey: ["liked-agent-message", groupId],
    queryFn: () => getLikedAgentMessage(groupId),
    enabled: !!groupId,
    refetchInterval: 10000,
  })

  const prevMessage = usePrevious(likedMessage?.message)

  useEffect(() => {
    if (likedMessage?.message) {
      if (likedMessage.message !== prevMessage) {
        setShowMessage(false)
        const timeout = setTimeout(() => {
          setShowMessage(true)
        }, 300)
        return () => clearTimeout(timeout)
      }
    }
  }, [likedMessage?.message, prevMessage])

  useEffect(() => {
    const checkOverflow = () => {
      if (messageRef.current) {
        setIsOverflowing(
          messageRef.current.scrollHeight > messageRef.current.clientHeight,
        )
      }
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [likedMessage?.message])

  return (
    <div
      className={twMerge(
        "absolute top-[42px] z-50 mx-auto flex gap-2 rounded-lg border border-brown-500 bg-brown-50 p-1 shadow-8 max-md:left-2 md:w-[calc(100%-40px)] md:gap-3 md:px-3",
        "w-[calc(100dvw-168px)] transition-all duration-300 ease-in-out",
        showMessage
          ? "min-h-[40px] translate-y-0 scale-100 opacity-100"
          : "h-0 translate-y-4 scale-95 overflow-hidden opacity-0 duration-75",
      )}
    >
      {likedMessage && (
        <>
          <AvatarCustom
            src={likedMessage?.user?.avatarSrc}
            publicAddress={likedMessage?.user?.publicAddress}
            className="relative h-6 w-6 md:h-8 md:w-8"
          />
          <div className="flex flex-1 flex-col">
            <span className="text-12 font-bold text-brown-500 md:text-14">
              {likedMessage?.user?.username}
            </span>
            <div className="relative">
              <p
                ref={messageRef}
                className={twMerge(
                  "max-h-[300px] overflow-auto text-[12px] font-medium text-mercury-950 md:text-[14px]",
                  !isExpanded && "line-clamp-1",
                )}
              >
                {likedMessage?.message}
              </p>
              {isOverflowing && (
                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="cursor-pointer text-[11px] font-medium text-brown-500 hover:text-brown-600 md:text-13"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
