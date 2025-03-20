import { loadingBrain } from "@assets/lotties"
import { CircleCheckFilled } from "@components/Icons"
import { ChevronUpOutlineIcon } from "@components/Icons/ChevronDownIcon"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import Lottie from "lottie-react"
import { useState } from "react"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import CitationsList from "./CitationsList"

const MarkdownMessage = ({ msg }: { msg: string }) => {
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
      const imageSrc = src?.replace(
        /https:\/\/defi-lens\.s3\.us-east-2\.amazonaws\.com\/media\/(.*\.jpeg)/,
        "https://static.distilled.ai/media/$1",
      )
      return imageSrc
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

  const renderers = {
    ol: ({ children }: any) => (
      <ol style={{ listStyleType: "decimal", paddingLeft: "16px" }}>
        {children}
      </ol>
    ),
    li: ({ children }: any) => {
      const wordBreakStyle = checkTextBreak(children)
      return <li className={wordBreakStyle}>{children}</li>
    },
    img: ({ src, alt }: any) => {
      const imageSrc = replaceSrcImage(src)
      return (
        <img
          src={imageSrc}
          alt={alt}
          className="max-h-[300px] min-h-[200px] cursor-pointer rounded-3xl border border-mercury-100 object-cover object-center shadow-1"
          onClick={() =>
            queryClient.setQueryData<string>(
              [QueryDataKeys.MEDIA_PREVIEW],
              () => imageSrc || "",
            )
          }
        />
      )
    },
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={textColor}
      >
        {children}
      </a>
    ),
    p: ({ children }: any) => {
      const wordBreakStyle = checkTextBreak(children)
      return (
        <p className={twMerge(wordBreakStyle, "text-[16px] font-medium")}>
          {children}
        </p>
      )
    },
    h4: ({ children }: any) => {
      const wordBreakStyle = checkTextBreak(children)
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

  let newMsg = `<source>
- Information from training data:
- The weighted TVL formula sums individual vault TVLs and multiplies them by their respective point multipliers.
- Points are earned based on deposit size, vault multipliers, a loyalty bonus for existing users, and a time-based factor that incentivizes long-term commitment.
- Season 2 of the Harmonix Point Program starts at 12 PM UTC on March 4 and will conclude in 90 days after the start date.
- The total number of Harmonix Points available in Season 2 is 30,000,000.
[private_data][document_id_1,document_id_2]
- Information from tool call:</source> 
${msg}`

  let sourceContent = ""
  let thinkContent = ""
  let outsideThinkContent = newMsg
  let privateData = [] as any[]

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
  }

  let thinkMatch = newMsg.match(/<think>([\s\S]*?)<\/think>|<think>([\s\S]*)/)
  if (thinkMatch) {
    thinkContent = (thinkMatch[1] || thinkMatch[2]).trim()
    outsideThinkContent = outsideThinkContent.replace(thinkMatch[0], "").trim()
  }

  const processedMessage = breakLine(enhancedMessage(outsideThinkContent))

  return (
    <>
      {sourceContent && (
        <>
          <button
            type="button"
            onClick={() => setIsSourceCollapsed(!isSourceCollapsed)}
            className="mb-4 flex items-center gap-1 rounded-full"
          >
            <div className="h-4 w-4">
              {outsideThinkContent ? (
                <CircleCheckFilled color="#888888" />
              ) : (
                <Lottie animationData={loadingBrain} />
              )}
            </div>
            <span className="text-14 font-normal leading-[150%] tracking-[-0.14px] text-mercury-600">
              {outsideThinkContent
                ? "Research completed based on related citations"
                : "Researching based on related citations.…"}
            </span>
            <div className={twMerge(isSourceCollapsed && "rotate-180")}>
              <ChevronUpOutlineIcon />
            </div>
          </button>

          <div
            className={twMerge(
              `mb-4 ml-5 overflow-hidden border-l-3 border-brown-600 bg-brown-50 px-4 py-2 transition-all duration-300 ease-in-out`,
              isSourceCollapsed
                ? "m-0 max-h-0 p-0 opacity-0"
                : "max-h-96 opacity-100",
            )}
            aria-expanded={isSourceCollapsed}
          >
            <p className="whitespace-pre-line text-14 font-medium leading-[140%] tracking-[-0.325px] text-brown-600">
              {sourceContent}
            </p>
          </div>

          <CitationsList privateData={privateData} />
        </>
      )}

      {thinkContent && (
        <>
          <button
            type="button"
            onClick={() => setIsThinkCollapsed(!isThinkCollapsed)}
            className="mb-4 flex items-center gap-1 rounded-full"
          >
            <div className="h-4 w-4">
              {outsideThinkContent ? (
                <CircleCheckFilled color="#888888" />
              ) : (
                <Lottie animationData={loadingBrain} />
              )}
            </div>
            <span className="text-14 font-normal leading-[150%] tracking-[-0.14px] text-mercury-600">
              {outsideThinkContent ? "Thought" : "Thinking…"}
            </span>
            <div className={twMerge(isThinkCollapsed && "rotate-180")}>
              <ChevronUpOutlineIcon />
            </div>
          </button>

          <div
            className={twMerge(
              `mb-4 ml-5 overflow-hidden border-l-3 border-mercury-500 bg-mercury-30 px-4 py-2 transition-all duration-300 ease-in-out`,
              isThinkCollapsed
                ? "m-0 max-h-0 p-0 opacity-0"
                : "max-h-96 opacity-100",
            )}
            aria-expanded={isThinkCollapsed}
          >
            <p className="whitespace-pre-line text-14 font-medium leading-[140%] tracking-[-0.325px] text-mercury-700">
              {thinkContent}
            </p>
          </div>
        </>
      )}

      <Markdown components={renderers}>{processedMessage}</Markdown>
    </>
  )
}

export default MarkdownMessage
