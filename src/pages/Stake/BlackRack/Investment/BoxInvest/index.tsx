import { Tab, Tabs } from "@nextui-org/react"
import DepositAction from "./DepositAction"
import WithdrawAction from "./WithdrawAction"
import React from "react"
import { InfoVault } from "../useGetVaultInfo"

const BoxInvest: React.FC<{
  loadingTotalShare: boolean
  totalShare: number
  nav: number
  info: InfoVault
  isFetchBalance: boolean
  callback: () => void
}> = ({
  totalShare,
  loadingTotalShare,
  nav,
  info,
  isFetchBalance,
  callback,
}) => {
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
            <DepositAction
              isFetchBalance={isFetchBalance}
              info={info}
              nav={nav}
              callback={callback}
            />
          </Tab>
          <Tab key="unstake" title="Withdraw">
            <WithdrawAction
              callback={callback}
              totalShare={totalShare}
              loadingTotalShare={loadingTotalShare}
              nav={nav}
              info={info}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default BoxInvest
