import { Tab, Tabs } from "@nextui-org/react"
import StakeAction from "./StakeAction"
import UnStakeAction from "./UnstakeAction"

const BoxStake = () => {
  return (
    <div>
      <div className="rounded-[22px] border-1 border-mercury-100 bg-mercury-70 px-8 pb-6 pt-8">
        <Tabs
          classNames={{
            tabList: "w-full bg-mercury-200",
            base: "w-full",
            tab: "font-medium text-mercury-900",
          }}
        >
          <Tab key="stake" title="Stake">
            <StakeAction />
          </Tab>
          <Tab key="unstake" title="Unstake">
            <UnStakeAction />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default BoxStake
