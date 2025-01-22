import { aiFund2Ava } from "@assets/images"

const TotalShare = () => {
  return (
    <div className="relative mt-8 grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:gap-4">
      <div className="absolute left-1/2 top-1/2 h-[50px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-mercury-200 max-md:hidden"></div>
      <div>
        <p className="text-14 font-medium text-mercury-700">Total Shares</p>
        <div className="flex items-center gap-2">
          <img className="h-6 w-6 rounded-full object-cover" src={aiFund2Ava} />
          <p className="text-24 font-semibold text-mercury-950 max-md:text-20">
            -- Shares
          </p>
        </div>
      </div>
      <div>
        <p className="text-14 font-medium text-mercury-700">
          Your Shares Power
        </p>
        <p className="text-24 font-semibold text-mercury-950 max-md:text-20">
          --%
        </p>
      </div>
    </div>
  )
}

export default TotalShare
