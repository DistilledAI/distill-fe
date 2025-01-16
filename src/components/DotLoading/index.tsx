import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface DotLoadingProps {
  dotColor?: string
  className?: string
}

const DotLoading: React.FC<DotLoadingProps> = ({
  dotColor = "#888888",
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsLoading((prev) => !prev)
    }, 800)

    return () => clearInterval(animationInterval)
  }, [])

  return (
    <div className={twMerge("relative flex w-6 items-center", className)}>
      {/* Static Dot */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div
          className="h-[10px] w-[10px] rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      </div>

      {/* Animated Dot */}
      <div
        className={twMerge(
          "relative transition-all duration-500 ease-linear",
          isLoading ? "left-5" : "left-[-2px]",
        )}
      >
        <div
          className="h-[6px] w-[6px] rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      </div>
    </div>
  )
}

export default DotLoading
