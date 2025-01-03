import { solanaLogo } from "@assets/images"
import DisplayWrapper from "../Components/DisplayWrapper"
import CmdTokenInfo from "../Components/TokenInfo"
import { LOCK_TIME_OPTIONS } from "@pages/MyPrivateRoom/DexActionCore/constants"
import React from "react"
import { ICmdMessage } from "@pages/MyPrivateRoom/CmdMessageProvider"
import { LIST_TOKEN_LOCK } from "@components/CommandChat/Actions/LockToken"
import useLockSubmit from "./useLockSubmit"
import { twMerge } from "tailwind-merge"
import { Spinner } from "@nextui-org/react"
import { CircleCheckFilled } from "@components/Icons"
import { Link } from "react-router-dom"

const LockToken: React.FC<{
  data: ICmdMessage
}> = ({ data }) => {
  const { handleSubmit, isLoading, txh } = useLockSubmit()
  const tokenInfo = LIST_TOKEN_LOCK.find(
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
        {txh ? (
          <div className="flex items-center gap-1">
            <CircleCheckFilled size={20} />
            <Link
              className="underline"
              target="_blank"
              to={`https://solscan.io/tx/${txh}`}
            >
              Transaction details
            </Link>
          </div>
        ) : (
          <div
            onClick={() => {
              if (isLoading) return
              handleSubmit({
                duration: data.lock?.duration,
                amount: data.lock?.amount,
                tokenAddress: data.lock?.tokenAddress,
              })
            }}
            className={twMerge(
              "item flex cursor-pointer gap-1 font-semibold text-brown-600 underline",
              isLoading && "opacity-70",
            )}
          >
            {isLoading && <Spinner size="sm" />} Approve to do this
          </div>
        )}
      </div>
    </DisplayWrapper>
  )
}

export default LockToken
