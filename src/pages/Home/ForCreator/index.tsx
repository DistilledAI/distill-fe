import { DollarIcon, MagicIcon, TablerBookIcon } from "@components/Icons"
import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"
import MyAgentHome from "./MyAgent"
import useWindowSize from "@hooks/useWindowSize"

const ForCreator = () => {
  const { isMobile } = useWindowSize()

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MagicIcon size={isMobile ? 22 : 28} />
          <h3 className="text-22 font-bold text-mercury-950 max-md:text-16">
            For Creator
          </h3>
        </div>
        <Link
          className="flex items-center gap-1 rounded-full border-1 border-mercury-70 bg-mercury-30 px-3 py-2"
          to="https://distilled.ai/"
          target="_blank"
        >
          <TablerBookIcon />
          <p className="font-semibold text-mercury-900 max-md:text-14">
            About Distilled AI
          </p>
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-6 max-md:grid-cols-1">
        <MyAgentHome />
        <div className="relative flex w-full flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-6 max-md:mb-4">
          <div className="absolute left-6 top-3 max-md:hidden">
            <span className="text-[40px] font-bold text-mercury-200">2</span>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mercury-200 max-md:h-8 max-md:w-8">
              <DollarIcon />
            </div>
            <h3 className="my-2 text-20 font-semibold text-mercury-950 max-md:text-18 md:text-24">
              Launch a Token for your Agent
            </h3>
          </div>
          <h4 className="text-14 text-mercury-800 max-md:text-center md:text-16">
            Ensure fair launches-driven market. <br /> Graduates listed on
            Solana & Oraichain.
          </h4>
          <Button
            className="mt-4 h-[56px] w-full rounded-full bg-mercury-100 text-[16px] font-semibold text-mercury-950 max-md:h-[44px] max-md:text-15 md:mt-6"
            onPress={() => window.open("https://agents.land/", "_blank")}
          >
            Go to Agents.land
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForCreator
