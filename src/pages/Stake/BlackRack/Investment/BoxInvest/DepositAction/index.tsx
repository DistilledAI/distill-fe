import { aiFund2Ava, usdcLogo } from "@assets/images"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { SPL_DECIMAL } from "@pages/Stake/config"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import useGetBalance from "@pages/Stake/useGetBalance"
import { numberWithCommas, toBN } from "@utils/format"
import { debounce } from "lodash"
import { useCallback, useMemo, useState } from "react"
import NumberFormat from "react-number-format"

const DepositAction = () => {
  const [amountVal, setAmountVal] = useState<string>("")
  const { connectWallet, isConnectWallet } = useConnectPhantom()
  const { balance, loading } = useGetBalance(StakeTokenAddress.Usdc)

  const debouncedFetchQuantity = useCallback(
    debounce((value: any) => {
      console.log(value)
    }, 500),
    [],
  )

  const handleInputChange = useCallback((value: number) => {
    if (value || value === 0) {
      setAmountVal(value.toString())
      debouncedFetchQuantity(value.toString())
    } else {
      setAmountVal("")
      debouncedFetchQuantity("0")
    }
  }, [])

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
            98,292 Shares{" "}
            <span className="font-medium text-mercury-700">(AIFUND2)</span>
          </p>
        </div>
      </div>
      {isConnectWallet ? (
        <Button className="mt-7 h-[48px] w-full rounded-full bg-mercury-950 text-white">
          Deposit
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

export default DepositAction
