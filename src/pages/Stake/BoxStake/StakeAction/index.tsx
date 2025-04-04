import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { SPL_DECIMAL } from "@pages/Stake/config"
import {
  getDurationByAddress,
  getInfoTokenByAddress,
} from "@pages/Stake/helpers"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import useGetBalance from "@pages/Stake/useGetBalance"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { numberWithCommas, toBN } from "@utils/format"
import moment from "moment"
import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import SelectToken from "../SelectToken"

const StakeAction: React.FC<{
  fetchTotalStaked: () => void
  endDate: number | null
}> = ({ fetchTotalStaked, endDate }) => {
  const [searchParams] = useSearchParams()
  const [amountVal, setAmountVal] = useState<string>("")
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const tokenAddress = searchParams.get("token")
  const wallet = useWallet()
  const { isConnectWallet } = useConnectPhantom()
  const { setVisible } = useWalletModal()
  const { balance, loading, getBalance } = useGetBalance(tokenAddress)
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)
  const isExpired = endDate ? Date.now() > endDate : false
  const isOffStake = [StakeTokenAddress.Banker].includes(
    tokenAddress as StakeTokenAddress,
  )

  const web3Locking = new Web3SolanaLockingToken()

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

  const handleInputChange = (value: number) => {
    if (value || value === 0) {
      setAmountVal(value.toString())
    } else {
      setAmountVal("")
    }
  }

  const handleStake = async () => {
    try {
      if (isExpired || isOffStake) return
      if (!tokenAddress) {
        return toast.warning("Token address not found!")
      }
      if (!amountVal || amountVal === "0") {
        return toast.warning("Please enter amount!")
      }
      if (Number(amountVal) <= 0) {
        return toast.warning("Amount must large 0!")
      }
      if (Number(amountVal) > balance) {
        return toast.warning(`Max: ${balance}!`)
      }
      if (loadingSubmit) return
      setLoadingSubmit(true)
      const amount = toBN(
        toBN(amountVal)
          .multipliedBy(10 ** SPL_DECIMAL)
          .toFixed(0, 1),
      ).toNumber()
      const res = await web3Locking.stake(
        getDurationByAddress(tokenAddress),
        amount,
        wallet,
        tokenAddress,
      )
      if (res) {
        toast.success("Staked successfully!")
        fetchTotalStaked()
        getBalance()
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
      <div className={`${isOffStake ? "pointer-events-none opacity-50" : ""}`}>
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
                  {loading
                    ? "--"
                    : numberWithCommas(
                        toBN(balance.toFixed(3)).toNumber(),
                      )}{" "}
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
        {endDate && (
          <div className="mt-4 text-14 font-medium text-brown-500">
            Expiration Date (UTC): {moment(endDate).utc().format("lll")}
          </div>
        )}
        {isConnectWallet ? (
          <Button
            isDisabled={isExpired || isOffStake}
            isLoading={loadingSubmit}
            onClick={handleStake}
            className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white"
          >
            Deposit
          </Button>
        ) : (
          <Button
            onPress={() => setVisible(true)}
            className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white"
          >
            CONNECT WALLET
          </Button>
        )}
      </div>
    </div>
  )
}

export default StakeAction
