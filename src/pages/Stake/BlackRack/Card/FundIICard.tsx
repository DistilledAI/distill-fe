import { aiFund2Ava, rackPattern } from "@assets/images"
import { AnalyticIcon, InvestStakeIcon } from "@components/Icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import useGetVaultInfo from "../Investment/useGetVaultInfo"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import { shortenNumber } from "@utils/index"
import { toBN } from "@utils/format"
import { DECIMAL_SPL } from "@pages/BetingPage/constants"

const FundIICard: React.FC<{
  link: string
}> = ({ link }) => {
  const navigate = useNavigate()
  const { isConnectWallet } = useConnectPhantom()
  const { total, info } = useGetVaultInfo()
  const nav = info.nav
  const usdShare = shortenNumber(toBN(toBN(nav * total).toFixed(3)).toNumber())
  const aum = toBN(info.aum / 10 ** DECIMAL_SPL).toFixed(2)

  return (
    <div
      onClick={() => navigate(link)}
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
          <img className="h-[48px] w-[48px] rounded-full" src={aiFund2Ava} />
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
          Deposit USDC into the vault and receive shares (AIFII), your stake in
          the vault’s growing profits. <br /> Watch your share value rise as
          BlackRack’s investments thrive!
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
            <p className="text-20 font-bold uppercase text-mercury-950 max-md:text-16">
              ${shortenNumber(Number(aum))}
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <div className="-mb-3 -ml-2">
              <AnalyticIcon />
            </div>
            <p className="text-14 font-medium text-mercury-700">Your Shares</p>
            <p className="text-20 font-bold uppercase text-mercury-950 max-md:text-16">
              ${!isConnectWallet ? "--" : usdShare}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundIICard
