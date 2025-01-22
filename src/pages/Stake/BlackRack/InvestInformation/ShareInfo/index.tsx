import { aiFund1Ava } from "@assets/images"

const ShareInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-5 rounded-[14px] border-1 border-[#A88E67] bg-brown-50 px-6 py-6">
      <div>
        <p className="text-14 font-medium text-mercury-700">Your Shares</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          $ --
        </p>
        <div className="flex items-center gap-1">
          <img className="h-4 w-4 rounded-full object-cover" src={aiFund1Ava} />
          <p className="text-14 text-brown-600">0 Shares</p>
        </div>
      </div>
      <div>
        <p className="text-14 font-medium text-mercury-700">Share Price</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          $ --
        </p>
      </div>
    </div>
  )
}

export default ShareInfo
