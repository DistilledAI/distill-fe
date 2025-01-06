import { solanaLogo } from "@assets/images"
import DisplayWrapper from "../Components/DisplayWrapper"
import CmdTokenInfo from "../Components/TokenInfo"
import AddressDisplay from "../Components/AddressDisplay"
import React from "react"
import { ICmdMessage } from "@pages/MyPrivateRoom/CmdMessageProvider"
import { LIST_TOKEN_SEND } from "@components/CommandChat/Actions/SendToken"
import { CircleCheckFilled } from "@components/Icons"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { Spinner } from "@nextui-org/react"
import useSendSubmit from "./useSendSubmit"

const SendToken: React.FC<{
  data: ICmdMessage
}> = ({ data }) => {
  const { handleSubmit, isLoading, txh } = useSendSubmit()
  const tokenInfo = LIST_TOKEN_SEND.find(
    (item) => item.id === data.send?.tokenAddress,
  )

  return (
    <DisplayWrapper>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 pt-1">
          <p className="font-semibold">Send</p>
          <CmdTokenInfo
            tokenAva={tokenInfo?.avatar as string}
            networkAva={solanaLogo}
            amount={data.send?.amount as string}
            tokenName={tokenInfo?.title as string}
          />
          <p className="font-semibold">to</p>
          <AddressDisplay address={data.send?.toAccountAddress as string} />
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
                tokenAddress: data.send?.tokenAddress,
                toAccountAddress: data.send?.toAccountAddress,
                amount: data.send?.amount,
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

export default SendToken
