import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import { QueryDataKeys } from "types/queryDataKeys"

const MarkdownMessage = ({ msg }: { msg: string }) => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)
  const queryClient = useQueryClient()

  const checkTextBreak = (text: string) => {
    const tokenRegex = /[a-zA-Z0-9]{40,43}/

    if (tokenRegex.test(text)) {
      return "break-all"
    }
    return "break-words"
  }

  const replaceSrcImage = (src: string) => {
    if (src.includes("https://defi-lens.s3.us-east-2.amazonaws.com/")) {
      const imageSrc = src.replace(
        /https:\/\/defi-lens\.s3\.us-east-2\.amazonaws\.com\/media\/(.*\.jpeg)/,
        "https://static.distilled.ai/media/$1",
      )
      return imageSrc
    }

    return src
  }

  const breakLine = (text: string) => {
    const newText = text.replace(/\n+$/, "")

    let md = newText
    // Support multiple linebreaks
    md = newText.replace(/```[\s\S]*?```/g, (m) => m.replace(/\n/g, "\n "))
    md = md.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n ")
    // Support single linebreak
    md = md.replace(/(\n)/gm, "  \n")

    return md
  }

  const enhancedMessage = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, (url) => {
      if (isImageUrl(url)) {
        return `![image](${url})`
      }

      return url
    })
  }

  const renderers = useMemo(
    () => ({
      ol: ({ children }: any) => (
        <ol style={{ listStyleType: "decimal", paddingLeft: "16px" }}>
          {children}
        </ol>
      ),
      li: ({ children }: any) => <li>{children}</li>,
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
      p: ({ children }: any) => {
        const wordBreakStyle = checkTextBreak(children)
        return <p className={wordBreakStyle}>{children}</p>
      },
    }),
    [queryClient, textColor],
  )

  const processedMessage = useMemo(() => breakLine(enhancedMessage(msg)), [msg])

  return <Markdown components={renderers}>{processedMessage}</Markdown>
}

export default MarkdownMessage
