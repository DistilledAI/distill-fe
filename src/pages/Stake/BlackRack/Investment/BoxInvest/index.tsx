import { Tab, Tabs } from "@nextui-org/react"
import DepositAction from "./DepositAction"
import WithdrawAction from "./WithdrawAction"
import React from "react"

const BoxInvest: React.FC<{
  loadingTotalShare: boolean
  totalShare: number
  nav: number
  callback: () => void
}> = ({ totalShare, loadingTotalShare, nav, callback }) => {
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
            <DepositAction nav={nav} callback={callback} />
          </Tab>
          <Tab key="unstake" title="Withdraw">
            <WithdrawAction
              callback={callback}
              totalShare={totalShare}
              loadingTotalShare={loadingTotalShare}
              nav={nav}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default BoxInvest
