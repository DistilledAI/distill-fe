import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { useNavigate, useSearchParams } from "react-router-dom"
import UserStakedInfo from "./UserStakedInfo"
import WithdrawAll from "./WithdrawAll"
import BoxStake from "./BoxStake"
import StakeTable from "./StakeTable"
import StakedInfo from "./StakedInfo"
import { PoolIcon } from "@components/Icons"
import useConnectPhantom from "./useConnectPhantom"
import { blackrackAvartar2, gnrtAvatar, racksAvatar } from "@assets/images"
import useGetStakedAmount from "./useGetStakedAmount"
import { CoinGeckoId } from "@hooks/useCoingecko"
import { useEffect } from "react"
import { PATH_NAMES } from "@constants/index"
import useGetUnbondingList from "./StakeTable/useGetUnbondingList"
import { getInfoTokenByAddress } from "./helpers"

export const SOLANA_ENV = import.meta.env.VITE_APP_SOLANA_ENV || "mainnet-beta"

export enum StakeTokenAddress {
  Degenerator = "oraiJP7H3LAt57DkFXNLDbLdBFNRRPvS8jg2j5AZkd9",
  BlackRack = "D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
}

export const LIST_TOKEN_STAKE = [
  {
    id: 1,
    address: StakeTokenAddress.Degenerator,
    label: "Degenerator",
    decimals: 6,
    tokenName: "GNRT",
    avatar: gnrtAvatar,
    coinGeckoId: CoinGeckoId["degenerator-project"],
  },
  {
    id: 2,
    address: StakeTokenAddress.BlackRack,
    label: "BlackRack",
    decimals: 6,
    tokenName: "RACKS",
    avatar: racksAvatar,
    avatar2: blackrackAvartar2,
    coinGeckoId: CoinGeckoId["blackrack"],
  },
]

const Stake = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const navigate = useNavigate()
  const { isConnectWallet } = useConnectPhantom()
  const { total, getStakedAmount, totalStakeAll, getTotalStakeAll } =
    useGetStakedAmount()
  const { list, getListUnbonding } = useGetUnbondingList()
  useEffect(() => {
    if (!tokenAddress)
      navigate(`${PATH_NAMES.STAKING}?token=${StakeTokenAddress.BlackRack}`)
  }, [])
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  return (
    <div className="mx-auto max-w-[1232px] px-4 max-md:py-[60px]">
      <div
        onClick={() => navigate(-1)}
        className="fixed left-0 top-0 z-[21] inline-flex h-[50px] cursor-pointer items-center gap-2 px-4 max-md:h-[40px] max-md:w-full max-md:bg-white"
      >
        <ArrowLeftFilledIcon color="#545454" />
        <p className="font-medium">Back</p>
      </div>
      <div>
        <p className="text-[36px] font-semibold max-md:text-[22px]">
          {tokenInfo?.tokenName} Vault
        </p>
        <p className="text-14 text-mercury-700">
          Stake your holdings today to earn revenue shares and additional
          benefits.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-8 max-md:mt-6 max-md:flex-col-reverse">
        <div className="w-[calc(60%-16px)] max-md:w-full">
          {isConnectWallet ? (
            <>
              <UserStakedInfo total={total} />
              <WithdrawAll />
              <StakeTable list={list} getListUnbonding={getListUnbonding} />
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
        <div className="w-[calc(40%-16px)] max-md:w-full">
          <p className="mb-5 text-24 font-semibold max-md:text-20">
            Stake to Earn
          </p>
          <BoxStake
            total={total}
            fetchTotal={() => {
              getStakedAmount()
              getTotalStakeAll()
              getListUnbonding()
            }}
          />
          <StakedInfo total={totalStakeAll} />
        </div>
      </div>
    </div>
  )
}

export default Stake
