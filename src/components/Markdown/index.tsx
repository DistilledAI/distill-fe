import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import React, { memo, useMemo } from "react"

const checkTextBreak = (text: string): string => {
  const tokenRegex = /[a-zA-Z0-9/]{40,}/
  return tokenRegex.test(text) ? "break-all" : "break-words"
}

const replaceSrcImage = (src: string): string => {
  if (src.includes("https://defi-lens.s3.us-east-2.amazonaws.com/")) {
    return src.replace(
      /https:\/\/defi-lens\.s3\.us-east-2\.amazonaws\.com\/media\/(.*\.jpeg)/,
      "https://static.distilled.ai/media/$1",
    )
  }
  return src
}

const breakLine = (text: string): string => {
  const newText = text?.replace(/\n+$/, "")
  let md = newText
  md = newText?.replace(/```[\s\S]*?```/g, (m) => m.replace(/\n/g, "\n "))
  md = md?.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n ")
  md = md?.replace(/(\n)/gm, "  \n")
  return md
}

const enhancedMessage = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text?.replace(urlRegex, (url) =>
    isImageUrl(url) ? `![image](${url})` : url,
  )
}

interface MarkdownMessageProps {
  msg: string
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ msg }) => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)
  const queryClient = useQueryClient()

  const processedMessage = useMemo(() => {
    const enhanced = enhancedMessage(msg)
    return breakLine(enhanced)
  }, [msg])

  const renderers = useMemo(
    () => ({
      ol: ({ children }: any) => (
        <ol style={{ listStyleType: "decimal", paddingLeft: "16px" }}>
          {children}
        </ol>
      ),
      li: ({ children }: any) => (
        <li className={checkTextBreak(children)}>{children}</li>
      ),
      img: ({ src, alt }: any) => {
        const imageSrc = replaceSrcImage(src)
        return (
          <img
            src={imageSrc}
            alt={alt}
            className="max-h-[300px] min-h-[200px] cursor-pointer rounded-3xl border border-mercury-100 object-cover shadow-1"
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
      p: ({ children }: any) => (
        <p
          className={twMerge(
            checkTextBreak(children),
            "text-[16px] font-medium",
          )}
        >
          {children}
        </p>
      ),
    }),
    [queryClient, textColor],
  )

  return <Markdown components={renderers}>{processedMessage}</Markdown>
}

export default memo(MarkdownMessage)
