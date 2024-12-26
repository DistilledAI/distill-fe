import { TrendingIcon } from "@components/Icons/TrendingPage"
import useTrendingAgentList from "../hooks/useTrendingAgentList"
import TrendingAgentTable from "./TrendingAgentTable"
import { Tab, Tabs } from "@nextui-org/react"

enum Interval {
  "24H" = "24H",
  "7D" = "7D",
  "1M" = "1M",
}

const INTERVALS = [
  {
    label: "24H",
    value: Interval["24H"],
    isDisabled: false,
  },
  {
    label: "7D",
    value: Interval["7D"],
    isDisabled: true,
  },
  {
    label: "1M",
    value: Interval["1M"],
    isDisabled: true,
  },
]

const TrendingAgentList = () => {
  const { trendingAgentList } = useTrendingAgentList()
  // const [interval, setInterval] = useState(Interval["24H"])

  return (
    <div className="mt-7 md:mt-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TrendingIcon />
          <h3 className="text-18 font-bold text-mercury-950 md:text-22">
            Trending
          </h3>
        </div>

        <div className="flex items-center">
          <Tabs
            key={"underlined"}
            variant={"underlined"}
            aria-label="Tabs variants"
            defaultSelectedKey={Interval["24H"]}
            classNames={{
              tabContent:
                "text-[16px] font-medium text-mercury-700 group-data-[selected=true]:text-mercury-950",
            }}
            disabledKeys={[Interval["1M"], Interval["7D"]]}
          >
            {INTERVALS.map((item) => (
              <Tab
                // onClick={() => setInterval(item.value)}
                key={item.value}
                title={item.label}
              />
            ))}
          </Tabs>
        </div>
      </div>
      <TrendingAgentTable trendingAgentList={trendingAgentList} />
    </div>
  )
}

export default TrendingAgentList
