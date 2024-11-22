import { Divider } from "@nextui-org/react"
import React, { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

interface InfoComponent {
  title: React.ReactNode
  content: React.ReactNode
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

  const isActive = (index: number) => index === activeIndex

  const handleScrollToContent = (index: number) => {
    setIsClick(true)
    setTimeout(() => setIsClick(false), 1000)
    const targetElement = contentRefs.current[index]
    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY
      const offsetAdj = offsetAdjustment ?? 0
      window.scrollTo({
        top: offsetTop - offsetAdj,
        behavior: "smooth",
      })
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isClick) return
      const scrollTop = window.scrollY
      const scrollBottom = window.innerHeight + scrollTop
      const documentHeight = document.documentElement.scrollHeight

      if (scrollTop === 0) {
        setActiveIndex(0)
        return
      }
      if (scrollBottom >= documentHeight - 1) {
        setActiveIndex(components.length - 1)
        return
      }

      contentRefs.current.forEach((element: HTMLElement, index: number) => {
        const rect = element.getBoundingClientRect()
        const offsetAdj = offsetAdjustment ?? 0

        if (rect.top >= offsetAdj && rect.top < window.innerHeight / 2) {
          setActiveIndex(index)
        }
      })
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isClick])

  return (
    <div className={classNames?.wrapper}>
      <div
        className={twMerge(
          "relative hidden items-center gap-2 md:flex",
          classNames?.headerWrapper,
        )}
      >
        <div className="absolute left-0 top-[40px] h-[1px] w-full bg-mercury-100"></div>
        {components.map((comp, index) => (
          <div
            key={index}
            className="relative cursor-pointer px-2 py-2 duration-300"
            onClick={() => handleScrollToContent(index)}
          >
            <span
              className={twMerge(
                "block font-medium text-mercury-700 duration-300",
                isActive(index) && "text-mercury-950",
              )}
            >
              {comp.title}
            </span>
            <span
              className={twMerge(
                "absolute bottom-0 left-1/2 block h-[2px] w-0 -translate-x-1/2 bg-mercury-950 duration-300",
                isActive(index) && "w-full",
              )}
            ></span>
          </div>
        ))}
      </div>
      <div className={classNames?.contentWrapper}>
        {components.map((comp, index) => (
          <>
            <div key={index} ref={(el) => (contentRefs.current[index] = el)}>
              {comp.content}
            </div>
            {index !== components.length - 1 && <Divider className="my-9" />}
          </>
        ))}
      </div>
    </div>
  )
}

export default SmoothScrollTo
