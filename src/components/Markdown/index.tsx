import { loadingBrain } from "@assets/lotties"
import { CircleCheckFilled } from "@components/Icons"
import { ChevronUpOutlineIcon } from "@components/Icons/ChevronDownIcon"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import Lottie from "lottie-react"
import { useState } from "react"
import Markdown, { Components } from "react-markdown"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import CitationsList from "./CitationsList"

interface MarkdownMessageProps {
  msg: string
  isSenderMessage?: boolean
}

interface CollapsibleSectionProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  borderColor: string
  bgColor: string
  textColor: string
}

const CollapsibleSection = ({
  isCollapsed,
  setIsCollapsed,
  icon,
  title,
  children,
  borderColor,
  bgColor,
  textColor,
}: CollapsibleSectionProps) => (
  <>
    <button
      type="button"
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="mb-4 flex items-center gap-1 rounded-full"
    >
      <div className="h-4 w-4">{icon}</div>
      <span className="text-14 font-normal leading-[150%] tracking-[-0.14px] text-mercury-600">
        {title}
      </span>
      <div className={twMerge(isCollapsed && "rotate-180")}>
        <ChevronUpOutlineIcon />
      </div>
    </button>

    <div
      className={twMerge(
        `mb-4 ml-5 overflow-hidden border-l-3 px-4 py-2 transition-all duration-300 ease-in-out`,
        isCollapsed ? "m-0 max-h-0 p-0 opacity-0" : "opacity-100",
        borderColor,
        bgColor,
      )}
      aria-expanded={!isCollapsed}
    >
      <p
        className={twMerge(
          "whitespace-pre-line text-14 font-medium leading-[140%] tracking-[-0.325px]",
          textColor,
        )}
      >
        {children}
      </p>
    </div>
  </>
)

const MarkdownMessage = ({ msg, isSenderMessage }: MarkdownMessageProps) => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)
  const queryClient = useQueryClient()
  const [isSourceCollapsed, setIsSourceCollapsed] = useState(false)
  const [isThinkCollapsed, setIsThinkCollapsed] = useState(false)

  const checkTextBreak = (text: string) => {
    const tokenRegex = /[a-zA-Z0-9/]{40,}/
    const maxLength = 500
    const sysRegex = /<<SYS>>[\s\S]*?<<\/SYS>>/

    if (sysRegex.test(text)) {
      return "break-words whitespace-pre-wrap max-w-full overflow-x-auto"
    }
    if (tokenRegex.test(text)) {
      return "break-all"
    }
    if (text?.length > maxLength) {
      return "break-words whitespace-pre-wrap max-w-full"
    }
    return "break-words"
  }

  const replaceSrcImage = (src: string) => {
    if (src.includes("https://defi-lens.s3.us-east-2.amazonaws.com/")) {
      return src?.replace(
        /https:\/\/defi-lens\.s3\.us-east-2\.amazonaws\.com\/media\/(.*\.jpeg)/,
        "https://static.distilled.ai/media/$1",
      )
    }
    return src
  }

  const breakLine = (text: string) => {
    const newText = text?.replace(/\n+$/, "")
    let md = newText
    md = newText?.replace(/```[\s\S]*?```/g, (m) => m.replace(/\n/g, "\n "))
    md = md?.replace(/(?<=\n\n)(?![*-])\n/g, " \n ")
    md = md?.replace(/(\n)/gm, "  \n")
    return md
  }

  const enhancedMessage = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text?.replace(urlRegex, (url) => {
      if (isImageUrl(url)) {
        return `![image](${url})`
      }
      return url
    })
  }

  const renderers: Partial<Components> = {
    ol: ({ children }) => (
      <ol style={{ listStyleType: "decimal", paddingLeft: "16px" }}>
        {children}
      </ol>
    ),
    li: ({ children }) => {
      const wordBreakStyle = checkTextBreak(children as string)
      return <li className={wordBreakStyle}>{children}</li>
    },
    img: ({ src, alt }) => {
      const imageSrc = replaceSrcImage(src || "")
      return (
        <img
          src={imageSrc}
          alt={alt}
          className="max-h-[300px] min-h-[200px] cursor-pointer rounded-3xl border border-mercury-100 object-cover object-center shadow-1"
          onClick={() =>
            queryClient.setQueryData<string>(
              [QueryDataKeys.MEDIA_PREVIEW],
              () => imageSrc,
            )
          }
        />
      )
    },
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={textColor}
      >
        {children}
      </a>
    ),
    p: ({ children }) => {
      const wordBreakStyle = checkTextBreak(children as string)
      return (
        <p className={twMerge(wordBreakStyle, "text-[16px] font-medium")}>
          {children}
        </p>
      )
    },
    h4: ({ children }) => {
      const wordBreakStyle = checkTextBreak(children as string)
      return (
        <p className={twMerge(wordBreakStyle, "text-[16px] font-medium")}>
          {children}
        </p>
      )
    },
  }

  const sysRegex = /<<SYS>>([\s\S]*?)<<\/SYS>>/
  const sysMatch = msg.match(sysRegex)

  if (sysMatch) {
    const sysContent = sysMatch[1].trim()
    const remainingContent = msg.replace(sysRegex, "").trim()
    const processedMessage = breakLine(enhancedMessage(remainingContent))

    return (
      <>
        <div className="h-full max-w-full rounded-lg border border-mercury-200 bg-mercury-50 p-3">
          <p className="whitespace-pre-wrap text-14 text-mercury-900">
            {sysContent}
          </p>
        </div>
        {processedMessage && (
          <Markdown components={renderers}>{processedMessage}</Markdown>
        )}
      </>
    )
  }

  if (isSenderMessage) {
    const processedMessage = breakLine(enhancedMessage(msg))
    return <Markdown components={renderers}>{processedMessage}</Markdown>
  }

  let newMsg = msg
  let sourceContent = ""
  let thinkContent = ""
  let outsideThinkContent = newMsg
  let privateData = [] as string[]
  let isSourceLoading = true

  let sourceMatch = newMsg.match(
    /<source>([\s\S]*?)<\/source>|<source>([\s\S]*)/,
  )

  if (sourceMatch) {
    sourceContent = (sourceMatch[1] || sourceMatch[2]).trim()
    outsideThinkContent = outsideThinkContent.replace(sourceMatch[0], "").trim()

    let regex = /\[private_data\]\[([^\]]+)\]/
    let match = sourceContent.match(regex)

    if (match) {
      privateData = match[1]?.split(",")?.map((id) => id?.trim())
      sourceContent = sourceContent.replace(match[0], "").trim()
    }
    isSourceLoading = false
  }

  let thinkMatch = newMsg.match(/<think>([\s\S]*?)<\/think>|<think>([\s\S]*)/)
  if (thinkMatch) {
    thinkContent = (thinkMatch[1] || thinkMatch[2]).trim()
    outsideThinkContent = outsideThinkContent.replace(thinkMatch[0], "").trim()
  }

  const processedMessage = breakLine(enhancedMessage(outsideThinkContent))

  const getStatusIcon = (hasContent: boolean) =>
    hasContent ? (
      <CircleCheckFilled color="#888888" />
    ) : (
      <Lottie animationData={loadingBrain} />
    )

  return (
    <>
      {sourceContent && (
        <>
          <CollapsibleSection
            isCollapsed={isSourceCollapsed}
            setIsCollapsed={setIsSourceCollapsed}
            icon={getStatusIcon(!isSourceLoading)}
            title={
              isSourceLoading
                ? "Researching based on related citations.…"
                : "Research completed based on related citations"
            }
            borderColor="border-brown-600"
            bgColor="bg-brown-50"
            textColor="text-brown-600"
          >
            {sourceContent}
          </CollapsibleSection>
          <CitationsList privateData={privateData} />
        </>
      )}

      {thinkContent && (
        <CollapsibleSection
          isCollapsed={isThinkCollapsed}
          setIsCollapsed={setIsThinkCollapsed}
          icon={getStatusIcon(!!outsideThinkContent)}
          title={outsideThinkContent ? "Thought" : "Thinking…"}
          borderColor="border-mercury-500"
          bgColor="bg-mercury-30"
          textColor="text-mercury-700"
        >
          {thinkContent}
        </CollapsibleSection>
      )}

      <Markdown components={renderers}>{processedMessage}</Markdown>
    </>
  )
}

export default MarkdownMessage
