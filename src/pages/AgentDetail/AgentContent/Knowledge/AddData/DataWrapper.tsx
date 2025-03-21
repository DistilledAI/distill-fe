import React from "react"

const DataWrapper: React.FC<{
  title: string
  description: string
  children: React.ReactNode | React.ReactNode[]
}> = ({ title, description, children }) => {
  return (
    <div className="rounded-[22px] border-1 border-mercury-100 bg-mercury-30 p-6 max-md:p-4">
      <p className="font-semibold">{title}</p>
      <p className="text-15 font-medium text-mercury-700 max-md:text-14">
        {description}
      </p>
      <div className="mt-4 flex gap-4 rounded-[8px] bg-mercury-70 p-3 max-md:flex-col-reverse">
        {children}
      </div>
    </div>
  )
}

export default DataWrapper
