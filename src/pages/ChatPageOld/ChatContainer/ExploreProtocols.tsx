import { ExploreFilledIcon } from "@components/Icons/ExploreIcon"
import { Button } from "@nextui-org/react"

const ExploreProtocols = () => {
  return (
    <Button className="bg-mercury-30 h-11 rounded-full border border-white">
      <ExploreFilledIcon />
      <span className="text-base">Explore protocols</span>
    </Button>
  )
}

export default ExploreProtocols
