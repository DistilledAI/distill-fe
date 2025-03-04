import { distilledAIIcon } from "@assets/svg"
import { CaretUpFilledIcon } from "@components/Icons/TrendingPage"
import { Image } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import { useState } from "react"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

const MarkdownMessage = ({ msg }: { msg: string }) => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)
  const queryClient = useQueryClient()
  const [isCollapsed, setIsCollapsed] = useState(false)

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
    if (text.length > maxLength) {
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

  const regex = /<think>\s*([\s\S]*?)(?:\s*<\/think>\s*([\s\S]*)|$)/
  const match = msg.match(regex)

  if (match) {
    const insideThink = match ? match[1].trim() : null
    const message = match && match[2] !== undefined ? match[2].trim() : ""
    const processedMessage = breakLine(enhancedMessage(message))

    return (
      <>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-2 flex items-center gap-1 rounded-full bg-mercury-100 px-4 py-2"
        >
          <Image src={distilledAIIcon} alt="distilled AI icon" />
          <span className="font-medium text-mercury-950">
            {!!processedMessage ? "Thought" : "Thinking..."}
          </span>
          <div className={twMerge(isCollapsed && "rotate-180")}>
            <CaretUpFilledIcon color="#363636" />
          </div>
        </button>
        <div
          className={twMerge(
            `overflow-hidden transition-all duration-300 ease-in-out`,
            isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100",
            "mb-2 border-l-2 border-mercury-100 px-3",
          )}
          aria-expanded={isCollapsed}
        >
          <p className="whitespace-pre-line text-14 text-mercury-900">
            {insideThink}
          </p>
        </div>
        <Markdown components={renderers}>{processedMessage}</Markdown>
      </>
    )
  }

  const processedMessage = breakLine(enhancedMessage(msg))
  return <Markdown components={renderers}>{processedMessage}</Markdown>
}

export default MarkdownMessage
