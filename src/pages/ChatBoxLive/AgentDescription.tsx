import { ScrollShadow } from "@nextui-org/react"
import React from "react"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const AgentDescription: React.FC<{
  isTitle?: boolean
  description?: string
  pClassname?: string
  classNames?: {
    p?: string
  }
}> = ({ description, isTitle = true, classNames }) => {
  const renderers = {
    a: ({ href, children }: any) => (
      <Link
        to={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-lgd-code-hot-ramp bg-clip-text text-14 font-semibold text-transparent hover:underline"
      >
        {children}
      </Link>
    ),
    p: ({ children }: any) => {
      return (
        <p
          className={twMerge(
            "text-[14px] font-medium text-mercury-600",
            classNames?.p,
          )}
        >
          {children}
        </p>
      )
    },
  }
  return (
    <>
      {isTitle && (
        <h4 className="mb-1 text-16 font-bold text-mercury-950">Description</h4>
      )}

      <ScrollShadow className="max-h-[150px]">
        <Markdown components={renderers}>{description}</Markdown>
      </ScrollShadow>
    </>
  )
}

export default AgentDescription
