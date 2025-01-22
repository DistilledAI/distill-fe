import { useNavigate, useSearchParams } from "react-router-dom"
import { getInfoTokenByAddress } from "../helpers"
import { StakeTokenAddress } from ".."
import {
  AnalyticIcon,
  InvestStakeIcon,
  PercentageIcon,
  PercentageSmallIcon,
  SimpleStakeIcon,
} from "@components/Icons"
import { PATH_NAMES } from "@constants/index"
import { lazy } from "react"
import useGetStakedAmount from "../useGetStakedAmount"
import { shortenNumber } from "@utils/index"
import useConnectPhantom from "../useConnectPhantom"
import { aiFund1Ava, aiFund2Ava, rackPattern } from "@assets/images"
const SimpleStaking = lazy(() => import("../SimpleStaking"))
const InvestmentVault = lazy(() => import("./Investment"))
const InvestInformation = lazy(() => import("./InvestInformation"))

enum Category {
  Simple = "simple_staking",
  AIFund1 = "aifund1_vault",
  AIFund2 = "aifund2_vault",
}

export enum InvestTokenAddress {
  AIFund1 = "ab12",
  AIFund2 = "ab13",
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
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isConnectWallet } = useConnectPhantom()
  const tokenAddress = searchParams.get("token")
  const category = searchParams.get("category")
  const { total, totalStakeAll } = useGetStakedAmount()
  const infoToken = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

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
        <div
          onClick={() => navigate(simpleLink)}
          className="w-[350px] max-w-full cursor-pointer"
        >
          <div
            style={{
              background: "linear-gradient(71deg, #000 0%, #797676 100%)",
            }}
            className="flex h-[90px] justify-between rounded-t-[22px] px-6 py-5 max-md:h-[60px] max-md:px-4 max-md:py-4"
          >
            <div className="flex items-center gap-4">
              <img
                className="h-[48px] w-[48px] rounded-full"
                src={infoToken?.avatar}
              />
              <div className="text-white">
                <p className="text-20 font-bold italic max-md:text-18">
                  Simple Staking
                </p>
                <p className="max-md:text-14">Deposit RACKS</p>
              </div>
            </div>
            <div className="flex items-center gap-[1px]">
              <div className="h-4 w-[2px] bg-[rgba(255,255,255,0.5)]"></div>
              <div className="h-4 w-[3px] bg-[rgba(255,255,255,0.8)]"></div>
              <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.1)]"></div>
              <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.1)]"></div>
            </div>
          </div>
          <div
            style={{ borderBottomRightRadius: "22px" }}
            className="flex-1 bg-mercury-100 p-6 max-md:p-4"
          >
            <p className="mb-[80px] font-medium text-mercury-900 max-md:mb-[60px] max-md:text-14">
              Stake your RACKS to earn revenue shares and additional benefits.
            </p>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="absolute left-6">
                <SimpleStakeIcon />
              </div>
              <div>
                <div className="-mb-3 -ml-2">
                  <PercentageIcon />
                </div>
                <p className="text-14 font-medium text-mercury-700">
                  Total Staked
                </p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  {shortenNumber(totalStakeAll)} RACKS
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <div className="-mb-1 -ml-2">
                  <PercentageSmallIcon />
                </div>
                <p className="text-14 font-medium text-mercury-700">
                  Your Staked
                </p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  {!isConnectWallet ? "--" : shortenNumber(total)} RACKS
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate(investLinkF2)}
          className="w-[350px] max-w-full cursor-pointer"
        >
          <div
            style={{
              background: "linear-gradient(71deg, #000 0%, #797676 100%)",
            }}
            className="relative flex h-[90px] justify-between overflow-hidden rounded-t-[22px] px-6 py-5 max-md:h-[80px] max-md:px-4 max-md:py-4"
          >
            <img className="absolute left-0 h-full" src={rackPattern} />
            <div className="absolute left-[-224px] top-[65px] h-[89px] w-[394px] rounded-[394px] bg-[#997314] opacity-50 blur-[20px]"></div>
            <div className="relative flex items-center gap-4">
              <img
                className="h-[48px] w-[48px] rounded-full"
                src={aiFund2Ava}
              />
              <div className="text-white">
                <p
                  style={{
                    background:
                      "linear-gradient(90deg, #F9EEA7 0%, #B99649 17%, #EADDB0 58.5%, #95743F 100%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="pr-10 text-20 font-bold italic max-md:text-18"
                >
                  AI Fund II Vault
                </p>
                <p className="max-md:text-14">Deposit USDC</p>
              </div>
            </div>
            <div className="flex items-center gap-[1px]">
              <div className="h-4 w-[2px] bg-[rgba(255,255,255,0.2)]"></div>
              <div className="h-4 w-[3px] bg-[rgba(255,255,255,0.4)]"></div>
              <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.6)]"></div>
              <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.8)]"></div>
            </div>
          </div>
          <div
            style={{ borderBottomRightRadius: "22px" }}
            className="flex flex-col justify-between bg-mercury-100 p-6 max-md:p-4"
          >
            <p className="mb-2 font-medium text-mercury-900 max-md:text-14">
              Deposit USDC into the vault and receive shares (AIFII), your stake
              in the vault’s growing profits. <br /> Watch your share value rise
              as BlackRack’s investments thrive!
            </p>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="absolute left-[86px] top-10">
                <InvestStakeIcon />
              </div>
              <div>
                <div className="-mb-3 -ml-2">
                  <AnalyticIcon />
                </div>
                <p className="text-14 font-medium text-mercury-700">AUM</p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  $ --
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <div className="-mb-3 -ml-2">
                  <AnalyticIcon />
                </div>
                <p className="text-14 font-medium text-mercury-700">
                  Your Shares
                </p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  $ --
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate(investLinkF1)}
          className="w-[350px] max-w-full cursor-pointer"
        >
          <div
            style={{
              background: "linear-gradient(71deg, #000 0%, #797676 100%)",
            }}
            className="relative flex h-[90px] justify-between overflow-hidden rounded-t-[22px] px-6 py-5 max-md:h-[80px] max-md:px-4 max-md:py-4"
          >
            <img className="absolute left-0 h-full" src={rackPattern} />
            <div className="relative flex items-center gap-4">
              <img
                className="h-[48px] w-[48px] rounded-full"
                src={aiFund1Ava}
              />
              <div className="text-white">
                <p className="pr-10 text-20 font-bold italic max-md:text-18">
                  AI Fund I Vault
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[1px]">
              <div className="h-4 w-[2px] bg-[rgba(255,255,255,0.05)]"></div>
              <div className="h-4 w-[3px] bg-[rgba(255,255,255,0.06)]"></div>
              <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.07)]"></div>
              <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.08)]"></div>
            </div>
          </div>
          <div
            style={{ borderBottomRightRadius: "22px" }}
            className="flex flex-col justify-between bg-mercury-100 p-6 max-md:p-4"
          >
            <p className="mb-[108px] font-medium text-mercury-900 max-md:text-14">
              AI Agent Fund I is the first vault of BlackRack Agent. It manages
              80,000 ORAI funded by Oraichain DAO to invest and generate
              profits.
            </p>
            <div className="relative grid grid-cols-2 gap-4">
              <div>
                <p className="text-14 font-medium text-mercury-700">AUM</p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  $ --
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackRackVault
