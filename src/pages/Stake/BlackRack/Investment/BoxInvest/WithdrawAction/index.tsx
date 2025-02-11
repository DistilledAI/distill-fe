import { aiFund2Ava, usdcLogo } from "@assets/images"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { BN } from "@coral-xyz/anchor"
import { Button } from "@nextui-org/react"
import { SPL_DECIMAL } from "@pages/Stake/config"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { toBN } from "@utils/format"
import { formatNumberWithComma } from "@utils/index"
import { debounce } from "lodash"
import React, { useCallback, useState } from "react"
import NumberFormat from "react-number-format"
import { toast } from "react-toastify"
import { InfoVault } from "../../useGetVaultInfo"
import { Web3Invest } from "../../web3Invest"

const web3Invest = new Web3Invest()

const WithdrawAction: React.FC<{
  totalShare: number
  loadingTotalShare: boolean
  nav: number
  info: InfoVault
  callback: () => void
}> = ({ totalShare, loadingTotalShare, nav, info, callback }) => {
  const [amountVal, setAmountVal] = useState<string>("")
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [toUsdc, setToUsdc] = useState(0)
  const [fee, setFee] = useState(0)
  const { isConnectWallet } = useConnectPhantom()
  const wallet = useWallet()
  const { setVisible } = useWalletModal()

  console.log("performance fee: ", fee)

  const debouncedFetchQuantity = useCallback(
    debounce((value: string) => {
      if (value === "0") {
        setToUsdc(0)
        return
      }
      setToUsdc(toBN(nav * toBN(value).toNumber()).toNumber())
    }, 300),
    [nav],
  )

  const debouncedGetFee = useCallback(
    debounce((value: string) => {
      const resFee = Web3Invest.getPerformanceFee(
        toBN(value).toNumber(),
        info.avgPrice,
        info.nav,
        info.performanceFee,
      )
      setFee(resFee)
    }, 300),
    [info],
  )

  const handleInputChange = (value: number) => {
    if (value || value === 0) {
      setAmountVal(value.toString())
      debouncedFetchQuantity(value.toString())
      debouncedGetFee(value.toString())
    } else {
      setAmountVal("")
      debouncedFetchQuantity("0")
      debouncedGetFee("0")
    }
  }

  const AMOUNT_LIST = [
    {
      label: "25%",
      value: totalShare / 4,
    },
    {
      label: "50%",
      value: totalShare / 2,
    },
    {
      label: "75%",
      value: (totalShare / 4) * 3,
    },
    {
      label: "100%",
      value: totalShare,
    },
  ]

  const handleUnStake = async () => {
    try {
      if (!amountVal || amountVal === "0") {
        return toast.warning("Please enter amount!")
      }
      if (Number(amountVal) <= 0) {
        return toast.warning("Amount must large 0!")
      }
      if (Number(amountVal) > totalShare) {
        return toast.warning(`Max: ${totalShare}!`)
      }
      if (loadingSubmit) return
      setLoadingSubmit(true)
      const amount = toBN(
        toBN(amountVal)
          .multipliedBy(10 ** SPL_DECIMAL)
          .toFixed(0, 1),
      ).toNumber()
      const res = await web3Invest.unbound({
        wallet,
        amount: new BN(amount),
      })
      if (res) {
        toast.success("Unbond Successfully!")
        setAmountVal("")
        callback()
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
                {loadingTotalShare ? "--" : formatNumberWithComma(totalShare)}{" "}
                AIFII
              </p>
            </div>
          </div>
          <div>
            <div className="flex h-[46px] min-w-[100px] items-center gap-1 rounded-full bg-mercury-100 px-2">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={aiFund2Ava}
              />
              <span>AIFII</span>
            </div>
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
      <div className="my-5 flex items-center justify-center">
        <div className="flex h-7 w-7 rotate-[-90deg] items-center justify-center rounded-full bg-mercury-200">
          <div className="scale-80">
            <ArrowLeftFilledIcon />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border-1 border-[#A88E67] bg-brown-50 px-4 py-3">
        <p className="font-semibold text-mercury-950">Receive:</p>
        <div className="flex items-center gap-1">
          <img className="h-5 w-5 rounded-full" src={usdcLogo} />
          <p className="font-semibold text-brown-600">
            {toUsdc === 0 ? "0" : formatNumberWithComma(toUsdc - fee)} USDC
          </p>
        </div>
      </div>
      <p className="mt-1 text-right text-13 text-mercury-900">
        Fee: {fee === 0 ? "0" : +fee.toFixed(6)} USDC
      </p>
      {isConnectWallet ? (
        <Button
          onClick={handleUnStake}
          isLoading={loadingSubmit}
          className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white"
        >
          Unbond
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
  )
}

export default WithdrawAction
