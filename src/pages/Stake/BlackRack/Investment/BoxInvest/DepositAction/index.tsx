import { aiFund2Ava, usdcLogo } from "@assets/images"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { BN } from "@coral-xyz/anchor"
import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { SPL_DECIMAL } from "@pages/Stake/config"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import useGetBalance from "@pages/Stake/useGetBalance"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { numberWithCommas, toBN } from "@utils/format"
import { formatNumberWithComma } from "@utils/index"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import NumberFormat from "react-number-format"
import { toast } from "react-toastify"
import { InfoVault } from "../../useGetVaultInfo"
import { Web3Invest } from "../../web3Invest"

const web3Invest = new Web3Invest()

const DepositAction: React.FC<{
  callback: () => void
  nav: number
  info: InfoVault
  isFetchBalance: boolean
}> = ({ callback, nav, info, isFetchBalance = false }) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [amountVal, setAmountVal] = useState<string>("")
  const [fee, setFee] = useState(0)
  const [toReward, setToReward] = useState(0)
  const wallet = useWallet()
  const { isConnectWallet } = useConnectPhantom()
  const { balance, loading, getBalance } = useGetBalance(StakeTokenAddress.Usdc)
  const { setVisible } = useWalletModal()

  useEffect(() => {
    if (isFetchBalance) getBalance()
  }, [isFetchBalance])

  const debouncedFetchQuantity = useCallback(
    debounce((value: string) => {
      if (value === "0") {
        setToReward(0)
        return
      }

      if (nav !== 0) setToReward(toBN(value).minus(fee).div(nav).toNumber())
    }, 300),
    [nav, fee],
  )

  const debouncedGetFee = useCallback(
    debounce((value: string) => {
      const resFee = Web3Invest.getManagementFee(
        toBN(value).toNumber(),
        Date.now() / 1000,
        info.nextTimeTakeManagementFee,
        info.managementFee,
      )
      console.log({ resFee })
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

  const AMOUNT_LIST = useMemo(
    () => [
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
    ],
    [balance],
  )

  const handleDeposit = async () => {
    try {
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
      const res = await web3Invest.deposit({ amount: new BN(amount), wallet })
      if (res) {
        toast.success("Deposit successfully!")
        getBalance()
        callback()
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
                  : numberWithCommas(toBN(balance.toFixed(3)).toNumber())}{" "}
                USDC
              </p>
            </div>
          </div>
          <div>
            <div className="flex h-[46px] min-w-[100px] items-center gap-1 rounded-full bg-mercury-100 px-2">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={usdcLogo}
              />
              <span>USDC</span>
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
          <img className="h-5 w-5 rounded-full" src={aiFund2Ava} />
          <p className="font-semibold text-brown-600">
            {formatNumberWithComma(toReward)} Shares{" "}
            <span className="font-medium text-mercury-700">(AIFII)</span>
          </p>
        </div>
      </div>
      <p className="mt-1 text-right text-13 text-mercury-900">
        Fee: {fee === 0 ? "0" : +fee.toFixed(6)} USDC
      </p>
      {isConnectWallet ? (
        <Button
          isLoading={loadingSubmit}
          onClick={handleDeposit}
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
  )
}

export default DepositAction
