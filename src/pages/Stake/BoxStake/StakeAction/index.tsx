import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import useGetBalance from "@pages/Stake/useGetBalance"
import { numberWithCommas } from "@utils/format"
import { ChangeEvent, useState } from "react"
import { useSearchParams } from "react-router-dom"
import SelectToken from "../SelectToken"

const StakeAction = () => {
  const [searchParams] = useSearchParams()
  const [amountVal, setAmountVal] = useState<string>("")
  const tokenAddress = searchParams.get("token")
  const { connectWallet, isConnectWallet } = useConnectPhantom()
  const { balance, loading } = useGetBalance(tokenAddress)
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  const AMOUNT_LIST = [
    {
      label: "25%",
      value: balance / 4,
    },
    {
      label: "50%",
      value: balance / 2,
    },
    {
      label: "75%",
      value: (balance / 4) * 3,
    },
    {
      label: "100%",
      value: balance,
    },
  ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(parseFloat(value))) {
      setAmountVal(value)
    } else if (value === "") {
      setAmountVal("")
    }
  }

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
              value={amountVal}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-1 text-14 font-medium text-mercury-700">
              <p>Available:</p>
              <p>
                {loading ? "--" : numberWithCommas(balance)}{" "}
                {tokenInfo?.tokenName}
              </p>
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
            onClick={() => setAmountVal(percent.value.toString())}
            key={percent.label}
            className="cursor-pointer rounded-[4px] border-1 border-mercury-300 bg-mercury-100 px-2 py-1 text-12 font-medium text-mercury-900 hover:opacity-80"
          >
            {percent.label}
          </div>
        ))}
      </div>
      {isConnectWallet ? (
        <Button className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white">
          STAKE
        </Button>
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

export default StakeAction
