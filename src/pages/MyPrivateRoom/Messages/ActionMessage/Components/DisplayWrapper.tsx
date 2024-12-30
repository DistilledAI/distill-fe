import React from "react"

const DisplayWrapper: React.FC<{
  titleHead?: string
  children?: any
}> = ({ titleHead = "YOUR REQUEST", children }) => {
  return (
    <div className="relative rounded-[14px] border-1 border-brown-600 bg-brown-50 p-4">
      <p className="absolute top-[-15px] rounded-full bg-mercury-900 px-2 py-1 text-13 font-semibold text-white">
        {titleHead}
      </p>
      {children}
    </div>
  )
}

export default DisplayWrapper
