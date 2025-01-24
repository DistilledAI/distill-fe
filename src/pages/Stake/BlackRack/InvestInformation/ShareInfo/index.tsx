import { aiFund1Ava } from "@assets/images"
import useFetchHistory from "../useFetchHistory"
import { formatNumberWithComma } from "@utils/index"
import { toBN } from "@utils/format"

const ShareInfo = () => {
  const { data } = useFetchHistory(1)
  const totalShares = data[0]?.totalShares || 0
  const sharePrice = data[0]?.shareValues || 0

  return (
    <div className="grid grid-cols-2 gap-5 rounded-[14px] border-1 border-[#A88E67] bg-brown-50 px-6 py-6">
      <div>
        <p className="text-14 font-medium text-mercury-700">Total Shares</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          $
          {data.length === 0
            ? "--"
            : formatNumberWithComma(toBN(totalShares * sharePrice).toNumber())}
        </p>
        <div className="flex items-center gap-1">
          <img className="h-4 w-4 rounded-full object-cover" src={aiFund1Ava} />
          <p className="text-14 text-brown-600">
            {formatNumberWithComma(totalShares)} Shares
          </p>
        </div>
      </div>
      <div>
        <p className="text-14 font-medium text-mercury-700">Share Price</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          ${sharePrice === 0 ? "--" : sharePrice}
        </p>
      </div>
    </div>
  )
}

export default ShareInfo
