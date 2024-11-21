import React, { useEffect, useState } from "react"

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
}> = ({ list, tabActive }) => {
  const [active, setActive] = useState<string | string[]>(list[0].key)

  useEffect(() => {
    if (tabActive) setActive(tabActive)
  }, [tabActive])

  return (
    <div>
      <div>
        {list.map((item) => (
          <div
            key={item.key}
            onClick={() =>
              item?.onClick ? item.onClick() : setActive(item.key)
            }
          >
            {item.icon &&
              item.iconActive &&
              (active === item.key ? item.iconActive : item.icon)}
            <span className="block">{item.tab}</span>
          </div>
        ))}
      </div>
      <div>{list.find((item) => item.key === active)?.content}</div>
    </div>
  )
}

export default Tabs
