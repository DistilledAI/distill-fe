import useWindowSize from "@hooks/useWindowSize"
import { Divider } from "@nextui-org/react"
import React, { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

interface InfoComponent {
  title: React.ReactNode
  content: React.ReactNode
  isNew?: boolean
  icon: React.ReactNode
}

const SmoothScrollTo: React.FC<{
  components: InfoComponent[]
  offsetAdjustment?: number
  classNames?: {
    wrapper?: string
    headerWrapper?: string
    contentWrapper?: string
  }
}> = ({ components, offsetAdjustment, classNames }) => {
  const contentRefs = useRef<any>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isClick, setIsClick] = useState(false)
  const scrollComponentRef = useRef<HTMLDivElement | null>(null)
  const isActive = (index: number) => index === activeIndex
  const { isMobile } = useWindowSize()

  const handleScrollToContent = (index: number) => {
    setIsClick(true)
    setTimeout(() => setIsClick(false), 1000)
    const targetElement = contentRefs.current[index]
    if (targetElement && scrollComponentRef.current) {
      const scrollContainer = scrollComponentRef.current
      const offsetTop = targetElement.offsetTop - (offsetAdjustment ?? 0)

      scrollContainer.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isClick || !scrollComponentRef.current) return

      const scrollContainer = scrollComponentRef.current
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const containerHeight = scrollContainer.clientHeight

      if (scrollTop === 0) {
        setActiveIndex(0)
        return
      }

      if (scrollTop + containerHeight >= scrollHeight - 1) {
        setActiveIndex(components.length - 1)
        return
      }

      contentRefs.current.forEach((element: HTMLElement, index: number) => {
        const offsetAdj = offsetAdjustment ?? 0
        const elementTop = element.offsetTop - scrollTop

        if (elementTop >= offsetAdj && elementTop < containerHeight / 2) {
          setActiveIndex(index)
        }
      })
    }

    const scrollContainer = scrollComponentRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isClick, offsetAdjustment, components.length])

  return (
    <>
      {!isMobile && (
        <div className="absolute left-[24px] top-[45px] z-[22] min-h-[calc(100dvh-68px)] w-[329px] items-center gap-2 rounded-[32px] border border-mercury-100 !bg-mercury-70 px-4 py-[10px]">
          {components.map((comp, index) => (
            <div
              key={index}
              className={twMerge(
                "relative flex cursor-pointer items-center justify-between p-4 duration-300",
                isActive(index) && "rounded-[22px] bg-mercury-100",
              )}
              onClick={() => handleScrollToContent(index)}
            >
              <div className="flex gap-2">
                {comp.icon}
                <span
                  className={twMerge(
                    "block font-medium text-mercury-900 duration-300",
                    isActive(index) && "font-bold text-mercury-950",
                  )}
                >
                  {comp.title}
                </span>
              </div>
              {comp?.isNew && (
                <div className="rounded-full bg-lgd-code-hot-ramp px-2">
                  <span className="text-base-14-b uppercase text-white">
                    new
                  </span>
                </div>
              )}

              <div
                className={twMerge(
                  "absolute -left-[18px] top-1/2 w-[5px] -translate-y-1/2 bg-mercury-950 opacity-0 transition-all duration-300 ease-linear",
                  !isActive(index) &&
                    "h-3 rounded-br-lg rounded-tr-lg group-hover/item:opacity-100",
                  isActive(index) &&
                    "block h-10 rounded-br-full rounded-tr-full opacity-100",
                )}
              />
            </div>
          ))}
        </div>
      )}

      <div
        className="relative mx-auto max-h-[calc(100dvh-152px)] max-w-[800px] overflow-auto px-4 pb-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px] max-sm:pb-20 max-sm:pt-6"
        ref={scrollComponentRef}
      >
        <div className={classNames?.contentWrapper}>
          {components.map((comp, index) => (
            <>
              <div
                key={index}
                ref={(el) => (contentRefs.current[index] = el)}
                // className={twMerge("", !isActive(index) && "opacity-50")}
              >
                {comp.content}
              </div>
              {index !== components.length - 1 && <Divider className="my-9" />}
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default SmoothScrollTo
