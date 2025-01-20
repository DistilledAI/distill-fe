import { useNavigate, useSearchParams } from "react-router-dom"
import { getInfoTokenByAddress } from "../helpers"
import { StakeTokenAddress } from ".."
import {
  AnalyticIcon,
  PercentageIcon,
  PercentageSmallIcon,
} from "@components/Icons"
import { PATH_NAMES } from "@constants/index"
import { lazy } from "react"
const SimpleStaking = lazy(() => import("../SimpleStaking"))
const InvestmentVault = lazy(() => import("./Investment"))

enum Category {
  Simple = "simple_staking",
  Invest = "investment_vault",
}

const BlackRackVault = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const category = searchParams.get("category")
  const infoToken = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  const simpleLink = `${PATH_NAMES.STAKING}?token=${tokenAddress}&category=${Category.Simple}`
  const investLink = `${PATH_NAMES.STAKING}?token=${tokenAddress}&category=${Category.Invest}`

  if (category === Category.Simple) return <SimpleStaking />
  if (category === Category.Invest) return <InvestmentVault />

  return (
    <div>
      <p className="mb-10 text-center text-40 font-semibold max-md:mb-8 max-md:text-24">
        BlackRack's Vault
      </p>
      <div className="flex items-stretch justify-center gap-10 max-md:flex-col">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="-mb-3 -ml-2">
                  <PercentageIcon />
                </div>
                <p className="text-14 font-medium text-mercury-700">
                  Total Staked
                </p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  448.7M RACKS
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
                  0 RACKS
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate(investLink)}
          className="w-[350px] max-w-full cursor-pointer"
        >
          <div
            style={{
              background: "linear-gradient(71deg, #000 0%, #797676 100%)",
            }}
            className="flex h-[90px] justify-between rounded-t-[22px] px-6 py-5 max-md:h-[80px] max-md:px-4 max-md:py-4"
          >
            <div className="flex items-center gap-4">
              <img
                className="h-[48px] w-[48px] rounded-full"
                src={infoToken?.avatar2}
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
                  Investment Vault
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
              Deposit USDC into the vault and receive shares (xRACKS), your
              stake in the vault’s growing profits. <br /> Watch your share
              value rise as BlackRack’s investments thrive!
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="-mb-3 -ml-2">
                  <AnalyticIcon />
                </div>
                <p className="text-14 font-medium text-mercury-700">
                  BlackRack's AUM
                </p>
                <p className="text-20 font-bold text-mercury-950 max-md:text-16">
                  $1.4M
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
                  $100
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
