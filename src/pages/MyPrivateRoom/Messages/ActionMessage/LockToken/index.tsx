import { solanaLogo } from "@assets/images"
import DisplayWrapper from "../Components/DisplayWrapper"
import CmdTokenInfo from "../Components/TokenInfo"
import useLock from "@pages/MyPrivateRoom/DexActionCore/Lock/useLock"
import { Network } from "@pages/MyPrivateRoom/DexActionCore/interface"
import { useAppSelector } from "@hooks/useAppRedux"
import { toBN } from "@utils/format"
import {
  LOCK_TIME_OPTIONS,
  TIMER,
} from "@pages/MyPrivateRoom/DexActionCore/constants"
import React from "react"
import { ICmdMessage } from "@pages/MyPrivateRoom/CmdMessageProvider"
import { LIST_TOKEN } from "@components/CommandChat/Actions/LockToken"

const LockToken: React.FC<{
  data: ICmdMessage
}> = ({ data }) => {
  const { handleLock } = useLock()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  console.log("myAgent: ", myAgent)
  console.log("Data: ", data)

  const onSubmit = async () => {
    const timestamp = Math.floor(Date.now())
    const decimals = 6
    const duration = 1 * TIMER.MONTH_TO_SECONDS
    const amount = toBN(
      toBN("0.5")
        .multipliedBy(10 ** decimals)
        .toFixed(0, 1),
    ).toNumber()
    const res = await handleLock({
      network: Network.SOL,
      msgSign: {
        action: "sign_solana",
        timestamp,
      },
      agentWalletAddress: "6qe2EtWg2uLVD2isYGeN6d6Rx3cp5Z9gctZwZ8qWj3vh",
      tokenAddress: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
      amount,
      endpointAgent: "http://15.235.226.9:7000",
      signerAddress: "4YzXu6YAYaa7eocKyjQu3PCkjvFjN75qRkPSuhJamr5Q",
      timestamp,
      duration,
    })
    console.log("SSSS", res)
  }

  const tokenInfo = LIST_TOKEN.find(
    (item) => item.id === data.lock?.tokenAddress,
  )
  const duration = LOCK_TIME_OPTIONS.find(
    (item) => item.value === data.lock?.duration,
  )

  return (
    <DisplayWrapper>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 pt-1">
          <p className="font-semibold">Lock</p>
          <CmdTokenInfo
            tokenAva={tokenInfo?.avatar as string}
            networkAva={solanaLogo}
            amount={data.lock?.amount as string}
            tokenName={tokenInfo?.title as string}
          />
          <span>for</span>
          <div className="flex h-8 items-center justify-center rounded-md bg-mercury-300 px-2">
            <span className="font-medium">{duration?.title}</span>
          </div>
        </div>
        <div
          onClick={onSubmit}
          className="cursor-pointer font-semibold text-brown-600 underline"
        >
          Approve to do this
        </div>
      </div>
    </DisplayWrapper>
  )
}

export default LockToken
