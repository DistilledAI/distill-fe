import ComingSoon from "@components/ComingSoon"
import { Button } from "@nextui-org/react"

const MyCredits = () => {
  return (
    <ComingSoon position="right">
      <div
        style={{
          background:
            "radial-gradient(102.52% 50% at 50% 50%, #383327 0%, #292929 100%)",
        }}
        className="border-800 rounded-[22px] border-1 p-4 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between leading-none">
          <span className="font-medium text-mercury-300">My Credits</span>
          <span className="text-[40px] font-semibold text-white">0</span>
        </div>
        <div className="mb-6 flex items-center justify-between leading-none">
          <span className="font-medium text-mercury-600">Balance:</span>
          <span className="font-medium text-mercury-600">$0</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button className="w-full rounded-full border border-mercury-900 bg-mercury-900/20 text-[14px] font-medium text-white max-md:min-h-14 md:text-[16px]">
            Backup your wallet
          </Button>
          <Button className="w-full rounded-full border border-mercury-900 bg-[#C3C3C333] text-[14px] font-medium text-white max-md:min-h-14 md:text-[16px]">
            Get more credits
          </Button>
        </div>
      </div>
    </ComingSoon>
  )
}

export default MyCredits
