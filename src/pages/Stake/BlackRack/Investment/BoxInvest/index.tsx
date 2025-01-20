import { Tab, Tabs } from "@nextui-org/react"
import DepositAction from "./DepositAction"
import WithdrawAction from "./WithdrawAction"

const BoxInvest = () => {
  return (
    <div>
      <div className="rounded-[22px] border-1 border-mercury-100 bg-mercury-70 px-8 pb-6 pt-8 max-md:px-4">
        <Tabs
          classNames={{
            tabList: "w-full bg-mercury-200",
            base: "w-full",
            tab: "font-medium text-mercury-900",
          }}
        >
          <Tab key="stake" title="Deposit">
            <DepositAction />
          </Tab>
          <Tab key="unstake" title="Withdraw">
            <WithdrawAction />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default BoxInvest
