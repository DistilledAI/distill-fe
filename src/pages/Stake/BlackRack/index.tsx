import { useSearchParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import { lazy } from "react"
import { aiFund1Ava, aiFund2Ava } from "@assets/images"
import SimpleCard from "./Card/SimpleCard"
import FundICard from "./Card/FundICard"
import FundIICard from "./Card/FundIICard"
const SimpleStaking = lazy(() => import("../SimpleStaking"))
const InvestmentVault = lazy(() => import("./Investment"))
const InvestInformation = lazy(() => import("./InvestInformation"))

enum Category {
  Simple = "simple_staking",
  AIFund1 = "aifund1_vault",
  AIFund2 = "aifund2_vault",
}

export enum InvestTokenAddress {
  AIFund1 = "aifund1",
  AIFund2 = "aifund2",
}

export const LIST_TOKEN_STAKE = [
  {
    id: 1,
    address: InvestTokenAddress.AIFund1,
    label: "AI Fund I",
    decimals: 6,
    tokenName: "AIFI",
    avatar: aiFund1Ava,
    coinGeckoId: null,
  },
  {
    id: 2,
    address: InvestTokenAddress.AIFund2,
    label: "AI Fund II",
    decimals: 6,
    tokenName: "AIFII",
    avatar: aiFund2Ava,
    coinGeckoId: null,
  },
]

const BlackRackVault = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const category = searchParams.get("category")

  const simpleLink = `${PATH_NAMES.STAKING}?token=${tokenAddress}&category=${Category.Simple}`
  const investLinkF2 = `${PATH_NAMES.STAKING}?token=${tokenAddress}&category=${Category.AIFund2}`
  const investLinkF1 = `${PATH_NAMES.STAKING}?token=${tokenAddress}&category=${Category.AIFund1}`

  if (category === Category.Simple) return <SimpleStaking />
  if (category === Category.AIFund2) return <InvestmentVault />
  if (category === Category.AIFund1) return <InvestInformation />

  return (
    <div>
      <p className="mb-10 text-center text-40 font-semibold max-md:mb-8 max-md:text-24">
        BlackRack's Vault
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 max-md:flex-col">
        <SimpleCard link={simpleLink} />
        <FundIICard link={investLinkF2} />
        <FundICard link={investLinkF1} />
      </div>
    </div>
  )
}

export default BlackRackVault
