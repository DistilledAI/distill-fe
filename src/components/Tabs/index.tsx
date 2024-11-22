import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface TabList {
  key: string
  icon?:
    | React.ReactNode
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode[]
  iconActive?:
    | React.ReactNode
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode[]
  tab: string
  content: any
  onClick?: () => void
}

const Tabs: React.FC<{
  list: TabList[]
  tabActive?: string
  classNames?: {
    wrapper?: string
    contentWrapper?: string
  }
}> = ({ list, tabActive, classNames }) => {
  const [active, setActive] = useState<string | string[]>(list[0].key)

  const isActive = (key: string) => key === active

  useEffect(() => {
    if (tabActive) setActive(tabActive)
  }, [tabActive])

  return (
    <div className={classNames?.wrapper}>
      <div className="flex items-center gap-2 border-b-1 border-mercury-100">
        {list.map((item) => (
          <div
            key={item.key}
            onClick={() =>
              item?.onClick ? item.onClick() : setActive(item.key)
            }
            className="relative cursor-pointer px-2 py-2 duration-300"
          >
            {item.icon &&
              item.iconActive &&
              (isActive(item.key) ? item.iconActive : item.icon)}
            <span
              className={twMerge(
                "block font-medium text-mercury-700 duration-300",
                isActive(item.key) && "text-mercury-950",
              )}
            >
              {item.tab}
            </span>
            <span
              className={twMerge(
                "absolute bottom-0 left-1/2 block h-[2px] w-0 -translate-x-1/2 bg-mercury-950 duration-300",
                isActive(item.key) && "w-full",
              )}
            ></span>
          </div>
        ))}
      </div>
      <div className={classNames?.contentWrapper}>
        {list.map((item) => (
          <div className={isActive(item.key) ? "" : "hidden"}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
