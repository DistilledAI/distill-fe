import { ScrollShadow } from "@nextui-org/react"
import React from "react"
import Markdown from "react-markdown"

const AgentDescription: React.FC<{
  description?: string
}> = ({ description }) => {
  const renderers = {
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-[#E7833B] hover:underline"
      >
        {children}
      </a>
    ),
    p: ({ children }: any) => {
      return <p className="text-14 font-medium text-mercury-600">{children}</p>
    },
  }
  return (
    <>
      <h4 className="mb-1 text-16 font-bold text-mercury-950">Description</h4>
      <ScrollShadow className="max-h-[150px]">
        <Markdown components={renderers}>{description}</Markdown>
      </ScrollShadow>
    </>
  )
}

export default AgentDescription
