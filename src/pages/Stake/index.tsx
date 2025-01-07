import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { useNavigate } from "react-router-dom"
import UserStakedInfo from "./UserStakedInfo"
import WithdrawAll from "./WithdrawAll"
import BoxStake from "./BoxStake"
import StakeTable from "./StakeTable"
import StakedInfo from "./StakedInfo"
import { PoolIcon } from "@components/Icons"
import useConnectPhantom from "./useConnectPhantom"
import { gnrtAvatar, maxAvatar, racksAvatar } from "@assets/images"

export enum StakeTokenAddress {
  Max = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
  Degenerator = "oraiJP7H3LAt57DkFXNLDbLdBFNRRPvS8jg2j5AZkd9",
  BlackRack = "D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
}

export const LIST_TOKEN_STAKE = [
  {
    id: 1,
    address: StakeTokenAddress.Max,
    label: "MAX",
    decimals: 6,
    tokenName: "MAX",
    avatar: maxAvatar,
  },
  {
    id: 2,
    address: StakeTokenAddress.Degenerator,
    label: "Degenerator",
    decimals: 6,
    tokenName: "GNRT",
    avatar: gnrtAvatar,
  },
  {
    id: 3,
    address: StakeTokenAddress.BlackRack,
    label: "BlackRack",
    decimals: 6,
    tokenName: "RACKS",
    avatar: racksAvatar,
  },
]

const Stake = () => {
  const navigate = useNavigate()
  const { isConnectWallet } = useConnectPhantom()

  return (
    <div className="mx-auto max-w-[1232px] px-4">
      <div
        onClick={() => navigate(-1)}
        className="fixed left-0 top-0 z-[21] inline-flex h-[68px] cursor-pointer items-center gap-2 px-4 max-md:h-[40px]"
      >
        <ArrowLeftFilledIcon color="#545454" />
        <p className="font-medium">Back</p>
      </div>
      <div>
        <p className="text-[36px] font-semibold">Agent’s Vault</p>
        <p className="text-14 text-mercury-700">
          Stake your holdings today to earn revenue shares and additional
          benefits.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-8">
        <div className="w-[calc(60%-16px)]">
          {isConnectWallet ? (
            <>
              <UserStakedInfo />
              <WithdrawAll />
              <StakeTable />
            </>
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-[22px] border-1 border-dashed border-mercury-400 bg-mercury-70">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-md border-1 border-mercury-300 bg-mercury-100">
                <PoolIcon />
              </div>
              <p className="mt-2 font-medium text-mercury-950">No staking</p>
              <p className="text-14 text-mercury-700">
                Your staking status will appear here.
              </p>
            </div>
          )}
        </div>
        <div className="w-[calc(40%-16px)]">
          <p className="mb-5 text-24 font-semibold">Stake to Earn</p>
          <BoxStake />
          <StakedInfo />
        </div>
      </div>
    </div>
  )
}

export default Stake
