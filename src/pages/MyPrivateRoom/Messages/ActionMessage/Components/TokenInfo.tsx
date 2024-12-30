import React from "react"

const CmdTokenInfo: React.FC<{
  tokenAva: string
  networkAva: string
  amount: number
  usdPrice: number
  tokenName: string
}> = ({ tokenAva, networkAva, amount, usdPrice, tokenName }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 items-center gap-2 rounded-lg bg-mercury-300 px-2">
        <div className="relative h-5 w-5">
          <img
            className="h-full w-full rounded-full object-cover"
            src={tokenAva}
          />
          <div className="absolute bottom-[-2px] right-[-3px] h-3 w-3 rounded-full border-1 border-white">
            <img
              className="h-full w-full rounded-full object-cover"
              src={networkAva}
            />
          </div>
        </div>
        <p className="font-semibold">
          {amount} {tokenName}
        </p>
      </div>
      <p className="text-mercury-700">(${usdPrice})</p>
    </div>
  )
}

export default CmdTokenInfo
