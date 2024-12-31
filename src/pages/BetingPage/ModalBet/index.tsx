import { maxAvatar } from "@assets/images"
import { loadingButtonIcon } from "@assets/svg"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { numberWithCommas, toBN } from "@utils/format"
import { MAX_ADDRESS_SOLANA } from "program/constants"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import { Web3SolanaProgramInteraction } from "../../../program/utils/web3Utils"
import { BET_TYPE } from "../CardContainer"

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

const web3Solana = new Web3SolanaProgramInteraction()

const ModalBet: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const queryClient = useQueryClient()
  const { data: type } = useQuery({
    queryKey: ["bet-type"],
    initialData: BET_TYPE.UP,
  })
  const [tokenBal, setTokenBal] = useState<number>(0)
  const [amountVal, setAmountVal] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const wallet = useWallet()
  const isInsufficientFund = toBN(amountVal || 0).isGreaterThan(tokenBal)
  const isConnectWallet = wallet.publicKey
  const disabledButton =
    !isConnectWallet || loading || isInsufficientFund || !amountVal

  const AMOUNT_LIST = [
    {
      label: "10%",
      value: tokenBal / 10,
    },
    {
      label: "25%",
      value: tokenBal / 4,
    },
    {
      label: "50%",
      value: tokenBal / 2,
    },
    {
      label: "75%",
      value: (tokenBal / 4) * 3,
    },
    {
      label: "100%",
      value: tokenBal,
    },
  ]

  const handleSetType = (betType: BET_TYPE) => {
    queryClient.setQueryData(["bet-type"], () => betType)
  }

  const getBalance = async () => {
    if (!isConnectWallet) {
      return
    }

    try {
      const address = wallet.publicKey?.toBase58() || ""
      const tokenBal = await web3Solana.getTokenBalance(
        address,
        MAX_ADDRESS_SOLANA,
      )
      setTokenBal(tokenBal ? tokenBal : 0)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    getBalance()
  }, [wallet.publicKey])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(parseFloat(value))) {
      setAmountVal(value)
    } else if (value === "") {
      setAmountVal("") // Allow empty string to clear the input
    }
  }

  const handleConfirmSetPosition = async () => {
    setLoading(true)
    const betAmount = toBN(amountVal)
      .multipliedBy(10 ** 6)
      .toString()
    const side = type === BET_TYPE.DOWN ? { down: {} } : { up: {} }
    await web3Solana.createOrder(wallet, betAmount, side)
    setLoading(false)
    closeModal()
  }

  const onConnectPhantomWallet = async () => {
    wallet.select(PhantomWalletName)
    await wallet.connect().catch(() => {
      toast.error("Connect Wallet Failed")
    })
  }

  const renderAmountOptions = () => {
    return (
      <div className="flex w-full flex-row gap-3 py-2">
        {AMOUNT_LIST.map((amount: any, idx: number) => {
          return (
            <div
              key={`amount-list-percent-${idx}---`}
              className="flex-1 cursor-pointer rounded border-[1px] border-[#30344A] bg-[#080A14] px-2 py-1 text-center text-[12px] font-medium text-[#9192A0] hover:brightness-125"
              onClick={() => setAmountVal(amount.value.toString())}
            >
              {amount.label}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex w-full items-center justify-center backdrop-blur-md",
        !isOpen && "hidden",
      )}
    >
      <div className="relative flex w-full max-w-[480px] flex-col gap-3 rounded-lg bg-[#13141D] p-6 sm:max-w-xl">
        <div className="">
          <h2 className="text-[18px] font-medium text-[#E8E9EE]">
            Set position
          </h2>
          <button
            onClick={() => {
              closeModal()
              handleSetType(BET_TYPE.UP)
              setAmountVal("")
            }}
            className="absolute right-6 top-6 text-gray-600"
          >
            <CloseFilledIcon color="#FFFF" />
          </button>
          <div className="mt-8 flex w-full gap-2">
            <div
              className={twMerge(
                "h-10 flex-1 cursor-pointer rounded bg-[#1A1C28] p-2 text-center text-[14px] uppercase text-[#E8E9EE] hover:brightness-125",
                type === BET_TYPE.UP && "bg-[#9FF4CF] text-[#080A14]",
              )}
              onClick={() => handleSetType(BET_TYPE.UP)}
            >
              UP
            </div>
            <div
              className={twMerge(
                "h-10 flex-1 cursor-pointer rounded bg-[#1A1C28] p-2 text-center text-[14px] uppercase text-[#E8E9EE] hover:brightness-125",
                type === BET_TYPE.DOWN && "bg-[#E75787] text-[#080A14]",
              )}
              onClick={() => handleSetType(BET_TYPE.DOWN)}
            >
              DOWN
            </div>
          </div>

          <div className="mt-6">
            <div className="flex w-full flex-row items-center rounded border-[1px] border-[#30344A] bg-transparent px-4">
              <div className="flex-1 py-2">
                <input
                  type="number"
                  id="setTrade"
                  value={amountVal}
                  onChange={handleInputChange}
                  pattern="\d*"
                  className="w-full flex-1 bg-transparent text-[24px] capitalize text-[#E8E9EE] outline-none [appearance:textfield] placeholder:text-[#585A6B] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="0.0"
                  required
                />

                <span className="text-[10px] font-medium text-[#E8E9EE]">
                  Balance: {numberWithCommas(tokenBal)}
                  {"MAX"}
                </span>
              </div>

              <div className="flex h-8 w-fit items-center justify-center rounded-[32px] bg-[#080A14] px-4 py-1 text-[14px] text-[#E8E9EE]">
                MAX
                <img
                  src={maxAvatar}
                  alt="maxAvatar"
                  width={20}
                  height={20}
                  className="ml-1 h-5 w-5 rounded-full border border-[#30344A] object-cover"
                />
              </div>
            </div>
            {renderAmountOptions()}
            {!isConnectWallet ? (
              <button
                className="mt-4 w-full cursor-pointer rounded border-[2px] border-solid border-[rgba(255,255,255,0.25)] p-1 uppercase transition-all duration-150 ease-in hover:border-[rgba(255,255,255)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:brightness-75"
                onClick={() => onConnectPhantomWallet()}
              >
                <div className="flex items-center justify-center gap-2 rounded bg-white px-6 py-2 uppercase text-[#080A14]">
                  "CONNECT TO PHANTOM"
                </div>
              </button>
            ) : (
              <button
                disabled={disabledButton}
                className="mt-4 w-full cursor-pointer rounded border-[2px] border-solid border-[rgba(255,255,255,0.25)] p-1 uppercase transition-all duration-150 ease-in hover:border-[rgba(255,255,255)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:brightness-75"
                onClick={() => handleConfirmSetPosition()}
              >
                <div className="flex items-center justify-center gap-2 rounded bg-white px-6 py-2 uppercase text-[#080A14]">
                  {loading && (
                    <img src={loadingButtonIcon} alt="loadingButtonIcon" />
                  )}
                  {!isInsufficientFund ? "CONFIRM" : "INSUFFICIENT FUND"}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBet
