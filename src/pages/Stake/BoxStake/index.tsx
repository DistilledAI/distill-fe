import { Tab, Tabs } from "@nextui-org/react"
import StakeAction from "./StakeAction"
import UnStakeAction from "./UnstakeAction"
import React from "react"
import { StakeTokenAddress } from ".."
import { useSearchParams } from "react-router-dom"

const BoxStake: React.FC<{
  total: number
  endDate: number | null
  fetchTotal: () => void
}> = ({ total, fetchTotal, endDate }) => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const isGuardToken = tokenAddress === StakeTokenAddress.Guard

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
            <StakeAction endDate={endDate} fetchTotalStaked={fetchTotal} />
          </Tab>
          <Tab isDisabled={isGuardToken} key="unstake" title="Withdraw">
            <UnStakeAction total={total} fetchTotal={fetchTotal} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default BoxStake
