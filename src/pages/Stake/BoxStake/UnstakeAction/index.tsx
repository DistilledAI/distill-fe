import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import { useSearchParams } from "react-router-dom"
import SelectToken from "../SelectToken"

const UnStakeAction = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const { connectWallet, isConnectWallet } = useConnectPhantom()
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  const AMOUNT_LIST = [
    {
      label: "25%",
      value: 100 / 4,
    },
    {
      label: "50%",
      value: 100 / 2,
    },
    {
      label: "75%",
      value: (100 / 4) * 3,
    },
    {
      label: "100%",
      value: 100,
    },
  ]

  return (
    <div className="mt-3">
      <div className="rounded-lg border-1 border-mercury-400 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <input
              type="number"
              pattern="\d*"
              className="w-full bg-transparent text-[24px] font-medium capitalize text-mercury-950 outline-none [appearance:textfield] placeholder:text-[#585A6B] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="0.0"
              required
            />
            <div className="flex items-center gap-1 text-14 font-medium text-mercury-700">
              <p>Available:</p>
              <p>10,200,123 {tokenInfo?.tokenName}</p>
            </div>
          </div>
          <div>
            <SelectToken />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        {AMOUNT_LIST.map((percent) => (
          <div
            key={percent.label}
            className="cursor-pointer rounded-[4px] border-1 border-mercury-300 bg-mercury-100 px-2 py-1 text-12 font-medium text-mercury-900 hover:opacity-80"
          >
            {percent.label}
          </div>
        ))}
      </div>
      {isConnectWallet ? (
        <div className="grid grid-cols-2 gap-3">
          <Button className="mt-7 h-[48px] w-full rounded-full border-1 border-mercury-600 bg-mercury-100 font-semibold text-mercury-900">
            QUICK UNSTAKE
          </Button>
          <Button className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white">
            UNSTAKE
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white"
        >
          CONNECT TO PHANTOM
        </Button>
      )}
    </div>
  )
}

export default UnStakeAction
