import DrawerBottom from "@components/DrawerBottom"
import { Button } from "@nextui-org/react"
import { useEffect, useRef } from "react"
import useSliderMrkt from "../useSliderMrkt"
import { twMerge } from "tailwind-merge"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import ComingSoon from "@components/ComingSoon"

interface Props {
  categories: any[]
  isOpen: boolean
  onClose: () => void
}

const MarketplaceDesktop = ({ categories, isOpen, onClose }: Props) => {
  const { slider, onPrevSlider, onNextSlider, setSlider } = useSliderMrkt({
    isOpen,
    itemsCount: categories.length - 1,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (slider > 3 && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 500,
        behavior: "smooth",
      })
    }
    if (slider < 7 && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 500,
        behavior: "smooth",
      })
    }
  }, [slider])

  return (
    <>
      <DrawerBottom
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: "h-[calc(100dvh-72px)] rounded-t-[32px]",
          body: "px-0 md:px-0",
        }}
      >
        <h3 className="mb-6 text-center text-24 font-semibold">Marketplace</h3>
        <div
          className="flex w-full items-center gap-4 overflow-hidden overflow-x-auto whitespace-nowrap px-20 pb-3 scrollbar-hide"
          ref={containerRef}
        >
          {categories.map((category, index) => (
            <Button
              key={category.key}
              className={twMerge(
                "h-11 flex-shrink-0 rounded-full bg-white px-4 text-[16px] font-medium text-mercury-900 transition-all duration-500 ease-in-out",
                slider === index &&
                  "h-14 !bg-mercury-950 px-6 text-[18px] font-normal text-mercury-30",
              )}
              onPress={() => setSlider(index)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div
          className="relative flex h-full w-full items-center gap-4 overflow-hidden px-20 pb-3"
          id="slider-container"
        >
          {categories.map((category, index) => (
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
                <div
                  className={twMerge(
                    "max-h-[88%] space-y-3 overflow-y-auto px-1 py-3 pb-10",
                    category.isComing && "overflow-y-visible",
                  )}
                >
                  {category.isComing ? (
                    <ComingSoon>
                      <div
                        className={twMerge(
                          category.isComing && "space-y-3 px-2 opacity-60",
                        )}
                      >
                        {category.component}
                      </div>
                    </ComingSoon>
                  ) : (
                    category.component
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            className="fixed left-4 h-[68px] min-w-[68px] rounded-full border border-mercury-100 bg-white shadow-5"
            onPress={onPrevSlider}
          >
            <div className="rotate-90">
              <ChevronDownIcon />
            </div>
          </Button>
          <Button
            className="fixed right-4 h-[68px] min-w-[68px] rounded-full border border-mercury-100 bg-white shadow-5"
            onPress={onNextSlider}
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

export default MarketplaceDesktop
