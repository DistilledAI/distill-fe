import { ScrollShadow } from "@nextui-org/react"
import React from "react"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"

const AgentDescription: React.FC<{
  description?: string
}> = ({ description }) => {
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
