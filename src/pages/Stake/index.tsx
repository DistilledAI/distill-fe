import {
  bankerLogo,
  bitmaxLogo,
  blackrackAvartar2,
  gnrtAvatar,
  guardLogo,
  jpowLogo,
  leeQuidAvatar,
  racksAvatar,
  usdcLogo,
} from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import { CoinGeckoId } from "@hooks/useCoingecko"
import BackButton from "@pages/AuthorProfile/BackButton"
import { lazy, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
const SimpleStaking = lazy(() => import("./SimpleStaking"))
const BlackRackVault = lazy(() => import("./BlackRack"))

export const SOLANA_ENV = import.meta.env.VITE_APP_SOLANA_ENV || "mainnet-beta"

export enum StakeTokenAddress {
  Degenerator = "oraiJP7H3LAt57DkFXNLDbLdBFNRRPvS8jg2j5AZkd9",
  BlackRack = "D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
  Usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  LeeQuid = "oraix39mVDGnusyjag97Tz5H8GvGriSZmhVvkvXRoc4",
  Guard = "oraiUNrTQmeuc13JoMFSyNcJCnXYpqErfp9v5diy64b",
  Banker = "oraiBbhuMd7MeVxyBjtnK8sggprf2NpHkeJaeHzpBFK",
  JPOW = "orairHM3Yw2PbTfCty1PXy7tEUx3uBMfjouNbm4KnRJ",
  BitMax = "oraif4S1S2xbc3Mym4uD392uVYEDHkP6ubCovbcXqKL",
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
  {
    id: 5,
    address: StakeTokenAddress.Guard,
    label: "GUARD",
    decimals: 6,
    tokenName: "GUARD",
    avatar: guardLogo,
    coinGeckoId: null,
  },
  {
    id: 6,
    address: StakeTokenAddress.Banker,
    label: "BANKER",
    decimals: 6,
    tokenName: "BANKER",
    avatar: bankerLogo,
    coinGeckoId: null,
  },
  {
    id: 7,
    address: StakeTokenAddress.JPOW,
    label: "JPOW",
    decimals: 6,
    tokenName: "JPOW",
    avatar: jpowLogo,
    coinGeckoId: CoinGeckoId["jpow-ai"],
  },
  {
    id: 8,
    address: StakeTokenAddress.BitMax,
    label: "BITMAX",
    decimals: 6,
    tokenName: "BITMAX",
    avatar: bitmaxLogo,
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

  const isBlackRack = tokenAddress === StakeTokenAddress.BlackRack

  return (
    <div className="mx-auto max-w-[1232px] px-4 max-md:py-[60px]">
      <BackButton className="fixed left-0 h-[50px] pl-4 max-md:h-[40px] max-md:w-full max-md:bg-white" />
      {isBlackRack ? <BlackRackVault /> : <SimpleStaking />}
    </div>
  )
}

export default Stake
