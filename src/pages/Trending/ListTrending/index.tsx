import { TrendingIcon } from "@components/Icons/TrendingPage"
import TableList from "./TableList"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

enum TIME {
  "24H" = "24H",
  "7D" = "7D",
  "1M" = "1M",
}

const TIMES = [
  {
    key: TIME["24H"],
    value: "24H",
  },
  {
    key: TIME["7D"],
    value: "7D",
  },
  {
    key: TIME["1M"],
    value: "1M",
  },
]

const ListTrending = () => {
  const [time, setTime] = useState(TIME["24H"])

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TrendingIcon />
          <p className="text-22 font-semibold text-mercury-950 max-md:text-18">
            Trending
          </p>
        </div>
        <div className="flex items-center border-b-1 border-mercury-100">
          {TIMES.map((item) => (
            <div
              onClick={() => setTime(item.key)}
              key={item.key}
              className={twMerge(
                "cursor-pointer border-b-2 border-transparent px-4 py-2 hover:opacity-80 max-md:text-14",
                item.key === time ? "border-mercury-950" : "",
              )}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <TableList />
      </div>
    </div>
  )
}

export default ListTrending
