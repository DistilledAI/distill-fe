import { aiFund1Ava, rackPattern } from "@assets/images"
import React from "react"
import { useNavigate } from "react-router-dom"
import useFetchHistory from "../InvestInformation/useFetchHistory"
import { shortenNumber } from "@utils/index"

const FundICard: React.FC<{
  link: string
}> = ({ link }) => {
  const { data } = useFetchHistory(1)
  const aum = data[0]?.aum || 0
  const navigate = useNavigate()

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
        <div className="relative flex items-center gap-4">
          <img className="h-[48px] w-[48px] rounded-full" src={aiFund1Ava} />
          <div className="text-white">
            <p className="pr-10 text-20 font-bold italic max-md:text-18">
              AI Agent Fund I
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
          80,000 ORAI funded by Oraichain DAO to invest and generate profits.
        </p>
        <div className="relative grid grid-cols-2 gap-4">
          <div>
            <p className="text-14 font-medium text-mercury-700">AUM</p>
            <p className="text-20 font-bold text-mercury-950 max-md:text-16">
              ${aum === 0 ? "--" : shortenNumber(aum)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundICard
