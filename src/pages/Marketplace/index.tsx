import DrawerBottom from "@components/DrawerBottom"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"
import { Button, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import PrivateAgents from "./PrivateAgents"
// import Productivity from "./Productivity"
// import GenAITools from "./GenAITools"
import useAuthState from "@hooks/useAuthState"

const Marketplace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [slider, setSlider] = useState<number>(0)
  const { isLogin } = useAuthState()

  const CATEGORIES = [
    {
      key: "private-agents",
      name: "Private agents",
      component: <PrivateAgents onClose={onClose} />,
    },
    {
      key: "productivity",
      name: "Productivity",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "gen-ai-tools",
      name: "GenAI Tools",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "learning",
      name: "Learning",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "wellness",
      name: "Wellness",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "search-engine",
      name: "Search engine",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "foundational-access",
      name: "Foundational access",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "sns",
      name: "SNS",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "finance",
      name: "Finance",
      component: <div className="text-base-md">Coming soon...</div>,
    },
    {
      key: "characters-org",
      name: "Characters & Org",
      component: <div className="text-base-md">Coming soon...</div>,
    },
  ]

  const onPrevSlider = () => {
    if (slider === 0) return
    setSlider((prevSlider) => prevSlider - 1)
  }

  const onNextSlider = () => {
    if (slider === CATEGORIES.length - 1) return
    setSlider((prevSlider) => prevSlider + 1)
  }

  return (
    <>
      <Button
        onClick={onOpen}
        isDisabled={!isLogin}
        className="btn-primary !h-[62px]"
      >
        <div>
          <FilledSquareCircleIcon />
        </div>
        Marketplace
      </Button>
      <DrawerBottom
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: "h-[calc(100dvh-72px)] rounded-t-[32px]",
          body: "px-0",
        }}
      >
        <h3 className="mb-6 text-center text-24 font-semibold">Marketplace</h3>
        <div className="flex w-full items-center gap-4 overflow-hidden overflow-x-auto px-20 pb-3">
          {CATEGORIES.map((category, index) => (
            <Button
              key={category.key}
              className={twMerge(
                "r h-11 flex-shrink-0 rounded-full bg-white px-4 text-[16px] font-medium text-mercury-900 transition-all duration-500 ease-in-out",
                slider === index &&
                  "h-14 !bg-mercury-950 px-6 text-[18px] font-normal text-mercury-30",
              )}
              onClick={() => setSlider(index)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="relative flex h-full w-full items-center gap-4 overflow-hidden px-20 pb-3">
          {CATEGORIES.map((category, index) => (
            <div
              className={
                "mt-3 h-full space-y-3 transition-all duration-500 ease-in-out"
              }
              key={`${category.key}-${index}`}
              style={{
                transform: `translateX(calc(-${slider} * 100% - ${slider} * 16px))`,
              }}
            >
              <h6
                className={twMerge(
                  "text-[13px] font-medium text-mercury-700",
                  slider === index && "font-semibold text-mercury-950",
                )}
              >
                {category.name}
              </h6>
              <div
                className={twMerge(
                  "h-full min-w-[350px] rounded-[22px] bg-mercury-30 p-1 shadow-5",
                )}
              >
                <div className="max-h-[88%] overflow-y-auto p-3 pb-10">
                  {category.component}
                </div>
              </div>
            </div>
          ))}
          <Button
            className="fixed left-4 h-[68px] min-w-[68px] rounded-full border border-mercury-100 bg-white shadow-5"
            onClick={onPrevSlider}
          >
            <div className="rotate-90">
              <ChevronDownIcon />
            </div>
          </Button>
          <Button
            className="fixed right-4 h-[68px] min-w-[68px] rounded-full border border-mercury-100 bg-white shadow-5"
            onClick={onNextSlider}
          >
            <div className="-rotate-90">
              <ChevronDownIcon />
            </div>
          </Button>
        </div>
      </DrawerBottom>
    </>
  )
}

export default Marketplace
