import ComingSoon from "@components/ComingSoon"
import { ArrowsSort } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"

const TradeTokenButton = () => {
  return (
    <ComingSoon>
      <Button
        className="h-[38px] w-fit rounded-full bg-mercury-950 text-white md:h-11 md:w-full"
        isDisabled
      >
        <ArrowsSort color="#FFFF" />
        <span className="text-base text-white">Trade BTCMX</span>
      </Button>
    </ComingSoon>
  )
}

export default TradeTokenButton