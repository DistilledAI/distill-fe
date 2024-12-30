import { creditBg, xDSTL } from "@assets/images"
import { CircleCheckFilled, WarningIcon } from "@components/Icons"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const MyPoints = () => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const totalxDstlPoint = user?.xDstlPoint || 0

  return (
    <div
      style={{
        backgroundImage: `url(${creditBg})`,
      }}
      className="h-full rounded-[22px] border-1 bg-cover bg-center bg-no-repeat p-4 md:px-6 md:py-8"
    >
      <div className="mb-2 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-300">My Points</span>
        <div className="flex items-center gap-2">
          <img src={xDSTL} width={24} height={24} />
          <span className="text-[32px] font-bold text-white">
            {totalxDstlPoint}
          </span>
        </div>
      </div>
      {user.walletActive ? (
        <>
          <div className="mb-6 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-600">Balance:</span>
            <span className="font-medium text-mercury-600">
              {totalxDstlPoint} xDSTL ($-)
            </span>
          </div>

          <div className="mb-7 mt-3 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-600">
              Wallet Activation:
            </span>
            <div className="flex items-center gap-1 text-[#2CB34E]">
              <CircleCheckFilled /> Activated
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-600">
              Wallet Activation:
            </span>
            <div className="flex items-center gap-1 text-[#F78500]">
              <WarningIcon color="#F78500" /> Inactive
            </div>
          </div>

          <p className="mb-3 mt-1 text-[#F78500]">
            Complete at least one blockchain transaction with your web3 wallet
            on Ethereum, Binance Smart Chain, Oraichain, or Solana networks to
            earn xDSTL and farm EXP on Clan.
          </p>
        </>
      )}

      <div className="flex items-center justify-between gap-1">
        <Button
          className="w-full rounded-full border border-mercury-900 bg-mercury-900/20 text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]"
          onPress={() => navigate(PATH_NAMES.REWARDS)}
        >
          Earn more points
        </Button>
      </div>
    </div>
  )
}

export default MyPoints
