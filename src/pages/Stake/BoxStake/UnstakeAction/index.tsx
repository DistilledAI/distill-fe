import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import { useSearchParams } from "react-router-dom"
import SelectToken from "../SelectToken"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { numberWithCommas, toBN } from "@utils/format"
import { useWallet } from "@solana/wallet-adapter-react"
import { ALL_CONFIGS, SPL_DECIMAL } from "@pages/Stake/config"
import React, { useState } from "react"
import { toast } from "react-toastify"
import NumberFormat from "react-number-format"

const web3Locking = new Web3SolanaLockingToken()

const UnStakeAction: React.FC<{
  total: number
  fetchTotal: () => void
}> = ({ total, fetchTotal }) => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const [amountVal, setAmountVal] = useState("")
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { connectWallet, isConnectWallet } = useConnectPhantom()
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)
  const wallet = useWallet()

  const AMOUNT_LIST = [
    {
      label: "25%",
      value: total / 4,
    },
    {
      label: "50%",
      value: total / 2,
    },
    {
      label: "75%",
      value: (total / 4) * 3,
    },
    {
      label: "100%",
      value: total,
    },
  ]

  const handleInputChange = (value: number) => {
    if (value || value === 0) {
      setAmountVal(value.toString())
    } else {
      setAmountVal("")
    }
  }

  const handleUnStake = async () => {
    try {
      if (!tokenAddress) {
        return toast.warning("Token address not found!")
      }
      if (!amountVal || amountVal === "0") {
        return toast.warning("Please enter amount!")
      }
      if (Number(amountVal) <= 0) {
        return toast.warning("Amount must large 0!")
      }
      if (Number(amountVal) > total) {
        return toast.warning(`Max: ${total}!`)
      }
      if (loadingSubmit) return
      setLoadingSubmit(true)
      const amount = toBN(
        toBN(amountVal)
          .multipliedBy(10 ** SPL_DECIMAL)
          .toFixed(0, 1),
      ).toNumber()
      const res = await web3Locking.unStake(
        ALL_CONFIGS.DURATION_STAKE,
        amount,
        wallet,
        tokenAddress,
      )
      if (res) {
        toast.success("UnStake Successfully!")
        fetchTotal()
        setAmountVal("")
      }
    } catch (error) {
      console.error(error)
      toast.error(JSON.stringify(error))
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <div className="mt-3">
      <div className="rounded-lg border-1 border-mercury-400 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-1">
          <div>
            <NumberFormat
              placeholder={`0.0`}
              thousandSeparator
              className="w-full bg-transparent text-[24px] font-medium capitalize text-mercury-950 outline-none [appearance:textfield] placeholder:text-[#585A6B] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              decimalScale={SPL_DECIMAL}
              type="text"
              value={amountVal}
              onChange={() => {}}
              isAllowed={(values) => {
                const { floatValue } = values
                return !floatValue || (floatValue >= 0 && floatValue <= 1e14)
              }}
              onValueChange={({ floatValue }: any) => {
                handleInputChange(floatValue)
              }}
            />
            <div className="flex items-center gap-1 text-14 font-medium text-mercury-700 max-md:text-12">
              <p>Available:</p>
              <p>
                {numberWithCommas(toBN(total.toFixed(3)).toNumber())}{" "}
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
            key={percent.label}
            onClick={() => setAmountVal(percent.value.toString())}
            className="cursor-pointer rounded-[4px] border-1 border-mercury-300 bg-mercury-100 px-2 py-1 text-12 font-medium text-mercury-900 hover:opacity-80"
          >
            {percent.label}
          </div>
        ))}
      </div>
      {isConnectWallet ? (
        <div className="w-full">
          {/* <Button className="mt-7 h-[48px] w-full rounded-full border-1 border-mercury-600 bg-mercury-100 font-semibold text-mercury-900">
            QUICK UNSTAKE
          </Button> */}
          <Button
            isLoading={loadingSubmit}
            onClick={handleUnStake}
            className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white"
          >
            Unbond
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
