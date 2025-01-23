import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  blackrackAvartar2,
  gnrtAvatar,
  leeQuidAvatar,
  racksAvatar,
  usdcLogo,
} from "@assets/images"
import { CoinGeckoId } from "@hooks/useCoingecko"
import { lazy, useEffect } from "react"
import { PATH_NAMES } from "@constants/index"
const SimpleStaking = lazy(() => import("./SimpleStaking"))
// const BlackRackVault = lazy(() => import("./BlackRack"))

export const SOLANA_ENV = import.meta.env.VITE_APP_SOLANA_ENV || "mainnet-beta"

export enum StakeTokenAddress {
  Degenerator = "oraiJP7H3LAt57DkFXNLDbLdBFNRRPvS8jg2j5AZkd9",
  BlackRack = "D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
  Usdc = "v6ZegfKumXFEKzLAWiHouPe7KZsZq8kv6dq4Sc1Aqvq",
  LeeQuid = "oraix39mVDGnusyjag97Tz5H8GvGriSZmhVvkvXRoc4",
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
  {
    id: 3,
    address: StakeTokenAddress.LeeQuid,
    label: "LeeQuid",
    decimals: 6,
    tokenName: "LEE",
    avatar: leeQuidAvatar,
    coinGeckoId: CoinGeckoId["lee-quid"],
  },
  {
    id: 4,
    address: StakeTokenAddress.Usdc,
    label: "USDC",
    decimals: 6,
    tokenName: "USDC",
    avatar: usdcLogo,
    coinGeckoId: null,
  },
]

const Stake = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const navigate = useNavigate()
  useEffect(() => {
    if (!tokenAddress)
      navigate(`${PATH_NAMES.STAKING}?token=${StakeTokenAddress.BlackRack}`)
  }, [])

  // const isBlackRack = tokenAddress === StakeTokenAddress.BlackRack

  return (
    <div className="mx-auto max-w-[1232px] px-4 max-md:py-[60px]">
      <div
        onClick={() => navigate(-1)}
        className="fixed left-0 top-0 z-[21] inline-flex h-[50px] cursor-pointer items-center gap-2 px-4 max-md:h-[40px] max-md:w-full max-md:bg-white"
      >
        <ArrowLeftFilledIcon color="#545454" />
        <p className="font-medium">Back</p>
      </div>
      <SimpleStaking />
    </div>
  )
}

export default Stake
