import { distilledAIIcon } from "@assets/svg"
import { CaretUpFilledIcon } from "@components/Icons/TrendingPage"
import { Button, Image } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import { useState } from "react"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

const MarkdownMessage = ({
  msg,
  isDeepThink = false,
}: {
  msg: string
  isDeepThink?: boolean
}) => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)
  const queryClient = useQueryClient()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const checkTextBreak = (text: string) => {
    const tokenRegex = /[a-zA-Z0-9/]{40,}/

    if (tokenRegex.test(text)) {
      return "break-all"
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
    // Support multiple linebreaks
    md = newText?.replace(/```[\s\S]*?```/g, (m) => m.replace(/\n/g, "\n "))
    md = md?.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n ")
    // Support single linebreak
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
          className="m-auto max-h-[300px] min-h-[200px] cursor-pointer rounded-3xl border border-mercury-100 object-cover object-center shadow-1"
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

  let processedMessage = breakLine(enhancedMessage(msg))
  const regex = /<think>\s*([\s\S]*?)(?:<\/think>\s*(.*))?$/
  const match = processedMessage.match(regex)

  if (isDeepThink) {
    const thinkContent = match ? match[1].trim() : "",
      processedMessage = match && match[2] ? match[2].trim() : ""

    return (
      <>
        <Button onPress={() => setIsCollapsed(!isCollapsed)} className="mb-2">
          <Image src={distilledAIIcon} alt="distilled AI icon" />
          <span className="font-medium text-mercury-950">
            {!!processedMessage ? "Thought" : "Thinking..."}
          </span>
          {isCollapsed ? (
            <div className="rotate-180">
              <CaretUpFilledIcon color="#363636" />
            </div>
          ) : (
            <CaretUpFilledIcon color="#363636" />
          )}
        </Button>
        <div
          className={twMerge(
            `overflow-hidden transition-all duration-300 ease-in-out`,
            isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100",
            "mb-2 border-l-2 border-mercury-100 px-3",
          )}
          aria-expanded={isCollapsed}
        >
          <p className="text-base-14 text-mercury-900">{thinkContent}</p>
        </div>
        <Markdown components={renderers}>{processedMessage}</Markdown>
      </>
    )
  }

  return <Markdown components={renderers}>{processedMessage}</Markdown>
}

export default MarkdownMessage
