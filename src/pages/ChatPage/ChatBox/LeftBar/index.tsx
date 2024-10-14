import Marketplace from "@pages/Marketplace"
import MyEcho from "./MyEcho"
import Playground from "./Playground"
import PrivateAI from "./PrivateAI"

const LeftBar = () => {
  return (
    <div className="-mx-4 flex h-[calc(100%+100px)] flex-col overflow-hidden px-4 pb-5">
      <div className="relative h-[calc(100%-44px)] max-h-full flex-1">
        <MyEcho />
        <PrivateAI />
      </div>
      <div className="flex-items-center h-[60px] justify-between gap-2">
        <Playground />
        <Marketplace />
      </div>
    </div>
  )
}
export default LeftBar
